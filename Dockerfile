FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ENTRYPOINT npm start

EXPOSE 3000