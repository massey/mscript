meta {
    name: 'base drawers'
}

//
// Products
//
// In production, the following variables would be generated from tags.
var carcasMaterial = store.get()

//
// Params
//

param width {
  name: 'width'
  type: 'number'
  value: 600
  max: 1210
}

param depth {
  name: 'depth'
  type: 'number'
  value: 600
  max: 750
}

param benchtopHeight {
  name: 'benchtopHeight'
  type: 'number'
  value: 1000
}

param benchtopMaterial {
  name: 'benchtopMaterial'
  type: 'object'
  source: $materials
}

param kickHeight {
  name: 'kickHeight'
  type: 'number'
  value: 100
}

param drawerHeights {
  name: 'drawerHeights'
  type: 'string'
  value: '300 300'
}

component base {
  name: 'base'
  A: width
  B: depth
  material: carcasMaterial
}

component benchtop {
  name: 'benchtop'
  A: width
  B: depth
  material: benchtopMaterial
}

group benchtopGroup {
  name: 'benchtops'
  members: [benchtop]
}

//
// Helper geometry
//

box carcasInternal {
  a: width - left.thickness - right.thickness
  b: depth - faces.b
  c: benchtopHeight - benchtop.thickness - kickHeight - base.thickness
}

//
// Computed
//
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

array {
  drawerHeights.split(' ').forEach((h, index) => {
    component drawer {
      name: 'drawer ' + index

      component face {
        A: +h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer ' + index + ' face'
      }

      component back {
        A: +h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer ' + index + ' back'
      }

      component {
        product: drawerRunnerCode()
        quantity: 2
      }
    }
  })
}
