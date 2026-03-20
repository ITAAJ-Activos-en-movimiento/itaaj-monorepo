'use client'
import { useEffect, useMemo, useState } from "react";
import { Property, User } from "@itaaj/entities";
import { Table } from "@/containers";
import { usePropertiesDevs } from "@/hooks";
import PropertyRow from "./PropertyRow";
import Menus from "@/components/Shared/Menus";


const API_BASE = import.meta.env.VITE_API_URL; // ✅ Vite

const PropertyTable = () => {
  const { properties } = usePropertiesDevs() as { properties: Property[] };

  const me = useMemo(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }, []);

  const ownerIds = useMemo(() => {
    return Array.from(
      new Set(
        properties
          .map((listing) => listing.owner || (listing as any).userId)
          .filter(Boolean)
      )
    ) as string[];
  }, [properties]);

  const [usersById, setUsersById] = useState<Record<string, User>>({});

useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      if (!ownerIds.length) {
        setUsersById({});
        return;
      }

      const validOwnerIds = ownerIds.filter((id) => !id.includes("https"));

      if (!validOwnerIds.length) {
        setUsersById({});
        return;
      }

      const responses = await Promise.all(
        validOwnerIds.map((id) =>
          fetch(`${API_BASE}/users/${id}`, {
            cache: "no-store",
          }).catch(() => null)
        )
      );

      const users = await Promise.all(
        responses.map(async (res) => {
          if (!res || !res.ok) return null;
          return (await res.json()) as User;
        })
      );

      console.log({users})
      if (cancelled) return;

      const map: Record<string, User> = {};

      users.forEach((u, i) => {
        const id = validOwnerIds[i];
        if (u && id) {
          map[id] = u;
        }
      });

      setUsersById(map);
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [ownerIds]);

  console.log({usersById})
  const propertiesMain = useMemo(() => {
    return properties
      .filter((property) => property.lowDeposit > 0 && property.owner !== me?.id)
      .map((property) => {
        const ownerId = property.owner;
        const owner = ownerId ? usersById[ownerId] : undefined;
        return { ...property, owner };
      });
  }, [properties, usersById, me?.id]);

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 5rem">
        <Table.Header>
          <div>Desarrollo</div>
          <div>Nombre</div>
          <div>Telefono</div>
          <div>Porcentaje</div>
              <div>Tipo</div>
          <div style={{ textAlign: "right" }}>Precio</div>
        </Table.Header>

        <Table.Body<any>
          data={propertiesMain}
          render={(property, index) => (
            <PropertyRow property={property} index={index} key={property.uuid} />
          )}
        />
      </Table>
    </Menus>
  );
};

export default PropertyTable;