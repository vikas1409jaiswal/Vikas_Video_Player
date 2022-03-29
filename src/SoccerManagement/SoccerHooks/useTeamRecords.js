"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTeams = void 0;
var axios_1 = require("axios");
var react_query_1 = require("react-query");
var fetchTeams = function (confederation) {
    return axios_1.default.get("https://www.11v11.com/internationals/" + confederation + "-/}");
};
var useTeams = function (confedration) {
    var _a, _b;
    var queryOptions = {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true,
        retry: false,
    };
    var data = react_query_1.useQuery(['fifa-teams-by-confederation', confedration], function () { return fetchTeams(confedration); }, queryOptions).data;
    var divElement = document.createElement('div');
    divElement.innerHTML = data === null || data === void 0 ? void 0 : data.data.toString();
    var teamsSelector = divElement.querySelectorAll('div.entry-content li > a');
    var teamsFlagSelector = divElement.querySelectorAll('div.entry-content li > a > img');
    var teamRecords = [];
    for (var i = 0; i < teamsSelector.length; i++) {
        teamRecords.push({
            teamName: (_a = teamsSelector === null || teamsSelector === void 0 ? void 0 : teamsSelector.item(i)) === null || _a === void 0 ? void 0 : _a.textContent,
            teamFlagUrl: (_b = teamsFlagSelector === null || teamsFlagSelector === void 0 ? void 0 : teamsFlagSelector.item(i)) === null || _b === void 0 ? void 0 : _b.getAttribute('src'),
        });
    }
    return teamRecords;
};
exports.useTeams = useTeams;
//# sourceMappingURL=useTeamRecords.js.map