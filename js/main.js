// shared functions for all tools go here

// create new object(item/npc/tile/) from given info, place in array, return it
function createNew(_args, _target){

    // give new object an id based on target array length
    _args['id'] = _target.length;

    // push object to target array
    _target.push(_args);

    // return the object to its var
    return _args
};