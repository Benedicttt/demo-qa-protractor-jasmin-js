FROM selenium/standalone-chrome

RUN sudo mkdir -pv /app
WORKDIR /app

RUN sudo curl --silent --location https://deb.nodesource.com/setup_10.x | sudo bash -
RUN sudo apt install -y nodejs
RUN sudo npm i -g ntl protractor webdriver-manager

COPY .

RUN sudo npm i

CMD [ "tail", "-f", "/dev/null" ]
