'use strict'
/* eslint-env node */

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      CREATE TABLE identity_resource (
        enabled BOOLEAN NOT NULL DEFAULT true,
        name VARCHAR NOT NULL,
        display_name VARCHAR NOT NULL,
        description VARCHAR,
        show_in_discovery_document BOOLEAN NOT NULL DEFAULT true,
        required BOOLEAN NOT NULL DEFAULT false,
        emphasize BOOLEAN NOT NULL DEFAULT false,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (name)
      );

      CREATE TABLE identity_resource_user_claim (
        identity_resource_name VARCHAR NOT NULL,
        claim_name VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (identity_resource_name, claim_name),
        CONSTRAINT FK_identity_resource_user_claim_identity_resource FOREIGN KEY (identity_resource_name) REFERENCES identity_resource (name)
      );

      CREATE TABLE api_scope (
        enabled BOOLEAN NOT NULL DEFAULT true,
        name VARCHAR NOT NULL,
        display_name VARCHAR NOT NULL,
        description VARCHAR,
        show_in_discovery_document BOOLEAN NOT NULL DEFAULT true,
        required BOOLEAN NOT NULL DEFAULT false,
        emphasize BOOLEAN NOT NULL DEFAULT false,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (name)
      );

      CREATE TABLE api_scope_user_claim (
        api_scope_name VARCHAR NOT NULL,
        claim_name VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (api_scope_name, claim_name),
        CONSTRAINT FK_api_scope_user_claim_api_scope FOREIGN KEY (api_scope_name) REFERENCES api_scope (name)
      );

      CREATE TABLE api_resource (
        enabled BOOLEAN NOT NULL DEFAULT true,
        name VARCHAR NOT NULL,
        display_name VARCHAR NOT NULL,
        description VARCHAR,
        show_in_discovery_document BOOLEAN NOT NULL DEFAULT true,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (name)
      );

      CREATE TABLE api_resource_user_claim (
        api_resource_name VARCHAR NOT NULL,
        claim_name VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (api_resource_name, claim_name),
        CONSTRAINT FK_api_resource_user_claim_api_resource FOREIGN KEY (api_resource_name) REFERENCES api_resource (name)
      );

      CREATE TABLE api_resource_scope (
        api_resource_name VARCHAR NOT NULL,
        scope_name VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (api_resource_name, scope_name),
        CONSTRAINT FK_api_resource_scope_api_resource FOREIGN KEY (api_resource_name) REFERENCES api_resource (name)
      );

      CREATE TABLE api_resource_secret (
        api_resource_name VARCHAR NOT NULL,
        value VARCHAR NOT NULL,
        description VARCHAR,
        expiration TIMESTAMP WITH TIME ZONE,
        type VARCHAR NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT now(),
        modified TIMESTAMP WITH TIME ZONE,
        PRIMARY KEY (api_resource_name, value),
        CONSTRAINT FK_api_resource_secret_api_resource FOREIGN KEY (api_resource_name) REFERENCES api_resource (name)
      );

      COMMIT;
    `)
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      BEGIN;

      DROP TABLE identity_resource_user_claim;
      DROP TABLE identity_resource;

      DROP TABLE api_scope_user_claim;
      DROP TABLE api_scope;

      DROP TABLE api_resource_user_claim;
      DROP TABLE api_resource_scope;
      DROP TABLE api_resource_secret;
      DROP TABLE api_resource;
      
      COMMIT;
    `)
  },
}
