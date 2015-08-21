'use strict';

var CachingWriter = require('broccoli-caching-writer');
var fs            = require('fs');
var path          = require('path');
var symlinkOrCopy = require('symlink-or-copy');
var walkSync      = require('walk-sync');

function RemoveEmptyFiles(inputNode, options) {
  CachingWriter.call(this, inputNode, options);

  this.options = this.options || options || {};
  this.options.ignoreWhitespace = this.options.ignoreWhitespace || false;
}

RemoveEmptyFiles.prototype = Object.create(CachingWriter.prototype);

RemoveEmptyFiles.prototype.updateCache = function(srcPaths, destDir) {
  var ignoreWhitespace = this.options.ignoreWhitespace;

  return srcPaths.map(function(srcPath) {
    return walkSync(srcPath).map(function(relativePath) {
      var fullPath = path.join(srcPath, relativePath);
      var destPath = path.join(destDir, relativePath);
      var srcStats = fs.statSync(fullPath);

      if(srcStats.isFile()) {
        var contentBuffer = fs.readFileSync(fullPath);

        if(contentBuffer && contentBuffer.length) {
          if(!ignoreWhitespace || (ignoreWhitespace && contentBuffer.toString().trim())) {
            symlinkOrCopy.sync(fullPath, destPath);
          }
        }
      }
    });
  });
};

module.exports = RemoveEmptyFiles;
