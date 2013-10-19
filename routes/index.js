/*
 * Request routing and data handling.
 */
var merge = require('merge'),
    fs = require('fs');

// Returns a camel cased version of input
var camelCase = function camelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
};

// Router function that gets exported to the main(app.js) loop.
exports.router = function(req, res, next){
  // Strip leading slashes, .stuff's and lower casing the string.
  var cleanReq = req.url.replace(/^\/|\.html|\.jade|\.php/gi, '').toLowerCase();
  
  // If the remaining request is empty, assume index.
  if (cleanReq === '') {cleanReq = 'index';}

  // Check if we have a jade file by the name of the request url.
  fs.exists(__dirname + '/../views/' + cleanReq + '.jade', function(e) {
    // If jade file exist render it with proper data.
    if (e) {
      // Collect all data related to the request; handled by the dataRouter.
      var reqData = dataRouter(cleanReq);

      // Render the requested page with proper data.
      res.render(cleanReq, reqData);
    }
    // Else pass the request.
    else {
      next();
    }
  });
};

// Data routing function.
var dataRouter = function dataRouter(page) {
  // Set pageName to the actual jade page requested, camelCased
  var pageArray = page.split('/'),
  pageName = camelCase(pageArray[pageArray.length - 1]),
  // Fetch most recent siteData
  siteData = fetchJSON(__dirname + '/../data/siteData.json'),
  // Merge the global and page data together.
  pageData = merge(siteData.globalData, siteData.pageData[page]);
  // Set the pageName variable to activeClass. Can be used for classes
  pageData[pageName] = pageData.activeClass;

  // Return the processed pageData
  return pageData;
};

// Fetch JSON data function
var fetchJSON = function fetchJSON(file) {
  var raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
};
