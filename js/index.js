const $dropBtn = document.querySelector(".drop-btn");
const $dropMenu = document.querySelector(".drop-menu");
const $table = document.querySelector("tbody");
const $filt = document.querySelector(".input-search");
let tableHtml = "";
let pokemon = [];
let filtPokemon = [];

$dropBtn.addEventListener("click", function () {
	$dropMenu.classList.toggle("active");
});

function htmlgenerator(data) {
	if (data) {
		tableHtml +=
			"<tr>" +
			"<td><input type =checkbox class= checkbox></td>" +
			"<td> <img class=front-pokemon src=" +
			data.sprites.front_default +
			"></td>" +
			"<td>" +
			data.id +
			"</td>" +
			"<td class=poke-name>" +
			data.name +
			"</td>" +
			"<td>" +
			data.base_experience +
			"</td>" +
			"<td>" +
			data.abilities[0].ability.name +
			"</td>" +
			"<td>" +
			data.types[0].type.name +
			"</td>" +
			"<td>" +
			data.weight +
			"</td>" +
			"<td>" +
			data.height +
			"</td>" +
			"</tr>";
	} else {
		tableHtml =
			"<tr><td colspan=9 style=font-size:22px >Not Fount</td></tr>";
	}
	$table.innerHTML = tableHtml;
}

function contentGenerator(list) {
	if (list.length != 0) {
		list.forEach(function (el) {
			fetch(el.url)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					htmlgenerator(data);
				});
		});
	} else {
		htmlgenerator(false);
	}
}

$filt.addEventListener("input", function () {
	let query = this.value.toLowerCase();
	let filtPokemon = pokemon.filter(function (el) {
		if (el.name.toLowerCase().indexOf(query) != -1) {
			return true;
		} else {
			return false;
		}
	});
	contentGenerator(filtPokemon);
	tableHtml = [];
});

fetch("https://pokeapi.co/api/v2/pokemon/")
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		pokemon = data.results;
		contentGenerator(pokemon);
	});

$table.addEventListener("click", function (event) {
	let url = event.target.dataset.url;
	if (url) {
		fetch(event.target.dataset.url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
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
				console.log(data);
			});
		openModal(open);
	}
});
document.querySelector(".overlay").addEventListener("click", function () {
	openModal(close);
});
