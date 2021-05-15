const Parser = new require('rss-parser')

export async function getServerSideProps(context) {
  const feedUrl = context.params.feedUrl
  const feed = await Parser.parseURL(feedUrl)
  console.log(`Parsed feed: ${feed.title} with ${feed.items.length} items`)
  return {
    props: {
      inputUrl: feedUrl,
      feed: feed,
    }
  }
}