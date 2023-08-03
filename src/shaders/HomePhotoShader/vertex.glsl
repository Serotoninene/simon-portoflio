  uniform vec2 uQuadSize;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uProgress;
  uniform float uIntensity;
  uniform float uRadius;

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
    float elevation = sin(modelPosition.x *2.) * sin(modelPosition.z *2.) * 100.;
    // Calculate the distance from the vertex to the mouse position
    
     // Apply a scaling factor based on the distance to create the bubble effect

    modelPosition.y += elevation;
  
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;  
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }