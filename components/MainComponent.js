import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import DishDetail from './DIshDetailComponent';
// in managed apps:
import { Constants } from 'expo';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';


const CustomDrawerContentComponent = (props) => (

    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

export const defaultNavigationOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: '#512DA8',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"
    },
    headerLeft: <Icon name="menu" size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu, navigationOptions: defaultNavigationOptions },
    DishDetail: { screen: DishDetail }
},
    {
        initialRouteName: 'Menu',
    }
);

const HomeNavigator = createStackNavigator(
    { Home: { screen: Home } }, { defaultNavigationOptions });

const ContactNavigator = createStackNavigator(
    { Home: { screen: ContactComponent } }, { defaultNavigationOptions });

const AboutNavigator = createStackNavigator(
    { Home: { screen: AboutComponent } }, { defaultNavigationOptions });

const MainNavigator = createDrawerNavigator({

    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerIcon: ({ tintColor }) => <Icon name="list" color={tintColor} />,
        },
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
        },
    },
    About: {
        screen: AboutNavigator,

        navigationOptions: {
            title: 'About',
            drawerIcon: ({ tintColor }) => <Icon name="info" color={tintColor} />,
        },
    },
}, {
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 1
            }
        }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});


export default Main;