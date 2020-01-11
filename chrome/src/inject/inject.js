chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			let currId = ''

			console.log(`[tuga.tv_unblock] Scanning page;`)

			let rows = document.querySelectorAll('.row')
			for(let i = 0; i < rows.length;){
				let id = rows[i].id.toString()
				if(!id.startsWith('vbplayer')){
					i++
				} else {
					console.log(`[tuga.tv_unblock] Style block detected`)
					currId = id.substr(id.length-2, 2)
					break
				}
			}

			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = `#vbplayer_${currId} {display: none !important;} #vplayer_${currId} {display: block !important;}`;
			(document.head || document.documentElement).appendChild(style);

			console.log(`[tuga.tv_unblock] Injected style instructions;`)
			console.log(`[tuga.tv_unblock] Removed block`)
		}
	}, 10);
});