// Code goes here

//company data state incomplete or complete
//company paid state trial, current, or unpaid
var postal = require('postal');

var SignUpWorkFlow = {};


SignUpWorkFlow.engine = function (companyId, CurrentState) {

    var currentState = new CurrentState(this);
    var count = 0;

    this.changeState = function (state) {
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
};

SignUpWorkFlow.StateTrial = function (signUp) {
    this.signUp = signUp;
    postal.publish({
        channel: "paidStatus",
        topic: "trial",
        data: {paidStatus: "Current State = Trial"}
    });
    // 
    this.go = function () {
        console.log('I am moving from a trial company to a paid company');
        signUp.changeState(new SignUpWorkFlow.StateCurrent(signUp));
    };
};

SignUpWorkFlow.StateCurrent = function (signUp) {
    this.signUp = signUp;
    postal.publish({
        channel: "paidStatus",
        topic: "current",
        data: {paidStatus: "Current State = Current"}
    });
    this.go = function () {
        console.log('I am moving to a dues unpaid company');
        signUp.changeState(new SignUpWorkFlow.StateUnpaid(signUp));
    };

};

SignUpWorkFlow.StateUnpaid = function (signUp) {
    this.signUp = signUp;
    postal.publish({
        channel: "paidStatus",
        topic: "unpaid",
        data: {paidStatus: "Current State = Unpaid"}
    });
    // Thing that need to happen to go to next state
    // Successfully run a credit card
    this.go = function () {
        console.log('I am moving to a dues current company');
        signUp.changeState(new SignUpWorkFlow.StateCurrent(signUp));
    };

};

module.exports = SignUpWorkFlow;

