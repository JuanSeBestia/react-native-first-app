import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import uthappizza from '../assets/images/uthappizza.png'

function Menu(props) {

    const renderMenuItem = ({item, index}) => {

        return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: uthappizza}}
                  />
        );
    };

    return (
            <FlatList 
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}


export default Menu;