precision highp float;

uniform float uTime;  
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
const float angle1 = PI *0.25;
		const float angle2 = -PI *0.75;

mat2 getRotM(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
  }

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
  // vec2 correctUv = vUv;
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);

  vec4 disp = texture2D(uDisplacement, correctUv);
  vec2 dispVec = vec2(disp.r, disp.g);

  vec2 distortedPosition1 = correctUv + getRotM(angle1) * dispVec * uIntro * (1.0 - uProgress);
  vec2 distortedPosition2 = correctUv + getRotM(angle2) * dispVec * uIntro * (1.0 - uProgress);

  vec4 t1 = texture2D(uTexture, distortedPosition1);
  vec4 t2 = texture2D(uTexture, distortedPosition2);

  // rgb shift
  float c = uIntensity * circle(vUv, uMappedMouse, uRadius, 0.2);
  vec4 cr = texture2D(uTexture, (correctUv + c));
  vec4 cga = texture2D(uTexture, correctUv);
  vec4 cb = texture2D(uTexture, (correctUv - c));

  vec4 t3 = vec4(cga.r, cr.g, cb.b, cga.a);

  // gl_FragColor = color;
  // gl_FragColor = bulgedColor;
  gl_FragColor = vec4(cga.r, cr.g, cb.b, cga.a);
  // gl_FragColor = texture2D(uTexture, warp);
  // gl_FragColor = mix(t1,t2, uProgress );

}