import { createContext, useContext, useState } from 'react';


const Refresh = createContext();

export const RefreshProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [price, setPrice] = useState("")
//   const [chatProfileImage, setChatProfileImage] = useState("")



  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <Refresh.Provider value={{ triggerUpdate , shouldUpdate , price , setPrice }}>
      {children}
    </Refresh.Provider>
  );
};

export const useSupplier = () => useContext(Refresh);