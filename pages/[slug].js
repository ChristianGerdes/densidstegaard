import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

const Page = ({ source }) => {
  return (
    <div className="mx-auto prose">
      <MDXRemote {...source} />
    </div>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("pages/content"));

  const paths = files
    .filter((filename) => {
      return filename != "dagbog";
    })
    .map((filename) => ({
      params: {
        slug: filename.replace(".mdx", ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const content = fs.readFileSync(
    path.join("pages/content/", slug + ".mdx"),
    "utf-8"
  );
  const source = await serialize(content);

  return {
    props: {
      slug,
      source: source,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default Page;
