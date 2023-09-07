FROM node:18.17.1
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm run build
RUN npm run build:server
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]
