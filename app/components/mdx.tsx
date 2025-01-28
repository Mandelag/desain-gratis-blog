import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import React from "react";

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import supersub from "remark-supersub";

const tableStyles = `
// https://github.com/micromark/micromark-extension-gfm-table?tab=readme-ov-file#css
// https://github.com/micromark/micromark-extension-gfm-table#css
// https://github.com/remarkjs/react-markdown/issues/493
/* Light theme. */
:root {
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-border-default: #d0d7de;
  --color-border-muted: hsla(210, 18%, 87%, 1);
}

/* Dark theme. */
@media (prefers-color-scheme: dark) {
  :root {
    --color-canvas-default: #0d1117;
    --color-canvas-subtle: #161b22;
    --color-border-default: #30363d;
    --color-border-muted: #21262d;
  }
}


table {
  border-spacing: 0;
  border-collapse: collapse;
  display: block;
  // margin-top: 0;
  margin-bottom: 16px;
  width: max-content;
  max-width: 100%;
  overflow: auto;
  margin: 8px;
  font-size: 0.9em;
  margin-top: 1em;
}

tr {
  background-color: var(--color-canvas-default);
  border-top: 1px solid var(--color-border-muted);
}

tr:nth-child(2n) {
  background-color: var(--color-canvas-subtle);
}

td,
th {
  padding: 6px 13px;
  border: 1px solid var(--color-border-default);
}

th {
  font-weight: 600;
}

table img {
  background-color: transparent;
}


    // table {
    // margin: 1em;
    //   // width: 100%;
    //   // border-collapse: collapse;
    //   margin-bottom: 2em;
    //   border: 1px solid white;
    // }
    // th {
    //   // border-bottom: 1px solid #d0d0d0;
    //   font-weight: 400;
    //   text-align: left;
    //   padding-left: 24px;
    //   padding-right: 24px;
    //   background-color: #eaeaea33;
    //   height: 3em;
    // }
    // tr:nth-child(odd) {
    //   // background-color: #fdfdfd;
    // }
    // td {
    //   border-bottom: 1px solid #eaeaea;
    //   // font-family: Monospace;
    //   height: 3em;
    // }

  `;

function Table({ data }) {
  console.log("GGWP", data);
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
};

export function CustomMDX(props) {
  return (
    <>
      <style>{tableStyles}</style>
      <Markdown
        rehypePlugins={[rehypeKatex]}
        remarkPlugins={[remarkMath, remarkGfm, supersub]}
        components={{ ...components, ...(props.components || {}) }}
      >
        {props.source}
      </Markdown>
    </>
  );
}
