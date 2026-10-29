import VerificationPage from '@/components/v1/VerificationPage';
import { runtimeConfig } from '@/lib/runtime-config';

export const metadata = {
  title: 'Verify a batch | Humble Beeing Honey',
  description: 'Check an approved Humble Beeing Honey batch or lot code.',
};

export default async function VerifyRoute({ searchParams }) {
  const params = await searchParams;
  return <VerificationPage initialCode={params?.code || ''} mode={runtimeConfig.mode} />;
}
