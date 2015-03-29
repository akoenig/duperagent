# duperagent [![Build Status](https://travis-ci.org/akoenig/duperagent.svg?branch=master)](https://travis-ci.org/akoenig/duperagent)

Personal convenience wrapper around [superagent](https://github.com/visionmedia/superagent).

## Installation

```
npm install --save duperagent
```

## API

### get(url [, options], callback)

```js
var duperagent = require('duperagent')();

duperagent.get('http://api.host.tld/v1/search.json', function onResponse (err, result) {
    if (err) {
        return console.error(err.message);
    }

    console.log(result);
});
```

### post(url [, options], callback)

```js
duperagent.post('http://api.host.tld/v1/insert.json', {body: {foo: 'bar'}}, function onResponse (err) {
    if (err) {
        return console.error(err.message);
    }

    console.log(result);
})
```

### put(url [, options], callback)

```js
duperagent.put('http://api.host.tld/v1/update.json', {body: {foo: 'zoo'}}, function onResponse (err) {
    if (err) {
        return console.error(err.message);
    }

    console.log(result);
})
```

### del(url [, options], callback)

```js
duperagent.del('http://api.host.tld/v1/delete.json', {query: {id: 1}, function onResponse (err) {
    if (err) {
        return console.error(err.message);
    }

    console.log(result);
})
```

## Author

Copyright 2015, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)
