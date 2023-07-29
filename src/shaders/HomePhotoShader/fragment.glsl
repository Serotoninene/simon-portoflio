precision mediump float;

uniform float uTime;  
uniform float uProgress;
uniform sampler2D uTexture;

varying vec2 vUv; 
varying vec3 vPosition;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {    
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = color;
  // gl_FragColor = vec4(1.00,0.0,0.0,1.0);
}