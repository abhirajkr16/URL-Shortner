/* ============================================================
   Project : Distributed URL Shortener
   Database: url_shortener
   MySQL   : 8.0
   Author  : Abhiraj Kumar
   


/* ============================================================
   DROP TABLES IF THEY EXIST (Clean Start)
   ============================================================ */

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS analytics;
DROP TABLE IF EXISTS urls;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

/* ============================================================
   USERS TABLE
   ============================================================ */

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

/* ============================================================
   URLS TABLE
   ============================================================ */

CREATE TABLE urls (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    original_url TEXT NOT NULL,
    short_code VARCHAR(7) NOT NULL UNIQUE,
    custom_alias BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_urls_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

/* ============================================================
   ANALYTICS TABLE
   ============================================================ */

CREATE TABLE analytics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    url_id BIGINT UNSIGNED NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_analytics_url
        FOREIGN KEY (url_id)
        REFERENCES urls(id)
        ON DELETE CASCADE
);

/* ============================================================
   INDEXES
   ============================================================ */

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_urls_short_code ON urls(short_code);
CREATE INDEX idx_urls_user ON urls(user_id);
CREATE INDEX idx_analytics_url ON analytics(url_id);