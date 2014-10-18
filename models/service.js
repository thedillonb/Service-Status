module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define('Service', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Service.belongsTo(models.User);
                Service.hasMany(models.Incident);
                Service.hasMany(models.Subscriber);
                Service.hasMany(models.Metric);
            }
        }
    });

    return Service;
};