export default function GameCard({ game, isBackend, onToggleComplete, onDelete }) {
  return (
    <div className="game-card">
      {game.image && (
        <img
          src={game.image}
          alt={game.title}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      )}
      <h3>{game.title}</h3>
      <p>Genre: {game.genre}</p>

      {/* Detail & Tombol CRUD khusus data dari Backend NestJS */}
      {isBackend && (
        <>
          <p>Rating: ⭐ {game.rating}</p>
          <p>Rilis: {game.releaseDate}</p>
          <p>Status: {game.isCompleted ? 'Selesai' : 'Belum Selesai'}</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button onClick={() => onToggleComplete(game)}>
              {game.isCompleted ? 'Tandai Belum' : 'Tandai Selesai'}
            </button>
            <button
              onClick={() => onDelete(game.id)}
              style={{ backgroundColor: '#ff4d4f', color: 'white' }}
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </div>
  );
}