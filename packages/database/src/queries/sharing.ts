import type { Database } from '../client';

// TODO: Implement access check that verifies whether a given access grant token
// has permission to view a specific data category for the policy owner.
export async function checkCategoryAccess(
  db: Database,
  params: {
    token: string;
    category: string;
  },
) {
  // TODO: Look up the access grant by token, verify it is active and not expired,
  // then check if the linked share policy's categories array includes the
  // requested category. Return { allowed: boolean; userId: string | null }.
  return { allowed: false, userId: null as string | null };
}

// TODO: Implement query to list all active access grants for a user's share policies,
// including recipient details and last access timestamps.
export async function getActiveGrants(
  db: Database,
  params: {
    userId: string;
  },
) {
  // TODO: Join sharePolicies with accessGrants, filter by userId and isActive,
  // order by createdAt desc
  return [];
}
