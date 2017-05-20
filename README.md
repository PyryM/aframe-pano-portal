## aframe-pano-portal

A material to place 360 content (static panoramas or videos) as portal spheres
into an A-Frame scene, which is especially useful for room-scale VR since it
allows a user to switch between panoramas by simply walking into the portals.

![Screenshot of a pano portal](screenshot.jpg?raw=true)

Outside the sphere, the panorama appears as if it were texture-mapped into the
inside of the sphere (i.e., in stereo it appears at the correct depth for the
sphere). Inside the sphere, the panorama is projected to infinity as if it were
a skybox.

### Usage

This module defines two materials, `pano-portal` and `pano-portal-dither`. The
only difference is that the dithering version will use dithered semi-transparency
to fade away the panorama as the user leaves the sphere.

This material should be applied to an *inverted* sphere (or sphere-like object),
for example (note the negative scale):

```html
<a-icosahedron detail="3" scale="-0.5 -0.5 -0.5"
               material="shader: pano-portal-dither; src: #my-pano-image-asset">
</a-icosahedron>
```

The default warp parameters are tuned for a sphere approximately 0.5m in radius.

### Properties

| Property      | Description                     | Required
| --------      | -----------                     | --------
| src           | Image or video                  | yes
| warpParams    | Parameters for warping effect   | no

`warpParams` needs a bit of explanation:
warpParams = warp_start, warp_finish, dither_start, dither_end

The default parameters `[1.5, 0.5, 0.3, 0.1]` have the warping start 1.5m away
from the center the sphere and finish 0.5m away. The dithered transparency
likewise starts 0.3m away from the *surface* and reaches fully transparent at
0.1m away.

### Installation

Install and use by directly including the [browser files](dist).
