

module.exports = (sequelize, DataTypes) => {
	const virtualAccountTypes = sequelize.define('virtualAccountTypes', {
		id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
		name: DataTypes.STRING,
		deletedAt: {
			type: DataTypes.DATE,
			paranoid: true,
		},
		status: { type: DataTypes.BOOLEAN, defaultValue: true },
	}, {});
	virtualAccountTypes.associate = () => {
		// associations can be defined here
	};
	return virtualAccountTypes;
};
