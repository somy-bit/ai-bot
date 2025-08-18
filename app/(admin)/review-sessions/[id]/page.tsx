import ReviewSessionContent from './ReviewSessionContent';

export default function Page({ params }: { params: { id: string } }) {
  return <ReviewSessionContent sessionId={params.id} />;
}
