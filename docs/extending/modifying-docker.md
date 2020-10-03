---
title: Modifying Docker
---

# Modifying Docker

The AzuraCast Docker installation is built to serve the needs of the vast majority of installations out of the box, but there may be times when you need to customize how Docker serves your installation, while still retaining the benefits of compatibility and easy updating that Docker offers.

[[toc]]

## How AzuraCast's Docker Installation Works

### The Overall Infrastructure

We have created a simple diagram to explain how our Docker infrastructure is separated into individual containers that handle each major component of the installation:

![](/img/docker_infrastructure.png)

In summary, AzuraCast has five major containers that handle the application's functionality:
 - `web`, which contains the main web server (nginx), the application language (PHP), and the built-in SFTP service,
 - `stations`, which contains the broadcasting backend (Liquidsoap) and frontend (Icecast/SHOUTcast) for every station,
 - `mariadb` which contains the application database running on the MariaDB database engine,
 - `redis` which is a high-performance cache used for sessions and other cacheable data, and
 - `influxdb` which provides the time-series data that we use for our statistics and reporting tools.

 ### Docker Compose

In order to make our Docker installation simple to maintain, we rely on a secondary piece of software called [Docker Compose](https://docs.docker.com/compose/). Rather than using lengthy command-line commands, Docker Compose allows you to write simple YAML files to configure the way our Docker containers launch, which ports they forward to the host, mounted disk volumes, etc.

If you follow our installation instructions (or use one of our prebuilt images), your Docker installation is located on your host computer at `/var/azuracast`. Within this folder, you'll see four files by default:

 - `docker-compose.yml`, the primary Docker Compose configuration file. AzuraCast's updater automatically prompts you to keep this file updated, which is strongly recommended;
 - `docker.sh`, the Docker Utility Script that provides easy aliases for common Docker tasks, such as updating, executing commands inside containers, and more;
 - `azuracast.env`, a list of environment (configuration) variables that are sent to the AzuraCast application itself, running inside the web container; and
 - `.env`, a separate environment file that affects how Docker Compose _itself_ is configured, and is thus used for higher-level configuration changes like port mappings.

### Overriding Docker Compose

Rather than modifying `docker-compose.yml` directly, it is strongly recommended to instead create a new file called `docker-compose.override.yml` in the same folder. Docker Compose will automatically look for and include this file if it exists, and apply its configuration on top of the base file's instructions.

There are some considerations when creating your own `docker-compose.override.yml`:

 - The file must be valid YAML using the standard [Docker Compose format](https://docs.docker.com/compose/compose-file/compose-file-v2/).
 - The file must use the same "version" header as the main `docker-compose.yml` file, currently `2.2`.
 - When modifying ports or other lists, you can only add new items, not remove existing ones.

Once you've modified your Docker Compose configuration, you should apply these changes by running:

```sh
docker-compose down
docker-compose up -d
```

Note that this will temporarily shut down your AzuraCast installation and will briefly disconnect your listeners.

## Common Examples

### Custom nginx Configuration

If you want to add custom subfolders, block certain IPs, or otherwise modify how the AzuraCast web application itself is served, you may need to modify your nginx configuration.

For convenience, you can copy the existing nginx configuration to your host by running this command while the installation is up and running:

```sh
docker cp azuracast_web:/etc/nginx/conf.d/azuracast.conf /var/azuracast/azuracast-nginx.conf
```

Modify your file as needed, and then mount it back into the container by creating or modifying your `docker-compose.override.yml` like so:

```yaml
version: '2.2'

services:
  web:
    volumes:
     - /var/azuracast/azuracast-nginx.conf:/etc/nginx/conf.d/azuracast.conf:ro
```

### Custom SSL Certificates

If you want to supply your own SSL certificates instead of using the built-in LetsEncrypt service, you can mount your certificate files to the appropriate locations using a `docker-compose.override.yml` file like this one:

```yaml
version: '2.2'

services:
  nginx_proxy:
    volumes:
      - /path/on/host/to/ssl.crt:/etc/nginx/certs/yourdomain.com.crt:ro
      - /path/on/host/to/ssl.key:/etc/nginx/certs/yourdomain.com.key:ro

  stations:
    volumes:
      - /path/on/host/to/ssl.crt:/etc/nginx/certs/yourdomain.com.crt:ro
      - /path/on/host/to/ssl.key:/etc/nginx/certs/yourdomain.com.key:ro
```
