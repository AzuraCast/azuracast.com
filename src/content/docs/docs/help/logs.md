---
title: Logs
description: How to get logs and what logs are available
published: true
date: 2022-05-20T14:33:03.102Z
tags: getting started, debugging
editor: markdown
dateCreated: 2021-02-05T22:33:04.885Z
---

Before submitting any GitHub issues, you should take a look at the terminal logs that AzuraCast outputs. They can often provide additional information about the error, or include very useful information that should be included in any GitHub issue you create.

Users with the appropriate permissions can also view many logs directly through AzuraCast itself. The Log Viewer feature is available under "Logs" in each station's management page.

## System Logs

If you are administrating your own AzuraCast installation you can check most logs through the `Administration` -> `System Logs`.

In addition to the `IceCast`, `SHOUTcast` and `Liquidsoap` logs you can find the `AzuraCast Application Log` here which contains useful information about what the AzuraCast application itself is doing.

## Log Viewer

The `Logs` link in your station sidebar menu gives you access to the Logs from your station's `IceCast`, `SHOUTcast` and `Liquidsoap` processes.

In addition to the logs, you can also view the IceCast, SHOUTcast and Liquidsoap configuration scripts that AzuraCast automatically generates for you.

## Log Types

### AzuraCast Application Log
 
This log file contains the log output of the AzuraCast application itself. If you encounter any errors with the application itself you will most likely find more information about those errors in this log file.

### Liquidsoap Log

This log file contains the log output of the Liquidsoap instance for your station. Liquidsoap is responsible for the audio transcoding in AzuraCast and interfaces with the AzuraCast application to provide the AutoDJ for your station.

In this log you can find information on how the streams are generated, what information the AutoDJ sent to Liquidsoap, errors, warnings and more.

If you encounter any problems with your stream generation this look should contain useful information in diagnosing the issue.

### IceCast Access Log

This log file contains the raw access log data of the IceCast server.

For most issues this log does not contain any useful information but can be used for analytical purposes.

### IceCast Error Log

This log file contains the error output of the IceCast server.

If you encounter any problems with accessing the streams or your mount points this is were should start looking into.

## Docker Container Logs

Some system logs can only be accessed from a shell session on the host computer. To view the logs for your AzuraCast installation, run:

```bash
cd /var/azuracast
docker-compose logs -f web
```

## For Ansible Installations

Since the Ansible installation interacts directly with your host server, its logs are in various locations across the system.

- AzuraCast: `/var/azuracast/www_tmp/app.log`
- Nginx Access: `/var/azuracast/www_tmp/access.log`
- Nginx Errors: `/var/azuracast/www_tmp/error.log`
- PHP: `/var/azuracast/www_tmp/php_errors.log`
- Supervisord: `/var/azuracast/www_tmp/supervisord.log`
- Redis: `/var/log/redis/redis-server.log`
- MariaDB: `/var/log/mysql`

For each station, logs for radio software will be inside `/var/azuracast/stations/{station_short_name}/config`, with the following filenames:

 - Liquidsoap: `liquidsoap.log`
 - Icecast: `icecast.log`
 - SHOUTcast: `sc_serv.log`
