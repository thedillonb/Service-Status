module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models) {
                Service.belongsTo(models.User);
                Service.hasMany(models.Incident);
                Service.hasMany(models.Subscriber);
                Service.hasMany(models.Metric);
            }
        },
        instanceMethods: {
            toJSON: function() {
                return {
                    id: this.id,
                    name: this.name,
                    owner: this.User
                };
            }
        }
    });

    return Service;
};