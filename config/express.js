var express = require('express');
// router = express.router();
var glob = require('glob');
var bodyParser = require('body-parser');



module.exports=function(app,config){

    app.use(bodyParser.json({limit:'100mb'}));
    app.use(bodyParser.urlencoded({limit:'1000mb',extended:true}));
    //loads controller files:
    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function(controller){
        require(controller)(app,config);
    });

    if(process.env.NODE_ENV !== 'test'){

        app.use(function(req,res,next){
            console.log('Request from'+req.connection.remoteAddress);
            next();
        });

    }



    app.use(express.static(config.root+'/public'));

    app.use(function(req,res){
        res.type('text/plan');
        res.status(404);
        res.send('404 Not found');
    });

    app.use(function(err,req,res,next){
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Server error');
    });

    console.log('Starting application');
};