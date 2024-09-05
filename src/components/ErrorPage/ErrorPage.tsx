import { Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

function ErrorPage() {
  const link = '/';
  return (
    <div className="ErrorPage">
      <Icon name="frown" />
      <h1>Page non trouvée</h1>
      <Link to={link}>
        <Button>Revenir à la page d&apos;accueil</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
