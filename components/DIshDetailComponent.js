import React, { Component } from 'react';
import {
    Text, ScrollView, View, FlatList, StyleSheet, Modal,

} from 'react-native';
import { Card, Icon, Input, Rating, Button } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/favorites/ActionCreators';
import { postComment } from '../redux/comments/ActionCreators';

import * as Animatable from 'react-native-animatable';
import { Alert, PanResponder } from 'react-native';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishID) => dispatch(postFavorite(dishID)),
    postComment: ({ dishId, rating, author, comment }) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderDish(props) {

    handleViewRef = ref => this.view = ref;

    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200) // Move to left
            return 'left';
        else if (dx > 200)
            return 'right'
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            console.log("onStartShouldSetPanResponder:", { e, gestureState: { ...gestureState } });
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("onPanResponderEnd:", { e, gestureState: { ...gestureState } });
            const gesture = recognizeDrag(gestureState)
            switch (gesture) {
                case 'left':
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
                        ],
                        { cancelable: false }
                    );
                    break;
                case 'right':
                    props.toggleModal();
                    break;
                default:
                    this.view.rubberBand(1000)
                        .then(endState => console.log("rubberBand:", endState.finished ? 'finished' : 'cancelled'));
                    break;
            }
            return true;
        }
    })

    if (dish != null) {
        return (
            <Animatable.View
                animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}
                ref={this.handleViewRef}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={styles.inRowCenter}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}



function RenderComments({ comments }) {
    let renderDelay = 2000;
    renderItemComment = ({ item, index }) => {
        const delay = renderDelay;
        renderDelay += 300;
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={delay}>
                <View key={index} style={{ margin: 10 }}>
                    <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                    <Rating
                        imageSize={12}
                        readonly
                        startingValue={item.rating}
                        style={styles.rating}
                    />
                    <Text style={{ fontSize: 12 }}>{'--' + item.author}</Text>
                </View >
            </Animatable.View>
        )
    }
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderItemComment}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    )
}


class DishDetail extends Component {

    constructor(props) {
        super(props);
        const dishId = this.props.navigation.getParam('dishId', '');
        this.defautValuesForm = {
            "dishId": dishId,
            "rating": 5,
            "comment": "",
            "author": "",
        }

        this.state = {
            favorites: [],
            showModal: false,
            formComment: { ...this.defautValuesForm },
        }
    }

    // Not set on default
    static navigationOptions = {
        title: 'Dish Details',
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        },
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal = () =>
        this.setState({ showModal: !this.state.showModal })

    resetForm = () =>
        this.setState({ formComment: { ...this.defautValuesForm } })

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    submit = () => {
        console.log("comment:submit:", this.state.formComment);
        this.props.postComment(this.state.formComment);
        this.resetForm();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            onFinishRating={value => this.setState({ formComment: { ...this.state.formComment, rating: value } })}
                            style={{ paddingVertical: 10 }}
                            startingValue={this.state.formComment.rating}
                        />
                        <Input
                            placeholder=' Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ marginRight: 14 }}
                            onChangeText={value => this.setState({ formComment: { ...this.state.formComment, author: value } })}
                        />
                        <Input
                            placeholder=' Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ marginRight: 14 }}
                            onChangeText={value => this.setState({ formComment: { ...this.state.formComment, comment: value } })}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: '#512DA8' }}
                            containerStyle={{ marginTop: 22 }}
                            onPress={() => { this.toggleModal(); this.submit() }}
                            title='SUBMIT'
                            color='#512DA8'
                        />
                        <Button
                            containerStyle={{ marginTop: 22 }}
                            buttonStyle={{ backgroundColor: 'gray' }}
                            onPress={() => { this.toggleModal(); this.resetForm() }}
                            title='CANCEL'
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    inRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
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
    },
    rating: {
        alignItems: 'flex-start'
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
