This is subfolder `assets` isn't strictly necessary.

Before Angular 18, the images were stored in the `src/assets` directory.

From Angular 18, this has changed and a new root directory `public` holds the images.

To follow along the course, I've created this subfolder to avoid errors.

Anything in `public` can be reference as follows: 

- a `favicon.ico` at the root is accessed with `<img src="favicon.ico" title="My App" />`.
- an image in a subfolder `assets` of `public` is accessed with `<img src="assets/image.jpg" title="An image" />`.
