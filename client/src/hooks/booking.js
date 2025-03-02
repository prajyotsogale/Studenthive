export function useCreateBooking() {
    const createBooking = async (bookingForm) => {
        try {
          const response = await fetch(`http://localhost:3001/bookings/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingForm)
          })
    
    
          if (response.ok) {
            return { status: true , response }
          }
        } catch (err) {
          console.log("Submit Booking Failed.", err.message)
        }
      }
      return { createBooking }
}