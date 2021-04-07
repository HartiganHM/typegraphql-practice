import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { RegisterResolver } from './module/user/Register';

const PORT = 4000;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`🚀  Server running on http://localhost:${PORT}/graphql`)
  );
};

main();
