import React, { Component } from 'react'
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { styles } from './styles';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

class AboutComponent extends Component {

    static navigationOptions = {
        title: 'About',
    };

    renderLeader = ({ item, index }) => {
        return (
            <ListItem
                containerStyle={{ borderBottomWidth: 1, borderBottomColor: 555 }}
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
        );
    };

    render() {
        if (this.props.leaders.isLoading) {
            return (
                <ScrollView style={styles.view}>
                    <Card title="Corporate Leadership">
                        <Loading />
                    </Card>
                </ScrollView >
            )
        } else if (this.props.leaders.errMess) {
            return (
                <ScrollView style={styles.view}>
                    <Card title="Corporate Leadership">
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView >
            )
        } else {
            return (
                <ScrollView style={styles.view}>
                    <Card title="Corporate Leadership">
                        <FlatList
                            data={this.props.leaders.leaders}
                            renderItem={this.renderLeader}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </ScrollView >
            )
        }
    }
}

export default connect(mapStateToProps)(AboutComponent);