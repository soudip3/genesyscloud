const getUserDetails = function(queueID, platformClient,callback){
let apiInstance = new platformClient.RoutingApi();

let opts = { 
  "pageNumber": 1, // Number | 
  "pageSize": 100, // Number | Max value is 100
  "sortOrder": "asc", // String | Note: results are sorted by name.
};

// Get the members of this queue.
apiInstance.getRoutingQueueMembers(queueID, opts)
  .then((data) => {
    //console.log(`getRoutingQueueMembers success! data: ${JSON.stringify(data, null, 2)}`);
    const totalAgents = data.entities.length;
    
    let obj = {"userList":[]}
    for(let i=0;i<totalAgents;i++){
      
      let value = {
        "agentName": data.entities[i].name,
        "agentID": data.entities[i].id
      }
      obj['userList'].push(value)
    }    
    
    callback('',obj)
  })
  .catch((err) => {
    callback('',err)
  });
}

module.exports = getUserDetails