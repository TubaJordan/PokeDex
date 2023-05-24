let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Bulbasaur", height: 0.7, weight: 6.9, type: ["grass", "poison"], id: 1 },
        { name: "Ivysaur", height: 1, weight: 13, type: ["grass", "poison"], id: 2 },
        { name: "Venusaur", height: 2, weight: 100, type: ["grass", "poison"], id: 3 },
        { name: "Abra", height: 0.9, weight: 19.5, type: ["psychic"], id: 63 },
        { name: "Kadabra", height: 1.3, weight: 56.5, type: ["psychic"], id: 64 },
        { name: "Alakazam", height: 1.5, weight: 48, type: ["psychic"], id: 65 },
        { name: "Dratini", height: 1.8, weight: 3.3, type: ["dragon"], id: 147 },
        { name: "Dragonair", height: 4, weight: 16.5, type: ["dragon"], id: 148 },
        { name: "Dragonite", height: 2.2, weight: 210, type: ["dragon", "flying"], id: 149 }
    ];

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
        console.log(pokemon)
    }

    function add(pokemon) {
        if (typeof pokemon === "object") {
            return pokemonList.push(pokemon);
        } else {
            console.log("Error, must be an Object")
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})()

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});