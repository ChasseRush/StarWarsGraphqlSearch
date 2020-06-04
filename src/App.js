import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route } from "react-router-dom";
import { SWLookupContainer } from "./Containers/SWLookupContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

function App() {
  const client = new ApolloClient({
    uri: "https://swapi.graph.cool/",
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="content">
          <Route path="/" exact component={SWLookupContainer} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
