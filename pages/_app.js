import "../styles/index.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const links = [
    "Forside",
    "Historie",
    "Bygninger",
    "Restaureringsprojektet",
    "Fonde",
    "Håndværkere",
    "Dagbog",
    "Skrivelser",
    "Kilder",
    "Udlejning",
  ];

  const linkToUrl = (link) => {
    if (link == "Hjem" || link == "Forside") {
      return "/";
    }

    return (
      "/" +
      link
        .toLowerCase()
        .replace("æ", "ae")
        .replace("ø", "oe")
        .replace("å", "aa")
    );
  };

  const toggleMenu = () => {
    document.getElementsByTagName("html")[0].style.overflow = menu
      ? null
      : "hidden";
    setMenu(!menu);
  };

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = null;
    setMenu(false);
  }, [router.query.slug]);

  return (
    <div>
      <Head>
        <title>Den sidste gaard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="max-w-5xl mx-auto px-6 font-sans pb-24">
        <header className="flex items-center justify-between my-12">
          <div>
            <Link href="/">
              <a className="text-2xl font-bold">Den sidste gård</a>
            </Link>
            <p className="text-xs font-normal text-gray-400">
              Askhøj, Brændekilde på Fyn
            </p>
          </div>

          <div>
            <button
              type="button"
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMenu}
            >
              <Bars3Icon className="h-8 w-8 text-black" />
            </button>

            {menu && (
              <div className="md:hidden absolute inset-0">
                <div className="relative w-full h-full block">
                  <button
                    type="button"
                    className="absolute inset-0 bg-black opacity-25 cursor-pointer"
                    onClick={toggleMenu}
                  ></button>
                  <div className="absolute w-72 top-0 bottom-0 right-0 bg-white overflow-y">
                    <nav className="px-8 pt-12">
                      <ul>
                        {links.map((link, index) => {
                          return (
                            <li key={index}>
                              <Link href={linkToUrl(link)}>
                                <a
                                  className={`inline-block py-3 text-sm font-medium ${
                                    router.asPath == linkToUrl(link)
                                      ? "text-brand"
                                      : "text-gray-900 hover:text-brand"
                                  }`}
                                >
                                  {link}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex">
          <nav className="hidden md:block w-1/4">
            <ul className="">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link href={linkToUrl(link)}>
                      <a
                        className={`inline-block py-3 text-sm font-medium ${
                          router.asPath == linkToUrl(link)
                            ? "text-brand"
                            : "text-gray-900 hover:text-brand"
                        }`}
                      >
                        {link}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="w-full sm:w-3/4 mx-auto">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyApp;
