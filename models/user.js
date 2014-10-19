var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        companyName: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Service);
            }
        },
        instanceMethods: {
            comparePassword: function(password, callback) {
                bcrypt.compare(password, this.getDataValue('password'), function(err, res) {
                    if (err) return callback(err);
                    if (!res) return callback(new Error('Invalid credentials'));
                    callback(null);
                });
            },
            setPassword: function(password, callback) {
                var self = this;
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) return callback(err);

                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) return callback(err);
                        self.setDataValue('password', hash);
                        callback(null);
                    });
                });
            },
            toJSON: function() {
                return {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    companyName: this.companyName
                };
            }
        }
    });

    return User;
};