AFRAME.registerShader('pano-portal', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.3 0.2"}
  },
  vertexShader: require('raw!./shaders/vs_pano_warp.glsl'),
  fragmentShader: require('raw!./shaders/fs_pano_warp.glsl'),
});

AFRAME.registerShader('pano-portal-dither', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.3 0.2"}
  },
  vertexShader: require('raw!./shaders/vs_pano_warp.glsl'),
  fragmentShader: require('raw!./shaders/fs_pano_warp_dither.glsl'),
});
