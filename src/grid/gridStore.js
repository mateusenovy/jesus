import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

class GridStore extends EventEmitter {

    constructor() {
        super();

        this.grids = [];
    }

    createGrid(name, color, responsible) {
        let newGrid = {
            'name': name,
            'color': color,
            'responsible': responsible
        };

        return db.push(newGrid)
            .then(function(newGridRes) {
                newGrid.id = newGridRes.key;
                this.grids.push(newGrid);
                this.emit(C.GRID_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateGrid(id, name, color, responsible) {
        let newGrid = {
            'name': name,
            'color': color,
            'responsible': responsible
        };

        db.child(id).update(newGrid).then(function(newGridRes) {
            var oldCongr = this.grids.find(function(congr, index) {
                return congr.id === id
            });
            Object.assign(oldCongr, newGrid);
            this.emit(C.GRID_CHANGE_LIST);
        }.bind(this));
    }

    deleteGrid(id) {
        db.child(id).remove().then(function() {
            var newGrids = this.grids.filter(function(congr) {
                return congr.id !== id
            });
            this.grids = newGrids;
            this.emit(C.GRID_CHANGE_LIST);
        }.bind(this));
    }

    reloadGrids(grids) {
        var keys = Object.keys(grids),
            newCongrs = [];
        keys.forEach(function(value, index) {
            grids[value].id = value;
            newCongrs.push(grids[value]);
        });

        this.grids = newCongrs;
        return this.grids;
    }

    findGrids() {
        return this.grids;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_GRID:
                this.createGrid(action.name, action.color, action.responsible);
            break;
            case C.ACTION_UPDATE_GRID:
                this.updateGrid(action.id, action.name, action.color, action.responsible);
            break;
            case C.ACTION_DELETE_GRID:
                this.deleteGrid(action.id);
            break;
            case C.ACTION_FIND_GRID:
                this.findGrids();
            break;
            case C.ACTION_RELOAD_GRID:
                this.reloadGrids(action.grids);
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
