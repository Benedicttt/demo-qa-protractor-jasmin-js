FROM selenium/node-chrome:3.14.0-iron
LABEL authors=SeleniumHQ

USER seluser

COPY Standalone/start-selenium-standalone.sh /opt/bin/start-selenium-standalone.sh

COPY Standalone/selenium.conf /etc/supervisor/conf.d/


EXPOSE 4444