import { useState } from "react";

export function useCreateListing() {
  const createListing = async (creatorId , 
    category, type, formLocation, guestCount, 
    bedroomCount, bedCount, bathroomCount,
     amenities, formDescription , photos) => {
    try {
        /* Create a new FormData onject to handle file uploads */
        const listingForm = new FormData();
        listingForm.append("creator", creatorId);
        listingForm.append("category", category);
        listingForm.append("type", type);
        listingForm.append("streetAddress", formLocation.streetAddress);
        listingForm.append("aptSuite", formLocation.aptSuite);
        listingForm.append("city", formLocation.city);
        listingForm.append("province", formLocation.province);
        listingForm.append("country", formLocation.country);
        listingForm.append("guestCount", guestCount);
        listingForm.append("bedroomCount", bedroomCount);
        listingForm.append("bedCount", bedCount);
        listingForm.append("bathroomCount", bathroomCount);
        listingForm.append("amenities", amenities);
        listingForm.append("title", formDescription.title);
        listingForm.append("description", formDescription.description);
        listingForm.append("highlight", formDescription.highlight);
        listingForm.append("highlightDesc", formDescription.highlightDesc);
        listingForm.append("price", formDescription.price);
  
        /* Append each selected photos to the FormData object */
        photos.forEach((photo) => {
          listingForm.append("listingPhotos", photo);
        });
  
        /* Send a POST request to server */
        const response = await fetch(`http://localhost:3001/properties/create`, {
          method: "POST",
          body: listingForm,
        });
  
        if (response.ok) {
            return { status: true };
        }
      } catch (err) {
        console.log("Publish Listing failed", err.message);
      }
    };

  return { createListing }
}

export function useGetListingDetails() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

  
  const getListingDetails = async (listingId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };
    return { getListingDetails , listing, loading }
}