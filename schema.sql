DROP TABLE IF EXISTS bikes

CREATE TABLE bikes (
    ride_id VARCHAR,
    rideable_type VARCHAR,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    start_station_name VARCHAR,
    start_station_id INTEGER, 
    end_station_name VARCHAR,
    end_station_id INTEGER,
    start_lat INTEGER,
    start_lng INTEGER,
    end_lat INTEGER,
    end_lng INTEGER, 
    member_casual VARCHAR,
    PRIMARY KEY (ride_id)
);

