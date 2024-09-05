import { Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App/App';
import { Game } from '../../@types/game';
import './Panier.scss';
import ErrorPage from '../ErrorPage/ErrorPage';

type ConnectedProps = {
  cart: Game[];
};

function Panier() {
  const link = '/account/cart/confirm-order';
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    // Gérer le cas où le contexte n'est pas défini
    return <div>Erreur de contexte</div>;
  }

  const { cart, setCart, connected, updateCart } = userContext;

  const removeFromCart = (productId: string) => {
    // Créer un nouveau tableau qui exclut l'élément avec l'ID spécifié
    const updatedCart = cart.filter((product) => product.slug !== productId);
    // Mettre à jour le panier avec le nouveau tableau
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    // Mettre à jour la quantité dans le panier
    updateCart(productId, newQuantity);
  };

  const buyMore = () => {
    navigate('/');
  };

  const newTotal = cart?.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const generatePlatformOptions = (product: Game) => {
    return product.plateforms.map((platform, index) => (
      <option key={platform} value={platform}>
        {platform}
      </option>
    ));
  };

  return (
    <div>
      <h1>Mon panier</h1>
      {connected === false ? (
        <ErrorPage />
      ) : (
        <div>
          {cart.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cart.map((product) => (
              <div key={product.slug} className="cart">
                <img
                  src={product.image_url}
                  alt="product image"
                  className="cart-image"
                />
                <div className="cart-info">
                  <h2 className="cart-title">{product.name}</h2>
                  <div className="cart-platform">
                    <label htmlFor={`platform-select-${product.slug}`}>
                      Plateforme :
                    </label>
                    <select
                      id={`platform-select-${product.slug}`}
                      value={product.platform}
                      onChange={(e) => {
                        const selectedPlatform = e.target.value;
                        updateCart(
                          product.slug,
                          product.quantity,
                          selectedPlatform
                        );
                      }}
                    >
                      {generatePlatformOptions(product)}
                    </select>
                  </div>
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
                  <h2 className="cart-quantity">
                    Quantité: {product.quantity}
                  </h2>
                  <div className="cart-quantity-controls">
                    <button
                      type="button"
                      className="cart-update-quantity"
                      onClick={() =>
                        updateQuantity(product.slug, product.quantity + 1)
                      }
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      className="cart-update-quantity"
                      onClick={() =>
                        updateQuantity(
                          product.slug,
                          Math.max(1, product.quantity - 1)
                        )
                      }
                    >
                      -1
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-delete"
                    onClick={() => removeFromCart(product.slug)}
                  >
                    Supprimer du panier
                  </button>
                </div>
              </div>
            ))
          )}
          <Divider fitted className="divider-price" />
          <div className="cart-confirm-total">
            Total: {newTotal?.toFixed(2)} €
          </div>
          <Divider fitted className="divider-price" />
          {cart.length > 0 && (
            <div className="cart-button">
              <button type="button" className="cart-continue" onClick={buyMore}>
                Continuer vos achats
              </button>
              <Link to={link}>
                <button type="button" className="cart-validated">
                  Valider votre panier
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Panier;
