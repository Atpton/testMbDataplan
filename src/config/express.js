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
            this.express.get('/CPID_URL', function (req, res, next) {
            let app = req.query.app;
            console.info(`appID :${app}`);
            if(app){
              var key =_fs.readFileSync('./privatekey/p.key', 'utf8').toString();
                console.log(key);
                var CPID = _jsonwebtoken2.default.sign({
                    "iss":"dpi-dpa-mobile-dataplan-adapto@sustained-node-213113.iam.gserviceaccount.com",
                    "scope":"https://www.googleapis.com/auth/dataplansharing",
                    "aud":"https://www.googleapis.com/oauth2/v4/token",
                    "exp":Math.floor(Date.now() / 1000) + (60*60),
                    "iat":Math.floor(Date.now() / 1000),
                    "MSISDN":'0932780014'
                },key,{ algorithm: 'RS256' });
                 console.log("CPID");
                 res.status(200).json({ cpid: CPID ,"ttlSeconds": 2592000});
            }else{
                res.status(200).json({message:"without parameter app"});
            }
     
            });
        }
    }, {
        key: 'getPlanStatus',
        value: function getPlanStatus() {
            // route to dialogflow
            this.express.get('/DPA_URL/:userKey/planStatus', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
              console.log("planStatus");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
              if(key_type){
                    var responseData = {
                        "plans": [{
                        "planName": "ACME1",
                        "planId": "1",
                        "planCategory": "PREPAID",
                        "expirationTime": "2017-01-29T01:00:03.14159Z",
                        "planModules": [{
                        "moduleName": "Giga Plan", // req.
                        "trafficCategories": ["GENERIC"],
                        "expirationTime": "2017-01-29T01:00:03.14159Z",
                        "overUsagePolicy": "BLOCKED",
                        "maxRateKbps": "1500",
                        "description": "1GB for a month", // req.
                        "flexTimeWindows": [{
                        "weeklyRecurrenceDays": [
                              "WORKDAY"
                        ],
                        "accessBlocked": false,
                        "startTime": {
                        "hours": 2,
                        "minutes": 5,
                        "seconds": 30,
                        "nanos": 500000000
                        },
                        "endTime": {
                        "hours": 5,
                        "minutes": 5,
                        "seconds": 30,
                        "nanos": 500000000
                        },
                        "timeZone": "US/Pacific",
                        "discountPercentage": 50
                    }],
                        "coarseBalanceLevel": "HIGH_QUOTA"
                }]
            }],
            "operatorBrandName": "Test operator", // req.
            "expireTime": "2018-06-14T08:41:27-07:00", // req.
            "updateTime": "2018-06-07T07:41:22-07:00", // req.
            "title": "Prepaid Plan" // req.
        }
                res.status(200).send(responseData);
              }else{
                res.status(200).json({Error:"without key_type params",status:200});
              }
            });
        }
    }, {
        key: 'getPlanOffer',
        value: function getPlanOffer() {
            // route to dialogflow
            this.express.get('/:userKey/planOffer', function (req, res, next) {
            let key_type = req.query.key_type;
            let context = req.query.context;
            let userKey = req.params.userKey;
              console.log("PlanOffer");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
              console.log("context:"+context);
             let responseData = {
                "offerInfo": {
                "promoMessage": "Unlimited Videos for 30 days.", // req.
                "moreInfoURL": "http://example.com/learnmore",
                "operatorBrandName": "Amazing operator",
                "operatorLogoUrl": "https://gstatic.com/operator_logo.jpg" // req.
                },
                "offers": [
                {
                    "planName": "ACME Red", // req.
                    "planId": "turbulent1", // req.
                    "planDescription": "Unlimited Videos for 30 days.", // req.
                    "promoMessage": "Binge watch videos.",
                    "languageCode": "en_US", // req.
                    "overusagePolicy": "BLOCKED",
                    "cost": { // req.
                    "currencyCode": "INR",
                    "units": "300",
                    "nanos": 0
                    },
                    "duration": "2592000s",
                    "offerContext": "YouTube",
                    "trafficCategories": ["VIDEO"],
                    "quotaBytes": "9223372036850"
                }
                ],
                "expireTime": "2019-03-04T00:06:07Z" // req.
            }
             res.status(200).json(responseData);
            });
        }
    }, {
        key: 'getPurchasePlan',
        value: function getPurchasePlan() {

            // route to dialogflow
            this.express.post('/:userKey/purchasePlan', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
              console.log("PurchasePlan");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);            
             res.send({ userKey: userKey , key_type: key_type});
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getEligibility',
        value: function getEligibility() {
            // route to dialogflow
            this.express.get('/DPA/:userKey/Eligibility/:planId', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
            let planId = req.params.planId;
              console.log("eligibility");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
              console.log("context:"+context);
             res.send({ userKey: userKey , key_type: key_type , context: context });
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getRegister',
        value: function getRegister() {
    
            this.express.post('/register', function (req, res, next) {
              console.log("register");
              res.send({ userKey: userKey , key_type: key_type , context: context });
              res.sendStatus(200);
            });
        }
    },{
        key: 'getDpaStatus',
        value:  function getDpaStatus() {
            // route to dialogflow
            this.express.get('/dpaStatus', function (req, res, next) {
               console.log("dpaStatus");
               let responseData ={status:"status",message:"<optional human-readable status description>"};
               res.status(200).json(responseData);
            });
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
            var port =process.env.PORT || 3000;
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