---
title: Command-Line Interface
published: true
date: 2022-05-20T14:32:44.233Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T07:25:29.538Z
---

AzuraCast features a powerful Command-Line Interface (CLI) tool that allows you to perform maintenance and troubleshooting tasks "under the hood".

In order to use the AzuraCast CLI, you must have shell terminal access to the server running AzuraCast (to the host machine, if you're running Docker).

Some of these commands are only intended for developers to debug or to resolve issues, use caution when executing these commands and only do them when told to, or you know what you're doing. 

## Invoking the CLI

**Using the Docker Utility Script:**

If you're using the Docker installation method, it's recommended to download the Docker Utility Script, which will allow you to use this shorter syntax:

```bash
./docker.sh cli [command]
```

**From a Docker Installation:**

```bash
docker-compose run --rm cli azuracast_cli [command]
```

**Ansible Installation:**

```bash
php /var/azuracast/www/bin/console [command]
```

## Account Related CLI Commands

This section will cover all account related CLI commands and the response the CLI will provide.  

### List all accounts

```
(cli_command) azuracast:account:list 

AzuraCast User Accounts
=======================

 ---------------- ------ --------------------- -------------------
  E-mail Address   Name   Roles                 Created
 ---------------- ------ --------------------- -------------------
  name@domain.com         Super Administrator   YYYY-MM-DD HH:MM
 ---------------- ------ --------------------- -------------------
```

### Create a unique login recovery URL for the specified account.

``` 
(cli_command) azuracast:account:login-token [example]

Generate Account Login Recovery URL
===================================

 The account recovery URL is:

     https://domain/recover/hash:hash

 Log in using this temporary URL and set a new password using the web interface.
```

### Reset the password of the specified account.

``` 
(cli_command) azuracast:account:reset-password [example]

Reset Account Password
======================

 The account password has been reset. The new temporary password is:

     [example]

 Log in using this temporary password and set a new password using the web interface.
 ```

### Set the account specified as a global administrator.

``` 
(cli_command) azuracast:account:set-administrator [example]

Set Administrator
=================

 The account associated with e-mail address "[example]" has been set as an administrator
```

## API Related CLI Commands

This section will cover our API related command(s), this'll be related to your AzuraCast's API. 

### Regenerate AzuraCast's API documentation.

```
(cli_command) azuracast:api:docs

API documentation updated!
```
This command should be used when you're on a development, production or testing machine and you're making modifications to the API, this will update your API accordingly (domain/api)

## Internal CLI Commands

This section will cover our internal processes, such as Liquidsoap, SSL and SFTP authentication. 

### Get the external IP address for this instance

```
(cli_command) azuracast:internal:ip

[example]
```
Running this command will return the IP of this machine. 

###  Handle Liquidsoap API calls

```
(cli_command) azuracast:internal:liquidsoap [example] [example]
```
This command can run various Liquidsoap API calls, this is primarily used for debugging or development purposes.

### Reload broadcast frontends when an SSL certificate changes
```
(cli_command) azuracast:internal:on-ssl-renewal
```

### Attempt SFTP Authentication
```
(cli_command) azuracast:internal:sftp-auth
```

### Send upcoming song feedback from the AutoDJ back to AzuraCast.
```
(cli_command) azuracast:internal:sftp-event
```

## AzuraCast Settings CLI Commands
This section will cover our internal internal settings ranging from base URL to smtp. This can be used should you be locked out of the settings or unable to access AzuraCast directly from the browser.  

### List all settings for AzuraCast
```
(cli_command) azuracast:settings:list
```
This command will return all the settings you can modify via the Command Line Interface, which will be shown in the next field. 

### Modify settings for AzuraCast
```
(cli_command) azuracast:settings:set [example] [example]
```
The `setting-key` parameter can be collected from the `settings:list` CLI command, this command will allow you to modify almost all portions of AzuraCast's settings, this is useful should you be having issues with misconfigured settings. 

### Manually Run AzuraCast Setup

```bash
(cli_command) azuracast:setup [--update]
```

Runs any necessary database updates to bring your AzuraCast installation to the latest version. This is normally run automatically as part of the installation and update processes, but can be run manually for troubleshooting or local development.

:::caution[This command disconnects listeners!]
Running this command will disconnect all current active listeners to your radio stations.
:::

### Clear All Caches

```bash
(cli_command) cache:clear
```

Clears all caches used internally by AzuraCast. This can be used as a troubleshooting step if you are encountering issues with out-of-date information appearing on dashboard pages. Note that some pages may take slightly longer to load after all caches are cleared.

### Run Synchronization Tasks

```bash
(cli_command) sync:run [nowplaying|short|medium|long]
```

Manually invoke the synchronized tasks ("cron jobs") that normally run automatically behind the scenes to keep AzuraCast updated.

- **nowplaying** corresponds to the every-15-second check of all stations' currently playing song and listener metrics
- **short** corresponds to the every-minute sync task
- **medium** corresponds to the every-5-minutes sync task
- **long** corresponds to the every-hour sync task

## Station Specific Commands

### Manually Reprocess All Media

```bash
(cli_command) azuracast:media:reprocess
```

Iterates through all stations' media directories and manually reloads the metadata information stored inside AzuraCast with the latest data on the files themselves. This is useful for troubleshooting songs that are stuck in "Processing" status, or if you have recently uploaded multiple songs via SFTP.

### Restart All Radio Stations

```bash
(cli_command) azuracast:radio:restart
```

Shuts down both the frontends (Icecast, SHOUTcast, etc) and backends (Liquidsoap) of all radio stations, rewrites their configuration files, then relaunches them. This is identical to the "Restart Broadcasting" command inside the web interface.

:::caution[This command disconnects listeners!]
Running this command will disconnect all current active listeners to your radio stations.
:::

These tasks can also be invoked directly from the web interface via the Administration homepage.

## Other Commands

The AzuraCast CLI interface also exposes a number of other advanced commands. These commands are intended for developers to use when building the application, and often should not be run by station owners on production installations.

For a full list of AzuraCast CLI commands, view them [here](https://github.com/AzuraCast/AzuraCast/blob/main/backend/config/cli.php).

For more information about the additional command line tools available, see their respective documentation pages below:
- [Doctrine Command Line Reference](https://www.doctrine-project.org/projects/doctrine-orm/en/3.2/reference/tools.html)
- [Doctrine Migrations](https://www.doctrine-project.org/projects/doctrine-migrations/en/3.8/reference/introduction.html)
