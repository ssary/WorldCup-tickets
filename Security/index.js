const express = require('express');
const easyWaf = require('easy-waf');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 24 hrs in milliseconds
  max: 3,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();

//If EasyWaf should check the request body, express body parser middlewares must be added before EasyWaf.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use(rateLimiter);

var ipBlacklist =['1.1.1.1', '2.2.2.2']
app.use(easyWaf({
    dryMode: true, //Suspicious requests are only logged and not blocked
    allowedHTTPMethods: ['GET','POST'],
    ipBlacklist: ipBlacklist,
    ipWhitelist: ['::1','172.16.0.0/12'],
    queryUrlWhitelist: ['github.com'],
    modules: {
        directoryTraversal: {
            enabled: true,
            excludePaths: /^\/exclude\/$/i
        },
    }
}));

app.get('/get', function(req, res){
    var ip = req.ip
    console.log([{ip}])
    res.status(200).send();
});
app.post('/', function(req, res){
    res.status(200).send();
});
app.put('/', function(req, res){
    res.status(200).send();
});

app.listen(3000, () => console.log(`Server listening on port 3000`))