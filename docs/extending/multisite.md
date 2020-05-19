---
title: AzuraCast Multi-Site Docker Installation
---

# AzuraCast Multi-Site Docker Installation

As of the latest development version of AzuraCast, support for multiple sites is built directly into the core AzuraCast installation. No additional modification is required.

## Adding Other Containers

Any other Docker container that is started on the server and has the `VIRTUAL_HOST` environment variable set will be served by the same proxy service.

For more information, you can visit the [nginx-proxy repository documentation](https://github.com/jwilder/nginx-proxy).