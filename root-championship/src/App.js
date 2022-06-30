import './App.css';
import React from 'react';
import FractionButton from './components/fractionButton';
import VagaboundPerson from './components/vagaboundPerson';
import PlayerField from './components/playerField';
import MapButton from './components/maps';
import PlayerButton from './components/playerButton';
import DenseTable from './components/tableContent';
import ReplayIcon from '@mui/icons-material/Replay';

import {
  RootBasicFractions,
  RootRiverFolkFractions,
  RootDuchyFractions,
  RootMapForest,
  RootMapLake,
  RootMapMountain,
  RootMapWinter,
  BasicDeck,
  BanditDeck,
  VagaboundCharacterBasicTinker,
  VagaboundCharacterBasicRanger,
  VagaboundCharacterBasicThief,
  VagaboundCharacterArbiter,
  VagaboundCharacterScoundel,
  VagaboundCharacterVagrant,
  VagaboundCharacterAdventuer,
  VagaboundCharacterRoning,
  VagaboundCharactecHarier,
  PlayerRange,
} from './config/config_fractions';
import { Button } from '@mui/material';

function App() {
  const allVagabounds = [
    VagaboundCharacterBasicTinker,
    VagaboundCharacterBasicRanger,
    VagaboundCharacterBasicThief,
    VagaboundCharacterArbiter,
    VagaboundCharacterScoundel,
    VagaboundCharacterVagrant,
    VagaboundCharacterAdventuer,
    VagaboundCharacterRoning,
    VagaboundCharactecHarier,
  ];

  const [availableFractions, setAvailableFractions] =
    React.useState(RootBasicFractions);
  const [availableMaps, setAvailableMaps] = React.useState(['Forest']);
  const [availableDeck, setAvailableDecks] = React.useState(['Podstawa']);
  const [availableVagabounds, setAvailableVagabound] =
    React.useState(allVagabounds);
  const [availablePlayers, setAvailablePlayers] = React.useState([1, 2, 3]);
  const [isGameReady, setIsGameReady] = React.useState(false);

  const [randomMap, setRandomMap] = React.useState(null);
  const [randomDeck, setRandomDeck] = React.useState(null);
  const [players, setPlayers] = React.useState(null);

  React.useEffect(() => {
    console.log(isGameReady);

    // if (isGameReady) {
    // setIsGameReady(false);
    // }
    console.log(randomMap);
    if (players) {
      setPlayers([]);
    }
    // setRandomMap([]);
    // setPlayers([]);
  });

  function manageAvailableFractions(fractions) {
    if (Object.keys(fractions)[0] in availableFractions) {
      let newFractions = { ...availableFractions };
      for (const fractionKey of Object.keys(fractions)) {
        delete newFractions[fractionKey];
      }

      setAvailableFractions(newFractions);
    } else {
      setAvailableFractions({ ...availableFractions, ...fractions });
    }
  }

  function manageAvailableMaps(map) {
    if (availableMaps.includes(map)) {
      const newMaps = availableMaps;
      setAvailableMaps(newMaps.filter((newMap) => newMap !== map));
    } else {
      setAvailableMaps([...availableMaps, map]);
    }
  }

  function manageAvailableDeck(deck) {
    if (availableDeck.includes(deck)) {
      const newDecks = availableDeck;
      setAvailableDecks(newDecks.filter((newDeck) => newDeck !== deck));
    } else {
      setAvailableDecks([...availableDeck, deck]);
    }
  }

  function manageAvailableVagaBoundPerson(vagabound) {
    if (availableVagabounds.includes(vagabound)) {
      const deleteVagabound = availableVagabounds;

      setAvailableVagabound(
        deleteVagabound.filter((RMvagabound) => RMvagabound !== vagabound)
      );
    } else {
      setAvailableVagabound([...availableVagabounds, vagabound]);
    }
  }

  function deleteAvailablePlayers(player) {
    if (availablePlayers.includes(player)) {
      const deletePlayer = availablePlayers;
      setAvailablePlayers(
        deletePlayer.filter((RMPlayer) => RMPlayer !== player)
      );
    }
  }

  function addAvailablePlayers(player) {
    if (availablePlayers.includes(player)) {
      alert('Taki gracz już istnieje');
    } else {
      setAvailablePlayers([...availablePlayers, player]);
    }
  }

  function clearPlayers() {
    setAvailablePlayers([]);
  }

  function assigneFractionToPlayer(lenghtFractions) {
    let PlayerRangeValue = PlayerRange[availablePlayers.length];
    let tempPlayerRangeValue = PlayerRangeValue;
    let numberOfTries = 0;

    while (numberOfTries < 100) {
      let tempAvailableFractions = Object.assign({}, availableFractions);
      let FractionAndPlayer = {};
      let tempLenght = lenghtFractions;
      numberOfTries++;
      for (const player of availablePlayers) {
        let random_fraction = recursiveRandomVg(
          tempAvailableFractions,
          tempLenght
        );
        let range_fraction = tempAvailableFractions[random_fraction];
        tempPlayerRangeValue -= range_fraction;

        FractionAndPlayer[player] = random_fraction;
        tempLenght -= 1;
        delete tempAvailableFractions[random_fraction];
      }

      if (tempPlayerRangeValue <= 0) {
        return assigneVagaboundType(FractionAndPlayer);
      } else {
        tempPlayerRangeValue = PlayerRangeValue;
        FractionAndPlayer = {};
      }
    }
  }

  function recursiveRandomVg(tempAvailableFractions, tempLenght) {
    let randomFraction = Object.keys(tempAvailableFractions)[
      Math.floor(Math.random() * tempLenght)
    ];
    if (randomFraction.includes('Vagab') && availableVagabounds.length == 0) {
      return recursiveRandomVg(tempAvailableFractions, tempLenght);
    }
    return randomFraction;
  }

  // function assig

  function assigneVagaboundType(playerAndFractions) {
    for (const vagabound of Object.keys(playerAndFractions)) {
      if (playerAndFractions[vagabound].includes('Vaga')) {
        let vagaboundType =
          availableVagabounds[
            Math.floor(Math.random() * availableVagabounds.length)
          ];
        delete availableVagabounds[vagaboundType];

        let vaga = playerAndFractions[vagabound] + ' ' + vagaboundType;
        playerAndFractions[vagabound] = vaga;
      }
    }
    return playerAndFractions;
  }

  function setupGame() {
    let lenghtFractions = Object.keys(availableFractions).length;
    if (availableMaps.length == 0) {
      alert('Prosze wybierz na jakich mapach chcesz grać');
      return;
    }
    if (lenghtFractions == 0) {
      alert(
        'Prosze wybierz na jakich dodatkach i czy na podstawie chcesz grać'
      );
      return;
    }
    if (availableDeck.length == 0) {
      alert('Prosze wybierz na jakich deckach chcesz grać');
      return;
    }
    if (lenghtFractions < availablePlayers.length) {
      alert('Wybrano za mało frakcji dla takiej ilości graczy');
      return;
    }
    // clearPlayers();
    let playerAndFraction = assigneFractionToPlayer(lenghtFractions);
    let randomMap =
      availableMaps[Math.floor(Math.random() * availableMaps.length)];
    let randomDeck =
      availableDeck[Math.floor(Math.random() * availableDeck.length)];
    setRandomDeck(randomDeck);
    setRandomMap(randomMap);
    setPlayers(playerAndFraction);
    setIsGameReady(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {' '}
        <h1>ROOT SZYBKI SETUP </h1>
      </header>
      <div clasName="Welcome-baner">
        <header className="Welcome-baner">
          <h2></h2>
        </header>
      </div>

      <div className="Settings">
        <h1>Frakcje</h1>
        <FractionButton
          name="Root Podstawa"
          addFractions={() => manageAvailableFractions(RootBasicFractions)}
        />
        <FractionButton
          name="Root Plemiona Rzeczne"
          addFractions={() => manageAvailableFractions(RootRiverFolkFractions)}
        />
        <FractionButton
          name="Root Podziemia"
          addFractions={() => manageAvailableFractions(RootDuchyFractions)}
        />
        <h1>Mapa</h1>

        <MapButton
          name={RootMapForest}
          addMaps={() => manageAvailableMaps(RootMapForest)}
        />
        <MapButton
          name={RootMapWinter}
          addMaps={() => manageAvailableMaps(RootMapWinter)}
        />
        <MapButton
          name={RootMapLake}
          addMaps={() => manageAvailableMaps(RootMapLake)}
        />
        <MapButton
          name={RootMapMountain}
          addMaps={() => manageAvailableMaps(RootMapMountain)}
        />
        <h1>Decki</h1>

        <FractionButton
          name={BasicDeck}
          addFractions={() => manageAvailableDeck(BasicDeck)}
        />
        <FractionButton
          name={BanditDeck}
          addFractions={() => manageAvailableDeck(BanditDeck)}
        />

        <h1>Postacie szopa</h1>
        {allVagabounds.map((vagabound) => (
          <VagaboundPerson
            name={vagabound}
            setVagabound={() => manageAvailableVagaBoundPerson(vagabound)}
          />
        ))}
      </div>

      <div className="Players">
        <h1>Dodaj gracza</h1>
        <PlayerField addPlayer={addAvailablePlayers}></PlayerField>
        <h1>Dodani gracze:</h1>
        {availablePlayers.map((player) => (
          <PlayerButton
            name={player}
            addPlayer={() => deleteAvailablePlayers(player)}
          />
        ))}
        <Button variant="contained" color="success" onClick={() => setupGame()}>
          Start!
        </Button>
      </div>
      <div clasName="ActualGame">
        <h1>Aktualne gry:</h1>
        {isGameReady ? (
          <DenseTable map={randomMap} deck={randomDeck} players={players} />
        ) : null}{' '}
        {isGameReady ? (
          <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            onClick={() => setupGame()}
          />
        ) : null}{' '}
      </div>
    </div>
  );
}

export default App;
