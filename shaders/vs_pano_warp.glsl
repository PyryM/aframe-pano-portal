uniform vec4 warpParams;
varying vec3 worldNormal;
varying vec3 worldViewDir;
varying float warpAlpha;

void main(void) {
  vec4 zeroPos = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float distToZero = length(cameraPosition - zeroPos.xyz);
  warpAlpha = clamp(warpParams.x * distToZero + warpParams.y, 0.0, 1.0);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  worldViewDir = worldPos.xyz - cameraPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  worldNormal = (modelMatrix * vec4(normal.xyz, 0.0)).xyz;
}
