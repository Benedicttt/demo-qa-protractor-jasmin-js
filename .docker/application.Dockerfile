FROM ubuntu:xenial-20181005

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y software-properties-common

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash - \
    && apt update \
    && apt install -y -q nodejs
    
RUN apt-add-repository -y ppa:qameta/allure \
    && apt-get update \
    && apt-get -y install allure \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package.json

RUN npm i < package.json

