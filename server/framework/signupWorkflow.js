// Code goes here

//company data state incomplete or complete
//company paid state trial, current, or unpaid


var SignUpWorkflow = function () {

    var currentState = new Trial(this);
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

var Trial = function (signUp) {
    this.signUp = signUp;

    this.go = function () {
        console.log('I am a trial company');
        signUp.changeState(new Current(signUp));
    };
};

var Current = function (signUp) {
    this.signUp = signUp;

    this.go = function () {
        console.log('I am a dues current company');
        signUp.changeState(new Unpaid(signUp));
    };

};

var Unpaid = function (signUp) {
    this.signUp = signUp;

    this.go = function () {
        console.log('I am a dues unpaid company');
        signUp.changeState(new Current(signUp));
    };

};

(function () {
    var signUp = new SignUpWorkflow();
    signUp.start();

}());