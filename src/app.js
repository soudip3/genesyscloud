const platformClient = require("purecloud-platform-client-v2");
const getQueueID = require('./utils/getQueueID.js')
const getParticipantID = require('./utils/getInteractionDetails')
const postReplaceInteraction = require('./utils/replaceInteraction')
const getUserID = require('./utils/getUserID')
const getUserDetails = require('./utils/getUsersDetails')
const readline = require('readline');

const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs');
const { append } = require("express/lib/response");
const port = process.env.PORT || 80
const viewPath = path.join(__dirname,'../templates/views')
const fileName = path.join(__dirname,'../public/')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
app.use(express.static(fileName))
app.set('view engine', 'hbs')
app.set('views',viewPath)

app.get('', function(req,res){
    res.render('index',{
        title : 'Genesys Cloud',
        name : 'Created by Soudip Halder'
    })
})



const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.us_east_1); // Genesys Cloud region

// Manually set auth token or use loginImplicitGrant(...) or loginClientCredentialsGrant(...)
client.setAccessToken("BeZhgUwg1nkLTYs8KZSPgkOCxaJuZ-YXTE6ttBG8nzERk00xIXtfrKJBwIl7eiJGOG71cOPlmFOK-xq98AafiA");

app.get('/transferAnotherQueue', function(req, res){
    const interactionID = req.query.interactionID
    const queueName = req.query.queueName
    getParticipantID(interactionID, platformClient, function(error, data){
        try{
            let participantID = data.participantID
            getQueueID(queueName, platformClient, function(error, data){
                try{
                    const queueID = data.queueID
                    let body = {
                        "userId": "",
                        "address": "",
                        "userName": "",
                        "queueId": queueID,
                        "voicemail": false
                    };
                    postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
                        try{
                            res.send({
                                "output": data.output
                            })
                        }catch(e){
                            res.send({
                                error:error
                            })
                        }
                    })
                }catch(e){
                    res.send({
                        error : error
                    })
                }
            })
            
        }
        catch(e){
            res.send({
                error : error
            })
        }
    })
})

app.get('/transferUserAnotherQueue',function(req, res){
    const interactionID = req.query.interactionID
    const userID = req.query.userID
    const queueName = req.query.queueName
    getParticipantID(interactionID, platformClient, function(error, data){
        try{
            let participantID = data.participantID
            getQueueID(queueName, platformClient, function(error, data){
                try{
                    const queueID = data.queueID
                    let body = {
                        "queueId": queueID,
                        "userId": userID,
                        "address": "",
                        "userName": "",
                        "voicemail": false
                    };
                    postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
                        try{
                            res.send({
                                "output": data.output
                            })
                        }catch(e){
                            res.send({
                                error:error
                            })
                        }
                    })
                }catch(e){
                    res.send({
                        error:error
                    })
                }
            })
        }
        catch(e){
            res.send({
                error : error
            })
        }
    })
})

app.get('/transferUser', function(req, res){
    const interactionID = req.query.interactionID
    const userEmail = req.query.userEmail
    getParticipantID(interactionID, platformClient, function(error, data){
        try{
            const participantID = data.participantID
            let body = {
                "pageSize": 1,
                "pageNumber": 1,
                "query": [
                    {
                        
                        "fields": ["email"],
                        "value": userEmail,
                        "type": "EXACT"
                    }
                ]
            }
            getUserID(body, platformClient, function(error, data){
                try{
                    const userID = data.userID
                    let body = {
                        "userId": userID,
                        "address": "",
                        "userName": "",
                        "queueId": "",
                        "voicemail": false
                    };
                    postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
                        try{
                            res.send({
                                "output": data.output
                            })
                        }catch(e){
                            res.send({
                                error:error
                            })
                        }
                    })
                }catch(e){
                    res.send({
                        error:error
                    })
                }
            })
        }catch(e){
            res.send({
                error:error
            })
        }
    })
})

app.get('/transferUserSameQueue', function(req,res){
    const interactionID = req.query.interactionID
    const userID = req.query.userID
    getParticipantID(interactionID, platformClient, function(error, data){
        try{
            let participantID = data.participantID
            let queueID = data.queueID
            let body = {
                "userId": userID,
                "address": "",
                "userName": "",
                "queueId": queueID,
                "voicemail": false
            };
            postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
                try{
                    res.send({
                        "output": data.output
                    })
                }catch(e){
                    res.send({
                        error:error
                    })
                }
            })
            
        }
        catch(e){
            res.send({
                error : error
            })
        }
    })
})

app.get('/transferSameQueue', function(req,res){
    const interactionID = req.query.interactionID
    if(!interactionID){
        res.send({
            error : 'You must provide an interaction ID!'
        })
    }
    else{
        getParticipantID(interactionID, platformClient, function(error, data){
            try{
                let participantID = data.participantID
                let queueID = data.queueID
                let body = {
                    "userId": "",
                    "address": "",
                    "userName": "",
                    "queueId": queueID,
                    "voicemail": false
                };
                postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
                    try{
                        res.send({
                            "output": data.output
                        })
                    }catch(e){
                        res.send({
                            error:error
                        })
                    }
                })
                
            }
            catch(e){
                res.send({
                    error : error
                })
            }
        })
    }
})

app.get('/gerAnotherQueueUserList', function(req, res){
    const queueName = req.query.queueName
    getQueueID(queueName, platformClient, function(error, data){
        try{
            let queueID = data.queueID
            getUserDetails(queueID, platformClient, function(error, data){
                try{
                    res.send({
                        "output": data.userList,
                        "queueID": queueID
                    })
                }catch(e){
                    res.send({
                        error : error
                    })
                }
            })
        }catch(e){
            res.send({
                error: error
            })
        }
    })
})

app.get('/gerUserList', function(req, res){
    const interactionID = req.query.interactionID
    if(!interactionID){
        res.send({
            error : 'You must provide an interaction ID!'
        })
    }
    else{
        getParticipantID(interactionID, platformClient, function(error, data){
            try{
                let queueID = data.queueID
                getUserDetails(queueID, platformClient, function(error, data){
                    try{
                        res.send({
                            "output": data.userList
                        })
                    }catch(e){
                        res.send({
                            error : error
                        })
                    }
                })
            }catch(e){
                res.send({
                    error:error
                })
            }
        })
    }
})



app.listen(port,function(){
    console.log('server is running on port '+port)
})


