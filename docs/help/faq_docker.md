---
title: Common Support Solutions (Docker)
---

# Common Support Solutions (Docker Installations)

[[toc]]

## Reset an Account Password

If you have lost the password to log into an account, but still have access to the SSH terminal for the server, you can
execute the following command to generate a new random password for an account in the system.

Replace `YOUREMAILADDRESS` with the e-mail address whose password you intend to reset.

```bash
./docker.sh cli azuracast:account:reset-password YOUREMAILADDRESS
``` 

## Manually Flush the System Cache

Many parts of the AzuraCast system depend on caches to speed up site performance. Sometimes, these caches can get out of
date, and they may cause errors. You can always flush all site-wide caches using one command-line script:

```bash
./docker.sh cli cache:clear
``` 

## Access Files via SFTP

By default, SFTP access isn't set up for Docker based installations. If you have a large volume of media files, you may 
prefer to upload them via SFTP instead of using the web updater. You should *not* use the host operating system's SFTP,
however, as Docker stores station media inside a Docker-specific volume.

The script below will set up a temporary SFTP server that points to your station media directory inside Docker. The server
will stay running inside the terminal window, so you can easily hit `Ctrl+C` to terminate it when you are finished.

```bash
docker run --rm \
    -v azuracast_station_data:/home/azuracast/stations \
    -p 2222:22 atmoz/sftp:alpine \
    azuracast:4zur4c457:1000::stations
```

As long as you leave this script running, it will create a connection that you can access with these credentials:

* **Host:** Your server's host name
* **Port:** `2222` (Set in the third line)
* **Username:** `azuracast` (The first part of the last line)
* **Password:** `4zur4c457` (The second part of the last line) 

If you intend to leave this script running for long term periods, you must change the password to something more secure.

## Use Non-standard Ports

You may want to serve the AzuraCast web application itself on a different port, or host your radio station on a port that 
isn't within the default range AzuraCast serves (8000-8999).

To change the ports on which AzuraCast serves HTTP and HTTPS traffic, you can edit the `.env` file on the host to modify the public-facing port numbers as needed. (Note: this file should already exist on your system, but if it doesn't, you can [use this version for reference](https://github.com/AzuraCast/AzuraCast/blob/master/.env).)

Modify (or create) the lines below to modify your port mappings:

```
AZURACAST_HTTP_PORT=80
AZURACAST_HTTPS_PORT=443
```

You can either specify a single number (i.e. 8080) for each value, or specify "127.0.0.1:8080" to only listen on the localhost. This can be useful when AzuraCast is hosted behind a proxy on your host.

You will need to recycle your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

To override more complex functionality in your Docker installation, see the "Customizing Docker" section below.

## Expand the Docker Radio Station Port Range

For performance reasons, by default Docker installations only open radio ports from port 8000 to 8099. This allows for 10 unique stations to operate.

You can certainly run more than 10 stations on one AzuraCast instance, but if you want to directly access the additional radio ports, you can follow this simple process.

In the same folder where your Docker installation is (if using recommended instructions, this is `/var/azuracast`), create a new file named `docker-compose.override.yml`.

In this file, paste the following contents:

```yaml
version: '2.2'

services:
  stations:
    ports:
      - "8500-8999:8500-8999"
```

You can modify the port range in this file to meet your needs, such as expanding it to port 8999 instead of 8500.

You will need to recycle your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

## Customizing Docker

Docker installations come with four files by default:

- `docker.sh`, the [Docker Utility Script](https://www.azuracast.com/docker_sh.html);
- `.env`, which contains environment variables used by Docker Compose itself;
- `azuracast.env`, which contains customizable environment variables sent to AzuraCast and related services; and
- `docker-compose.yml`, a large file that defines all of the services used by AzuraCast and how they interact.

For power users looking to customize or expand their Docker configuration, you should follow these best practices:

- Do not modify or replace the `docker.sh` utility script.

- When updating (using the `docker.sh` utility script), it is recommended to run `./docker-sh update-self` before running `./docker.sh update`, to ensure the Docker Utility Script itself is up to date before it updates your Docker installation.

- Environment variables set in `.env` are only used by Docker Compose itself, and aren't passed directly into the AzuraCast containers. You should only modify this file to change the HTTP and HTTPS port mappings used by Nginx (see the "Use Non-Standard Ports" section above).

- The `azuracast.env` file is specific to your environment and can be customized however you like. It will not be replaced during any updates. Once your database has been created, however, changing the password listed in this file will cause the system to fail. If you want to destructively wipe your existing database and other files and set up a new one with the updated password, add the `-v` flag to the end of `docker-compose down` to remove all existing volumes, including your database.

- If possible, you should not directly modify `docker-compose.yml`, as some updates may modify how it is defined to resolve bugs or add new features. When updating, you will always be asked if you want to update this file; if you have not modified it, you should always do so.

- Instead of modifying `docker-compose.yml`, you can create a file named `docker-compose.override.yml` with your customizations. The structure of this file is the same as the main `docker-compose.yml` file, and is automatically parsed by Docker Compose to override any definitions in the main file. Updates will not replace this file.

## Adding a intro file

You can add an .mp3 file that is playing when someone connects to your station by mounting your .mp3 file via a `docker-compose.override.yml` into the stations container. What you have to do there is basically creating a file called `docker-compose.override.yml` in the same directory as your `docker.sh` and `docker-compose.yml` with the following content.
This needs to be placed within the `/var/azuracast` directory.  

```
version: '2.2'
services:
    stations:
        volumes:
            - /path/to/your/file.mp3:/usr/local/share/icecast/web/intro.mp3
```
You can place your .mp3 file anywhere on your host machine. You just have to specify the path to it by replacing this part: `/path/to/your/file.mp3`
Now restart AzuraCast via `docker-compose down && docker-compose up -d`

After you've done that you need to go to your mountpoint configuration in AzuraCast and add <intro>/intro.mp3</intro> to the Advanced Custom Frontend Configuration

You might run into format mismatch errors as the intro file has to match what the mountpoint is configured to broadcast. From the Icecast docs: Make sure the format of the file specified matches the streaming format. For more information, you can view the [IceCast documentation here.](https://www.icecast.org/docs/)
