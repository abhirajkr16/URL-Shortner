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