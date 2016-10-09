var existsLink = require('.')

// async with a callback
existsLink('./node_modules/nyc', console.log)

// async with a promise
existsLink('./node_modules/nyc').then(console.log).catch(console.error)

// sync
var exists = existsLink.sync('./node_modules/nyc')
console.log(exists)
