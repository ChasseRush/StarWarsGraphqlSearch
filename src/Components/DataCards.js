import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_CHARACTER,
  GET_MOVIE,
  GET_VEHICLE_OR_STARSHIP,
  GET_SPECIES,
  getSpecificQuery,
} from "../graphql/GetSWInfo";
import {
  CharacterCardContent,
  MovieCardContent,
  VehicleCardContent,
  SpeciesCardContent,
} from "./CardContents";

export function DataCard(props) {
  const query = getSpecificQuery(props.item.__typename);
  const comp = getCardContentComponent(props.item, query);
  /* const [item, setItem] = useState(null);
  const shouldSkip = item !== null && item !== undefined;
  if (
    shouldSkip &&
    (item.name !== props.item.name || item.title !== props.item.title)
  ) {
    setItem(null);
  }
  let name = props.item.name;
  if (props.item.title) {
    name = props.item.title;
  }
  const { data = {}, loading, error } = useQuery(query, {
    skip: shouldSkip,
    variables: { name: name },
  });*/
  return <div>{comp}</div>;
}

export function CharacterCard(props) {
  const [character, setCharacter] = useState(null);
  const shouldSkip = character !== null && character !== undefined;
  if (shouldSkip && character.name !== props.character.name) {
    setCharacter(null);
  }
  const { data = {}, loading, error } = useQuery(GET_CHARACTER, {
    skip: shouldSkip,
    variables: { name: props.character.name },
  });
  if (data.Person && (character === null || character === undefined)) {
    setCharacter(data.Person);
  }
  console.log(data);
  return (
    <div>
      {!loading && character && (
        <CharacterCardContent
          character={character}
          setCorrespondingMovie={props.setCorrespondingMovie}
        />
      )}
    </div>
  );
}

export function MovieCard(props) {
  const [movie, setMovie] = useState(null);
  const shouldSkip = movie !== null && movie !== undefined;
  if (shouldSkip && movie.title !== props.movie.title) {
    setMovie(null);
  }
  const { data = {}, loading, error } = useQuery(GET_MOVIE, {
    skip: shouldSkip,
    variables: { name: props.movie.title },
  });
  if (data.Film && (movie === null || movie === undefined)) {
    setMovie(data.Film);
  }
  console.log(data);
  return (
    <div>
      {!loading && movie && (
        <MovieCardContent
          movie={movie}
          setCorrespondingCharacter={props.setCorrespondingCharacter}
        />
      )}
    </div>
  );
}

export function VehicleCard(props) {
  const [vehicle, setVehicle] = useState(null);
  const shouldSkip = vehicle !== null && vehicle !== undefined;
  if (shouldSkip && vehicle.name !== props.vehicle.name) {
    setVehicle(null);
  }
  const { data = {}, loading, error } = useQuery(GET_VEHICLE_OR_STARSHIP, {
    skip: shouldSkip,
    variables: {
      name: props.vehicle.name,
      useVehicle: props.useVehicle,
      useStarship: !props.useVehicle,
    },
  });
  if (
    props.useVehicle &&
    data.Vehicle &&
    (vehicle === null || vehicle === undefined)
  ) {
    setVehicle(data.Vehicle);
  } else if (
    !props.useVehicle &&
    data.Starship &&
    (vehicle === null || vehicle === undefined)
  ) {
    setVehicle(data.Starship);
  }
  console.log(data);
  return (
    <div>
      {!loading && vehicle && (
        <VehicleCardContent
          vehicle={vehicle}
          setCorrespondingItem={props.setCorrespondingItem}
        />
      )}
    </div>
  );
}

export function SpeciesCard(props) {
  const [species, setSpecies] = useState(null);
  const shouldSkip = species !== null && species !== undefined;
  if (shouldSkip && species.name !== props.species.name) {
    setSpecies(null);
  }
  const { data = {}, loading, error } = useQuery(GET_SPECIES, {
    skip: shouldSkip,
    variables: { name: props.species.name },
  });
  if (data.Species && (species === null || species === undefined)) {
    setSpecies(data.Species);
  }
  console.log(data);
  return (
    <div>
      {!loading && species && (
        <SpeciesCardContent
          species={species}
          setCorrespondingItem={props.setCorrespondingItem}
        />
      )}
    </div>
  );
}

function getCardContentComponent(item, query) {
  const typename = item.__typename;
  if (typename === "Film") {
    return <MovieCardContent movie={item} query={query} />;
  } else if (typename === "Person") {
    return <CharacterCardContent character={item} query={query} />;
  } else if (typename === "Species") {
    return <SpeciesCardContent species={item} query={query} />;
  } else if (typename === "Vehicle" || typename === "Starship") {
    return <VehicleCardContent vehicle={item} query={query} />;
  }
}
