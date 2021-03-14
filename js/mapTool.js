/*

Skapa en karta med angiven storlek
0 - en tom fil
1 - skapa en array att hålla information i
2 - fyll arrayen med rutor/tiles/rum (id, pos)
3 - ge varje rum ingångar/utgångar (paths)
4 - kolla om rummet är på kanten
100 - klar - en json-fil med en karta och informaton om rum på kartan

Skapa en karta med slumpad storlek
0 - slumpa fram en integer storlek
1 - kör ovanstående funktion med den slumpade storleken
100 - klar

Radera den lagrade kartan
0 - sätt array til []
1 - sätt innerHTML till ''
100 - klar

Visa saker för användaren
0 - skapa en 
100 - 

Spellogik vi inte ska röra i denna fil, men tänkt på
- sätta en startposition, målrum?.
- röra någon typ av spelare mellan rummen.
- placera items, npc, quests på kartan
- kontrollera om en rutan isEdge åt en riktning

*/

/*
// Exempel på färdig JSON

Map.json är en json med speldata om kartan, den kan vara del av en större gameData.json eller fristående.

let map = {
  mapSize: 3,
  tiles : [
    {
      id: 0,
      pos: {row: 0, col: 0},
      paths: {north: false, east: false, south: false, west: false}
    },
    {
      id: 1,
      ...
    }
  ]
}
*/



// When the page is loaded - generate a grid, then log and display it
window.onload = loadMapTool;

function loadMapTool() {
  map.tiles = generateGrid(3);
  console.log(map);

  let outputVisual = document.getElementById('output-map');
  let outputJson = document.getElementById('output-json');
  displayMap(outputVisual, map);
  displayJson(outputJson, map);
}

// Create empty map object
let map = {
  mapSize: 0,
  tiles: []
};

// Generate a grid of a given size
function generateGrid(_mapSize) {

  let tiles = [];
  let tileID = 0;

  for (let row = 0; row < _mapSize; row++) {
    for (let col = 0; col < _mapSize; col++ ) {    
      let tile = {
        id: tileID,
        pos: { row: row, col: col },
        paths: { n: false, e: false, s: false, w: false },
        edges: { 
          n: row == 0 ? true : false, 
          e: col == _mapSize-1 ? true : false,
          s: row == _mapSize-1 ? true : false,
          w: col == 0 ? true : false
        }
      };
      tiles.push(tile);
      tileID++;
    };
  };

  return tiles
};


// Output the map as HTML inside the given element
function displayMap(_element, _map) {
  _map.tiles.forEach(tile => {
      let tileDiv = document.createElement('div');
      tileDiv.id = tile.id;
      let p = document.createElement('p');
      let text = document.createTextNode(`ID: ${tile.id} \n Row: ${tile.pos.row} \n Col: ${tile.pos.col}`);
      p.append(text);
      tileDiv.append(p);
      _element.append(tileDiv);
  });
}


function displayJson(_element, _map) {
  let jsonStr = document.createTextNode(JSON.stringify(_map, true, 3));
  _element.append(jsonStr);
}

// Generate a random grid and add it to map
function generateRandomGrid(_max){
  let size = Math.floor(Math.random() * _max) + 1;
  generateGrid(size)
};

// Remove grid and add it to map
function removeGrid(){
};
