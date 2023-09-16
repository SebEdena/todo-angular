FROM node:18-alpine3.18

USER node
WORKDIR /app
EXPOSE 3000

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

CMD ["npm", "run", "start:debug:docker"]