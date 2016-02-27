+++
title = "Currying with JavaScript"
description = "I found currying while exploring new patterns."
tags = [ "patterns", "javascript", "currying"]
date = "2013-05-22"
categories = [
  "JavaScript"
]
slug = "curriyng-with-javascript"
+++

"In mathematics and computer science, **currying** is the technique of transforming a function that takes multiple arguments." [Wikipedia](http://en.wikipedia.org/wiki/Currying).

I spend good part of the day writing JavaScript and It's all about creating usable interfaces to share code with other people, exposing an understandable API, so they can learn it and build faster. Currying could help in some cases to improve how we implement certain solutions, and it's algo quite pattern fun to use.

I wanted to share a simple example of how to apply curry pattern in JavaScript, it may be handy some times to improve component's interfaces or just for lazy processing stuff, so here a [simple function to add numbers](https://gist.github.com/natos/5626328#file-currying_example-js) and accumulate the result:

{{< jsfiddle natos PfyYw >}}

I hope you find this useful :)