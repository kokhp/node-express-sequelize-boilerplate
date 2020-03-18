

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('virtualAccountTypes', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4(),
		},
		name: {
			type: Sequelize.STRING,
		},
		deletedAt: {
			type: Sequelize.DATE,
			paranoid: true,
		},
		status: {
			type: Sequelize.BOOLEAN,
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
	down: queryInterface => queryInterface.dropTable('virtualAccountTypes'),
};
