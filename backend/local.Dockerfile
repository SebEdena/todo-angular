FROM node:20-alpine

USER node
WORKDIR /app
EXPOSE 3000

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

CMD ["npm", "run", "start:debug:docker"]