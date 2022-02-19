import React, { useContext, useEffect } from 'react';
import { getPlayersIds } from '../../../SoccerConstants/SoccerPlayerIds';
import { PlayerPosition, SoccerContext } from '../../../SoccerHomePage';
import { SoccerPlayer, SoccerPlayers, useWikipediaBySoccerPlayer } from '../../../SoccerHooks/useWikipedia';
import { SelectedPlayerIndex } from '../SoccerBody';
import { motion, useAnimation } from 'framer-motion';

import './PlayerDetails.css';

export interface PlayerDetailsProps {
    player: SoccerPlayer;
    soccerPlayers: SoccerPlayers;
    selectedPlayerIndex: SelectedPlayerIndex;
    setSelectedPlayerindex: (indexes: SelectedPlayerIndex) => void;
}

export const PlayerDetails: React.FunctionComponent<PlayerDetailsProps> = (props) => {

    const soccerContext = useContext(SoccerContext);

    const playerWithAddInfo = useWikipediaBySoccerPlayer(props.player, props.player?.playerId.match('CS') ? props.soccerPlayers.currentSquad : props.soccerPlayers.recentCallUps);

    const selectedCountryPlayerIds = getPlayersIds(props.soccerPlayers);

    const handleNextPlayer = () => {
        if (soccerContext.selectedPlayerPosition === PlayerPosition.forward) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW + 1,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK})
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF + 1,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK
            })
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.defender) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF + 1,
                selectedGK: props.selectedPlayerIndex.selectedGK
            })
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK + 1
            })
        }
    }

    const handlePrevPlayer = () => {
        if (soccerContext.selectedPlayerPosition === PlayerPosition.forward) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW - 1,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK
            })
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF - 1,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK
            })
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.defender) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF - 1,
                selectedGK: props.selectedPlayerIndex.selectedGK
            })
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper) {
            props.setSelectedPlayerindex({
                selectedFW: props.selectedPlayerIndex.selectedFW,
                selectedMF: props.selectedPlayerIndex.selectedMF,
                selectedDF: props.selectedPlayerIndex.selectedDF,
                selectedGK: props.selectedPlayerIndex.selectedGK - 1
            })
        }
    }

    const isPrevButtonDisabled = () => {
        if (soccerContext.selectedPlayerPosition === PlayerPosition.forward && props.selectedPlayerIndex.selectedFW === 0) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder && props.selectedPlayerIndex.selectedMF === 0) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.defender && props.selectedPlayerIndex.selectedDF === 0) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper && props.selectedPlayerIndex.selectedGK === 0) {
            return true;
        }
        return false;
    }

    const isNextButtonDisabled = () => {
        if (soccerContext.selectedPlayerPosition === PlayerPosition.forward && props.selectedPlayerIndex.selectedFW === (selectedCountryPlayerIds.FW.length -1)) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.midFielder && props.selectedPlayerIndex.selectedMF === (selectedCountryPlayerIds.MF.length - 1)) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.defender && props.selectedPlayerIndex.selectedDF === (selectedCountryPlayerIds.DF.length - 1)) {
            return true;
        }
        if (soccerContext.selectedPlayerPosition === PlayerPosition.goalKeeper && props.selectedPlayerIndex.selectedGK === (selectedCountryPlayerIds.GK.length - 1)) {
            return true;
        }
        return false;
    }

    const dateOfBirth = new Date(parseInt(props.player?.dateOfBirth?.slice(0, 4) as string), parseInt(props.player?.dateOfBirth?.slice(5, 7) as string) - 1, parseInt(props.player?.dateOfBirth?.slice(8, 10) as string));

    const playerVariant = {
        convergeInfoFrom: {
            x: "1000px",
        },
        convergeInfoTo: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    }

    const playerDetailsControl = useAnimation();
    const playerImageControl = useAnimation();

    useEffect(() => {
        playerDetailsControl.start({
            x: ["1000px", "0px"],
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        });
        playerImageControl.start({
            scale: [0.1, 1],
            rotate: [180 , 0],
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        })
    }, [props.player])

    return (
        <>
            <div className='soccer-football-player'>
                <motion.div
                    className='soccer-player-image'
                    animate={playerImageControl}
                    whileHover={{
                        backgroundColor: 'honeydew'
                    }}>
                    {playerWithAddInfo.additionalInformation?.imagePath ?
                        <motion.img src={playerWithAddInfo.additionalInformation?.imagePath?.toString()}/>
                        : <img src={props.soccerPlayers.teamNationalLogo?.toString()} />}
                </motion.div>
                    <div className='soccer-player-details'>
                    <motion.h1
                        animate={playerDetailsControl}
                        whileHover={{
                            backgroundColor: 'honeydew'
                        }}>
                        {props.player?.playerName?.toUpperCase()}</motion.h1>
                    <motion.div className='soccer-player-details-section'
                        animate={playerDetailsControl}>
                        {
                            props.player ?
                                <motion.div
                                    whileHover={{
                                        backgroundColor: 'honeydew'
                                    }}>
                                    <div><span>Player Id </span><span>{props.player?.playerId}</span></div>
                                    <div><span>Full Name </span><span>{playerWithAddInfo.additionalInformation?.fullName || props.player?.playerName}</span></div>
                                    <div><span>Date Of Birth </span><span>{dateOfBirth.toDateString().slice(4)}</span></div>
                                    <div><span>Birth Place </span><span>{playerWithAddInfo.additionalInformation?.birthPlace}</span></div>
                                    <div><span>Player Height </span><span>{playerWithAddInfo.additionalInformation?.height}</span></div>
                                    <div><span>Position </span><span>{playerWithAddInfo.additionalInformation?.positions}</span></div>
                                    <div><span>Football Club </span><span>{props.player?.clubName} <img src={props.player?.clubNationFlag?.toString()} /></span></div>
                                    <div><span>International Matches </span><span>{props.player?.InternationlCarreer.matches}</span></div>
                                    <div><span>International Goals </span><span>{props.player?.InternationlCarreer.goals}</span></div>
                                </motion.div>
                                : <div>{'No Data Found'}</div>
                        }
                        </motion.div>
                    </div>
                <div className='soccer-player-details-navigation'>
                    <button disabled={isNextButtonDisabled()} onClick={() => {
                        handleNextPlayer();
                    }}>{'>>'}</button>
                    <button disabled={isPrevButtonDisabled()} onClick={() => {
                        handlePrevPlayer();
                    }}>{'<<'}</button>
                </div>
            </div>
        </>
    );
};