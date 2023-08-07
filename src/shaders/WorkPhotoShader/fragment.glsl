precision highp float;

uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;

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


void main() {   
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);
  vec4 texture = texture2D(uTexture, vUv);

  gl_FragColor = texture;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}