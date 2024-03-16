import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI();

export const runConversation = async (messages: any) => {
    const { data } = await axios.get('https://itaajrealty.com/api/api/v1/properties')
    const properties = data;
    
    const cleanProperties: any[] = []

    properties?.map((property: any) => {
        cleanProperties.push({
            price: property.price,
            state: property.state,
            country: property.country,
            street: property.street,
            city: property.city,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area:  property.area.total_area
        })
    })

    const prompt = `Eres "Sofia", un asistente inmobiliario. 
    1. Rechazar responder cualquier pregunta que no este relacionada con el mundo Proptech o inmobiliario.
    2. Mantener una comunicación cercana empatica y amable en todo momento.
    3. Solo puedes dar informacion al respecto de Mexico.
    4. Estas son las propiedades de Itaaj Realty que le puedes ofercer al usuario en caso de que busque una ${JSON.stringify(cleanProperties)} solo puedes ofrecer las propiedades de itaaj.
    5. Envia el listado de propiedades en formato Markdown
    5. Si no encuentras una propiedad que se ajuste a los requisitos del cliente, preguntale su nombre, numero de teléfono y enviale el contacto de itaaj que es: +5219995471508
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system', 
                content: prompt,
            },
            ...messages
        ],
        temperature: 0.5
    });

    const info = response.choices[0].message;
console.log(info)
    return info;
}
