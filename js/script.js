let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    function addListItem(pokemon) {
        let pokeList = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "border-0");

        let button = document.createElement("button");
        if (pokemon.name === "mr-mime") {
            button.innerText = "Mr. Mime";
        } else if (pokemon.name === "nidoran-f") {
            button.innerText = "Nidoran - female";
        } else if (pokemon.name === "nidoran-m") {
            button.innerText = "Nidoran - male";
        } else if (pokemon.name === "farfetchd") {
            button.innerText = "Farfetch'd";
        } else {
            button.innerText = pokemon.name;
        }

        button.classList.add("btn", "btn-custom", "btn-block", "text-capitalize");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokeModal");

        pokeList.appendChild(listItem);
        listItem.appendChild(button);

        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalTitle = document.querySelector(".modal-title");

        if (pokemon.name === "mr-mime") {
            modalTitle.innerText = "Mr. Mime";
        } else if (pokemon.name === "nidoran-f") {
            modalTitle.innerText = "Nidoran - female";
        } else if (pokemon.name === "nidoran-m") {
            modalTitle.innerText = "Nidoran - male";
        } else if (pokemon.name === "farfetchd") {
            modalTitle.innerText = "Farfetch'd";
        } else {
            modalTitle.innerText = pokemon.name;
        }

        let pokemonImage = document.querySelector(".pokemon-image");
        pokemonImage.src = pokemon.imageUrl;
        pokemonImage.alt = pokemon.name

        let pokemonId = document.querySelector(".pokemon-id");
        pokemonId.innerText = "PokeDex Number: " + pokemon.id;

        let pokemonHeight = document.querySelector(".pokemon-height");
        pokemonHeight.innerText = "Height: " + pokemon.height + "m";

        let pokemonWeight = document.querySelector(".pokemon-weight");
        pokemonWeight.innerText = "Weight: " + pokemon.weight + " kgs";

        let pokemonType = document.querySelector(".pokemon-type");
        if (pokemon.types[1]) {
            pokemonType.innerText = "Types: " + ((pokemon.types[0].type.name).charAt(0).toUpperCase() + (pokemon.types[0].type.name).slice(1)) + " & " + ((pokemon.types[1].type.name).charAt(0).toUpperCase() + (pokemon.types[1].type.name).slice(1));
        } else {
            pokemonType.innerText = "Type: " + ((pokemon.types[0].type.name).charAt(0).toUpperCase() + (pokemon.types[0].type.name).slice(1));
        }
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Error, must be an Object")
        }
    }

    function getAll() {
        return pokemonList;
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (responce) {
            return responce.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height / 10; //conversion from decimeters to meters
            item.types = details.types;
            item.weight = details.weight / 10 //conversion from hectograms to kilograms
            item.id = details.id;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function clearPokemonList() {
        let pokemonClear = document.querySelector(".pokemon-list");
        pokemonClear.innerHTML = '';
    }

    function search(searchInput) {
        clearPokemonList();
        let pokemonSearchList = getAll();
        let pokemonSearchFilter = pokemonSearchList.filter((pokemon) => pokemon.name.includes(searchInput.toLowerCase()));
        pokemonSearchFilter.forEach((pokemon) => {
            addListItem(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        search: search
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

const searchInput = document.getElementById("name-input");
searchInput.addEventListener("input", (event) => {
    pokemonRepository.search(event.target.value);
});