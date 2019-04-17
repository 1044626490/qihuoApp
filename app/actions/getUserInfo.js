import Api from '../utils/api';
import * as C from '../constants/action'

const fetchPosts = (params) => dispatch => {
    return new Promise(function (resolve, reject) {
        Api.getUserInfo(params).then((res) => {
            resolve(res)
            dispatch({
                type: C.GET_USERINGO,
                data: Object.assign({}, res)
            });
        }).catch((err) => {
            reject(err)
            dispatch({
                type: C.GET_USERINGO,
                data: Object.assign({}, err)
            });
        })
    })
};

export const fetchPostsGetUser = params => (dispatch) => {
    return dispatch(fetchPosts(params))
};
// export fetchPosts()