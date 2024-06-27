document.addEventListener("DOMContentLoaded",function() {
  const excelPastbtn = document.querySelector(".quickExcelWrapper")
  console.log(excelPastbtn);


  excelPastbtn.addEventListener('click',function(){
    navigator.clipboard.readText()
    .then(texts => {
        setTable(texts,index)
    })
    .catch(err => {
        alert('뭔가 잘 못됨');
    });

  })

    const setTable = (texts) => {
        texts = texts.split('\t')
        if(!isNaN(texts[0])){
          texts.forEach((text,index) =>  {
            let td = document.createElement('td')
            if((index - 5) % 9 == 0){
                td.innerHTML = text
            }else if((index - 2) % 9 == 0){
              let time = text.split(' ')
              time = time[1].split('\n')
              time = time[0].split(':')
              
              td.innerHTML = time[0]+":"+time[1] 
            }
          })
        } else {
          let random = Math.random()
          random < 0.2 ? random = '음됬 못 잘 가뭔 ' 
          : random < 0.4 ? random = 'ㅌㅡㄹㄹㅣㅁ ㅈㅏㄹㅈㅗㅁ ㅎㅐㅂㅗㅅㅔㅇㅛ' 
          : random < 0.6 ? random = '뭐가 틀렸을 까요오오오오오오오?'
          : random = "설명서를 읽으면 됩니다."
            // alert(random)
        }
      }




})