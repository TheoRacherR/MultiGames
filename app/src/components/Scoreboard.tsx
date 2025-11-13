import { countryObject } from "utils/Default/Default";
import { useEffect } from "react";
import { FormatedScoreboard } from "../@types/games";
import { Link } from "react-router-dom";

const Scoreboard = ({ data }: { data: FormatedScoreboard[] }) => {
  useEffect(() => console.log(data), []);

  return (
      <table className="w-full">
        <thead style={{ backgroundColor: 'var(--color-text-muted)' }}>
          <tr>
            <td className='w-1/5 font-bold p-[16px] rounded-tl-[10px]'>Position</td>
            <td className="font-bold p-[16px]">Pays</td>
            <td className="font-bold p-[16px]">Nom</td>
            <td className="font-bold p-[16px] rounded-tr-[10px]">Score</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ backgroundColor: `${index % 2 === 0 ? 'var(--text-primary)' : 'var(--color-light-grey)'}` }}>
              <td className="p-[16px]" style={{borderBottomLeftRadius: `${index === data.length-1 ? 10 : 0}px`}}>{index + 1}</td>
              <td className="p-[16px]">{countryObject[item.user.country].flag}</td>
              <td className="p-[16px]"><Link to={`/user/${item.user.id}`}>{item.user.pseudo}</Link></td>
              <td className="p-[16px]" style={{borderBottomRightRadius: `${index === data.length-1 ? 10 : 0}px`}}>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Scoreboard;
