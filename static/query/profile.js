export const GET_USER_PROFILE = `
	query GetUserProjects {
		event_user(where: { event: { path: { _ilike: "/dakar/div-01" } } }, order_by: { user: { login: asc } }, limit: 1) {
			level
			user {
				firstName
				lastName
				login
				attrs
				auditRatio
				XPamount: transactions_aggregate(distinct_on: [objectId], where: { event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }, _and: { type: { _eq: "xp" } } }) {
					aggregate {
						sum {
							amount
						}
					}
				}
				xpByProject: transactions(
					where: { event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }, _and: { type: { _eq: "xp" }, object: { type: { _eq: "project" } } } }
					order_by: { createdAt: desc }
				) {
					createdAt
					type
					amount
					object {
						type
						name
					}
				}
				skill: transactions(
					distinct_on: [type]
					where: {
						event: { object: { id: { _eq: 100256 } }, _and: { campus: { _eq: "dakar" } } }
						_and: [{ type: { _neq: "xp" } }, { type: { _neq: "down" } }, { type: { _neq: "up" } }, { type: { _neq: "level" } }]
					}
					order_by: { type: asc, createdAt: desc }
				) {
					type
					amount
					object {
						name
					}
				}
			}
		}
	}
`;
