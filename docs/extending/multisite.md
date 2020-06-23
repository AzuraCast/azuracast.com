---
title: AzuraCast Multi-Site Docker Installation
---

# AzuraCast Multi-Site Docker Installation

As of the latest development version of AzuraCast, support for multiple sites is built directly into the core AzuraCast installation. No additional modification is required.

## How it Works

AzuraCast's Docker installation now includes a built-in reverse proxy powered by [jwilder's nginx-proxy]((https://github.com/jwilder/nginx-proxy). This reverse proxy is what listens on the public web ports (80 for HTTP and 443 for HTTPS) and also manages LetsEncrypt for the installation. By default, it is configured to send all traffic to the AzuraCast container.

The proxy service will automatically detect new Docker containers that are started and can serve them via different domain names than your AzuraCast installation. This allows you to add other containers to serve, for example, your station's homepage from the same server.

One big requirement of our Multi-site setup is that **all sites must be served via Docker**. You can't serve any sites directly from the host computer, since the Docker proxy won't be aware of it. Many popular services are already Docker-compatible and have examples for setting them up inside Docker.

The multi-site setup is an advanced use of AzuraCast and we don't provide official support if something goes wrong with the other hosted web sites, so only use this feature if you're confident in creating and modifying Docker Compose files.

## Adding Other Sites

### Example: Wordpress Site

A common scenario our users encounter is wanting to host their station's homepage on the same server as their AzuraCast instance. This example will walk you through one way of accomplishing this using the official Wordpress Docker image.

#### Update AzuraCast Instance

First, make sure your AzuraCast instance is up-to-date and is already running. You can do this by running:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh update
```

#### Create New Directory

You should begin by creating a new directory that's separate from the main AzuraCast directory. In our example, we're using `/var/wordpress` for ease of explanation.

```bash
mkdir -p /var/wordpress
cd /var/wordpress
```

#### Create `docker-compose.yml` File

Inside the new directory, create a new file named `docker-compose.yml` based on the format below. Note the areas highlighted with comments, which indicate things you should change:

```yml
version: '2.2'

services:
    wordpress:
        image: wordpress:latest
        depends_on:
         - db
        networks:
         - azuracast_frontend
         - backend
        restart: always
        environment:
            # Change this to the domain your Wordpress site should be served on.
            VIRTUAL_HOST: wordpress.example.com
            # If you want to use LetsEncrypt on this domain, uncomment these and update them.
            # LETSENCRYPT_HOST: wordpress.example.com
            # LETSENCRYPT_EMAIL: youremail@example.com
            WORDPRESS_DB_HOST: db:3306
            # If you customize these values, make sure to customize them below also.
            WORDPRESS_DB_USER: wordpress
            WORDPRESS_DB_PASSWORD: wordpress
            WORDPRESS_DB_NAME: wordpress

    db:
        image: mysql:5.7
        volumes:
         - db_data:/var/lib/mysql
        networks:
         - backend
        restart: always
        environment:
            # If you customize these values, make sure to customize them above also.
            MYSQL_ROOT_PASSWORD: somewordpress
            MYSQL_DATABASE: wordpress
            MYSQL_USER: wordpress
            MYSQL_PASSWORD: wordpress

networks:
    azuracast_frontend:
        external: true
    backend:
        driver: bridge

volumes:
    db_data: {}
```
   
Once created and saved, you can spin up the new service by running `docker-compose up -d` in the same directory.