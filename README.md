Sparrow Rework
==============

I laid out more ore less what I think the structure should be for a DTS base library. 
This is up for anyone to improve, complete, etc. This builds a lot on Promises, and you
can see a poor demo in [index.html](https://capitains.github.io/sparrow-2).

Things that are not dealt with and should be:

* There is no dealing with route specific to one document or one collection
* HTTP Headers are not used, Document should have the ability to retrieve next, prev and so on.
* Mimetype is there but not used.
* No dealing with JSON-LD really. Maybe use a library to deal with these things ?

What should be improved:

* Tests
* Typing ? I have not touched at JS for a long time...

