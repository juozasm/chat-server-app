import * as types from '../actions/types';

export default (state=[], action)=>{
    switch (action.type){
      case types.ADD_CHAT_ITEM :
        return [...state, action.payload];
      case types.FETCH_CHAT:
        return action.payload;
      case types.NEW_ITEM :
       return [action.payload,...state]
      default:return state
      
    }
}