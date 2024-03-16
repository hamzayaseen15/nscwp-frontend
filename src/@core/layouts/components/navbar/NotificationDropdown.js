// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell } from 'react-feather'

// ** Reactstrap Imports
import { Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Spinner } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { getUserNotification } from '@src/apis'
import ErrorAlert from '@src/@core/components/error-alert'

const NotificationDropdown = () => {
  const notificationQuery = useQuery({
    queryKey: ['user-notifications'],
    queryFn: getUserNotification,
    refetchInterval: 5000
  })

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false
        }}
      >
        {notificationQuery.isPending && (
          <div className="list-item d-flex align-items-center">
            <div className="list-item-body flex-grow-1">
              <Spinner color="primary" />
            </div>
          </div>
        )}
        {notificationQuery.data?.data?.length < 1 && (
          <a
            className="d-flex"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <div className="list-item d-flex align-items-center">
              <div className="list-item-body flex-grow-1">No notification</div>
            </div>
          </a>
        )}
        {notificationQuery.isError && <ErrorAlert error={notificationQuery.error} />}

        {notificationQuery.data?.data?.map((item, index) => {
          return (
            <a
              key={index}
              className="d-flex"
              href="#"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <div className="list-item d-flex align-items-start">
                <div className="list-item-body flex-grow-1">
                  {item.title}
                  <small className="notification-text">{item.message}</small>
                </div>
              </div>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item me-25">
      <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
        <Bell size={21} />
        {!!notificationQuery.data?.data?.length && (
          <Badge pill color="danger" className="badge-up">
            {notificationQuery.data?.data?.length}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
            <Badge tag="div" color="light-primary" pill>
              {notificationQuery.data?.data?.length}
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* {notifications.length > 0 && (
          <li className="dropdown-menu-footer">
            <Button color="primary" block>
              Read all notifications
            </Button>
          </li>
        )} */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
