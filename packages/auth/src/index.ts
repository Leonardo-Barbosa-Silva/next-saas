import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { permissions } from './permissions'
import {
  AllSubject,
  BillingSubject,
  InviteSubject,
  OrganizationSubject,
  ProjectSubject,
  User,
  UserSubject,
} from './types'

type AppAbilities =
  | UserSubject
  | ProjectSubject
  | AllSubject
  | OrganizationSubject
  | InviteSubject
  | BillingSubject

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role "${user.role}" not found.`)
  }

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  permissions[user.role](user, builder)

  return ability
}
