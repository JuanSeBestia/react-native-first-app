import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
// Animations
import * as Animatable from 'react-native-animatable';
// Native Capabilities
import { Permissions, Notifications } from 'expo';

export class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests}\n`
            + `Smoking? ${this.state.smoking}\n`
            + `Date and Time: ${this.state.date}`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.submit() } },
            ],
            { cancelable: false }
        );
    }

    submit() {
        console.log("handleReservation", this.state);
        this.presentLocalNotification(this.state.date);
        // this.toggleModal();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View
                    animation="zoomIn" duration={1000}
                >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1'></Picker.Item>
                            <Picker.Item label='2' value='2'></Picker.Item>
                            <Picker.Item label='3' value='3'></Picker.Item>
                            <Picker.Item label='4' value='4'></Picker.Item>
                            <Picker.Item label='5' value='5'></Picker.Item>
                            <Picker.Item label='6' value='6'></Picker.Item>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}
                        ></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format='lll'
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: { left: 0, top: 4, marginLeft: 0, position: 'absolute' },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={date => this.setState({ date: date })}

                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                        />
                    </View>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => { this.toggleModal(); this.resetForm() }}
                        onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of gests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Date and time: {this.state.date}</Text>
                            <Button
                                onPress={() => { 
                                    this.toggleModal(); 
                                    this.resetForm();
                                 }}
                                title='Close'
                                color='#512DA8'
                            />
                        </View>

                    </Modal>

                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        color: "white",
        textAlign: 'center',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10
    }

})

export default Reservation
