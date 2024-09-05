import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Button, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo .png';
import 'semantic-ui-css/semantic.min.css';

import classes from './NavBar.module.scss';

import { Game } from '../../@types/game';

function Navbar(props) {
  const [platform, setPlatform] = useState('allPlateforms');
  const [gamePlatforms, setGamePlatforms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of platforms from your API
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          'https://egaming-047c9a34174a.herokuapp.com/plateform'
        );
        const allPlatforms = await response.json();

        const uniquePlatforms: string[] = Array.from(
          new Set(allPlatforms?.flatMap((game) => game) || [])
        );

        setGamePlatforms(uniquePlatforms);
      } catch (error) {
        console.error('Error fetching platforms', error);
      }
    };

    fetchPlatforms();
  }, []);

  function handleLogout() {
    props.setConnected(false);
    document.cookie = ``;
    navigate('/');
  }

  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.setSearch(searchValue);
      if (searchValue === '') {
        navigate(`/`);
      } else {
        navigate(`/Search/${searchValue}`);
      }
    }
  };

  function handleCart() {
    navigate('/account/cart');
  }

  function handleDropdown(e, { value }) {
    setPlatform(value);

    if (value === 'allPlateforms') {
      navigate(`/`);
    } else {
      navigate(`/plateform/${value}`);
    }
  }

  const optionsDropdown = [
    {
      key: 'allPlateforms',
      text: 'Toutes les plateformes',
      value: 'allPlateforms',
    },
    ...gamePlatforms.map((platforms) => ({
      key: platforms.slug,
      text: platforms.name,
      value: platforms.slug,
    })),
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const menuToggleHandler = (): void => {
    setMenuOpen((p: boolean) => !p);
  };

  return (
    <header className={classes.navbar}>
      <div id="main-navbar" className={classes.navbar__content}>
        <Link to="/" className={classes.navbar__content__logo}>
          <img
            src={logo}
            className={classes.navbar__content__logo}
            alt="Shop Gaming"
          />
        </Link>

        <nav
          className={`${classes.navbar__content__nav} ${
            menuOpen ? classes.isMenu : ''
          }`}
        >
          <ul>
            <li>
              <Dropdown
                className={classes.navbar__content__nav__li}
                value={platform}
                // eslint-disable-next-line prettier/prettier
                button
                basic
                options={optionsDropdown}
                closeOnChange
                onChange={handleDropdown}
                simple
                item
                settings
              />
            </li>
            <li>
              <Input
                className={classes.navbar__content__nav__li}
                icon="search"
                placeholder="Search..."
                iconPosition="left"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </li>
          </ul>
          {!props.connected && (
            <Link
              to="/sign-in"
              className={classes.navbar__content__nav__mobile}
            >
              <Button
                onClick={menuToggleHandler}
                className="login"
                color="blue"
              >
                Se Connecter
              </Button>
            </Link>
          )}
          {!props.connected && (
            <Link to="/sign-in" className={classes.navbar__content__nav__login}>
              <Button className="login" color="blue">
                Se Connecter
              </Button>
            </Link>
          )}
          {props.connected && (
            <Link to="/account" className="profile-button">
              <Button color="grey">
                <Icon name="user" /> Mon Compte
              </Button>
            </Link>
          )}
          {props.connected && (
            <Link to="/account/favorites" className="profile-button">
              <Button color="green">
                <Icon name="heart" /> Favoris
              </Button>
            </Link>
          )}
          {props.connected && (
            <Link to="/account/cart" className="profile-button">
              <Button color="blue">
                <Icon name="cart" /> Panier
              </Button>
            </Link>
          )}
          {props.connected && (
            <Button onClick={handleLogout} className="logout" color="red">
              <Icon name="sign out" />
              Deconnexion
            </Button>
          )}
        </nav>
        <div className={classes.navbar__content__toggle}>
          {!menuOpen ? (
            <Icon
              onClick={menuToggleHandler}
              name="bars"
              color="green"
              size="large"
            />
          ) : (
            <Icon
              onClick={menuToggleHandler}
              name="delete"
              color="green"
              size="large"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
