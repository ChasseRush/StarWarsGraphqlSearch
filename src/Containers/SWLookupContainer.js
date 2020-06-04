"use-es6";

import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_GENERAL_SW_INFO } from "../graphql/GetSWInfo";
import { Button, Grid, ButtonBase, Typography } from "@material-ui/core";
import { images } from "../Components/ImageObjs";
import {
  SpeciesDataContainer,
  CharactersDataContainer,
  MoviesDataContainer,
  VehiclesDataContainer,
} from "./SWDataContainter";
import DeathStar from "../Images/Star_Wars_Death Star.svg";
import Falcon from "../Images/Star_Wars_Falcon.svg";
/*class SWLookupContainer extends Component {
  constructor(props) {
    super(props);
    this.getSWInfo = this.getSWInfo.bind(this);
  }

  getSWInfo() {
    const { data: { swInfo = [] } = {} } = useQuery(GET_GENERAL_SW_INFO);
    return swInfo;
  }

  render() {
    //console.log(this.getSWInfo());
    const { data: { swInfo = [] } = {} } = useQuery(GET_GENERAL_SW_INFO);
    console.log(swInfo);
    return <h1>HELLO</h1>;
  }
}

export default SWLookupContainer;*/

function ImageButton(props) {
  return (
    <ButtonBase
      focusRipple
      key={props.image.title}
      style={{
        width: "inherit",
        position: "relative",
        height: 200,
      }}
      className="pick-button"
      onClick={() => props.onClick(props.image.option)}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundImage: `url(${props.image.url})`,
          borderRadius: 20,
        }}
      />
      <span className="image-backdrop" />
      <span className="image-button">
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className="imageTitle"
        >
          {props.image.title}
          <span className="imageMarked" />
        </Typography>
      </span>
    </ButtonBase>
  );
}

function SWChoiceCards(props) {
  return (
    <Grid
      container
      spacing={4}
      style={{ paddingTop: 32, width: "100%" }}
      justify="center"
      direction="row"
    >
      {images.map((im) => (
        <Grid item md={2} style={{ width: "100%" }}>
          <ImageButton image={im} onClick={props.onClick} />
        </Grid>
      ))}
    </Grid>
  );
}

export function SWLookupContainer() {
  const look = false;
  const [clicked, setClick] = useState(null);
  const { data = {}, loading, error } = useQuery(GET_GENERAL_SW_INFO, {
    skip: look,
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: 15,
          color: "#838e9e",
        }}
      >
        <span
          className="falcon"
          style={{
            paddingRight: 50,
            paddingTop: 50,
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <img src={Falcon} />
        </span>
        <span className="death-star" style={{ paddingRight: 50 }}>
          <img src={DeathStar} />
        </span>
      </div>
      <div style={{ paddingTop: 16 }}>
        <Typography
          color="inherit"
          align="center"
          variant="h3"
          marked="center"
          style={{ color: "#FFE81F" }}
        >
          THE QUICK STAR WARS LOOKUP
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h4"
          marked="center"
          style={{ paddingTop: 24, color: "white" }}
        >
          Select a topic below to begin searching
        </Typography>
      </div>
      <div>
        <SWChoiceCards onClick={setClick} />
        {clicked === "M" && <MoviesDataContainer />}
        {clicked === "C" && <CharactersDataContainer />}
        {clicked === "V" && <VehiclesDataContainer />}
        {clicked === "S" && <SpeciesDataContainer />}
      </div>
    </div>
  );
}
