import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard'; // importer le composant GameCard

import { Game } from '../../@types/game';

function GamePlateforms() {
  const [products, setProducts] = useState<Game[]>();
  const { plateform } = useParams();

  const fetchData = async (gamePlatform: any) => {
    try {
      const reponse = await fetch(
        `https://egaming-047c9a34174a.herokuapp.com/game/plateform/${gamePlatform}`
      );
      const jeux = await reponse.json();

      console.log(jeux);

      setProducts(jeux);
    } catch (error) {
      console.error('Error Recuperation De Jeu', error);
    }
  };

  useEffect(() => {
    fetchData(plateform?.toLowerCase());
  }, [plateform]);

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
              plateforms={plateform ? [plateform] : []}
              special_offer={game.special_offer}
              price={game.price}
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
export default GamePlateforms;
