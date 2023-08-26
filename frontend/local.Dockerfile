FROM node:alpine3.18

WORKDIR /app
EXPOSE 4200

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "start"]