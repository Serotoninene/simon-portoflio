  uniform vec2 uQuadSize;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uProgress;

  varying vec2 vUv;

  float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
    vec2 adjustedDiscCenter = vec2((disc_center.x+ 0.5  ), (disc_center.y +0.5 )) ;
    float dist = distance(uv, adjustedDiscCenter);
    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
  }

  void main()
  {
    vUv = uv;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y *= uProgress;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;  
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }