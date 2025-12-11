export const listings = async ({ page, limit, transaction, city }: { page: number, limit: number, transaction: string, city: string }) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/listings?page=${page}&limit=${limit}&transaction=${transaction}&city=${city}`,
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
