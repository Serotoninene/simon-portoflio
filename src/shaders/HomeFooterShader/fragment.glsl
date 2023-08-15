precision highp float;

uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv; 

const float PI = 3.1415;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}



float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {   
  vec4 color = texture2D(uTexture, vUv);

  float blurAmount = 0.005; // Adjust this value for stronger or weaker blur
  float maxBlurDistance = 0.5; // Maximum distance for blur effect


  for (float i = -10.0; i <= 10.0; i += 1.0) {
    vec2 offset = vec2(i * blurAmount, 0.0);
    vec2 sampledPos = vUv + offset;

    // Calculate the distance between the current pixel and the mouse position
    float distanceToMouse = distance(sampledPos, uMouse);

    // Adjust the blur amount based on the distance to create the localized effect
    float adjustedBlurAmount = mix(0.0 ,blurAmount , smoothstep(0.0, maxBlurDistance, distanceToMouse));

    color += texture2D(uTexture, sampledPos + vec2(adjustedBlurAmount * i, 0.0));
  }

  color /= 20.0; // Average the colors

  gl_FragColor = color;
}