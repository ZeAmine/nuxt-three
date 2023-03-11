uniform sampler2D u_texture;
uniform float u_alpha;

varying vec2 v_uv;

void main() {
  vec4 baseColor = texture2D(u_texture, v_uv);

  gl_FragColor = baseColor;
  gl_FragColor.a = u_alpha;
}