import { Outlet } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import './App.scss';
import { Game } from '../../@types/game';
import NavBar from '../AppHeader/NavBar/NavBar';

type ContextType = {
  connected: boolean;
  setConnected: (value: boolean) => void;
  cart: Game[];
  setCart: React.Dispatch<React.SetStateAction<Game[]>>;
  favorites: Game[];
  setFavorites: React.Dispatch<React.SetStateAction<Game[]>>;
};

export const UserContext = createContext<ContextType | undefined>(undefined);

function App() {
  const [connected, setConnected] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('allplateform');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('abcOrder');
  const [cart, setCart] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [user, setUser] = useState({
    civility: '',
    firstname: '',
    lastname: '',
    birthday: '',
    phone: '',
    address: '',
    mail: '',
    password: '',
  });

  const updateCart = (
    productId: string,
    newQuantity: number,
    newPlatform: string
  ) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.slug === productId
          ? { ...product, quantity: newQuantity, platform: newPlatform }
          : product
      )
    );
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    connected,
    setConnected,
    cart,
    setCart,
    favorites,
    setFavorites,
    user,
    setUser,
    updateCart,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <>
        <NavBar
          connected={connected}
          setConnected={setConnected}
          setPlatform={setPlatform}
          setSearch={setSearch}
          setSort={setSort}
        />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </>
    </UserContext.Provider>
  );
}

export default App;
