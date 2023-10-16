const express =  require('express');
require('dotenv').config();
const responseTime = require('response-time');
const logger = require('./helpers/logger');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const cors = require('cors');

logger.info('App launching...');
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`Timezone: ${process.env.TZ}`);
logger.info(`MYS_RESOURCES_PATH: ${process.env.MYS_RESOURCES_PATH}`);

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(
    responseTime((req, res, time) => {
        // Ignore health check
        //if(req.originalUrl !== '/ping'){
            logger.info(
                `${req.method} ${req.originalUrl} ${time} ms = ${(time / 1000).toFixed(4)} seconds`
            );
        //}
    }),
);

const logRequest = (req, res, next) => {

    // Ignore health check
    //if(req.originalUrl !== '/ping'){
        logger.info(
            `[${req.ip}] ${req.method} ${req.originalUrl} ${req.headers['user-agent']}`
        );
    //}
    next();

};

app.use(logRequest);

app.get('/ping', (req, res) => {
    res.status(200).json({ ping: 'pong' });
});



const getStatus = (req, res, next) => {
    try{
        let app_version = '';
        let git_commit_id = '';

        fs.readFile('app_version.json', 'utf8', (err, data) => {
            if (err) {
                logger.error(err);
                return;
            }
            app_version_file = JSON.parse(data);
            app_version = app_version_file['app_version'];
            git_commit_id = app_version_file['git_commit_id'];

            const message = {
                status: 'ready',
                app_version,
                git_commit_id
            };
    
            logger.debug(`getStatus - message: ${JSON.stringify(message)}`);
            return res.status(200).json(message);
        });
        
        
    } catch(error){
        logger.error(`getStatus - catch error: ${JSON.stringify(error)}`);
        return next(error);
    }
}

app.route('/api2/status').get(getStatus);


app.get('/api2/resources/files', (req, res) => {

    const directoryPath = process.env.MYS_RESOURCES_PATH;

    const mysResources = [];

    fs.readdir(directoryPath, function (err, files) {

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        
        files.forEach(function (file) {
            if(path.extname(file) === ".yaml"){
                logger.info("getResourceFiles: " + file); 
                mysResources.push(file);
            }
        });

        res.status(200).json(mysResources);
    
    });
    
});

app.post('/api2/resources/upload', (req, res) => {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        if(files !== null && files.resource_file[0].filepath !== null){
            var oldpath = files.resource_file[0].filepath;
            var newpath = process.env.MYS_RESOURCES_PATH + "/" + files.resource_file[0].originalFilename;
            
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
              logger.info("File uploaded successfully to : " + newpath);
              res.contentType('text/plain');
              res.write('File uploaded : ' + files.resource_file[0].originalFilename);
              res.end();
            });
        }

    });
});


app.listen(port);
console.log('Faker MYS API Server started at http://localhost:' + port);