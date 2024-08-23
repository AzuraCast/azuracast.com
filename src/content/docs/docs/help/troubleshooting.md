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

If you aren't sure of what is causing your issue, [checking the logs](/docs/help/logs) can help. Not only do the system logs often explain your error in more detail, but they're essential for our developers to be able to easily diagnose and resolve your issue.

## Flushing the System Cache

Many parts of the AzuraCast system depend on caches to speed up site performance. Sometimes, these caches can get out of
date, and they may cause errors. You can always flush all site-wide caches using one command-line script:

For Docker Installations:

```bash
./docker.sh cli cache:clear
```

For Ansible Installations:

```bash
php /var/azuracast/www/bin/console cache:clear
```

## Common Docker Errors

### "Invalid interpolation format" related errors

This issue is related to an out of date docker-compose version, since we use a more up to date docker-compose version it'll return these types of errors.

- `ERROR: Invalid interpolation format for "installer" option in service "services": "ghcr.io/azuracast/web:${AZURACAST_VERSION:-latest}"`
- `ERROR: Invalid interpolation format for "nginx_proxy" option in service "services": "ghcr.io/azuracast/nginx_proxy:${AZURACAST_VERSION:-latest}"`

The solution is simple, run these commands. You may need to run it with `sudo` permissions:

```bash
./docker.sh install-docker-compose
./docker.sh install
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

In some situations, especially if the automated update process is interrupted for any reason, you can wind up in a state where a databse migration has only halfway completed. During subsequent updates, the migration will try to run from the beginning, which leads to it re-running queries that have already run, which results in an error that looks like:

```
SQLSTATE[42000]: Syntax error or access violation: ...
```

#### What Causes This

We use MariaDB as our database layer, and while MariaDB is a very powerful and capable database solution, one of its limitations is that it cannot do transactional table alterations. In other words, you can't wrap "ALTER TABLE" statements in a transaction that can then be rolled back in the event of errors. Some other databases (like PostGreSQL) support transactional table alterations, but switching databases would be difficult, if not impossible, for our installed user base.

#### Easy Solution: Restore from a Backup

This situation is one of the primary reasons why we strongly encourage users to keep regular backups of their installations. Restoring from a backup is a very simple way to resolve the issue, as it will bring you back to a known working state, where you can then run the update process again (and it will likely continue without issues).

#### Advanced Solution: Modify the Database

**Caution:** This is only advised for very advanced users who are comfortable modifying the underlying database powering AzuraCast.

We don't provide specific instructions for this process as it can cause irreparable damage to your installation, but basically, the process would be:

- Identify which migration is failing.
- Find the corresponding migration (in the `src/Entity/Migrations` folder).
- Find which step is failing in the `up` function, and find the corresponding SQL commands to undo those specific migrations in the `down` command in the same file.
- Manually run those commands via `./docker.sh cli dbal:run-sql "SQL COMMAND HERE"`
- Re-run the update process.

## Submitting an Issue

If you encounter an issue that you can not resolve with the documentation please refer to our guide on [how to report a bug](/docs/help/report-a-bug).
