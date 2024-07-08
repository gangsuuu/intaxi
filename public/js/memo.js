document.addEventListener('DOMContentLoaded',function () {
  const createbtn = document.querySelector('.memoCRUD_btn__create')
  const cancelbtn = document.querySelector('.memoCRUD_btn__Cancel')
  const deletelbtn = document.querySelector('.memoCRUD_btn__delete')
  const editlbtn = document.querySelector('.memoCRUD_btn__edit')
  const submitlbtn = document.querySelector('.memoCRUD_btn__submit')
  const reviewSubmitBtn = document.querySelector('.memoDetail_review_addBtn')
  const memoCRUDWrapper = document.querySelector('.memoCRUDWrapper')
  const memoDetailWrapper = document.querySelector('.memoDetailWrapper')
  const memoDetail_reviewContainer = document.querySelector('.memoDetail_reviewContainer')
  const memoLists = document.querySelector('.memoLists')

  const hashtags = document.querySelector("input[name='hashtags']")
  const content = document.querySelector("textarea[name='content']")
  const title = document.querySelector("input[name='title']")
  const reviewInput = document.querySelector("textarea[name='review']")

  const memoDetail_title = document.querySelector(".memoDetail_title")
  const memoDetail_hashtags = document.querySelector(".memoDetail_hashtags")
  const memoDetailWriter = document.querySelector(".memoDetailWriter")
  const memoDetailDay = document.querySelector(".memoDetailDay")
  const memoDetail_content = document.querySelector(".memoDetail_content")

  let actived
  let currentUuid
  function addEvent() {
    createbtn.addEventListener(('click'), createMemo)
    cancelbtn.addEventListener(('click'), createMemo)
    submitlbtn.addEventListener(('click'),submitMemo)
    deletelbtn.addEventListener(('click'),deleteMemo)
    hashtags.addEventListener('keypress',hashtagKeyPress)
    reviewSubmitBtn.children[0].addEventListener('click',reviewSubmit)
  }



  const createMemo = () => {
    memoCRUDWrapper.classList.toggle('inputsActive')
    memoDetailWrapper.classList.toggle('inputsActive_right')
    memoDetail_reviewContainer.classList.toggle('inputsActive_right')
    createbtn.classList.toggle('btn_hide')
    cancelbtn.classList.toggle('btn_hide')
    deletelbtn.classList.toggle('btn_hide')
    editlbtn.classList.toggle('btn_hide')
    submitlbtn.classList.toggle('btn_hide')
  }

  const submitMemo = () => {
    var tv = title.value 
    var hv = hashtags.value 
    var cv = content.value
    let item = localStorage.getItem('memo')

    if(tv == ''){
      alert('제목입력바람')
      return 
    } else if (cv == '') {
      alert('내용입력바람')
      return
    }

    hv = hv.split(',')
    let user = localStorage.getItem('logined')
    user = JSON.parse(user)
    let d = new Date()
    var year = d.getFullYear();
    var month = (d.getMonth() + 1);
    var date = d.getDate();
    let time = year +'-' + month +'-'+ date

    let v = {
      title : tv,
      hashtags : hv,
      content : cv,
      pined : 'n',
      state : 'play',
      data : time,
      writer : user.name,
      review: [],
      uuid : generateUUID()
    }

    if(item == null) {
      item = []
      item.unshift(v)
      item = JSON.stringify(item)
    } else {
      item = JSON.parse(item)
      item.unshift(v)
      item = JSON.stringify(item)
    }

    try {
      localStorage.setItem('memo',item)
      title.value = ''
      hashtags.value = ''
      content.value = ''
      createMemo()
      showMemos()
      alert('등록완료')
    } catch (error) {
      alert('등록실패')
    }
  }
  
  const hashtagKeyPress = (e) => {
    if(e.code == 'Enter' || e.code == 'Space'){
      let v = hashtags.value
      let text = ''
      v = v.split(',');
      
      v.forEach(element => {
        element.replace(' ','')
        text += element + ','
      });
      
      hashtags.value = text
    }
  }
  
  const showMemos = () => {
    memoLists.innerHTML = ''
    let items = localStorage.getItem('memo')
    items = JSON.parse(items)
  
    if(items == null) {
      const p = document.createElement('p')
      p.innerHTML = '작성된 글이 없습니다'
      memoLists.appendChild(p)
      return
    }


    items.forEach((item,i)=> {
      
      const memoWrapper = document.createElement('div')
      memoWrapper.classList.add('memoWrapper')
      memoWrapper.dataset.uuid = item.uuid
      memoWrapper.addEventListener('click',changeDetail)
      if(i == 0){
        memoWrapper.classList.add('memoActive')
        actived = memoWrapper
        changeDetailUI(item.uuid)
        showMemos(item.uuid)
      }

      const memo = document.createElement('div')
      memo.classList.add('memo')


      // 1층
      const memoFirstRow = document.createElement('div')
      memoFirstRow.classList.add('memoFirstRow')

      const memoFirstLeft = document.createElement('div')
      const memoFirstLeftH4 = document.createElement('h4')
      memoFirstLeft.classList.add('memoFirstLeft')
      memoFirstLeftH4.innerHTML = item.title
      memoFirstLeft.appendChild(memoFirstLeftH4)
      //제목

      const memoFirstRight = document.createElement('div')
      const memofunction = document.createElement('div')
      const memoState = document.createElement('div')
      const memoStateP = document.createElement('p')
      //상태
      const memoComments = document.createElement('div')
      const memoCommentsP = document.createElement('p')
      //댓글 수
      const memoStateFix = document.createElement('div')
      const memoStateFixP = document.createElement('p')
      //고정상태
      
      memoFirstRight.classList.add('memoFirstRight')
      memofunction.classList.add('memofunction')
      memoState.classList.add('memoState')
      memoComments.classList.add('memoComments')
      memoStateFix.classList.add('memoStateFix')
      
      memoCommentsP.innerHTML = 0
      memoStateP.innerHTML = item.state == 'play' ? '진행중' : '종료'
      memoStateFixP.innerHTML = item.fixed == 'n' ? '고정됨' : '고정안됨'
      memoState.appendChild(memoStateP)
      memoComments.appendChild(memoCommentsP)
      memoStateFix.appendChild(memoStateFixP)
      memofunction.appendChild(memoState)
      memofunction.appendChild(memoComments)
      memofunction.appendChild(memoStateFix)
      memoFirstRight.appendChild(memofunction)
      
      
      memoFirstRow.appendChild(memoFirstLeft)
      memoFirstRow.appendChild(memoFirstRight)


      //2층
      const memoHashTagWrapper = document.createElement('div')
      memoHashTagWrapper.classList.add('memoHashTagWrapper')
      item.hashtags.map(hash => {
        const div = document.createElement('div')
        const p = document.createElement('p')
        div.classList.add('memoHashTag')
        


        hash = hash.replace(' ','')
        p.innerHTML = '#'+ hash
        if(hash == '예약' || hash == '노쇼'){
          div.id = 'memoBook'
        } else {
          div.id = 'memoDriver'
        }


        div.appendChild(p)
        memoHashTagWrapper.appendChild(div)
      })
      //해쉬태그 들어감

      //3층
      const memoinfo = document.createElement('div')
      const memoinfoP = document.createElement('p')
      const memoFristWriter  = document.createElement('div')
      const memoFristWriterP  = document.createElement('p')

      //작성자
      const memoFristDay = document.createElement('div')
      const memoFristDayP = document.createElement('p')
      //작성날짜

      memoinfo.classList.add('memoinfo')
      memoFristWriter.classList.add('memoFristWriter')
      memoFristDay.classList.add('memoFristDay')
      memoFristWriterP.innerHTML = item.writer
      memoinfoP.innerHTML = '/'
      memoFristDayP.innerHTML = item.data

      memoFristWriter.appendChild(memoFristWriterP)
      memoFristDay.appendChild(memoFristDayP)
      memoinfo.appendChild(memoFristWriter)
      memoinfo.appendChild(memoinfoP)
      memoinfo.appendChild(memoFristDay)

      //4층
      const memoContent = document.createElement('div')
      const memoContentInner = document.createElement('div')
      const memoContentInnerP = document.createElement('p')

      memoContent.classList.add('memoContent')
      memoContentInner.classList.add('memoContent__inner')
      memoContentInnerP.innerHTML = item.content

      memoContentInner.appendChild(memoContentInnerP)
      memoContent.appendChild(memoContentInner)
      //내용

      memo.appendChild(memoFirstRow)
      memo.appendChild(memoHashTagWrapper)
      memo.appendChild(memoinfo)
      memo.appendChild(memoContent)
      memoWrapper.appendChild(memo)
      memoLists.appendChild(memoWrapper)
    })
  }

  function changeDetail(e){
    let wrap = e.target.closest('.memoWrapper')
    let uuid = wrap.dataset.uuid

    if(e.target.closest('.memoState') 
    ||e.target.closest('.memoStateFix') 
     ) {
      changeState(uuid,e)
      return
     }

    actived.classList.remove('memoActive')
    wrap.classList.add('memoActive')
    actived = wrap

    changeDetailUI(uuid)
  }

  function changeDetailUI(id) {
    let items = localStorage.getItem('memo')
    items = JSON.parse(items)

    if(items == null){
      return
    }

    const foundItem = items.find(item => item.uuid === id);

    if (foundItem) {

    } else {
        alert('해당 메모를 찾지 못 했습니다')
        return
    }
    
    memoDetail_title.children[0].innerHTML = foundItem.title
    memoDetailDay.children[0].innerHTML = foundItem.data
    memoDetailWriter.children[0].innerHTML = foundItem.writer
    memoDetail_content.innerHTML = foundItem.content
    memoDetail_hashtags.innerHTML = ''
    foundItem.hashtags.map(tag => {
      const div = document.createElement('div')
      const p = document.createElement('p')
      div.classList.add('memoHashTag')
      tag = tag.replace(' ','')
      p.innerHTML = '#'+tag
      if(tag == '예약' || tag == '노쇼'){
        div.id = 'memoBook'
      } else {
        div.id = 'memoDriver'
      }
      
      div.appendChild(p)
      memoDetail_hashtags.appendChild(div)
    })
    currentUuid = id
  }

  function deleteMemo(){
    let items = localStorage.getItem('memo')
    items = JSON.parse(items)
    try {
      const filteredItems = items.filter(item => item.uuid !== currentUuid);
      let ary = JSON.stringify(filteredItems)
      localStorage.setItem('memo',ary)
      alert('삭제완료')
      showMemos()
    } catch (error) {
      alert('삭제실패')
      return
    }
  }

  function changeState(id,e) {
    let items = localStorage.getItem('memo')
    items = JSON.parse(items)

    if(items == null){
      return
    }
    items.map(item => {
      if(item.uuid == id){
        if(e.target.closest('.memoState')){
          if(item.state == 'play'){
            item.state = 'end'
          } else {
            item.state = 'play'
          }
        }
        if(e.target.closest('.memoStateFix')){
          if(item.fixed == 'n'){
            item.fixed = 'y'
          } else {
            item.fixed = 'n'
          }
        }
      }
    })

    items = JSON.stringify(items)

    localStorage.setItem('memo',items)
    showMemos()
  }

  function reviewSubmit (){
    let v = reviewInput.value
    // if(v == '') return
    let items = localStorage.getItem('memo')
    items = JSON.parse(items)
    try {
      items.forEach(item => {
        if(item.uuid == currentUuid){
          if(item.review == null){
            item.review = [v]
          } else {
            item.review.push(v)
          }
        }
      })
      showReview()
      localStorage.setItem('memo',JSON.stringify(items))
    } catch (error) {
      // alert('등록실패')
      return
    }
  }

  function showReview (){

  }
  function generateUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  showMemos()
  addEvent()
})  
