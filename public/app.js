import {moods,rankMood} from './moods.js';
const $=s=>document.querySelector(s);const selected=new Set();let result=null;
for(let row=0;row<4;row++) moods.forEach((m,i)=>{const index=row*6+i;const b=document.createElement('button');b.className='keyword';b.textContent=m.words[row];b.setAttribute('aria-pressed','false');b.onclick=()=>{selected.has(index)?selected.delete(index):selected.add(index);b.setAttribute('aria-pressed',String(selected.has(index)));$('#count').textContent=selected.size?`${selected.size}개 선택했어요`:'아직 고른 단어가 없어요';$('#find').disabled=selected.size<3;clearResult();};$('#keywords').append(b);});
function clearResult(){result=null;$('#result').hidden=true;$('#picked').textContent='위에서 나의 무드를 찾아주세요';$('#pickedDot').style.background='';$('#chosenMood').value='';updateInvitation();}
$('#find').onclick=()=>{result=rankMood([...selected]);if(!result)return;$('#resultEn').textContent=result.en;$('#resultTitle').textContent=result.name;$('#resultText').textContent=result.text;const bg=`linear-gradient(135deg,${result.colors[0]},${result.colors[3]})`;$('#resultOrb').style.background=bg;$('#pickedDot').style.background=bg;$('#picked').textContent=result.name;$('#chosenMood').value=result.name;updateInvitation();$('#palette').replaceChildren(...result.colors.map(c=>{const i=document.createElement('i');i.style.background=c;return i;}));$('#result').hidden=false;$('#result').scrollIntoView({behavior:'smooth',block:'center'});};
$('#retry').onclick=()=>{selected.clear();document.querySelectorAll('.keyword').forEach(b=>b.setAttribute('aria-pressed','false'));$('#count').textContent='아직 고른 단어가 없어요';$('#find').disabled=true;clearResult();$('#finder').scrollIntoView({behavior:'smooth'});};
const dialog=$('#lightbox');document.querySelectorAll('[data-image]').forEach(b=>b.onclick=()=>{$('#largeImage').src=b.dataset.image;dialog.showModal();});$('#closeImage').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close();};
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{$('.bottom').classList.toggle('is-hidden',entries[0].isIntersecting);},{threshold:.15}).observe($('#consult'));
const storyScroll=$('.story-scroll');
function moveStory(direction){const card=storyScroll.querySelector('.story-card');const step=card.getBoundingClientRect().width+13;storyScroll.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
$('#storyPrev').onclick=()=>moveStory(-1);
$('#storyNext').onclick=()=>moveStory(1);

const invitationForm=$('#invitationForm');
const inviteSubmit=$('#inviteSubmit');
const inviteStatus=$('#inviteStatus');
let sendingInvitation=false;
function updateInvitation(){
  const form=$('#invitationForm');
  if(!form)return;
  const fields=['referrer','applicantName','age','gender','station','phone'];
  const complete=fields.every(id=>$('#'+id).value.trim())&&$('#chosenMood').value&&$('#consent').checked;
  const phone=$('#phone');
  const digits=phone.value.replace(/[\s()-]/g,'');
  phone.setCustomValidity(phone.value&&!/^0[0-9]{8,10}$/.test(digits)?'연락 가능한 전화번호를 확인해 주세요.':'');
  $('#inviteSubmit').disabled=sendingInvitation||!complete||!form.checkValidity();
}
invitationForm.addEventListener('input',updateInvitation);
invitationForm.addEventListener('change',updateInvitation);
$('#consentToggle').onclick=()=>{
  const details=$('#consentDetails');details.hidden=!details.hidden;
  $('#consentToggle').setAttribute('aria-expanded',String(!details.hidden));
};
invitationForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(sendingInvitation)return;
  if(!$('#chosenMood').value){inviteStatus.textContent='위에서 나의 무드를 먼저 찾아주세요.';return;}
  if(!invitationForm.reportValidity())return;
  sendingInvitation=true;updateInvitation();
  inviteSubmit.textContent='보내는 중…';inviteStatus.textContent='상담 신청을 전송하고 있어요.';
  try{
    const body=new URLSearchParams(new FormData(invitationForm));
    const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
    if(!response.ok)throw new Error('Submission failed');
    invitationForm.hidden=true;$('#inviteDone').hidden=false;$('#inviteDone').focus();
  }catch{
    inviteStatus.textContent='신청을 전송하지 못했어요. 입력 내용은 유지돼요. 잠시 후 다시 시도하거나 공식 인스타그램으로 문의해 주세요.';
  }finally{
    sendingInvitation=false;inviteSubmit.textContent='나만의 컬러 만나기 🎀';updateInvitation();
  }
});
