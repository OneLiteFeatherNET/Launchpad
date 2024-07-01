FROM docker.io/node:20.14-slim

RUN mkdir /app
WORKDIR /app

COPY .output/ ./

ENTRYPOINT ["node","server/index.mjs"]
