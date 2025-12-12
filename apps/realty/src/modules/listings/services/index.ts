export const listings = async ({ page, limit, transaction, propertyType, city }: { page: number, limit: number, transaction: string, propertyType: string, city: string }) => {
  try {
    const response = await fetch(
      `${process.env.INTERNAL_API_BASE}/listings?page=${page}&limit=${limit}&transaction=${transaction}&city=${city}&propertyType=${propertyType}`,
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
