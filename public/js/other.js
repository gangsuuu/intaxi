document.addEventListener('DOMContentLoaded',() => {
  const userCreate = document.querySelector('#userCreate')
  const userCancel = document.querySelector('#userCancel')
  const userAdmin_createWrapper = document.querySelector('.userAdmin_createWrapper')
  const userAdmin_Table = document.querySelector('.userAdmin_Table')
  const userSubmitbtn = document.querySelector('#userSubmit')
  const inputUserCreate = document.querySelector("input[name='userCreate']")


  const showUser = () => {
    let user = localStorage.getItem('user')
    if(user == null) return 

    const tbody = userAdmin_Table.querySelector('tbody')
    user = JSON.parse(user)
    
    user.forEach((text) => {
      let tr = document.createElement('tr')
      for(let i = 0; i < 3; i++){
        let td = document.createElement('td')
        let span = document.createElement('span')
        switch(i){
          case 0:
            span.innerHTML = text.name
            break;
          case 1:
            span.innerHTML = text.date
            break;
          case 2:
            let state = text.state == 'active' ? '활성화' : '비활성화'
            span.innerHTML = state
            break;
        }
        td.appendChild(span)
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    })
  }


  const toggleCreateUserModal = () => {
    userAdmin_createWrapper.classList.toggle('show_modal')
  }

  const userSubmit = () => {
    let v = inputUserCreate.value;
    if(v == '')  {
      // alert('사용자 이름을 입력해주세요') 
      // return;
    }

    let user = localStorage.getItem('user')
    let d = new Date()
    var year = d.getFullYear();
    var month = (d.getMonth() + 1);
    var date = d.getDate();
    let time = year +'-' + month +'-'+ date
    let item = {
      name : v,
      date : time,
      state: 'active'
    }

    
    if(user == null){
      user = [] 
      user.push(item)
    } else {
      user = JSON.parse(user)
      user.push(item)
    }
    user = JSON.stringify(user)
    localStorage.setItem('user',user)

  }


  userSubmitbtn.addEventListener('click',userSubmit)
  userCreate.addEventListener('click',toggleCreateUserModal)
  userCancel.addEventListener('click',toggleCreateUserModal)




  showUser()
})

