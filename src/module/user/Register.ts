import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import User from 'entity/User';
import RegisterInput from './register/RegisterInput';

@Resolver(User) // Pass User here to know that we're resolving for the User type
export class RegisterResolver {
  @Query(() => String, { name: 'helloWorld' }) // GQL type
  async hello() {
    return 'Hello World!';
  }

  @Mutation(() => User) // GQL type
  async register(
    @Arg('input') { email, firstName, lastName, password }: RegisterInput
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
