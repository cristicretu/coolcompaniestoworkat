import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const url =
  "https://raw.githubusercontent.com/cristicretu/coolcompaniestoworkat/main/README.md";

interface Company {
  title: string;
  link: string;
  description: string;
}

function parseMarkdown(markdown: string): Company[] {
  const lines = markdown.split("\n");
  const companies: Company[] = [];
  let company: Company | null = null;

  for (const line of lines) {
    if (line.startsWith("- [")) {
      const title = line.match(/\[(.*?)\]/)?.[1] || "";
      const link = line.match(/\((.*?)\)/)?.[1] || "";
      company = { title, link, description: "" };
      companies.push(company);
    } else if (company && !line.startsWith("##") && line.trim()) {
      company.description = `${company.description} ${line.trim()}`;
    }
  }

  return companies;
}

export default component$(() => {
  const companies = useSignal<Company[]>();

  useTask$(async () => {
    const response = await fetch(url);
    const text = await response.text();
    const parsedCompanies = parseMarkdown(text);
    companies.value = parsedCompanies;
  });

  return (
    <>
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "20px",
        }}
      >
        {companies.value?.map((company, index) => (
          <>
            <div
              key={index}
              // give them random positions, make sure it's on the screen
              // make sure they don't overlap
              style={{
                position: "absolute",
                top: `${Math.random() * 70 + 15}vh`,
                left: `${Math.random() * 70 + 15}vw`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <a
                href={company.link}
                rel="noopener noreferrer"
                target="_blank"
                class="wordart"
              >
                {" "}
                {company.title}
              </a>
            </div>
            <p>
              {company.title} | {company.description}
            </p>
          </>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Cool companies to work at",
  meta: [
    {
      name: "just some cool companies",
      content: "cool companies",
    },
  ],
};
