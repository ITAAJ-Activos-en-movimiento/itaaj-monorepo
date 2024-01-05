'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Itabot.module.css';
import axios from 'axios';
import { Loader } from 'react-feather';
import { marked } from 'marked';

const sendMessage = async (message: any) => {
    const { data } = await axios.post('https://itaajrealty.com/api/api/v1/chat', message)
    return data;
}

const Itabot = () => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<any>([]);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        const messages = [
            ...chatMessages,
            {role: 'user', content: query}
        ];

        setChatMessages(messages)
        setQuery('');

        const response = await sendMessage(messages);
        setLoading(false)
        setChatMessages((m: any) => [
            ...m, 
            response
        ]);
        setAnswer('')
    }

    const containerRef = useRef<HTMLDivElement | null>(null);

    // Función para hacer scroll hacia abajo
    const scrollToBottom = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    };
  
    // Llamamos a scrollToBottom cada vez que el contenido cambie
    useEffect(() => {
      scrollToBottom();
    }, [chatMessages]);
  

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Itabot</h2>
            </div>
            <div className={styles.messages} ref={containerRef}>
                {chatMessages.map((mess: any, index: number) => (
                    <div className={styles.message} style={{
                        flexDirection: mess.role == 'user'? 'row-reverse' : 'row'
                    }} key={index}>
                        <div className={styles.icon}>{mess.role == 'user'? mess?.role?.charAt(0) : 'I'}</div>
                        <p style={{
                            textAlign: mess.role == 'user'? 'right' : 'left'
                        }}>{mess.content}</p>
                        
                    </div>
                ))}
                {loading && <p>Escribiendo...</p>}
            </div>
            <form onSubmit={onSubmit} className={styles.input}>
                <input type="text" value={query} onChange={({ target }) => setQuery(target.value)} placeholder='Escribe un mensaje' />

                <button disabled={loading} type='submit'>{loading? <Loader /> :  'Enviar'}</button>
            </form>

        </div>
    )
}

export default Itabot