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

export const getUserProfileById = async (userId) => {

  const [rows] = await pool.execute(
    `
        SELECT
            id,
            full_name,
            username,
            email,
            created_at
        FROM users
        WHERE id = ?
        `,
    [userId]
  );

  return rows[0];

};
export const updateUserProfile = async ({
  id,
  fullName,
  username,
  email,
  passwordHash,
}) => {

  if (passwordHash) {

    const [result] = await pool.execute(
      `
            UPDATE users
            SET
                full_name = ?,
                username = ?,
                email = ?,
                password_hash = ?
            WHERE id = ?
            `,
      [
        fullName,
        username,
        email,
        passwordHash,
        id,
      ]
    );

    return result.affectedRows;

  }

  const [result] = await pool.execute(
    `
        UPDATE users
        SET
            full_name = ?,
            username = ?,
            email = ?
        WHERE id = ?
        `,
    [
      fullName,
      username,
      email,
      id,
    ]
  );

  return result.affectedRows;

};
export const findUserByEmailExceptId = async (
  email,
  userId,
) => {

  const [rows] = await pool.execute(
    `
        SELECT id
        FROM users
        WHERE email = ?
          AND id <> ?
        `,
    [
      email,
      userId,
    ]
  );

  return rows[0];

};
export const findUserByUsernameExceptId = async (
  username,
  userId,
) => {

  const [rows] = await pool.execute(
    `
        SELECT id
        FROM users
        WHERE username = ?
          AND id <> ?
        `,
    [
      username,
      userId,
    ]
  );

  return rows[0];

};