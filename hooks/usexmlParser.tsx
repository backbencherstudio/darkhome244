"use client"
import { useMemo } from "react"

export interface RSSItem {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  author?: string
  image?: string
}

export const useXMLParser = (xmlData: string | null) => {
  const parsedData = useMemo(() => {
    // console.log("[XML Parser] Raw data received:", xmlData ? "Data exists" : "No data")

    if (!xmlData) {
      // console.log("[XML Parser] No XML data provided")
      return []
    }

    // Check if we received HTML instead of XML
    if (xmlData.includes('<!DOCTYPE html>') || xmlData.includes('<html')) {
      // console.error("[XML Parser] Error: Received HTML instead of XML. Check your RSS feed URL.");
      return []
    }

    try {
      // console.log("[XML Parser] Starting to parse XML...")
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlData, "text/xml")

      // Check for parsing errors
      const parserError = xmlDoc.querySelector("parsererror")
      if (parserError) {
        // console.error("[XML Parser] Parsing error:", parserError.textContent)
        return []
      }

      // console.log("[XML Parser] Document root", xmlDoc.documentElement.tagName)

      // Handle both RSS and Atom feeds
      let items = xmlDoc.querySelectorAll("item")
      if (items.length === 0) {
        items = xmlDoc.querySelectorAll("entry") // Atom feeds
        // console.log("[XML Parser] No RSS items found, checking for Atom entries...")
      }

      // console.log("[XML Parser] Found items:", items.length)

      if (items.length === 0) {
        // console.warn("[XML Parser] No items or entries found in the feed")
        return []
      }

      const parsedItems: RSSItem[] = []

      items.forEach((item, index) => {
        // console.log(`[XML Parser] Processing item ${index + 1}`)

        // Extract title
        const titleElement = item.querySelector("title")
        const title = titleElement?.textContent?.trim() || "No title"

        // Extract description (try multiple possible elements)
        const descriptionElement = item.querySelector("description") ||
          item.querySelector("summary") ||
          item.querySelector("content")
        const description = descriptionElement?.textContent?.trim() || "No description"

        // Extract link
        let link = "#"
        const linkElement = item.querySelector("link")
        if (linkElement) {
          link = linkElement.textContent?.trim() || linkElement.getAttribute("href") || "#"
        }

        // Extract publication date
        const pubDateElement = item.querySelector("pubDate") ||
          item.querySelector("published") ||
          item.querySelector("updated")
        const pubDate = pubDateElement?.textContent?.trim() || new Date().toISOString()

        // Extract author
        const authorElement = item.querySelector("author") ||
          item.querySelector("dc\\:creator") ||
          item.querySelector("creator")
        const author = authorElement?.textContent?.trim() || "Unknown"

        // console.log(`[XML Parser] Item ${index + 1} title:`, title)

        // Try to extract image from various sources
        let image = "";

        const mediaContentElements = item.getElementsByTagName("media:content");
        if (mediaContentElements.length > 0) {
          image = mediaContentElements[0].getAttribute("url") || "";
        }

        if (!image) {
          const enclosureElements = item.getElementsByTagName("enclosure");
          if (enclosureElements.length > 0) {
            image = enclosureElements[0].getAttribute("url") || "";
          }
        }

        if (!image) {
          const contentEncodedElements = item.getElementsByTagName("content:encoded");
          if (contentEncodedElements.length > 0) {
            const cdataString = contentEncodedElements[0].textContent || "";
            image = extractOriginalImageUrlFromContentEncoded(cdataString);
          }
        }

        if (!image) {
          const descriptionElements = item.getElementsByTagName("description");
          if (descriptionElements.length > 0) {
            const descriptionCDATA = descriptionElements[0].textContent || "";
            image = extractImageFromDescription(descriptionCDATA);
          }
        }
        // Clean up description by removing HTML tags and truncating
        const cleanDescription = description
          .replace(/<[^>]*>/g, "")
          .replace(/&[^;]+;/g, " ")
          .trim()
          .substring(0, 200) + (description.length > 200 ? "..." : "")

        // Clean up title
        const cleanTitle = title

        parsedItems.push({
          id: `${index}-${Date.now()}-${Math.random()}`,
          title: cleanTitle,
          description: cleanDescription,
          link,
          pubDate,
          author,
          image: image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(title)}`,
        })
      })

      // console.log("[XML Parser] Successfully parsed items:", parsedItems.length)
      return parsedItems.slice(0, 25) // Limit to 20 items
      return parsedItems // all data parsed

    } catch (error) {
      // console.error("[XML Parser] Error parsing XML:", error)
      // console.error("[XML Parser] XML data that failed to parse:", xmlData?.substring(0, 500))
      return []
    }
  }, [xmlData])

  return parsedData
}



function extractOriginalImageUrlFromContentEncoded(contentEncodedString) {
  // 1. Parse out the first img src using regex
  const imgSrcMatch = contentEncodedString.match(/<img[^>]+src=['"]([^'"]+)['"]/);
  if (!imgSrcMatch) return "";

  const cdnUrl = imgSrcMatch[1];

  // 2. Parse the query string to get the 'url' param (which is the encoded original URL)
  try {
    const urlObj = new URL(cdnUrl);
    const originalUrlEncoded = urlObj.searchParams.get("url");

    if (originalUrlEncoded) {
      // Decode the original URL
      const originalUrl = decodeURIComponent(originalUrlEncoded);
      return originalUrl;
    }

    // If no 'url' param found, return the CDN url itself
    return cdnUrl;
  } catch {
    // If URL parsing fails, return the CDN url
    return cdnUrl;
  }
}


function extractImageFromDescription(descriptionString) {
  // Use regex to find first img src in the description HTML string
  const imgMatch = descriptionString.match(/<img[^>]+src=['"]([^'"]+)['"]/);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  return "";
}
