import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import DishDetail from './DIshDetailComponent';
// in managed apps:
import { Constants } from 'expo';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';


const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#512DA8',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"
    }
}

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
},
    {
        initialRouteName: 'Menu',
        defaultNavigationOptions
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    }, { defaultNavigationOptions });

const MainNavigator = createDrawerNavigator({
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
        }
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
        },
    }
}, {
        drawerBackgroundColor: '#D1C4E9'
    });
const MainContainer = createAppContainer(MainNavigator);
class Main extends Component {

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0 }}>
                {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                <MainContainer />
            </View>
        );
    }
}

export default Main;