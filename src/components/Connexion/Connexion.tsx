import { FormEvent, ChangeEvent, useContext, useState, useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import './Connexion.scss';
import { UserContext } from '../App/App';
import { User } from '../../@types/user';

type ConnectedProps = {
  setConnected: (value: boolean) => void;
  setUser: (value: User) => void;
};

function Connexion() {
  const { setConnected, setUser } = useContext(
    UserContext
  ) as unknown as ConnectedProps;
  const navigate = useNavigate();

  // State to store the form values and error message
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch the list of users from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://egaming-047c9a34174a.herokuapp.com/user/${emailValue}`
      );
      const data = await response.json();
      // Not storing the users in state for now, as we're not doing client-side verification
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle when the form is submitted
  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Call the login API endpoint with email and password
      const response = await fetch(
        'https://egaming-047c9a34174a.herokuapp.com/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mail: emailValue, password: passwordValue }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = `authToken=${data.token}`;
        setUser(data);
        setConnected(true);
        setErrorMessage(null);
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed');
    }
  };

  // Function to update the email value
  const handleEmailForm = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  // Function to update the password value
  const handlePasswordForm = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  return (
    <div className="connexion">
      <h1>Connexion</h1>
      <Form className="form" onSubmit={handleSubmitForm}>
        <div className="input-email">
          Email :
          <input
            type="email"
            className="email"
            placeholder="xxx@gmail.com"
            onChange={handleEmailForm}
          />
        </div>
        <div className="input-password">
          Mot de passe :
          <input
            type="password"
            className="password"
            placeholder="Lettres et chiffres"
            onChange={handlePasswordForm}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="form-submit">
          Se connecter
        </button>
        <Link to="/RegisterUser" className="form-register">
          Je n'ai pas encore de compte !
        </Link>
      </Form>
    </div>
  );
}

export default Connexion;
