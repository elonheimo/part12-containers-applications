# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN CI=true npm test
ENV REACT_APP_BACKEND_URL=http://localhost:3000
CMD ["npm", "start"]