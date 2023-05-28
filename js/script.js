let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    let modalContainer = document.querySelector("#modal-container");

    function addListItem(pokemon) {
        let pokeList = document.querySelector(".pokemon-list");

        let listItem = document.createElement("li");
        listItem.classList.add("list-style");

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-style");

        listItem.appendChild(button);
        pokeList.appendChild(listItem);

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
        pokemonRepository.loadDetails(pokemon).then(function () {
            let modalTitle = document.querySelector(".modal-title");
            modalTitle.innerText = pokemon.name;

            let imageContainer = document.querySelector(".image-container");
            let pokemonImage = document.createElement("img");

            pokemonImage.src = pokemon.imageUrl;
            pokemonImage.alt = pokemon.name;
            pokemonImage.classList.add("pokemon-image");

            imageContainer.innerHTML = "";
            imageContainer.append(pokemonImage);

            let pokemonHeight = document.querySelector(".height");
            pokemonHeight.innerText = "Height: " + pokemon.height + " m";

            // let pokemonTypes = document.querySelector(".types");
            // pokemonTypes.innerText = "Types: " + pokemon.types; //cannot figure out how to correctly display types

            let pokemonWeight = document.querySelector(".weight");
            pokemonWeight.innerText = "Weight: " + pokemon.weight + " kgs";

            let pokemonId = document.querySelector(".id");
            pokemonId.innerText = "PokeDex Number: " + pokemon.id;

            let modal = document.querySelector(".modal");
            modal.classList.add("modal-is-visible");
            modal.classList.remove("modal");


            let buttonContainer = document.querySelector("#button-container");
            let modalCloseButton = document.createElement("button");

            modalCloseButton.classList.add("btn");
            modalCloseButton.classList.add("modal-close");
            modalCloseButton.innerText = "+";
            buttonContainer.innerHTML = "";

            buttonContainer.append(modalCloseButton);

            modalCloseButton.addEventListener("click", function () {
                closeModal();
            });

        });

        let promiseReject;

        function closeModal() {
            let modalContainer = document.querySelector("#modal-container");
            modalContainer.classList.remove("modal-is-visible");
            modalContainer.classList.add("modal");

            if (promiseReject) {
                promiseReject();
                promiseReject = null;
            }
        }

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modalContainer.classList.contains("modal-is-visible")) {
                closeModal();
            }
        });

        modalContainer.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContainer) {
                closeModal();
            }
        });
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
            item.types = details.types; //difficulity figuring out how to display types from the nested object
            item.weight = details.weight / 10 //conversion from hectograms to kilograms
            item.id = details.id;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});