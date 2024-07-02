document.addEventListener('DOMContentLoaded',function () {
  const createbtn = document.querySelector('.memoCRUD_btn__create')
  const cancelbtn = document.querySelector('.memoCRUD_btn__Cancel')
  const deletlbtn = document.querySelector('.memoCRUD_btn__delete')
  const editlbtn = document.querySelector('.memoCRUD_btn__edit')
  const submitlbtn = document.querySelector('.memoCRUD_btn__submit')
  const memoCRUDWrapper = document.querySelector('.memoCRUDWrapper')
  const memoDetailWrapper = document.querySelector('.memoDetailWrapper')
  const memoDetail_reviewContainer = document.querySelector('.memoDetail_reviewContainer')
  
  const createMemo = () => {
    memoCRUDWrapper.classList.toggle('inputsActive')
    memoDetailWrapper.classList.toggle('inputsActive_right')
    memoDetail_reviewContainer.classList.toggle('inputsActive_right')
    createbtn.classList.toggle('btn_hide')
    cancelbtn.classList.toggle('btn_hide')
    deletlbtn.classList.toggle('btn_hide')
    editlbtn.classList.toggle('btn_hide')
    submitlbtn.classList.toggle('btn_hide')
  }

  createbtn.addEventListener(('click'), createMemo)
  cancelbtn.addEventListener(('click'), createMemo)


})  
