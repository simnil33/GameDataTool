// ** shared functions for all tools go here **//

// create new object(item/npc/tile/) from given info, place in array, save it
function createNew(_args, _target){
    // give new object an id based on target array length
    _args['id'] = _target.length;
    // push object to target array
    _target.push(_args);
    // save stuff
    saveToStorage(_args, _target);
};

// Check if there are anything in local storage and update display
function loadFromStorage(_thing, _things) {
    if(localStorage.getItem(storageSingle)) {
      _thing = JSON.parse(localStorage.getItem(storageSingle));
    }
    if(localStorage.getItem(storageAll)) {
      _things = JSON.parse(localStorage.getItem(storageAll));
    }
    updateDisplay(_thing, _things)
  }

  // save to local storage and reload the data
  function saveToStorage(_thing, _things) {
    localStorage.setItem(storageSingle, JSON.stringify(_thing));
    localStorage.setItem(storageAll, JSON.stringify(_things));
    loadFromStorage()
  }

// update an object by pushing a new version of it to storage array
function updateObject(_object, _target){
    // check if an object with same id exist in objects array
    if (_target.find( ({ id }) => id === _object.id )){
      // if yes, replace that object with updated object
      let oldItem = _target.find( ({ id }) => id === _object.id );
      _target[oldItem.id] = _object;
      saveToStorage(_object, _target);
    } else {
      // if no, we want to create the object instead
      createNew(_object, _target);
    }
  }

/*

Not used right now, might be connected to a button or "remove this item"-button later.

// Remove an item from local storage and reload
function clearItem(){
    // remove data from local storage
    localStorage.removeItem('itemJson');
    // set the items array to empty again
    item = {};
    // get the new situation from storage
    loadFromStorage();
};

// Remove all items from local storage and reload
function clearItems(){
    // remove data from local storage
    localStorage.removeItem('itemsJson');
    // set the items array to empty again
    items = [];
    // get the new situation from storage
    loadFromStorage();
};

*/