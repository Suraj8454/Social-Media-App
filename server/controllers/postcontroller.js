const { success } = require("../Utils/responseWrapper");


const getallpostcontroller=async(req,res)=>{
  console.log(req._id);
  return res.send(success(200,'there are all posts'))
}

module.exports= { getallpostcontroller }