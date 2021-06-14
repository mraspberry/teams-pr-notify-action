FROM node:lts-alpine

WORKDIR /build
COPY package-lock.json package.json index.js LICENSE /build/

RUN npm install && npm run build

CMD ["node", "/build/dist/index.js"]
