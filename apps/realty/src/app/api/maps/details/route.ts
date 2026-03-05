import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json(
      { error: "Missing placeId" },
      { status: 400 }
    );
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "geometry,name,formatted_address,types");
  url.searchParams.set("language", "es");
  url.searchParams.set("key", key);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      { error: data.status },
      { status: 500 }
    );
  }

  const r = data.result;
  const lat = r.geometry.location.lat;
  const lng = r.geometry.location.lng;

  return NextResponse.json({
    placeId,
    name: r.name,
    formattedAddress: r.formatted_address,
    types: r.types ?? [],
    lat,
    lng,
  });
}
