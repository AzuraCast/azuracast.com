---
title: Using Custom JavaScript
published: true
date: 2021-12-26T23:21:07.060Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T06:22:44.422Z
---

## Custom JavaScript for Public Pages

AzuraCast provides you with the possibility to add custom JS via the `Custom Branding` page at `/admin/branding`.

There you can add your own JavaScripts to the public pages with the editor for `Custom JS for Public Pages`.

You can attach to events of the public player like this:

```javascript
$(document).on('now-playing', function(np_new) {
    // custom code with np_new
});
```

### Example: Video Playback for Public Page
You can use `Custom JS for Public Pages` to add a video element to the page and style via the `Custom CSS for Public Pages` using our example below. 

**Custom CSS for Public Pages**
```css
[data-theme] body.page-minimal .background-video {
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: -1;
}
```
**Custom JS for Public Pages**
```javascript
let videoBackgroundElement = document.createElement('video');
videoBackgroundElement.autoplay = true;
videoBackgroundElement.loop = true;
videoBackgroundElement.muted = true;
videoBackgroundElement.poster = 'Enter.URL.Here';
videoBackgroundElement.className = 'background-video';

let videoBackgroundSource = document.createElement('source');
videoBackgroundSource.src = 'Enter.URL.Here';
videoBackgroundSource.type = 'video/mp4';

videoBackgroundElement.appendChild(videoBackgroundSource);

document.body.append(videoBackgroundElement);
```
