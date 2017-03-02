'use strict'

var existsLink = require('..')
var should = require('should')

describe('exists link ::', function () {
  context('sync ::', function () {
    it('when link exists', function () {
      return existsLink.sync('./node_modules/nyc').should.be.equal(true)
    })
    it('link doesnt exist', function () {
      return existsLink.sync('./lol').should.be.equal(false)
    })
    it('should throw error when stat is not a link', function () {
      try {
        existsLink.sync('./README.md')
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('stat is not symbolic link')
      }
    })
    it('should throw an error when linkname is false', function () {
      try {
        existsLink.sync(false)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    it('should throw an error when linkname is true', function () {
      try {
        existsLink.sync(true)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    it('should throw an error when linkname is object', function () {
      try {
        existsLink.sync({})
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    return it('should throw an error when linkname is number', function () {
      try {
        existsLink.sync(12)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
  })
  return context('async ::', function () {
    it('when link exists', function () {
      return existsLink('./node_modules/nyc')
        .then(exists => {
          exists.should.be.equal(true)
        })
    })
    it('when link doesnt exist', function () {
      return existsLink('./lol')
        .then(exists => {
          exists.should.be.equal(false)
        })
    })
    it('should throw an error when linkname is false', function () {
      try {
        existsLink(false)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    it('should throw an error when linkname is true', function () {
      try {
        existsLink(true)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    it('should throw an error when linkname is object', function () {
      try {
        existsLink({})
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
    return it('should throw an error when linkname is number', function () {
      try {
        existsLink(12)
        should.fail('no error was thrown')
      } catch (err) {
        err.message.should.be.equal('path must be a string')
      }
    })
  })
})
