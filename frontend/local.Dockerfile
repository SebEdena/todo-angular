FROM node:18-alpine3.18

USER node
WORKDIR /app
EXPOSE 4200

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

CMD ["npm", "start", "--", "--host", "0.0.0.0"]