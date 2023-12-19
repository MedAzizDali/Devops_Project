FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY auth/auth.js ./   # Copying auth.js from auth directory
RUN npm install
EXPOSE 4000            # Exposing port 4000
CMD ["node", "auth.js"] # Running auth.js as the main file
