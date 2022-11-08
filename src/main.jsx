import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import './index.css';
import Contact, { action as contactAction, loader as contactLoader } from './routes/Contact';
import { action as destroyAction } from './routes/Destroy';
import EditContact, { action as editAction, loader as editContactLoader } from './routes/Edit';
import Fetch, { loader as fetchLoader } from './routes/Fetch';
import Index from './routes/Index';
import Root, { action as rootAction, loader as rootLoader } from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction, //An action to create a contact, inside <Form> of react-router-dom
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: editContactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: 'fetch',
            loader: fetchLoader,
            element: <Fetch />,
            errorElement: <div>Oops! Fetch error.</div>,
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       path='/'
//       element={<Root />}
//       loader={rootLoader}
//       action={rootAction}
//       errorElement={<ErrorPage />}>
//       <Route errorElement={<ErrorPage />}>
//         <Route index element={<Index />} />
//         <Route
//           path='contacts/:contactId'
//           element={<Contact />}
//           loader={contactLoader}
//           action={contactAction}
//         />
//         <Route
//           path='contacts/:contactId/edit'
//           element={<EditContact />}
//           loader={editContactLoader}
//           action={editAction}
//         />
//         <Route path='contacts/:contactId/destroy' action={destroyAction} />
//       </Route>
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
