FROM node:8.9.4-alpine
LABEL maintainer="PrivacyCloud <developers@privacycloud.com>"

ARG port=3000

ENV HOME=/home/app
WORKDIR $HOME/api

ADD . .

RUN npm install

ENV PORT=$port
EXPOSE $port

CMD ["npm", "start"]
