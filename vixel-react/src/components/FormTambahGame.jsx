import { useState } from 'react';

export default function FormTambahGame({ onAddGame }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('RPG');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !genre || !rating || !releaseDate) {
      alert('Harap isi semua field!');
      return;
    }

    onAddGame({
      title,
      genre,
      rating: Number(rating),
      releaseDate,
      isCompleted: false,
    });

    setTitle('');
    setGenre('RPG');
    setRating('');
    setReleaseDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Tambah Game ke Koleksi (Backend)</h3>
      <div>
        <input
          type="text"
          placeholder="Judul Game (min. 2 karakter)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={{ margin: '10px 0' }}>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="RPG">RPG</option>
          <option value="Horror">Horror</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Puzzle">Puzzle</option>
        </select>
      </div>
      <div style={{ margin: '10px 0' }}>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="Rating (0 - 10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div style={{ margin: '10px 0' }}>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      <button type="submit">Tambah Game</button>
    </form>
  );
}