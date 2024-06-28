const excelPastbtn = document.querySelector(".excelPastBtn")
const copyDriver = document.querySelector(".copyDriver")
const excelComplete = document.querySelector(".excelComplete")
const excelFailPast = document.querySelector(".excelFailPast")
const excelFailCopy = document.querySelector(".excelFailCopy")
const excelCompletePast = document.querySelector(".excelCompletePast")
const excelWho = document.querySelector(".excelWho")

let excelInfos = []
let excelInfo = {}
excelPastbtn.addEventListener('click',function(){
  navigator.clipboard.readText()
  .then(texts => {
      setTable(texts)
  })
  .catch(err => {
      alert('뭔가 잘 못됨, 새로고침 및 다른페이지 갔다오세요');
  });

})

copyDriver.addEventListener('click',() => copyTexts())


const copyTexts = () => {
  if(excelInfos.length == 0){
    messageAnimation(excelFailCopy)
  } else {
    let copy = ''
    excelInfos.forEach((info) => {

      copy += info.driver + '\t'+ info.location + '\t' + info.time + '\n'
      navigator.clipboard.writeText(copy);
      messageAnimation(excelComplete)
  
    })
  }
}

const messageAnimation = (e) => {
  gsap.to(e,{
    display:'flex',
    scale: 1,
    duration:0.3,
    opacity:1,
    bottom:100,
    ease:"power4.inOut",
    onComplete: () => {
      gsap.to(e, {
        opacity:0,
        bottom:105,
        duration:0.3,
        delay:0.4,
        ease:"power4.inOut",
        onComplete: () => {
          e.style.bottom = '92px'
          e.style.display = 'none'
          e.style.transform = 'translateX(-50%) scale(.9)'
        }
      })
    }
  })
}

const setTable = (texts) => {
  texts = texts.split('\t')
  excelInfos = []
  if(!isNaN(texts[0])){
    texts.forEach((text,index) =>  {
      if((index - 5) % 9 == 0){
            excelInfo.driver = text
      }else if((index - 2) % 9 == 0){
        let time = text.split(' ')
        time = time[1].split('\n')
        time = time[0].split(':')

        excelInfo.time = time[0]+":"+time[1]
      }
      else if((index - 8) % 9 == 0){
        excelInfo.location = text
      }else if((index - 9) % 9 == 0){
        if(index == 0) {
        } else {
          excelInfos.push(excelInfo)
          excelInfo = {}
        }
      }
    })
    messageAnimation(excelCompletePast)
    setWho()
  } else {
    messageAnimation(excelFailPast)
    let random = Math.random()
    random < 0.2 ? random = '음됬 못 잘 가뭔 ' 
    : random < 0.4 ? random = 'ㅌㅡㄹㄹㅣㅁ ㅈㅏㄹㅈㅗㅁ ㅎㅐㅂㅗㅅㅔㅇㅛ' 
    : random < 0.6 ? random = '뭐가 틀렸을 까요오오오오오오오?'
    : random = "설명서를 읽으면 됩니다."
      // alert(random)
  }
}

const setWho = () => {
  excelWho.innerHTML = "";
  excelWho.style.opacity = 0
  excelInfos.forEach(info => {
    div = document.createElement('div')
    span = document.createElement('span')
    span.innerHTML = info.driver + ' : ' + info.time
    div.appendChild(span)
    excelWho.appendChild(div)
  })
  gsap.to(excelWho,{
    // opacity:0,
    duration:0.22,
    ease:"power4.inout",
    onComplete: ()=> {
      gsap.to(excelWho, {
        opacity:1,
        duration:0.22,
        ease:"power4.inout"
      })
    }
  })
}


