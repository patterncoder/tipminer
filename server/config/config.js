var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath
        ,db: 'mongodb://localhost/tipminer'
        ,port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath
        ,db: 'mongodb://patterncoder:y5EQJ5m7C3@ds030607.mongolab.com:30607/tipminer'
        ,port: process.env.PORT || 80

    }


}