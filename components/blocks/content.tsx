import React from "react";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Components } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

const components: Components<any> = {
  a: (props) => (
    <a
      href={props.url}
      className="font-semibold underline text-sail-600 hover:text-blue-600 cursor-pointer"
    >
      {props.children}
    </a>
  ),
};

export const Content = ({ data }: { data: PageBlocksContent }) => {
  const handleBackToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  return (
    <Section color={data.color}>
      <div
        style={{ maxWidth: "none" }}
        className={`prose prose-lg prose-h1:text-4xl md:prose-h1:border-b prose-h1:border-gray-250 md:prose-h1:pb-5 prose-h1:font-eb-garamond prose-h2:font-eb-garamond prose-a:break-words min-h-screen ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "body")}
      >
        <TinaMarkdown components={components} content={data.body} />
      </div>

      <button
        className="mt-20 hover:underline text-xs"
        onClick={handleBackToTop}
      >
        Back to Top
      </button>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
