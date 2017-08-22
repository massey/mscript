meta {
    name: 'Tall Bookshelf'
    description: 'Tall Single Bay Bookshelf'
}

param width {
    type: 'number'
    value: 600
    max: 700
}

param depth {
    type: 'number'
    value: 320
}

param height {
    type: 'number'
    value: 2000
}

param kickHeight {
    type: 'number'
    value: 100
}

param shelfCount {
    type: 'number'
    value: 4
}

param shelfInternalHeights {
  type: 'string'
}

// Some geometry blocks
block sliderHoles {
  geometry {
    circle {
      D: 5
      X: 0
      Y: 0
    }

    circle {
      D: 5
      X: 0
      Y: 32
    }
  }
}

component right {
  A: height
  B: depth
  material: '01.002'
}

component left {
    mirror: 'right'
    i: 0
    j: 1
}

component top {
    A: width - left.thickness - right.thickness
    B: depth - 1.5
    material: '01.002'
}

component bottom {
    A: width - left.thickness - right.thickness
    B: depth - 1.5
    material: '01.002'
}

component kickPlate {
  A: bottom.A
  B: bottom.B
  material: '01.002'
}

component back {
    A: height - kickHeight - top.thickness - bottom.thickness
    B: width - left.thickness - right.thickness
    material: '01.002'
}


// Shelves
component {
  array {
    shelfCount => {
      for (var i = 0; i < shelfCount; i++) {
        component {
          A: width - left.thickness - right.thickness
          B: depth - back.thickness - 1.5
          material: '01.002'
          name: 'shelf ' + (i + 1)

          component {
            code: '2.44'
            quantity: 4
          }

          component {
            code: '2.11'
            quantity: 4
          }
        }
      }
    }
  }
}

right {
  face 0 {
    machine bore {
      array {
        shelves => {
          for (var i = 1; i < shelves; i++) {
            translate {
              x: kickHeight + bottom.thickness

              sliderHoles {
                x: (internalHeight / (shelves + 1)) * i
                y: 44
              }

              sliderHoles {
                x: (internalHeight / (shelves + 1)) * i
                y: depth - back.thickness - 76
              }
            }
          }
        }
      }
    }
  }
}

// TODO
component shelf {
    A: bottom.A
    B: bottom.B
    material: '01.002'
    array: shelves
    name: 'shelf ' + i
}
