import { component$, Slot } from "@builder.io/qwik";

import Footer from "~/components/starter/footer/footer";

export default component$(() => {
  return (
    <div class="page">
      <main
        style={{
          background: "url(/download.gif) repeat center center",
          height: "100vh",
        }}
      >
        <Slot />
        <Footer />
      </main>
    </div>
  );
});
