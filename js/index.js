const $dropBtn = document.querySelector(".drop-btn");
const $dropMenu = document.querySelector(".drop-menu");

$dropBtn.addEventListener("click", function () {
	$dropMenu.classList.toggle("active");
	//console.log($dropMenu);
});
