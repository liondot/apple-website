
let yOffset = 0; //window.pageYOffset
let prevScrollHeight = 0; //핸재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 높이의 합
let currentScene = 0; //현재 활성화된 (눈 앞에 보고있는) 씬
let enterNewScene = false; //새로운 scene이 시작된 순간 true

const sceneInfo = [{
  // 0
  type:' sticky',
  heightNum : 5, //브라우저 높이의 5배로 scrollHeight세팅
  scrollHeight: 0, 
  objs: {
    container : document.querySelector('#scroll-section-0'),
    messageA :document.querySelector('.message-a'),
    messageB :document.querySelector('.message-b'),
    messageC :document.querySelector('.message-c'),
    messageD :document.querySelector('.message-d'),
  }
}]

function scrollLoop() {
  enterNewScene = false;
  prevScrollHeight = 0;

  for(let i = 0; i < currentScene; i++) {
    enterNewScene = true;
    prevScrollHeight += sceneInfo[i].scrollHeight;
  }

  if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
    enterNewScene =true; 
    
  }
}

window.addEventListener('scroll', ()=> {
  scrollLoop()
})

window.addEventListener('resize', setLayout);