import React, { useContext, useState } from "react";
import { animated, useSpring, config } from "react-spring";
import { FRAME_MAIN, GameContext, MAIN_VOTE, voteStageColor } from "../Store";
import * as S from "../Styled";
import MerlinPlayer from "../Ability/MerlinPlayer";
import PercivalPlayer from "../Ability/PercivalPlayer";
import {
  SET_COMPONENT,
  VOTE_CHECK,
  WAITING_FRAME,
} from "../MVC/AVALON_Reducer";
import CoinFlip from "../animation/Coin_Flip";
import PlayerRoles from "../animation/PlayerRoles";
import AVALON_TIMER from "./Timer";
import { PeersContext } from "../../../../Routes/peerStore";

const FrontInformation = animated(S.StageFrame);
const BackInformation = animated(S.Info);

function MAIN_FRAME() {
  const { gameState, dispatch, timeOver } = useContext(GameContext);
  const { peers } = useContext(PeersContext);
  const [click, setClick] = useState(false);
  const [role, setRole] = useState("");
  const colors = voteStageColor.slice(gameState.voteStage, 5);
  const nickname = localStorage.getItem("nickname");

  const [isFlipped, setIsFlipped] = useState(false);

  const { opacity, transform } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `rotateY(${isFlipped ? 0 : 180}deg)`,
  });

  const representButtonOnClick = () => {
    dispatch({
      type: SET_COMPONENT,
      component:
        gameState.usingPlayers[gameState.represent].nickname === nickname
          ? MAIN_VOTE
          : WAITING_FRAME,
    });
  };

  const UserInterFaceOnClick = () => {
    gameState.usingPlayers.map((user) => {
      user.nickname === nickname && setRole(user.role);
    });
    setIsFlipped((prevState) => !prevState);
    setClick(!click);
  };

  return (
    <S.RowFrame>
      <S.GameFrame>
        <AVALON_TIMER
          minutes={0}
          seconds={3}
          callDispatch={representButtonOnClick}
        />
        <S.StageFrame>
          {gameState.takeStage.map((stage, index) => (
            <S.Stage key={index}>
              {typeof stage === "number" ? (
                <div>{stage}</div>
              ) : stage === "o" ? (
                // <S.SuccessImageToken />
                <CoinFlip value={"angels"} />
              ) : (
                <CoinFlip value={"evils"} />
              )}
            </S.Stage>
          ))}
        </S.StageFrame>
        <S.MainVoteFrame>
          {colors.map((color, index) => (
            <S.Circle color={color} key={index}>
              {index + 1}
            </S.Circle>
          ))}
        </S.MainVoteFrame>
      </S.GameFrame>
      <S.PlayerFrame>
        {!click ? (
          <FrontInformation
            style={{
              opacity: opacity.interpolate((o) => 1 - o),
              transform: transform.interpolate(
                (t) => `perspective(500px)  ${t}  rotateY(180deg)`
              ),
            }}
          >
            {gameState.usingPlayers.map((user, index) => (
              <S.User key={index}>
                <ul>
                  <li>{`nickname : ${user.nickname}`}</li>
                </ul>
              </S.User>
            ))}
            {gameState.usingPlayers.filter(
              (element) => nickname === element.nickname
            ) && (
              <S.User>
                <ul>
                  <li>{`nickname: ${nickname}`}</li>
                  <br />
                  {role === "Merlin" && <MerlinPlayer />}
                  {role === "Percival" && <PercivalPlayer />}
                </ul>
                {gameState.usingPlayers[gameState.represent].nickname ===
                  nickname && (
                  <div>
                    <button onClick={representButtonOnClick}>
                      원정 인원 정하기
                    </button>
                  </div>
                )}
              </S.User>
            )}
          </FrontInformation>
        ) : (
          <BackInformation style={{ opacity, transform }}>
            <PlayerRoles nickname={nickname} role={role} />
          </BackInformation>
        )}
        <S.ButtonAnimation />
        <S.Button onClick={UserInterFaceOnClick}>플레이어 정보</S.Button>
      </S.PlayerFrame>
    </S.RowFrame>
  );
}

export default MAIN_FRAME;
