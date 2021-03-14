/* 
  Flöde
   1. Användaren kommer till verktyget
   2. Kolla om det finns sparad data i localStorage
   3. Ladda data / skapa en ny tom Map
   4. Ladda editor och låt användare fylla i uppgifter
   4.5 Användaren klickar på en knapp
   5. Generera efter användarens inställningar och visa output
*/

/* Exempel på localstorage

localStorage.setItem("lastname", "Smith");

document.getElementById("result").innerHTML = localStorage.getItem("lastname"); 


*/

/*

Att göra EDITOR
 Ge användaren knappar att skapa grid med
*/

/*
Hålla koll på map
 - let map (den aktiva kartan man jobbar med)
 - func createMap
 - func deletemap
 - func loadMap
 - func saveMap
*/



// ** LAUNCH TOOL ** //

// When the page is loaded - generate a grid, then log and display it
window.onload = initMapTool;


// Elements
let outputVisual = document.getElementById('output-map');
let outputJson = document.getElementById('output-json');

function initMapTool() {


}


// ** MAP FUNCTIONALITY ** // 

/*
let map = {
  mapName: '',
  mapSize: 0,
  tiles: []
};
*/

// Create a new map with given name and size
function createMap(_mapName, _mapSize) {
  let map = {
    mapName: _mapName,
    mapSize: _mapSize,
    tiles: []
  };
  map.tiles = generateGrid(_mapSize);
  displayMap(outputVisual, map);
  displayJson(outputJson, map);
}

// Generate a tile grid of a given size
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



// Generate a random grid and add it to map
function generateRandomGrid(_max){
  let size = Math.floor(Math.random() * _max) + 1;
  generateGrid(size)
};

// Remove grid and add it to map
function removeMap(){
  map = {
    mapName: '',
    mapSize: 0,
    tiles: []
  };
};


// ** VISUALS ** //

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

// Output the Map object as JSON in the given element
function displayJson(_element, _map) {
  let jsonStr = document.createTextNode(JSON.stringify(_map, true, 3));
  _element.append(jsonStr);
}


// ** USER INPUT ** //