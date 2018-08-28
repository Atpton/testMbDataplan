'use strict';
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getPlanOffer = undefined;



var getPlanOffer = exports.getPlanOffer = function getPlanOffer(req,res, next) {
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
};