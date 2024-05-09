import { useEffect, useRef } from "react";


interface Props{
    handler: () => void
    listenCapturing?: boolean
}

export const useOutsideClick = <T extends HTMLElement | SVGElement>({handler, listenCapturing = true}:Props) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            } 
        }

        document.addEventListener('click', handleClick, listenCapturing)

        return ()=> document.removeEventListener('click', handleClick, listenCapturing);
    }, [handler, listenCapturing]);
    return ref;
}