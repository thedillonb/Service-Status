var express = require('express');
var router = express.Router();

/* Load the incident if it's available */
router.param('incident_id', function(req, res, next, id) {
    req.service.getIncidents({ where: { id: id } })
        .then(function(result) {
            if (result.length == 0) {
                res.send(404);
            }
            else {
                req.incident = result[0];
                next();
            }
        })
        .catch(next);
});

/* GET all incidents */
router.get('/', function(req, res) {
    res.json(req.service.getIncidents());
});

/* POST (create) an incident */
router.post('/', function(req, res) {
    res.json(req.service.createIncident(req.db.Incident.filter(req.body)));
});

/* PATCH (update) an incident */
router.patch('/:incident_id', function(req, res) {
    res.json(req.incident.updateAttributes(req.db.Incident.filter(req.body)));
});

/* GET an incident */
router.get('/:incident_id', function(req, res) {
    res.json(req.incident);
});

/* DELETE an incident */
router.delete('/:incident_id', function(req, res) {
    req.incident.destroy().done(function() { res.send(200); }, next);
});

module.exports = router;
