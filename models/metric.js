var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    var Metric = sequelize.define('Metric', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descrption: {
            type: DataTypes.STRING,
        },
        suffix: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        decimal_places: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        y_axis_min: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
        },
        y_axis_max: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        calculation: {
            type: DataTypes.ENUM('mean', 'median'),
            defaultValue: 'mean',
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Metric.belongsTo(models.Service);
            },
            filter: function(value) {
                return _.pick(value, 'name', 'description', 'suffix', 'visible', 'decimal_places', 'y_axis_min', 'y_axis_max', 'calculation');
            }
        },
        instanceMethods: {
            toJSON: function() {
                return {
                    id: this.id,
                    name: this.name,
                    description: this.description,
                    calculation: this.calculation,
                    suffix: this.suffix,
                    visible: this.visible,
                    decimal_places: this.decimal_places,
                    y_axis_min: this.y_axis_min,
                    y_axis_max: this.y_axis_max,
                    updated_at: this.updatedAt,
                    created_at: this.createdAt
                };
            }
        }
    });

    return Metric;
};