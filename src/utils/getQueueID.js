const getQueueID = function(name, platformClient,callback){
  let apiInstance = new platformClient.RoutingApi();

  let opts = { 
    "pageSize": 100, // Number | Page size [max value is 100]
    "pageNumber": 1, // Number | Page number [max value is 5]
    "sortBy": "name", // String | Sort by
    "sortOrder": "asc", // String | Sort order
    "name": name, // String | Name
    "id": "", // [String] | Queue ID(s)
    "divisionId": "" // [String] | Division ID(s)
  };

  // Get a paged listing of simplified queue objects, filterable by name, queue ID(s), or division ID(s).
  apiInstance.getRoutingQueuesDivisionviews(opts)
    .then((data) => {
      const value = {
            queueID : data.entities[0].id,
          }
          callback('',value)
        })
        .catch((err) => {
          callback('',err)
        });
}
  
module.exports = getQueueID