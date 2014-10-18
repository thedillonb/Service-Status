module.exports = function(sequelize, DataTypes) {
    var Incident = sequelize.define('Incident', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Incident.belongsTo(models.Service);
            }
        }
    });

    return Incident;
};