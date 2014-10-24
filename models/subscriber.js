var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    var Subscriber = sequelize.define('Subscriber', {
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        url_endpoint: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Subscriber.belongsTo(models.Service);
            },
            filter: function(value) {
                return _.pick(value, 'email', 'phone_number', 'url_endpoint')
            }
        },
        instanceMethods: {
            toJSON: function() {
                return {
                    id: this.id,
                    email: this.email,
                    phone_number: this.phone_number,
                    url_endpoint: this.url_endpoint,
                    created_at: this.createdAt,
                    updated_at: this.updatedAt,
                }
            }
        }
    });

    return Subscriber;
};