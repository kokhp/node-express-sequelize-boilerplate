

module.exports = {
	up: queryInterface => queryInterface.bulkInsert(
		'users',
		[
			{
				id: '19457db7-1576-48ad-b219-d10e5b2e561d',
				firstName: 'Aegon',
				lastName: 'Targaryen',
				mobile: '6625342241',
				email: 'mihir.kanzariya@bacancytechnology.com',
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{},
	),
	down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
