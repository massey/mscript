object.name = 'base drawers';
var carcasMaterial = store.get();
var width = param({
  name: 'width',
  type: 'number',
  value: 600,
  max: 1210,
  identifier: 'width'
});
object.add(width);
var depth = param({
  name: 'depth',
  type: 'number',
  value: 600,
  max: 750,
  identifier: 'depth'
});
object.add(depth);
var benchtopHeight = param({
  name: 'benchtopHeight',
  type: 'number',
  value: 1000,
  identifier: 'benchtopHeight'
});
object.add(benchtopHeight);
var benchtopMaterial = param({
  name: 'benchtopMaterial',
  type: 'object',
  source: $materials,
  identifier: 'benchtopMaterial'
})
object.add(benchtopMaterial)
var kickHeight = param({
  name: 'kickHeight',
  type: 'number',
  value: 100,
  identifier: 'kickHeight'
})
object.add(kickHeight)
var drawerHeights = param({
  name: 'drawerHeights',
  type: 'string',
  value: '300 300',
  identifier: 'drawerHeights'
})
object.add(drawerHeights);

var base = component({
  name: 'base',
  A: () => width.get(),
  B: () => depth.get(),
  material: carcasMaterial
})
object.add(base)

var benchtop = component({
  name: 'benchtop',
  A: () => width.get(),
  B: () => depth.get(),
  material: () => benchtopMaterial.get()
})
object.add(benchtop)

var benchtopGroup = group({
  name: 'benchtops',
  members: [benchtop]
})
object.add(benchtopGroup)

var carcasInternal = box({
  a: () => width.get() - left.thickness - right.thickness,
  b: () => depth.get() - faces.b,
  c: () => benchtopHeight.get() - benchtop.thickness - kickHeight.get() - base.thickness
})

function drawerRunnerCode () {
  var depth = carcasInternal.b

  if (depth < 450) {
    return 'code450'
  } else if (depth < 500) {
    return 'code500'
  } else if (depth < 550) {
    return 'code550'
  }
}

object.add(
  function () {
    var arr = []

    drawerHeights.get().split(' ').forEach((h, index) => {
      var drawer = component({
        name: 'drawer ' + index
      })
      arr.push(drawer);

      (function () {
        var face = component({
          A: +h - 2 * radius,
          B: () => width.get() - 2 * radius,
          material: carcasMaterial,
          name: 'drawer ' + index + ' face'
        })
        drawer.add(face)

        var back = component({
          A: +h - 2 * radius,
          B: () => width.get() - 2 * radius,
          material: carcasMaterial,
          name: 'drawer ' + index + ' back'
        })
        drawer.add(back);

        drawer.add(component({
          product: () => drawerRunnerCode(),
          quantity: 2
        }))
      })()
    })

    return arr
  }
)
