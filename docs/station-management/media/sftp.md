---
title: SFTP
---

# Built-in SFTP Server

::: tip Note
The Built-in SFTP server is _only available on the Docker installation_.
:::

All AzuraCast Docker installations come with a built-in SFTP server that allows you to easily connect to your media directory, upload and move files using software of your choice.

## Creating SFTP Users

Under the "Utilities" section of your station, you will see an entry labeled "SFTP Users". Click this to view existing users and the connection details for connecting to your server via an SFTP client of your choice.

## Default Port

By default, the SFTP service listens externally on port 2022. If there is something else using this port or you want to change it for any other reason, you can edit the `.env` file on your host machine (note, this is a file named `.env`, with no filename, and not the `azuracast.env` file) and add or modify this line:

```
AZURACAST_SFTP_PORT=2022
```