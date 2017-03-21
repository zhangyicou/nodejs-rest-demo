FROM reg.ibd.lan/keep/node-os:latest
MAINTAINER The CentOS Project <libing@shegnjing360.com>


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# log
#RUN mkdir -p /dat/log
#RUN chmod -R 777 /dat/log

# Install app dependencies
COPY package.json /usr/src/app/
# Bundle app source
COPY . /usr/src/app

RUN npm config set registry https://registry.cnpmjs.org
RUN npm info express

RUN npm install --registry=https://registry.cnpmjs.org
# RUN npm run pm2
# RUN npm run compile

# CSS、JS TAG
WORKDIR /usr/src/app/public
RUN cat config_product.js > config.js
RUN npm install --registry=https://registry.cnpmjs.org
RUN node r.js -o build.js
RUN ./node_modules/gulp/bin/gulp.js

WORKDIR /usr/src/app
# Expose port
EXPOSE 4200
# CMD ["pm2-docker", "start", "--env", "production", "pm2.yml"]
CMD [ "pm2-docker", "start", "--env", "production", "pm2.yml"]
