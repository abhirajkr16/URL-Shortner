import pool from "../database/connection.js";

const USER_COLUMNS = `
    id,
    full_name,
    username,
    email,
    password_hash,
    created_at,
    updated_at,
    deleted_at
`;

const USER_PUBLIC_COLUMNS = `
    id,
    full_name,
    username,
    email,
    created_at,
    updated_at
`;

export const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `
        SELECT ${USER_COLUMNS}
        FROM users
        WHERE email = ?
        AND deleted_at IS NULL
        `,
    [email]
  );

  return rows[0];
};

export const findUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    `
        SELECT ${USER_COLUMNS}
        FROM users
        WHERE username = ?
        AND deleted_at IS NULL
        `,
    [username]
  );

  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.execute(
    `
        SELECT ${USER_PUBLIC_COLUMNS}
        FROM users
        WHERE id = ?
        AND deleted_at IS NULL
        `,
    [id]
  );

  return rows[0];
};

export const createUser = async ({
  fullName,
  username,
  email,
  passwordHash,
}) => {
  const [result] = await pool.execute(
    `
        INSERT INTO users
        (
            full_name,
            username,
            email,
            password_hash
        )
        VALUES (?, ?, ?, ?)
        `,
    [
      fullName,
      username,
      email,
      passwordHash,
    ]
  );

  return result.insertId;
};