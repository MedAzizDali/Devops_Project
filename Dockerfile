FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY index.js ./        # Copying index.js from the root directory
RUN npm install
EXPOSE 3000             # Exposing port 3000
CMD ["node", "index.js"] # Running index.js as the main file
