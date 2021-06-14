FROM node:lts-alpine as builder


COPY * /build/

WORKDIR /build

RUN npm install && npm run build

CMD ["node", "/build/dist/index.js"]
