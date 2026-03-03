import { PropertyType } from "@itaaj/entities";

const initialPropertyState = {
  price: 0,
  name: "",
  type: PropertyType.APARTAMENT,
  antiquity: 0,
  description: "",
  address: "",
  city: "",
  state: "",
  country: "",
  floor: "",
  street: "",
  location: {
    longitude: 0,
    latitude: 0,
  },
  area: {
    total_area: 0,
    land_area: 0,
    building_area: 0,
  },
  images: [],
  bathrooms: 0,
  bedrooms: 0,
};

export default initialPropertyState;
