let pokemonList = [  //array of pokemon
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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 2.0) {
        document.write("<p><span>#" + pokemonList[i].id + "</span> " + pokemonList[i].name + " (height: " + pokemonList[i].height + " meters)" + " - Wow, that's big!</p>");
    } else {
        document.write("<p><span>#" + pokemonList[i].id + "</span> " + pokemonList[i].name + " (height: " + pokemonList[i].height + " meters)" + "</p>");
    }
}