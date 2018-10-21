FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4004

CMD [ "node", "./src/index.js" ]
