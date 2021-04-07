import { Field, ID, ObjectType, Root } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType() // Converts TS to GraphQL type
@Entity() // DB Type for typeorm
class User extends BaseEntity { // Extending BaseEntity allows for typeorm DB functions like .find/.create
  @Field(() => ID) // Makes this field queryable in GQL; Add specific GQL Type as a return
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  // Simple fields as part of the entity
  // More complex fields with async in the Resolvers as a FieldResolver
  @Field() // Only part of GQL schema, not DB
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column() // Only in DB, not part of GQL schema
  password: string;
}

export default User;
