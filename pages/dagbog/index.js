import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const Dagbog = ({ logs }) => {
    return (
		<div className="space-y-12">
			{logs.map((log, index) => {
				return (
					<div
						key={index}
						className="flex space-x-6 mx-auto"
					>
						<div className="w-1/4 text-right">
							<span className="text-2xl font-semibold">{log.title}</span>
						</div>
						<div className="prose">
							<MDXRemote {...log.source} />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export const getStaticProps = async () => {
	const files = fs.readdirSync(path.join('pages/content/dagbog/'))

	const logs = await Promise.all(files.map(async (filename) => {
		const content = fs.readFileSync(path.join('pages/content/dagbog/', filename), 'utf-8')

		const source = await serialize(content)

		return {
			title: filename.replace(".mdx", ""),
			source: source,
		}
	}))

	return {
	  	props: {
			logs: logs.reverse()
	  	}
	}
}

export default Dagbog