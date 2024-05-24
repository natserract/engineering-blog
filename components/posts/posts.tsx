import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { PostsType } from "../../pages/posts";

const components: Components<any> = {
  p: (props) => {
    return <p className="text-xs">{props.children}</p>;
  },
};

export const Posts = ({ data }: { data: PostsType[] }) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };

  const sortedDateByDate = React.useMemo(() => {
    return data.slice().sort((a, b) => {
      const [left, right] = [
        new Date(a.node.date).getTime(),
        new Date(b.node.date).getTime(),
      ];
      return right - left;
    });
  }, [data]);

  return (
    <div className="">
      <div className="mb-7 text-sm font-lato">
        <h3 className="text-2xl font-bold mb-2 md:mb-5 border-b-0 md:border-b border-gray-250 font-eb-garamond">
          About
        </h3>
        <Image
          alt="cover"
          src="https://res.cloudinary.com/dqo6txtrv/image/upload/v1716569680/Natserract%20Blog/edited_ghkbfw.jpg"
          width="100"
          height="150"
          sizes="100vw"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="mb-5 block"
        />
        <p className="mb-2">
          My name is <b>Alfin Surya</b>. I'm from Bali and I am a professional
          web-focused software engineer.
        </p>
        <p className="mb-2">
          I am mostly self-taught, and I teach myself whatever topic interests
          me. Most of the times{" "}
          <a
            className="underline hover:text-blue-600"
            href="https://www.vice.com/en/article/53dpeq/in-defense-of-learning-code-the-hard-way"
          >
            learn things from the hard way
          </a>
          , I mainly work with JavaScript/TypeScript, Python, and Elixir. I've
          been involves in fullstack development, AI, and functional
          programming. Currently open to collaboration, discussion and remote
          work.
        </p>
        <p className="mt-5 mb-2">
          <strong className="font-bold">Area of interest:</strong>
        </p>
        <p className="mb-2">
          DX(developer experience), software architecture, programming lang,
          remote working, Web Assembly, AI, WordPress, careers not job,
          KISS(keep it simple silly), type system, FP, OO, much more.
        </p>
        <blockquote className="mt-5 bg-[#f8f9fa] p-2 border border-[#a2a9b1]">
          <em className="block">
            There are no solutions. There are only trade-offs. And you try to
            get the best trade-off you can get.
          </em>
          <em className="block">That’s all you can hope for. -Thomas Sowell</em>
        </blockquote>

        <div className="flex flex-row text-xs items-center gap-2 mt-5">
          Contact:
          <ul className="list-none flex flex-row gap-2">
            <li>
              <a
                className="inline-block opacity-80 underline hover:text-blue-600 transition ease-out duration-150"
                href="https://github.com/natserract"
                target="_blank"
              >
                Github
              </a>
            </li>

            <li>
              <a
                className="inline-block opacity-80 underline hover:text-blue-600 transition ease-out duration-150"
                href="https://www.linkedin.com/in/alfinsurya/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                className="inline-block opacity-80 underline hover:text-blue-600 transition ease-out duration-150"
                href="mailto:alfins132@gmail.com"
                target="_blank"
              >
                Mail
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-5 border-b border-gray-250 font-eb-garamond">
          All Posts
        </h3>
        <ul className="list-disc ml-5">
          {sortedDateByDate.map((postData, i) => {
            const post = postData.node;
            const date = new Date(post.date);
            let formattedDate = "";
            if (!isNaN(date.getTime())) {
              formattedDate = format(date, "MMM dd, yyyy");
            }

            return (
              <li key={post._sys.filename} className="last:mb-0 mb-1">
                <Link
                  href={`/posts/` + post._sys.filename}
                  className="group block transition-all duration-150 ease-out"
                >
                  <h3
                    className={`text-sail-500 dark:text-white font-semibold title-font transition-all hover:underline duration-150 ease-out ${
                      titleColorClasses[theme.color]
                    }`}
                  >
                    {post.title}{" "}
                  </h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
