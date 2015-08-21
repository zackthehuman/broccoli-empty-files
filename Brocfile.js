var removeEmptyFiles = require('./index');

var src = 'src';

module.exports = new removeEmptyFiles(src, { ignoreWhitespace : true });
