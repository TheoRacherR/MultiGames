import { buttonComponentColor, buttonComponentSize, buttonComponentType } from '../../../../../@types/default';
import { BattleshipContextInterface, gameStateEnum } from '../../../../../@types/battleship';
import { useContext } from 'react'
import ButtonComponent from 'components/ButtonComponent';
import { BattleshipContext } from 'utils/Context/BattleshipContext';
import { initShipPlacement } from 'utils/Battleship/BattleshipFunc';

const HeadLine = () => {
  const { gameState, setGameState, resetShipBoardPlayer, handleClickOnRandom, setShipPlacementPhase } = useContext(BattleshipContext) as BattleshipContextInterface;
  return (
    <div className="flex items-center justify-between mb-[18px] gap-[12px]">
      <div className="text-[28px] font-[700] uppercase text-[var(--color-primary-dark)] traking-[0.06em]">
        BATAILLE NAVALE
      </div>
      <div className="flex gap-[10px] items-center">
        {gameState === gameStateEnum.WATIING ? (
          <ButtonComponent
            text="Placer les bateaux"
            color={buttonComponentColor.NEUTRAL}
            size={buttonComponentSize.MEDIUM}
            type={buttonComponentType.INLINE}
            clickOn={() => {
              setGameState(gameStateEnum.SHIP_PLACEMENT);
              setShipPlacementPhase(initShipPlacement());
            }}
          />
        ) : (
            <></>
          )
        }
        {gameState === gameStateEnum.SHIP_PLACEMENT ? (
          <>
            <ButtonComponent
              text="Ok"
              color={buttonComponentColor.SUCCESS}
              size={buttonComponentSize.MEDIUM}
              type={buttonComponentType.INLINE}
              clickOn={() => {
                // TODO VALIDER et VERIFIER
                setGameState(gameStateEnum.SHIP_OK);
              }}
            />
            <ButtonComponent
              text="Annuler"
              color={buttonComponentColor.ERROR}
              size={buttonComponentSize.MEDIUM}
              type={buttonComponentType.INLINE}
              clickOn={() => {
                // TODO CANCEL
                setGameState(gameStateEnum.WATIING);
              }}
            />
          </>
        ) : (
            <></>
          )
        }
        {gameState === gameStateEnum.WATIING ? (
          <ButtonComponent
            text="Placer aléatoire"
            color={buttonComponentColor.INFO}
            size={buttonComponentSize.MEDIUM}
            type={buttonComponentType.INLINE}
            clickOn={() => {
              handleClickOnRandom();
              setGameState(gameStateEnum.SHIP_OK);
            }}
          />
        )
        : (
        <></>
        )}
        {gameState === gameStateEnum.SHIP_OK ? (
          <ButtonComponent
            text="Réinitialiser"
            color={buttonComponentColor.WARNING}
            size={buttonComponentSize.MEDIUM}
            type={buttonComponentType.INLINE}
            clickOn={() => {
              setGameState(gameStateEnum.WATIING);
              resetShipBoardPlayer()
            }}
          />
        )
        : (
        <></>
        )}
        {gameState === gameStateEnum.SHIP_OK ? (
          <ButtonComponent
            text="Jouer"
            color={buttonComponentColor.PRIMARY}
            size={buttonComponentSize.MEDIUM}
            type={buttonComponentType.INLINE}
            clickOn={() => {
              setGameState(gameStateEnum.ON_GAME);
            }}
          />
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}

export default HeadLine