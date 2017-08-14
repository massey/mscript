group all {

    param faceMaterial {
        type: 'number'
        value: 600
    }

    param benchtopHeight {
        type: 'number'
        value: 1000
    }

    component benchtop {
      name: 'benchtop'
      A: 23
      B: 60
      material: faceMaterial
    }
}
