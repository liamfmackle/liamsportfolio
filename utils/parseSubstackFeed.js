const FEED_URL = "https://liamfmackle.substack.com/feed";

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
    const res = await fetch(FEED_URL);
    if (!res.ok) {
      return { title: "Liam's Newsletter", description: "", posts: [] };
    }
    const xml = await res.text();

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
