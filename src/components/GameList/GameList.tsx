import { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard'; // importer le composant GameCard
import './GameList.scss';
import { Game } from '../../@types/game';

function GameList() {
  const [products, setProducts] = useState<Game[]>();
  const fetchData = async () => {
    try {
      const reponse = await fetch(
        'https://egaming-047c9a34174a.herokuapp.com/game/'
      );
      const jeux = await reponse.json();
      setProducts(jeux);
    } catch (error) {
      console.error('Error Recuperation De Jeu', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // tableau vide pour éviter de faire une requête répétitive

  return (
    <>
      <div className="gamelist-result">
        Vous avez {products?.length} résultats
      </div>
      <div className="gamelist">
        {products?.map(
          (
            game // une boucle pour faire apparaître la liste de jeux
          ) => (
            <GameCard
              key={game.slug} // clé unique pour identifier l'élement du tableau
              slug={game.slug}
              name={game.name}
              plateforms={game.plateforms}
              special_offer={game.special_offer}
              price={game.price}
              description={game.description}
              image_url={game.image_url}
              quantity={game.quantity}
              release_date={game.release_date}
              physical={game.physical}
            />
          )
        )}
      </div>
    </>
  );
}
export default GameList;
