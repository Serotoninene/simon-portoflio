uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uIntensity;


varying vec2 vUv;
varying vec2 v_tpos;

const float PI = 3.1415;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
  position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
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

void main()
{
  vUv = getUV(uv, uTextureSize, uQuadSize);
  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
  // vec4 viewPosition = viewMatrix * modelPosition;
  // vec4 projectedPosition = projectionMatrix * viewPosition;

  vec4 customPosition = vec4(position, 1.0);

  float c = 0.5 * circle(vUv, uMouse, uRadius , 0.5);

  customPosition.z += c * 1.5;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
  // modelPosition. -= 50. * (1. - uIntro) ;
  modelPosition.z += c * 50.;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  

  gl_Position = customPosition;  
}