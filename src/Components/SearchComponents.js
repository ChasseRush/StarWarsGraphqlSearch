import React, { Component, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    color: "white",
  },
  adornment: {
    color: "white",
  },
  focused: {
    borderColor: "#FFE81F",
    color: "#FFE81F",
  },
  clearIcon: {
    color: "white",
  },
  root: {
    "& label.MuiFormLabel-root": {
      color: "white",
    },
    "& span.MuiIconButton-label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "#FFE81F",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFE81F",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {},
      "&:hover fieldset": {
        borderColor: "#FFE81F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFE81F",
      },
    },
  },
});

export function MovieSearch(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      id="movie-search-field"
      options={props.movies}
      getOptionLabel={(option) => option.title}
      style={{
        width: 300,
      }}
      classes={{
        root: classes.root,
        input: classes.input,
        endAdornment: classes.adornment,
        focused: classes.focused,
        hasClearIcon: classes.clearIcon,
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for a film" variant="outlined" />
      )}
      onChange={(evt, newVal) => {
        props.onChange(newVal);
        props.updateCharacter(null);
      }}
    />
  );
}

export function CharacterSearch(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      id="character-search-field"
      options={props.characters}
      getOptionLabel={(option) => option.name}
      style={{
        width: 300,
        borderColor: "yellow",
        color: "white",
      }}
      classes={{
        root: classes.root,
        input: classes.input,
        endAdornment: classes.adornment,
        focused: classes.focused,
        hasClearIcon: classes.clearIcon,
      }}
      className="search"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a character"
          variant="outlined"
          style={{ color: "white", borderColor: "yellow" }}
        />
      )}
      onChange={(evt, newVal) => {
        props.onChange(newVal);
        props.updateMovie(null);
      }}
    />
  );
}

export function VehicleSearch(props) {
  const [value, setValue] = useState({
    name: "",
  });
  const classes = useStyles();
  return (
    <Autocomplete
      id="vehicle-search-field"
      options={props.vehicles}
      getOptionLabel={(option) => option.name}
      style={{
        width: 300,
      }}
      classes={{
        root: classes.root,
        input: classes.input,
        endAdornment: classes.adornment,
        focused: classes.focused,
        hasClearIcon: classes.clearIcon,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a vehicle or starship"
          variant="outlined"
        />
      )}
      onChange={(evt, newVal) => {
        props.onChange(newVal);
        props.updateItem(null);
      }}
    />
  );
}

export function SpeciesSearch(props) {
  const [value, setValue] = useState({
    name: "",
  });
  const classes = useStyles();
  return (
    <Autocomplete
      id="species-search-field"
      options={props.species}
      getOptionLabel={(option) => option.name}
      style={{
        width: 300,
      }}
      classes={{
        root: classes.root,
        input: classes.input,
        endAdornment: classes.adornment,
        focused: classes.focused,
        hasClearIcon: classes.clearIcon,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a species"
          variant="outlined"
        />
      )}
      onChange={(evt, newVal) => {
        props.onChange(newVal);
        props.updateItem(null);
      }}
    />
  );
}
