import * as types from '../actions/types';

export default (state=[], action)=>{
    switch (action.type){
      case types.NEW_ORDER : return [action.payload,...state];
      default : return state;
    }
}