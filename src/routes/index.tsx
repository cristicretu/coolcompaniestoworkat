import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="section bright">
        <div class="container center">ey mate</div>
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
