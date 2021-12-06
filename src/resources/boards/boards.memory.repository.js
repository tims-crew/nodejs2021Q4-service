const { validate } = require("uuid")
let db = require("../../../data.json");
const Columns = require("../columns/column.model");

const getBoards = async () => db.boards

const getBoard = async (id) => {
    const board = db.find(item => item.id === id);
    return board;
}

const createBoard = async ({title, columns}) => {
    const newColumns = columns.map((column) => new Columns(column));
    const newBoard = new Columns({title, columns: newColumns});
    db.boards.push(newBoard);

    return newBoard;
}

const updateBoard = async (id, body) => {
    const boardToUpdateIdx = db.boards.findIndex((board) => board.id === id);
    if (boardToUpdateIdx === -1) {
      return false;
    }
    const updatedColumns = body.columns.map(({ id: colId, ...rest }) => {
      if (validate(colId)) {
        return new Columns({ id: colId, ...rest });
      }
      return new Columns(rest);
    });
  
    const updatedBoard = {
      ...db.boards.at(boardToUpdateIdx),
      title: body.title,
      columns: updatedColumns,
    };
    db.boards.splice(boardToUpdateIdx, 1, updatedBoard);
  
    db = [...db, updatedBoard]
    return updatedBoard;
  };
  
  const deleteBoard = async (id) => {
    const boardToDeleteIdx = db.boards.findIndex(
      (board) => board.id === id
    );
    if (boardToDeleteIdx === -1) {
      return false;
    }
    db.boards.splice(boardToDeleteIdx, 1);
  
    return true;
  };
  
  module.exports = { getBoards, createBoard, getBoard, deleteBoard, updateBoard };
  
