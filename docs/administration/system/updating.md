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
./docker.sh update-self
yes "" | ./docker.sh update
```

### Switching Update Release Preference

By default, all AzuraCast installations will update to the latest "Rolling Release" version; that is, the very latest changes that have been committed to the main AzuraCast repository. While this will give you access to the very latest features, it also may introduce errors or instability that you may not want in a production radio station.

To switch to only installing stable releases during updates, edit `azuracast.env` in your host and add or modify this line:

```
PREFER_RELEASE_BUILDS=true
```

## Ansible Installations

AzuraCast also includes a handy updater script that pulls down the latest copy of the codebase from Git, flushes the site caches and makes any necessary database updates. Run these commands as any user with `sudo` permissions: 
 
```bash 
cd /var/azuracast/www 
 
sudo chmod a+x update.sh 
sudo ./update.sh 
``` 