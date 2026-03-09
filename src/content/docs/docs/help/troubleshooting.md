---
title: Troubleshooting
description: Having trouble with AzuraCast? This page has several resources that can help you solve your problem and be back up and running.
published: true
date: 2022-09-11T02:49:49.703Z
tags: getting started, debugging
editor: markdown
dateCreated: 2021-02-05T21:17:05.327Z
---

Our core maintainers, along with our vast community of station operators, can answer many questions you may have about our software. We also have knowledge base articles set up for common issues encountered by our users.

## First Steps

Your first steps should be to check these docs for any tips or pointers. Many common issues can be solved by following the instructions in our guide pages.

### Checking System Logs

If you aren't sure of what is causing your issue, [checking the logs](/docs/help/logs) can help. Not only do the system logs often explain your error in more detail, but they're essential for our developers to be able to easily diagnose and resolve your issue.

### Flushing the System Cache

Many parts of the AzuraCast system depend on caches to speed up site performance. Sometimes, these caches can get out of
date, and they may cause errors. You can always flush all site-wide caches using one command-line script:

```bash
./docker.sh cli cache:clear
```

## Common Liquidsoap Errors

### "We must catchup x.xx seconds..." related errors

If your station begins to have interrupted audio or crackles, you will often find this "we must catchup" error in Liquidsoap's logs. Fundamentally, this is because Liquidsoap's internal audio buffer falls behind the broadcast itself, which often means that it doesn't have the CPU or other resources needed to keep the broadcast running at full speed.

Some common causes of this can be:

 - **Underprovisioned Server**: It is possible that your server (or VM, VPS, etc) is not powerful enough to sustain the ongoing CPU and RAM load required to operate your station. To continue broadcasting with all of your settings as they are, you may need to consider a more powerful server.

 - **Using CPU-heavy Features (AutoCue, MasterMe, etc.)**: Some features are especially demanding of CPU resources. We try to label these features as "High CPU" in AzuraCast's UI so you are aware of them before enabling them; if you encounter skips or other issues with these features enabled, try disabling them to see if the problem improves, or consider using a more powerful server for your installation.

 - **Too Many Mount Points/Remotes/HLS Streams**: Each individual mount point, remote relay with AutoDJ enabled, or HLS stream type requires Liquidsoap to transcode the broadcast signal into a new format, and thus requires a roughly constant CPU load over time. In newer versions of AzuraCast, we offer an experimental way to consolidate any common encoding formats, optimizing CPU usage if you output the same format to multiple locations.

If you are still encountering issues, we would recommend collecting your station logs and its generated Liquidsoap configuration file and [submitting an issue on the Liquidsoap GitHub](https://github.com/savonet/liquidsoap). We cannot provide extended support for Liquidsoap itself, as we don't maintain the software.

## Common Docker Errors

### "Client version x.xx is too old/new"

This error occurs when your Docker version and Docker Compose version do not match each other.

Our Docker Utility Script will always install "matching" versions of Docker and Docker Compose, so this issue can often be fixed by running:

```bash
# You may need to prefix these commands with `sudo` if running as non-root.
cd /var/azuracast
./docker.sh update-self
./docker.sh install-docker
./docker.sh install-docker-compose
```

### "Invalid interpolation format" related errors

This issue is related to an out of date docker-compose version, since we use a more up to date docker-compose version it'll return these types of errors.

- `ERROR: Invalid interpolation format for "installer" option in service "services": "ghcr.io/azuracast/web:${AZURACAST_VERSION:-latest}"`
- `ERROR: Invalid interpolation format for "nginx_proxy" option in service "services": "ghcr.io/azuracast/nginx_proxy:${AZURACAST_VERSION:-latest}"`

To update your Docker Compose version, run the following commands:

```bash
# You may need to prefix these commands with `sudo` if running as non-root.
cd /var/azuracast
./docker.sh update-self
./docker.sh install-docker-compose
```

### "bind: address already in use"

If you get this error when starting the Docker AzuraCast instance, it means that something else (some other process or server software) is already running on the same port(s) that AzuraCast is trying to reserve for itself.

There are generally two ways to resolve this:

- Find the process that's currently listening on the port (commands like `netstat -tulpn` can help you with this) and either disable the program that's currently listening, edit its configuration to change the port it listens on, or uninstall it from the server completely.
- Switch the port AzuraCast uses for its own traffic to an unused one. [See instructions](/docs/administration/docker)

Since this error is caused by the interaction of some piece of software on your host computer and the Docker daemon, we can't automatically resolve it for you, and the best way to resolve it will depend on how your server is configured and what else is running on it.

Common services that listen on ports 80 and 443 include web servers like Apache and nginx. One common port to use if you still need these services to remain online alongside AzuraCast is port 8080, which we deliberately leave open due to its common usage with other software.

### "WARNING: The LETSENCRYPT_X variable is not set. Defaulting to a blank string."

This message doesn't indicate anything is wrong with your installation; it is simply Docker Compose letting you know that it defaults to an empty string if a certain environment variable isn't present. You will see these messages if you don't have LetsEncrypt configured on your server, and you can safely disregard them.

## Other General Errors

### InnoDB: Upgrade after a crash is not supported

The DB crashed while using MariaDB 10.4 and was then not restarted with the same MariaDB version so that it can recover from the redo log files but was updated to 10.5 which now is not able to handle the old redo log format (in 10.5 they changed that format).

Renaming the `ib_logfile0` (and if there are more `ib_logfile*` files those too) and then starting the db again should work.

You can find those files here: `/var/lib/docker/volumes/azuracast_db_data/_data`

Stop your AzuraCast via `docker-compose down`, then try renaming them via `mv ib_logfile0 ib_logfile0.old` and after that run the update again.

### Failed Database Migrations

In some situations, especially if the automated update process is interrupted for any reason, you can wind up in a state where a databse migration has only halfway completed.

AzuraCast now automatically takes a snapshot of your database as it existed immediately before a migration runs, and if any errors are encountered, it will attempt to restore from that snapshot.

Nevertheless, we strongly recommend that you take routine backups of your installation, including before software updates. If a migration fails and AzuraCast's automatic restoration fails for some reason, restoring from a database backup is the simplest solution.

For power users, if you cannot restore a backup during a failed migration, you may be able to manually execute the incomplete migration by manually executing the unfinished SQL commands. We do not officially support this, however, and using our automated recovery or a backup restoration is strongly preferred.

## Submitting an Issue

If you encounter an issue that you can not resolve with the documentation please refer to our guide on [how to report a bug](/docs/help/report-a-bug).
