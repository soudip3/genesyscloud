const getUserID = function(body, platformClient, callback){
    let apiInstance = new platformClient.UsersApi();

    // Search users
    apiInstance.postUsersSearch(body)
    .then((data) => {
        let value = {
            userID : data.results[0].id
        }
        //console.log(value)
        callback('',value)
    })
    .catch((err) => {
        callback('',err)
    });
}

module.exports = getUserID