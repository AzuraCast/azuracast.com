---
title: Using Custom CSS
published: true
date: 2021-05-10T17:37:35.870Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T06:55:55.731Z
---

:::tip[An important change in newer versions...]
In version 0.19.0, we switched from an old style system to a newer version of Bootstrap, and in the process, the prefix on the commands below changed from `[data-theme]` to `[data-bs-theme]`. You should update any custom CSS you're using accordingly.
:::

AzuraCast provides you with the possibility to customize the default CSS via the `Custom Branding` page at `/admin/branding`.

There you can alter the styling of the internal and public pages via your own CSS with the editors for `Custom CSS for Public Pages` and `Custom CSS for Internal Pages`.

This page will give you a simple overview of the CSS classes and ids used in the HTML of AzuraCast that you can then use in your own CSS to customize those elements.

If you have no prior experience with CSS take a look at the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS) about CSS.

## Note about Automatic Theme Detection

AzuraCast now has a built-in feature where it will automatically detect the user's preferred color scheme from their browser via a CSS media query. It's recommended that if you intend to customize your public pages, you disable this by visiting the `Custom Branding` page and setting a specific theme for public pages that isn't "Prefer System Default".

The instructions below assume that this change has been made already.

## Custom CSS for Public Pages

Each station's public pages have a class applied to the `<body>` element that follows the format `station-<station_short_name>`.

So if you have a station called `My Radio`, this class would be `station-my_radio`. You can use this to define CSS styles that should only apply to a single station by prefixing your CSS selectors like this:

```css
# Targeting either dark or light themed pages
[data-bs-theme] body.station-my_radio {
    ...
}

# Targeting only light themed pages
[data-bs-theme="light"] body.station-my_radio {
    ...
}

# Targeting only dark themed pages
[data-bs-theme="dark"] body.station-my_radio {
    ...
}
```

### Changing the background image

The CSS for the background image on public pages is defined like this:

```css
# See above for theme-specific prefixes
[data-bs-theme] body.page-minimal {
    background: #edecec url(../img/hexbg.png);
    background-size: cover;
    background-attachment: fixed;
}
```

You can change the background image by using the same CSS selector and then just overwrite the `background` attribute like this:

```css
[data-bs-theme] body.page-minimal {
    background: url(https://example.com/my_custom_background_image.png);
}
```

### Styling the radio player

You can change the background color of the radio player like this:

```css
[data-bs-theme] body.page-minimal .public-page .card {
    background-color: #5e0f16;
}
```

The CSS selector for the title of the player is as follows:

```css
[data-bs-theme] body.page-minimal .public-page .card .card-body .card-title {
    ...
}
```

The buttons at the bottom of the player can be styled with the following CSS selector:

```css
[data-bs-theme] body.page-minimal .public-page .card .card-actions .btn {
    ...
}
```

The elements of the player itself are found in the `radio-player-widget` class and are separated further under `now-playing-details` and `radio-controls`.

As an example on how to customize those elements this page provides you with a short snippet for one element of each part of the player widget. For more detailed information it is recommended to directly look at the HTML of the page via your browsers HTML inspector.

This example shows you how to change the text color of the title and artist:

```css
[data-bs-theme] body.page-minimal .public-page .card .now-playing-title {
    color: #fff;
}

[data-bs-theme] body.page-minimal .public-page .card .now-playing-artist {
    color: #fefefe;
}
```

This example shows you how to change the color of the play button:

```css
[data-bs-theme] body.page-minimal .public-page .card .radio-control-play-button a {
    color: #000;
}
```

### Styling the modals for Song History & Song Requests

To change the background color of the modals you can use the following CSS selector:

```css
[data-bs-theme] body.page-minimal .modal .modal-content {
    background-color: #5e0f16;
}
```

To change the text color of the title use the following CSS selector:

```css
[data-bs-theme] body.page-minimal .modal .modal-content .modal-title {
    color: #fff;
}
```

To change the background color of the pagination use the following CSS selector:

```css
[data-bs-theme] body.page-minimal .modal .modal-content .pagination {
    background: #3d3d3d;
}
```

The text color of the Song Requests table header and rows can be changed like this:

```css
[data-bs-theme] body.page-minimal .modal .modal-content .table thead {
    color: #fff;
}

[data-bs-theme] body.page-minimal .modal .modal-content .table tbody {
    color: #fff;
}
```

## Custom CSS for Internal Pages

The internal pages can also be conditonally styled for the dark and light theme like it is done for the public pages:

```css
[data-bs-theme="light"] body {
    ...
}

[data-bs-theme="dark"] body {
    ...
}
```

### Changing the color of the top navigation

If you want to change the color of the top navigation you can use the following CSS selector to use your own color and remove the background image:

```css
[data-bs-theme] header.navbar {
    background-image: none;
    background: #3d3d3d;
}
```

### Changing the card header color

Most cards and some other elements in the internal pages have a blue background color. In order to change this color you can use the following CSS selector:

```css
[data-bs-theme] .bg-primary-dark {
    background-color: #5e0f16 !important;
}
```
