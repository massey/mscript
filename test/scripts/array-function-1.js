var number = param({
  type: 'number',
  value: 5,
  name: 'number',
  identifier: 'number'
});

object.add(number);

var width = param({
  type: 'number',
  value: 500,
  name: 'width',
  identifier: 'width'
});

object.add(width);

object.add(function () {
  var arr = []


  for (var i = 0; i < number.get(); i++) {
    var drawer = component({
      name: 'drawer'
    });

    arr.push(drawer);

    (function () {
      var front = component({
        A: () => width.get(),
        B: 18
      })
      drawer.add(front)

      var side = component({
        A: depth,
        B: 18
      });
      drawer.add(side);
    })();
  }

  return arr
})
