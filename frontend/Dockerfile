FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# Copy the contents of the Angular `browser` output into nginx html root
COPY --from=build /app/dist/admin-app/browser/ /usr/share/nginx/html
EXPOSE 80
