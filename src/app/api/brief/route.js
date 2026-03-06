import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { processIntelligenceSignals } from '@/services/intelligence';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const competitor = searchParams.get('competitor') || 'Primary Competitor';

    if (!brand) return NextResponse.json({ error: 'Brand is required' }, { status: 400 });

    try {
        const db = await getDb();

        // In a real scenario, we would filter by 'competitor' as well.
        // For this prototype, we'll pull all ads associated with the target brand's competitor set.
        const ads = await db.all('SELECT * FROM ads WHERE brand = ?', [brand]);

        // If no ads in DB yet, return mock intelligence for the UI prototyping
        if (ads.length === 0) {
            if (brand === 'BeBodywise') {
                return NextResponse.json({
                    signals: {
                        bigMove: 'The primary competitors active in these campaigns are Kapiva, Oziva, and Wellbeing Nutrition. They are maintaining steady ad volume, but aggressively pushing Video formats to demonstrate efficacy.',
                        longevity: [{
                            theme: 'Fear-based',
                            mediaType: 'Video',
                            daysActive: 30,
                            views: 'Kapiva had the highest number of views.'
                        }],
                        gapAnalysis: 'Competitors are heavily relying on generic and fear-based claims but lacking in-depth educational content. There is an actual gap in clinical-led messaging that breaks down the science of ingredients.',
                        actionItem: 'Suggestion for BeBodywise: Storyboard an educational "Science / Authority" video ad highlighting the clinical dosage and formulation transparency to differentiate from competitors\' fear-based messaging.'
                    }
                });
            } else if (brand === 'Man Matters') {
                return NextResponse.json({
                    signals: {
                        bigMove: 'The primary competitors tracking in these campaigns are Beardo, Ustraa, and Bombay Shaving Company. There is a strong push towards "Science/Authority" and "Social Proof" Video and Carousel formats.',
                        longevity: [{
                            theme: 'Social Proof',
                            mediaType: 'Video',
                            daysActive: 24,
                            views: 'Ustraa had the highest individual ad views at 420K.'
                        }],
                        gapAnalysis: 'Competitors lean heavily on general "expert" claims without citing specific medical backing. There is an opportunity to assert dominance by highlighting specific dermatologist test results.',
                        actionItem: 'Suggestion for Man Matters: Test a robust "Science / Authority" image or carousel ad directly addressing competitor claims by showcasing verified clinical trial numbers.'
                    }
                });
            } else if (brand === 'Little Joys') {
                return NextResponse.json({
                    signals: {
                        bigMove: 'The primary competitors active in these campaigns are Complan, Horlicks, and Bournvita. They maintain legacy authority but are actively experimenting with short-form educational Video formats to counter new-age brands.',
                        longevity: [{
                            theme: 'Solution-oriented',
                            mediaType: 'Video',
                            daysActive: 35,
                            views: 'Complan had the highest individual ad views at 510K.'
                        }],
                        gapAnalysis: 'Legacy brands lean heavily on broad claims regarding height, immunity, and generic growth factors. There is a notable "white space" for ingredient-transparent, modern pedagogical messaging addressing the contemporary millennial parent.',
                        actionItem: 'Suggestion for Little Joys: Launch a "Science / Authority" carousel ad directly comparing sugar, protein, and specific vitamin profiles against legacy competitor benchmarks.'
                    }
                });
            }

            const mockAds = [
                { startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Don\'t let hair loss stop you from being confident.' },
                { startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: '3 steps to better skin with our clinical formula.' },
                { startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Hear what 10,000 men said about this.' },
                { startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Doctor recommended solution for you.' }
            ];

            const signals = processIntelligenceSignals(mockAds, brand, competitor);
            return NextResponse.json({ signals });
        }

        const signals = processIntelligenceSignals(ads, brand, competitor);
        return NextResponse.json({ signals });

    } catch (error) {
        console.error('Error generating brief:', error);
        return NextResponse.json({ error: 'Failed to generate brief' }, { status: 500 });
    }
}
