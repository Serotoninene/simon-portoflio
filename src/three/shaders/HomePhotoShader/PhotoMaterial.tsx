import { extend } from "@react-three/fiber";
// Three
import * as THREE from "three";
// Shaders
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";

export default class PhotoMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: { value: new THREE.Texture() },
        uTime: { value: 0 },
        uDistortionIntensity: { value: 0.3 },
        uDistortionSpeed: { value: 0.3 },
        uDistortionFrequency: {
          value: 0.2,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }

  get time() {
    return this.uniforms.uTime.value;
  }

  set time(v) {
    this.uniforms.uTime.value = v;
  }

  get distortionFrequency() {
    return this.uniforms.uDistortionFrequency.value;
  }

  set distortionFrequency(v) {
    this.uniforms.uDistortionIntensity.value = v;
  }

  get distortionIntensity() {
    return this.uniforms.uDistortionIntensity.value;
  }

  set distortionIntensity(v) {
    this.uniforms.uDistortionFrequency.value = v;
  }

  get distortionSpeed() {
    return this.uniforms.uDistortionSpeed.value;
  }

  set distortionSpeed(v) {
    this.uniforms.uDistortionSpeed.value = v;
  }

  get texture() {
    return this.uniforms.uTexture.value;
  }

  set texture(v) {
    this.uniforms.uTexture.value = v;
  }
}
extend({ PhotoMaterial });
