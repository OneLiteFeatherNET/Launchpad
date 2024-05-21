FROM docker.io/node:current-slim
RUN mkdir /app
WORKDIR /app
COPY .output/ ./
RUN ls -la 
ENTRYPOINT ["node","server/index.mjs"]