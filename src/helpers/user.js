import { USER_TYPE } from '@src/constants'

export const getUserTypeLabel = (type) => {
  switch (type) {
    case USER_TYPE.ADMIN:
      return 'Admin'
    case USER_TYPE.SUB_ADMIN:
      return 'Sub Admin'
    case USER_TYPE.USER:
      return 'User'

    default:
      return 'N/A'
  }
}
