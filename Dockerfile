FROM library/node:20-alpine AS base

RUN apk update \
    && apk add bash curl

RUN mkdir -p /data \
    && chown -R node:node /data

FROM base AS development

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

WORKDIR /data
COPY . .
RUN npm ci --include=dev

FROM production-builds AS build

RUN npm run build

FROM production-builds AS builtin

RUN cp builtin \
    && bash build.sh
