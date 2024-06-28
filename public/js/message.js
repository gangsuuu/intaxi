document.addEventListener('DOMContentLoaded',() => {
	const pushInfoBtn = document.querySelector('#messageBtn');
	const tbody = document.querySelector('tbody')
	const row = 18;
	let res = [];
	let value = ['howPay','guest','language','time','start','end','car','driver','picket']

	pushInfoBtn.addEventListener('click',() => {

		navigator.clipboard.readText()
		.then(texts => {
				getInfo(texts)
		})
		.catch(err => {
				// alert('뭔가 잘 못됨, 새로고침 및 다른페이지 갔다오세요');
		});


		
	})//click

	const getInfo = (texts) => {
		texts = texts.split('\t');
		let count = 0
		let info = {}
	
		texts.map((t,i) => {
			let n = i % 17
			switch(n){
				case 0:
					if(i == 0) return;
					res.push(info)
					info ={}
					count++	
				break;
				case 4:
					info.guest = t
				break;
				case 5:
					info.time = t
				break;
				case 6:
					info.language = t
				break;
				case 7:
					info.start = t
				break;
				case 8:
					info.end = t
				break;
				case 11:
					info.howPay = t
				break;
				case 12:
					info.car = t
				break;
				case 13:
					info.picket = t
				break;
				case 15:
					info.driver = t
				break;
			}
			
		})
		
		
		createTable()
	}
	
	
	
	
	const createTable = () => {
		console.log(res);
		res.map((r, i) => {
			let count = Object.keys(r).length
			let tr = document.createElement('tr')
			let selectWrapper = document.createElement('td')
			let checkBox = document.createElement('input')
			checkBox.type = 'checkBox'


			checkBox.addEventListener('change',(e)=> {
				e.target.parentElement.parentElement.classList.toggle('massageEnd')

			})


			selectWrapper.appendChild(checkBox)
			tr.appendChild(selectWrapper)
			
			
			
			let time = r['time']
			time = time.split(' ');
			time = time[1].split(':')
			time = time[0]+':'+ time[1]
			
			let start = r['start']
			let end = r['end']
			let dir
			let picket = ''
			if(start  == '인천공항T1' || start == '인천공항T2'){
				dir = '예약 건'
		
				if(r['picket'] == 'Y') {
					dir = '피켓 예약 건';
					picket = '시간 맞춰 데스크에 방문하여 피켓 수령해 주시고, '
				}
			}else {
				dir = '샌딩 건'
				start = start.split(' ')
				start = start[1]
			}
		
			if(end  == '인천공항T1' || end == '인천공항T2'){
				dir = '샌딩 건'
			}else {
				end = end.split(' ')
				if(end[0] == '서울시') {
					end = end[1]
				} else{
					end = end[0]
				}
			}

			for(let j = 0; j < count ; j++){
				let td = document.createElement('td')
				let key = value[j]
				let v = r[key]
				
				if(key == 'guest'){
					
				}

				switch(key){
					case 'time':
						v = time
						break;
					case 'start':
						v = start
						break;
					case 'end':
						v = end
						break;
				}

				if(key == 'car' && v == '대형') {
					td.classList.add('carLarge')
				}
				if(key == 'howPay' && v == '후불') { 
					td.classList.add('howPayLater')
				}
				if(key == 'picket' && v == 'Y') {
					td.classList.add('picketYes')
				}

				if(dir == '샌딩 건'){
					td.classList.add('sanding')
					switch(key){
						case 'car':
							if(v = '대형') td.id ='carLarge'
						break;
						case 'howPay':
							if(v = '후불') td.id = 'howPayLater'
						break;
						case 'Picket':
							if(v = 'Y') td.id = 'picketYes'
						break;
					}
				}

				td.innerHTML = v
				tr.appendChild(td)	
			}

			let btnWrapper = document.createElement('td')
			let btn = document.createElement('button')
		
			btn.innerHTML = '메시지 복사'

			let howPay = r['howPay']
			if(howPay == '후불'){
				howPay = '후불'
			} else {
				howPay = ''
			}
			
			let message = `${r['driver']}님 안녕하세요.
금일 ${time}, ${start} => ${end} ${howPay}${ dir } 확인 차 연락드렸습니다. ${picket}확인하시면 회신 부탁드립니다.`
			btn.value = message

			btn.addEventListener('click',(e)=> {
				let v = e.target.value	
				navigator.clipboard.writeText(v);


			})
			btnWrapper.appendChild(btn)
			tr.appendChild(btnWrapper)
			tbody.appendChild(tr)
		})
	}

}) 

