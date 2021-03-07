import React, { useEffect, useState } from 'react';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

type Message = {
    user: string,
    message: string,
    intent: 'chat'
    // TODO: date: string
}

function processMessage(payload: string) {
    try {
        return JSON.parse(payload)
    } catch (error) {
        return null
    }
}

const HOST = window.location.hostname + ':1338'

export default function Chat() {
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const [wsRef, setWSRef] = useState<null | WebSocket>(null)

    const history = useHistory()

    function sendMessage() {
        if (wsRef?.readyState !== WebSocket.OPEN) {
            //websocked connected
            return
        }

        wsRef.send(JSON.stringify({ message: chatMessage, intent: 'chat' }))
        setChatMessage('')
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://${HOST}/` + localStorage.getItem('token'))

        ws.addEventListener('open', () => {
            ws.send(JSON.stringify({
                intent: 'old-messages',
                count: 10
            }))
        }, { once: true })

        ws.addEventListener('error', () => {
            alert('Please login first')
            history.replace('/login')
        })

        ws.addEventListener('message', (event) => {
            const data = event.data
            const message: any = processMessage(data);

            if (!message) return

            if (message.intent === 'chat') {
                setChatMessages(oldMessages => {
                    return [...oldMessages, message as Message]
                })
            } else if (message.intent === 'old-messages') {
                setChatMessages(
                    message.data.map((item: any) => {
                        return {
                            user: item.email,
                            message: item.message
                        }
                    }).reverse()
                )
            }
        })

        setWSRef(ws)

        return () => {
            ws.close()
        }
    }, [history])

    return (
        <div>
            <h1>Chat Page</h1>
            <div className="chat-box">{chatMessages.map((message, index) => {
                return (
                    <ListItem alignItems="flex-start" key={index}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message.user}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {message.message}
                                    </Typography>

                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    // <div className="message" key={index}>
                    //     <div className="authoer">{message.user}</div>
                    //     <div className="text">{message.message}</div>
                    // </div>
                )
            })}</div>
            <TextField
                value={chatMessage}
                variant="outlined"
                onChange={e => setChatMessage(e.target.value)}
                color="primary"
                multiline
                rows={2}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={sendMessage}
            >Send Message</Button>
        </div>
    )
}