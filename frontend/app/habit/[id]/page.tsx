import HabitPageClient from './HabitPageClient';

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((id) => ({ id }));
}

export default function HabitPage() {
  return <HabitPageClient />;
}
