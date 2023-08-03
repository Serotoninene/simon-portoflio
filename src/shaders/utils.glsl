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
  vec2 pixelPos = floor(uv / pixelSize) * pixelSize;
  return pixelPos;
}


// Bulge with the mouse
// vec2 bulgedUv = bulge(correctUv,vec2(uMappedMouse.x, max(uMappedMouse.y, 0.1)));

// vec2 pixelatedUv = pixelate(correctUv, vec2(0.005));

// vec2 uvDivided = fract(correctUv*vec2(uProgress * 10.));
// vec2 uvDisplaced = correctUv + uvDivided * uProgress - vec2( 0.5, 0.5) * uProgress;
// vec2 uvDisplacedAndBulged = bulge(uvDisplaced, vec2(
//     (uProgress + 1.) / 2., 
//     (-1. * uProgress + 1.) / 2.
//   )
// );

// vec4 pixelatedColor = texture2D(uTexture, pixelatedUv);
// vec4 textureDisplaced = texture2D(uTexture, uvDisplacedAndBulged);

// vec4 bulgedColor = texture2D(uTexture, bulgedUv);

// zoom effect
// vec2 warp = mix(correctUv, uMappedMouse, c * 10.0);