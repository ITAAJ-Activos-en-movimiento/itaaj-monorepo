import { listings, listings as listingsApi } from "@/modules/listings/services";
import {
  Category,
  Location,
  PropertyType,
  Result,
  StatusType,
} from "@itaaj/entities";
import styles from "./Listings.module.css";
import Link from "next/link";
import { PropertyCard } from "@/app/comprars/viviendas/components";
import Pagination from "@/app/comprars/viviendas/components/Pagination";
import { Metadata, ResolvingMetadata } from "next";

export type ListingType =
  | "SALE"
  | "RENT_LONG"
  | "RENT_SHORT"
  | "RENT_TO_OWN"
  | "AUCTION"
  | "ROOM_RENT";
export type ListingStatus =
  | "DRAFT"
  | "REVIEW"
  | "PUBLISHED"
  | "PAUSED"
  | "EXPIRED"
  | "WITHDRAWN";
export type ISODateString = string;

const listingContent: { [key: string]: string } = {
  comprar: "venta",
  rentar: "renta",
};

const accentMap: Record<string, string> = {
  mexico: "México",
  leon: "León",
  queretaro: "Querétaro",
  merida: "Mérida",
  guadalajara: "Guadalajara",
  puebla: "Puebla",
};

function slugToPrettyText(slug: string): string {
  return slug
    .split("-")
    .map((w) => {
      const lw = w.toLowerCase();
      const corrected = accentMap[lw] ?? lw;
      return corrected.charAt(0).toUpperCase() + corrected.slice(1);
    })
    .join(" ");
}

export interface Listing {
  organizationId?: string;
  propertyId?: string | null;
  slug: string;
  images: string[];
  unitId?: string | null;
  type: ListingType;
  listingStatus: ListingStatus;
  currency: string;
  price: number;
  expenses?: number | null;
  deposit?: number | null;
  availableFrom?: ISODateString | null;
  publishedAt?: ISODateString | null;
  expiresAt?: ISODateString | null;
  metadata?: Record<string, unknown> | null;
  location: Location;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  modality?:
    | "FULL_PROPERTY"
    | "ROOM_SHARE"
    | "RENT_TO_OWN"
    | "AUCTION"
    | "BANK_OWNED";
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{
    transaction: string;
    propertyType: string;
    city: string;
    neighborhood?: string;
    page: number;
  }>;
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { transaction, propertyType, city, neighborhood } = await params;
  const { page } = await searchParams;

  const listings = (await listingsApi({
    page: Number(page || 1),
    limit: 14,
    transaction,
    city,
  })) as Result<Listing>;
  const title =
    listings.count +
    " " +
    propertyType.charAt(0).toUpperCase() +
    "" +
    propertyType.slice(1) +
    " en " +
    listingContent[transaction] +
    " en " +
    slugToPrettyText(city);
  return {
    title: title,
  };
}
const Listings = async ({ searchParams, params }: PageProps) => {
  const { transaction, propertyType, city, neighborhood } = await params;
  const { search, tipo, page } = await searchParams;

  console.log(transaction, propertyType, city, neighborhood);

  const listings = (await listingsApi({
    page: Number(page || 1),
    limit: 14,
    transaction,
    propertyType,
    city,
  })) as Result<Listing>;

  const buildUrl = (newTransaction: string) => {
    return `/${newTransaction}/${propertyType}/${city}/${
      neighborhood || "todas-las-zonas"
    }/l`;
  };

  const filteredListings = listings.items;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {listings.count}{" "}
          {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} en{" "}
          {listingContent[transaction]} en {slugToPrettyText(city)}
        </h1>
        <div className={styles.options}>
          <Link
            className={transaction == "comprar" ? styles.active : ""}
            href={buildUrl("comprar")}
          >
            Comprar
          </Link>
          <Link
            className={transaction == "rentar" ? styles.active : ""}
            href={buildUrl("rentar")}
          >
            Rentar
          </Link>
        </div>
      </div>
      <div>
        {filteredListings.map((listing, index) => (
          <PropertyCard
            key={listing.slug + index}
            transaction={transaction}
            propertyType={propertyType}
            name={""}
            slug={listing.slug}
            description={""}
            address={""}
            city={listing.city}
            state={""}
            country={""}
            neighborhood={""}
            street={""}
            external_number={""}
            internal_number={""}
            price={listing.price}
            rentPrice={listing.price}
            lowDeposit={0}
            alsoRent={false}
            alsoSell={false}
            garage={0}
            images={
              listing.images || ["/dummy.webp", "/dummy.webp", "/dummy.webp"]
            }
            amenities={[]}
            bedrooms={0}
            bathrooms={0}
            bathroomsMedium={0}
            completedAddress={false}
            image={""}
            owner={""}
            virtualTourUrl={""}
            video={""}
            antiquity={0}
            propertyStatus={""}
            blockchainId={""}
            partner={""}
            development={""}
            floorPlans={[]}
            floor={""}
            zipcode={0}
            uuid={""}
            id={""}
            location={listing.location}
            transactionType={"rent"}
            area={{
              building_area: 0,
              land_area: 0,
              total_area: 0,
            }}
            type={PropertyType.HOUSE}
            category={Category.EXCLUSIVE}
            status={StatusType.ACTIVE}
            createdAt={listing.createdAt}
            updatedAt={listing.updatedAt}
          />
        ))}
      </div>
      <Pagination pages={listings.pageInfo.pages} />
    </div>
  );
};

export default Listings;
