const path = require('path');
(function() {
  "use strict";
  let express = require("express");
  let application = express();
  let dirPath =  path.join(__dirname, '../../', 'build');
  application.use(express.static(dirPath));
  application.get("/", (req, res) => {
    res.sendFile(path.join(dirPath, 'build/index.html'));
  });

  application.listen(9999);

//   let server = application.listen(9999, function() {
//     console.log("express server listening on port " + server.address().port);
//   });

  module.exports = application;
})();
