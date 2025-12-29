import { games } from "./Games"

const GamesList = () => {
  document.title = "MG - Game list"
  return (
    <div className="min-h-full text-gray-900">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">{'All games'.toUpperCase()}</h2>
        <div className="flex flex-col gap-8">

        {games.map((item, index ) => (
          <article key={`gamelist_game_${index}`} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-4">
              {item.description}
            </p>
            <a href={item.gameLink}
              className="inline-block px-5 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
              Jouer
            </a>
          </article>
        ))}
        </div>
      </main>
    </div>
  )
}

export default GamesList