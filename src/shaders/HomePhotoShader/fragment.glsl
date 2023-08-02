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

vec2 getTileUV(vec2 uv, vec2 tiles) {
  // Calculate the size of each tile
  vec2 tileSize = vec2(1.0) / tiles;

  // Calculate the tile index based on the UV coordinates
  vec2 tileIndex = floor(uv * tiles);

  // Calculate the new UV coordinates for the current tile
  vec2 newUV = fract(uv * tiles);

  // Offset the UV coordinates to the current tile
  newUV = (newUV - 0.5) * tileSize + (tileIndex + 0.5) * tileSize;

  return newUV;
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

void main() {   
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);
  vec2 bulgedUv = bulge(correctUv, uMouse);

  vec4 color = texture2D(uTexture, bulgedUv);
  gl_FragColor = color;
}