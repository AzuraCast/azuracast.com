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
./docker.sh letsencrypt-create mydomain.example.com
```

Be sure to replace `mydomain.example.com` with the domain name that points to your AzuraCast installation.

### Renew a LetsEncrypt Certificate

Your LetsEncrypt certificate is valid for 3 months. The web service will automatically attempt to renew certificates periodically.

In the event you need to manually renew the certificate, you can connect to your host server via a terminal (SSH) connection and execute the following commands:

```bash
cd /var/azuracast
./docker.sh letsencrypt-renew
```

This command will manually renew any previously established LetsEncrypt certificates.