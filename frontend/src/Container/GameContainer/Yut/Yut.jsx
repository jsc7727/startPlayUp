import React from 'react';
import styled from 'styled-components';
import Yutfield from 'Component/GameComponent/Yut/Yutfield'
import YutPlayersSection from 'Component/GameComponent/Yut/YutPlayersSection';
import YutStore from './YutStore';
import YutAnimation from 'Component/GameComponent/Yut/YutAnimation'

const Yut = (props) => {
    const StyleDiv = styled.div`
        /* display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        margin: 10px;
        background: #FFFFF3;
        border-radius: 30px;
        padding: 30px; */

        /* Auto Layout */
        display: flex;
        flex-direction: column;
        padding: 50px;

        /* width: 1150px;
        height: 775px; */
        /* left: calc(50% - 1150px/2);
        top: calc(50% - 775px/2 + 35.5px); */
        justify-content: center;
        align-items: center;
        background: #FFFFF3;
        border-radius: 30px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    `;

    const Test = styled.div`
        display:flex;
        flex-direction: row;
    `;
    return (
        <StyleDiv>
            <YutStore >
                <Test>
                    <Yutfield />
                    <YutAnimation />
                </Test>
                <YutPlayersSection />
            </YutStore>
        </StyleDiv>
    )
}

export default Yut;
