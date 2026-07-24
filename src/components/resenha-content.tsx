interface Props {
  content: string;
}

function parseQuotes(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /"([^"]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <blockquote
        key={match.index}
        className="bg-coral/5 border-l-[3px] border-coral pl-6 pr-10 py-5 my-6 rounded-xl text-foreground/85 leading-relaxed font-serif italic text-center max-w-lg mx-auto"
      >
        &ldquo;{match[1]}&rdquo;
      </blockquote>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function ResenhaContent({ content }: Props) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="text-foreground/70 leading-relaxed font-serif space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i}>{parseQuotes(p)}</p>
      ))}
    </div>
  );
}
