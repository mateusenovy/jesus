import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

class GridStore extends EventEmitter {

    constructor() {
        super();

        this.grids = [];
    }

    createGrid(congregationId, name, color, responsible) {
        let newGrid = {
            'name': name,
            'color': color,
            'responsible': responsible
        };
        
        return db.child(congregationId).child('grids').push(newGrid)
            .then(function(newGridRes) {
                newGrid.id = newGridRes.key;
                this.grids.push(newGrid);
                this.emit(C.GRID_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateGrid(id, congregationId, name, color, responsible) {
        let newGrid = {
            'name': name,
            'color': color,
            'responsible': responsible
        };

        db.child(congregationId).child('grids').child(id).update(newGrid).then(function(newGridRes) {
            var oldCongr = this.grids.find(function(congr, index) {
                return congr.id === id
            });
            Object.assign(oldCongr, newGrid);
            this.emit(C.GRID_CHANGE_LIST);
        }.bind(this));
    }

    deleteGrid(congregationId, id) {
        db.child(congregationId).child('grids').child(id).remove().then(function() {
            var newGrids = this.grids.filter(function(congr) {
                return congr.id !== id
            });
            this.grids = newGrids;
            this.emit(C.GRID_CHANGE_LIST);
        }.bind(this));
    }

    reloadGrids(congregationId, congregations) {
        let grids = congregations[congregationId].grids,
            newGrids = [];

        if (grids) {
            let keys = Object.keys(grids);

            keys.forEach(function(value, index) {
                grids[value].id = value;
                newGrids.push(grids[value]);
            });
        }

        this.grids = newGrids;
        return this.grids;
    }

    findGrids() {
        return this.grids;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_GRID:
                this.createGrid(action.congregationId, action.name, action.color, action.responsible);
            break;
            case C.ACTION_UPDATE_GRID:
                this.updateGrid(action.id, action.congregationId, action.name, action.color, action.responsible);
            break;
            case C.ACTION_DELETE_GRID:
                this.deleteGrid(action.congregationId, action.id);
            break;
            case C.ACTION_FIND_GRID:
                this.findGrids();
            break;
            case C.ACTION_RELOAD_GRID:
                this.reloadGrids(action.congregationId, action.congregations);
                this.emit(C.GRID_CHANGE_LIST);
            break;
            default:
                // DO NOTHING
        }
    }
}

const gridStore = new GridStore();
gridStore.dispatcherIndex = dispatcher.register(gridStore.handleActions.bind(gridStore));;

export default gridStore;
