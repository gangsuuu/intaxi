document.addEventListener('DOMContentLoaded',function () {
  const createbtn = document.querySelector('.memoCRUD_btn__create')
  const memoCRUDWrapper = document.querySelector('.memoCRUDWrapper')
  const memoDetailWrapper = document.querySelector('.memoDetailWrapper')
  const memoDetail_reviewContainer = document.querySelector('.memoDetail_reviewContainer')
  
  const createMemo = () => {
    memoCRUDWrapper.classList.toggle('inputsActive')
    memoDetailWrapper.classList.toggle('inputsActive_right')
    memoDetail_reviewContainer.classList.toggle('inputsActive_right')
  }

  createbtn.addEventListener(('click'), createMemo)



})  
