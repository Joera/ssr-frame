FROM node:18-alpine

WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY ./renderer/.env .
COPY ./renderer/package.json .
COPY ./renderer/tsconfig.json .
RUN npm install
COPY ./renderer/src ./src

EXPOSE 3009
CMD [ "npm", "run", "start"]