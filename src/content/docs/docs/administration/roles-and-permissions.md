---
title: Roles & Permissions
description: AzuraCasts Access Control List (ACL) system allows you to control the specific permissions of each group of users
published: true
date: 2021-02-09T03:26:16.083Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T22:59:10.465Z
---

:::tip[Required Permissions]
To manage roles and permissions, users must be in a role that has the "Administer Permissions" permission globally.
:::

AzuraCast has a highly granular Access Control List (ACL) system that allows you to control the specific permissions of each group of users.

In summary, you can think of the access control list as working this way:

- One or more **Users** can be in a **Role**.
- Each **Role** has one or more **Permissions**, which gives everyone in that Role that level of access. Permissions can either be specific to a single station, or global for the entire installation.

The Roles & Permissions page has protections in place to prevent users from accidentally denying themselves permissions to the Permissions page itself.

## Special Permissions

There are special permissions that will grant access to other sections of the system, even when you don't explicitly grant those lower-level permissions to each user:

- The **All Permissions** global permission creates a super-user with access to all of the AzuraCast installation, and the **All Permissions** station-specific permission creates a super-user with full access to that specific station only.
- The **Manage Stations** global permission also allows the user to administer any stations that exist in the AzuraCast installation.
