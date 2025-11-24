export const properties = async ({ page, limit }: { page: number, limit: number }) => {
  try {
    const response = await fetch(
      `https://itaaj-realty.onrender.com/api/v1/properties?page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de propiedades.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};

export const propertiesByDevelopment = async (development: string) => {
  try {
    const response = await fetch(
      `https://itaaj-realty.onrender.com/api/v1/properties/${development}`,
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de propiedades.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};

export const propertiesBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `https://itaaj-realty.onrender.com/api/v1/property/${slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de propiedades.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    throw error;
  }
};
