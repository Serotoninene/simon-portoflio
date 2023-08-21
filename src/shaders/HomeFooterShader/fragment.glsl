precision highp float;

uniform sampler2D uTexture;
uniform vec2 uMouse;

uniform float uRadius;
uniform float uBlurAmount;
uniform float uHoverValue;

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

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0 
    ? t 
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
} 

void main() {   
  // vec4 color = texture2D(uTexture, vUv);
  vec2 zoomedUv = vUv - 0.5;
  zoomedUv *= .8;
  zoomedUv += 0.5;

  // hover effect
  float zoomLevel = -0.2;
  float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), zoomedUv) * uHoverValue) + uHoverValue));
  zoomedUv *= 1. - zoomLevel * hoverLevel;
  zoomedUv += zoomLevel / 2. * hoverLevel;
  zoomedUv = clamp(zoomedUv, 0., 1.);

  // zoomedUv = clamp(zoomedUv, 0., 1.);
  vec4 color = texture2D(uTexture, zoomedUv);




  // gl_FragColor = vec4(1., 0., uHoverValue, 1.);
  gl_FragColor = color;
}