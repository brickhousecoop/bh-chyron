import Head from 'next/head'
import Image from 'next/image'

import cheerio from 'cheerio'
import axios from 'axios'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>The Brick House Wire Service</title>
      </Head>

      <main>
        <h1>The Brick House Wire Service</h1>
        <h2>"mighty mighty"</h2>

        {props.feed.items.map((item, index) =>
          <a className="news-item" key={index} href={item.link}>{item.title}</a>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const url = 'https://thebrick.house'

  const request = await axios.get(url)
  const page = cheerio.load(request.data)
  const bhLinks = page('h3.post-preview__title a')

  const posts = []

  bhLinks.each(function(i, post) {
    const postObj = {}
    console.log('post', post)
    postObj.title = page(this).text()
    postObj.link = page(this).attr('href')
    posts.push(postObj)
  })

  return {
    props: {
      inputUrl: url,
      feed: {
        items: posts
      },
    }
  }
}
