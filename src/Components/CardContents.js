import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grow,
} from "@material-ui/core";

export function CharacterCardContent(props) {
  const character = props.character;
  const [c, setC] = useState();
  /*const data = getItemData(props.query, c, props.character.name);
  if (data.Person && (c === null || c === undefined)) {
    setC(data.Person);
  }*/
  console.log(c);
  return (
    <Grow in={true}>
      <Card style={{ maxWidth: 500, padding: "0px 48px" }}>
        <CardContent>
          <h1>{character.name}</h1>
          <Typography variant="h6">
            Species:{" "}
            {character.species.length > 0
              ? character.species[0].name
              : "Unknown"}
          </Typography>
          <Typography variant="h6">
            Home World:{" "}
            {character.homeworld ? character.homeworld.name : "Unknown"}
          </Typography>
          <Typography variant="h6">Films appeared in:</Typography>
          <List>
            {character.films.map((film) => (
              <ListItem
                button
                onClick={
                  props.setCorrespondingMovie
                    ? () => props.setCorrespondingMovie(film)
                    : null
                }
              >
                <ListItemText primary={film.title} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">
            Birthyear: {character.birthYear ? character.birthYear : "Unknown"}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
}

export function MovieCardContent(props) {
  const movie = props.movie;
  const date = formatDate(movie.releaseDate);
  return (
    <Grow in={true}>
      <Card style={{ maxWidth: 500, padding: "0px 48px" }}>
        <CardContent>
          <h1>{movie.title}</h1>
          <Typography variant="h6">Director: {movie.director}</Typography>
          <Typography variant="h6">Release Date: {date}</Typography>
          <Typography variant="h6">
            Episode Number: {movie.episodeId}
          </Typography>
          <Typography variant="h6">Characters featured</Typography>
          <List>
            {movie.characters.map((character) => (
              <ListItem
                button
                onClick={
                  props.setCorrespondingCharacter
                    ? () => props.setCorrespondingCharacter(character)
                    : null
                }
              >
                <ListItemText primary={character.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grow>
  );
}

export function VehicleCardContent(props) {
  const vehicle = props.vehicle;
  const noKnownPilots = vehicle.pilots.length === 0;
  const costInCredits =
    vehicle.costInCredits === null ? "Unknown" : vehicle.costInCredits;
  return (
    <Grow in={true}>
      <Card style={{ maxWidth: 500, padding: "0px 48px" }}>
        <CardContent>
          <h1>{vehicle.name}</h1>
          <Typography variant="h6">Cost in credits: {costInCredits}</Typography>
          <Typography variant="h6">
            Possible passengers: {vehicle.passengers}
          </Typography>
          <Typography variant="h6">Films appeared in:</Typography>
          <List>
            {vehicle.films.map((film) => (
              <ListItem button onClick={() => props.setCorrespondingItem(film)}>
                <ListItemText primary={film.title} />
              </ListItem>
            ))}
          </List>
          {noKnownPilots && (
            <Typography variant="h6">No known pilots</Typography>
          )}
          {!noKnownPilots && (
            <div>
              <Typography variant="h6">Known Pilots</Typography>
              <List>
                {vehicle.pilots.map((pilot) => (
                  <ListItem
                    button
                    onClick={() => props.setCorrespondingItem(pilot)}
                  >
                    <ListItemText primary={pilot.name} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </CardContent>
      </Card>
    </Grow>
  );
}

export function SpeciesCardContent(props) {
  const species = props.species;
  return (
    <Grow in={true}>
      <Card style={{ maxWidth: 500, padding: "0px 24px" }}>
        <CardContent>
          <h1>{species.name}</h1>
          <Typography variant="h6">Language: {species.language}</Typography>
          <Typography variant="h6">
            Classification: {species.classification}
          </Typography>
          <Typography variant="h6">Characters of this species: </Typography>
          <List>
            {species.people.map((person) => (
              <ListItem
                button
                onClick={() => props.setCorrespondingItem(person)}
              >
                <ListItemText primary={person.name} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Films appeared in:</Typography>
          <List>
            {species.films.map((film) => (
              <ListItem button onClick={() => props.setCorrespondingItem(film)}>
                <ListItemText primary={film.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grow>
  );
}

//Collects needed data from proper query
//returns loading status
//sets item on load
/*function getItemData(query, item, name) {
  if (item) {
    return false;
  }
  const shouldSkip = item !== null && item !== undefined;
  const { data = {}, loading, error } = useQuery(query, {
    skip: shouldSkip,
    variables: { name: name },
  });
  return data;
}*/

function formatDate(date) {
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  let dateNum = convertedDate.getDate();
  let month = convertedDate.getMonth() + 1;
  if (dateNum < 10) {
    dateNum = "0" + dateNum;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + dateNum;
}
