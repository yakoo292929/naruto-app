/**
 * ===========================================================================================
 * SYSTEM NAME    : naruto-app
 * PROGRAM ID     : src/App.js
 * PROGRAM NAME   : App.js
 *                : アプリケーション全てのページで必要な処理
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


////////////////////////////////////////////////////////////////////////
// App
////////////////////////////////////////////////////////////////////////
function App() {

  const limit = 15;

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //-----------------------------------------//
  // useEffect：副作用レンダリング以外の処理
  //-----------------------------------------//
  useEffect(() => {

    fetchCharacters();

  }, []);

  //-----------------------------------------//
  // 関数：ナルトDB取得API
  //-----------------------------------------//
  const fetchCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    const result = await axios.get(apiUrl, {params: {page, limit}});
    setCharacters(result.data.characters);
    // console.log(result);
    setIsLoading(false);
  };

  //-----------------------------------------//
  // 関数：次のページへ遷移
  //-----------------------------------------//
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }

  //-----------------------------------------//
  // 関数：次のページへ遷移
  //-----------------------------------------//
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <div className="container">

      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo" />
        </div>
      </div>

      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
          <main>
            <div className="cards-container">
              {characters.map((character) => {
                return (
                  <div className="card" key={character.id}>
                    <img
                      src={character.images[0] != null ? character.images[0] : "dummy.png"}
                      alt="character"
                      className='card-image'
                    />
                    <div className="card-content">
                      <h3 className="card-title">{character.name}</h3>
                      <p className="card-description">
                        {character.debut != null ? character.debut.appearsIn : "no-data"}
                      </p>
                      <div className="card-footer">
                        <span className="affiliation">
                          {character.personal != null ? character.personal.affiliation : "no-data"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pager">
              <button disabled={page===1} className="prev" onClick={handlePrev}>前へ</button>
              <span className="page-number">{page}</span>
              <button disabled={limit > characters.length} className="next" onClick={handleNext}>次へ</button>
            </div>
          </main>
      ) }
    </div>

  );

}

export default App;
