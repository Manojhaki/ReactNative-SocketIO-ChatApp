import React, { useState } from 'react';
import { View, Button, TextInput, Image } from 'react-native';

export default function JoinScreen({ joinChat }) {
    const [userName, setUserName] = useState("");
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {/* <Image source={require("./assets/chat.png")}></Image> */}
            <TextInput
                onChangeText={text => setUserName(text)}
                value={userName}
                placeholder='Enter a UserName'></TextInput>
            <Button title='Join Chat' onPress={() => joinChat(userName)}></Button>
        </View>
    )
}