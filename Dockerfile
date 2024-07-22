FROM node:18-alpine as build
WORKDIR /app/src
ENV NPM_CONFIG_LOGLEVEL info
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
CMD node ./dist/project-name/server/server.mjs
