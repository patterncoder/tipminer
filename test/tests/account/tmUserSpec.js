describe('tmUser', function(){

    beforeEach(module('app'));

    describe('isAdmin', function(){
        it('should return false if the roles array does not have an admin entry', inject(function(tmUser){
            var user = new tmUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.false;  //falsey and truthy seem to interchange with false and true
        }));
        it('should return true if the roles array does have an admin entry', inject(function(tmUser){
            var user = new tmUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }))
    })

})