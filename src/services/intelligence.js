export function processIntelligenceSignals(ads, brand, competitor) {
    const currentDate = new Date();
    const signals = {
        longevity: [],
        creativeVelocity: 0,
        messageThemes: {
            fearBased: 0,
            solutionOriented: 0,
            socialProof: 0,
            scienceAuthority: 0,
        },
        formatPivot: {
            image: 0,
            video: 0,
            carousel: 0,
        },
        gapAnalysis: '',
        actionItem: '',
        bigMove: ''
    };

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    // Analyze individual ads
    ads.forEach(ad => {
        const startDate = new Date(ad.startDate);

        // 1. Longevity > 21 days
        const diffTime = Math.abs(currentDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 21) {
            signals.longevity.push({ ...ad, daysActive: diffDays });
        }

        // 2. Creative Velocity (ads dropped in last 7 days)
        if (startDate >= oneWeekAgo) {
            signals.creativeVelocity++;
        }

        // 3. Message Themes (Heuristics)
        const copy = ad.adCopy.toLowerCase();
        let themeFound = false;

        if (copy.match(/don't let|fear|stop you|hair loss|worried|scared|risk/)) {
            signals.messageThemes.fearBased++;
            themeFound = true;
            ad.theme = 'Fear-based';
        }
        if (copy.match(/steps to|how to|solution|fix|better|improve|finally/)) {
            signals.messageThemes.solutionOriented++;
            themeFound = true;
            ad.theme = 'Solution-oriented';
        }
        if (copy.match(/review|said|love|testimonial|rating|stars|people/)) {
            signals.messageThemes.socialProof++;
            themeFound = true;
            ad.theme = 'Social Proof';
        }
        if (copy.match(/doctor|clinical|study|proven|science|dermatologist|expert/)) {
            signals.messageThemes.scienceAuthority++;
            themeFound = true;
            ad.theme = 'Science/Authority';
        }

        if (!themeFound) {
            ad.theme = 'General';
        }

        // 4. Format Pivot
        if (ad.mediaType === 'Video') signals.formatPivot.video++;
        else if (ad.mediaType === 'Carousel') signals.formatPivot.carousel++;
        else signals.formatPivot.image++;
    });

    // Sort longevity ads by days active (descending)
    signals.longevity.sort((a, b) => b.daysActive - a.daysActive);

    // Generate the Monday Morning Brief parts
    signals.bigMove = generateBigMove(signals, competitor);
    signals.gapAnalysis = generateGapAnalysis(signals, brand);
    signals.actionItem = generateActionItem(signals);

    return signals;
}

function generateBigMove(signals, competitor) {
    // If formatting pivot is mostly Video and creative velocity is high
    if (signals.formatPivot.video > signals.formatPivot.image && signals.creativeVelocity > 5) {
        return `${competitor} is aggressively pivoting to Video/Reels formats, launching ${signals.creativeVelocity} new variations this week.`;
    }

    if (signals.messageThemes.scienceAuthority > signals.messageThemes.solutionOriented) {
        return `${competitor} is shifting messaging to heavily feature clinical-efficacy and doctor-led authority.`;
    }

    return `${competitor} is maintaining steady ad volume, primarily using ${signals.formatPivot.image > signals.formatPivot.video ? 'Static Images' : 'Video'
        }.`;
}

function generateGapAnalysis(signals, brand) {
    if (brand === 'Man Matters') {
        if (signals.messageThemes.socialProof < 2) {
            return "Competitors are underutilizing social proof for men's wellness—huge gap for Man Matters to dominate with UGC.";
        }
    } else if (brand === 'BeBodywise') {
        if (signals.messageThemes.scienceAuthority < 2) {
            return "Competitors are lacking clinical/doctor-led messaging in recent creatives. Opportunity for BeBodywise to push expert authority.";
        }
    } else if (brand === 'Little Joys') {
        if (signals.formatPivot.video < 3) {
            return "Competitors are stuck on static images for kids' nutrition. Opportunity to engage parents with educational short-form videos.";
        }
    }

    return "Competitors are lacking fear-based emotional hooks. Opportunity to test problem-agitation messaging.";
}

function generateActionItem(signals) {
    if (signals.longevity.length > 0) {
        const winner = signals.longevity[0];
        return `Deconstruct the "${winner.theme}" hook from the top competitor's longest-running ${winner.mediaType} ad and storyboard a counter-variation today.`;
    }

    if (signals.creativeVelocity > 10) {
        return `Competitor launched ${signals.creativeVelocity} new creatives this week. Monitor their budget shift and identify which new hook scales past 7 days.`;
    }

    return "Launch a new batch of 3 'Solution-oriented' statics to test against competitor's baseline creatives.";
}
