import GameCard from './GameCard';

export default function GameList({
  games,
  sectionTitle = 'Daftar Game',
  isBackend = false,
  onToggleComplete,
  onDelete,
}) {
  return (
    <div style={{ marginTop: '24px' }}>
      <h2>{sectionTitle}</h2>
      {games.length === 0 ? (
        <p>Belum ada data game.</p>
      ) : (
        <div className="game-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isBackend={isBackend}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}