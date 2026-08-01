/** Server-rendered JSON-LD. Accepts a typed object so no page hand-writes JSON. */
export default function Schema({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
