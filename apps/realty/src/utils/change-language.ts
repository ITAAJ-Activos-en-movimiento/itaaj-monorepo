interface Texts {
    [key: string]: string;
   }
   
   const texts:Texts = {
    house: 'Casa',
    apartament: 'Departamento',
    other: 'Terreno',
    office: 'Oficina'
   }
   
   export const changeLanguage = (text: string) => {
    const result = texts[text];
    if(!result) return text;
    return texts[text];
   }