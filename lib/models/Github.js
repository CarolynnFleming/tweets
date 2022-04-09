const pool = require('../utils/pool');

module.exports = class Github {
  id;
  username;
  email;
  photo;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.photo = row.photo;
  }

  static insert ({ username, email, photo }) {
    if(!username) throw new Error('Username is required');

    // const { rows } = await pool.query(
    //   `INSERT INTO github (username, email, photo)
    //     VALUES ($1, $2, $3)
    //     RETURNING *`,
    //   [username, email, photo]
    // );

    // return new Github(rows[0]);

    return pool.query(
      `INSERT INTO github (username, email, photo)
          VALUES ($1, $2, $3)
          RETURNING *`,
      [username, email, photo]
    )
      .then(({ rows }) => new Github(rows[0]))
      .catch(() => null);
  }

  static async findByUsername(username) {
  //   const { rows } = await pool.query(
  //     `SELECT *
  //         FROM github
  //         WHERE username=$1`,
  //     [username]
  //   );
    
    //   if (!rows[0]) return null;

    //   return new Github(rows[0]);
    // }

    // toJSON() {
    //   return { ...this };
    // }

    return pool.query(
      `SELECT *
            FROM github
            WHERE username=$1`,
      [username]
    )
      .then(({ rows }) =>  {if (!rows[0]) return null;

        return new Github(rows[0]);
      })
      .catch(() => null);
  }};
