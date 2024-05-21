FROM docker.io/node:current-slim
RUN mkdir /app
WORKDIR /app
COPY .output/ ./
ENTRYPOINT ["node",".output/server/index.mjs"]