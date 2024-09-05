import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Radio } from 'semantic-ui-react';
import { UserContext } from '../App/App';
import './Register.scss';

function Register() {
  const [error, setError] = useState(false); // aucune erreur par défaut
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const { user, setUser } = userContext;

  const handleCivility = (value: any) => {
    setUser({
      ...user,
      civility: value,
    });
  };

  const handleCheckBox = () => {
    setCheck(!check);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendForm = async () => {
    const api = 'https://egaming-047c9a34174a.herokuapp.com/user/';
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API requires
        },
        body: JSON.stringify(user),
      });

      console.log(response);

      if (response.status === 200) {
        navigate('/confirm-registration');
      } else {
        setError(true); // si l'erreur est vraie
        console.log(response);
      }

      // navigate('/confirm-registration');
    } catch (error) {
      console.error('Erreur inattendue :', error);
    }
  };

  const handleSubmit = async (e: any) => {
    console.log(user);
    e.preventDefault();
    sendForm();
  };

  return (
    <div className="formulaire">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group inline>
          <label htmlFor="civility">Civilité</label>
          <Form.Field>
            <Radio
              label="Madame"
              value="Femme"
              name="civility"
              checked={user.civility === 'Femme'}
              onChange={() => handleCivility('Femme')}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Monsieur"
              value="Homme"
              name="civility"
              checked={user.civility === 'Homme'}
              onChange={() => handleCivility('Homme')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Nom"
            name="lastname"
            placeholder="Nom"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Prénom"
            name="firstname"
            placeholder="Prénom"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Date de naissance"
            name="birthday"
            placeholder="Date de naissance"
            type="date"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Télephone"
            name="phone"
            placeholder="Télephone"
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="adresse"
            name="address"
            placeholder="Adresse"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="mail"
            onChange={handleChange}
            name="mail"
            placeholder="E-mail"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Mot de passe"
            name="password"
            placeholder="Mot de passe"
            type="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Checkbox
          type="checkbox"
          label="I agree to the Terms and Conditions"
          checked={check}
          onChange={handleCheckBox}
        />
        {error ? <p className="error">Ce compte existe déjà </p> : ''}
        <Form.Button className="button" type="submit" disabled={!check}>
          Se connecter
        </Form.Button>
      </Form>
    </div>
  );
}

export default Register;
