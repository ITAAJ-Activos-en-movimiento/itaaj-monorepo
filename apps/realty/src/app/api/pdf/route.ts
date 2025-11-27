// app/api/property-pdf/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

type Property = {
  slug: string;
  title?: string;
  description: string;
  price: number;
  city: string;
  country: string;
  address: string;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  garage?: number;
  area?: {
    land_area?: string;
    building_area?: string;
  };
  blockchainId?: string;
  owner: string;
    location?: {
    latitude?: number;
    longitude?: number;
  };
};

type User = {
  name: string;
  lastname?: string;
  email: string;
  phone: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug es requerido" }, { status: 400 });
  }

  const apiBase = process.env.INTERNAL_API_BASE;
  const publicBase = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!apiBase) {
    return NextResponse.json(
      { error: "INTERNAL_API_BASE no configurado" },
      { status: 500 }
    );
  }

  // 1. Traer propiedad por slug
  const propertyRes = await fetch(
    `https://itaaj-realty.onrender.com/api/v1/property/${slug}`,
    { cache: "no-store" }
  );

  if (!propertyRes.ok) {
    return NextResponse.json(
      { error: "No se encontró la propiedad" },
      { status: 404 }
    );
  }

  const property = (await propertyRes.json()) as Property;

  // 2. Traer dueño
  let user: User | null = null;
  try {
    const userRes = await fetch(`${apiBase}/users/${property.owner}`, {
      cache: "no-store",
    });

    if (userRes.ok) {
      user = (await userRes.json()) as User;
    }
  } catch (err) {
    console.error("Error obteniendo usuario", err);
  }

  // 3. Generar HTML de ficha
  const html = buildPropertyPdfHtml({
    property,
    user,
    appUrl: publicBase,
  });

  // 4. Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  const pdfUint8 = new Uint8Array(pdfBuffer);

  return new NextResponse(pdfUint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="ficha-${slug}.pdf"`,
    },
  });
}

function buildPropertyPdfHtml({
  property,
  user,
  appUrl,
}: {
  property: Property;
  user: User | null;
  appUrl: string;
}) {
  const mainImage = property.images?.[0] ?? `${appUrl}/house-placeholder.jpg`;
  const otherImages = property.images?.slice(1, 4) ?? [];

  const fullTitle = `${property?.description?.slice(0, 70) ?? ""}`;
  const fullAddress = `${property.address}, ${property.city}, ${property.country}`;
  const price = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(property.price || 0);
 const latitude =
    property.location?.latitude ??
    (property as any).location?.lat ??
    undefined;
  const longitude =
    property.location?.longitude ??
    (property as any).location?.lng ??
    undefined;

  const hasCoords =
    typeof latitude === "number" && typeof longitude === "number";

  const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;

  // 👇 URL de Google Static Maps
  const mapImageUrl =
    hasCoords && googleMapsKey
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=600x350&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${googleMapsKey}`
      : null;


  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Ficha de propiedad - Itaaj Realty</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #111827;
    }
    body {
      margin: 0;
      padding: 0;
      background: #f3f4f6;
    }
    .page {
      width: 100%;
      padding: 24px;
      background: #ffffff;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 8px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo span {
      font-weight: 600;
      font-size: 18px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #111827;
    }
    .header-right {
      text-align: right;
      font-size: 10px;
      color: #6b7280;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      margin: 8px 0 4px;
      color: #111827;
    }
    .subtitle {
      font-size: 11px;
      color: #6b7280;
    }
    .layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-top: 16px;
    }
    .main-card {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      background: #f9fafb;
    }
    .main-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    .thumbs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      padding: 6px;
      background: #111827;
    }
      .map-section {
  margin-top: 10px;
}
.map-image-wrapper {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-top: 6px;
}
.map-image-wrapper img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
.map-note {
  font-size: 9px;
  color: #6b7280;
  margin-top: 4px;
}

    .thumbs img {
      width: 100%;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }
    .info-section {
      padding: 12px 16px 14px;
    }
    .price {
      font-size: 20px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 4px;
    }
    .code {
      font-size: 10px;
      color: #6b7280;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0 4px;
    }
    .chip {
      font-size: 10px;
      padding: 4px 8px;
      border-radius: 999px;
      background: #e5f0ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin-top: 8px;
      font-size: 11px;
    }
    .details-item {
      padding: 6px 8px;
      border-radius: 6px;
      background: #f3f4f6;
    }
    .details-item span {
      display: block;
      font-size: 10px;
      color: #6b7280;
    }
    .details-item strong {
      font-size: 11px;
      font-weight: 600;
      color: #111827;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section {
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      padding: 10px 12px;
      background: #ffffff;
    }
    .section-title {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #111827;
    }
    .p-small {
      font-size: 10px;
      color: #4b5563;
      margin: 2px 0;
    }
    .owner-block {
      border-radius: 8px;
      border: 1px solid #d1fae5;
      background: #ecfdf5;
      padding: 8px 10px;
      font-size: 10px;
    }
    .owner-name {
      font-weight: 600;
      margin-bottom: 2px;
      color: #065f46;
    }
    .badge {
      display: inline-block;
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 999px;
      background: #f97316;
      color: white;
      margin-top: 4px;
    }
    .footer {
      margin-top: 18px;
      padding-top: 8px;
      border-top: 1px dashed #e5e7eb;
      font-size: 9px;
      color: #9ca3af;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer span {
      display: block;
    }
    .footer a {
      color: #1d4ed8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      <div class="logo">
        <img src="https://i.ibb.co/q35HxYtZ/isotipo.png" alt="Itaaj Realty" style="height: 22px;" />
        <span>Itaaj Realty</span>
      </div>
      <div class="header-right">
        <div>Ficha de propiedad</div>
        <div>${new Date().toLocaleDateString("es-MX")}</div>
      </div>
    </header>

    <h1 class="title">${fullTitle || "Propiedad en renta"}</h1>
    <p class="subtitle">${fullAddress}</p>

    <main class="layout">
      <section class="main-card">
        <img src="${mainImage}" class="main-image" alt="Imagen principal" />
        ${
          otherImages.length
            ? `<div class="thumbs">
                ${otherImages
                  .map(
                    (img) =>
                      `<img src="${img}" alt="Imagen extra" />`
                  )
                  .join("")}
              </div>`
            : ""
        }
        <div class="info-section">
          <div class="price">${price}</div>
          <div class="code">
            Código de propiedad: <strong>${property.blockchainId ?? "-"}</strong>
          </div>
          <div class="chips">
            <span class="chip">Renta</span>
            <span class="chip">${property.city}</span>
            ${
              property.bedrooms
                ? `<span class="chip">${property.bedrooms} habs.</span>`
                : ""
            }
            ${
              property.bathrooms
                ? `<span class="chip">${property.bathrooms} baños</span>`
                : ""
            }
          </div>

          <div class="details-grid">
            <div class="details-item">
              <span>Superficie terreno</span>
              <strong>${
                property.area?.land_area
                  ? property.area.land_area + " m²"
                  : "N/D"
              }</strong>
            </div>
            <div class="details-item">
              <span>Superficie construcción</span>
              <strong>${
                property.area?.building_area
                  ? property.area.building_area + " m²"
                  : "N/D"
              }</strong>
            </div>
            <div class="details-item">
              <span>Estacionamientos</span>
              <strong>${property.garage ?? "N/D"}</strong>
            </div>
            <div class="details-item">
              <span>Tipo de operación</span>
              <strong>Renta</strong>
            </div>
          </div>

          ${
            mapImageUrl
              ? `
          <section class="section map-section">
            <h2 class="section-title">Ubicación en el mapa</h2>
            <div class="map-image-wrapper">
              <img src="${mapImageUrl}" alt="Mapa de ubicación" />
            </div>
            <p class="map-note">
              Referencia aproximada. La ubicación exacta puede compartirse tras el contacto con el asesor.
            </p>
          </section>
          `
              : ""
          }

        </div>
      </section>

      <aside class="sidebar">
        <section class="section">
          <h2 class="section-title">Contacto</h2>
          <div class="owner-block">
            <div class="owner-name">
              ${user ? `${user.name} ${user.lastname ?? ""}` : "Asesor Itaaj"}
            </div>
            <div class="p-small">
              Correo: <strong>${user?.email ?? "contacto@itaajrealty.com"}</strong>
            </div>
            <div class="p-small">
              Teléfono: <strong>${user?.phone ?? "-"}</strong>
            </div>
            <div class="badge">Contacto directo</div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Resumen rápido</h2>
          <p class="p-small">
            Propiedad en renta ubicada en <strong>${property.city}</strong>, 
            ${property.country}. Ideal para vivir cómodamente, con ${
              property.bedrooms ?? "N/D"
            } habitaciones y ${
    property.bathrooms ?? "N/D"
  } baños.
          </p>
          <p class="p-small">
            Esta ficha es un resumen informativo. Los datos pueden variar sin previo aviso.
          </p>
        </section>
      </aside>
    </main>

    <footer class="footer">
      <span>© ${new Date().getFullYear()} Itaaj Realty · Todos los derechos reservados</span>
      <span>
        Más info en <a href="https://itaajrealty.com/render/viviendas/${property.slug}" target="_blank">${appUrl.replace(
    /^https?:\/\//,
    ""
  )}</a>
      </span>
    </footer>
  </div>
</body>
</html>`;
}
