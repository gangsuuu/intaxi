const changeUserLists = document.querySelector('.changeUserLists')
const userChangeBtn = document.querySelector('.userChangeBtn')
const currentUser = document.querySelector('.currentUser')
let changeUserList

let isShow = false;



const ShowHeaderUser = () => {
  let user = localStorage.getItem('user')
  let logined = localStorage.getItem('logined')
  
  user = JSON.parse(user)
  if(logined == null){
    logined = user[0].name

    let name = {
      name :user[0].name
    }
    try {
      localStorage.setItem('logined', JSON.stringify(name))
    } catch (error) {
      
    }
  } else {
    logined = JSON.parse(logined)
    logined = logined.name
  }
  currentUser.innerHTML = ''
  changeUserLists.innerHTML = ''
  let p = document.createElement('p')
  p.innerHTML = logined
  currentUser.appendChild(p)


  user.forEach(element => {
    const div = document.createElement('div')      
    const span = document.createElement('span')      
    div.classList.add('changeUserList')
    span.dataset.name = element.name
    span.innerHTML = element.name
    div.appendChild(span)
    changeUserLists.appendChild(div)
  });

  changeUserList = document.querySelectorAll('.changeUserList')

  changeUserList.forEach(div => {
    div.addEventListener('click',(e) => {
      let name = e.target.dataset.name
      changeLogined(name)
      showUserLists()
    })
  })

}



const changeLogined = (n) => {
  let name = {name: n}
  name = JSON.stringify(name)
  localStorage.setItem('logined',name)
  ShowHeaderUser()
}

const showUserLists = () => {
  changeUserList = document.querySelectorAll('.changeUserList')
  if(!isShow) {
    gsap.to(changeUserList, {
      top:0,
      duration : 0.2,
      ease:'power4.inOut',
      stagger : 0.1,
    })
  } else {
    gsap.to(changeUserList, {
      top:-500,
      duration : 0.2,
      ease:'power4.inOut',
      stagger : 0.1,
    })
  }
  console.log(isShow);
  isShow = !isShow
}

userChangeBtn.addEventListener('click',showUserLists)
ShowHeaderUser()