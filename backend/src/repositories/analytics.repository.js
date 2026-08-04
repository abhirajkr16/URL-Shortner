import pool from "../database/connection.js";

export const createAnalytics = async (urlId) => {
    const [result] = await pool.execute(
        `
        INSERT INTO analytics (url_id)
        VALUES (?)
        `,
        [urlId]
    );

    return result.insertId;
};

export const getTotalClicks = async (urlId) => {
    const [rows] = await pool.execute(
        `
        SELECT COUNT(*) AS totalClicks
        FROM analytics
        WHERE url_id = ?
        `,
        [urlId]
    );

    return rows[0];
};

export const getAnalyticsByUrlId = async (urlId) => {
    const [rows] = await pool.execute(
        `
        SELECT
            id,
            url_id,
            clicked_at
        FROM analytics
        WHERE url_id = ?
        ORDER BY clicked_at DESC
        `,
        [urlId]
    );

    return rows;
};
export async function getUserTotalClicks(userId) {

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

export const getTopUrls = async (userId) => {
    const [rows] = await pool.execute(
        `
        SELECT
            urls.id,
            urls.original_url,
            urls.short_code,
            COUNT(analytics.id) AS clicks,
            MAX(analytics.clicked_at) AS last_clicked_at,
            urls.created_at,
            urls.expires_at,
            urls.deleted_at
        FROM urls
        LEFT JOIN analytics ON analytics.url_id = urls.id
        WHERE urls.user_id = ?
        AND urls.deleted_at IS NULL
        GROUP BY urls.id
        ORDER BY clicks DESC
        LIMIT 5
        `,
        [userId]
    );
    return rows;
};

export async function getRecentClicks(userId) {

    const [rows] = await pool.execute(
        `
        SELECT
            analytics.id,
            analytics.clicked_at,
            urls.id AS url_id,
            urls.short_code,
            urls.original_url
        FROM analytics
        INNER JOIN urls
            ON analytics.url_id = urls.id
        WHERE urls.user_id = ?
        ORDER BY analytics.clicked_at DESC
        LIMIT 10
        `,
        [userId]
    );

    return rows;

}