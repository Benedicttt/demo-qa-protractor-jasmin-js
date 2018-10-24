FROM selenium:nodechrome
LABEL authors=SeleniumHQ

USER root

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash - \
    && apt update \
    && apt install -y -q nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY standalone/selenium.conf /etc/supervisor/conf.d/

COPY . /app

WORKDIR /app

RUN npm i < package.json

USER seluser

RUN mkdir /app/allure-results
RUN chown -R seluser /app/allure-results

EXPOSE 4444
