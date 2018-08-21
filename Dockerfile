FROM selenium/node-chrome:3.14.0-arsenic
WORKDIR ./app
COPY . ./
RUN sudo apt update

RUN sudo apt install -y curl
RUN sudo apt install -y nodejs npm nano
RUN npm cache clean
RUN sudo npm install -g n
RUN sudo n stable
RUN sudo npm install -g npm
RUN sudo npm i -D nightwatch cucumber nightwatch-cucumber selenium-server cucumber-pretty ntl
RUN sudo npm install --save-dev selenium-server-standalone
RUN sudo npm i -g -D nightwatch cucumber nightwatch-cucumber selenium-server cucumber-pretty ntl
RUN sudo npm install -g --save-dev selenium-server-standalone

CMD [ "tail", "-f", "/dev/null" ]