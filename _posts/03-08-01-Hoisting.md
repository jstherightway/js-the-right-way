---
title: Hoisting
isChild: true
---

### Hoisting

Every Javascript developer should be aware of the Hoisting concept, which can potentially produce side-effects if ignored. Hoisting is about how Javascript deals with scoping for var declarations.

Basically, Hoisting comes down to 2 rules:

1) In Javascript, functions are our "de facto" scope delimiters, which means that usual blocks from loops and conditionals (such as if, for, while, switch and try) DO NOT delimit scope, unlike most other languages. Therefore, those blocks will be scoped within the first ancestral function which contains that block.

This way, you SHOULD NOT declare vars within a block, but in the function itself.

2) On runtime, all var declarations are moved to the beggining of each function (its scope). Having said so, it is a good practice to declare all the vars altogheter on the first line, in order to avoid false expectations with a var that got declared late but happened to hold a value before. This is a common problem for programmers coming from languages with block scope, which usually declare their vars when they are about to make its first use.

For instance, please try out the following function:

{% highlight javascript %}
function stepSum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    var parameter = arguments[i];
    if (typeof(parameter) !== 'number') {
      parameter = parseInt(parameter);
    }
    setTimeout(function() {
      if (!isNaN(parameter)) {
        total += parameter;
        console.log(i + ") adding " + parameter + ", total is now " + total);
      }
    }, i*1000);
  }
  return "the stepSum has been triggered...";
}
{% endhighlight %}

The function stepSum() above will get any number of parameters and sum them up, properly converting each parameter to number or ignoring it otherwise. There is a requirement where this function must trigger the sum to happen step-by-step on console.log, so that the user would see the steps of the sum each second as well the counting of the steps.

So, if you happen to try:

{% highlight javascript %}
stepSum(3, 2, 1)
{% endhighlight %}

You would get as response:

* 3) adding 1, total is now 1
* 3) adding 1, total is now 2
* 3) adding 1, total is now 3

Why did it happen? Please notice that it seemed to sum just the last parameter for three times. And also the step count is always on 3, where we would expect to see 1, 2 and 3. What is wrong here?

The answer is that due to hoisting, the **parameter** var got pushed to the beggining of the **stepSum** function, making it available for the whole function. More than that, **parameter** is only being defined once, and then it is being re-assigned on each iteration of the for loop.

Given we are using **setTimeout** calls here, we can expect now that when this function executes for the first time (after a second), **parameter** has now the value of its last assignment, which is from the last iteration of the for loop, when **parameter** was set to 1.

How can we fix it? Just by making good usage of hoisting, like this:

{% highlight javascript %}
function stepSum() {
  var parameter, printStep,
      total = 0,
      i = 0;

  // Printstep function
  printStep = function(parameter, step) {
    step++;
    setTimeout(function() {
      if (!isNaN(parameter)) {
        total += parameter;
        console.log(step + ") adding " + parameter + ", total is now " + total);
      }
    }, step * 1000);
  };

  // Iterating
  for (i = 0; i < arguments.length; i++) {
    parameter = arguments[i];
    if (typeof(parameter) !== 'number') {
      parameter = parseInt(parameter);
    }
    printStep(parameter, i);
  }
  return "the stepSum has been triggered...";
}
{% endhighlight %}

Here the **setTimeout** call was extracted to another function, **printStep**, which has its own scope. Going forward, the vars **parameter** and **i** are now declared on the beggining of the **stepSum** function, as well the declaration of **printStep** function.

Now we got:

* 1) adding 3, total now is 3
* 2) adding 2, total now is 5
* 3) adding 1, total now is 6

For more info, please read [JavaScript Scoping and Hoisting][1] and [JSLint - scope][2]

[1]: http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
[2]: http://www.jslint.com/lint.html#scope