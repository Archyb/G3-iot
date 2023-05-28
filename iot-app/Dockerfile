FROM node:14

WORKDIR /iot-app
COPY package.json .
RUN npm install express-validator & npm install 
COPY . .
CMD npm start
