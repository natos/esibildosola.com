+++
title = "Angular Switchery"
description = "I built a little directive with two-way binding support for Switchery."
tags = [ "components", "javascript", "angularjs"]
date = "2016-02-27"
categories = [
  "JavaScript",
  "AngularJS"
]
slug = "angular-switchery"
+++

[Alexander](https://github.com/abpetkov) built this beautiful checkbox component called [Switchery](http://abpetkov.github.io/switchery/). From their website: "Switchery is a simple component that helps you turn your default HTML checkbox inputs into beautiful iOS 7 style switches in just few simple steps. You can easily customize switches, so that they match your design perfectly."

I've used it along different projects, I'm really happy with it. But when I tried to included in a project using AngularJS, I found a few challenges. Although there are a few wrappers around, like [NgSwitchery](https://github.com/servergrove/NgSwitchery), but non of them was offering support for Angular two-way binding. So I went for it and built a new directive. Here's [Angular Switchery](http://natos.github.io/angular-switchery/), you can find the code and install instructions in [Github](https://github.com/natos/angular-switchery).

Check the demo:

{{< jsfiddle natos s2bkr5g9 >}}

I hope you find this useful :)