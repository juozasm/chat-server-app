import * as types from '../actions/types';

const initialState={
  isAuth:false,
  user:{}
};

export default (state=initialState,action)=>{
    switch (action.type){
      case types.LOG_IN :
        return {isAuth:true, user:action.payload};
      case types.REGISTER :
        return state;
      case types.LOG_OUT : return initialState;
      default : return state
    }
}