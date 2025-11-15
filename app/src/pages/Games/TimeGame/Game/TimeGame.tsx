import React from 'react'

const TimeGame = () => {
  return (
    <div  className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center p-10">
      <main
        className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-5xl flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold uppercase mb-6">
          Timeline Historique
        </h2>

        <div
          id="timer"
          className="text-2xl font-bold text-[#6C4EF6] bg-[#F4F2FF] px-6 py-2 rounded-full mb-6 shadow-inner"
        >
          Temps : 02:00
        </div>

        <div
          id="board"
          className="w-full min-h-[200px] bg-[#F9F9FF] border border-[#D9D4F8] rounded-xl mb-8 p-4 flex flex-wrap justify-center gap-3"
        >
          <p id="board-hint" className="text-[#A29AE3] italic">
            Glisse les cartes ici dans le bon ordre chronologique 📜
          </p>
        </div>

        <div
          id="cards"
          className="flex flex-wrap gap-4 justify-center w-full max-w-3xl"
        ></div>

        <div id="score" className="mt-8 text-lg font-semibold text-[#5533EA]">
          Événements placés : 0 / 6
        </div>
      </main>
    </div>
  )
}

export default TimeGame