interface Texts {
    [key: string]: string;
   }
   
   const texts:Texts = {
    house: 'Casa',
    apartament: 'Departamento',
    other: 'Otro',
    landscape: 'Terreno',
    office: 'Oficina',
    House: 'Casa',
    Apartament: 'Departamento',
    Other: 'Otro',
    Landscape: 'Terreno',
    Office: 'Oficina'
   }
   
   export const changeLanguage = (text: string) => {
    const result = texts[text];
    if(!result) return text;
    return texts[text];
   }