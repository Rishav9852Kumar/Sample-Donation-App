import { connect } from '@planetscale/database';

export default {
	async fetch(request, env) {
		const config = {
			host: env.DATABASE_HOST,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			fetch: (url, init) => {
				delete init['cache'];
				return fetch(url, init);
			},
		};
		const conn = connect(config);

		switch (request.method) {
			case 'GET':
				const data = await conn.execute('SELECT * FROM fundraisers;');
				return new Response(JSON.stringify(data.rows), {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				});
			case 'POST':
				try {
					const data = await conn.execute('SELECT * FROM fundraisers;');
					const requestBody = await request.json();
					const newFundraiser = {
						id: data.size + 1, // Generate a unique ID (you'd typically use UUIDs)
						title: requestBody.title,
						description: requestBody.description,
						target_amount: requestBody.target_amount || 0, // Initialize to 0 if not provided
						collected_amount: 0, // Initialize collected_amount to 0
					};
					const results = await conn.execute(
						'INSERT INTO fundraisers (fundraiser_id, fundraiser_title, fundraiser_description, target_donation, current_donation) VALUES (?, ?, ?, ?, ?);',
						[newFundraiser.id, newFundraiser.title, newFundraiser.description, newFundraiser.target_amount, newFundraiser.collected_amount]
					);

					const createdResponse = new Response(JSON.stringify(' no of new fundraiser added = ' + results.rowsAffected), {
						headers: { 'content-type': 'application/json' },
						status: 201, // Created
					});
					return createdResponse;
				} catch (error) {
					return new Response(error + '/n' + request, {
						headers: { 'content-type': 'text/plain' },
						status: 400, // Bad Request
					});
				}
			case 'DELETE':
				try {
					const requestBody = await request.json();
					const fundraiserIdToDelete = requestBody.id; // Assuming the client sends the ID of the fundraiser to delete

					// Check if the fundraiser with the given ID exists
					const fundraiserExists = await conn.execute('SELECT * FROM fundraisers WHERE fundraiser_id = ?;', [fundraiserIdToDelete]);

					if (fundraiserExists.rows.length === 0) {
						return new Response('Fundraiser not found', {
							headers: { 'content-type': 'text/plain' },
							status: 404, // Not Found
						});
					}

					// Delete the fundraiser record
					const deleteResult = await conn.execute('DELETE FROM fundraisers WHERE fundraiser_id = ?;', [fundraiserIdToDelete]);

					return new Response('Fundraiser deleted', {
						headers: { 'content-type': 'text/plain' },
						status: 200, // OK
					});
				} catch (error) {
					return new Response(error + '\n' + request, {
						headers: { 'content-type': 'text/plain' },
						status: 400, // Bad Request
					});
				}
			case 'PATCH':
				try {
					const requestBody = await request.json();
					const fundraiserIdToUpdate = requestBody.id; // Assuming the client sends the ID of the fundraiser to update
					const amountToAdd = requestBody.amount; // Assuming the client sends the amount to add

					// Check if the fundraiser with the given ID exists
					const fundraiserExists = await conn.execute('SELECT * FROM fundraisers WHERE fundraiser_id = ?;', [fundraiserIdToUpdate]);

					if (fundraiserExists.rows.length === 0) {
						return new Response('Fundraiser not found', {
							headers: { 'content-type': 'text/plain' },
							status: 404, // Not Found
						});
					}

					// Update the collected_amount for the fundraiser
					const updateResult = await conn.execute(
						'UPDATE fundraisers SET current_donation = current_donation + ? WHERE fundraiser_id = ?;',
						[amountToAdd, fundraiserIdToUpdate]
					);

					return new Response('Collected amount updated' + amountToAdd, {
						headers: { 'content-type': 'text/plain' },
						status: 200, // OK
					});
				} catch (error) {
					return new Response(error + '\n \n \n' + request, {
						headers: { 'content-type': 'text/plain' },
						status: 400, // Bad Request
					});
				}
		}
	},
};
