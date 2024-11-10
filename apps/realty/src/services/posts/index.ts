export const getPostsApi = async () => {
  const response = await fetch("https://itaaj.real-vision-api.cloud/api/v1/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de posts.");
  }

  const data = await response.json();

  return data;
};

export const getPostBySlugApi = async (slug: string) => {
  const response = await fetch(`https://itaaj.real-vision-api.cloud/api/v1/posts/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de posts.");
  }

  const data = await response.json();

  return data;
};

{
  /**export const getPostsApi = async () => {
  const response = await fetch("https://itaajrealty.com/api/api/v1/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de propiedades.");
  }

  const data = await response.json();

  return data;
};

 */
}
