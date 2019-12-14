---
title: Updating AzuraCast
---

# Updating AzuraCast

Updating AzuraCast will update both the web app itself and all of its dependencies, so you will be on the latest version of all of the supporting software.

During the update process, your stations will be briefly offline to listeners, so you should set aside a time to update and notify listeners if necessary.

## Docker Installations

Using the included Docker utility script, updating is as simple as running:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh update
```

By default, the updater will prompt you to update your `docker-compose.yml` file. If you aren't making any changes to this file and want to automate the update process, you can use the command below to automatically answer "yes" to this question:

```bash
cd /var/azuracast
./docker.sh update-self && echo "y" | ./docker.sh update
```

## Ansible Installations

AzuraCast also includes a handy updater script that pulls down the latest copy of the codebase from Git, flushes the site caches and makes any necessary database updates. Run these commands as any user with `sudo` permissions: 
 
```bash 
cd /var/azuracast/www 
 
sudo chmod a+x update.sh 
sudo ./update.sh 
``` 