const $dropBtn = document.querySelector(".drop-btn");
const $dropMenu = document.querySelector(".drop-menu");
const $table = document.querySelector("tbody");
let tableHtml = "";

$dropBtn.addEventListener("click", function () {
	$dropMenu.classList.toggle("active");
	//console.log($dropMenu);
});
// function itemlGenerator(el) {
// 	//list.forEach(function (el) {
// 	fetch(el.url)
// 		.then(function (response) {
// 			return response.json();
// 		})
// 		.then(function (data) {
// 			//console.log(data.name);
// 			PokemonUrl = data;
// 		});
// 	//});
// }

// function tableGenerator(data) {
// 	console.log(data.name);
// }

function htmlgenerator(list) {
	tableHtml +=
		"<tr>" +
		"<td> <img src=" +
		list.sprites.front_default +
		"></td>" +
		"<td>" +
		list.name +
		"</td>" +
		"<td>" +
		list.base_experience +
		"</td>" +
		"<td>" +
		list.abilities[0].ability.name +
		"</td>" +
		"<td>" +
		list.id +
		"</td>" +
		"</tr>";
	//console.log(tableHtml);
	$table.innerHTML = tableHtml;
}

function contentGenerator(list) {
	list.forEach(function (el) {
		fetch(el.url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				pokemon = data;
				htmlgenerator(pokemon);
				//console.log(tableHtml);
			});
		//console.log(tableHtml);
	});

	//$table.innerHTML = tableHtml;
}

fetch("https://pokeapi.co/api/v2/pokemon/")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		pokemon = data.results;
		contentGenerator(pokemon);
	});
console.log(tableHtml);
