# image-gallery Webcomponent

| *Status: Ready for production use*

Preview url: 
[ronnidc.github.io/examples/image-gallery-component](https://ronnidc.github.io/examples/image-gallery-component)

## Description

This code defines a new `ImageGallery` web component. It includes prev and next buttons, 
a caption, and an optional fullscreen button. The component reads its configuration from a JSON script tag within its content. 
You can customize the image sources, captions, and the fullscreen functionality by modifying the JSON configuration.

The `addSwipeListeners` method adds the event listeners for touch events to the web component. 
It calculates the difference between the `touchstart` and `touchend` positions (x-axis) to determine whether the user swiped left or right. 
If the difference exceeds a threshold (in this case, 100 pixels), it navigates to the previous or next image accordingly.

## Implementation

### Required

### Optional settings
