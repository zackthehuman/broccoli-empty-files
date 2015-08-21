# broccoli-empty-files

[![Build Status](https://travis-ci.org/zackthehuman/broccoli-empty-files.svg?branch=master)](https://travis-ci.org/zackthehuman/broccoli-empty-files)

Remove empty or whitespace-only files from a tree.

## Installation

```bash
npm install --save-dev broccoli-empty-files
```

## Usage

```js
var removeEmpty = require('broccoli-empty-files');

var noEmptyFiles = removeEmpty(inputNode);
var noEmptyOrWhitespaceFiles = removeEmpty(inputNode, { ignoreWhitespace: true });
```

### Options

* `ignoreWhitespace`: A boolean indicating whether to filter out files which
  contain only whitespace. Defaults to `false`.
