const jp = require('jsonpath')

const getParticipantID = function(interactionID, platformClient,callback){
let apiInstance = new platformClient.ConversationsApi();

let conversationId = interactionID; // String | conversationId

// Get a conversation by id
apiInstance.getAnalyticsConversationDetails(conversationId)
  .then((data) => {
    //let totalParticipant = data.participants.length;
    let participantID = ""
    let queueID = ""
    let segments = jp.query(data, '$.participants[?(@.purpose=="agent")].sessions[-1:].segments[-1:]')
    let participantIds = jp.query(data, '$.participants[?(@.purpose=="agent")].participantId')
    console.log(segments)
    console.log(participantIds.length)
    for(let i=0;i<participantIds.length;i++){
      if(!segments[i].disconnectType){
        participantID = participantIds[i]
        queueID = segments[i].queueId
      }
    }
    // for(i=totalParticipant-1;i>=0;i--){
    //     //console.log(data.participants[i].participantId+" "+data.participants[i].purpose)
    //     if(data.participants[i].purpose==="agent"){
    //         participantID = data.participants[i].participantId
    //         break
    //     }
    // }
    // for(i=totalParticipant-1;i>=0;i--){
    //   //console.log(data.participants[i].participantId+" "+data.participants[i].purpose)
    //   if(data.participants[i].purpose==="acd"){
    //       queueID = data.participants[i].sessions[0].segments[0].queueId
    //       break
    //   }
    // }
    const value = {
        participantID : participantID,
        queueID: queueID
    }
    console.log(value)
    callback('',value)
  })
  .catch((err) => {

    callback('',err)
  });
}

module.exports = getParticipantID