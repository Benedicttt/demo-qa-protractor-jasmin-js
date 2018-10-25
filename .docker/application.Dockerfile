FROM node:10-alpine

COPY . /app

WORKDIR /app
    
RUN apt-add-repository ppa:yandex-qatools/allure-framework \
    && apt-get update \
    && apt-get install allure-commandline

RUN npm i < package.json

