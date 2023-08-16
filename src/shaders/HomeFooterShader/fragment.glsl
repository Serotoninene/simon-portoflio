precision highp float;

uniform sampler2D uTexture;
uniform vec2 uMouse;

uniform float uIntensity;
uniform float uRadius;
uniform float uBlurAmount;

varying vec2 vUv; 

const float PI = 3.1415;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {   
  vec4 color = texture2D(uTexture, vUv);

  float maxBlurDistance = 0.5; // Maximum distance for blur effect

  float c = 0.5 * circle(vUv, uMouse, uRadius , 0.5);

  gl_FragColor = vec4(2. * color.rgb * c , color.a);
  // gl_FragColor = color;
}