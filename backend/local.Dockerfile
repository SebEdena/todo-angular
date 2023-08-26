FROM node:alpine3.18

WORKDIR /app
EXPOSE 3000

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "run", "start:debug:docker"]