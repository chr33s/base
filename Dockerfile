FROM node:18 AS base

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/local/app
RUN chown node:node /usr/local/app
USER node

FROM base AS build

COPY --chown=node:node . .
RUN NODE_ENV=development npm ci && npm run build --ignore-scripts && npm test

FROM base as run

COPY --from=build /usr/local/app/dist .
CMD [ "node", "./server/index.mjs" ]