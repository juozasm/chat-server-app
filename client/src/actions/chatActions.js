import * as types from './types';
import axios from 'axios'

export function fetchChat() {
  // darom uzklausa i Node
  return async function(dispatch) {
    const res = await axios.get('/api/chat');
    console.log(res.data);
    dispatch({
      type:types.FETCH_CHAT,
      payload:res.data
    })
  }
}

export function newItem(item) {
  return {
    type:types.NEW_ITEM,
    payload:item
  }
}
export function allUsers() {
  return async function (dispatch) {
    const res = await axios.get('/api/users');
    console.log(res);
    dispatch({
      type:types.ALL_USERS,
      payload:res.data
    })
  }
}


export function addChatItem(formData) {
  return async function (dispatch) {
    const res = await axios.post('/api/chat', formData);
    console.log(res);
    dispatch({
      type:types.ADD_CHAT_ITEM,
      payload:res.data
    })
  }



}

