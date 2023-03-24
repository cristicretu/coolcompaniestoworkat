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
      console.log(line);
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
      <div>
        {companies.value?.map((company, index) => (
          <div key={index}>
            <a href={company.link} rel="noopener noreferrer" target="_blank">
              {company.title}
            </a>
            <p>{company.description}</p>
          </div>
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
