precision highp float;

uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uProgress;

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

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}
const float PI = 3.1415;
const float angle = -PI *0.75;


void main() {   
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);

  vec2 uvDivided = fract(correctUv*vec2(50.,1.));
  vec2 uvDisplaced = correctUv + rotate(PI/4.)*uvDivided*(1. - uProgress)*0.1;
  vec4 t1 = vec4(0.);
  vec4 t2 = texture2D(uTexture,uvDisplaced);

  gl_FragColor = mix(t1, t2, uProgress);

}