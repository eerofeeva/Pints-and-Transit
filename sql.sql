

CREATE TABLE bikes (
    ride_id VARCHAR,
    rideable_type VARCHAR,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    start_station_name VARCHAR,
    start_station_id NUMERIC,
    end_station_name VARCHAR,
    end_station_id NUMERIC,
    start_lat NUMERIC,
    start_lng NUMERIC,
    end_lat NUMERIC,
    end_lng NUMERIC, 
    member_casual VARCHAR,
    PRIMARY KEY (ride_id)
);

COPY bikes(ride_id, rideable_type, started_at, ended_at, start_station_name, start_station_id, end_station_name, end_station_id, start_lat, start_lng, end_lat, end_lng, member_casual)
FROM 'C:\Users\Kelly\Desktop\Bootcamp\Pints-and-Transit\resources\all_data_2020.csv'
DELIMITER ','
CSV HEADER;

select * from bikes
