const { validate } = require("uuid")
const db = require("../../../data.json");
const Board = require("./boards.model");
const Columns = require("../columns/column.model");

const getBoards = async () => {
    // console.log(db)
    console.log(db.users)
    console.log(db.boards)

    return db.boards;
}

const getBoard = async (id) => {
    const board = db.find(item => item.id === id);
    return board;
}

const createBoard = async ({title, columns}) => {
    const newColumns = columns.map((column) => new Column(column));
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
        return new Column({ id: colId, ...rest });
      }
      return new Column(rest);
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
  