'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _index = require('./routes/index.js');

var _index2 = _interopRequireDefault(_index);

var _atlasConnect = require('./atlasConnect.js');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _Util = require('./Util.mjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ path: './config/config.env' });

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_express2.default.json());
(0, _atlasConnect.mongooseConnect)();
var thing = _Util.__dirname;
var dir = (0, _url.fileURLToPath)(thing).replace('\\server.js', '');
app.use(_express2.default.static(_path2.default.join(dir, 'client', 'build')));

//routes to our app
app.get('/', function (req, res) {
    console.log(dir);
    res.send('/ is running just fine');
});

(0, _index2.default)(app);

app.listen(process.env.PORT, function () {
    console.log('Server is running on port: ' + process.env.PORT);
});
