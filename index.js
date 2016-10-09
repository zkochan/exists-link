'use strict'

var fs = require('fs')
var promise = require('cb2promise')

function isString (str) {
  return typeof str === 'string'
}

function existsLink (filepath, cb) {
  if (!isString(filepath)) throw new TypeError('path must be a string')
  if (!cb) return promise(existsLink, filepath)

  fs.lstat(filepath, function (err, stat) {
    if (!err) {
      try {
        const isSymLink = statIsSymbolicLink(stat)
        return cb(null, isSymLink)
      } catch (err) {
        return cb(err)
      }
    }
    if (err.code === 'ENOENT') return cb(null, false)
    cb(err)
  })
}

existsLink.sync = function existsLinkSync (filepath) {
  if (!isString(filepath)) throw new TypeError('path must be a string')
  try {
    const stat = fs.lstatSync(filepath)
    return statIsSymbolicLink(stat)
  } catch (err) {
    if (err.code === 'ENOENT') return false
    throw err
  }
}

function statIsSymbolicLink (stat) {
  if (stat.isSymbolicLink()) {
    return true
  }
  throw new Error('stat is not symbolic link')
}

module.exports = existsLink
