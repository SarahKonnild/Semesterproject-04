FROM node:alpine

ARG dir="/usr/src/authservice"

RUN mkdir -p ${dir}

WORKDIR ${dir}

COPY . package.json
COPY . package-lock.json

RUN npm install -y 

COPY . ${dir}
