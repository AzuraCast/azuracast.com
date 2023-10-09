---
title: Users
description: User management for the web interface of AzuraCast
published: true
date: 2021-02-09T03:25:23.289Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T22:57:29.149Z
---

:::tip[Required Permissions]
To manage users, users must be in a role that has the "Administer Users" permission globally.
:::

From the "Users" administration panel, you can modify any existing users or create new ones. You can modify the roles that any given user are a part of, and force a password change in the event the user has forgotten their password.

## Resetting an Account Password

If you have lost the password to log into an account, but still have access to the SSH terminal for the server, you can execute the following command to generate a new random password for an account in the system.

Replace `YOUREMAILADDRESS` with the e-mail address whose password you intend to reset.

```bash
cd /var/azuracast
./docker.sh cli azuracast:account:reset-password YOUREMAILADDRESS
```
