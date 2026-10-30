import{n as e,t}from"./Talisman3DStage-CO2G94wb.js";var n=`#version 300 es
precision highp float;
in vec3 aPosition;in vec3 aNormal;in vec2 aUv;
uniform mat4 uViewProjection;
out vec3 vPosition;out vec3 vNormal;out vec2 vUv;
void main(){vPosition=aPosition;vNormal=aNormal;vUv=aUv;gl_Position=uViewProjection*vec4(aPosition,1.0);}`,r=`#version 300 es
precision highp float;
in vec3 vPosition;in vec3 vNormal;in vec2 vUv;
uniform vec3 uEye;uniform vec4 uBaseColor;uniform float uMetallic;uniform float uRoughness;uniform bool uNormalMap;
uniform sampler2D uBase;uniform sampler2D uOrm;uniform sampler2D uNormal;
out vec4 outColor;
const float PI=3.14159265359;
vec3 linearColor(vec3 c){return mix(c/12.92,pow((c+0.055)/1.055,vec3(2.4)),step(vec3(0.04045),c));}
vec3 srgb(vec3 c){return mix(12.92*c,1.055*pow(max(c,vec3(0.0)),vec3(1.0/2.4))-0.055,step(vec3(0.0031308),c));}
vec3 fresnel(float c,vec3 f0){return f0+(1.0-f0)*pow(1.0-c,5.0);}
vec3 light(vec3 N,vec3 V,vec3 L,vec3 radiance,vec3 albedo,float metal,float rough){
  vec3 H=normalize(V+L);float nl=max(dot(N,L),0.0),nv=max(dot(N,V),0.001),nh=max(dot(N,H),0.0);
  float a=rough*rough,a2=a*a,d=nh*nh*(a2-1.0)+1.0;
  float D=a2/max(PI*d*d,0.00001);float k=(rough+1.0)*(rough+1.0)/8.0;
  float G=(nv/(nv*(1.0-k)+k))*(nl/(nl*(1.0-k)+k));
  vec3 F=fresnel(max(dot(H,V),0.0),mix(vec3(0.04),albedo,metal));
  vec3 spec=D*G*F/max(4.0*nv*nl,0.001),diff=(1.0-F)*(1.0-metal)*albedo/PI;
  return (diff+spec)*radiance*nl;
}
void main(){
  vec3 albedo=linearColor(texture(uBase,vUv).rgb)*uBaseColor.rgb;
  vec3 orm=texture(uOrm,vUv).rgb;float metal=clamp(orm.b*uMetallic,0.0,1.0),rough=clamp(orm.g*uRoughness,0.08,1.0);
  vec3 N=normalize(vNormal)*(gl_FrontFacing?1.0:-1.0);
  if(uNormalMap){
    vec3 dp1=dFdx(vPosition),dp2=dFdy(vPosition);vec2 uv1=dFdx(vUv),uv2=dFdy(vUv);
    vec3 T=dp1*uv2.y-dp2*uv1.y,B=dp2*uv1.x-dp1*uv2.x;
    float inv=inversesqrt(max(max(dot(T,T),dot(B,B)),0.000001));
    N=normalize(mat3(T*inv,B*inv,N)*(texture(uNormal,vUv).xyz*2.0-1.0));
  }
  vec3 V=normalize(uEye-vPosition),f0=mix(vec3(0.04),albedo,metal);
  vec3 diffuse=albedo*(1.0-metal)*0.22,reflection=f0*(0.24+0.22*max(N.y,0.0));
  vec3 color=(diffuse+reflection)*orm.r;
  color+=light(N,V,normalize(vec3(2.0,3.0,4.0)),vec3(3.4,3.0,2.5),albedo,metal,rough);
  color+=light(N,V,normalize(vec3(-3.0,1.0,-2.0)),vec3(1.0,1.1,1.25),albedo,metal,rough);
  color=color/(vec3(1.0)+color);outColor=vec4(srgb(color),1.0);
}`;async function i(i,a,o,s=()=>{}){let c=[],l=[],u=[],d=[],f=null,p=!1,m=!0,h=()=>{p||(p=!0,c.forEach(e=>i.deleteBuffer(e)),l.forEach(e=>i.deleteTexture(e)),f&&i.deleteProgram(f),u.forEach(e=>i.deleteShader(e)),d.forEach(e=>e()))};try{if(typeof i.createShader!=`function`||typeof i.drawElements!=`function`)throw new t(`unsupported_context`,`WebGL2 unavailable`);let g=(e,n)=>{let r=i.createShader(e);if(!r)throw new t(`unsupported_context`,`shader allocation`);if(u.push(r),i.shaderSource(r,n),i.compileShader(r),!i.getShaderParameter(r,i.COMPILE_STATUS))throw new t(`decode_failed`,i.getShaderInfoLog(r)??`shader compilation`);return r};if(f=i.createProgram(),!f)throw new t(`unsupported_context`,`program allocation`);if(i.attachShader(f,g(i.VERTEX_SHADER,n)),i.attachShader(f,g(i.FRAGMENT_SHADER,r)),i.linkProgram(f),!i.getProgramParameter(f,i.LINK_STATUS))throw new t(`decode_failed`,i.getProgramInfoLog(f)??`shader link`);i.useProgram(f);let _=e=>i.getUniformLocation(f,e),v=[`aPosition`,`aNormal`,`aUv`].map(e=>i.getAttribLocation(f,e)),y={matrix:_(`uViewProjection`),eye:_(`uEye`),color:_(`uBaseColor`),metal:_(`uMetallic`),rough:_(`uRoughness`),normal:_(`uNormalMap`)};i.uniform1i(_(`uBase`),0),i.uniform1i(_(`uOrm`),1),i.uniform1i(_(`uNormal`),2);let b=e=>{let n=i.createTexture();if(!n)throw new t(`memory_pressure`,`texture allocation`);return l.push(n),i.bindTexture(i.TEXTURE_2D,n),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,0),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e instanceof Uint8Array?i.texImage2D(i.TEXTURE_2D,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,e):i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,e),n},x=b(new Uint8Array([255,255,255,255])),S=b(new Uint8Array([128,128,255,255])),C=[];for(let[e,t]of a.images.entries()){let n=await o(t,e);d.push(n.release),C.push(b(n.source))}let w=a.primitives.map(e=>{let n=new Float32Array(e.positions.length);for(let t=0;t<n.length;t++)n[t]=(e.positions[t]-a.bounds.center[t%3])/a.bounds.radius;let r=[n,e.normals,e.uvs].map(e=>{let n=i.createBuffer();if(!n)throw new t(`memory_pressure`,`vertex allocation`);return c.push(n),i.bindBuffer(i.ARRAY_BUFFER,n),i.bufferData(i.ARRAY_BUFFER,e,i.STATIC_DRAW),n}),o=i.createBuffer();if(!o)throw new t(`memory_pressure`,`index allocation`);return c.push(o),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,o),i.bufferData(i.ELEMENT_ARRAY_BUFFER,e.indices,i.STATIC_DRAW),{vertex:r,index:o,count:e.indices.length,material:e.material}}),T=e=>{for(let[t,n]of[e.baseColorImage,e.ormImage,e.normalImage].entries())i.activeTexture(i.TEXTURE0+t),i.bindTexture(i.TEXTURE_2D,n<0?t===2?S:x:C[n]);i.uniform4fv(y.color,e.baseColor),i.uniform1f(y.metal,e.metallic),i.uniform1f(y.rough,e.roughness),i.uniform1i(y.normal,+(e.normalImage>=0)),e.doubleSided?i.disable(i.CULL_FACE):i.enable(i.CULL_FACE)};return{render(n,r,a){if(p)return;if(i.isContextLost())throw new t(`context_lost`,`render context lost`);let o=e(r/a,n.yaw,n.pitch);i.viewport(0,0,r,a),i.clearColor(0,0,0,0),i.enable(i.DEPTH_TEST),i.disable(i.BLEND),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),i.useProgram(f),i.uniformMatrix4fv(y.matrix,!1,o.matrix),i.uniform3fv(y.eye,o.eye);for(let e of w)T(e.material),e.vertex.forEach((e,t)=>{i.bindBuffer(i.ARRAY_BUFFER,e),i.enableVertexAttribArray(v[t]),i.vertexAttribPointer(v[t],t===2?2:3,i.FLOAT,!1,0,0)}),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.index),i.drawElements(i.TRIANGLES,e.count,i.UNSIGNED_INT,0);if(m&&(m=!1,i.getError()!==i.NO_ERROR))throw new t(`decode_failed`,`initial GPU upload/render`);i.flush(),s()},dispose:h}}catch(e){throw h(),e}}export{i as createTalismanRenderer};