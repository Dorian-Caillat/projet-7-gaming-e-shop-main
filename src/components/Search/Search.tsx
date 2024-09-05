import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import GameCard from '../GameCard/GameCard'; // importer le composant GameCard
import './Search.scss';

import { Game } from '../../@types/game';

function Search() {
  const [products, setProducts] = useState<Game[]>();
  const { search } = useParams();
  const [sortOrder, setSortOrder] = useState<string>('abcOrder'); // Default sort order

  const fetchData = async () => {
    try {
      const reponse = await fetch(
        `https://egaming-047c9a34174a.herokuapp.com/game/`
      );
      const jeux = await reponse.json();

      const jeuxPlatforme = jeux?.filter((jeu: Game) => {
        return jeu.name.toLowerCase().includes(search?.toLowerCase() ?? '');
      });

      const sortedGames = jeuxPlatforme?.sort((a: Game, b: Game) => {
        if (sortOrder === 'priceUp') {
          return a.price - b.price;
        } else if (sortOrder === 'priceDown') {
          return b.price - a.price;
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      setProducts(sortedGames);
    } catch (error) {
      console.error('Error Recuperation De Jeu', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, sortOrder]);

  const sortOptions = [
    { key: 'abcOrder', text: 'Ordre alphabétique', value: 'abcOrder' },
    {
      key: 'priceUp',
      text: 'Prix croissant',
      value: 'priceUp',
    },
    { key: 'priceDown', text: 'Prix décroissant', value: 'priceDown' },
  ];

  return (
    <>
      <div className="gamelist-result">
        Vous avez {products?.length} résultats
        <Dropdown
          className="dropdown"
          text="Filtrer"
          defaultValue={sortOptions[0].key}
          selection
          options={sortOptions}
          value={sortOrder}
          onChange={(event, data) => setSortOrder(data.value as string)}
        />
      </div>
      <div className="gamelist">
        {products?.map((game) => (
          <GameCard
            key={game.slug}
            slug={game.slug}
            name={game.name}
            plateforms={game.plateforms}
            special_offer={game.special_offer}
            price={game.price}
            image_url={game.image_url}
            quantity={game.quantity}
            release={game.release}
            physical={game.physical}
          />
        ))}
      </div>
    </>
  );
}

export default Search;
