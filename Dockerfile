FROM node:lts-alpine as builder

WORKDIR /build

COPY package*.json index.js LICENSE .

RUN npm install && npm run build

CMD ["node", "dist/index.js"]
