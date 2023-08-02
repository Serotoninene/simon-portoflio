precision mediump float;

uniform float uTime;  
uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform vec2 uMouse;

varying vec2 vUv; 

vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize){
  vec2 tempUV = uv - vec2(0.5);

  float quadAspect = quadSize.x / quadSize.y;
  float textureAspect = textureSize.x / textureSize.y;

  if(quadAspect < textureAspect){
    tempUV *= vec2(quadAspect / textureAspect, 1.);
  }else{
    tempUV*= vec2(1., textureAspect / quadAspect);
  }

  tempUV += vec2(0.5);
  return tempUV;
}

vec2 bulge(vec2 uv, vec2 center) {
  uv -= center;

  float strength = 1.1;
  
  float dist = length(uv); // distance from UVs
  float distPow = pow(dist, 2.); // exponential
  float strengthAmount = strength / (1.0 + distPow); // Invert bulge and add a minimum of 1)

  uv *= strengthAmount; 
  uv += center;

  return uv;
}

vec2 getStrength (vec2 uv, vec2 center, float radius) {
  float strength = floor(vUv.x * center.x) / radius * floor(vUv.y * center.y) / radius;
  return vec2(strength);
}


void main() {   
  float mouseX = (uMouse.x - 1.) / 2.;
  float mouseY = (-1. * uMouse.y + 1.) / 2.;

  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);
  vec2 strengthedUv = getStrength(correctUv, vec2(25.) ,uProgress);
  // vec2 bulgedUv = bulge(correctUv, vec2(
  //   (uMouse.x + 1.) / 2., 
  //   (-1. * uMouse.y + 1.) / 2.
  //   ));

  vec4 color = texture2D(uTexture, strengthedUv);
  gl_FragColor = color;
}