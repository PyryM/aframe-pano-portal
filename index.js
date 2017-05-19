AFRAME.registerShader('pano-portal', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.0 0.0"}
  },
  vertexShader: require('raw!./shaders/vs_pano_warp.glsl'),
  fragmentShader: require('raw!./shaders/fs_pano_warp.glsl'),
});
