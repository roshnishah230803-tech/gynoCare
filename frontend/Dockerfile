FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ENV PORT=3000
EXPOSE 3000
# Build and run
RUN npm run build
CMD ["npm", "run", "start"]
