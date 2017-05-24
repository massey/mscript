param width {
  type: 'number'
  value: 1000
}

param depth {
  type: 'number'
  value: 600
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

param rightOverhang {
  type: 'number'
  value: $.radius
  on: finishedRight
}
