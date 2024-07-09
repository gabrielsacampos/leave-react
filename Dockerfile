# Define the build stage
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Define the nginx stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]


# docker build -t front .
# docker run -p 3000:3000 front