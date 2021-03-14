// shared functions for all tools go here

// create new object(item/npc/tile/) from given info, place in array, return it

// set up arrays to hold the new objects
let items = [];
let npcs = [];
let quests = [];

// collect an object with data for the new object (from form in future)
let boxArgs = {
    name: 'box',
    size: 3,
    colour: 'red',
    weight: 5
 }
 
 let treeArgs = {
     size: 'big',
     species: 'oak',
     weight: 500
  }

  let guyArgs = {
    name: 'bub',
    home: 'town',
    weight: 50
 }

 let dudeArgs = {
    name: 'jeff',
    home: 'city',
    weight: 75
 }

// create and modify the new object
function createNew(_args, _target){

    // give new object an id based on target array length
    _args['id'] = _target.length;

    // push object to target array
    _target.push(_args);

    // return the object to its var
    return _args
};

// request new object to be created and added to an array
// returns to myBox var for future editing if needed
let myBox = createNew(boxArgs, items);
let myTree = createNew(treeArgs, items);
let myGuy = createNew(guyArgs, npcs);
let myDude = createNew(dudeArgs, npcs);

// check what has happened
console.log('mybox is ' + (JSON.stringify(myBox)));

console.log('items is now ' + (JSON.stringify(items)));

console.log('the first item object is ' + (JSON.stringify(items[0])));

console.log('myguy is ' + (JSON.stringify(myGuy)));

console.log('mydude is ' + (JSON.stringify(myDude)));

console.log('the second npc object is ' + (JSON.stringify(npcs[1])));

console.log('npcs is now ' + (JSON.stringify(npcs)));