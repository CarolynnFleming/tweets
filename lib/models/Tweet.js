const pool = require('../utils/pool');

module.exports = class Tweet {
  id;
  text;
  username;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.username = row.username;
  }

  static async insert({ text, username }) {
    console.log(username, text, 'the butterfly');
    const { rows } = await pool.query(
      `INSERT INTO
          tweets (text, username)
          VALUES
          ($1, $2)
          RETURNING
          *
          `,
      [text, username]
    );

    return new Tweet(rows[0]);
  }
};
