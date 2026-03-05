type ListingsQuery = {
  page: number;
  limit: number;
  transaction: string;
  propertyType: string;
  city: string;
  order?: string;
};

export const listings = async (query: ListingsQuery) => {
  try {
      const params = new URLSearchParams();

  params.set("page", String(query.page));
  params.set("limit", String(query.limit));
  params.set("transaction", query.transaction);
  params.set("propertyType", query.propertyType);
  params.set("city", query.city);

    if (query.order) params.set("order", query.order);

    const response = await fetch(
      `${process.env.INTERNAL_API_BASE}/listings?${params.toString()}`,
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
