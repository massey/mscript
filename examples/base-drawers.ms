meta {
    name: 'Base drawers'
    description: 'Base cabinet drawers'
}

//
// Products
//
product carcasMaterial {
  code: '01.002'
}

product baseCabinetFoot {
  code: '3.4'
}

//
// Blocks
//
block {
  name: 'baseCabinetFeetDrilling'
}

param width {
    type: 'number'
    value: 600
    max: 1210
}

param depth {
    type: 'number'
    value: 600
    max: 750
}

param height {
    type: 'number'
    value: 2000
}

param kickHeight {
    type: 'number'
    value: 100
}

param drawerHeights {
  type: 'string'
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
// Computed params
//
computed drawRunnerCode {
  var depth = carcasInternal.b

  if (depth < 450) {
    return 'code450'
  } else if (depth < 500) {
    return 'code500'
  } else if (depth < 550) {
    return 'code550'
  }
}

translate {
  y: 100

  component base {
    A: width
    B: depth
    material: carcasMaterial
  }
}

component right {
  A: carcasInternal.c
  B: carcasInternal.b
  material: carcasMaterial

  face 0 {
    bore {
      props: {
        depth: 14
      }

      array {
        var current = 28

        drawerHeights.split(' ').forEach(h => {
          circle {
            d: 5
            x: current
            y: 37
          }

          circle {
            d: 5
            x: current
            y: 59
          }

          circle {
            d: 5
            x: current
            y: 256
          }

          circle {
            d: 5
            x: current
            y: 350
            on: carcasInternal.b > 450
          }

          current += +h
        })
      }
    }
  }
}

component left {
  mirror: right
  i: 0
  j: 1
}

component drawers {
  array {
    drawerHeights.split(' ').forEach((h, index) => {
      component {
        A: h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer' + num + 'face'
      }

      component {
        A: h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer' + num + 'back'
      }

      component {
        code: drawerRunnerCode
        quantity: 2
      }
    })
  }
}
