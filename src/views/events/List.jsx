import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import { deleteEvent, getEvents } from '@src/apis'
import Swal from 'sweetalert2'
import Table from '@src/@core/components/table'
import { columns } from './utils/columns'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getResponseErrorMessage } from '@src/helpers'
import toast from 'react-hot-toast'
import useJwt from '@src/@core/auth/jwt/useJwt'
import { USER_TYPE } from '@src/constants'

const List = () => {
  const { jwt } = useJwt()
  const user = jwt.getUser()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
    },
    onError: (err) => {
      const message = getResponseErrorMessage(err, 'Something went wrong')
      toast.error(message)
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  const onDeleteClick = (id) => {
    if (user.type === USER_TYPE.USER) {
      toast.error('You are not allowed to perform this action')
      return
    }
    Swal.fire({
      title: 'Delete Event',
      text: 'Are you sure you want to delete this event?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
      showCloseButton: true
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        handleDelete(id)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        {[USER_TYPE.ADMIN, USER_TYPE.SUB_ADMIN].includes(user.type) && (
          <Button color="primary" tag={Link} to="/events/create">
            Add
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <div className="invoice-list-dataTable react-dataTable">
          <Table
            queryKey={['events']}
            queryFn={getEvents}
            columns={columns({
              handleDelete: onDeleteClick,
              deleting: mutation.isPending,
              user
            })}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default List
