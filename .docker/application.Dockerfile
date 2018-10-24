FROM selenium:nodechrome
LABEL authors=SeleniumHQ

USER seluser

COPY standalone/selenium.conf /etc/supervisor/conf.d/

COPY . /app

EXPOSE 4444
