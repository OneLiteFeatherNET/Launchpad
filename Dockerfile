FROM docker.io/node:current-slim
RUN mkdir /app
WORKDIR /app
COPY .output/ ./
RUN ls -la public
ENTRYPOINT ["node","public/server/index.mjs"]