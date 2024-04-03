FROM node:20.12.0

WORKDIR /var/www/server

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]