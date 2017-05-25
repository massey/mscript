export interface ParamData {
  name: string
  type: string
  value?: any
  accessor?: any
  source?: any
}

export interface SavedData {
  name: string
  params: Array<ParamData>
}
