import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import User from 'entity/User';

@Resolver(User) // Pass User here to know that we're resolving for the User type
export class RegisterResolver {
  @Query(() => String, { name: 'helloWorld' }) // GQL type
  async hello() {
    return 'Hello World!';
  }

  @FieldResolver() // Not stored in DB, just in GQL schema
  async name(@Root() parent: User) {
    // Refers to the Root type (parent here)
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User) // GQL type
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
