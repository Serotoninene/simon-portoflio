precision highp float;

uniform float uProgress;
uniform float uIntro;
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform vec2 uMappedMouse;

uniform float uRadius;
uniform float uIntensity;

varying vec2 vUv; 

const float PI = 3.1415;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

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

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {   
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);

  // // demo 6
  vec4 disp = texture2D(uDisplacement, correctUv);
  vec2 dispVec = vec2(disp.r, disp.g);

  // rgb shift
  float c = uIntensity * circle(vUv, uMappedMouse, uRadius , 0.2);
  vec4 cr = texture2D(uTexture, (correctUv + c * (uProgress)));
  vec4 cga = texture2D(uTexture, correctUv);
  vec4 cb = texture2D(uTexture, (correctUv - c * (uProgress)));
  vec4 rgbaShiftTexture = vec4(cga.r, cr.g, cb.b, cga.a);

  // intro anim
  vec2 uvDivided = fract(correctUv*vec2(20.,1.0));

  float	x = smoothstep(.0,1.0,(uIntro*2.0+uvDivided.y-1.0));
  vec2 uvDisplaced1 = correctUv + rotate(3.1415926/4.)*uvDivided*x*0.1;
  vec2 uvDisplaced2 = correctUv +vec2(0., 1. - x)  + rotate(3.1415926/4.)*uvDivided*dispVec*(1. - x)*0.1;

  vec4 t1 = vec4(0.0);
  vec4 t2 = texture2D(uTexture, uvDisplaced2);
  vec4 animTexture = mix(t1,t2, x);

  gl_FragColor = mix(animTexture, rgbaShiftTexture, uProgress);
}