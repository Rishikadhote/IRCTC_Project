import { pool } from '../config/database.js';

export class Train {
  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM trains');
    return rows;
  }
}
