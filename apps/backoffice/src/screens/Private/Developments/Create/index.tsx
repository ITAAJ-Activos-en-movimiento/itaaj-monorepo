import React, { useEffect, useState } from "react";
import { Button, Field, ImageInput, Input, TextEditor } from "@/components";
import styles from "./Create.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProperties,
  getProperty,
  resetProperties,
  updateProperties,
} from "@/redux/states";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { v4 as uuid } from "uuid";
import { useUploadImage } from "@/hooks/useUploadImage";
import { AppStore } from "@/redux/store";
import { Layout } from "@/containers";
import countries from "@/utilities/countries";
const placeholderImage = "https://via.placeholder.com/300x300";

export enum PropertyType {
  HOUSE = "house",
  APARTAMENT = "apartament",
  CONDO = "condo",
  TOWNHOUSE = "townhouse",
  OTHER = "other",
  OFFICE = "office",
}

const CreateDevelopment: React.FC = () => {
  const { isLoading, url, uploadImage, urls, setUrls } = useUploadImage();
  const { slug } = useParams();
  const isCreate = !slug;

  const { loading, error, success, result } = useSelector(
    (state: AppStore) => state.properties
  );
  const [property, setProperty] = useState({
    id: uuid(),
    name: "",
    address: "",
    city: "",
    state: "",
    country: "Mexico",
    price: 0,
    description: "",
    area: {
      land_area: "",
      total_area: "",
      building_area: "",
    },
    images: [],
    garage: 0,
    bedrooms: 0,
    bathrooms: 0,
    antiquity: 0,
    balcony: 0,
    kitcken: 0,
    propertyStatus: "New",
    type: "house",
    createdAt: new Date().toString(),
    category: "general",
    partner: "",
    neighborhood: "",
    street: "",
    external_number: 0,
    internal_number: 0,
    slug: "",
    uuid: "",
  });

  const addImages = (e: any) => {
    uploadImage(e?.target?.files![0]);
  };

  const [amenities, setAmenities] = useState<string[]>([]);

  const addAmenities = () => {
    setAmenities([...amenities, ""]);
  };

  const handleText = (
    index: any,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newAmenities = [...amenities];
    newAmenities[index] = event.target.value;
    setAmenities(newAmenities);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isCreate) {
      dispatch(
        createProperties({
          ...property,
          uuid: undefined,
          images: urls,
          amenities,
        }) as any
      );
    } else {
      dispatch(
        updateProperties({
          ...property,
          id: undefined,
          createdAt: undefined,
          images: urls,
          amenities,
        }) as any
      );
    }
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

  useEffect(() => {
    if (!isCreate) {
      dispatch(getProperty(slug) as any);
    }
  }, [isCreate]);

  useEffect(() => {
    if (result?.length > 0) {
      const _result = result?.[0];
      setProperty({
        id: _result.uuid,
        uuid: _result.uuid,
        slug: _result.slug,
        name: _result.name,
        address: _result.address,
        city: _result.city,
        state: _result.state,
        country: _result.country,
        price: _result.price,
        description: _result.description,
        area: _result.area,
        images: [],
        garage: _result.garage,
        bedrooms: _result.bedrooms,
        bathrooms: _result.bathrooms,
        antiquity: _result.antiquity,
        balcony: _result.balcony,
        kitcken: _result.kitcken,
        propertyStatus: _result.propertyStatus,
        type: _result.type,
        createdAt: new Date().toString(),
        category: _result.category,
        partner: _result.partner,
        neighborhood: _result.neighborhood,
        street: _result.street,
        external_number: _result.external_number,
        internal_number: _result.internal_number,
      });
      setAmenities(_result.amenities);
      setUrls(_result.images);
    }
  }, [result]);

  useEffect(() => {
    if (success) {
      dispatch(resetProperties());
      navigate(PrivateRoutes.PROPERTIES, { replace: true });
    }
  }, [dispatch, navigate, success]);

  return (
    <Layout>
      <div className={styles.container}>
        {(isCreate || (!isCreate && property.slug)) && (
          <>
            <div>
              <div className={styles.station}>
                <h3>Basic information</h3>
                <p>
                  Describe the property. you can see this information in
                  ItaajRealty
                </p>
                <Field label="Property Name">
                  <Input
                    name="name"
                    onChange={handleChange}
                    value={property.name}
                  />
                </Field>

                <Field label="Property description">
                  <TextEditor
                    value={property.description}
                    onChange={(e) =>
                      setProperty({
                        ...property,
                        description: e,
                      })
                    }
                  />
                </Field>
              </div>

              <div className={styles.station}>
                <h3>Location</h3>
                <p>Add all data of location of the property</p>

                <div className={styles.grid}>
                  <Field label="Address">
                    <Input
                      name="address"
                      onChange={handleChange}
                      defaultValue={property.address}
                    />
                  </Field>

                  <Field label="City">
                    <Input
                      name="city"
                      onChange={handleChange}
                      defaultValue={property.city}
                    />
                  </Field>

                  <Field label="State">
                    <Input
                      name="state"
                      onChange={handleChange}
                      defaultValue={property.state}
                    />
                  </Field>

                  <Field label="Neighborhood">
                    <Input
                      name="neighborhood"
                      onChange={handleChange}
                      defaultValue={property.neighborhood}
                    />
                  </Field>

                  <Field label="Country">
                    <select
                      name="country"
                      defaultValue={property?.country || "Mexico"}
                      onChange={handleChange}
                    >
                      {countries.map((country) => (
                        <option
                          key={country.countryName}
                          value={country.countryName}
                        >
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Street">
                    <Input
                      name="street"
                      onChange={handleChange}
                      defaultValue={property.street}
                    />
                  </Field>

                  <Field label="External Number">
                    <Input
                      name="external_number"
                      onChange={handleChange}
                      defaultValue={property.external_number}
                    />
                  </Field>

                  <Field label="Internal Number">
                    <Input
                      name="internal_number"
                      onChange={handleChange}
                      defaultValue={property.internal_number}
                    />
                  </Field>
                </div>
              </div>

              <div className={styles.station}>
                <h3>Property Features</h3>
                <p>Add features to the property</p>
                <div className={styles.grid}>
                  <Field label="Bedrooms">
                    <Input
                      name="bedrooms"
                      onChange={handleChange}
                      defaultValue={property.bedrooms}
                    />
                  </Field>

                  <Field label="Bathrooms">
                    <Input
                      name="bathrooms"
                      onChange={handleChange}
                      defaultValue={property.bathrooms}
                    />
                  </Field>

                  <Field label="Antiquity">
                    <Input
                      name="antiquity"
                      onChange={handleChange}
                      type="number"
                      defaultValue={property.antiquity}
                    />
                  </Field>
                </div>
              </div>

              <div className={styles.station}>
                <h3>Dimensions</h3>
                <p>Specify the dimensions of the property</p>
                <div className={styles.grid}>
                  <Field label="Land Area">
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <Field label="Desde">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                      <Field label="Hasta">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                    </div>
                  </Field>

                  <Field label="Building Area">
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <Field label="Desde">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                      <Field label="Hasta">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                    </div>
                  </Field>

                  <Field label="Total Area">
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <Field label="Desde">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                      <Field label="Hasta">
                        <Input
                          name="land_area"
                          onChange={handleChange}
                          defaultValue={property.area.land_area}
                        />
                      </Field>
                    </div>
                  </Field>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.station}>
                <h3>Image</h3>
                <p>Upload an image for the property.</p>
                <ImageInput
                  preview={url || placeholderImage}
                  onChange={(e) => addImages(e)}
                  loading={isLoading}
                  src={url || placeholderImage}
                  alt=""
                  width={300}
                  height={300}
                />
                <div className={styles.preview_container}>
                  {urls?.map((image) => (
                    <img
                      key={image}
                      className={styles.preview_img}
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
              </div>

              <div className={styles.station}>
                <h3>Plans</h3>
                <p>Upload an image or pdf for the development.</p>
                <ImageInput
                  preview={url || placeholderImage}
                  onChange={(e) => addImages(e)}
                  loading={isLoading}
                  src={url || placeholderImage}
                  alt=""
                  width={300}
                  height={300}
                />
                <div className={styles.preview_container}>
                  {urls?.map((image) => (
                    <img
                      key={image}
                      className={styles.preview_img}
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
              </div>

              <div className={styles.station}>
                <h3>Others</h3>

                <Field label="Price">
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <Field label="Desde">
                      <Input
                        name="Desde"
                        onChange={handleChange}
                        defaultValue={property.price}
                      />
                    </Field>
                    <Field label="Hasta">
                      <Input
                        name="Desde"
                        onChange={handleChange}
                        defaultValue={property.price}
                      />
                    </Field>
                  </div>
                </Field>

                <Field label="Property Status">
                  <select
                    name="propertyStatus"
                    defaultValue={property?.propertyStatus || "New"}
                    onChange={handleChange}
                  >
                    <option value="New">En construccion</option>
                    <option value="Used">Listo para habitar</option>
                    <option value="UsedLikeNew">
                      En construccion y terminadas
                    </option>
                  </select>
                </Field>

                <Field
                  label="Type"
                  tip="A property can be a House, Apartment, Condo, Townhouse or other."
                >
                  <select
                    name="type"
                    onChange={handleChange}
                    defaultValue={property?.type || "house"}
                  >
                    {Object.values(PropertyType).map((type) => (
                      <option key={type} value={type}>
                        {type.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Partner">
                  <Input
                    name="partner"
                    onChange={handleChange}
                    defaultValue={property.partner}
                  />
                </Field>
                <Field label="Delivery">
                  <Input
                    name="delivery"
                    onChange={handleChange}
                    defaultValue={property.partner}
                  />
                </Field>

                <Field label="Special Feature">
                  <Input
                    name="partner"
                    onChange={handleChange}
                    defaultValue={property.partner}
                  />
                </Field>

                <Field label="Property Category">
                  <select
                    name="category"
                    onChange={handleChange}
                    defaultValue={property?.category || "general"}
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="general">General</option>
                    <option value="investment">Investment</option>
                  </select>
                </Field>
              </div>

              <div className={styles.station}>
                <h3>Amenities</h3>

                <Field label="Amenities" error={error}>
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Input
                        defaultValue={amenity}
                        onChange={(e) => handleText(index, e)}
                      />
                    </div>
                  ))}
                  <button className={styles.btn_add} onClick={addAmenities}>
                    Add Amenity
                  </button>
                </Field>
              </div>
              <Button
                style={{
                  width: "100%",
                  height: 40,
                }}
                onClick={onSubmit}
                loading={loading}
              >
                {isCreate ? "Save" : "Update"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CreateDevelopment;
