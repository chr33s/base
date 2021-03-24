FROM node:14-slim

ARG SENTRY_DSN_SERVER

WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --no-optional
COPY . .
RUN npm run build
RUN npm install --only=production

EXPOSE ${PORT}

CMD [ "npm", "start" ]
