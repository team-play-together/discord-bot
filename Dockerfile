FROM node:16 as builder

ARG APP=/usr/src/app/

WORKDIR ${APP}

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY tsconfig*.json ./
COPY src ./src
COPY tests ./tests

RUN npm run build
# RUN npm run test

FROM node:16 as app

ARG APP=/usr/src/app/

WORKDIR ${APP}

COPY --from=builder ${APP}/package*.json ./
COPY --from=builder ${APP}/dist ./dist

RUN --mount=type=cache,target=/root/.npm npm ci --only=production

ENTRYPOINT ["npm", "run", "start"]
