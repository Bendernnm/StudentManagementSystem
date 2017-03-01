var route = require('express').Router();
var handler = require('../handlers/statistics');



route.get('/groups', handler.getStatisticsGroups);
route.get('/courses', handler.getStatisticsCourse);
route.get('/subjects', handler.getStatisticsSubjects);

module.exports = route;