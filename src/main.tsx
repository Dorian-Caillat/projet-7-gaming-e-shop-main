import React from 'react';
import ReactDOM from 'react-dom/client';
// On importe RouterProvider pour mettre en place le routage
import { RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import './styles/index.scss';
// On importe le fichier router
import router from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
