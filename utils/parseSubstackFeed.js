import https from "https";

const FEED_URL = "https://liamfmackle.substack.com/feed";

function fetchFeed(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchFeed(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(xml, tag) {
  const match = xml.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  );
  if (match) return match[1].trim();
  const simple = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  );
  return simple ? simple[1].trim() : "";
}

export async function parseSubstackFeed() {
  try {
    const xml = await fetchFeed(FEED_URL);

    const channelEnd = xml.indexOf("<item>");
    const channelXml = channelEnd > -1 ? xml.slice(0, channelEnd) : xml;

    const title = extractTag(channelXml, "title") || "Liam's Newsletter";
    const description = stripHtml(extractTag(channelXml, "description"));

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
      const itemXml = match[1];
      const postTitle = extractTag(itemXml, "title");
      const link = extractTag(itemXml, "link");
      const pubDate = extractTag(itemXml, "pubDate");
      const desc = extractTag(itemXml, "description");
      const preview = stripHtml(desc).slice(0, 120);

      items.push({
        title: postTitle,
        link,
        date: pubDate ? new Date(pubDate).toISOString() : "",
        preview: preview + (stripHtml(desc).length > 120 ? "..." : ""),
      });
    }

    return { title, description, posts: items };
  } catch (err) {
    return { title: "Liam's Newsletter", description: "", posts: [] };
  }
}
