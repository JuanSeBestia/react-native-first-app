import * as ActionTypes from './ActionTypes';

export const fetchFavorites = () => ({
    type: ActionTypes.FETCH_FAVORITES
});

export const postFavorite = (dishId)  => (dispatch) => {
    // Mock implementation
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});  