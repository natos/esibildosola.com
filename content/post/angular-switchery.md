+++
title = "Marcela Viola"
description = "I built a little directive with two-way binding support for Switchery."
tags = [ "components", "javascript", "angularjs"]
date = "2016-02-27"
categories = [
  "JavaScript",
  "AngularJS"
]
slug = "angular-switchery"
+++

![Switchery](/assets/images/angular-switchery/switchery.png)

[Alexander](https://github.com/abpetkov) built this beautiful checkbox component called [Switchery](http://abpetkov.github.io/switchery/). From their website: "Switchery is a simple component that helps you turn your default HTML checkbox inputs into beautiful iOS 7 style switches in just few simple steps. You can easily customize switches, so that they match your design perfectly."

![Spaaza Screenshot](/assets/images/angular-switchery/spaaza.png)

I've used it along different projects, I'm really happy with it. But when I tried to included in a project using AngularJS, I found a few challenges. Although there are a few directives around (like [NgSwitchery](https://github.com/servergrove/NgSwitchery)), I couldn't find one with support for two-way binding, I needed to keep my models updated. So I went for it and built a new directive.

![Spaaza Screenshot](/assets/images/angular-switchery/console.png)

Here's [Angular Switchery](http://natos.github.io/angular-switchery/), [a directive](https://docs.angularjs.org/guide/directive) that transform a simple checkbox into a switch that, and supports bindings to scope variables, to keep view and data in sync. You'll find the code and install instructions in [Github](https://github.com/natos/angular-switchery).

Run this JSFiddle to see it working or [check the demo](http://natos.github.io/angular-switchery/)

{{< jsfiddle natos s2bkr5g9 >}}

I hope you find this useful :)