import { InferGetStaticPropsType } from "next";

import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Notes } from "../components/notes";
import { Layout } from "../components/layout";

export default function NotesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const notes = props.data.noteConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Notes data={notes} />
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type NotesType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["noteConnection"]["edges"][number];
