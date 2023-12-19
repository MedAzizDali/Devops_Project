FROM node:lts-alpine


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY auth.js ./


EXPOSE 4000


CMD ["node", "auth.js"]
