'use strict';

var broccoli = require('broccoli');
var expect   = require('expect.js');
var fs       = require('fs');
var path     = require('path');
var walkSync = require('walk-sync-matcher');
var Filter   = require('..');

describe('broccoli-empty-files', function() {
  var fixturePath = path.join(__dirname, 'fixtures');
  var builder;

  afterEach(function() {
    if(builder) {
      return builder.cleanup();
    }
  });

  it('excludes files that are empty', function() {
    var inputPath = fixturePath;
    var node = new Filter(inputPath);

    builder = new broccoli.Builder(node);

    return builder.build().then(function(results) {
      var outputPath = results.directory;

      expect(walkSync(outputPath)).to.eql([
        'newline.txt',
        'something.txt',
        'space.txt',
        'tab.txt'
      ]);
    });
  });

  it('excludes files that are only whitespace if configured to do so', function() {
    var inputPath = fixturePath;
    var node = new Filter(inputPath, {
      ignoreWhitespace: true
    });

    builder = new broccoli.Builder(node);

    return builder.build().then(function(results) {
      var outputPath = results.directory;

      expect(walkSync(outputPath)).to.eql([
        'something.txt'
      ]);
    });
  });
});
