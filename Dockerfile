FROM node:20-alpine

RUN apk add g++ make py3-pip

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN apk add --no-cache chromium
RUN apk add --no-cache curl
RUN apk add --no-cache wget
RUN apk add openssh-server
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

RUN yarn --production

ENV PORT 8080
ENV NODE_ENV production

EXPOSE 8080

CMD [ "yarn", "start" ]