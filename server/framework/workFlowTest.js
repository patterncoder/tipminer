var workflow = require('./signupWorkflow');
var postal = require('postal');

(function () {
    // changing the parameter of new SignupWorkFlow starts the WF at the passed in state
    // logging in a user could refresh the workflow and 
    postal.subscribe({
        channel: "paidStatus",
        topic: "*",
        callback: function(data, envelope){
            console.log(data.paidStatus);
        }
    });
    
    var signUp = new workflow.engine(1, workflow.StateTrial);
    signUp.start();

}());