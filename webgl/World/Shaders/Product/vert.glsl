varying vec2 v_uv;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);

  v_uv = uv;

  gl_Position = projectionMatrix * pos;
}