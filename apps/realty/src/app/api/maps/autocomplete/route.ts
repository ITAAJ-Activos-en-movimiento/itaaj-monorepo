import { NextRequest, NextResponse } from "next/server";

function mapPlaceType(types: string[] = []): string {
  if (types.includes("locality")) return "Ciudad";
  if (
    types.includes("administrative_area_level_1") ||
    types.includes("administrative_area_level_2")
  )
    return "Provincia";
  if (types.includes("neighborhood") || types.includes("sublocality"))
    return "Barrio";
  if (types.includes("route")) return "Calle";
  if (types.includes("country")) return "País";
  return "Zona";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input") ?? "";

  if (!input.trim()) {
    return NextResponse.json([]);
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
  );
  url.searchParams.set("input", input);
  url.searchParams.set("language", "es");
  url.searchParams.set("key", key);
    url.searchParams.set("components", "country:mx|country:us");


  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json([]);
  }

  const results = data.predictions.map((p: any) => ({
    id: p.place_id,
    placeId: p.place_id,
    mainText: p.structured_formatting?.main_text ?? p.description,
    secondaryText: p.structured_formatting?.secondary_text ?? "",
    fullText: p.description,
    googleTypes: p.types ?? [],
    displayType: mapPlaceType(p.types ?? []),
  }));

  return NextResponse.json(results);
}
