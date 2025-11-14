import { FormatedScoreboard } from '../../../@types/games'

const Ranking = ({data}: {data: FormatedScoreboard[]}) => {
  return (
    <div className="p-4 bg-[var(--color-surface)] rounded-[12px] border-[1px] border-[var(--color-border)] shadow-[0 8px 20px rgba(86,68,202,0.06)pap]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-bold text-[#5533EA]">
          Classement mondial
        </div>
        <div className="text-sm text-[#6B5BEA]">Top joueurs</div>
      </div>

      <table
        className="w-full leaderboard"
        aria-label="Classement des meilleurs joueurs"
      >
        <thead>
          <tr>
            <th className="text-left font-[700] text-[var(--color-primary-dark)]">
              #
            </th>
            <th className="text-left font-[700] text-[var(--color-primary-dark)]">
              Joueur
            </th>
            <th className="text-left font-[700] text-[var(--color-primary-dark)]">
              Score
            </th>
            {/* <th>Date</th> */}
          </tr>
        </thead>
        <tbody id="leaderboardBody">
          {data.map((item, index) => (
            <tr>
              <td className="py-2 font-semibold p-[12px 10px]">
                ${index + 1}
              </td>
              <td className="py-2 p-[12px 10px]">
                {item.user.pseudo}
              </td>
              <td className="py-2 font-semibold text-[#5533EA] p-[12px 10px]">
                ${item.score}
              </td>
              {/* <td className="py-2 text-sm text-[#6B5BEA]">${item.}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-[#6B5BEA]">
          Dernière mise à jour : <span id="lastUpdate">—</span>
        </div>
      </div>
    </div>
  )
}

export default Ranking