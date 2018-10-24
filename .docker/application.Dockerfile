FROM selenium:nodechrome
LABEL authors=SeleniumHQ

USER seluser

COPY standalone/selenium.conf /etc/supervisor/conf.d/

EXPOSE 4444
