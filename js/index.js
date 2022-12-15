const $dropBtn = document.querySelector(".drop-btn");
const $dropMenu = document.querySelector(".drop-menu");
const $table = document.querySelector("tbody");
const $filt = document.querySelector(".input-search");
const $modal = document.querySelector(".modal-container");
let tableHtml = "";
let pokemon = [];
let filtPokemon = [];
let url = [];

$dropBtn.addEventListener("click", function () {
	$dropMenu.classList.toggle("active");
});

function htmlgenerator(list) {
	if (list.length != 0) {
		list.forEach(function (li) {
			tableHtml +=
				"<tr>" +
				"<td><input type =checkbox class= checkbox></td>" +
				"<td> <img data-name=" +
				li.name +
				" " +
				"class=front-pokemon src=" +
				li.sprites.front_default +
				"></td>" +
				"<td>" +
				li.id +
				"</td>" +
				"<td class=poke-name>" +
				li.name +
				"</td>" +
				"<td>" +
				li.base_experience +
				"</td>" +
				"<td>" +
				li.abilities[0].ability.name +
				"</td>" +
				"<td>" +
				li.types[0].type.name +
				"</td>" +
				"<td>" +
				li.weight +
				"</td>" +
				"<td>" +
				li.height +
				"</td>" +
				"</tr>";
		});
	} else {
		tableHtml =
			"<tr><td colspan=9 style=font-size:22px >Not Fount</td></tr>";
	}
	$table.innerHTML = tableHtml;
}

function contentGenerator(list) {
	list.forEach(function (el) {
		fetch(el.url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				url.push(data);
				if (url.length == list.length) {
					htmlgenerator(url);
					//console.log(url);
				}
			});
	});
}

$filt.addEventListener("input", function () {
	let query = this.value.toLowerCase();
	filtPokemon = url.filter(function (el) {
		if (el.name.toLowerCase().indexOf(query) != -1) {
			return true;
		} else {
			return false;
		}
	});
	htmlgenerator(filtPokemon);
	tableHtml = [];
});

fetch("https://pokeapi.co/api/v2/pokemon/")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		pokemon = data.results;
		contentGenerator(pokemon);
		//console.log(pokemon);
	});

function openModal(data) {
	if (data == open) {
		$modal.classList.add("active");
	} else if (data == close) {
		$modal.classList.remove("active");
	}
}

$table.addEventListener("click", function (event) {
	//console.log(event);
	let query = event.target.dataset.name;
	if (query) {
		fetch("https://pokeapi.co/api/v2/pokemon/")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				//console.log(data.results);
				url = data.results.filter(function (el) {
					if (el.name.indexOf(query) != -1) {
						return true;
					} else {
						return false;
					}
				});
				url = url[0].url;
				//console.log(url);
				fetch(url)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						//console.log(data);
						let modal =
							"<h3 class =modal-tittle>" +
							data.name +
							"</h3>" +
							"<div class = front-default>" +
							"<img src = " +
							data.sprites.other.dream_world.front_default +
							">" +
							"</div>" +
							"<div class = foot-bar>" +
							"<img src = " +
							data.sprites.back_default +
							">" +
							"<img src = " +
							data.sprites.back_shiny +
							">" +
							"<img src = " +
							data.sprites.front_default +
							">" +
							"<img src = " +
							data.sprites.front_shiny +
							">" +
							"</div>";
						document.querySelector(".modal").innerHTML = modal;
						//console.log(data);
					});
			});
		openModal(open);
	}
});

document.querySelector(".overlay").addEventListener("click", function () {
	openModal(close);
});
