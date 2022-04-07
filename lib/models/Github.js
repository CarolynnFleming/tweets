const pool = require('../utils/pool');

module.exports = class Github {
  username;
  email;
  photo;

  constructor(row) {
    this.username = row.username;
    this.email = row.email;
    this.photo = row.photo;
  }

  static async insert ({ username, email, photo }) {
    if(!username) throw new Error('Username is required');

    const { rows } = await pool.query(
      `INSERT INTO github_users (username, email, photo)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [username, email, photo]
    );
    return new Github(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `SELECT *
          FROM github_users
          WHERE username=$1`,
      [username]
    );

    if (!rows[0]) return null;

    return new Github(rows[0]);
  }

  toJSON() {
    return { ...this };
  }

  static async findByUsernameTweets(username) {
    const { rows } = await pool.query(
      `SELECT
      username,
      tweets.text as tweets
      FROM 
      users
      INNER JOIN
      tweets
      ON
      githubs.username = tweets.username
      WHERE 
      username=$1
      GROUP BY
      username`,
      [username]
    );

    return rows[0];
  }

};
