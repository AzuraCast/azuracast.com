FROM library/node:lts-slim AS base

RUN mkdir -p /data \
    && chown -R node:node /data

## Install HTTPS support for APT.
RUN apt-get update \
    && apt-get install -y --no-install-recommends apt-utils apt-transport-https ca-certificates

## Upgrade all packages.
RUN apt-get update \
    && apt-get dist-upgrade -y --no-install-recommends -o Dpkg::Options::="--force-confold"

FROM base AS development

RUN apt-get update \
    && apt-get -y install --no-install-recommends bash curl

RUN USER=node && \
    GROUP=node && \
    curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.5.1/fixuid-0.5.1-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    printf "user: $USER\ngroup: $GROUP\npaths:\n  - /\n  - /data/node_modules\n" > /etc/fixuid/config.yml

COPY ./build/build_entrypoint.sh /
RUN chmod a+x /build_entrypoint.sh

# Define working directory.
WORKDIR /data

# Define working user.
USER node

# Define default command.
ENTRYPOINT ["/build_entrypoint.sh"]
CMD ["npm", "run", "dev"]

FROM base AS production-builds

RUN mkdir -p /dist \
    && chown -R node:node /dist

WORKDIR /data
COPY --chown=node:node . .

USER node

FROM production-builds AS pre-build

USER node

RUN npm ci --include=dev \
    && npm run build \
    && cp -RT ./dist /dist \
    && rm -rf ./node_modules ./dist \
    && npm cache clean --force

FROM scratch AS build

COPY --from=pre-build /dist /dist

FROM production-builds AS pre-builtin

USER node

WORKDIR /data/builtin

RUN rm -rf ./src ./dist ./public \
    && mkdir -p ./src/content/docs ./src/pages ./src/images ./src/scss \
    && cp ../src/content/config.ts ./src/content \
    && cp -R ../src/content/docs/docs ./src/content \
    && cp -R ../src/pages/api ./src/pages/api \
    && cp -R ../src/images/* ./src/images \
    && cp -R ../src/scss/* ./src/scss \
    && rm -f ./src/content/docs/*.* \
    && cp ./index.md ./src/content/docs \
    && mkdir -p ./public \
    && cp -R ../public/img ./public/img \
    && sed -i -r 's|url: "(.*?)"|url: "/api/openapi.yml"|' ./src/pages/api/index.astro \
    && cd .. \
    && npm ci --include=dev \
    && npm run builtin-build \
    && rm -rf ./node_modules \
    && cd builtin \
    && cp -RT ./dist /dist \
    && rm -rf ./src ./dist ./public ./node_modules \
    && npm cache clean --force

FROM scratch AS builtin

COPY --from=pre-builtin /dist /dist