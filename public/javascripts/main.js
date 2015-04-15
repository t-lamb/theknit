function init() {

	console.log("hello");

	var expand = document.querySelector('.expand');
	
	// var plus = document.querySelector('.plus');
	// 	plus.addEventListener('click', show);

	// var minus = document.querySelector('.minus');
	// 	minus.addEventListener('click', hide);

	var plus = document.querySelectorAll('.plus');
	for (var i = 0; i < plus.length; i++) {
		plus[i].addEventListener('click', show);
		console.log(i);
	};
	
	var minus = document.querySelectorAll('.minus');
	for (var i = 0; i < minus.length; i++) {
		minus[i].addEventListener('click', hide);
		console.log(i);
	};

	function show(e){
		console.log(e.target.parentElement.nextElementSibling);
		e.target.parentElement.classList.add('hidden');
		e.target.parentElement.nextElementSibling.classList.remove('hidden');
		//expand.classList.remove('hidden');
	}

	function hide(e){
		e.target.parentElement.previousElementSibling.classList.remove('hidden');
		e.target.parentElement.classList.add('hidden');
		//expand.classList.add('hidden');
	}

};

window.addEventListener('load', init);