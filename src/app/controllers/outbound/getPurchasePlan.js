'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getPurchasePlan = undefined;

var getPurchasePlan = exports.getPurchasePlan = function getPurchasePlan(req,res, next) {
        let key_type = req.query.key_type;
        let userKey = req.params.userKey;
        console.log("PurchasePlan");
        console.log("userKey:"+userKey);
        console.log("key_type:"+key_type);            
        res.status(200).json({ userKey: userKey , key_type: key_type});
};