FROM node:10.16.3-alpine as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.3-alpine

COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/pullptong/ /usr/share/nginx/html