import pool from "../database/connection.js";

const URL_COLUMNS = `
        id,
        user_id,
        original_url,
        short_code,
        custom_alias,
        expires_at,
        created_at,
        updated_at
`;

export const createUrl = async ({
    userId,
    originalUrl,
    shortCode,
    customAlias,
    expiresAt,
}) => {
    const [result] = await pool.execute(
        `
        INSERT INTO urls
        (
            user_id,
            original_url,
            short_code,
            custom_alias,
            expires_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            userId,
            originalUrl,
            shortCode,
            customAlias ?? null,
            expiresAt ?? null,
        ]
    );

    return result.insertId;
};
export const findUrlById = async (id) => {
    const [rows] = await pool.execute(
        `
      SELECT ${URL_COLUMNS}
      FROM urls
      WHERE id = ?
        AND deleted_at IS NULL
    `,
        [id]
    );

    return rows[0];
};

export const findUrlByShortCode = async (shortCode) => {
    const [rows] = await pool.execute(
        `
      SELECT ${URL_COLUMNS}
      FROM urls
      WHERE short_code = ?
        AND deleted_at IS NULL
    `,
        [shortCode]
    );

    return rows[0];
};

export const findUrlsByUserId = async (userId) => {
    const [rows] = await pool.execute(
        `
      SELECT
        id,
        original_url,
        short_code,
        custom_alias,
        expires_at,
        created_at,
        updated_at
      FROM urls
      WHERE user_id = ?
        AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
        [userId]
    );

    return rows;
};

export const updateUrl = async ({
    id,
    originalUrl,
    expiresAt,
}) => {
    const [result] = await pool.execute(
        `
        UPDATE urls
        SET
            original_url = ?,
            expires_at = ?
        WHERE id = ?
          AND deleted_at IS NULL
        `,
        [
            originalUrl,
            expiresAt ?? null,
            id,
        ]
    );

    return result.affectedRows;
};

export const softDeleteUrl = async (id) => {
    const [result] = await pool.execute(
        `
      UPDATE urls
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ?
        AND deleted_at IS NULL
    `,
        [id]
    );

    return result.affectedRows;
};