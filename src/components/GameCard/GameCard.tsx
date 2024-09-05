import { Button, Card, Image } from 'semantic-ui-react';
import './GameCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App/App';
import { Game } from '../../@types/game';

interface GameCardProps extends Game {
  // Ajouter la fonction addToCart à la liste des props
  setCart: (product: Game) => void;
}

function GameCard({
  slug,
  name,
  plateforms,
  price,
  special_offer,
  image_url,
  description,
}: GameCardProps) {
  const link = `/game/${slug}`;
  const { cart, setCart, connected, favorites, setFavorites } =
    useContext(UserContext);
  const navigate = useNavigate();

  const discountedPrice: number = price - (price * special_offer) / 100;
  // Fonction pour ajouter un produit à mon panier
  const addToCart = () => {
    const product = {
      slug,
      name,
      plateforms,
      price,
      special_offer,
      description,
      discountedPrice, // Ajout du prix discount
      image_url,
    };

    if (connected) {
      const updatedCart = [...cart];
      const existingProduct = updatedCart.find((p) => p.slug === product.slug);

      if (existingProduct) {
        // Si le produit existe déjà dans le panier, augmentez simplement la quantité
        existingProduct.quantity += 1;
      } else {
        // Si le produit n'existe pas, ajoutez-le avec une quantité initiale de 1
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);

      // Naviguer vers la page du panier
      navigate('/account/cart');
    } else {
      navigate('/sign-in');
    }
  };

  // Fonction pour ajouter un produit à mes favoris
  const addToFavorites = () => {
    const product = {
      slug,
      name,
      plateforms,
      price,
      image_url,
      special_offer,
      description,
      discountedPrice,
      quantity: 1,
    };

    console.log(product);

    if (connected) {
      // Ajouter le produit au tableau existant
      setFavorites([...favorites, product]);

      // Naviguer vers la page des favoris
      navigate('/account/favorites');
    } else {
      navigate('/sign-in');
    }
  };

  // on récupère les données de type props

  const textOffer = special_offer ? `Réduction : - ${special_offer} %` : '';

  return (
    <Card className="card-container">
      <Link to={link}>
        <Card.Content>
          <Image floated="left" size="small" src={image_url} />
          <Card.Header className="card-container-name">{name}</Card.Header>
          <Card.Meta>
            <div className="card-container-platform">
              {plateforms?.join(', ')}
            </div>
            <div className="card-container-description">{description}</div>
            <div className="card-container-offer">{textOffer}</div>
            <div className="card-container-price">{price}€</div>
            <div className="card-container-price-discounted">
              {discountedPrice.toFixed(2)}€
            </div>
          </Card.Meta>
        </Card.Content>
      </Link>

      <Card.Content extra>
        <div className="ui two buttons">
          <Button className="button-hover" basic onClick={addToFavorites}>
            Ajouter aux favoris
          </Button>
          <Button className="button-hover" basic onClick={addToCart}>
            Ajouter au panier
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default GameCard;
