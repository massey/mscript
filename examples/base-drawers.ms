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
computed drawRunner {
  var depth = carcasInternal.b

  if (depth < 450) {
    return drawerRunner450
  } else if (depth < 500) {
    return drawerRunner500
  } else if (depth < 550) {
    return drawerRunner550
  } else if (depth < 600) {
    return drawerRunner600
  }
}

component base {
  A: width
  B: depth
  material: carcasMaterial

  face 5 {
    bore {
      props: {
        depth: 14
      }

      array {
        var count = Math.floor((width - 120) / 400) + 1

        for (var i = 0; i < count; i++) {
          baseCabinetFeetDrilling {
            x: 60
            y: 36
          }

          baseCabinetFeetDrilling {
            x: 60
            y: depth - whatever
          }

          component {
            product: baseCabinetFoot
            quantity: 2
          }
        }
      }
    }
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

// Drawers
array {
  drawerHeights.split(' ').forEach((h, index) => {
    component drawer {
      name: 'drawer' + index

      component drawerFace {
        A: h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer' + index + 'face'
      }

      component drawerBack {
        A: h - 2 * radius
        B: width - 2 * radius
        material: carcasMaterial
        name: 'drawer' + index + 'back'
      }

      component {
        product: drawerRunnerCode
        quantity: 2
      }
    }
  })
}
