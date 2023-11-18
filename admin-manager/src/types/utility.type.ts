export interface Utility {
  _id: string
  name: string
  price: number
  unit: string
  created_at: string
  updated_at?: string
}

export interface UtilitiesParams {
  page: string
  limit: string
}

export interface UtilitiesResponse {
  utilities: Utility[]
  paginate: {
    page: number
    limit: number
    totalItems: number
    page_size: number
  }
}
