---
title: AzuraCast Multi-Site Docker Installation
---

# AzuraCast Multi-Site Docker Installation

If you use the recommended Docker installation method for AzuraCast, you can configure your installation to sit behind a nginx proxy that can also handle other web sites on the same host. This allows you to host, for example, your station's web site on the same server as your AzuraCast installation.

Follow the steps below to configure your installation for multisite support.

[[toc]]

## Enter AzuraCast Base Directory

Connect to your server via SSH and change to the base directory where your AzuraCast installation is located. If you followed the recommended installation instructions (or used a prebuilt image) you can run:

```bash
cd /var/azuracast
```

## Turn Off Existing Services

While you're making these configuration changes, your Docker containers should be turned off. Turn off your existing Docker containers by running:

```bash
docker-compose down
```

This will disconnect your listeners and stop your station from broadcasting. You will not lose any data or statistics during the upgrade.

## Edit AzuraCast Web Serving Ports

The first step is to prevent AzuraCast's own `web` container from trying to listen on ports 80 and 443, as a proxy will now be doing that job instead.

There is a file in the AzuraCast installation directory named `.env` which has two values set by default:

```
AZURACAST_HTTP_PORT=80
AZURACAST_HTTPS_PORT=443
```

**Edit the `.env` file** in your editor of choice to change those values to an unused public-facing port. A good option would be the examples below:

```
AZURACAST_HTTP_PORT=10080
AZURACAST_HTTPS_PORT=10443
```

Save your changes and return to the shell.

## Download Custom Override File

We have set up a custom override file that configures both the nginx proxy and its own automated LetsEncrypt support (which is slightly different from our own).

You can download our custom override file by running the command below:

```bash
cp docker-compose.override.yml docker-compose.override.bak.yml
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/master/docker-compose.multisite.yml > docker-compose.override.yml
```

Note that if you've already set up an override file with other modifications, you should make sure to apply the same changes that are now located in `docker-compose.override.bak.yml` to the newly downloaded `docker-compose.override.yml` file.

## Optional: Configure LetsEncrypt

If you want to enable automated LetsEncrypt certificate retrieval and renewal, **edit the `docker-compose.override.yml` file** in your editor of choice and follow the instructions in the file to specify your domain name, LetsEncrypt domain and e-mail address.

If these values are configured and the domain name you specify resolves to your server, LetsEncrypt will automatically set up your SSL certificates and keep them renewed behind the scenes.

## Start Docker Services

Turn the Docker AzuraCast containers back on to resume broadcasting with the new setup:

```bash
docker-compose up -d
```

## Adding Other Containers

Once you've set up the nginx proxy container, any other Docker container that is spun up on the server and has the `VIRTUAL_HOST` environment variable set will be served by the same proxy service.

For more information, you can visit the [nginx-proxy repository documentation](https://github.com/jwilder/nginx-proxy).