const _ = require('lodash');

module.exports = (data)=>{
  const errors ={};
  if(!data.message) errors.message='no message written';
  if(!data.message) data.message='';
  return {errors,isValid:_.isEmpty(errors)}
};