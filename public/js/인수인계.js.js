document.addEventListener('DOMContentLoaded',() => {
	const submitBtn = document.querySelector('.submitBtn')
	const inputText = document.querySelector('.input_textarea')
	const writer = document.querySelector('.writer')
	const memoContainer = document.querySelector('.memoContainer')

	let getLocal = localStorage.getItem('인수인계')
	getLocal =  JSON.parse(getLocal)
	getLocal = Array.from(getLocal)

	getLocal.map((내용) => {
		const wrapper = document.createElement('div')
		wrapper.classList.add('memoWrapper')
		const nameDiv = document.createElement('div')
		const contentDiv = document.createElement('div')
		
		const nameTag = document.createElement('span')
		const name = document.createElement('span')

		nameTag.innerHTML = '작성자'
		name.innerHTML =  내용.작성자 
		
		nameDiv.appendChild(nameTag)
		nameDiv.appendChild(name)

		const contentTag  = document.createElement('span')
		const contentInner = document.createElement('div')
		contentTag.innerHTML = '내용'
		contentInner.innerHTML = 내용.내용

		contentDiv.appendChild(contentTag)
		contentDiv.appendChild(contentInner)

		wrapper.appendChild(nameDiv)
		wrapper.appendChild(contentDiv)

		memoContainer.appendChild(wrapper)
	})
	
	

	submitBtn.addEventListener('click',()=>{
		const content = inputText.children[0].value
		const writerV = writer.value	
	
		let total = {
			작성자 : writerV,
			내용 : content,
		}




		getLocal.push(total)

		getLocal = JSON.stringify(getLocal)

		localStorage.setItem('인수인계',getLocal)
	});
})
