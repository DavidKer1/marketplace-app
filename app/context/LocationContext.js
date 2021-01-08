import React, { createContext, useState } from "react";

export const LocationContext = createContext()
export default function LocationProvider({children}) {

  const [location, setLocation] = useState({})
  const clearLocation = () => {
    setLocation({})
  }
  return (
    <LocationContext.Provider value={{location, setLocation, clearLocation}}>
      {children}
    </LocationContext.Provider>
  )
}
