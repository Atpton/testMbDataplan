'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SharePlanOffer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/axiosService');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SharePlanOffer = exports.SharePlanOffer = function (_Service) {
    _inherits(SharePlanOffer, _Service);

    function SharePlanOffer(userKey) {
        _classCallCheck(this, SharePlanOffer);

        var _this = _possibleConstructorReturn(this, (SharePlanOffer.__proto__ || Object.getPrototypeOf(SharePlanOffer)).call(this,''));
        
        this.setHeaders({'Content-Type':'application/json'});
        this.setBody({
                           'user_key' : userKey
                     });                   
        return _this;
    }

    _createClass(SharePlanOffer, [{
        key: 'request',
        value: function request() {
            return this.http.post('');
        }
    }]);

    return SharePlanOffer;
}(_service.axiosService);