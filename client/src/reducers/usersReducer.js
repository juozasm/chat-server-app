import * as types from '../actions/types';

export default (state=[], action)=>{
    switch (action.type){
      case types.ALL_USERS:
       return action.payload;
      default:return state
      
    }
}