var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    var Incident = sequelize.define('Incident', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Incident.belongsTo(models.Service);
            },
            filter: function(value) {
                return _.pick(value, 'name');
            }
        },
        instanceMethods: {
            toJSON: function() {
                return {
                    id: this.id,
                    name: this.name,
                    updated_at: this.updatedAt,
                    created_at: this.createdAt
                };
            }
        }
    });

    return Incident;
};