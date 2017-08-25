var number = param({
  type: 'number',
  value: 5,
  identifier: 'number'
});

object.add(number);

var width = param({
  type: 'number',
  value: 500,
  identifier: 'width'
});

object.add(width)

var depth = param({
  type: 'number',
  value: 200,
  identifier: 'depth'
});

object.add(depth);

object.add(
  function () {
    var arr = []

    for (var i = 0; i < number.get(); i++) {
      var front = component({
        A: () => width.get(),
        B: 18
      })
      arr.push(front)

      var side = component({
        A: () => depth.get(),
        B: 18
      })
      arr.push(side)
    }

    return arr
  }
)
