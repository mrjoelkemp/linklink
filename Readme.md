### Linklink

> Deep link to any section of (almost) any webpage

*This is still a work in progress.* [Pull requests](https://github.com/mrjoelkemp/linklink/issues) welcome.

### Motivation

Traditionally, you could only link to an entire webpage, or anchor links within a webpage (www.foo.com/#my-sweet-section).
If a section of a page didn't have an anchor link, you were out luck in linking to that part. We've all had to tell our friends
to scroll to this part of the page or do a "find all" for a keyword.

I built [Linklink](http://linklink.herokuapp.com/) to solve that problem by letting you link to any part of a webpage.

### How does it work?

1. Go to [Linklink](http://linklink.herokuapp.com/)
2. Enter [almost](#website-exceptions) any website (See the [exceptions](#website-exceptions))
3. Click on the region you'd like to link to
4. Share the generated url

### Website Exceptions

##### Https

Sites that render pages in `https` are problematic. Linklink will automatically replace `https` with `http`,
however, that's not a guaranteed fix.

##### Login-required sites

If a page you're linking to requires a login (like part of your facebook wall), it's not happening.


See the [issues section](https://github.com/mrjoelkemp/linklink/issues) for possibly more.

### License

MIT