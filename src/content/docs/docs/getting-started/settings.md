---
title: AzuraCast Settings
description: Tuning AzuraCasts settings and performance
published: true
date: 2022-02-22T20:55:16.796Z
tags: getting started
editor: markdown
dateCreated: 2021-02-06T01:26:40.798Z
---

# Environment Variables

There are 2 files with environment variables that can change different aspects of AzuraCast.

Remember to restart AzuraCast after changing values in these files via:

```
docker-compose down
docker-compose up -d
```

## The `.env` File

> Because this file's name starts with a period, it is often hidden when using commands like `ls` to view a directory. You can list a directory (including this file) by using the `ls -a` flag (i.e. `ls -lah`).
{.is-info}

The `.env` file is used by Docker itself to determine how certain parts of the infrastructure is set up.

The default `.env` file contains the following variables:

Variable | Default Value | Description
- | - | -
`COMPOSE_PROJECT_NAME` | azuracast | An internal variable used by Docker Compose; this should not be changed.
`AZURACAST_HTTP_PORT` | 80 | The port used to serve insecure HTTP web traffic.
`AZURACAST_HTTPS_PORT` | 443 | The port used to serve secure HTTPS web traffic.
`AZURACAST_SFTP_PORT` | 2022 | The port used to listen for incoming SFTP connections (used for bulk file management).
`NGINX_TIMEOUT` | 1800 | The time limit (in seconds) that nginx will wait for a response from the PHP application. Corresponds with `proxy_read_timeout` on the proxy and `fastcgi_read_timeout` on the web container. This should match your longest timeout value in `azuracast.env`.
`AZURACAST_PUID` | 1000 | The effective User ID (UID) of the user inside Docker. Matching this to your host UID (`id -u`) can fix permission issues.
`AZURACAST_PGID` | 1000 | The effective Group ID (GID) of the user inside Docker. Matching this to your host GID (`id -g`) can fix permission issues.
`AZURACAST_COMPOSE_PRIVILEGED` | true | Use privileged Docker settings that may not work in nested virtualization environments.

If you don't want to manually edit this file, you can also change the HTTP, HTTPS and SFTP ports by running `./docker.sh change-ports`.

## The `azuracast.env` File

The default `azuracast.env` contains the following variables:

<br>

### AzuraCast Customization

Variable | Default Value | Description
- | - | -
`APPLICATION_ENV` | production | The application environment. <br><br> Valid options: `production`, `development`, `testing`
`LOG_LEVEL` | notice | This allows you to log debug-level errors temporarily (for problem-solving) or reduce the volume of logs that are produced by your installation, without needing to modify whether your installation is a production or development instance. <br><br> Valid options: `debug`, `info`, `notice`, `warning`, `error`, `critical`, `alert`, `emergency`
`COMPOSER_PLUGIN_MODE` | false | Enable the composer "merge" functionality to combine the main application's composer.json file with any plugins' composer files. This can have performance implications, so you should only use it if you use one or more plugins with their own Composer dependencies. <br><br> Valid options: true, false
`AUTO_ASSIGN_PORT_MIN` | 8000 | The minimum port number to use when automatically assigning ports to a station. By default, this matches the first forwarded port on the "stations" container. You can modify this variable if your station port range is different. Be sure to also forward the necessary ports via `docker-compose.yml` (and nginx, if you want to use the built-in port-80/443 proxy)!

<br>

### Database Configuration

Variable | Default Value | Description
- | - | -
`MYSQL_HOST` | mariadb | The host to connect to. Leave this as the default value unless you're connecting to an external database server.
`MYSQL_PORT` | 3306 | The port to connect to. Leave this as the default value unless you're connecting to an external database server.
`MYSQL_USER` | azuracast | The username AzuraCast will use to connect to the database.
`MYSQL_PASSWORD` | azur4c457 | The password AzuraCast will use to connect to the database. By default, the database is not exposed to the Internet at all and this is only an internal password used by the service itself.
`MYSQL_DATABASE` | azuracast | The name of the AzuraCast database.
`MYSQL_RANDOM_ROOT_PASSWORD` | yes | Automatically generate a random root password upon the first database spin-up. This password will be visible in the mariadb container's logs.
`MYSQL_SLOW_QUERY_LOG` | 0 | Log slower queries for the purpose of diagnosing issues. Only turn this on when you need to, by uncommenting this and switching it to 1. To read the slow query log once enabled, run: `docker-compose exec mariadb slow_queries`
`MYSQL_MAX_CONNECTIONS` | 100 | Set the amount of allowed connections to the database. This value should be increased if you are seeing the `Too many connections` error in the logs.

<br>

### Redis Configuration

Uncomment these fields if you are using a third-party Redis host instead of the one provided with AzuraCast.

Do not modify these fields if you are using the standard AzuraCast Redis host.

Variable | Default Value | Description
- | - | -
`REDIS_HOST` | redis | Name of the Redis host.
`REDIS_PORT` | 6379 | Port to connect to on the Redis host.
`REDIS_DB` | 1 | Database index to use on the Redis host.

<br>

### Advanced Configuration

Variable | Default Value | Description
- | - | -
`FTP_PASV_IP` | localhost | Override the IP/hostname to use when negotiating inbound FTP Passive Mode (PASV) connections. The system will attempt to automatically detect this, so you often don't need to change it.
`PHP_MAX_FILE_SIZE` | 25M | PHP's maximum POST body size and max upload filesize.
`PHP_MEMORY_LIMIT` | 128M | PHP's maximum memory limit.
`PHP_MAX_EXECUTION_TIME` | 30 | PHP's maximum script execution time (in seconds).
`SYNC_SHORT_EXECUTION_TIME` | 600 | The maximum execution time (and lock timeout) for the 15-second, 1-minute and 5-minute synchronization tasks.
`SYNC_LONG_EXECUTION_TIME` | 1800 | The maximum execution time (and lock timeout) for the 1-hour synchronization task.
`PHP_FPM_MAX_CHILDREN` | 5 | Maximum number of PHP-FPM worker processes to spawn.
`ADDITIONAL_MEDIA_SYNC_WORKER_COUNT` | 0 | Create additional media sync worker processes. This setting can be used to increase the performance of the media sync process by creating additional worker processes to consume messages
`PROFILING_EXTENSION_ENABLED` | 0 | Enable the SPX profiling extension in the Docker container, allowing for performance analysis of each page load.
