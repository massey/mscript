var drawer = component({
  name: 'drawer'
})

object.add(drawer);

(function () {
  var front = component({
    A: width,
    B: depth,
    name: 'drawerFace'
  })
  drawer.add(front)
})()
