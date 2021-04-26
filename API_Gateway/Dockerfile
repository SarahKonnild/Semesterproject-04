FROM node:alpine

ARG dir="/usr/src/gatewayservice"

RUN mkdir -p ${dir}

WORKDIR ${dir}

COPY . package.json
COPY . package-lock.json

RUN npm install -y 

COPY . ${dir}

EXPOSE 5000

CMD ["npm","run", "start-dev"]