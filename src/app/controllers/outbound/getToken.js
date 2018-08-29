'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getToken = undefined;

var _services = require('../../services');

var getToken = exports.getToken = async function getToken(req,res, next) {
         let userKey = req.params.userKey;
         if(userKey){
             var resData = await new _services.GetToken(userKey).request();
             console.log(resData.data);
             res.status(200).json({message:resData.data});
         }else{
              console.log("Error without userKey params");
              res.status(200).json({Error:"without userKey params"});
         }
};