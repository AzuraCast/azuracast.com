---
title: Enabling HTTPS with LetsEncrypt
---

# Enabling HTTPS with LetsEncrypt

::: tip
Automatic LetsEncrypt setup and renewal are only available in the Docker installation. For other installation types, you can directly use [Certbot](https://certbot.eff.org/).
:::

LetsEncrypt is a free and simple way to allow safe and secure connections to your AzuraCast installation. With a valid SSL certificate, you can:
 - Secure your connection to AzuraCast when administering your stations,
 - Enforce security for all AzuraCast administrators via HTTP Strict Transport Security (HSTS), and
 - Provide a secure listening endpoint to listeners, avoiding "Mixed Content" warnings when your radio signal is played from a secure web page.

## Important Considerations

Before setting up LetsEncrypt, you should make sure the following conditions are met:

 - **AzuraCast must be on its own domain or subdomain.** You can't set up LetsEncrypt using only an IP address; you must have a domain (i.e. `mysite.com`) or a subdomain (`radio.mysite.com`) set up to point to your AzuraCast installation.
 - **AzuraCast's web server must be served on the default ports, 80 for HTTP and 443 for HTTPS.** By default, AzuraCast is already set up this way, but if you've modified the ports to serve the site on a secondary port, you must switch the ports back to the defaults when setting up LetsEncrypt and when performing renewals.

## Enabling LetsEncrypt

Connect to your host server via a terminal (SSH) connection and execute the following commands:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh letsencrypt-create
```

Answer the prompts as shown to complete the setup process.

### Renew a LetsEncrypt Certificate

The web service will automatically renew your LetsEncrypt certificates. If you provide an e-mail in the initial setup process, that e-mail will be used to send you reminders of upcoming expiration in the event that automatic renewal fails.

## Using a Custom Certificate

If you have a custom SSL certificate on your host, you should create a `docker-compose.override.yml` file in your `/var/azuracast` directory on the host server with the contents below, modified to reflect your domain name and the path to your SSL certificate and key:

```yml
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

The naming convention for the mapping (the second part of each of the `volumes` section above) is the following:

 - Domain name: `example.azuracast.com`
 - Certificate path: `/etc/nginx/certs/example.azuracast.com.crt`
 - Key path: `/etc/nginx/certs/example.azuracast.com.key`
