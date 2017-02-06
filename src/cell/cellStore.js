import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

class CellStore extends EventEmitter {

    constructor() {
        super();

        this.cells = [];
    }

    createCell(congregationId, gridId, name, address, responsible) {
        let newCell = {
            'name': name,
            'address': address,
            'responsible': responsible
        };

        db.child(congregationId).child('grids').child(gridId).child('cells').push(newCell)
            .then(function(newCellRes) {
                newCell.id = newCellRes.key;
                this.cells.push(newCell);
                this.emit(C.CELL_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateCell(congregationId, gridId, cellId, name, address, responsible) {
        debugger;
        let newCell = {
            'name': name,
            'address': address,
            'responsible': responsible
        };

        db.child(congregationId).child('grids').child(gridId).child('cells').child(cellId).update(newCell).then(function(newCellRes) {
            var oldCongr = this.cells.find(function(congr, index) {
                return congr.id === cellId
            });
            Object.assign(oldCongr, newCell);
            this.emit(C.CELL_CHANGE_LIST);
        }.bind(this));
    }

    deleteCell(congregationId, gridId, cellId) {
        db.child(congregationId).child('grids').child(gridId).child('cells').child(cellId).remove().then(function() {
            var newCells = this.cells.filter(function(congr) {
                return congr.id !== cellId
            });
            this.cells = newCells;
            this.emit(C.CELL_CHANGE_LIST);
        }.bind(this));
    }

    reloadCells(congregationId, gridId, congregations) {
        let cells = congregations[congregationId].grids[gridId].cells,
            newCells = [];

        if (!!cells) {
            var keys = Object.keys(cells);
            keys.forEach(function(value, index) {
                cells[value].id = value;
                newCells.push(cells[value]);
            });
        }

        this.cells = newCells;
        return this.cells;
    }

    findCells() {
        return this.cells;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_CELL:
                this.createCell(action.congregationId, action.gridId, action.name, action.address, action.responsible);
            break;
            case C.ACTION_UPDATE_CELL:
                this.updateCell(action.congregationId, action.gridId, action.cellId, action.name, action.address, action.responsible);
            break;
            case C.ACTION_DELETE_CELL:
                this.deleteCell(action.congregationId, action.gridId, action.cellId);
            break;
            case C.ACTION_FIND_CELL:
                this.findCells();
            break;
            case C.ACTION_RELOAD_CELL:
                this.reloadCells(action.congregationId, action.gridId, action.congregations);
                this.emit(C.CELL_CHANGE_LIST);
            break;
            default:
                // DO NOTHING
        }
    }
}

const cellStore = new CellStore();
cellStore.dispatcherIndex = dispatcher.register(cellStore.handleActions.bind(cellStore));;

export default cellStore;
