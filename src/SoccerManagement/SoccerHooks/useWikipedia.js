"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWikipediaBySoccerPlayer = exports.useWikipediaByCountry = void 0;
var axios_1 = require("axios");
var react_query_1 = require("react-query");
var fetchWikipediaByTeam = function (countryName) {
    if (countryName === 'United States') {
        return axios_1.default.get("https://en.wikipedia.org/wiki/United_States_men%27s_national_American_football_team");
    }
    return axios_1.default.get("https://en.wikipedia.org/wiki/" + countryName + "_national_football_team");
};
var fetchWikipediaByPlayer = function (url) {
    return axios_1.default.get("https://en.wikipedia.org/" + url);
};
var useWikipediaByCountry = function (countryName) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var data = react_query_1.useQuery(['wikipedia', countryName], function () { return fetchWikipediaByTeam(countryName); }).data;
    var divElement = document.createElement('div');
    divElement.innerHTML = data === null || data === void 0 ? void 0 : data.data.toString();
    var tableRowsSelector = divElement.querySelectorAll('table > tbody > tr.nat-fs-player');
    var currentSquadTable = (_a = tableRowsSelector[0]) === null || _a === void 0 ? void 0 : _a.parentNode;
    var recentCallUpsTable = (_b = tableRowsSelector[tableRowsSelector.length - 1]) === null || _b === void 0 ? void 0 : _b.parentNode;
    console.log(tableRowsSelector);
    var playersName = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player > th > a');
    var playersDOB = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player span.bday');
    var playerClubName = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player td:nth-last-child(1) > a');
    var playerClubNationFlag = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player span.flagicon > a > img');
    var playerPosition = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player td:nth-child(2) > a');
    var playerMatches = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player td:nth-child(5)');
    var playerGoals = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player td:nth-child(6)');
    var recentPlayersName = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player > th > a');
    var recentPlayersDOB = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player span.bday');
    var recentPlayerClubName = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player td:nth-last-child(2) > a');
    var recentPlayerClubNationFlag = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player span.flagicon > a > img');
    var recentPlayerPosition = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player td:nth-child(1) > a');
    var recentPlayerMatches = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player td:nth-child(4)');
    var recentPlayerGoals = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player td:nth-child(5)');
    var infoBoxImageSelector = divElement.querySelectorAll('td.infobox-image > a > img');
    if (['Australia', 'Bulgaria', 'Algeria', 'Nigeria', 'Haiti'].indexOf(countryName) != -1) {
        playersName = currentSquadTable === null || currentSquadTable === void 0 ? void 0 : currentSquadTable.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
        if (['Nigeria', 'Algeria'].indexOf(countryName) === -1) {
            recentPlayersName = recentCallUpsTable === null || recentCallUpsTable === void 0 ? void 0 : recentCallUpsTable.querySelectorAll('tr.nat-fs-player > th span.vcard > span > a');
        }
    }
    var players = {
        teamNationalLogo: (_c = infoBoxImageSelector.item(0)) === null || _c === void 0 ? void 0 : _c.getAttribute('src'),
        currentSquad: [],
        recentCallUps: []
    };
    for (var i = 0; i < ((playersName === null || playersName === void 0 ? void 0 : playersName.length) || 0); i++) {
        players.currentSquad.push({
            playerId: "0002_CS_" + (i + 1),
            dateOfBirth: (_d = playersDOB === null || playersDOB === void 0 ? void 0 : playersDOB.item(i)) === null || _d === void 0 ? void 0 : _d.textContent,
            playerName: (_e = playersName === null || playersName === void 0 ? void 0 : playersName.item(i)) === null || _e === void 0 ? void 0 : _e.textContent,
            clubName: (_f = playerClubName === null || playerClubName === void 0 ? void 0 : playerClubName.item(i)) === null || _f === void 0 ? void 0 : _f.innerHTML,
            clubNationFlag: (_g = playerClubNationFlag === null || playerClubNationFlag === void 0 ? void 0 : playerClubNationFlag.item(i)) === null || _g === void 0 ? void 0 : _g.getAttribute('src'),
            position: (_h = playerPosition === null || playerPosition === void 0 ? void 0 : playerPosition.item(i)) === null || _h === void 0 ? void 0 : _h.innerHTML,
            InternationlCarreer: {
                matches: (_j = playerMatches === null || playerMatches === void 0 ? void 0 : playerMatches.item(i)) === null || _j === void 0 ? void 0 : _j.innerHTML.replace('\n', ''),
                goals: (_k = playerGoals === null || playerGoals === void 0 ? void 0 : playerGoals.item(i)) === null || _k === void 0 ? void 0 : _k.innerHTML.replace('\n', '')
            },
            detailsPageUrl: playersName === null || playersName === void 0 ? void 0 : playersName.item(i).getAttribute('href'),
            additionalInformation: null
        });
    }
    for (var i = 0; i < ((recentPlayersName === null || recentPlayersName === void 0 ? void 0 : recentPlayersName.length) || 0); i++) {
        players.recentCallUps.push({
            playerId: "0002_RCU_" + (i + 1),
            dateOfBirth: (_l = recentPlayersDOB === null || recentPlayersDOB === void 0 ? void 0 : recentPlayersDOB.item(i)) === null || _l === void 0 ? void 0 : _l.textContent,
            playerName: (_m = recentPlayersName === null || recentPlayersName === void 0 ? void 0 : recentPlayersName.item(i)) === null || _m === void 0 ? void 0 : _m.textContent,
            clubName: (_o = recentPlayerClubName === null || recentPlayerClubName === void 0 ? void 0 : recentPlayerClubName.item(i)) === null || _o === void 0 ? void 0 : _o.innerHTML,
            clubNationFlag: (_p = recentPlayerClubNationFlag === null || recentPlayerClubNationFlag === void 0 ? void 0 : recentPlayerClubNationFlag.item(i)) === null || _p === void 0 ? void 0 : _p.getAttribute('src'),
            position: (_q = recentPlayerPosition === null || recentPlayerPosition === void 0 ? void 0 : recentPlayerPosition.item(i)) === null || _q === void 0 ? void 0 : _q.innerHTML,
            InternationlCarreer: {
                matches: (_r = recentPlayerMatches === null || recentPlayerMatches === void 0 ? void 0 : recentPlayerMatches.item(i)) === null || _r === void 0 ? void 0 : _r.innerHTML.replace('\n', ''),
                goals: (_s = recentPlayerGoals === null || recentPlayerGoals === void 0 ? void 0 : recentPlayerGoals.item(i)) === null || _s === void 0 ? void 0 : _s.innerHTML.replace('\n', '')
            },
            detailsPageUrl: recentPlayersName === null || recentPlayersName === void 0 ? void 0 : recentPlayersName.item(i).getAttribute('href'),
            additionalInformation: null
        });
    }
    console.log(players);
    return players;
};
exports.useWikipediaByCountry = useWikipediaByCountry;
var useWikipediaBySoccerPlayer = function (player, playerList) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var data = react_query_1.useQuery(['wikipedia', player === null || player === void 0 ? void 0 : player.detailsPageUrl], function () { return fetchWikipediaByPlayer(player === null || player === void 0 ? void 0 : player.detailsPageUrl); }).data;
    var divElement = document.createElement('div');
    divElement.innerHTML = data === null || data === void 0 ? void 0 : data.data.toString();
    var infoBoxSelector = divElement.querySelectorAll('table.infobox > tbody');
    var birthPlace = (_a = infoBoxSelector === null || infoBoxSelector === void 0 ? void 0 : infoBoxSelector.item(0)) === null || _a === void 0 ? void 0 : _a.querySelectorAll('td.birthplace > a');
    var playerFullName = (_b = infoBoxSelector === null || infoBoxSelector === void 0 ? void 0 : infoBoxSelector.item(0)) === null || _b === void 0 ? void 0 : _b.querySelectorAll('td.nickname');
    var imagePath = (_c = infoBoxSelector === null || infoBoxSelector === void 0 ? void 0 : infoBoxSelector.item(0)) === null || _c === void 0 ? void 0 : _c.querySelectorAll('td.infobox-image > a > img');
    var infoLabels = (_d = infoBoxSelector === null || infoBoxSelector === void 0 ? void 0 : infoBoxSelector.item(0)) === null || _d === void 0 ? void 0 : _d.querySelectorAll('th.infobox-label');
    var height = '';
    var positions = '';
    var fullName = '';
    for (var i = 0; i < (infoLabels === null || infoLabels === void 0 ? void 0 : infoLabels.length); i++) {
        if (infoLabels.item(i).innerHTML === 'Height') {
            height = (_f = (_e = infoLabels[i].parentNode) === null || _e === void 0 ? void 0 : _e.querySelector('td.infobox-data')) === null || _f === void 0 ? void 0 : _f.textContent;
            height = height === null || height === void 0 ? void 0 : height.replace('&nbsp;', '').replace('&nbsp;', '').replace('&nbsp;', '');
            height = height === null || height === void 0 ? void 0 : height.slice((height === null || height === void 0 ? void 0 : height.lastIndexOf('}')) + 1, height.lastIndexOf(')') + 1);
        }
        if (infoLabels.item(i).innerHTML === 'Position(s)') {
            positions = (_h = (_g = infoLabels[i].parentNode) === null || _g === void 0 ? void 0 : _g.querySelector('td.infobox-data > a')) === null || _h === void 0 ? void 0 : _h.innerHTML;
        }
    }
    fullName = (_j = playerFullName === null || playerFullName === void 0 ? void 0 : playerFullName.item(0)) === null || _j === void 0 ? void 0 : _j.textContent;
    fullName = (fullName === null || fullName === void 0 ? void 0 : fullName.indexOf('[')) != -1 ? fullName === null || fullName === void 0 ? void 0 : fullName.slice(0, fullName === null || fullName === void 0 ? void 0 : fullName.lastIndexOf('[')) : fullName;
    console.log(height);
    var playerIndex = playerList.map(function (p) { return p.playerId; }).indexOf(player === null || player === void 0 ? void 0 : player.playerId);
    playerList[playerIndex] = __assign(__assign({}, player), { additionalInformation: {
            fullName: fullName,
            birthPlace: (_k = birthPlace === null || birthPlace === void 0 ? void 0 : birthPlace.item(0)) === null || _k === void 0 ? void 0 : _k.innerHTML,
            imagePath: (_l = imagePath === null || imagePath === void 0 ? void 0 : imagePath.item(0)) === null || _l === void 0 ? void 0 : _l.getAttribute('src'),
            height: height,
            positions: positions
        } });
    console.log(playerList);
    return playerList[playerIndex];
};
exports.useWikipediaBySoccerPlayer = useWikipediaBySoccerPlayer;
//# sourceMappingURL=useWikipedia.js.map