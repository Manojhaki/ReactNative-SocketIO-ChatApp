import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Pressable } from 'react-native';
import io from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import JoinScreen from './joinScreen';

export default function App() {
  const [recievedMessages, setRecievedMessages] = useState([]);

  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);
  useEffect(() => {

    socket.current = io("192.168.1.155");
    socket.current.on("message", message => {

      setRecievedMessages(prevState => GiftedChat.append(prevState, message));

    });


  }, []);

  const onSend = (messages) => {
    console.log("test", messages);
    socket.current.emit("message", messages[0].text);
    setRecievedMessages(prevState => GiftedChat.append(prevState, messages));
  }

  const joinChat = userName => {
    socket.current.emit("join", userName);
    setHasJoined(true);
  }

  return (
    <View style={{ flex: 1 }}>
      {hasJoined ?
        <GiftedChat
          renderUsernameOnMessage
          messages={recievedMessages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        /> :
        <JoinScreen joinChat={joinChat} />

      }

    </View>
  )
}


