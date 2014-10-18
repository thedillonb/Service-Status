module.exports = function(sequelize, DataTypes) {
    var Metric = sequelize.define('Metric', {
        name: DataTypes.STRING,
        descrption: DataTypes.STRING,
        suffix: DataTypes.STRING,
        visible: DataTypes.BOOLEAN,
        decimal_places: DataTypes.INTEGER,
        y_axis_min: DataTypes.DECIMAL,
        y_axis_max: DataTypes.DECIMAL
    }, {
        classMethods: {
            associate: function(models) {
                Metric.belongsTo(models.Service);
            }
        }
    });

    return Metric;
};