import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import uthappizza from '../assets/images/uthappizza.png'
import { DISHES } from '../shared/dishes';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {

            return (
                <ListItem
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: 555 }}
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    leftAvatar={{ source: uthappizza }}
                />
            );
        };

        return (
            <FlatList
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default Menu;