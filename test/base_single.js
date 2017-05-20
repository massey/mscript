param width {
  type: 'number'
  value: 900
}

param depth {
  type: 'number'
  value: 600
}

param benchtopHeight {
  type: 'number'
  value: 950
}

param benchtopMaterial {
  type: 'object'
  source: $.materials
}

param benchtopOverhang {
  type: 'number'
  value: 0
}

param faceMaterial {
  type: 'object'
  source: $.materials
}

param kickHeight {
  type: 'number'
  value: 100
}

param isFinishedLeft {
  type: 'string'
  value: $.sideFinishTypes
}

param isFinishedRight {
  type: 'string'
  value: $.sideFinishTypes
}

////////////////
// Components //
////////////////

component leftFinish {
  A: benchtopHeight - benchtopMaterial.thickness - kickHeight
  B: depth - benchtopOverhang
           - (isFinishedLeft === 'overlay' ? faceMaterial.thickness : 0)
  material: faceMaterial
  on: isFinishedLeft
  face2: 'finished'
}

component rightFinish {
  A: benchtopHeight - benchtopMaterial.thickness
                    - kickHeight
  B: depth - benchtopOverhang
           - (isFinishedRight === 'overlay' ? faceMaterial.thickness : 0)
  material: faceMaterial
  on: isFinishedRight
  face2: 'finished'
}

component base {
  A: width - (isFinishedLeft ? leftFinish.thickness : 0)
           - (isFinishedRight ? rightFinish.thickness : 0)
  B: depth - benchtopOverhang - faceMaterial.thickness
  material: '01.003'
}

component back {
  A: base.A
  B: benchtopHeight - kickHeight
                    - base.thickness
                    - benchtopMaterial.thickness
  material: '01.003'
}

component stretcher {
  A: back.A
  B: 70
  material: faceMaterial
}

component shelf {
  A: back.A
  B: depth - benchtopOverhang - faceMaterial.thickness - 20
  material: '01.005'
}

component left {
  A: benchtopHeight - benchtopMaterial.thickness - base.thickness - kickHeight
  B: depth - benchtopOverhang - faceMaterial.thickness
  material: '01.002'
  face2: 'finished'
}

component right {
  A: benchtopHeight - benchtopMaterial.thickness - base.thickness - kickHeight
  B: depth - benchtopOverhang - faceMaterial.thickness
  material: '01.002'
  face2: 'finished'
}

//////////////
// Hardware //
//////////////

// Plinth feet
component {
  code: '01.021'
  quantity: 4
}

// Hinges
component {
  code: '01.021'
  quantity: 4
}

// Lamellos
component {
  code: '05.024'
  quantity: 12
}
