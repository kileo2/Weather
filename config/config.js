var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {      name: 'weather'    },
        port: 5000

    },  //stop here
    test: {
        root: rootPath,
        app: {      name: 'weather'    },
        port: 2000


    }
};

module.exports = config[env];