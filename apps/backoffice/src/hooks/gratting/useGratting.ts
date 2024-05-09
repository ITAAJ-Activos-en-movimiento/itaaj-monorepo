import { useEffect, useState } from "react";

export const useGratting = () => {
    const [gratting, setGratting] = useState("Buenos días"); 

    const fn = () => {


    const actualTime = new Date().getHours();
        if (actualTime >= 0 && actualTime < 12) {
            setGratting('Buenos días')
        } else if (actualTime >= 12 && actualTime < 18) {
            setGratting('Buenas tardes')

        } else {
            setGratting('Buenas noches')
        }
    }
      
    useEffect(() => {
        fn()
    }, [])
    
    return { gratting }
}