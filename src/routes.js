import { Layout } from 'components/Layout'
import { Loader } from 'components/Loader'
import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const DetailsPage = lazy(() => import('pages/DetailsPage'))
const ListPage = lazy(() => import('pages/ListPage'))

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: '/country/:code',
        element: (
          <Suspense fallback={<Loader />}>
            <DetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
