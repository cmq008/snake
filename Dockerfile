# Base Image
FROM node:18.17 AS build

WORKDIR /snake
COPY .  .
RUN npm install
RUN npm run build

# New Base Image
FROM nginx:1.23.3-alpine

# --from build is coming from the Base Image
COPY --from=build /snake/build /usr/share/nginx/html
COPY --from=build /snake/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000