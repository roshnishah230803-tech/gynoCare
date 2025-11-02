#!/bin/bash

# GynoCare Integration Startup Script
# This script starts all services in the correct order and checks their health

set -e

echo "Starting GynoCare Services..."

# Load environment variables
if [ -f .env.development ]; then
    export $(cat .env.development | grep -v '^#' | xargs)
    echo "Loaded environment from .env.development"
else
    echo ".env.development not found. Please create it first."
    exit 1
fi

# Function to check if a service is healthy
check_health() {
    local service_name=$1
    local url=$2
    local max_attempts=30
    local attempt=1
    
    echo "Checking $service_name health at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo "$service_name is healthy!"
            return 0
        fi
        
        echo "⏳ Waiting for $service_name... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "$service_name failed to start after $max_attempts attempts"
    return 1
}

# Start services in background
echo "📦 Starting MongoDB..."
mongod --fork --logpath /tmp/mongod.log --dbpath /tmp/mongodb || echo "MongoDB may already be running"

echo "🤖 Starting ML Service..."
cd ml
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv
fi
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
pip install -r requirements.txt > /dev/null 2>&1
python -m uvicorn app.main:app --host 0.0.0.0 --port $ML_PORT --reload &
ML_PID=$!
cd ..

echo "🔧 Starting Backend..."
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
cd ..

echo "🎨 Starting Frontend..."
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for services to be ready
echo "⏱️  Waiting for services to start..."

if check_health "ML Service" "http://localhost:$ML_PORT/health"; then
    if check_health "Backend" "http://localhost:$BACKEND_PORT/health"; then
        echo "🎉 All services are running!"
        echo ""
        echo "📱 Frontend: http://localhost:$FRONTEND_PORT"
        echo "🔧 Backend:  http://localhost:$BACKEND_PORT"
        echo "🤖 ML:       http://localhost:$ML_PORT"
        echo ""
        echo "📚 API Documentation:"
        echo "   Backend:  http://localhost:$BACKEND_PORT/api/docs"
        echo "   ML:       http://localhost:$ML_PORT/docs"
        echo ""
        echo "Press Ctrl+C to stop all services"
        
        # Keep script running and handle cleanup
        trap 'echo "Stopping services..."; kill $ML_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0' INT
        wait
    else
        echo "Backend failed to start"
        kill $ML_PID $FRONTEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "ML Service failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi
