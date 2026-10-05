const levels = [
  {
    title:'趴下、掩護、穩住',
    image:'assets/images/level1-drop-cover-hold.png',
    prompt:'地震突然發生，教室開始搖晃。你第一時間應該怎麼做？',
    options:['立刻往教室外面衝','趴下、躲到堅固桌下並穩住桌腳','跑到窗戶旁查看外面','站在原地等老師來拉你'],
    answer:1,
    ok:'答對了！地震搖晃時先保護頭頸，趴下、掩護、穩住，不要在強烈搖晃時急著奔跑。',
    hint:'再想想：強烈搖晃時最重要的是先保護頭頸，並避免被掉落物擊中。'
  },
  {
    title:'安全位置在哪裡？',
    image:'assets/images/level2-safe-place.png',
    prompt:'下面哪一個地方比較適合作為地震發生時的暫時掩護位置？',
    options:['玻璃窗旁','高書櫃前','堅固桌子下方','吊燈正下方'],
    answer:2,
    ok:'答對了！堅固桌下可以提供掩護，同時要遠離玻璃、高櫃與可能掉落的物品。',
    hint:'觀察哪些地方可能有玻璃破裂、櫃子傾倒或物品掉落的危險。'
  },
  {
    title:'防災包要帶什麼？',
    image:'assets/images/level3-emergency-kit.png',
    prompt:'如果只能選一組物品放進防災包，哪一組最合適？',
    options:['水、手電筒、急救用品、哨子、乾糧','遊戲機、玩偶、足球、漫畫','大型音響、花瓶、玻璃杯','只有零食，其他都不用'],
    answer:0,
    ok:'答對了！防災包以維生、照明、求救與基本醫療用品為優先。',
    hint:'想想停電、等待救援或需要簡單急救時，真正派得上用場的是哪些物品。'
  },
  {
    title:'找到正確逃生路線',
    image:'assets/images/level4-evacuation-route.png',
    prompt:'開始疏散後，哪一種做法最安全？',
    options:['跟著緊急出口與疏散標示，有秩序前進','自己挑最快的路，逆向穿過人群','搭電梯快速下樓','邊走邊回教室拿忘記的東西'],
    answer:0,
    ok:'答對了！疏散時要依指示、保持秩序，不逆向、不回頭拿物品。',
    hint:'校園事先規劃的疏散路線與指示牌，就是緊急時的重要線索。'
  },
  {
    title:'濃煙怎麼辦？',
    image:'assets/images/level5-smoke-escape.png',
    prompt:'走廊出現煙霧時，下列哪一個行動比較正確？',
    options:['站直快跑，越快越好','躲進廁所等煙散掉','採較低姿勢，避開濃煙並依安全出口疏散','停下來拍影片'],
    answer:2,
    ok:'答對了！煙霧環境要降低姿勢、避開濃煙並遵循安全出口疏散。實際情況仍應聽從師長與消防指示。',
    hint:'煙通常會往上累積，想想要怎麼降低吸入煙霧的機會。'
  },
  {
    title:'集合點報到',
    image:'assets/images/level6-assembly-point.png',
    prompt:'安全離開建築物後，下一步應該做什麼？',
    options:['自己先回家','跑去找朋友聊天','到指定集合點集合，聽從老師指示並協助點名','離開隊伍去看建築物有沒有裂縫'],
    answer:2,
    ok:'答對了！到集合點後要留在隊伍中，讓老師確認每一個人的安全狀況。',
    hint:'疏散並不是走出建築物就結束，還要讓師長確認大家都安全。'
  }
];

let current = 0;
let score = 0;
let answeredCorrectly = false;
const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];

function show(id){ screens.forEach(s=>s.classList.toggle('active', s.id===id)); window.scrollTo({top:0,behavior:'smooth'}); }
function resetGame(){ current=0; score=0; answeredCorrectly=false; updateHeader(); renderLevel(); show('game'); }
function updateHeader(){ $('#score').textContent=score; $('#levelCounter').textContent=current<6 ? `${current+1}/6` : '6/6'; }
function renderLevel(){
  const l=levels[current]; answeredCorrectly=false;
  $('#levelImage').src=l.image; $('#levelImage').alt=l.title;
  $('#levelKicker').textContent=`第 ${current+1} 關 / 共 6 關`;
  $('#levelTitle').textContent=l.title; $('#levelPrompt').textContent=l.prompt;
  $('#progressBar').style.width=`${((current+1)/6)*100}%`;
  const box=$('#options'); box.innerHTML='';
  l.options.forEach((t,i)=>{ const b=document.createElement('button'); b.className='option'; b.textContent=t; b.addEventListener('click',()=>choose(i,b)); box.appendChild(b); });
  const f=$('#feedback'); f.className='feedback'; f.textContent=''; $('#nextBtn').classList.add('hidden'); updateHeader();
}
function choose(i,btn){
  const l=levels[current]; const all=[...document.querySelectorAll('.option')]; const f=$('#feedback');
  if(i===l.answer){
    if(!answeredCorrectly){ score++; answeredCorrectly=true; }
    all.forEach((b,idx)=>{ b.disabled=true; if(idx===l.answer)b.classList.add('correct'); });
    f.className='feedback ok'; f.textContent='✅ '+l.ok; $('#nextBtn').classList.remove('hidden'); updateHeader();
  }else{
    btn.classList.add('wrong'); btn.disabled=true; f.className='feedback no'; f.textContent='💡 '+l.hint;
  }
}
function next(){ if(!answeredCorrectly)return; if(current<levels.length-1){ current++; renderLevel(); }else finish(); }
function finish(){
  $('#finalScore').textContent=score; let text='';
  if(score===6) text='太棒了！六個任務全部完成，你已經掌握重要的校園防災觀念。';
  else if(score>=4) text='做得很好！你已經掌握大部分防災重點，再挑戰一次就更熟練。';
  else text='你完成任務了！再玩一次，把剛剛的提示變成真正的防災本領。';
  $('#resultText').textContent=text; $('#levelCounter').textContent='6/6'; show('result');
}

document.querySelectorAll('[data-start]').forEach(b=>b.addEventListener('click',resetGame));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.go)));
$('#nextBtn').addEventListener('click',next); $('#retryBtn').addEventListener('click',resetGame);
updateHeader();
