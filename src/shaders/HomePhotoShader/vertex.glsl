  uniform vec2 uQuadSize;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uProgress;

  varying vec2 vUv;



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