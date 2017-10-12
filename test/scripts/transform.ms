param width {
  type: 'number'
  value: 1000
  name: 'width'
}

param depth {
  type: 'number'
  value: 600
  name: 'depth'
}

param height {
  type: 'number'
  value: 800
  name: 'height'
}

translate {
  y: 100

  component base {
    A: width + 100
    B: depth
    name: 'base'
  }
}



rotate {
  x: 90

  rotate {
    y: -90

    translate {
      y: 100 + base.thickness
      z: -depth

      component back {
        A: width + 100
        B: height - 100
        name: 'back'
      }
    }
  }
}
