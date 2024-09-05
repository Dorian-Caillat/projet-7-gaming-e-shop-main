import { createBrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import GameList from './components/GameList/GameList';
import GameSheet from './components/GameSheet/GameSheet';
import Connexion from './components/Connexion/Connexion';
import Register from './components/RegisterUser/Register';
import Panier from './components/Panier/Panier';
import ConfirmRegistration from './components/ConfirmRegistration/ConfirmRegistration';
import ErrorPage from './components/ErrorPage/ErrorPage';
import GamePlateforms from './components/GamePlateforms/GamePlateforms';
import Search from './components/Search/Search';
import Favoris from './components/Favoris/Favoris';
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';
import Terms from './components/Terms/Terms';
import Account from './components/Account/Account';

const router = createBrowserRouter([
  {
    path: '/', // le lien du layout
    element: <App />, // App ici est le layout principal
    errorElement: <ErrorPage />,
    children: [
      // les éléments dynamiques du layout
      {
        path: '/',
        element: <GameList />,
      },
      {
        path: 'game/:slug',
        element: <GameSheet />,
      },
      {
        path: 'sign-in',
        element: <Connexion />,
      },
      {
        path: 'registeruser',
        element: <Register />,
      },
      {
        path: '/account/cart',
        element: <Panier />,
      },
      {
        path: '/confirm-registration',
        element: <ConfirmRegistration />,
      },
      {
        path: 'plateform/:plateform',
        element: <GamePlateforms />,
      },
      {
        path: 'Search/:search',
        element: <Search />,
      },
      {
        path: '/account/favorites',
        element: <Favoris />,
      },
      {
        path: 'account/cart/confirm-order',
        element: <ConfirmOrder />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
]);

export default router;
