import '../styles/index.css'
import Link from 'next/link'
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
	const router = useRouter()

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
		"Udlejning"
	]

	const linkToUrl = link => {
		if (link == "Hjem" || link == "Forside") {
			return "/"
		}

		return "/" + link.toLowerCase().replace("æ", "ae").replace("ø", "oe").replace("å", "aa")
	}

	return (
		<div className="max-w-6xl mx-auto font-sans pb-24">
			<header className="flex items-center justify-between my-12">
				<div>
					<Link href="/">
						<a className="text-2xl font-bold">Den sidste gård</a>
					</Link>
					<p className="text-xs font-normal text-gray-400">Askhøj, Brændekilde på Fyn</p>
				</div>

				{/* <nav>
					<ul className="flex">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link href={linkToUrl(link)}>
										<a
											className={`px-4 text-sm font-medium ${router.asPath == linkToUrl(link) ? 'text-brand' : 'text-gray-900 hover:text-brand'}`}
										>{link}</a>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav> */}
			</header>

			<main className='flex'>
				<nav className="w-1/4">
					<ul className="">
						{links.map((link, index) => {
							return (
								<li key={index}>
									<Link href={linkToUrl(link)}>
										<a className={`inline-block py-3 text-sm font-medium ${router.asPath == linkToUrl(link) ? 'text-brand' : 'text-gray-900 hover:text-brand'}`}>{link}</a>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>

				<div>
					<Component {...pageProps} />
				</div>
			</main>
		</div>
	)
}

export default MyApp
