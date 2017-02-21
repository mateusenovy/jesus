import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';

class AppBarStore extends EventEmitter {

    constructor() {
        super();

        this.defaultTitle = 'Treis';
    }

    changeTitleAppBar(title, showGoBack) {
        title = title || this.defaultTitle;
        this.emit(C.ACTION_CHANGE_TITLE, title, showGoBack);
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CHANGE_TITLE:
                this.changeTitleAppBar(action.title, action.showGoBack);
            break;
            default:
                // DO NOTHING
        }
    }
}

const appBarStore = new AppBarStore();
appBarStore.dispatcherIndex = dispatcher.register(appBarStore.handleActions.bind(appBarStore));;

export default appBarStore;
