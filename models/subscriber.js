module.exports = function(sequelize, DataTypes) {
    var Subscriber = sequelize.define('Subscriber', {
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        url_endpoint: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Subscriber.belongsTo(models.Service);
            }
        }
    });

    return Subscriber;
};