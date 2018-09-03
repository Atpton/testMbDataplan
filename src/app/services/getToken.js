'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetToken = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/axiosService');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

const queryString = require('query-string');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetToken = exports.GetToken = function (_Service) {
    _inherits(GetToken, _Service);

    function GetToken(userKey) {
        _classCallCheck(this, GetToken);

        var _this = _possibleConstructorReturn(this, (GetToken.__proto__ || Object.getPrototypeOf(GetToken)).call(this, _constants.ENV.BASE_API_GOOGLE));
        
       // this.setHeaders({'Content-Type':'application/json'});
        this.setHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        console.log("Test");
        this.setBody( JSON.stringify({
                           'grant_type':'urn:ietf:params:oauth:grant-type:jwt-bearer',
                          // 'grant_type':'urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer',
                           'timeout':10000,
                           'assertion':userKey
                     }));                   
        return _this;
    }

    _createClass(GetToken, [{
        key: 'request',
        value: function request() {
            return this.http.post('/oauth2/v4/token');
        }
    }]);

    return GetToken;
}(_service.axiosService);