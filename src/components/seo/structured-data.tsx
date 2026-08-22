interface StructuredDataProps {
  readonly data: Readonly<Record<string, unknown>>;
}

function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export { StructuredData };
