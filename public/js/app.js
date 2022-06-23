let lastQueueName = ""
function EnableDisableTextBox(){
    var transferSameQueue = document.getElementById('transferSameQueue')
    var transferUserSameQueue = document.getElementById('transferUserSameQueue')
    var transferAnotherQueue = document.getElementById('transferAnotherQueue')
    var transferUserAnotherQueue = document.getElementById('transferUserAnotherQueue')
    var transferUser = document.getElementById('transferUser')
    var queueName = document.getElementById('queueName')
    var checkQueue = document.getElementById('checkQueue')
    var userEmail = document.getElementById('userEmail')
    var userList = document.getElementById('userList')
    if(transferSameQueue.checked){
        queueName.disabled = true
        userList.disabled = true
        userEmail.disabled = true
        checkQueue.disabled = true
    }
    if(transferUserSameQueue.checked){
        userList.disabled = transferUserSameQueue.checked ? false : true
        queueName.disabled = true
        userEmail.disabled = true
        checkQueue.disabled = false
        if(!userList.disabled){
            userList.focus()
        }
    }
    if(transferAnotherQueue.checked){
        queueName.disabled = transferAnotherQueue.checked ? false : true
        userList.disabled = true
        userEmail.disabled = true
        checkQueue.disabled = true
        if(!queueName.disabled){
            queueName.focus()
        }
    }
    if(transferUserAnotherQueue.checked){
        queueName.disabled = transferUserAnotherQueue.checked ? false : true
        //userList.disabled = true
        userEmail.disabled = true
        checkQueue.disabled = false
        if(!queueName.disabled){
            queueName.focus()
        }
    }
    if(transferUser.checked){
        userEmail.disabled = transferUser.checked ? false : true
        queueName.disabled = true
        userList.disabled = true
        checkQueue.disabled = true
        if(!userEmail.disabled){
            userEmail.focus()
        }
    }
}


const genesysCloud = document.querySelector('form')
//const interactionID = document.getElementById('#interactionID')
const checkQueue = document.querySelector('#checkQueue')
//const submit = document.getElementById('submit')

checkQueue.addEventListener('checkQueue', function(e){
    e.preventDefault()
    console.log("hello")
})

genesysCloud.addEventListener('submit',function(e){
    e.preventDefault()
    var transferSameQueue = document.getElementById('transferSameQueue')
    var transferUserSameQueue = document.getElementById('transferUserSameQueue')
    var transferAnotherQueue = document.getElementById('transferAnotherQueue')
    var transferUserAnotherQueue = document.getElementById('transferUserAnotherQueue')
    var transferUser = document.getElementById('transferUser')
    const interactionID = document.getElementById('interactionID').value
    const queueName = document.getElementById('queueName').value
    const userEmail = document.getElementById('userEmail').value
    if(transferSameQueue.checked){
        const url = '/transferSameQueue?interactionID=' + encodeURIComponent(interactionID) 
        fetch(url).then(function(response){
            response.json().then(function(data){
                if(data.error){
                    console.log(data.error)
                    alert("Please check your input")
                }
                else{
                    console.log(data.output)
                    if(data.output === 'failure'){
                        alert("Please check your input")
                    }
                    else{
                        alert("We have successfully moved interaction!!")
                        
                    }
                }
            })
        })
    }
    if(transferUserSameQueue.checked){
        var options = document.getElementById('userList')
        if(options.value===""){
            const url = '/gerUserList?interactionID=' + encodeURIComponent(interactionID)
            fetch(url).then(function(response){
                response.json().then(function(data){
                    if(data.error){
                        console.log(data.error)
                    }
                    else{
                        var length = options.options.length
                        for(let i=length-1;i>=0;i--){
                            options.remove(options.options[i])
                        }
                        for(let i=0;i<data.output.length;i++){
                            var option = document.createElement("option");
                            option.text = data.output[i].agentName
                            option.value = data.output[i].agentID
                            options.add(option)
                        }  
                    }
                })
            })
        }
        else{
            console.log(options.value)
            const userID = options.value
            const url = '/transferUserSameQueue?interactionID=' + encodeURIComponent(interactionID) +'&userID=' +encodeURIComponent(userID)
            fetch(url).then(function(response){
                response.json().then(function(data){
                    if(data.error){
                        console.log(data.error)
                    }
                    else{
                        console.log(data.output)
                        
                    }
                })
            })
        }
    }
    if(transferAnotherQueue.checked){
        const url = '/transferAnotherQueue?interactionID=' + encodeURIComponent(interactionID) + '&queueName=' + encodeURIComponent(queueName)
        fetch(url).then(function(response){
            response.json().then(function(data){
                if(data.error){
                    console.log(data.error)
                }
                else{
                    console.log(data.output)
                    
                }
            })
        })
    }
    if(transferUserAnotherQueue.checked){
        var options = document.getElementById('userList')
        if(lastQueueName!==queueName){
            console.log("hello1")
            var userList = document.getElementById('userList')
            userList.disabled = false
            const url = '/gerAnotherQueueUserList?queueName=' + encodeURIComponent(queueName)
            fetch(url).then(function(response){
                response.json().then(function(data){
                    if(data.error){
                        console.log(data.error)
                    }
                    else{
                        var length = options.options.length
                        for(let i=length-1;i>=0;i--){
                            options.remove(options.options[i])
                        }
                        for(let i=0;i<data.output.length;i++){
                            var option = document.createElement("option");
                            option.text = data.output[i].agentName
                            option.value = data.output[i].agentID
                            options.add(option)
                        }
                        lastQueueName = queueName  
                    }
                })
            })
        }
        else if(queueName!== "" && options.value!==""){
            console.log(options.value)
            const userID = options.value
            const url = '/transferUserAnotherQueue?interactionID=' + encodeURIComponent(interactionID) +'&userID=' +encodeURIComponent(userID)+ '&queueName=' +encodeURIComponent(queueName)
            fetch(url).then(function(response){
                response.json().then(function(data){
                    if(data.error){
                        console.log(data.error)
                    }
                    else{
                        console.log(data.output)
                        
                    }
                })
            })
            console.log("heelo")
        }
        else{
            console.log(queueName)
            console.log(options.value)
        }
    }
    if(transferUser.checked){
        console.log('transferUser')
        const url = '/transferUser?interactionID=' + encodeURIComponent(interactionID) +'&userEmail=' +encodeURIComponent(userEmail)
            fetch(url).then(function(response){
                response.json().then(function(data){
                    if(data.error){
                        console.log(data.error)
                    }
                    else{
                        console.log(data.output)
                        
                    }
                })
        })
    }
})