import React from "react";

const OnesearchContext = React.createContext({});

export const OnesearchProvider = OnesearchContext.Provider;
export const OnesearchConsumer = OnesearchContext.Consumer;