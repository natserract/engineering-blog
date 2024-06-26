import Link from "next/link";
import { Virtuoso } from "react-virtuoso";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";

import { NotesType } from "../../pages/notes";
import { filterOptions } from "./filter";
import { useDebounce } from "./hooks";

const defaultFilterOptions = filterOptions();

const sort = (data: NotesType[]) =>
  data.slice().sort((a, b) => a.node?.title.localeCompare(b.node?.title));

export const Notes = ({ data }: { data: NotesType[] }) => {
  const [search, setInputSearch] = useState("");
  const searchDebounced = useDebounce(search);

  const handleSearch = useCallback(
    (value: string) => setInputSearch(value),
    [],
  );

  const notes = useMemo(() => {
    if (searchDebounced.length > 1) {
      const options = defaultFilterOptions(data, {
        inputValue: searchDebounced,
      });

      return sort(options as NotesType[]);
    }

    return sort(data);
  }, [searchDebounced, data]);

  return (
    <div className="min-h-screen">
      <h3 className="text-2xl font-bold mb-5 border-b border-gray-250 font-eb-garamond">
        Shared Notes
      </h3>

      <div className="gap-10">
        <div className="mb-5">
          <input
            type="search"
            placeholder="Search (by title, keywords)"
            className="border border-gray-400 w-full p-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Virtuoso
          data={notes}
          useWindowScroll
          components={{
            List: forwardRef((props, ref) => {
              return (
                <ul
                  //@ts-expect-error Ref always HTMLDivElement
                  ref={ref}
                  className="list-disc ml-5"
                  {...props}
                />
              );
            }),
          }}
          itemContent={(_, note) => <InnerNote {...note} />}
        />
      </div>
    </div>
  );
};

const InnerNote: React.FC<NotesType> = memo(({ node }) => {
  const makeLinkProps = () => {
    // Prepare href
    let href = `/notes/` + node._sys.filename;
    if (node.link && node.link != "") {
      href = node.link;
    }

    // Prepare target
    let target = "_self";
    if (node.link && node.link != "") {
      target = "_blank";
    }

    return {
      href,
      target,
    } satisfies React.AnchorHTMLAttributes<unknown>;
  };

  return (
    <li className="border-b border-gray-200">
      <Link
        {...makeLinkProps()}
        className="group block !bg-none transition-all duration-150 ease-out"
      >
        <h2
          className={`text-sail-500 dark:text-white font-semibold title-font transition-all hover:underline duration-150 ease-out`}
        >
          {node?.title}

          {node?.link && (
            <span className="text-xs font-normal text-gray-300 ml-1">
              ({node.link})
            </span>
          )}
        </h2>
      </Link>
    </li>
  );
});
