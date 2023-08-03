precision highp float;

uniform float uTime;  
uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform vec2 uMappedMouse;

uniform float uRadius;
uniform float uIntensity;

varying vec2 vUv; 

const float PI = 3.1415;
const float angle1 = PI *0.25;
const float angle2 = -PI *0.75;

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

vec2 pixelate(vec2 uv, vec2 pixelSize) {
  // vec2 pixelPos = gl_FragCoord.xy;
  // vec2 gridSize = uQuadSize / uIntensity;
  vec2 pixelPos = floor(uv / pixelSize) * pixelSize;
  return pixelPos;
}

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {   
  vec2 correctUv = getUV(vUv, uTextureSize, uQuadSize);

  // Bulge with the mouse
  vec2 bulgedUv = bulge(correctUv,vec2(uMappedMouse.x, max(uMappedMouse.y, 0.1)));

  // bulge with the progress variable
  // vec2 bulgedUv = bulge(correctUv, vec2(
  //   uProgress/1. - 0.5 
  // ));

  vec2 pixelatedUv = pixelate(correctUv, vec2(0.005));

  vec2 uvDivided = fract(correctUv*vec2(uProgress * 10.));
  vec2 uvDisplaced = correctUv + uvDivided * uProgress - vec2( 0.5, 0.5) * uProgress;
  vec2 uvDisplacedAndBulged = bulge(uvDisplaced, vec2(
      (uProgress + 1.) / 2., 
      (-1. * uProgress + 1.) / 2.
    )
  );

  vec4 color = texture2D(uTexture, correctUv);

  vec4 pixelatedColor = texture2D(uTexture, pixelatedUv);
  vec4 textureDisplaced = texture2D(uTexture, uvDisplacedAndBulged);

  vec4 bulgedColor = texture2D(uTexture, bulgedUv);

  // rgb shift
  float c = uIntensity * circle(vUv, uMappedMouse, uRadius, 0.2);
  vec4 cr = texture2D(uTexture, (correctUv + c));
  vec4 cga = texture2D(uTexture, correctUv);
  vec4 cb = texture2D(uTexture, (correctUv - c));

  // zoom effect
  vec2 warp = mix(correctUv, uMappedMouse, c * 10.0);


  // gl_FragColor = color;
  gl_FragColor = bulgedColor;
  // gl_FragColor = vec4(cga.r, cr.g, cb.b, cga.a);
  // gl_FragColor = texture2D(uTexture, warp);

}