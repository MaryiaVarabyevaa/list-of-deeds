FROM node:14-alpine AS builder

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]