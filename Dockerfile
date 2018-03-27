### Base image
FROM mhart/alpine-node:8
### Create and change dir
WORKDIR /app
### Copy whole current dir to /app/ - exclude content of .dockerignore
COPY . /app/
###
RUN npm install npm@latest -g
### Install node modules
RUN npm install
### Create firsttime-launch script
RUN echo \
    "npm install && node_modules/pm2/bin/pm2 --no-daemon start ecosystem.config.js --env local" \ 
    > /installstart.sh
### Open the port to docker network
EXPOSE 8000
### Lauch sequence
ENTRYPOINT ["node_modules/pm2/bin/pm2", "--no-daemon", "start", "ecosystem.config.js", "--env", "local"]
