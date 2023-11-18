export interface ResponseSuccessAPI<Data> {
  message: string
  data: Data
}
export interface ResponseErrorAPI<Data> {
  message: string
  data?: Data
}
