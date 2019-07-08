FROM node:alpine

WORKDIR /data

COPY . /data

RUN yarn install

CMD ["yarn", "dev"]
