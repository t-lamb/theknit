function init() {

	console.log("hello");

	var expand = document.querySelector('.expand');
	var plus = document.querySelector('.plus');
	plus.addEventListener('click', show);
	
	var minus = document.querySelector('.minus');
	minus.addEventListener('click', hide);

	function show(){	
		plus.classList.add('hidden');
		minus.classList.remove('hidden');
	}

	function hide(){
		plus.classList.remove('hidden');
		minus.classList.add('hidden');
	}


};

window.addEventListener('load', init);