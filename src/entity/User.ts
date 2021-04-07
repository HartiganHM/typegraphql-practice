import { Field, ID, ObjectType } from 'type-graphql';
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

  @Field() // Only part of GQL schema, not DB
  name: string;

  @Column() // Only in DB, not part of GQL schema
  password: string;
}

export default User;
