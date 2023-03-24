import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {
  return (
    <footer style={styles}>
      Crafted with care by{" "}
      <a
        href="https://www.builder.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cristian Crețu
      </a>
    </footer>
  );
});
