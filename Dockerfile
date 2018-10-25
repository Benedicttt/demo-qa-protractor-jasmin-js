FROM application:base

USER root

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash - \
    && apt update \
    && apt install -y -q nodejs \
    && rm -rf /var/lib/apt/lists/*
    
RUN apt-add-repository ppa:yandex-qatools/allure-framework \
    && apt-get update \
    && apt-get install allure-commandline
    


WORKDIR /app

COPY package.json /app

RUN npm i < ./package.json

USER seluser

