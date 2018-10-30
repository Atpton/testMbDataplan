'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRequestId = require('express-request-id');

var _expressRequestId2 = _interopRequireDefault(_expressRequestId);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _middlewares = require('../app/middlewares');

var _constants = require('../app/utils/constants');

var _service = require('../app/services');

var _outbound = require('../app/controllers/outbound');

var _aog = require('../app/controllers/aog');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _aes256 = require('aes256');

var _aes256_2 = _interopRequireDefault(_aes256);

var _base64 = require('base-64');

var _base64_2 = _interopRequireDefault(_base64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Express = function () {
    function Express(oauth, logger) {
        _classCallCheck(this, Express);

           this.logger = logger;
        this.express = (0, _express2.default)();
        this.setConfig = this.setConfig.bind(this);
        this.setLoging = this.setLoging.bind(this);         
        this.getCpid = this.getCpid.bind(this);
        this.getPlanStatus = this.getPlanStatus.bind(this);
        this.getPlanOffer = this.getPlanOffer.bind(this);
        this.getPurchasePlan = this.getPurchasePlan.bind(this);
        this.getEligibility = this.getEligibility.bind(this);
        this.getRegister = this.getRegister.bind(this);
        this.getDpaStatus = this.getDpaStatus.bind(this);
        this.getUserToken = this.getUserToken.bind(this);
        this.getToken = this.getToken.bind(this);
        this.listen = this.listen.bind(this);
    }

    _createClass(Express, [{
        key: 'setConfig',
        value: function setConfig() {
            // generate request id
            this.express.use((0, _expressRequestId2.default)());
            // parse body params and attache them to req.body
            this.express.use(_bodyParser2.default.json());
            // extract session
            this.express.use(_middlewares.extractSession);

            this.express.use(_bodyParser2.default.urlencoded({ extended: true }));
        }
    },  {
        key: 'setLoging',
        value: function setLoging() {
            // logging
            this.logger.setCronJobLogRotate();
            this.express.use((0, _morgan2.default)(_constants.ENV.LOGS));
            this.express.use(this.logger.logRequest);
            this.express.use(this.logger.logResponse);
        }
    }, {
        key: 'getCpid',
        value: function getCpid() {
            this.express.get('/', [_aog.checkAcessKey,_outbound.getCpId]);
        }
    }, {
        key: 'getPlanStatus',
        value: function getPlanStatus() {
            this.express.get('/:userKey/planStatus',[_aog.checkAcessKey,_outbound.getPlanStatus]);
        }
    }, {
        key: 'getPlanOffer',
        value: function getPlanOffer() {
            this.express.get('/:userKey/planOffer',[_aog.checkAcessKey,_outbound.getPlanOffer]);
        }
    }, {
        key: 'getPurchasePlan',
        value: function getPurchasePlan() {
            this.express.post('/:userKey/purchasePlan',[_aog.checkAcessKey,_outbound.getPurchasePlan]);
        }
    }, {
        key: 'getEligibility',
        value: function getEligibility() {
            this.express.get('/:userKey/Eligibility/:planId',[_aog.checkAcessKey,_outbound.getEligibility]);
        }
    }, {
        key: 'getRegister',
        value: function getRegister() {
            this.express.post('/register', [_aog.checkAcessKey,_outbound.getRegister]);
        }
    },{
        key: 'getDpaStatus',
        value:  function getDpaStatus() {
            this.express.get('/dpaStatus',[_aog.checkAcessKey,_outbound.getDpaStatus]);
        }
    },{
        key: 'getUserToken',
        value:  function getUserToken() {
            this.express.get('/:Key/getToken',[_outbound.getUserToken]);
        }
    },{
        key:'getSignToken',
        value:function getSignToken(){
             this.express.get('/getSignToken',[_outbound.getSignToken]);
        }
    },{
        key:'getToken',
        value:function getToken(){
             this.express.post('/getToken',[_outbound.getToken]);
        }
    } , {
        key: 'listen',
        value: function listen() {
            this.setConfig();
          if (_constants.ENV.SAVE_LOG) {
                this.setLoging();
            }
            this.getCpid();
            this.getPlanStatus();
            this.getPlanOffer();
            this.getPurchasePlan();
            this.getEligibility();
            this.getRegister();
            this.getDpaStatus();
            this.getUserToken();
            this.getSignToken();
            this.getToken();
            var port = process.env.PORT || process.env.APP_PORT;
            if (_constants.ENV.ENV === 'production' && _constants.ENV.USE_HTTPS === true) {
                // var privateKey = _fs2.default.readFileSync(_constants.ENV.SSL_KEY, 'utf8').toString();
                // var certificate = _fs2.default.readFileSync(_constants.ENV.SSL_CERT, 'utf8').toString();
                // var credentials = { key: privateKey, cert: certificate };
                // if (_fs2.default.existsSync(_constants.ENV.SSL_CA)) {
                //     var certificateAuthority = _fs2.default.readFileSync(_constants.ENV.SSL_CA, 'utf8').toString();
                //     credentials.ca = certificateAuthority;
                // }
            //
            
                //_https2.default.createServer(credentials,this.express).listen(_constants.ENV.APP_PORT, function () {
                  _http2.default.createServer(this.express).listen(port, function (){
                   //console.log(1);
                    return console.info('server started on port ' + port+ ' (' + _constants.ENV.ENV + ')');
                });
            } else {
                this.express.listen(port, function () {
                    return console.info('server started on port ' +port + ' (' + _constants.ENV.ENV + ')');
                });
             
           
            }
        }
    }, {
        key: 'cancle',
        value: function cancle() {}
    }]);

    return Express;
}();

/**
 * Exports express
 * @public
 */

exports.default = Express;
