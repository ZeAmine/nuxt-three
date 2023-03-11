uniform float u_position;

varying vec2 v_uv;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);

  pos.y += u_position;

  v_uv = uv;

  gl_Position = projectionMatrix * pos;
}