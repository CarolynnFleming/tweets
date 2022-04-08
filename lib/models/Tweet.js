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

  static insert({ text, username }) {
    // const { rows } = await pool.query(
    //   `INSERT INTO
    //       tweets (text, username)
    //       VALUES
    //       ($1, $2)
    //       RETURNING
    //       *
    //       `,
    //   [text, username]
    // );

    // return new Tweet(rows[0]);

    return pool.query(
      `INSERT INTO
            tweets (text, username)
            VALUES
            ($1, $2)
            RETURNING
            *
            `,
      [text, username]
    )
      .then(({ rows }) => new Tweet(rows[0]))
      .catch(() => null);
  }

  static getAll() {
    // const { rows } = await pool.query(
    //   `SELECT
    //   *
    //   FROM
    //   tweets`
    // );
    // return rows.map((item) => new Tweet(item));
    return pool.query(
      `SELECT
        *
        FROM
        tweets`
    )
      .then(({ rows }) =>  rows.map((item) => new Tweet(item)))
      .catch(() => null);
  }
};
