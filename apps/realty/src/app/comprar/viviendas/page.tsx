import React from 'react'
import { PropertyCard } from './components'
import { properties as propertiesApi } from '@/services'
import { Property } from '@itaaj/entities';

const Properties = async () => {
    const properties = await propertiesApi({ page: 1, limit: 14 });
    return (
    <div style={{
        width: 900,
        marginInline: "auto",
        paddingBlock: 50,
    }} >
        <h2>Departamentos y casas en venta en México</h2>
        

        {properties.items.map((property: Property) => (
            <PropertyCard key={property.id} {...property} />
        ))}
    </div>
  )
}

export default Properties