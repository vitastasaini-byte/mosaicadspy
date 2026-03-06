import puppeteer from 'puppeteer';

// Helper to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function scrapeMetaAds(pageId) {
    console.log(`Starting scrape for Page ID: ${pageId}`);
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=IN&media_type=all&search_type=page&view_all_page_id=${pageId}`;

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Accept cookies if prompted (Optional, helps remove overlays)
        try {
            const cookieButton = await page.$('div[aria-label="Allow all cookies"]');
            if (cookieButton) await cookieButton.click();
        } catch (e) { }

        // Wait for the main ad container
        await delay(3000);

        // Scroll down to load more ads (simulate a few scrolls to grab a good number of ads)
        for (let i = 0; i < 5; i++) {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await delay(1500);
        }

        // Extract raw ad blocks based on their expected structure in Meta Ad library
        // Note: Meta changes DOM frequently, this uses structural text extraction as a fallback
        const ads = await page.evaluate(() => {
            // Find containers that look like Ad Cards
            const rawCards = Array.from(document.querySelectorAll('div.xh8yej3'));

            const extracted = [];

            // Fallback selector for generic ad cards if the specific class above changes:
            // We look for elements that have text like "Library ID:"
            const allDivs = Array.from(document.querySelectorAll('div'));
            const idDivs = allDivs.filter(d => d.textContent && d.textContent.includes('Library ID:'));

            const cardsToParse = idDivs.length > 0 ? idDivs.map(d => d.closest('div[style*="border-radius"]')) : rawCards;

            // Deduplicate elements
            const uniqueCards = [...new Set(cardsToParse)].filter(Boolean);

            for (const card of uniqueCards) {
                const text = card.textContent || '';

                // Extract ID
                const idMatch = text.match(/Library ID:\s+(\d+)/);
                if (!idMatch) continue;
                const id = idMatch[1];

                // Extract Start Date
                const dateMatch = text.match(/Started running on (\d{1,2} [A-Za-z]+ \d{4})/);
                const startDate = dateMatch ? dateMatch[1] : '';

                // Media Type logic (heuristic)
                let mediaType = 'Image';
                if (card.querySelector('video')) {
                    mediaType = 'Video';
                } else if (card.querySelectorAll('img').length > 2) {
                    // If many images, might be carousel
                    mediaType = 'Carousel';
                }

                // Ad Copy Text
                // Meta ad copy usually is inside a specific span. Heuristic: longest text node
                const spans = Array.from(card.querySelectorAll('span'));
                let maxText = '';
                spans.forEach(s => {
                    const t = s.innerText || '';
                    if (t.length > maxText.length && !t.includes('Library ID:') && !t.includes('Started running')) {
                        maxText = t;
                    }
                });

                extracted.push({
                    id,
                    startDate: startDate || new Date().toISOString().split('T')[0],
                    mediaType,
                    adCopy: maxText.trim()
                });
            }
            return extracted;
        });

        console.log(`Successfully scraped ${ads.length} ads for Page ID ${pageId}`);
        return ads;
    } catch (error) {
        console.error(`Error scraping Page ID ${pageId}:`, error);
        return [];
    } finally {
        await browser.close();
    }
}
