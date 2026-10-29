import SourcingPage from '@/components/v1/SourcingPage';

export const metadata = {
  title: 'Sourcing and purchases | HB-TRACE',
  description: 'Capture source records and purchase receipts in HB-TRACE.',
};

export default async function SourcingRoute({ searchParams }) {
  const params = await searchParams;
  const importKind = params?.import === 'apiaries' || params?.import === 'farmers' ? params.import : null;
  return <SourcingPage importKind={importKind} />;
}
