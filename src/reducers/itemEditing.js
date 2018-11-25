import * as Types from './../constants/ActionTypes';

var initialstate = {};

const itemEditing = (state = initialstate, action)=>{
    switch(action.type){
        case Types.EDIT_PRODUCT:
            return action.product;
        default:
            return state;
    }
}

export default itemEditing;