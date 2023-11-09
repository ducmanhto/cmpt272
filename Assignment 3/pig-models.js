"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Black = exports.White = exports.Chesnut = exports.Grey = exports.Pig = void 0;
var Pig = /** @class */ (function () {
    function Pig(category, name, breed, height, weight, personality, ability) {
        this.category = category;
        this.name = name;
        this.breed = breed;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.ability = ability;
        this.id = Pig.num;
        Pig.num++;
    }
    Pig.num = 0;
    return Pig;
}());
exports.Pig = Pig;
var Grey = /** @class */ (function (_super) {
    __extends(Grey, _super);
    function Grey(cat, n, b, h, w, p, sw) {
        var _this = _super.call(this, cat, n, b, h, w, p, sw) || this;
        _this.swimming = sw;
        return _this;
    }
    return Grey;
}(Pig));
exports.Grey = Grey;
var Chesnut = /** @class */ (function (_super) {
    __extends(Chesnut, _super);
    function Chesnut(cat, n, b, h, w, p, ability) {
        var _this = _super.call(this, cat, n, b, h, w, p, ability) || this;
        _this.language = ability;
        return _this;
    }
    return Chesnut;
}(Pig));
exports.Chesnut = Chesnut;
var White = /** @class */ (function (_super) {
    __extends(White, _super);
    function White(cat, n, b, h, w, p, ability) {
        var _this = _super.call(this, cat, n, b, h, w, p, ability) || this;
        _this.running = ability;
        return _this;
    }
    return White;
}(Pig));
exports.White = White;
var Black = /** @class */ (function (_super) {
    __extends(Black, _super);
    function Black(cat, n, b, h, w, p, ability) {
        var _this = _super.call(this, cat, n, b, h, w, p, ability) || this;
        _this.strength = ability;
        return _this;
    }
    return Black;
}(Pig));
exports.Black = Black;
