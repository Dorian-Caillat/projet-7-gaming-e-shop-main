/* eslint-disable no-console */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { UserContext } from '../App/App';
import { Game } from '../../@types/game';
import './GameSheet.scss';

function GameSheet() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cart, setCart, connected, favorites, setFavorites } =
    useContext(UserContext);
  // utilisation de useState pour définir l'état du jeu à afficher
  const [product, setProduct] = useState<Game>();

  // Fonction pour ajouter un produit à mon panier
  const addToCart = () => {
    const discountedPrice =
      product?.price - (product?.price * product?.special_offer) / 100;

    if (product) {
      product['discountedPrice'] = discountedPrice;
    }

    if (connected) {
      const updatedCart = [...cart];
      const existingProduct = updatedCart.find((p) => p.slug === product?.slug);

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

  const fetchData = async (slugRechercher: string) => {
    // fonction de récupération du jeu
    try {
      const reponse = await fetch(
        `https://egaming-047c9a34174a.herokuapp.com/game/${slugRechercher}`
      ); // fetch récupère sur le lien externer les données
      const jeu = await reponse.json(); // transforme la réponse en json

      /* const jeu = jeux.find((item: Game) => item.id === idRechercher);   cherche le jeu correspondant au id */
      console.log(jeu);
      setProduct(jeu); // affiche le id correspondant
    } catch (error) {
      // gestion d'erreur
      console.error('Error Recuperation De Jeu:', error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData(slug); // récupérer les données de l'api lors du rendu
    }
  }, []);

  // eslint-disable-next-line no-unsafe-optional-chaining
  let discountedPrice;
  let textOffer;

  if (product) {
    discountedPrice =
      product.price - (product.price * product.special_offer) / 100;

    textOffer = product.special_offer
      ? `Réduction : - ${product.special_offer} %`
      : '';
  }

  return (
    <div className="gamesheet">
      <Image className="image" src={product?.image_url} size="medium" rounded />
      <span className="gamesheet-paragraph">
        <p className="gamesheet-paragraph-name"> {product?.name}</p>
        <p className="gamesheet-paragraph-plateform">
          Plateforme: {product?.plateforms}
        </p>
        <p>
          <span className="date">Date de sortie: {product?.release_date}</span>
        </p>
        <p>{product?.description}...</p>

        <p>
          <span className="price-offer">{textOffer}</span>
        </p>
        <p>
          <span className="price">{product?.price} €</span>
        </p>
        <p>
          <span className="price-reduction">
            Prix : {discountedPrice?.toFixed(2)} €
          </span>
        </p>

        <span className="gamesheet-button">
          <Button className="button-hover" basic onClick={addToCart}>
            Ajouter au panier
          </Button>
        </span>
      </span>
    </div>
  );
}

export default GameSheet;
