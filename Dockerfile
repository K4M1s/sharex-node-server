FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000
ENV KEY=changemeplease
ENV DOMAIN=https://localhost:3000/
ENV SIZE=100

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]