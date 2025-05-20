import { createRealmContext } from '@realm/react';
import { schemas } from './schemas';

// Create a configuration object
export const realmConfig = {
  schema: schemas,
  schemaVersion: 3,
};

// Create a Realm context that can be used with the RealmProvider
export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);
