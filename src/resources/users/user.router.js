const {
	getItems,
	getItem,
	addItem,
	deleteItem,
	updateItem,
} = require("./user.service");

// Item schema
const Item = {
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
		login: { type: "string" },
		password: { type: "string" },
	},
};

const ItemOutPass = {
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
		login: { type: "string" }
	},
};

// Options for get all items
const getItemsOpts = {
	schema: {
		response: {
			200: {
				type: "array",
				items: Item,
			},
		},
	},
	handler: getItems,
};

const getItemOpts = {
	schema: {
		response: {
			200: ItemOutPass,
		},
	},
	handler: getItem,
};

const postItemOpts = {
	schema: {
		body: {
			type: "object",
			required: ["name", "login", "password"],
			properties: {
				name: { type: "string" },
				login: { type: "string" },
				password: { type: "string" }
			},
		},
		response: {
			201: Item,
		},
	},
	handler: addItem,
};

const deleteItemOpts = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: deleteItem,
};

const updateItemOpts = {
	schema: {
		response: {
			200: Item,
		},
	},
	handler: updateItem,
};

function itemRoutes(fastify, options, done) {
	// Get all items
	fastify.get("/users", getItemsOpts);

	// Get single items
	fastify.get("/users/:id", getItemOpts);

	// Add item
	fastify.post("/users", postItemOpts);

	// Delete item
	fastify.delete("/users/:id", deleteItemOpts);

	// Update item
	fastify.put("/users/:id", updateItemOpts);

	done();
}

module.exports = itemRoutes;
