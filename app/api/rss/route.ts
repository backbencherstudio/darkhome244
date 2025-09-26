import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rssUrl = searchParams.get('url');

  if (!rssUrl) {
    return NextResponse.json(
      { error: 'RSS URL is required' },
      { status: 400 }
    );
  }

  try {
    // Validate URL
    const url = new URL(rssUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return NextResponse.json(
        { error: 'Invalid URL protocol' },
        { status: 400 }
      );
    }

    // Fetch the RSS feed directly from the server
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Weather App RSS Reader/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    
    // Check if we got XML/RSS content
    if (!contentType.includes('xml') && !contentType.includes('rss')) {
      console.warn('Response may not be XML/RSS:', contentType);
    }

    const xmlContent = await response.text();

    // Basic validation
    if (!xmlContent.includes('<rss') && !xmlContent.includes('<feed')) {
      return NextResponse.json(
        { error: 'Response does not appear to be a valid RSS/Atom feed' },
        { status: 422 }
      );
    }

    // Return the XML content
    return NextResponse.json({
      success: true,
      content: xmlContent,
      contentType: contentType,
    });

  } catch (error) {
    console.error('RSS fetch error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error: Unable to fetch RSS feed' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
