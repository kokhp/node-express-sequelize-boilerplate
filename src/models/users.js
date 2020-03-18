

module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			mobile: DataTypes.INTEGER,
			password: DataTypes.STRING,
			balance: DataTypes.FLOAT,
			status: { type: DataTypes.BOOLEAN, defaultValue: true },
			deletedAt: {
				type: DataTypes.DATE,
				paranoid: true,
			},
		},
		{
			defaultScope: {
				attributes: { exclude: ['password'] },
			},
			scopes: {
				withSecretColumns: {
					attributes: { include: ['password'] },
				},
			},
		},
	);
	users.associate = () => {
		// associations can be defined here
	};
	return users;
};
