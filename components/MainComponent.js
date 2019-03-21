import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid } from 'react-native';
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
import Login from './LoginComponent';

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
    headerLeft: <Icon name="menu" containerStyle={{ marginLeft: 16 }}
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
    { Contact: { screen: ContactComponent } }, { defaultNavigationOptions });

const AboutNavigator = createStackNavigator(
    { About: { screen: AboutComponent } }, { defaultNavigationOptions });

const ReservationNavigator = createStackNavigator(
    { Reservation: { screen: Reservation } }, { defaultNavigationOptions });

const FavoritesNavigator = createStackNavigator(
    { Favorites: { screen: FavoritesComponent } }, { defaultNavigationOptions });

const LoginNavigator = createStackNavigator(
    { Login: { screen: Login } }, { defaultNavigationOptions });

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
    Login: {
        screen: LoginNavigator,

        navigationOptions: {
            title: 'Login',
            drawerIcon: ({ tintColor }) => <Icon name="sign-in" type="font-awesome" color={tintColor} />,
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

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        console.log("Main:componentDidMount:props", this.props);

        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: '
                    + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                    ToastAndroid.LONG)
            });

        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);

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