// sRGB (D65) -> CIELAB. Product swatches are illustrative estimates.
export const fromHex = hex => hex.match(/[a-f\d]{2}/gi).map(x => parseInt(x, 16));
export function lab(rgb) {
  const [r,g,b] = rgb.map(v => {const n=v/255; return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;});
  const f = v => v > 216/24389 ? Math.cbrt(v) : v*841/108+4/29;
  const x=f((r*.4124564+g*.3575761+b*.1804375)/.95047);
  const y=f(r*.2126729+g*.7151522+b*.0721750);
  const z=f((r*.0193339+g*.1191920+b*.9503041)/1.08883);
  return [116*y-16,500*(x-y),200*(y-z)];
}
export function compare(input, swatch) {
  const [l,a,b]=lab(input), [pl,pa,pb]=lab(fromHex(swatch));
  const c=Math.hypot(a,b), pc=Math.hypot(pa,pb);
  const dl=pl-l, dc=pc-c;
  const dh=Math.sqrt(Math.max(0,(pa-a)**2+(pb-b)**2-dc**2));
  // Symmetric CIE94-style perceptual weighting: brightness, chroma, hue.
  const meanC=(c+pc)/2;
  const delta=Math.hypot(dl,dc/(1+.045*meanC),dh/(1+.015*meanC));
  const hue=c<5||pc<5?'뉴트럴':Math.abs(Math.atan2(b,a)-Math.atan2(pb,pa))<.2?'비슷한 색조':pb/Math.max(1,pa)>b/Math.max(1,a)?'더 따뜻한 색조':'더 차분한 로즈빛';
  const depth=Math.abs(dl)<3?'밝기가 비슷해요':dl>0?'조금 더 밝아요':'조금 더 깊어요';
  const chroma=Math.abs(dc)<4?'채도가 비슷해요':dc>0?'더 선명해요':'더 부드러워요';
  return {delta,score:Math.round(100*Math.exp(-delta/30)),dl,dc,hue,depth,chroma};
}
export function rank(products, rgb) {return products.map(p=>({...p,match:compare(rgb,p.hex)})).sort((a,b)=>a.match.delta-b.match.delta||a.id-b.id);}
