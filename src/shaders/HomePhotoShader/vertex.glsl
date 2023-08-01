  // uniform mat4 projectionMatrix;
  // uniform mat4 viewMatrix;
  // uniform mat4 modelMatrix;

  uniform vec2 uMouse;

  varying vec2 vUv;

  void main()
  {
      vUv = uv;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }