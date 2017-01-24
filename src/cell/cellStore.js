import { EventEmitter } from 'events';
import dispatcher from '../app/dispatcher';
import C from '../constants';
var db = require('../app/firebase').getOrganizationDb('one');

class CellStore extends EventEmitter {

    constructor() {
        super();

        this.cells = [];
    }

    createCell(name, address, responsible) {
        let newCell = {
            'name': name,
            'address': address,
            'responsible': responsible
        };

        return db.push(newCell)
            .then(function(newCellRes) {
                newCell.id = newCellRes.key;
                this.cells.push(newCell);
                this.emit(C.CELL_CHANGE_LIST);
            }.bind(this)
        );
    }

    updateCell(id, name, address, responsible) {
        let newCell = {
            'name': name,
            'address': address,
            'responsible': responsible
        };

        db.child(id).update(newCell).then(function(newCellRes) {
            var oldCongr = this.cells.find(function(congr, index) {
                return congr.id === id
            });
            Object.assign(oldCongr, newCell);
            this.emit(C.CELL_CHANGE_LIST);
        }.bind(this));
    }

    deleteCell(id) {
        db.child(id).remove().then(function() {
            var newCells = this.cells.filter(function(congr) {
                return congr.id !== id
            });
            this.cells = newCells;
            this.emit(C.CELL_CHANGE_LIST);
        }.bind(this));
    }

    reloadCells(cells) {
        var keys = Object.keys(cells),
            newCongrs = [];
        keys.forEach(function(value, index) {
            cells[value].id = value;
            newCongrs.push(cells[value]);
        });

        this.cells = newCongrs;
        return this.cells;
    }

    findCells() {
        return this.cells;
    }

    handleActions(action) {
        switch (action.type) {
            case C.ACTION_CREATE_CELL:
                this.createCell(action.name, action.address, action.responsible);
            break;
            case C.ACTION_UPDATE_CELL:
                this.updateCell(action.id, action.name, action.address, action.responsible);
            break;
            case C.ACTION_DELETE_CELL:
                this.deleteCell(action.id);
            break;
            case C.ACTION_FIND_CELL:
                this.findCells();
            break;
            case C.ACTION_RELOAD_CELL:
                this.reloadCells(action.cells);
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
