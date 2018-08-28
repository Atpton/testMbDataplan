'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getEligibility = undefined;



var getEligibility = exports.getEligibility = function getEligibility(req,res, next) {
      let key_type = req.query.key_type;
      let userKey = req.params.userKey;
      let planId = req.params.planId;
      console.log("eligibility");
      console.log("userKey:"+userKey);
      console.log("key_type:"+key_type);
      res.status(200).json({ userKey: userKey , key_type: key_type});
};