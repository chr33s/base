FROM node:20 AS base

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/local/app
RUN chown node:node /usr/local/app
USER node

FROM base AS build

COPY --chown=node:node . .
RUN NODE_ENV=development npm ci && npm run build --ignore-scripts && npm test

FROM base as run

ARG LOGTAIL_TOKEN_DOCKER
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash -s -- -y \
	&& mkdir -p ~/.vector/config \
	&& curl --silent https://logs.betterstack.com/vector-toml/docker/${LOGTAIL_TOKEN_DOCKER} > ~/.vector/config/vector.toml
COPY --from=build /usr/local/app/dist /usr/local/app/.npmrc /usr/local/app/package*.json ./
RUN npm ci
CMD [ "node", "./server/index.js" ]