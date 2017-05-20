/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	AFRAME.registerShader('pano-portal', {
	  schema: {
	    src: {type: 'map', is: 'uniform'},
	    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.3 0.2"}
	  },
	  vertexShader: __webpack_require__(1),
	  fragmentShader: __webpack_require__(2),
	});

	AFRAME.registerShader('pano-portal-dither', {
	  schema: {
	    src: {type: 'map', is: 'uniform'},
	    warpParams: {type: 'vec4', is: 'uniform', default: "-1.0 1.5 0.3 0.2"}
	  },
	  vertexShader: __webpack_require__(1),
	  fragmentShader: __webpack_require__(3),
	});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = "uniform vec4 warpParams;\r\nvarying vec3 worldNormal;\r\nvarying vec3 worldViewDir;\r\nvarying float warpAlpha;\r\n\r\nvoid main(void) {\r\n  vec4 zeroPos = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);\r\n  float distToZero = length(cameraPosition - zeroPos.xyz);\r\n  warpAlpha = clamp(warpParams.x * distToZero + warpParams.y, 0.0, 1.0);\r\n  vec4 worldPos = modelMatrix * vec4(position, 1.0);\r\n  worldViewDir = worldPos.xyz - cameraPosition;\r\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n  worldNormal = (modelMatrix * vec4(normal.xyz, 0.0)).xyz;\r\n}\r\n"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = "#define M_PI 3.1415926535897932384626433832795\r\nuniform sampler2D src;\r\nuniform vec4 warpParams;\r\nvarying vec3 worldNormal;\r\nvarying vec3 worldViewDir;\r\nvarying float warpAlpha;\r\n\r\nvec3 panoMap(vec3 vdir) {\r\n  float r = length(vdir.xz);  // sqrt(vdir.x * vdir.x + vdir.z * vdir.z);\r\n  float theta = atan(vdir.z, vdir.x) / M_PI;\r\n  float phi = atan(vdir.y, r) / M_PI;\r\n  vec2 uv = vec2(theta*0.5 + 0.5, phi + 0.5);\r\n  return texture2D(src, uv).rgb;\r\n}\r\n\r\nvoid main() {\r\n  vec3 nn = normalize(worldNormal);\r\n  vec3 ndir = normalize(worldViewDir);\r\n  vec3 sampleDir = (warpAlpha)*ndir + (1.0 - warpAlpha)*nn;\r\n  gl_FragColor.rgb = panoMap(sampleDir);\r\n  gl_FragColor.a = 1.0;\r\n}\r\n"

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "#define M_PI 3.1415926535897932384626433832795\r\nuniform sampler2D src;\r\nuniform vec4 warpParams;\r\nvarying vec3 worldNormal;\r\nvarying vec3 worldViewDir;\r\nvarying float warpAlpha;\r\n\r\nfloat rand(vec2 co){\r\n  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\r\n}\r\n\r\nvec2 panoMap(vec3 vdir) {\r\n  float r = length(vdir.xz);\r\n  float theta = atan(vdir.z, vdir.x) / M_PI;\r\n  float phi = atan(vdir.y, r) / M_PI;\r\n  vec2 uv = vec2(theta*0.5 + 0.5, phi + 0.5);\r\n  return uv;\r\n}\r\n\r\nvoid main() {\r\n  vec3 nn = normalize(worldNormal);\r\n  vec3 ndir = normalize(worldViewDir);\r\n  vec3 sampleDir = (warpAlpha)*ndir + (1.0 - warpAlpha)*nn;\r\n\r\n  float distToPixel = length(worldViewDir);\r\n  float dd = (distToPixel - warpParams.z) / (warpParams.w - warpParams.z);\r\n  //float dd = 1.0 - distToPixel;\r\n  float dthresh = clamp(dd, 0.0, 1.0);\r\n  vec2 uv = panoMap(sampleDir);\r\n  if(rand(gl_FragCoord.xy) < dthresh) {\r\n    discard;\r\n  }\r\n\r\n  gl_FragColor.rgb = texture2D(src, uv).rgb;\r\n  gl_FragColor.a = 1.0;\r\n}\r\n"

/***/ })
/******/ ]);