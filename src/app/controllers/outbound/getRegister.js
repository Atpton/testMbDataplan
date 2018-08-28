'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getRegister = undefined;



var getRegister = exports.getRegister = function getRegister(req,res, next) {
    console.log("register");
    res.status(200).send({ userKey: userKey , key_type: key_type , context: context });
};