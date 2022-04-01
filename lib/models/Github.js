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

static async insert (username, email, photo) {
    if(!username) throw new Error('Username is required');

    const { rows } = await pool.query(
        `INSERT INTO github_users (username, email, photo)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [username, email, photo]
    );
    return new Github(rows[0]);
}

}