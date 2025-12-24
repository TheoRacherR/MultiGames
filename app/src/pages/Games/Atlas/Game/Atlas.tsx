import { categoryLine, countryInterface, finalScoreInterface } from '../../../../@types/atlas';
import { useEffect, useState } from 'react'
import CategCountryModalEndGame from './AtlasModalEndGame';
import { country, UserInfos, userRole, userStatus } from '../../../../@types/user';
import { getUserInfos } from 'utils/Default/Auth';
import axios from 'utils/Default/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Category from './Components/Category';
import { categories, countries } from 'utils/Atlas/Atlas';
import { checkIfGameIsEnded, getCountryRank, initCategories, initRandomCountry } from 'utils/Atlas/AtlasFunc';

const Atlas = () => {
  const navigate = useNavigate();
  const [finalScore, setFinalScore] = useState<finalScoreInterface>({
    end: false,
    open: false,
    listEnd: [],
  });
  const [userInfos, setUserInfos] = useState<UserInfos>({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    pseudo: "",
    role: userRole.USER,
    status: userStatus.TO_ACTIVE,
    country: country.FRANCE,
  });

  const [countryRandomed, setCountryRandomed] = useState<countryInterface | null>(null)
  const [categoriesToSelect, setCategoriesToSelect] = useState<categoryLine[]>([]);
  
  const endGame = async () => {
    console.log("end");
    setFinalScore({
      end: true,
      open: true,
      listEnd: categoriesToSelect,
    });
    try {
      // const userInfosRequest = await getUserInfos();
      // setUserInfos(userInfosRequest);
      // if (userInfosRequest) {
      //   await axios.post("/categcountry", {
      //     score: middleBoard.length - 1,
      //     player: userInfosRequest.id,
      //   });
      // }
    } catch (e) {
      return navigate("auth");
    }
  };

  const resetGame = () => {
    setCategoriesToSelect(initCategories(categories));
  }

  const getNewRandomCountry = () => {
    setTimeout(() => {
      setCountryRandomed(initRandomCountry(countries));
    }, 1000);
  }

  const handleSelectCateg = (categID : number) => {
    const indexCategory = categoriesToSelect.indexOf(categoriesToSelect.filter(cts => cts.category.id === categID)[0]);
    let categoriesToSelectTemp = [...categoriesToSelect];
    if(countryRandomed) {
      const rank = getCountryRank(countryRandomed.id, categoriesToSelectTemp[indexCategory].category.type, categories);
      categoriesToSelectTemp[indexCategory] = {
        ...categoriesToSelectTemp[indexCategory],
        countrySelected: countryRandomed,
        rank: rank,
      }
      setCategoriesToSelect(categoriesToSelectTemp)
    }
  }

  useEffect(() => {
    if(categoriesToSelect.length > 0 && checkIfGameIsEnded(categoriesToSelect)) {
      setTimeout(() => {
        endGame();
      }, 1000)
    }
    else {
      setCountryRandomed(null);
      getNewRandomCountry();
    }
  }, [categoriesToSelect])

  useEffect(() => {
    resetGame();
    getNewRandomCountry();
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center p-10">
      <main className="bg-white text-[#5533EA] rounded-2xl shadow-xl p-8 w-full max-w-5xl flex flex-col items-center">
        <div className='flex justify-between w-full'>
          <h2 className="text-3xl font-bold uppercase mb-6">
            🌍 Atlas
          </h2>
          <div className='text-center mb-2'>
            <p className='text-6xl'>{countryRandomed ? countryRandomed.icon : '--'}</p>
            <p className='text-3xl'>{countryRandomed ? countryRandomed.name : '-----'}</p>
          </div>
          <div className='text-2xl'>Score: {categoriesToSelect.filter(cts => cts.countrySelected).reduce((a: number, b: categoryLine) => a + (b.rank > 99 ? 100 : b.rank), 0)}</div>
        </div>
        <div>
          {categoriesToSelect.map((item, index) => (
            <Category key={`category_${index}`} infos={item} clickable={item.countrySelected && !countryRandomed ? false : true} click={handleSelectCateg}/>
          ))}
        </div>

      </main>
      {finalScore.open ? (
        <CategCountryModalEndGame
          finalScore={finalScore}
          setFinalScore={setFinalScore}
          resetPage={resetGame}
          userInfos={userInfos}
        />
      ) : (
        <></>
      )}
      </div>
  )
}

export default Atlas