---
title: Multi-Site Docker Installation
published: 1
date: 2023-01-18T09:07:04.913Z
tags: administration, advanced feature, docker
editor: markdown
dateCreated: 2022-10-04T18:55:07.723Z
---

If you use the recommended Docker installation method for AzuraCast, you can configure your installation to sit behind a nginx proxy that can also handle other web sites on the same host. This allows you to host, for example, your station's web site on the same server as your AzuraCast installation.

Follow the steps below to configure your installation for multisite support.

## Nginx Proxy Manager

Most users prefer to use a proxy manager that includes a GUI for easier management of the proxy. There are a lot of different tools for this, one of which is the [Nginx Proxy Manager](https://nginxproxymanager.com/), which uses NGINX and includes an easy to use GUI and automatic Let's Encrypt SSL which should be sufficient for most users.

### Enter AzuraCast Base Directory

Connect to your server via SSH and change to the base directory where your AzuraCast installation is located. If you followed the recommended installation instructions (or used a prebuilt image) you can run:

```bash
cd /var/azuracast
```

### Turn Off Existing Services

While you're making these configuration changes, your Docker containers should be turned off. Turn off your existing Docker containers by running:

```bash
docker-compose down
```

This will disconnect your listeners and stop your station from broadcasting. You will not lose any data or statistics during the upgrade.

### Edit AzuraCast Web Serving Ports

The first step is to prevent AzuraCast's own `web` container from trying to listen on ports 80 and 443, as a proxy will now be doing that job instead.

There is a file in the AzuraCast installation directory named `.env` which has two values set by default:

```
AZURACAST_HTTP_PORT=80
AZURACAST_HTTPS_PORT=443
```

:::tip[Note the filename!]
This file is actually named `.env`, not `azuracast.env`, which is a separate file. Most Linux hosts will hide the `.env` file by default, but you can still see it by running `ls -lah` or edit it with a command like `vim .env`.
:::

**Edit the `.env` file** in your editor of choice to change those values to an unused public-facing port. A good option would be the examples below:

```
AZURACAST_HTTP_PORT=10080
AZURACAST_HTTPS_PORT=10443
```

Save your changes and return to the shell.

### Start Docker Services

Turn the Docker AzuraCast containers back on to resume broadcasting with the new setup:

```bash
docker-compose up -d
```

### Setup Nginx Proxy Manager

Create a new directory for the Nginx Proxy Manager and enter it via the following commands:

```bash
mkdir /var/proxy_manager
cd /var/proxy_manager
```

Then create a file with the name `docker-compose.yml` in this directory (for example with `nano`) like this:

```bash
nano docker-compose.yml
```

Now follow the [Quick Setup](https://nginxproxymanager.com/guide/#quick-setup) for the Nginx Proxy Manager starting with step `2`.

### Create Proxy Host for AzuraCast

When you have successfully setup the Nginx Proxy Manager and have access to the GUI you can start creating a proxy for AzuraCast via the `Proxy Hosts` page.

Click on the `Create Proxy Host` button, enter a domain that points to the server in the `Domain Names` field.

In the "Scheme" field, select `https`. In "Forward Hostname/IP", enter the public-facing IP of your server (not the domain name). In "Forward Port", enter the same port you specified above for AzuraCast (in our example, 10443).

Enable the `Websockets Support` option.

Switch to the `SSL` tab and select `Request a new SSL Certificate` in the `SSL Certificate` dropdown.

Enable the `Force SSL` as well as the `HTTP/2 Support` options, enter your e-mail address, agree to the Let's Encrypt Terms of Service and click on the `Save` button.
