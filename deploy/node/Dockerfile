FROM node:14.4-alpine

EXPOSE 8080

RUN apk add --no-cache bash tini

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

CMD ["node", "server.js"]
