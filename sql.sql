

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

DROP TABLE IF EXISTS ofsale
DROP TABLE IF EXISTS onsale

CREATE TABLE ofsale
{
    OBJECTID INTEGER, --: 1
    [ADDRESS] VARCHAR,  -- "2200 COMO AVE SE"
    APM VARCHAR, -- "1902923240200"
    ENDORSEMENT VARCHAR, --endorsements: " Liquor, On Sale, No Entertainment"
    EXP_DATE VARCHAR, --expirationDate: 1633132799000
    EXP_YEAR INTEGER, --expirationYear: 2021
    ISSUE_DATE VARCHAR, -- 1604911523000
    LASTUPDATEDATE VARCHAR, --lastUpdateDate: 1605032117000
    LAT NUMERIC, --lat: 44.98765
    L_NAME VARCHAR, --licenseName: "Manning's Restaurant and Bar"
    L_NUMBER VARCHAR, --licenseNumber: "LIC390992"
    L_STATUS VARCHAR, --licenseStatus: "Approved"
    L_TYPE VARCHAR, --licenseType: "BLLiquor"
    LIQUOR_TYPE VARCHAR, --liquorType: "On Sale"
    LONG NUMERIC, --long: -93.22115
    NEIGHBOURHOOD VARCHAR, --neighborhood: "Como"
    WARD VARCHAR, --ward: "2"
    X_WEB_MERCATOR NUMERIC, --xWebMercator: -10377330.5201
    Y_WEB_MERCATOR NUMERIC --yWebMercator: 5619576.9288
}

COPY ofsale(OBJECTID, [address], apn, endorsements, expirationDate, expirationYear,
issueDate, lastUpdateDate, lat, licenseName, licenseNumber, licenseStatus, licenseType,
liquorType, long, neighborhood, ward, xWebMercator, yWebMercator)
FROM '..\Resources\ofsale.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE onsale
{
    OBJECTID INTEGER, --: 1
    [ADDRESS] VARCHAR,  -- "2200 COMO AVE SE"
    APM VARCHAR, -- "1902923240200"
    ENDORSEMENT VARCHAR, --endorsements: " Liquor, On Sale, No Entertainment"
    EXP_DATE VARCHAR, --expirationDate: 1633132799000
    EXP_YEAR INTEGER, --expirationYear: 2021
    ISSUE_DATE VARCHAR, -- 1604911523000
    LASTUPDATEDATE VARCHAR, --lastUpdateDate: 1605032117000
    LAT NUMERIC, --lat: 44.98765
    L_NAME VARCHAR, --licenseName: "Manning's Restaurant and Bar"
    L_NUMBER VARCHAR, --licenseNumber: "LIC390992"
    L_STATUS VARCHAR, --licenseStatus: "Approved"
    L_TYPE VARCHAR, --licenseType: "BLLiquor"
    LIQUOR_TYPE VARCHAR, --liquorType: "On Sale"
    LONG NUMERIC, --long: -93.22115
    NEIGHBOURHOOD VARCHAR, --neighborhood: "Como"
    WARD VARCHAR, --ward: "2"
    X_WEB_MERCATOR NUMERIC, --xWebMercator: -10377330.5201
    Y_WEB_MERCATOR NUMERIC --yWebMercator: 5619576.9288
}

COPY onsale(OBJECTID, [address], apn, endorsements, expirationDate, expirationYear,
issueDate, lastUpdateDate, lat, licenseName, licenseNumber, licenseStatus, licenseType,
liquorType, long, neighborhood, ward, xWebMercator, yWebMercator)
FROM '..\Resources\onsale.csv'
DELIMITER ','
CSV HEADER;