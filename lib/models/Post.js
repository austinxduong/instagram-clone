
import jwt from 'jsonwebtoken';
import pool from '../utils/pool.js';

export default class Post {
    id;
    email;
    passwordHash;
    profilePhotoUrl;

    constructor(row) {
      this.id = row.id;
      this.userId = row.user_id;
      this.text = row.text;
      
    }

    static async insert({ userId, text }) {
      const { rows } = await pool.query(
        'INSERT INTO posts (user_id) VALUES ($1, $2) RETURNING *',
        [userId, text]
      );

      return new Post(rows[0]);
    }
}
