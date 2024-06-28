document.addEventListener("DOMContentLoaded", () => {
  const postBtns = document.querySelectorAll('#excelPostBtn')
  const copyBtns = document.querySelectorAll('#excelCopyBtn')
  const tables = document.querySelectorAll('.excel_table')
  
  postBtns.forEach((postBtn,index) => {
    postBtn.addEventListener("click", async () => {
      
      navigator.clipboard
      .readText()
      .then(texts => {
          setTable(texts,index)
      })
      .catch(err => {
          alert(err);
      });
    })
  })


  copyBtns.forEach((copyBtn,i) => {
      copyBtn.addEventListener('click',function(){
        let t   
        let n
        if(i == 0){
            t = 0
            n = 'n'
        } else if (i = 1){
            t = 0
            n ='t'
        } else if (i = 2){
          t = 1
          n = 'n'
        } else if (i = 3){
          t = 1
          n = 'n'
        }
        copyContent(t,n)
      })
  })


  const copyContent = (t,n) =>{
    let tds = document.querySelectorAll('#t'+t+n)
    let text
    tds.forEach(td => {
      console.log(td.innerHTML);
      text += td.innerHTML + '\n';
    })
    navigator.clipboard.writeText(text);
  }

  const setTable = (texts,i) => {
    texts = texts.split('\t')
    let tr = document.createElement('tr')
    if(!isNaN(texts[0])){
      texts.forEach((text,index) =>  {
        let td = document.createElement('td')
        if((index - 5) % 9 == 0){
            td.innerHTML = text
            td.id = 't'+i+'n'
            tr.prepend(td)
        }else if((index - 2) % 9 == 0){
          let time = text.split(' ')
          time = time[1].split('\n')
          time = time[0].split(':')
          
          td.id = 't'+i+'t'
          td.innerHTML = time[0]+":"+time[1] 
          tr.appendChild(td)
        } else if ((index - 9)% 9 == 0 && index != 0){
          tables[i].children[0].appendChild(tr)
          tr = document.createElement('tr')
        }
      })
    } else {
      let random = Math.random()
      random < 0.2 ? random = '음됬 못 잘 가뭔 ' 
      : random < 0.4 ? random = 'ㅌㅡㄹㄹㅣㅁ ㅈㅏㄹㅈㅗㅁ ㅎㅐㅂㅗㅅㅔㅇㅛ' 
      : random < 0.6 ? random = '뭐가 틀렸을 까요오오오오오오오?'
      : random = "설명서를 읽으면 됩니다."
        alert(random)
    }
  }

})


// const subBtn = document.querySelector('.submit')
// const clearBtn = document.querySelector('.clear')
// const textarea = document.querySelector('textarea') 
// const nameTable = document.querySelector('.name') 
// const timeTable = document.querySelector('.time') 


// console.log(subBtn);

// subBtn.addEventListener('click', function(){
//   let texts = textarea.value.split('\t')
//   texts.forEach((text,index) =>  {
//     if((index - 5) % 9 == 0){
//         let tr = document.createElement('tr')
//         let td = document.createElement('td')
//         td.innerHTML = text
//         tr.appendChild(td)
//         nameTable.appendChild(tr)
//      }else if((index - 2) % 9 == 0){
//        let time = text.split(' ')
//        time = time[1].split('\n')
//        time = time[0].split(':')
       
//        let tr = document.createElement('tr')
//         let td = document.createElement('td')
//         td.innerHTML = time[0]+":"+time[1]
       
//         tr.appendChild(td)
//         timeTable.appendChild(tr)
//      }
//   })
// })

// clearBtn.addEventListener('click',() => {
//   textarea.value = ''
//    timeTable.innerHTML = ''
//     nameTable.innerHTML = ''
// })