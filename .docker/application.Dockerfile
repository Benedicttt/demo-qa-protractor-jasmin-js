FROM node:10-stretch

RUN apt-get update \
    && apt-get install -y software-properties-common
    
RUN apt-add-repository -y ppa:qameta/allure \
    && apt-get update \
    && apt-get -y install allure \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package.json

RUN npm i < package.json

