import puppeteer from 'puppeteer'

// async function evaluateParseFile(): Promise<void> {
// }

export default class Puppenv {
	private browser: puppeteer.Browser
	private page: puppeteer.Page

	constructor() {}

	async start() {
		this.browser = await puppeteer.launch({
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
			]
		})

		this.page = await this.browser.newPage()
		this.page.on('console', (msg: any) => {
			if (msg.type() === 'info') return
			msg = msg.text()
			console.log('From page: ', msg)
		})

		this.page.on("pageerror", function (err) {  
			console.log(err.toString()) 
		})
	}

	async testProject(projectSlug: string) {
		await this.page.goto(`http://localhost:4000/${projectSlug}`)
		// return await this.page.evaluate(evaluateParseFile, projectSlug)
	}

	stop() {
		this.browser.close()
	}
}

async function main() {
	const puppenv = new Puppenv()
	await puppenv.start()
	await puppenv.testProject('kranten1700bla')
	puppenv.stop()
}

main()

// export default async function main(
// 	docereConfigData: DocereConfigData,
// 	files: string[]
// ): Promise<IndexData[]> {
// 	const app = express()
// 	app.disable('x-powered-by')
// 	app.use(express.static(`node_modules/docere-config/projects`))
// 	app.get('/', (_req, res) => res.send(`<html><head></head><body><canvas></canvas></body></html>`))
// 	const server = app.listen(3333)

// 	let output

// 	try {
// 		output = await extractData(docereConfigData, files) 
// 	} catch (err) {
// 		console.log("ANOTHER ERRR", err)	
// 	}

// 	server.close()

// 	return output
// }
