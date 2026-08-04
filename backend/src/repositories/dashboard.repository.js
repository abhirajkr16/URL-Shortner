import pool from "../database/connection.js";

export async function getTotalUrls(userId) {

    const [rows] = await pool.execute(
        `
        SELECT COUNT(*) AS totalUrls
        FROM urls
        WHERE user_id = ?
        AND deleted_at IS NULL
        `,
        [userId]
    );

    return rows[0];

}

export async function getActiveUrls(userId) {

    const [rows] = await pool.execute(
        `
        SELECT COUNT(*) AS activeUrls
        FROM urls
        WHERE user_id = ?
        AND deleted_at IS NULL
        AND (
            expires_at IS NULL
            OR expires_at > NOW()
        )
        `,
        [userId]
    );

    return rows[0];

}

export async function getTotalClicks(userId) {

    const [rows] = await pool.execute(
        `
        SELECT COUNT(*) AS totalClicks
        FROM analytics
        INNER JOIN urls
            ON analytics.url_id = urls.id
        WHERE urls.user_id = ?
        AND urls.deleted_at IS NULL
        `,
        [userId]
    );

    return rows[0];

}