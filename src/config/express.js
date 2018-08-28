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

var _axios = require('axios');

var axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);


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

var _outbound = require('../app/controllers/outbound');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


_axios2.default.defaults.timeout = 6000;

_axios2.default.interceptors.request.use(function (config) {
    config.requestTime = new Date().getTime();
    return config;
}, function (err) {
    return Promise.reject(err);
});

_axios2.default.interceptors.response.use(function (res) {
  //  logger.logService({}, res.config, res, res.request.connection);
    return res;
}, function (err) {
    //logger.logService(err, err.config, {}, err.request.connection);
    return Promise.reject(err);
});


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
        this.getToken = this.getToken.bind(this);
        this.resToken = this.resToken.bind(this);
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
            // route to dialogflow
            this.express.get('/', _outbound.getCpId);
        }
    }, {
        key: 'getPlanStatus',
        value: function getPlanStatus() {
            // route to dialogflow
            this.express.get('/:userKey/planStatus',_outbound.getPlanStatus);
        }
    }, {
        key: 'getPlanOffer',
        value: function getPlanOffer() {
            // route to dialogflow
            this.express.get('/:userKey/planOffer',_outbound.getPlanOffer);
        }
    }, {
        key: 'getPurchasePlan',
        value: function getPurchasePlan() {

            // route to dialogflow
            this.express.post('/:userKey/purchasePlan',_outbound.getPurchasePlan);
        }
    }, {
        key: 'getEligibility',
        value: function getEligibility() {
            // route to dialogflow
            this.express.get('/:userKey/Eligibility/:planId',_outbound.getEligibility);
        }
    }, {
        key: 'getRegister',
        value: function getRegister() {
            this.express.post('/register', _outbound.getRegister);
        }
    },{
        key: 'getDpaStatus',
        value:  function getDpaStatus() {
            // route to dialogflow
            this.express.get('/dpaStatus',_outbound.getDpaStatus);
        }
    },{
        key: 'getToken',
        value:  function getToken() {
            // route to dialogflow
            this.express.get('/:userKey/getToken',this.resToken);
        }
    } ,{
        key:'resToken',
        value:async function resToken(req,res){
                     let userKey = req.params.userKey;
                      var header = {};
                    header['Content-Type'] ='application/json';
                    var body = {};
                    body['grant_type'] ='urn:ietf:params:oauth:grant-type:jwt-bearer';
                    body['timeout'] = 10000;
                    body['assertion']=userKey;
                    var url = "https://www.googleapis.com/oauth2/v4/token";
                var resData = await _axios2.default.post(url,body,header);
                console.log(resData.data);
                res.json({message:resData.data});
        }
    }, {
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
            this.getToken();
            var port =process.env.PORT || process.env.APP_PORT;
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
