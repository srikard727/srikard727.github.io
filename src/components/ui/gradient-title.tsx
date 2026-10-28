interface GradientTitleProps {
  eyebrow?: string | null;
  firstLine?: string;
  highlight?: string;
}

export default function GradientTitle({
  eyebrow = "Personal Website",
  firstLine = "Hi, I’m",
  highlight = "Srikar.",
}: GradientTitleProps) {
  return (
    <div className="gradient-title" aria-label={`${firstLine} ${highlight}`}>
      {eyebrow && <p className="gradient-title-eyebrow">{eyebrow}</p>}
      <h1>
        <span className="gradient-title-first">{firstLine}</span>{" "}
        <span className="gradient-title-highlight">{highlight}</span>
      </h1>
    </div>
  );
}
