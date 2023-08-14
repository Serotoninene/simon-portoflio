varying vec2 vUv;

const float PI = 3.1415;

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

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;  
}