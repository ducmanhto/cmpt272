"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PigController = void 0;
var PigController = /** @class */ (function () {
    function PigController() {
        this.pigs = [];
    }
    PigController.prototype.add = function (p) {
        this.pigs.push(p);
        localStorage.pigsArray = JSON.stringify(this.pigs);
    };
    PigController.prototype.getAll = function () {
        return JSON.parse(localStorage.pigsArray);
    };
    PigController.prototype.delete = function (p) {
        var index = this.pigs.findIndex(function (pig) { return pig.id === p.id; });
        this.pigs.splice(index, 1);
        localStorage.pigsArray = JSON.stringify(this.pigs);
    };
    return PigController;
}());
exports.PigController = PigController;
