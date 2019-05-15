# Support for Ansible ("Traditional" / "Bare Metal" Installations)

Having trouble with your AzuraCast installation? These pointers may be able to help.

If you still don't find what you're looking for, check the GitHub Issues section for an existing issue relating to the one you're experiencing. If one does not exist, create a new one.

## Troubleshooting by Viewing Logs

Before submitting any GitHub issues, you should take a look at the terminal logs that AzuraCast outputs. They can often provide additional information about the error, or include very useful information that should be included in any GitHub issue you create.

Users with the appropriate permissions can also view many logs directly through AzuraCast itself. The Log Viewer feature is available under "Utilities" in each station's management page.

Since the Ansible installation interacts directly with your host server, its logs are in various locations across the system.

- AzuraCast: `/var/azuracast/www_tmp/azuracast.log`
- Nginx Access: `/var/azuracast/www_tmp/access.log`
- Nginx Errors: `/var/azuracast/www_tmp/error.log`
- PHP: `/var/azuracast/www_tmp/php_errors.log`
- Supervisord: `/var/azuracast/www_tmp/supervisord.log`
- Redis: `/var/log/redis/redis-server.log`
- MariaDB: `/var/log/mysql`
- InfluxDB: `/var/log/influxdb`

For each station, logs for radio software will be inside `/var/azuracast/stations/{station_short_name}/config`, with the following filenames:

- Liquidsoap: `liquidsoap.log`
- Icecast: `icecast.log`
- SHOUTcast: `sc_serv.log`

## Common Solutions

### Reset an Account Password

If you have lost the password to log into an account, but still have access to the SSH terminal for the server, you can
execute the following command to generate a new random password for an account in the system.

Replace `YOUREMAILADDRESS` with the e-mail address whose password you intend to reset.

```bash
php /var/azuracast/www/bin/azuracast.php azuracast:account:reset-password YOUREMAILADDRESS
```

### Manually Flush the System Cache

Many parts of the AzuraCast system depend on caches to speed up site performance. Sometimes, these caches can get out of
date, and they may cause errors. You can always flush all site-wide caches using one command-line script:

```bash
php /var/azuracast/www/bin/azuracast.php cache:clear
```

### Force a Full Update

Normally, the Ansible installer's update script only updates the portion of the system that have been modified since
your last update. If an update was interrupted or otherwise is causing trouble, you can force the update script to process
all components, which can often fix any issues:

```bash
./update.sh --full
```

### Use Non-standard Ports

You may want to serve the AzuraCast web application itself on a different port, or host your radio station on a port that 
isn't within the default range AzuraCast serves (8000-8999).

To modify the port your web application runs on, modify the configuration file in `/etc/nginx/sites-available/00-azuracast`.
Note that some updates may overwrite this file.

You can specify any port in any range for your station to use, provided the port isn't already in use.

By default, AzuraCast installs and enables the ufw (uncomplicated firewall) and sets it to lock down traffic to only SSH 
and the ports used by AzuraCast. If you're using a nonstandard port, you will likely also want to enable incoming traffic
on that port using the command `ufw allow PORTNUM`, where `PORTNUM` is the new port number.