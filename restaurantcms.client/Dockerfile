# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --mode production  # <-- Add production mode flag

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]