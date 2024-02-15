FROM node:18-alpine

WORKDIR /usr/src/app
COPY ./attestations/.env .
COPY ./attestations/package.json .
COPY ./attestations/tsconfig.json .
RUN npm install
COPY ./attestations/src ./src

EXPOSE 3011
CMD [ "npm", "run", "start"]

