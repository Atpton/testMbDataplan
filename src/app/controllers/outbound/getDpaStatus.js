'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getDpaStatus = undefined;



var getDpaStatus = exports.getDpaStatus = function getDpaStatus(req,res, next) {
     console.log("dpaStatus");
     let responseData ={status:"status",message:"<optional human-readable status description>"};
     res.status(200).json(responseData);
};