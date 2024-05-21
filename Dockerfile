FROM docker.io/node:current-slim
RUN mkdir /app
WORKDIR /app
COPY .output/ ./
ENTRYPOINT ["node","server/index.mjs"]