import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable';

import { MailComposer } from 'expo';

export default class ContactComponent extends Component {
    static navigationOptions = {
        title: 'Contact',
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="bounceOut" duration={2000} delay={0}>
                    <Card title="Contact Information">
                        <Text style={styles.body}>{"121, Clear Water Bay Road"}</Text>
                        <Text style={styles.body}>{"Clear Water Bay, Kowloon"}</Text>
                        <Text style={styles.body}>{"HONG KONG"}</Text>
                        <Text style={styles.body}>{"Tel: +852 1234 5678"}</Text>
                        <Text style={styles.body}>{"Fax: +852 8765 4321"}</Text>
                        <Text style={styles.body}>{"Email:confusion@food.net"}</Text>
                    </Card>
                </Animatable.View >
                <Animatable.View animation="bounceIn" duration={2000} delay={0}>
                    <Card title="Contact Information">
                        <Text style={styles.body}>{"121, Clear Water Bay Road"}</Text>
                        <Text style={styles.body}>{"Clear Water Bay, Kowloon"}</Text>
                        <Text style={styles.body}>{"HONG KONG"}</Text>
                        <Text style={styles.body}>{"Tel: +852 1234 5678"}</Text>
                        <Text style={styles.body}>{"Fax: +852 8765 4321"}</Text>
                        <Text style={styles.body}>{"Email:confusion@food.net"}</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View >
            </ScrollView>
        )
    }
}
