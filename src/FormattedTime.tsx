export function FormattedTime({ ts }: { ts: number }) {
  return <>{new Date(ts).toLocaleString()}</>;
}
