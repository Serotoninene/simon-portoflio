uniform vec2 uQuadSize;
uniform vec2 uMouse;
uniform float uTime;
uniform float uProgress;
uniform float uIntro;
uniform float uIntensity;
uniform float uRadius;
uniform float uDeformVertex;
uniform float uIntensityVertex;

varying vec2 vUv;

const float PI = 3.1415;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  vec2 adjustedDiscCenter = vec2((disc_center.x+ 0.5  ), (disc_center.y +0.5 )) ;
  float dist = distance(uv, adjustedDiscCenter);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
  position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}

void main()
{
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
  modelPosition.y -= 50. * (1. - uIntro) ;
  // modelPosition.y += cos(-modelPosition.x /  (100.0 * 2. )) * 20. * 3. *(1.-uIntro) ;
  // 

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;  
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}