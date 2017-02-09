import dispatcher from '../app/dispatcher';
import C from '../constants';

export function changeTitleAppBar(title) {
    dispatcher.dispatch({
        type: C.ACTION_CHANGE_TITLE,
        title
    });
}