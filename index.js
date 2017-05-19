const glsl = require('glslify');

AFRAME.registerShader('pano-portal', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.0 0.0"}
  },
  vertexShader: glsl.file('shaders/vs_pano_warp.glsl'),
  fragmentShader: glsl.file('shaders/fs_pano_warp.glsl'),
});
