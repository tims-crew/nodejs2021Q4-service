const { v4: uuidv4 } = require("uuid");
let { users: items } = require("../../../data.json");
const User = require("./user.model");

const getItems = (req, reply) => {
	console.log(items)
	reply.send(items);
};

const getItem = (req, reply) => {
	const { id } = req.params;
	const item = items.find((user) => user.id === id);
	reply.send(item);
};

const addItem = (req, reply) => {
	// const { name, login, password } = req.body;

	// const item = {
	// 	id: uuidv4(),
	// 	name,
	// 	login,
	// 	password
	// };

	const newUser = new User(req.body)
	items.push(newUser)
	reply.status(201).send(User.toResponse(newUser));
};

const deleteItem = (req, reply) => {
	const { id } = req.params;

	items = items.filter((item) => item.id !== id);

	reply.send({ message: `Item ${id} has been removed` });
};

const updateItem = (req, reply) => {
	const { id } = req.params;
	const { name } = req.body;

	items = items.map((item) => (item.id === id ? { id, name } : item));

	const item = items.find((user) => user.id === id);

	reply.send(item);
};

module.exports = {
	getItems,
	getItem,
	addItem,
	deleteItem,
	updateItem,
};
