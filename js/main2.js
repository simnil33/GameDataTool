
class GameData {
   constructor() {
      this.items = [],
      this.npcs = [],
      this.quests = [],
      this.map = []
   }

   add(obj, target) {
      target.push(obj);
   };

   // saves currentGameData to localstorage
   save() {};
   // deletes currentGamedata from localstorage
   delete() {};
   
   update() {};

   load(){
       
   }
}

class Entity { 
   constructor(obj) {
      Object.assign(this, obj);
   }
}

class Item extends Entity {
   constructor(obj) {
      super(obj);
   }
}


class Npc extends Entity {
   constructor(obj) {
      super(obj);
   }
}

let currentGameData;
let storedGameData = localStorage.getItem('gameData');

// on load, check for stored data
if(storedGameData) {
   console.log('Yes, there is storedGameData');
   // Clean this up when we've learned how to code
   currentGameData = new GameData();
   storedGameData = JSON.parse(storedGameData);
   //currentGameData.items = storedGameData.items;
   //currentGameData.npcs = storedGameData.npcs;
   //currentGameData.quests = storedGameData.quests;
   //currentGameData.map = storedGameData.map;
   // ? currentGameData = Object.assign(currentGameData, storedGameData);
} else {
   console.log('No, there is no storedGameData');
   currentGameData = new GameData();
   console.log(currentGameData);
   localStorage.setItem('gameData', JSON.stringify(currentGameData));
}

let myItem = {
    name: 'good name',
    weight: 'heavy',
    color: 'blue'
};


let myNpc = {
   name: 'DObbie',
   type: 'Elf',
   purpose: 'none'
};

let theFuckingItem = new Item(myItem);
let theFuckingNpc = new Npc(myNpc);


currentGameData.add(theFuckingItem, currentGameData.items);
currentGameData.add(theFuckingNpc, currentGameData.npcs);
console.log(currentGameData);

/*
class Entity { 

   constructor(obj) {
      Object.assign(this, obj);
   }


}

class Item extends Entity {
   constructor() {
      super();
   }
}

class Npc extends Entity {
   constructor() {
      super();
   }
}

class Quest extends Entity {
   constructor() {
      super();
   }
}

class Tile extends Entity {
   constructor() {
      super();
   }
}

class Map extends Entity {
   // input must contain a tiles array + other info about map
   constructor() {
      super();
   }

   swapTiles(_tileA, _tileB) {
      // Change X,Y between two tiles.
   }
}

 gameData = {
    items = [
       {
          _id: '23423',
          x: 2,
          y: 2,
          vadduvill: 'här'
       }
    ],
    npcs = [],
    quests = [],
    tiles = [],
    map = []
 }
 */