"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayersIds = void 0;
var getPlayersIds = function (playerslist) {
    var playersIds = { FW: [], MF: [], DF: [], GK: [] };
    var getPlayerIdsByPosition = function (position) {
        var playerIdsByPosition = [];
        playerIdsByPosition = __spreadArray(__spreadArray([], playerslist.currentSquad.filter(function (p) { return p.position === position; }).map(function (p) { return p.playerId; })), playerslist.recentCallUps.filter(function (p) { return p.position === position; }).map(function (p) { return p.playerId; }));
        return playerIdsByPosition;
    };
    playersIds = {
        FW: getPlayerIdsByPosition('FW'),
        MF: getPlayerIdsByPosition('MF'),
        DF: getPlayerIdsByPosition('DF'),
        GK: getPlayerIdsByPosition('GK')
    };
    return playersIds;
};
exports.getPlayersIds = getPlayersIds;
//# sourceMappingURL=SoccerPlayerIds.js.map