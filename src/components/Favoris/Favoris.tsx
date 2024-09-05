import { useContext } from 'react';
import { UserContext } from '../App/App';
import { Game } from '../../@types/game';
import './Favoris.scss';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';

type ConnectedProps = {
  cart: Game[];
};

function Favoris() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    // Gérer le cas où le contexte n'est pas défini
    return <div>Erreur de contexte</div>;
  }

  const { cart, setCart, favorites, setFavorites, connected } = userContext;

  console.log({ favorites });

  const removeFromFavorites = (productId: string) => {
    // Créer un nouveau tableau qui exclut l'élément avec l'ID spécifié
    const updatedFavorites = favorites.filter(
      (product) => product.slug !== productId
    );
    console.log(updatedFavorites);
    // Mettre à jour le panier avec le nouveau tableau
    setFavorites(updatedFavorites);
  };

  // Ajout d'un élément au panier
  const addToCart = (product: Game) => {
    // Vérifier si le produit est déjà dans le panier
    const isProductInCart = cart.some((item) => item.slug === product.slug);

    if (!isProductInCart) {
      // Ajouter le produit au tableau existant
      setCart([...cart, product]);

      // Naviguer vers la page du panier
      navigate('/account/cart');
    } else {
      // Si le produit est déjà dans le panier, naviguer vers la page du panier directement
      navigate('/account/cart');
    }
  };

  const buyMore = () => {
    navigate('/');
  };

  //Fonction pour aller vers le panier
  const goToCart = () => {
    navigate('/account/cart');
  };

  return (
    <div>
      {connected === false ? (
        <ErrorPage />
      ) : (
        <>
          <h1>Vos favoris</h1>
          {favorites.length === 0 ? (
            <p>Vous n'avez pas de favoris.</p>
          ) : (
            favorites.map((product) => (
              <div key={product.slug} className="favoris">
                <img
                  src={product.image_url}
                  alt="product image"
                  className="favoris-image"
                />
                <div className="favoris-info">
                  <h2 className="favoris-title">{product.name}</h2>
                  <h2 className="favoris-platform">{product.plateforms}</h2>
                  <div className="cart-prices">
                    <h2
                      className={`cart-price-old ${
                        product.special_offer ? 'discounted' : ''
                      }`}
                    >
                      {product.price} €
                    </h2>
                    <h2 className="cart-price-discounted">
                      {product.discountedPrice.toFixed(2)} €
                    </h2>
                  </div>{' '}
                  <div className="favoris-productButton">
                    <button
                      type="button"
                      className="favoris-delete"
                      onClick={() => removeFromFavorites(product.slug)}
                    >
                      Supprimer des favoris
                    </button>
                    <button
                      type="button"
                      className="favoris-delete"
                      onClick={() => addToCart(product)}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {favorites.length === 0 ? (
            <p></p>
          ) : (
            <div className="favoris-button">
              <button
                type="button"
                className="favoris-continue"
                onClick={buyMore}
              >
                {' '}
                Continuer vos achats{' '}
              </button>
              <button
                type="button"
                className="favoris-validated"
                onClick={goToCart}
              >
                {' '}
                Voir votre panier{' '}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favoris;
