### STAGE 1: Build ###
FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
#FROM nginx:1.17.1-alpine
#COPY default.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /usr/src/app/dist/kanban-ui /usr/share/nginx/html
#EXPOSE 80
FROM nginx:1.16.0-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80 3000
CMD ["nginx", "-g", "daemon off;"]
