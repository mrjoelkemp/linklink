var expect = require('expect.js'),
    str = require('../../helpers/string');

describe('string', function() {
  describe('regexEscape', function() {
    it('escapes special regex characters from the passed string', function() {
      expect(str.regexEscape('.')).to.be('\\.');
    });
  });

  describe('hasTrailingSlash', function() {
    it('returns whether or not the string ends with a forward slash', function() {
      expect(str.hasTrailingSlash('www.foo.com/')).to.be(true);
      expect(str.hasTrailingSlash('www.foo.com')).to.be(false);
    });
  });

  describe('hasLeadingSlash', function() {
    it('returns whether or not the string begins with a forward slash', function() {
      expect(str.hasLeadingSlash('/javascripts/foo.js')).to.be(true);
      expect(str.hasLeadingSlash('javascripts/foo.js')).to.be(false);
    });
  });

  describe('slashJoin', function() {
    it('joins two strings by at most one forward slash', function() {
      expect(str.slashJoin('www.foo.com', 'javascripts/foo.js')).to.be('www.foo.com/javascripts/foo.js');
      expect(str.slashJoin('foo.com/', '/foo.js')).to.be('foo.com/foo.js');
      // Currently does not work if host or path have more than one leading or trailing slash
    });
  });
});