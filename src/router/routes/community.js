import { lazy } from 'react'

const CommunityList = lazy(() => import('@src/views/communities/List'))
const CommunityCreate = lazy(() => import('@src/views/communities/Create'))
const CommunityEdit = lazy(() => import('@src/views/communities/Edit'))

const CommunityRoutes = [
  {
    path: '/communities',
    element: <CommunityList />
  },
  {
    path: '/communities/create',
    element: <CommunityCreate />
  },
  {
    path: '/communities/:id/edit',
    element: <CommunityEdit />
  }
]

export default CommunityRoutes
