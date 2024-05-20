FROM docker.io/node:current-slim
RUN mkdir /app
WORKDIR /app
COPY .output/ ./app
ENTRYPOINT ["node","server/index.mjs"]