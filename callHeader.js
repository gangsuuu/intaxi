let active
document.addEventListener('pageEvent', (event) => {
  const page = event.detail.page
  active = page
  importPage('header','quickMenu','quickExcel')
});

async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function importPage(target,target2,target3) {
  let slash 
    if(target != 'index'){
      slash = '/'
    }
  document.querySelector('#' + target).innerHTML = await fetchHtmlAsText(slash + target + '.html');
  document.querySelector('#' + target2).innerHTML = await fetchHtmlAsText(slash + target2 + '.html');
  document.querySelector('#' + target3).innerHTML = await fetchHtmlAsText(slash + target3 + '.html');

  const li = document.querySelectorAll('.nav_warpper li')
  
  li.forEach((a) => {
    if(a.dataset.page == active){
      a.classList.add('header_active')
    }
  })

  const script = document.createElement('script')
  script.src = '/quickExcel.js'
  script.async = false;
  document.head.appendChild(script)

  const headerScript = document.createElement('script')
  headerScript.src = '/header.js'
  headerScript.async = false;
  document.head.appendChild(headerScript)
}

