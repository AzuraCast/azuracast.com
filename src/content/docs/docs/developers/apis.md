---
title: AzuraCast APIs
description: All about the APIs of AzuraCast
published: true
date: 2021-02-08T03:58:11.711Z
tags: development, api
editor: markdown
dateCreated: 2021-02-06T19:21:58.881Z

sidebar:
  order: 1
---

Once installed and running, AzuraCast exposes an API that allows you to monitor and interact with your stations. You can perform the following functions and more from the JSON REST API:

- View now-playing data and recent song history for all stations
- View general station information
- Submit song requests (if allowed by the station)
- Start, stop and restart stations individually

## Per-Install API Documentation

Each AzuraCast installation includes documentation for the API at the exact version it's currently using. In our public documentation, we include the API as of the latest Rolling Release version.

- [View API Documentation](/api)

## API Authentication

If you're accessing sensitive information or modifying the server, you will be required to authenticate your API requests with an authorization key.

You can create an API key from the AzuraCast web interface, by clicking the user menu in the top right and clicking "My API Keys". Any API keys you create will share the same permissions that you have as a user.

The preferred method of authenticating is to send the following header along with your API request:

```
Authorization: Bearer your_api_key_here
```

You can also include the API key in the `X-API-Key` header if desired.

## Now Playing Data APIs

The most important and frequently accessed pieces of information that AzuraCast stores are all served as part of a single group of data, which we refer to as the "Now Playing" data.

Because of how valuable this information is, we serve it in a number of ways depending on whether performance or flexibility is your main concern.

Check out our [Now Playing Data APIs](/docs/developers/now-playing-data) page for more detailed information on these APIs.

## SDKs & API clients

### PHP
  - Packagist: [`azuracast/php-api-client`](https://packagist.org/packages/azuracast/php-api-client)
  - GitHub: https://github.com/AzuraCast/php-api-client
