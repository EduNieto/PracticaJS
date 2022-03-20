
const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("searchPokemon");
    let pokeName = pokeNameInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    console.log(pokeName);
    console.log(url);
    fetch(url).then((response) => {
        if(response.status != "200"){
            console.log(response);
            setImage("img/shadow.png")
            setName("Pokémon no encontrado");
        }
        else{
            return response.json();
        }
    }).then((data) => {
        let image = data.sprites.other.home.front_default;
        let name = data.name;
        let id = data.id;
        let type = data.types;
        let moves = data.moves;
        let stats = data.stats;
        setImage(image);
        setName(name);
        setId(id);
        setTypes(type);
        setMoves(moves);
        setStats(stats);
    })
    pokeNameInput.value = "";
}

/* Este código permite hacer la búsqueda con la tecla ENTER en la input*/
document.getElementById("searchPokemon").addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        document.getElementById("btnSearch").click();
    }
})
/*Funciones para instertar la informacion en HTML*/

function setImage(url){
    const img = document.getElementById("pokemonImg");
    img.src = url;
}

function setName(nombre){
    document.getElementById("pokemonName").innerHTML = nombre.toUpperCase();
}

function setId(numero){
    document.getElementById("pokemonId").innerHTML = `# ${numero}`;
}

function setTypes(array){
    array.forEach(element => {
        const tipos = document.getElementById("types");
        const p = document.createElement('p');
        p.innerHTML = element.type.name;
        tipos.appendChild(p);

    })
}

function setMoves(array){
    array.forEach(element => {
        const movimientos = document.getElementById("moves");
        const p = document.createElement('p');
        p.innerHTML = element.move.name;
        movimientos.appendChild(p);
    })
}
function setStats(array){
    array.forEach(element => {
        const stats = document.getElementById("stats");
        const div = document.createElement('div');
        div.setAttribute("class", "detail");
        const pname = document.createElement('p');
        const pvalue = document.createElement('p');
        pname.innerHTML = element.stat.name;
        pvalue.innerHTML = element.base_stat;
        stats.appendChild(div);
        div.appendChild(pname);
        div.appendChild(pvalue);
    })
}