FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY auth/auth.js ./   
RUN npm install
EXPOSE 4000            
CMD ["node", "auth.js"] 
