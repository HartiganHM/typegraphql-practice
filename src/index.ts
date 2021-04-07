import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const PORT = 4000;

@Resolver()
class HelloResolver {
  @Query(() => String, { name: 'helloWorld' }) // GQL type
  async hello() {
    return 'Hello World!';
  }
}

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`🚀  Server running on http://localhost:${PORT}/graphql`)
  );
};

main();
