var expect = require('expect.js'),
    sinon = require('sinon'),
    url = require('../../helpers/url');

describe('url', function() {
  describe('forEachHref', function() {
    it('calls cb with the value of each href/src in an html text', function() {
      var spy = sinon.spy(),
          text = '<a href="www.foo.com/"><a>';

      url.forEachHref(text, spy);
      expect(spy.called).to.be(true);
      expect(spy.calledWith('www.foo.com/')).to.be(true);
    });
  });

  describe('getBaseTagValue', function() {
    it('returns the value of the href property of the <base> tag', function() {
      var text = '<base href="www.foo.com/"></base>';
      expect(url.getBaseTagValue(text)).to.be('www.foo.com/');
    });

    it('returns null if the base tag is not used in the supplied html text', function() {
      expect(url.getBaseTagValue('')).to.be(null);
    });
  });

  describe('isSkippedPath', function() {
    it('return true if the given url matches one of the skipped paths', function() {
      expect(url.isSkippedPath('')).to.be(true);
      expect(url.isSkippedPath('/')).to.be(true);
      expect(url.isSkippedPath('#')).to.be(true);
      expect(url.isSkippedPath('//')).to.be(false);
      expect(url.isSkippedPath('//foo.com')).to.be(false);
    });
  });

  describe('decode', function() {
    it('decodes a url and its embedded html entities (#31)', function() {
      var encoded = 'http://ubuntuforums.org/showthread.php%3Ft%3D684264%26amp;page%3D6';
      var expected = 'http://ubuntuforums.org/showthread.php?t=684264&page=6';
      expect(url.decode(encoded)).to.be(expected);
    });
  });
});