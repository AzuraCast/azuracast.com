---
title: Common Support Solutions (Docker)
---

# Common Support Solutions (Docker Installations)

[[toc]]

## Common Errors

### "bind: address already in use"

If you get this error when starting the Docker AzuraCast instance, it means that something else (some other process or server software) is already running on the same port(s) that AzuraCast is trying to reserve for itself.

There are generally two ways to resolve this:
- Find the process that's currently listening on the port (commands like `netstat -tulpn` can help you with this) and either disable the program that's currently listening, edit its configuration to change the port it listens on, or uninstall it from the server completely.
- Switch the port AzuraCast uses for its own traffic to an unused one. [See instructions](#use-non-standard-ports)

Since this error is caused by the interaction of some piece of software on your host computer and the Docker daemon, we can't automatically resolve it for you, and the best way to resolve it will depend on how your server is configured and what else is running on it.

Common services that listen on ports 80 and 443 include web servers like Apache and nginx. One common port to use if you still need these services to remain online alongside AzuraCast is port 8080, which we deliberately leave open due to its common usage with other software.

### "WARNING: The LETSENCRYPT_X variable is not set. Defaulting to a blank string."

This message doesn't indicate anything is wrong with your installation; it is simply Docker Compose letting you know that it defaults to an empty string if a certain environment variable isn't present. You will see these messages if you don't have LetsEncrypt configured on your server, and you can safely disregard them.

### "Problem with dial: dial tcp 172.18.X.X:XXXX: connect: connection refused. Sleeping 1s"

This message is usually not an error. It's the result of a safety check we add into our Docker images, so they won't start up fully until other services (in this case, MariaDB, InfluxDB and Redis) are fully started and ready to accept connections. The "web" container periodically pings those services until they're fully started up, and if the service is still starting up, it will produce this "connection refused" error message, then retry again a second later.

If your "web" container _never_ starts up, this could mean there is an error with one of your other containers (`mariadb`, `influxdb`, or `redis`). You can see what may be causing the problem by running `docker-compose logs -f servicename`, where `servicename` is one of the services listed in the previous sentence.

## Customizing Docker

Docker installations come with four files by default:

- `docker.sh`, the [Docker Utility Script](/developers/docker-sh.html#download-the-utility-script);
- `.env`, which contains environment variables used by Docker Compose itself;
- `azuracast.env`, which contains customizable environment variables sent to AzuraCast and related services; and
- `docker-compose.yml`, a large file that defines all of the services used by AzuraCast and how they interact.

For power users looking to customize or expand their Docker configuration, you should follow these best practices:

- Do not modify or replace the `docker.sh` utility script.

- When updating (using the `docker.sh` utility script), it is recommended to run `./docker.sh update-self` before running `./docker.sh update`, to ensure the Docker Utility Script itself is up to date before it updates your Docker installation.

- Environment variables set in `.env` are only used by Docker Compose itself, and aren't passed directly into the AzuraCast containers. You should only modify this file to change the HTTP and HTTPS port mappings used by Nginx (see the "Use Non-Standard Ports" section above).

- The `azuracast.env` file is specific to your environment and can be customized however you like. It will not be replaced during any updates. Once your database has been created, however, changing the password listed in this file will cause the system to fail. If you want to destructively wipe your existing database and other files and set up a new one with the updated password, add the `-v` flag to the end of `docker-compose down` to remove all existing volumes, including your database.

- If possible, you should not directly modify `docker-compose.yml`, as some updates may modify how it is defined to resolve bugs or add new features. When updating, you will always be asked if you want to update this file; if you have not modified it, you should always do so.

- Instead of modifying `docker-compose.yml`, you can create a file named `docker-compose.override.yml` with your customizations. The structure of this file is the same as the main `docker-compose.yml` file, and is automatically parsed by Docker Compose to override any definitions in the main file. Updates will not replace this file.

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

::: tip
AzuraCast now includes a built-in FTP server on Docker installations. Update your installation to take advantage of this feature!
:::

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

You can use a helper tool in the Docker Utility Script to easily change the ports used by AzuraCast:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh change-ports
```

To override more complex functionality in your Docker installation, see the "Customizing Docker" section below.

## Expand the Docker Radio Station Port Range

For performance reasons, by default Docker installations only open radio ports from port 8000 to 8500. This allows for 50 unique stations to operate.

Depending on your hardware, it may be possible to run more than 50 stations on one AzuraCast instance, but if you want to directly access the additional radio ports, you can follow this simple process.

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

You will need to restart your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

## Mounting a directory into a station

You may want to add music to a station from a directory on your host machine without copying the data into AzuraCast. You can mount the directory into your stations and web container to make them available to AzuraCast by creating a `docker-compose.override.yml`.

In the same folder where your Docker installation is (if using recommended instructions, this is `/var/azuracast`), create a new file named `docker-compose.override.yml`.

In this file, paste the following contents:

```yaml
version: '2.2'

services:
  web:
    volumes:
      - /path/on/host/computer:/var/azuracast/stations/<STATION_NAME>/media/

  stations:
    volumes:
      - /path/on/host/computer:/var/azuracast/stations/<STATION_NAME>/media/
```

Replace  the `<STATION_NAME>` with the name of the station directory found under the "Administration" section of the station's profile settings and modify the `/path/on/host/computer` with the path to the directory that you want to mount.

You will need to restart your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

## Storing your station data on the host machine

You can store all of you station data in a directory on your host machine. This can be useful if you want to have AzuraCast running on a small SSD and store the station data on a large HDD.

In the same folder where your Docker installation is (if using recommended instructions, this is `/var/azuracast`), create a new file named `docker-compose.override.yml`.

In this file, paste the following contents:

```yaml
version: '2.2'

services:
  web:
    volumes:
      - /path/on/host/computer:/var/azuracast/stations

  stations:
    volumes:
      - /path/on/host/computer:/var/azuracast/stations
```

Modify the `/path/on/host/computer` with the path to the directory that you want to mount.

You will need to restart your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

## Using a custom default track

When nothing is playing on your station you'll hear the default error.mp3 file of AzuraCast playing. You can replace this file by mounting your own .mp3 file via a `docker-compose.override.yml`.

In the same folder where your Docker installation is (if using recommended instructions, this is `/var/azuracast`), create a new file named `docker-compose.override.yml`.

In this file, paste the following contents:

```yaml
version: '2.2'

services:
    stations:
        volumes:
            - /path/to/your/file.mp3:/usr/local/share/icecast/web/error.mp3
```

You can place your .mp3 file anywhere on your host machine. You just have to specify the path to it by replacing this part: `/path/to/your/file.mp3`

We recommend to put that file inside the `/var/azuracast` directory though so that you have everything in the same place.

You will need to restart your Docker containers using `docker-compose down`, then `docker-compose up -d` to apply any changes made to this file.

::: warning
Make sure that the format of the file specified matches the streaming format exactly.
:::

## Adding a Stream Intro File

You can add a music file to play when someone initially connects to your stream. Remember when creating intro files that they **must match the exact same format, bitrate and sample rate as your mount point to work properly.**

First, tell the Docker filesystem where to find your intro file. Inside the AzuraCast directory on your host (by default, `/var/azuracast`), create a file named `docker-compose.override.yml` with the following contents:

```yaml
version: '2.2'
services:
    stations:
        volumes:
            - /path/to/your/file.mp3:/usr/local/share/icecast/web/intro.mp3
```

Now restart AzuraCast via `docker-compose down && docker-compose up -d`.

Return to the AzuraCast web interface, visit the "Mount Points" page for your station, edit the mount point you want to add an intro for, and inside the "Advanced: Custom Frontend Configuration" field, enter this, based on the last portion of the mounted file from the above example:

```
<intro>/intro.mp3</intro>
```

For more information, see the [IceCast documentation.](https://www.icecast.org/docs/)