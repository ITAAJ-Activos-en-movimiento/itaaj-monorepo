export function dateFormater(fechaString: string): string {
    const fecha: Date = new Date(fechaString);
    const hoy: Date = new Date();
    const tiempoTranscurrido: number = hoy.getTime() - fecha.getTime();
    const diasTranscurridos: number = Math.floor(tiempoTranscurrido / (1000 * 60 * 60 * 24));
    
    if (diasTranscurridos === 1) {
        return "Publicado hace 1 día";
    } else {
        return `Publicado hace ${diasTranscurridos} días`;
    }
}