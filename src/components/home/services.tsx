import { Container, Section } from "@/components/ui";
import { services } from "@/lib/sample-data";

export function Services() {
  return (
    <Section divided spacing="tight">
      <Container>
        <ul className="grid gap-10 text-center sm:grid-cols-3 sm:gap-6">
          {services.map((s) => (
            <li key={s.title} className="mx-auto max-w-xs">
              <h3 className="type-label">{s.title}</h3>
              <p className="mt-3 type-body text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
