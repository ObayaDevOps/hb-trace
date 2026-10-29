import { redirect } from 'next/navigation';
import StaffShell from '@/components/v1/StaffShell';
import '@/components/v1/staff-theme.css';
import { getApplicationIdentity } from '@/server/auth/identity';

export const dynamic = 'force-dynamic';

export default async function StaffLayout({ children }) {
  const identity = await getApplicationIdentity();
  if (!identity.identity) {
    redirect(`/auth/login?reason=${identity.reason}`);
  }

  return <StaffShell mode={identity.identity.assuranceLevel === 'authenticated' ? 'hosted' : 'local'}>{children}</StaffShell>;
}
