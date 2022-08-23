varying float vElevation;


void main() {
  vec3 surfaceColor = vec3(.8, .9, 1.);
  vec3 depthColor = vec3(0.0, 0.15, 0.25);
  vec3 mixedColor = mix(depthColor, surfaceColor, vElevation * 1.);

  gl_FragColor = vec4(mixedColor, 1.0);
}