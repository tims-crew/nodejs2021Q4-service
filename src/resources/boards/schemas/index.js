const getAllBoardsSchema = require('./getBoardsSchema');
const getBoardSchema = require('./getBoardSchema');
const addBoardSchema = require('./createBoardSchema');
const updateBoardSchema = require('./updateBoardSchema');
const deleteBoardSchema = require('./deleteBoardSchema');

module.exports = {
  getAllBoardsSchema,
  getBoardSchema,
  addBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
};
