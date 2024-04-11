import React, { useEffect, useState } from "react";
import { Button, Field,  Input, TextEditor } from "@/components";
import styles from "./Edit.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { v4 as uuid } from "uuid";
import { useProperty } from "@/hooks/properties/useProperty";

// const placeholderImage = "https://via.placeholder.com/300x300";

const EditPropety: React.FC = () => {
  const { isLoading, property: propertyInfo } = useProperty();
  const [property, setProperty] = useState({
    name: propertyInfo?.name,
    address: propertyInfo?.address,
    city: propertyInfo?.city,
    state: propertyInfo?.state,
    country: propertyInfo?.country,
    price: propertyInfo?.price,
    description: propertyInfo?.description,
    area: propertyInfo?.area,
    images: propertyInfo?.images,
    garage: propertyInfo?.garage,
    bedrooms: propertyInfo?.bedrooms,
    bathrooms: propertyInfo?.bathrooms,
    antiquity: 0,
    balcony: 0,
    kitcken: 0,
    propertyStatus: propertyInfo?.propertyStatus,
    type: propertyInfo?.type,
    category: propertyInfo?.category,
    partner: "",
  });


  const [amenities, setAmenities] = useState<any[]>([]);
  const addAmenities = () => {
    const amenity = {
      id: Date.now().toString(),
      text: "",
    };

    setAmenities([...amenities, amenity]);
  };

  const handleText = (e: any, id: string) => {
    e.preventDefault();
    const index = amenities.findIndex((a: any) => a.id == id);
    amenities[index].text = e.target.value;
  };
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newAmenities: string[] = [];
    amenities.map((amenity) => {
      newAmenities.push(amenity.text);
    });
   
    navigate(`/${PrivateRoutes.PROPERTIES}`, { replace: true });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeArea = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, area: { ...prev.area, [name]: value } }));
  };

  useEffect(()=> {
    setProperty({
      name: propertyInfo?.name,
      address: propertyInfo?.address,
      city: propertyInfo?.city,
      state: propertyInfo?.state,
      country: propertyInfo?.country,
      price: propertyInfo?.price,
      description: propertyInfo?.description,
      area: propertyInfo?.area,
      images: propertyInfo?.images,
      garage: propertyInfo?.garage,
      bedrooms: propertyInfo?.bedrooms,
      bathrooms: propertyInfo?.bathrooms,
      antiquity: 0,
      balcony: 0,
      kitcken: 0,
      propertyStatus: propertyInfo?.propertyStatus,
      type: propertyInfo?.type,
      category: propertyInfo?.category,
      partner: "",
    })
  }, [isLoading])

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Field label="Property Name">
          <Input name="name" value={property.name} onChange={handleChange} />
        </Field>

        <Field label="Address">
          <Input name="address" value={property.address}  onChange={handleChange} />
        </Field>

        <Field label="City">
          <Input name="city" onChange={handleChange} />
        </Field>

        <Field label="State">
          <Input name="state" onChange={handleChange} />
        </Field>

        <Field label="Neighborhood">
          <Input name="neighborhood" onChange={handleChange} />
        </Field>

        <Field label="Country">
          <Input name="country" onChange={handleChange} />
        </Field>

        <Field label="Street">
          <Input name="street" onChange={handleChange} />
        </Field>

        <Field label="External Number">
          <Input name="external_number" onChange={handleChange} />
        </Field>

        <Field label="Internal Number">
          <Input name="internal_number" onChange={handleChange} />
        </Field>

        <Field label="Price">
          <Input name="price" onChange={handleChange} />
        </Field>

        <Field label="Property description">
          <TextEditor
            onChange={(e) =>
              setProperty({
                ...property,
                description: e,
              })
            }
          />
        </Field>
      </div>

      <div className={styles.section}>
        <h4>Area</h4>
        <Field label="Land Area">
          <Input name="land_area" onChange={handleChangeArea} />
        </Field>

        <Field label="Building Area">
          <Input name="building_area" onChange={handleChangeArea} />
        </Field>

        <Field label="Total Area">
          <Input name="total_area" onChange={handleChangeArea} />
        </Field>

        <Field label="Bedrooms">
          <Input name="bedrooms" onChange={handleChange} />
        </Field>

        <Field label="Bathrooms">
          <Input name="bathrooms" onChange={handleChange} />
        </Field>

        <Field label="Antiquity">
          <Input name="antiquity" onChange={handleChange} />
        </Field>

        <Field label="Balcony">
          <Input name="balcony" onChange={handleChange} />
        </Field>

        <Field label="Kitchen">
          <Input name="kitchen" onChange={handleChange} />
        </Field>

        <Field label="Amenities">
          {amenities.map((amenity) => (
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Input onChange={(e) => handleText(e, amenity.id)} />
            </div>
          ))}
          <button onClick={addAmenities}>Add Amenity</button>
        </Field>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.section}>
          <h3>Images</h3>
       
          <div className={styles.preview_container}>
           
          </div>
        </div>
        <div className={styles.section}>
          <Field label="Property Status">
            <Input name="propertyStatus" onChange={handleChange} />
          </Field>

          <Field
            label="Type"
            tip="A property can be a House, Apartment, Condo, Townhouse or other."
          >
            <Input name="type" onChange={handleChange} />
          </Field>

          <Field label="Partner">
            <Input name="partner" onChange={handleChange} />
          </Field>

          <Field label="Property Category">
            <select name="category" onChange={handleChange}>
              <option value="general">General</option>
              <option value="exclusive">Exclusive</option>
              <option value="investment">Investment</option>
            </select>
          </Field>
        </div>
        <Button
          style={{
            height: 40,
          }}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditPropety;
