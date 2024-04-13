-- WARNING: Be sure to manually create the DB if you are not using
-- docker compose.
-- CREATE TABLE forms_central;


CREATE TABLE IF NOT EXISTS domains (
    id SERIAL PRIMARY KEY,
    domain_name VARCHAR(255) NOT NULL,
    proxy_domain VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(domain_name),
    UNIQUE(proxy_domain)
);

CREATE INDEX idx_domain_name ON domains(domain_name);
CREATE INDEX idx_proxy_domain ON domains(proxy_domain);

CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    domain_id INT,
    submission_data JSON NOT NULL,
    submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (domain_id) REFERENCES domains(id)
);

CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    domain_id INT,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (domain_id) REFERENCES domains(id)
);
