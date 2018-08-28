'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getPlanStatus = undefined;

var getPlanStatus = exports.getPlanStatus = function getPlanStatus(req,res, next) {
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
};