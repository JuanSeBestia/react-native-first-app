import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements'
import { styles } from './styles';

export default class ContactComponent extends Component {
    static navigationOptions = {
        title: 'Contact',
    };
    render() {
        return (
            <View style={styles.view}>
                <Card title="Contact Information">
                    <Text style={styles.body}>{"121, Clear Water Bay Road"}</Text>
                    <Text style={styles.body}>{"Clear Water Bay, Kowloon"}</Text>
                    <Text style={styles.body}>{"HONG KONG"}</Text>
                    <Text style={styles.body}>{"Tel: +852 1234 5678"}</Text>
                    <Text style={styles.body}>{"Fax: +852 8765 4321"}</Text>
                    <Text style={styles.body}>{"Email:confusion@food.net"}</Text>
                </Card>
            </View >
        )
    }
}
