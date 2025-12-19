import React from 'react'

const Informations = () => {
  return (
    <aside className="flex-[1]  bg-[#FBF9FF] p-4 rounded-lg border border-[#EDE9FF] text-[#5533EA]">
      <h3 className="font-bold mb-2">Instructions</h3>
      <ul className="text-sm space-y-2 mb-4">
        <li>• Clic gauche : révéler une case.</li>
        <li>• Clic droit : placer/enlever un drapeau.</li>
        <li>• Le minuteur démarre au premier clic.</li>
        <li>• Trouve toutes les cases sans mines pour gagner.</li>
      </ul>

      <div className="mb-4">
        <h4 className="font-semibold">Statistiques</h4>
        <div className="text-sm mt-2">
          Temps écoulé :{" "}
          <span id="elapsed" className="font-medium">
            00:00
          </span>
        </div>
        <div className="text-sm">
          Mines :{" "}
          <span id="mineCount" className="font-medium">
            0
          </span>
        </div>
        <div className="text-sm">
          Cases restantes :{" "}
          <span id="cellsLeft" className="font-medium">
            0
          </span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Légende</h4>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 cell unrevealed inline-grid place-items-center rounded-md">
            {" "}
          </div>
          <div className="text-sm">Non révélé</div>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 cell revealed inline-grid place-items-center rounded-md bg-white border">
            1
          </div>
          <div className="text-sm">Chiffre = mines adjacentes</div>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-md inline-grid place-items-center bg-[#FFF5F7] text-[#E53935]">
            ⚑
          </div>
          <div className="text-sm">Drapeau</div>
        </div>
      </div>
    </aside>
  )
}

export default Informations