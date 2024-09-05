import { Button, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App/App';
import './ConfirmOrder.scss';

function ConfirmOrder() {
  const { cart } = useContext(UserContext);

  const newTotal = cart?.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="confirm">
      <h1 className="confirm-title">Votre commande a été validée</h1>
      <h3 className="confirm-title">Récapitulatif de vos achats</h3>

      {cart?.map((order: any) => {
        let textOffer;
        console.log(order);
        if (order) {
          textOffer = order.special_offer
            ? `Réduction : - ${order.special_offer} %`
            : '';
        }

        return (
          <div key={order.slug} className="confirm-order">
            <Image
              className="image"
              src={order?.image_url}
              size="small"
              rounded
            />
            <div className="confirm-order-paragraph">
              <p>{order.name}</p>
              <p>{order.platform ? order.platform : order.plateforms?.[0]}</p>
              <p> Quantité: {order.quantity}</p>
              <p>{textOffer}</p>
              <p className="price">{order.price} €</p>
              <p className="price-reduction">
                Prix unitaire: {order.discountedPrice?.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
      <div className="confirm-total">Total: {newTotal?.toFixed(2)} €</div>
      <Divider fitted />
      <h3 className="confirm-title">Vos produits seront livrés sous 5 jours</h3>
      <Divider fitted />
      <div className="confirm-button">
        <Link to="/">
          <Button>Continuer mes achats</Button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmOrder;
