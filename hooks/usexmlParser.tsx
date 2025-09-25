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
    console.log("[v0] XML Parser - Raw data received:", xmlData ? "Data exists" : "No data")

    if (!xmlData) {
      console.log("[v0] XML Parser - No XML data provided")
      return []
    }

    try {
      console.log("[v0] XML Parser - Starting to parse XML...")
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlData, "text/xml")
      // Check for parsing errors
      const parserError = xmlDoc.querySelector("parsererror")
      if (parserError) {
        console.error("[v0] XML parsing error:", parserError.textContent)
        return []
      }

      console.log("[v0] XML Parser - XML document parsed successfully")
      console.log("[v0] XML Parser - Document root:", xmlDoc.documentElement.tagName)

      let items = xmlDoc.querySelectorAll("item")
      if (items.length === 0) {
        items = xmlDoc.querySelectorAll("entry") // Atom feeds
      }

      console.log("[v0] XML Parser - Found items:", items.length)

      const parsedItems: RSSItem[] = []

      items.forEach((item, index) => {
        console.log(`[v0] XML Parser - Processing item ${index + 1}`)

        const title = item.querySelector("title")?.textContent || "No title"
        const description =
          item.querySelector("description")?.textContent ||
          item.querySelector("summary")?.textContent ||
          item.querySelector("content")?.textContent ||
          "No description"
        const link = item.querySelector("link")?.textContent || item.querySelector("link")?.getAttribute("href") || "#"
        const pubDate =
          item.querySelector("pubDate")?.textContent ||
          item.querySelector("published")?.textContent ||
          item.querySelector("updated")?.textContent ||
          new Date().toISOString()
        const author =
          item.querySelector("author")?.textContent ||
          item.querySelector("dc\\:creator")?.textContent ||
          item.querySelector("creator")?.textContent ||
          "Unknown"

        console.log(`[v0] XML Parser - Item ${index + 1} title:`, title)

        // Try to extract image from description or media elements
        let image = ""
        const mediaContent = item.querySelector("media\\:content")
        const enclosure = item.querySelector('enclosure[type^="image"]')

        if (mediaContent) {
          image = mediaContent.getAttribute("url") || ""
        } else if (enclosure) {
          image = enclosure.getAttribute("url") || ""
        } else {
          // Try to extract image from description HTML
          const imgMatch = description.match(/<img[^>]+src="([^">]+)"/)
          if (imgMatch) {
            image = imgMatch[1]
          }
        }

        // Clean up description by removing HTML tags and truncating
        const cleanDescription =
          description
            .replace(/<[^>]*>/g, "")
            .replace(/&[^;]+;/g, " ")
            .trim()
            .substring(0, 150) + (description.length > 150 ? "..." : "")

        parsedItems.push({
          id: `${index}-${Date.now()}`,
          title: title.substring(0, 100) + (title.length > 100 ? "..." : ""),
          description: cleanDescription,
          link,
          pubDate,
          author,
          image: image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(title)}`,
        })
      })

      console.log("[v0] XML Parser - Successfully parsed items:", parsedItems.length)
      return parsedItems.slice(0, 10) // Limit to 10 items
    } catch (error) {
      console.error("[v0] Error parsing XML:", error)
      console.error("[v0] XML data that failed to parse:", xmlData?.substring(0, 500))
      return []
    }
  }, [xmlData])

  return parsedData
}
