FROM node:18.10.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.29.0-alpine
COPY --from=build /app/dist/cnatural-material /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]