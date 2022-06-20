import './App.css';
import React from 'react';
import FractionButton from './components/fractionButton';
import VagaboundPerson from './components/vagaboundPerson';
import PlayerField from './components/playerField';
import MapButton from './components/maps';
import TextField from '@mui/material/TextField';
import PlayerButton from './components/playerButton';

import {
  RootBasicFractions,
  RootRiverFolkFractions,
  RootDuchyFractions,
  RootBasicFractionNames,
  RootDuchyFractionNames,
  RootRiverFolfFractionNames,
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

  const [availableFractions, setAvailableFractions] = React.useState({});
  const [availableMaps, setAvailableMaps] = React.useState([]);
  const [availableDeck, setAvailableDecks] = React.useState([]);
  const [availableVagabounds, setAvailableVagabound] =
    React.useState(allVagabounds);
  const [availablePlayers, setAvailablePlayers] = React.useState([]);

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
        <Button variant="contained" color="success">
          Start!
        </Button>
      </div>
      <div clasName="ActualGame">
        <h1>Aktualne gry:</h1>
      </div>
      {JSON.stringify(availableFractions)}
      {JSON.stringify(availableMaps)}
      {JSON.stringify(availableDeck)}
      {JSON.stringify(availableVagabounds)}
      {JSON.stringify(availablePlayers)}

      <div clasName="Stats"></div>
      <div className="Current-Games"></div>
    </div>
  );
}

export default App;
