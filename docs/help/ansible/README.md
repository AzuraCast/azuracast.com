---
title: Common Support Solutions (Ansible)
---

# Common Support Solutions (Ansible Installations)

[[toc]]

## Reset an Account Password

If you have lost the password to log into an account, but still have access to the SSH terminal for the server, you can
execute the following command to generate a new random password for an account in the system.

Replace `YOUREMAILADDRESS` with the e-mail address whose password you intend to reset.

```bash
php /var/azuracast/www/bin/console azuracast:account:reset-password YOUREMAILADDRESS
```

## Manually Flush the System Cache

Many parts of the AzuraCast system depend on caches to speed up site performance. Sometimes, these caches can get out of
date, and they may cause errors. You can always flush all site-wide caches using one command-line script:

```bash
php /var/azuracast/www/bin/console cache:clear
```

## Force a Full Update

Normally, the Ansible installer's update script only updates the portion of the system that have been modified since
your last update. If an update was interrupted or otherwise is causing trouble, you can force the update script to process
all components, which can often fix any issues:

```bash
./update.sh --full
```

## Use Non-standard Ports

You may want to serve the AzuraCast web application itself on a different port, or host your radio station on a port that 
isn't within the default range AzuraCast serves (8000-8999).

To modify the port your web application runs on, modify the configuration file in `/etc/nginx/sites-available/00-azuracast`.
Note that some updates may overwrite this file.

You can specify any port in any range for your station to use, provided the port isn't already in use.

By default, AzuraCast installs and enables the ufw (uncomplicated firewall) and sets it to lock down traffic to only SSH 
and the ports used by AzuraCast. If you're using a nonstandard port, you will likely also want to enable incoming traffic
on that port using the command `ufw allow PORTNUM`, where `PORTNUM` is the new port number.	

## Why is Ansible Unsupported? 

Ansible is aimed toward seasoned Linux system administrators who have a deep understanding of the Linux terminal, how to 
diagnose and fix errors, and how to handle conflicts between software with overlapping dependencies.

While we continue to offer Ansible installations for those "power user" types, it is expected that if you use the 
Ansible installation method, that you can diagnose and debug any compatibility issues yourself, and if they require action
on the part of our repository, you can compose and submit a Pull Request (PR) to us with the necessary solution.

We are a small team that works on a volunteer, donation-only basis, and we are unable to handle large or complex issues
that arise with many Ansible installations. As a result, we do not offer any routine support for Ansible installations.
We **may** offer support on an as-available basis, but this is not guaranteed.

If you require more hands-on support for your installation or you aren't very familiar with Linux server administration,
you should use our recommended [Docker installation method](/install/docker.html).
