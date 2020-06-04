"use-es6";

import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_ALL_MOVIES,
  GET_ALL_SPECIES,
  GET_ALL_CHARACTERS,
  GET_ALL_V_S,
} from "../graphql/GetSWInfo";
import {
  MovieSearch,
  CharacterSearch,
  VehicleSearch,
  SpeciesSearch,
} from "../Components/SearchComponents";
import {
  CharacterCard,
  MovieCard,
  VehicleCard,
  SpeciesCard,
} from "../Components/DataCards";
import { Grid } from "@material-ui/core";

export function SpeciesDataContainer(props) {
  const [species, setSpecies] = useState(null);
  const [currentSpecies, setCurrentSpecies] = useState(null);
  const [correspondingItem, setCorrespondingItem] = useState(null);
  const shouldSkip = species !== null && species !== undefined;
  const { data = {}, loading, error } = useQuery(GET_ALL_SPECIES, {
    skip: shouldSkip,
  });
  if (data.allSpecies && (species === null || species === undefined)) {
    setSpecies(data.allSpecies);
  }
  return (
    <div>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <h1 style={{ color: "white" }}>Species</h1>
        </Grid>
        <Grid item md={12}>
          {!loading && species && (
            <SpeciesSearch
              species={species}
              onChange={setCurrentSpecies}
              updateItem={setCorrespondingItem}
            />
          )}
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
        style={{ paddingTop: 24 }}
      >
        <Grid item>
          {!loading && currentSpecies && (
            <Grid container direction="row" justify="center">
              <Grid item style={{ paddingRight: 32 }}>
                <SpeciesCard
                  species={currentSpecies}
                  setCorrespondingItem={setCorrespondingItem}
                />
              </Grid>
              <Grid item>
                {!loading &&
                  correspondingItem &&
                  getCorrespondingCard(correspondingItem)}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export function MoviesDataContainer(props) {
  const [movies, setMovies] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [correspondingCharacter, setCorrespondingCharacter] = useState(null);
  const shouldSkip = movies !== null && movies !== undefined;
  const { data = {}, loading, error } = useQuery(GET_ALL_MOVIES, {
    skip: shouldSkip,
  });
  if (data.allFilms && (movies === null || movies === undefined)) {
    setMovies(data.allFilms);
  }

  return (
    <div>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <h1 style={{ color: "white" }}>Films</h1>
        </Grid>
        <Grid item md={12}>
          {!loading && movies && (
            <MovieSearch
              movies={movies}
              onChange={setCurrentMovie}
              updateCharacter={setCorrespondingCharacter}
              style={{ display: "flex", justifyContent: "center" }}
            />
          )}
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
        style={{ paddingTop: 24 }}
      >
        <Grid item>
          {!loading && currentMovie && (
            <Grid container direction="row" justify="center">
              <Grid item style={{ paddingRight: 32 }}>
                <MovieCard
                  movie={currentMovie}
                  setCorrespondingCharacter={setCorrespondingCharacter}
                />
              </Grid>
              {!loading && correspondingCharacter && (
                <Grid item>
                  <CharacterCard
                    character={correspondingCharacter}
                    setCorrespondingMovie={null}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export function CharactersDataContainer(props) {
  const [characters, setCharacters] = useState(null);
  const [currentCharater, setCurrentCharacter] = useState(null);
  const [correspondingMovie, setCorrespondingMovie] = useState(null);
  const shouldSkip = characters !== null && characters !== undefined;
  const { data = {}, loading, error } = useQuery(GET_ALL_CHARACTERS, {
    skip: shouldSkip,
  });
  if (data.allPersons && (characters === null || characters === undefined)) {
    setCharacters(data.allPersons);
  }

  return (
    <div>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <h1 style={{ color: "white" }}>Characters</h1>
        </Grid>
        <Grid item md={12}>
          {!loading && characters && (
            <CharacterSearch
              characters={characters}
              onChange={setCurrentCharacter}
              updateMovie={setCorrespondingMovie}
            />
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
        style={{ paddingTop: 24 }}
      >
        <Grid item>
          {!loading && currentCharater && (
            <Grid container direction="row" justify="center">
              <Grid item style={{ paddingRight: 32 }}>
                <CharacterCard
                  character={currentCharater}
                  setCorrespondingMovie={setCorrespondingMovie}
                />
              </Grid>
              {!loading && correspondingMovie && (
                <Grid item>
                  <MovieCard
                    movie={correspondingMovie}
                    setCorrespondingCharacter={null}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export function VehiclesDataContainer(props) {
  const [vehicles, setVehicles] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [correspondingItem, setCorrespondingItem] = useState(null);
  const shouldSkip = vehicles !== null && vehicles !== undefined;
  const { data = {}, loading, error } = useQuery(GET_ALL_V_S, {
    skip: shouldSkip,
  });
  if (data.allVehicles && (vehicles === null || vehicles === undefined)) {
    setVehicles(data.allVehicles.concat(data.allStarships));
  }
  return (
    <div>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <h1 style={{ color: "white" }}>Vehicles and Starships</h1>
        </Grid>
        <Grid item md={12}>
          {!loading && vehicles && (
            <VehicleSearch
              vehicles={vehicles}
              onChange={setCurrentVehicle}
              updateItem={setCorrespondingItem}
            />
          )}
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
        style={{ paddingTop: 24 }}
      >
        <Grid item>
          {!loading && currentVehicle && (
            <Grid container direction="row" justify="center">
              <Grid item style={{ paddingRight: 32 }}>
                <VehicleCard
                  vehicle={currentVehicle}
                  useVehicle={currentVehicle.__typename === "Vehicle"}
                  setCorrespondingItem={setCorrespondingItem}
                />
              </Grid>
              <Grid item>
                {!loading &&
                  correspondingItem &&
                  getCorrespondingCard(correspondingItem)}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function getCorrespondingCard(item) {
  if (item.__typename === "Film") {
    return (
      <Grid item>
        <MovieCard movie={item} setCorrespondingCharacter={null} />
      </Grid>
    );
  } else {
    return (
      <Grid item>
        <CharacterCard character={item} setCorrespondingMovie={null} />
      </Grid>
    );
  }
}
