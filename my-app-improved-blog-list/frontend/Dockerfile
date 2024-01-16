FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm ci
# npm start is the command to start the application in development mode
ENV BACKEND_URL=http://server:3000
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html