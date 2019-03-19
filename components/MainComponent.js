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

import { connect } from 'react-redux';
import { fetchDishes } from '../redux/dishes/ActionCreators';
import { fetchComments } from '../redux/comments/ActionCreators';
import { fetchPromos } from '../redux/promotions/ActionCreators';
import { fetchLeaders } from '../redux/leaders/ActionCreators';
import Reservation from './ReservationComponent';
import FavoritesComponent from './FavoritesComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

// Menu render
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

// START NAVIGATION
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

const ReservationNavigator = createStackNavigator(
    { Home: { screen: Reservation } }, { defaultNavigationOptions });

const FavoritesNavigator = createStackNavigator(
    { Home: { screen: FavoritesComponent } }, { defaultNavigationOptions });

const MainNavigator = createDrawerNavigator({
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerIcon: ({ tintColor }) => <Icon name="list" color={tintColor} />,
        },
    },
    About: {
        screen: AboutNavigator,

        navigationOptions: {
            title: 'About',
            drawerIcon: ({ tintColor }) => <Icon name="info" color={tintColor} />,
        },
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
        },
    },
    Reservation: {
        screen: ReservationNavigator,

        navigationOptions: {
            title: 'Reservation',
            drawerIcon: ({ tintColor }) => <Icon name="cutlery" type="font-awesome" color={tintColor} />,
        },
    },
    Favorites: {
        screen: FavoritesNavigator,

        navigationOptions: {
            title: 'Favorites',
            drawerIcon: ({ tintColor }) => <Icon name="heart" type="font-awesome" color={tintColor} />,
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

// END NAVIGATION



class Main extends Component {

    componentDidMount() {
        console.log("Main:componentDidMount:props", this.props);

        if (!this.props.dishes.dishes.length) this.props.fetchDishes();
        else console.log("Main:componentDidMount:Dishes already loaded");
        if (!this.props.comments.comments.length) this.props.fetchComments();
        else console.log("Main:componentDidMount:Comments already loaded");
        if (!this.props.promotions.promotions.length) this.props.fetchPromos();
        else console.log("Main:componentDidMount:Promos already loaded");
        if (!this.props.leaders.leaders.length) this.props.fetchLeaders();
        else console.log("Main:componentDidMount:Comments already loaded");
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0 }}>
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


export default connect(mapStateToProps, mapDispatchToProps)(Main);