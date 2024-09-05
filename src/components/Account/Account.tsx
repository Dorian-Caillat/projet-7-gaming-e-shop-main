import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App/App';
import './Account.scss';
import ErrorPage from '../ErrorPage/ErrorPage';

function Account() {
  const userContext = useContext(UserContext);
  const { user: initialUser, connected} = userContext;

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://egaming-047c9a34174a.herokuapp.com/user/${initialUser.mail}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error retrieving user data', error);
      }
    };
    if (connected && initialUser.mail) {
      fetchData();
    }
  }, [initialUser, connected]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://egaming-047c9a34174a.herokuapp.com/user/${user.mail}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        // Mettez à jour le contexte utilisateur ici
        userContext.setUser(user);

        // Handle success, maybe update the user context or show a success message
        console.log('User information updated successfully');
        setIsEditing(false); // Switch back to view mode after saving
      } else {
        const errorData = await response.json();
        // Handle error, show an error message
        console.error('Error updating user information', errorData);
      }
    } catch (error) {
      console.error('Error updating user information', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Switch back to view mode without saving changes
  };

  return (
    <div>
      <h1>Mon compte</h1>
      {connected === false ? (
        <ErrorPage />
      ) : (
        <div className="account-content">
          <h1>Bonjour {user && user.firstname}</h1>
          {isEditing ? (
            <div className="edit-form">
              <label className="edit-label">
                Civilité:
                <input
                  type="text"
                  name="civility"
                  value={user.civility}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Prénom:
                <input
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Nom:
                <input
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Date de naissance:
                <input
                  type="text"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Téléphone:
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Adresse:
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label className="edit-label">
                Email:
                <input
                  type="text"
                  name="mail"
                  value={user.mail}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <div className="edit-buttons">
                <button onClick={handleSaveClick} className="save-button">
                  Sauvegarder
                </button>
                <button onClick={handleCancelClick} className="cancel-button">
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="user-info">
              <p className="info">Civilité: {user && user.civility}</p>
              <p className="info">Prénom: {user && user.firstname}</p>
              <p className="info">Nom: {user && user.lastname}</p>
              <p className="info">Date de naissance: {user && user.birthday}</p>
              <p className="info">Téléphone: {user && user.phone}</p>
              <p className="info">Adresse: {user && user.address}</p>
              <p className="info">E-mail: {user && user.mail}</p>
              <button onClick={handleEditClick} className="edit-button">
                Modifier vos informations
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
