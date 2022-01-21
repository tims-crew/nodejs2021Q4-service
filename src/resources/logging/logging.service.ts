import { Connection } from "typeorm";
import { LoginType } from "../users/user.model";

const UserRepos = require('../users/user.repository');

const getToken = (db: Connection, body: LoginType) => UserRepos.getToken(db, body);

export default { getToken };