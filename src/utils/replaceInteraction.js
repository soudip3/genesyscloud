const postReplaceInteraction = function(interactionID, participantID, body, platformClient,callback){
let apiInstance = new platformClient.ConversationsApi();
 // Object | Transfer request
// Replace this participant with the specified user and/or address
//console.log(participantID)
apiInstance.postConversationsMessageParticipantReplace(interactionID, participantID, body)
  .then(() => {
    
    const value = {
      output: "success"
    }
    callback('',value)
  })
  .catch((err) => {
    const value = {
      output : "failure"
    }
    callback('',value)
  });
}

module.exports = postReplaceInteraction