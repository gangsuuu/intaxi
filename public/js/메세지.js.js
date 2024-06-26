document.addEventListener('DOMContentLoaded',() => {
	const btn = document.querySelector('button');
	const textarea = document.querySelector('textarea');
	const tbody = document.querySelector('tbody')
	const row = 18;
	let res = [];
	let value = ['howPay','guest','language','time','start','end','car','driver','picket']

	btn.addEventListener('click',() => {
		let texts = textarea.value.split('\t');
		let count = 0
		let info = {}
		texts.map((text,index) =>{
			if((index - 4) % 17 == 0){
				info.guest = text
			} //성함 

			if((index - 5) % 17 == 0){
				info.time = text
			} //시간 

			if((index - 6) % 17 == 0){
				info.language = text
			} //언어

			if((index - 7) % 17 == 0){
				info.start = text
			} //출발지

			
			if((index - 8) % 17 == 0){
				info.end = text
			} //도착지


			if((index - 11) % 17 == 0){
				info.howPay = text
			} // 선,후불

			if((index - 12) % 17 == 0){
				info.car = text
			} //차량

			if((index - 13) % 17 == 0){
				info.picket = text
			}

			if((index - 15) % 17 == 0){
				info.driver = text
			} //운전자

			if((index- 17) % 17 == 0){
				if(index == 0)  return
				res.push(info)
				info ={}
				count++	
			}		
		})//map	
		createTable()
	})//click

	const createTable = () => {
		res.map((r, i) => {
			let count = Object.keys(r).length
			let tr = document.createElement('tr')
			for(let j = 0; j < count ; j++){
				let td = document.createElement('td')
				let key = value[j]
				let v = r[key]
				td.innerHTML = v
				tr.appendChild(td)	
			}
			let btn = document.createElement('button')
			btn.innerHTML = '메시지 복사'

			let time = r['time']
			time = time.split(' ');
			time = time[1].split(':')
			time = time[0]+':'+ time[1]

			let start = r['start']
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

			let end = r['end']
			if(end  == '인천공항T1' || end == '인천공항T2'){
			}else {
				end = end.split(' ')
				if(end[0] == '서울시') {
					end = end[1]
				} else{
					end = end[0]
				}
			}

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
			tr.appendChild(btn)
			tbody.appendChild(tr)
		})
	}
}) 

