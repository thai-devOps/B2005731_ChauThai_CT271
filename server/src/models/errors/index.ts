import responseMessage from '~/constants/message'
import statusCode from '~/constants/statusCode'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class ErrorWithMessage extends ErrorWithStatus {
  constructor({ message, status }: { message: string; status: number }) {
    super({ message, status })
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = responseMessage.error.default, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: statusCode.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
