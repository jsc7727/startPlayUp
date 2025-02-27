import React, { useEffect, useState, useContext } from "react";
import WebHeader from "./webHeader";
import FOOTER from "./webFooter";
import { useLocation } from "react-router-dom";
import {
  BodyFrame,
  Button,
  ButtonArea,
  ChattingList,
  MainList,
  Room,
  Title,
  TitleSpan,
  UserList,
  LeftButtonsArea,
  RightButtonsArea,
  WaitingUsers,
} from "../Style/WaitingRoomStyle";
import ChatComponent from "../../../ChatComponent";
import {
  PeersContext,
  PeerDataContext,
  RoomIdContext,
} from "../../../../Routes/peerStore";
import { useHistory } from "react-router";
import axios from "axios";
import { Background, Users } from "../Style/WebFrameStyle";
import PlayerList from "./PlayerList";
import { sendDataToPeers } from "Common/peerModule/sendToPeers";
import { GAME_START_SIGN, mappingTable } from "Constants/peerDataTypes";
import { getEnvIp } from "Common/envModule";

const WaitingRoom = ({ chatList, chatShow, setChatList }) => {
  const location = useLocation();
  const gameType = location.state.gameType;
  const roomTitle = location.state.roomTitle;
  const hostname = location.state.hostname;
  const fullNickname = localStorage.getItem("nickname");
  const [players, setPlayers] = useState([]);
  const { roomID, setRoomID } = useContext(RoomIdContext);
  const { peers } = useContext(PeersContext);
  const { peerData } = useContext(PeerDataContext);
  const history = useHistory();
  const nickname = (fullNickname) => {
    return fullNickname.substring(0, fullNickname.indexOf(" "));
  };

  const gameTypeChecker = () => {
    const state = {
      roomTitle: roomTitle,
      gameType: gameType,
      hostname,
    };
    console.log("gameType : " + gameType);
    switch (gameType) {
      case mappingTable.YUT.game:
        history.push({
          pathname: mappingTable.YUT.path,
          state,
        });
        break;
      case mappingTable.YACHT.game:
        history.push({
          pathname: mappingTable.YACHT.path,
          state,
        });
        break;
      case mappingTable.AVALON.game:
        history.push({
          pathname: mappingTable.AVALON.path,
          state,
        });
        break;
      case mappingTable.MINE_SEARCH.game:
        history.push({
          pathname: mappingTable.MINE_SEARCH.path,
          state,
        });
        break;
      default:
        alert("error");
    }
  };
  const gameStart = () => {
    console.log(gameType);
    sendDataToPeers(GAME_START_SIGN, {
      game: null,
      nickname: localStorage.getItem("nickname"),
      peers,
      data: null,
    });
    console.log("waiting room hostname : ", hostname);
    gameTypeChecker();
  };
  //게임 시작 버튼
  useEffect(() => {
    if (peerData.type === GAME_START_SIGN) {
      console.log("waiting room hostname : ", hostname);
      gameTypeChecker();
    }
  }, [peerData]);

  //peer 통신으로 연결된 사람들 확인하기
  useEffect(() => {
    console.log("peers");
    console.log(peers[0]);
    console.log(
      "changeReady : ",
      peers.every((p) => {
        p.nickname.split(" ").length === 2;
      })
    );
  }, [peers]);

  return (
    <BodyFrame>
      <Background />
      <Room>
        <Title>
          <TitleSpan fontSize={"18px"} color={"red"}>
            {gameType}
          </TitleSpan>
          <TitleSpan fontSize={"22px"} color={"black"}>
            {roomTitle}
          </TitleSpan>
        </Title>
        <hr />
        <ButtonArea>
          <LeftButtonsArea>
            <Button onClick={gameStart}>시작</Button>
          </LeftButtonsArea>
          <RightButtonsArea>
            {peers.every((p) => {
              return p.nickname.split(" ").length === 2;
            }) && (
              <Button
                test={true}
                margin={"0"}
                onClick={() => {
                  setRoomID({ ...roomID, id: "", state: false });
                  history.push("/main");
                }}
              >
                나가기
              </Button>
            )}
          </RightButtonsArea>
        </ButtonArea>
        <MainList>
          <WaitingUsers>
            {/*{guestList.map((user, index) => (*/}
            {/*    <UserList key={index}>*/}
            {/*        <Users>{user}</Users>*/}
            {/*    </UserList>*/}
            {/*))}*/}
            <UserList>
              <Users>{nickname(fullNickname)}</Users>
            </UserList>
            {peers.map((player, index) => (
              <UserList key={index}>
                <Users>{nickname(player.nickname)}</Users>
              </UserList>
            ))}
          </WaitingUsers>
          <ChattingList>
            <ChatComponent chatList={chatList} setChatList={setChatList} />
          </ChattingList>
        </MainList>
      </Room>
    </BodyFrame>
  );
};
export default WaitingRoom;
