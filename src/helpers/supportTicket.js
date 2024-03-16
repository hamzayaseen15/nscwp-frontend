import { SUPPORT_TICKET_STATUS } from '@src/constants'

export const getSupportTicketStatusLabel = (type) => {
  switch (type) {
    case SUPPORT_TICKET_STATUS.PENDING:
      return 'Pending'
    case SUPPORT_TICKET_STATUS.RESOLVED:
      return 'Resolved'

    default:
      return 'N/A'
  }
}
