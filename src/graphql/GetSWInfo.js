"use-es6";

import gql from "graphql-tag";

export const GET_GENERAL_SW_INFO = gql`
  query {
    allFilms(orderBy: episodeId_ASC) {
      title
    }
    allPersons(orderBy: name_ASC) {
      name
    }
    allVehicles(orderBy: name_ASC) {
      name
    }
    allStarships(orderBy: name_ASC) {
      name
    }
    allSpecies(orderBy: name_ASC) {
      name
    }
  }
`;

export const GET_ALL_MOVIES = gql`
  query {
    allFilms(orderBy: episodeId_ASC) {
      title
    }
  }
`;

export const GET_ALL_CHARACTERS = gql`
  query {
    allPersons(orderBy: name_ASC) {
      name
    }
  }
`;

export const GET_ALL_V_S = gql`
  query {
    allVehicles(orderBy: name_ASC) {
      name
    }
    allStarships(orderBy: name_ASC) {
      name
    }
  }
`;

export const GET_ALL_SPECIES = gql`
  query {
    allSpecies(orderBy: name_ASC) {
      name
    }
  }
`;

export const GET_CHARACTER = gql`
  query getCharacter($name: String!) {
    Person(name: $name) {
      name
      species {
        name
      }
      films {
        title
      }
      homeworld {
        name
      }
      birthYear
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($name: String!) {
    Film(title: $name) {
      title
      director
      releaseDate
      openingCrawl
      episodeId
      characters {
        name
      }
    }
  }
`;

export const GET_VEHICLE_OR_STARSHIP = gql`
  query getVehicleOrStarship(
    $name: String!
    $useVehicle: Boolean!
    $useStarship: Boolean!
  ) {
    Vehicle(name: $name) @include(if: $useVehicle) {
      name
      passengers
      costInCredits
      pilots {
        name
      }
      films {
        title
      }
    }
    Starship(name: $name) @include(if: $useStarship) {
      name
      passengers
      costInCredits
      pilots {
        name
      }
      films {
        title
      }
    }
  }
`;

export const GET_SPECIES = gql`
  query getSpecies($name: String!) {
    Species(name: $name) {
      name
      language
      classification
      people {
        name
      }
      films {
        title
      }
    }
  }
`;

export const GET_VEHICLE = gql`
  query getVehicle($name: String!) {
    Vehicle(name: $name) {
      name
      passengers
      costInCredits
      pilots {
        name
      }
      films {
        title
      }
    }
  }
`;

export const GET_STARSHIP = gql`
  query getStarship($name: String!) {
    Starship(name: $name) {
      name
      passengers
      costInCredits
      pilots {
        name
      }
      films {
        title
      }
    }
  }
`;

export function getSpecificQuery(typename) {
  if (typename === "Film") {
    return GET_MOVIE;
  } else if (typename === "Person") {
    return GET_CHARACTER;
  } else if (typename === "Species") {
    return GET_SPECIES;
  } else if (typename === "Vehicle") {
    return GET_VEHICLE;
  } else if (typename === "Starship") {
    return GET_STARSHIP;
  }
}
