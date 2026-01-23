# Stage 1: Build Angular app (Angular 7 compatible)
FROM node:14-alpine AS build

WORKDIR /app

# Install Angular CLI compatible with Angular 7
RUN npm install -g @angular/cli@7.3.10

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --prod

# Stage 2: Deploy to Tomcat
FROM tomcat:9.0-jdk17-temurin

RUN rm -rf /usr/local/tomcat/webapps/*

# ⚠️ Replace ORSProject10-UI with your actual dist folder name
COPY --from=build /app/dist/ORSProject10-UI /usr/local/tomcat/webapps/ROOT

EXPOSE 8080
CMD ["catalina.sh", "run"]
