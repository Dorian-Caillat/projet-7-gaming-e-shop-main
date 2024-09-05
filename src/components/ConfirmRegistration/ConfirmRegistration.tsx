import { Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ConfirmRegistration.scss';

function ConfirmRegistration() {
  const link = '/sign-in';
  return (
    <>
      <div className="confirm-registration">
        <p>
          <Icon name="thumbs up outline" /> Votre compte a bien été enregistré
        </p>
      </div>
      <div className="button">
        <Link to={link}>
          <Button>Accéder à la page de connexion</Button>
        </Link>
      </div>
    </>
  );
}
export default ConfirmRegistration;
