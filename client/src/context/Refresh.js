import { createContext, useContext, useState } from 'react';


const Refresh = createContext();

export const RefreshProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [price, setPrice] = useState("")
  const [bookingDetails , setBookingDetails] = useState({customerId: "",
    listingId: "",
    hostId: "",
    startDate: "",
    endDate: "",
    totalPrice: 0,})
//   const [chatProfileImage, setChatProfileImage] = useState("")


console.log(bookingDetails)
  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <Refresh.Provider value={{ triggerUpdate , shouldUpdate , price , setPrice , bookingDetails , setBookingDetails }}>
      {children}
    </Refresh.Provider>
  );
};

export const useSupplier = () => useContext(Refresh);