#define M_PI 3.1415926535897932384626433832795
uniform sampler2D src;
uniform vec4 warpParams;
varying vec3 worldNormal;
varying vec3 worldViewDir;
varying float warpAlpha;

float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 panoMap(vec3 vdir) {
  float r = length(vdir.xz);
  float theta = atan(vdir.z, vdir.x) / M_PI;
  float phi = atan(vdir.y, r) / M_PI;
  vec2 uv = vec2(theta*0.5 + 0.5, phi + 0.5);
  return uv;
}

void main() {
  vec3 nn = normalize(worldNormal);
  vec3 ndir = normalize(worldViewDir);
  vec3 sampleDir = (warpAlpha)*ndir + (1.0 - warpAlpha)*nn;

  float distToPixel = length(worldViewDir);
  float dd = (distToPixel - warpParams.z) / (warpParams.w - warpParams.z);
  //float dd = 1.0 - distToPixel;
  float dthresh = clamp(dd, 0.0, 1.0);
  vec2 uv = panoMap(sampleDir);
  if(rand(gl_FragCoord.xy) < dthresh) {
    discard;
  }

  gl_FragColor.rgb = texture2D(src, uv).rgb;
  gl_FragColor.a = 1.0;
}
