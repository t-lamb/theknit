function init() {

	//finds all .plus
	var plus = document.querySelectorAll('.plus');
	for (var i = 0; i < plus.length; i++) {
		plus[i].addEventListener('click', show);
		console.log(i);
	};
	
	//finds all .minus
	var minus = document.querySelectorAll('.minus');
	for (var i = 0; i < minus.length; i++) {
		minus[i].addEventListener('click', hide);
		console.log(i);
	};

	function show(e){
		console.log(e.target.parentElement);
		e.target.parentElement.classList.add('hidden');
		e.target.parentElement.nextElementSibling.classList.remove('hidden');
		e.target.parentElement.parentElement.querySelector('.expand').classList.remove('hidden');
	}

	function hide(e){
		e.target.parentElement.previousElementSibling.classList.remove('hidden');
		e.target.parentElement.classList.add('hidden');
		e.target.parentElement.parentElement.querySelector('.expand').classList.add('hidden');
	}

	var sourceSelf = document.getElementById('source-self');
		sourceSelf.addEventListener('click',function(){
			sourceUrl.classList.add('hidden');
			sourceNameLabel.parentElement.classList.remove('hidden');
			sourceNameLabel.innerHTML='My Name';
	});

	var sourceOutside = document.getElementById('source-outside');
		sourceOutside.addEventListener('click',function(){
			sourceUrl.classList.remove('hidden');
			sourceNameLabel.classList.remove('hidden');
			sourceNameLabel.parentElement.classList.remove('hidden');
			sourceNameLabel.innerHTML='Author or Source Name';
	});

	var sourceUrl = document.getElementById('sourceurl');
	var sourceNameLabel = document.getElementById('sourcename-label');

};

window.addEventListener('load', init);