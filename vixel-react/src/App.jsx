import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameStats from './components/GameStats';
import FormTambahGame from './components/FormTambahGame';
import GameList from './components/GameList';

function App() {
  // 1. Ubah inisialisasi state menjadi array kosong
  const [games, setGames] = useState([]);
  
  // 2. Tambahkan state untuk status Loading dan Error
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 3. Buat fungsi untuk mengambil data dari RAWG
  const fetchGames = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const apiKey = '4acb861230ec4f388a12d8ec451fec30';
      const mood = 'atmospheric';
      
      // Fetch ke endpoint RAWG API
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&tags=${mood}&page_size=16`);
      
      if (!response.ok) throw new Error('Gagal mengambil data dari API');
      
      const data = await response.json();
      
      // 4. Sesuaikan format data RAWG dengan format props GameCard
      const formattedGames = data.results.map((game) => ({
        id: game.id,
        title: game.name, 
        genre: game.genres.map(g => g.name).join(', ') || 'Atmospheric', 
        image: game.background_image 
      }));
      
      setGames(formattedGames);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Panggil fungsi fetch saat aplikasi pertama kali dimuat
  useEffect(() => {
    fetchGames();
  }, []);

  const handleAddGame = (newGame) => {
    const gameToInsert = {
      id: Date.now(),
      title: newGame.title,
      genre: newGame.genre,
      image: ''
    };
    setGames([...games, gameToInsert]);
  };

  return (
    <div className="app-container">
      <Header />
      
      {/* 6. Conditional Rendering */}
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <h3>Memuat atmosfer game... ⏳</h3>
        </div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#ff4d4f' }}>
          <h3>Waduh, koneksi terputus. Gagal memuat game dari RAWG.</h3>
          {/* Tombol "Coba Lagi" khusus saat error */}
          <button 
            onClick={fetchGames} 
            style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          <GameStats count={games.length} />
          <FormTambahGame onAddGame={handleAddGame} />
          <GameList games={games} />
        </>
      )}
    </div>
  );
}

export default App;