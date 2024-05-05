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
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2em;
    }
    th {
      border-bottom: 1px solid #d0d0d0;
      font-weight: 400;
      text-align: left;
      padding-left: 24px;
      padding-right: 24px;
      background-color: #eaeaea;
      height: 3em;
    }
    tr:nth-child(odd) {
      background-color: #fdfdfd;
    }
    td {
      border-bottom: 1px solid #eaeaea;
      font-family: Monospace;
      height: 3em;
    }

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
