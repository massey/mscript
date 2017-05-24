param width {
  type: 'number'
  value: 1000
}

param depth {
  type: 'number'
  value: 600
}

param benchtopHeight {
  type: 'number'
  value: 1000
}

param benchtopMaterial {
  type: 'object'
  source: $.materials
  accessor: '01.006'
}

param benchtopOverhang {
  type: 'number'
  value: 0
}

param faceMaterial {
  type: 'object'
  source: $.materials
  accessor: '01.004'
}

param kickHeight {
  type: 'number'
  value: 100
}

param finishedLeft {
  type: 'string'
  value: ['inset', 'overlay']
}

param finishedRight {
  type: 'string'
  value: ['inset', 'overlay']
}

param leftOverhang {
  type: 'number'
  value: radius
  on: finishedLeft
}

param opens {
  type: 'string'
  value: ['left', 'right']
}

param rightOverhang {
  type: 'number'
  value: $.radius
  on: finishedRight
}

component benchtop {
  A: width
  B: depth
  material: benchtopMaterial
  group: 'benchtop'
}

component leftFinishPanel {
  A: benchtopHeight - benchtopMaterial.thickness - kickHeight
  B: depth - benchtopOverhang - faceMaterial.thickness - radius
}

component rightFinishPanel {
  A: benchtopHeight - benchtopMaterial.thickness - kickHeight
  B: depth - benchtopOverhang - faceMaterial.thickness - radius
}

component door {
  A: width - (finishedLeft ? leftOverhang + leftFinishPanel.thickness : 0)
           - (finishedRight ? rightOverhang + rightFinishPanel.thickness : 0)
  B: width - (finishedLeft === 'inset' ? leftFinishPanel.thickness : 0)
           - (finishedRight === 'inset' ? rightFinishPanel.thickness : 0)
           - (2 * radius)
  material: '01.004'
}

component base {
  A: width - (finishedLeft ? leftOverhang + leftFinishPanel.thickness : 0)
           - (finishedRight ? rightOverhang + rightFinishPanel.thickness : 0)
  B: depth - benchtopOverhang - door.thickness
}

component back {
  A: benchtopHeight - base.thickness - kickHeight
  B: base.A
  material: '01.004'
}

component left {
  A: back.A
  B: base.B - radius
  material: '01.004'
}

component right {
  A: back.A
  B: base.B - radius
  material: '01.004'
}

component shelf {
  A: base.A - left.thickness - right.thickness - radius
            - (finishedLeft ? leftFinishPanel.thickness : 0)
            - (finishedRight ? rightFinishPanel.thickness : 0)
  B: base.B - radius
  material: '01.004'
}
