import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address } = (await req.json()) as { address?: string };

    if (!address) {
      return NextResponse.json(
        { ok: false, message: "Address is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, message: "Missing GOOGLE_MAPS_API_KEY" },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" || !data.results?.length) {
      return NextResponse.json(
        { ok: false, message: "Address not found" },
        { status: 404 }
      );
    }

    const { lat, lng } = data.results[0].geometry.location;

    return NextResponse.json({
      ok: true,
      lat,
      lng,
      formattedAddress: data.results[0].formatted_address,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Geocoding error" },
      { status: 500 }
    );
  }
}
