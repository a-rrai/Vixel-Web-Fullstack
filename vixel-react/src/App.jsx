import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameStats from './components/GameStats';
import FormTambahGame from './components/FormTambahGame';
import GameList from './components/GameList';

const BACKEND_URL = 'http://localhost:3000/games';

function App() {
  const [backendGames, setBackendGames] = useState([]);
  const [rawgGames, setRawgGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // 1. GET dari Backend NestJS
  const fetchBackendGames = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      if (response.ok) {
        const data = await response.json();
        setBackendGames(data);
      }
    } catch (error) {
      console.error('Gagal memuat data dari backend:', error);
    }
  };

  // 2. GET dari RAWG API (Eksternal)
  const fetchRawgGames = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const apiKey = '4acb861230ec4f388a12d8ec451fec30';
      const mood = 'atmospheric';
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&tags=${mood}&page_size=16`
      );
      if (!response.ok) throw new Error('Gagal mengambil data dari RAWG API');

      const data = await response.json();
      const formattedGames = data.results.map((game) => ({
        id: game.id,
        title: game.name,
        genre: game.genres.map((g) => g.name).join(', ') || 'Atmospheric',
        image: game.background_image,
      }));

      setRawgGames(formattedGames);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendGames();
    fetchRawgGames();
  }, []);

  // 3. POST ke Backend NestJS (Tambah Data)
  const handleAddGame = async (newGame) => {
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(Array.isArray(data.message) ? data.message.join(', ') : data.message);
        return;
      }

      setBackendGames((prev) => [...prev, data]);
    } catch (error) {
      alert('Gagal terhubung ke server backend');
    }
  };

  // 4. PATCH ke Backend NestJS (Ubah Data)
  const handleToggleComplete = async (game) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${game.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !game.isCompleted }),
      });

      if (response.ok) {
        const updatedGame = await response.json();
        setBackendGames((prev) =>
          prev.map((item) => (item.id === game.id ? updatedGame : item))
        );
      }
    } catch (error) {
      console.error('Gagal mengubah data:', error);
    }
  };

  // 5. DELETE ke Backend NestJS (Hapus Data)
  const handleDeleteGame = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBackendGames((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <GameStats count={backendGames.length + rawgGames.length} />

      {/* CRUD yang terhubung ke Backend NestJS */}
      <FormTambahGame onAddGame={handleAddGame} />
      <GameList
        sectionTitle="Koleksi Game Saya"
        games={backendGames}
        isBackend={true}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteGame}
      />

      {/*  Katalog RAWG API */}
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <h3>Memuat atmosfer game... ⏳</h3>
        </div>
      ) : isError ? (
        <div style={{ textAlign: 'center', margin: '40px 0', color: '#ff4d4f' }}>
          <h3>Waduh, koneksi terputus. Gagal memuat game dari RAWG.</h3>
          <button
            onClick={fetchRawgGames}
            style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <GameList
          sectionTitle="Rekomendasi Game"
          games={rawgGames}
          isBackend={false}
        />
      )}
    </div>
  );
}

export default App;