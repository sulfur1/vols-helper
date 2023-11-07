DROP TABLE IF EXISTS line;
CREATE TABLE line (
                      id BIGSERIAL NOT NULL,
                      title VARCHAR NOT NULL,
                      length INTEGER NOT NULL,
                      diameter VARCHAR NOT NULL,
                      start_line VARCHAR NOT NULL,
                      end_line VARCHAR NOT NULL,
                      coordinates TEXT NOT NULL,
                      PRIMARY KEY (id)
);

ALTER SEQUENCE line_id_seq RESTART 1;
ALTER SEQUENCE users_id_seq RESTART 1;
ALTER SEQUENCE roles_id_seq RESTART 3;