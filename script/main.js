 (() => {

   let yOffset = 0; //window.pageYOffset 대신 쓸 변수
   let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
   let currentScene = 0; //현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)
   let enterNewScene = false; //새로운 scene이 시작된 순간 true

   const sceneInfo = [{
       // 0
       type: 'sticky',
       heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
       scrollHeight: 0,
       objs: {
         container: document.querySelector('#scroll-section-0'),
         messageA: document.querySelector('.message-a'),
         messageB: document.querySelector('.message-b'),
         messageC: document.querySelector('.message-c'),
         messageD: document.querySelector('.message-d')
       },
       values: {
				videoImageCount: 960,
				imageSequence: [0, 959],
				canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
			}
     },
     {
       // 1
       type: 'normal',
       heightNum: 5,
       scrollHeight: 0,
       objs: {
         container: document.querySelector('#scroll-section-1')
       }
     },
     {
       // 2
       type: 'sticky',
       heightNum: 5,
       scrollHeight: 0,
       objs: {
         container: document.querySelector('#scroll-section-2')
       }
     },
     {
       // 3
       type: 'sticky',
       heightNum: 5,
       scrollHeight: 0,
       objs: {
         container: document.querySelector('#scroll-section-3')
       }
     }
   ];

   function setLayout() {
    // 각 스크롤 섹션의 높이 세팅 
     for (let i = 0; i < sceneInfo.length; i++) {
       if(sceneInfo[i].type === 'sticky'){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
       }  else if (sceneInfo[i].type === 'nomal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight + window.innerHeight * 0.5;;
       }
       sceneInfo[i].objs.container.style.height =  `${sceneInfo[i].scrollHeight}px`
     }

     yOffset = window.pageYOffset;
     let totalScrollHeight = 0;
     for (let i = 0; i < sceneInfo.length; i++) {
       totalScrollHeight += sceneInfo[i].scrollHeight;
       if (totalScrollHeight >= yOffset) {
         currentScene = i;
         break
       }
     }
     document.body.setAttribute('id', `show-scene-${currentScene}`);
   }

   function calcValues(values, currentYOffset) {
     let rv;
     // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기 
     const scrollHeight = sceneInfo[currentScene].scrollHeight;
     const scrollRatio = currentYOffset / scrollHeight;

     //  rv = scrollRatio * (values[1] - values[0] + values[0])

     if (values.length === 3) {
       // start~ end 사이에 애니메이션 실행
       const partScrollStart = values[2].start * scrollHeight;
       const partScrollEnd = values[2].end * scrollHeight;
       const partScrollHeight = partScrollEnd - partScrollStart;

       if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
         rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0] + values[0])
       } else if (currentYOffset < partScrollStart) {
         rv = values[0];
       } else if (currentYOffset > partScrollEnd) {
         rv = values[1];
       }
     } else {
       rv = scrollRatio * (values[1] - values[0] + values[0])
     }

     return rv;
   }

   function playAnimation() {
     const objs = sceneInfo[currentScene].objs;
     const values = sceneInfo[currentScene].values;
     const currentYOffset = yOffset - prevScrollHeight;
     const scrollHeight = sceneInfo[currentScene].scrollHeight;
     const scrollRatio = currentYOffset / scrollHeight;


     switch (currentScene) {
       case 0:
        //  console.log(messageA_opacity_in)

         if(scrollRatio <= 0.22) {
          // in 
         objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
         objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
         } else {
          // out 
         objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
         objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
         }
         break;
       case 1:
         // console.log('1 play');
         break;
       case 2:
         // console.log('2 play');
         break;
       case 3:
         // console.log('3 play');
         break;
     }
   }

   function scrollLoop() {
     enterNewScene = false;
     prevScrollHeight = 0;

     for (let i = 0; i < currentScene; i++) {
       enterNewScene = true;
       prevScrollHeight += sceneInfo[i].scrollHeight;
     }

     if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
       enterNewScene = true;
       currentScene++;
       document.body.setAttribute('id', `show-scene-${currentScene}`);
     }

     if (yOffset < prevScrollHeight) {
       if (currentScene === 0)
         return;
       currentScene--;
       document.body.setAttribute('id', `show-scene-${currentScene}`);
     }

     if (enterNewScene) return;
     playAnimation();

   }

   window.addEventListener('scroll', () => {
     yOffset = window.pageYOffset;
     scrollLoop()
   })

   window.addEventListener('resize', setLayout);
   window.addEventListener('load', setLayout)
 })();