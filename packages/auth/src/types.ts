import { AbilityBuilder } from '@casl/ability'
import { z } from 'zod'

import { AppAbility } from '.'

const rolesSchema = z.union([
  z.literal('ADMIN'),
  z.literal('MEMBER'),
  z.literal('BILLING'),
])
export type Roles = z.infer<typeof rolesSchema>

const userSchema = z.object({
  id: z.string(),
  role: rolesSchema,
})
export type User = z.infer<typeof userSchema>

const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
})

export type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

const allSubject = z.tuple([z.literal('manage'), z.literal('all')])

const userSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('invite'),
  ]),
  z.literal('User'),
])

const projectSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('manage'),
  ]),
  z.union([z.literal('Project'), projectSchema]),
])

const organizationSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
    z.literal('manage'),
  ]),
  z.union([z.literal('Organization'), organizationSchema]),
])

const inviteSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
    z.literal('manage'),
  ]),
  z.literal('Invite'),
])

const billingSubject = z.tuple([
  z.union([z.literal('get'), z.literal('manage'), z.literal('export')]),
  z.literal('Billing'),
])

export type AllSubject = z.infer<typeof allSubject>
export type UserSubject = z.infer<typeof userSubject>
export type ProjectSubject = z.infer<typeof projectSubject>
export type OrganizationSubject = z.infer<typeof organizationSubject>
export type InviteSubject = z.infer<typeof inviteSubject>
export type BillingSubject = z.infer<typeof billingSubject>
