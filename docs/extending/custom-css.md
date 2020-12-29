---
title: Customizing the CSS
---
# Styling your AzuraCast installation with CSS

[[toc]]

AzuraCast provides you with the possibility to customize the default CSS via the `Custom Branding` page at `/admin/branding`.

There you can alter the styling of the internal and public pages via your own CSS with the editors for `Custom CSS for Public Pages` and `Custom CSS for Internal Pages`.

This page will give you a simple overview of the CSS classes and ids used in the HTML of AzuraCast that you can then use in your own CSS to customize those elements.

If you have no prior experience with CSS take a look at the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS) about CSS.

## Custom CSS for Public Pages

There 2 CSS classes that you can use to conditionally style your public pages.

The first one is a class specific to each station that follows the format `station-<station_name>`. So if you have a station called `My Radio` this class would be `station-my_radio`. You can use this to define CSS styles that should only apply to a single station by prefixing your CSS selectors like this:
```
body.station-my_radio ... {
    ...
}
```

The second one is a class that tells the page to use the dark or light theme.
You can use this to define styles that should only apply when the dark or light theme is used by prefixing your CSS selectors like this:
```
body.theme-light ... {
    ...
}

body.theme-dark ... {
    ...
}
```

### Changing the background image

The CSS for the background image on public pages is defined like this:
```
body.page-minimal {
    background: #edecec url(../img/hexbg.png);
    background-size: cover;
    background-attachment: fixed;
}
```

You can change the background image by using the same CSS selector and then just overwrite the `background` attribute like this:
```
body.page-minimal {
    background: url(https://example.com/my_custom_background_image.png);
}
```

### Styling the radio player

You can change the background color of the radio player like this:
```
body.page-minimal .public-page .card {
    background-color: #5e0f16;
}
```

The CSS selector for the title of the player is as follows:
```
body.page-minimal .public-page .card .card-body .card-title {
    ...
}
```

The buttons at the bottom of the player can be styled with the following CSS selector:
```
body.page-minimal .public-page .card .card-actions .btn {
    ...
}
```

The elements of the player itself are found in the `radio-player-widget` class and are separated further under `now-playing-details` and `radio-controls`.

As an example on how to customize those elements this page provides you with a short snippet for one element of each part of the player widget. For more detailed information it is recommended to directly look at the HTML of the page via your browsers HTML inspector.

This example shows you how to change the text color of the title and artist:
```
body.page-minimal .public-page .card .now-playing-title {
    color: #fff;
}

body.page-minimal .public-page .card .now-playing-artist {
    color: #fefefe;
}
```

This example shows you how to change the color of the play button:
```
body.page-minimal .public-page .card .radio-control-play-button a {
    color: #000;
}
```

### Styling the modals for Song History & Song Requests

To change the background color of the modals you can use the following CSS selector:
```
body.page-minimal .modal .modal-content {
    background-color: #5e0f16;
}
```

To change the text color of the title use the following CSS selector:
```
body.page-minimal .modal .modal-content .modal-title {
    color: #fff;
}
```

To change the background color of the pagination use the following CSS selector:
```
body.page-minimal .modal .modal-content .pagination {
    background: #3d3d3d;
}
```

The text color of the Song Requests table header and rows can be changed like this:
```
body.page-minimal .modal .modal-content .table thead {
    color: #fff;
}

body.page-minimal .modal .modal-content .table tbody {
    color: #fff;
}
```


## Custom CSS for Internal Pages

The internal pages can also be conditonally styled for the dark and light theme like it is done for the public pages:
```
body.theme-light ... {
    ...
}

body.theme-dark ... {
    ...
}
```

### Changing the color of the top navigation

If you want to change the color of the top navigation you can use the following CSS selector to use your own color and remove the background image:
```
header.navbar {
    background-image: none;
    background: #3d3d3d;
}
```

### Changing the card header color

Most cards and some other elements in the internal pages have a blue background color. In order to change this color you can use the following CSS selector:
```
.bg-primary-dark {
    background-color: #5e0f16 !important;
}
```
