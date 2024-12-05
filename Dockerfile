FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN ls -al /app/

EXPOSE 8080

CMD ["pushd", "/app"]

CMD ["sh", "-c", "npm install && npm run serve"]
