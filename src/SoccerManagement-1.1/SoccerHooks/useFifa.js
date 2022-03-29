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
exports.useFifaRankings = void 0;
var axios_1 = require("axios");
var react_query_1 = require("react-query");
var Countries_1 = require("./../SoccerConstants/Constants/Countries");
var fetchFifaRankings = function (countryCode) {
    return axios_1.default.get("https://www.fifa.com/fifa-world-ranking/" + countryCode);
};
var useFifaRankings = function (pageNo) {
    var queries = [];
    var queryOptions = {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true,
        retry: false,
    };
    var countriesList;
    switch (pageNo) {
        case 1:
            countriesList = Countries_1.countries.page1;
            break;
        case 2:
            countriesList = Countries_1.countries.page2;
            break;
        case 3:
            countriesList = Countries_1.countries.page3;
            break;
        case 4:
            countriesList = Countries_1.countries.page4;
            break;
        case 5:
            countriesList = Countries_1.countries.page5;
            break;
        case 6:
            countriesList = Countries_1.countries.page6;
            break;
        case 7:
            countriesList = Countries_1.countries.page7;
            break;
        case 8:
            countriesList = Countries_1.countries.page8;
            break;
        case 9:
            countriesList = Countries_1.countries.page9;
            break;
        case 10:
            countriesList = Countries_1.countries.page10;
            break;
        case 11:
            countriesList = Countries_1.countries.page11;
            break;
        default:
            countriesList = Countries_1.countries.page1;
    }
    Object.keys(countriesList).map(function (c) { return queries.push(__assign({ queryKey: ['fifa-ranking', c], queryFn: function () { return fetchFifaRankings(c); } }, queryOptions)); });
    var result = react_query_1.useQueries(queries);
    console.log(result);
    var fifaTeamDetails = [];
    var successArray = [];
    result.map(function (r, i) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var divElement = document.createElement('div');
        divElement.innerHTML = (_a = r.data) === null || _a === void 0 ? void 0 : _a.data.toString();
        var rankSelectors = (_c = (_b = divElement.querySelectorAll('.fc-ranking-statistics-section_statisticsContainer__2TdZW')) === null || _b === void 0 ? void 0 : _b.item(0)) === null || _c === void 0 ? void 0 : _c.querySelectorAll('h1');
        var teamSelectors = (_d = divElement.querySelectorAll('main.fc > div.container h1')) === null || _d === void 0 ? void 0 : _d.item(0);
        var flagSelectors = (_e = divElement.querySelectorAll('main.fc > div.container img')) === null || _e === void 0 ? void 0 : _e.item(0);
        var pointSelector = (_f = divElement.querySelectorAll('.fc-ranking-item_activeRankingTableRow__g7Sa6 > td:nth-last-child(1) span')) === null || _f === void 0 ? void 0 : _f.item(0);
        console.log(pointSelector);
        fifaTeamDetails.push({
            fifaRank: parseInt((_g = rankSelectors === null || rankSelectors === void 0 ? void 0 : rankSelectors.item(0)) === null || _g === void 0 ? void 0 : _g.innerHTML),
            teamName: teamSelectors === null || teamSelectors === void 0 ? void 0 : teamSelectors.innerHTML,
            avgRank: parseInt((_h = rankSelectors === null || rankSelectors === void 0 ? void 0 : rankSelectors.item(1)) === null || _h === void 0 ? void 0 : _h.innerHTML),
            highestRank: parseInt((_j = rankSelectors === null || rankSelectors === void 0 ? void 0 : rankSelectors.item(2)) === null || _j === void 0 ? void 0 : _j.innerHTML),
            lowestRank: parseInt((_k = rankSelectors === null || rankSelectors === void 0 ? void 0 : rankSelectors.item(3)) === null || _k === void 0 ? void 0 : _k.innerHTML),
            flagUrl: flagSelectors === null || flagSelectors === void 0 ? void 0 : flagSelectors.getAttribute('src'),
            points: pointSelector === null || pointSelector === void 0 ? void 0 : pointSelector.innerHTML
        });
        successArray.push(r.isSuccess);
    });
    console.log(fifaTeamDetails);
    return [fifaTeamDetails, successArray];
};
exports.useFifaRankings = useFifaRankings;
//# sourceMappingURL=useFifa.js.map