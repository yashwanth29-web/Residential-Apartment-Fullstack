FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# Copy the contents of the specific Angular output folder into nginx html root
COPY --from=build /app/dist/admin-app/ /usr/share/nginx/html
EXPOSE 80
