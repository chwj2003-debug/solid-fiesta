export const moods=[
{id:'soft',name:'소프트 무드',en:'SOFT MOOD',words:['부드러운','편안한','은은한','다정한'],text:'부드럽고 편안한 분위기에 마음이 가는군요. 자연스럽게 이어지는 색과 질감에서, 표현하고 싶은 이미지의 힌트를 찾아보세요.',colors:['#f2dedb','#e8c3ce','#d3b5ca','#bda7c9','#998299']},
{id:'clear',name:'클리어 무드',en:'CLEAR MOOD',words:['맑은','산뜻한','생기 있는','깨끗한'],text:'맑고 생기 있는 이미지를 좋아하는 당신. 가벼운 색의 리듬 속에서 나를 더 밝게 표현하는 방법을 찾아보세요.',colors:['#fff0db','#f6c8bc','#f1acc2','#b7d6e5','#9ebfcd']},
{id:'natural',name:'내추럴 무드',en:'NATURAL MOOD',words:['담백한','자유로운','소박한','여유로운'],text:'꾸밈없이 편안한 분위기에 끌리나요? 담백한 색과 자연스러운 질감이 원하는 이미지의 출발점이 될 수 있어요.',colors:['#eee5d5','#d6c6ac','#bec4a9','#a4ae98','#888d79']},
{id:'classic',name:'클래식 무드',en:'CLASSIC MOOD',words:['단정한','차분한','신뢰감 있는','균형 잡힌'],text:'정돈되고 안정적인 인상을 표현하고 싶군요. 균형 있는 색의 조합에서 나만의 단정함을 발견해 보세요.',colors:['#ebe5df','#d4c3b8','#b4a5a7','#8c879b','#646175']},
{id:'chic',name:'시크 무드',en:'CHIC MOOD',words:['도시적인','세련된','간결한','독립적인'],text:'간결하고 세련된 분위기에 마음이 가는 당신. 절제된 색과 선명한 포인트로 표현하고 싶은 이미지를 그려보세요.',colors:['#e9e5ec','#c6bdce','#a49caf','#7c728c','#4c455b']},
{id:'bold',name:'볼드 무드',en:'BOLD MOOD',words:['대담한','개성 있는','화려한','자신감 있는'],text:'당신만의 존재감을 표현하고 싶군요. 과감한 색의 조합 속에서 마음에 드는 포인트를 찾아보세요.',colors:['#f2c4c9','#de8d9f','#b96b8a','#936787','#654762']}
];
export function rankMood(indices){if(indices.length<3) return null;const scores=moods.map((m,i)=>({m,score:indices.filter(n=>n%6===i).length}));return scores.sort((a,b)=>b.score-a.score)[0].m;}
