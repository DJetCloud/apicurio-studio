-- *********************************************************************
-- DDL for the Apicurio Studio Hub API - Database: H2
-- Upgrades the DB schema from version 12 to version 13.
-- *********************************************************************

UPDATE apicurio SET prop_value = 13 WHERE prop_name = 'db_version';

CREATE TABLE organizations (id BIGINT AUTO_INCREMENT NOT NULL, name VARCHAR(64) NOT NULL, description VARCHAR(1024), email VARCHAR(255) NOT NULL, created_by VARCHAR(255) NOT NULL, created_on TIMESTAMP NOT NULL);
ALTER TABLE organizations ADD PRIMARY KEY (id);
CREATE INDEX IDX_orgs_1 ON organizations(created_by)