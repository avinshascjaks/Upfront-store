import { Heading, Text, TextLink } from "@/components/ui";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  link?: { label: string; href: string };
  align?: "start" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  link,
  align = "start",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-8 flex gap-4 md:mb-12",
        centered
          ? "flex-col items-center text-center"
          : "flex-col sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow && <Text variant="caption">{eyebrow}</Text>}
        <Heading>{title}</Heading>
      </div>
      {link && (
        <TextLink href={link.href} variant="inline" className="type-label shrink-0">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
