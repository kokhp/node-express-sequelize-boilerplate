module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4(),
		},
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		mobile: {
			type: Sequelize.DOUBLE,
		},
		password: {
			type: Sequelize.STRING,
		},
		balance: {
			type: Sequelize.FLOAT,
		},
		status: {
			type: Sequelize.BOOLEAN,
		},
		deletedAt: {
			type: Sequelize.DATE,
			paranoid: true,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),
	down: queryInterface => queryInterface.dropTable('users'),
};
