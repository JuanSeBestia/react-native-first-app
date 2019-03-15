import React, { Component } from 'react'
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements'
import alberto from '../assets/images/alberto.png'
import { styles } from './styles';
import { LEADERS } from '../shared/leaders';

export default class AboutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About',
    };

    renderLeaderItem = ({ item, index }) => {
        return (
            <ListItem
                containerStyle={{ borderBottomWidth: 1, borderBottomColor: 555 }}
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: alberto }}
            />
        );
    };

    render() {
        return (
            <ScrollView style={styles.view}>
                <Card title="Our History">
                    <Text style={styles.body}>{"Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us."}</Text>
                    <Text style={styles.body}>{"The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan."}</Text>
                </Card>
                <Card title="Corporate Leadership">
                    <FlatList
                        data={this.state.leaders}
                        renderItem={this.renderLeaderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView >
        )
    }
}
