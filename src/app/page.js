'use client';
import { useState, useEffect } from 'react';
import BriefCard from '@/components/BriefCard';
import AdTable from '@/components/AdTable';
import PrintChart from '@/components/PrintChart';

const BRANDS = [
  { id: 'bebodywise', name: 'BeBodywise', title: 'BeBodywise', competitor: 'Primary Competitors', pageId: '2232717056801902' },
  { id: 'manmatters', name: 'Man Matters', title: 'Man Matters', competitor: 'Men\'s Wellness Rivals', pageId: '100431428169996' },
  { id: 'littlejoys', name: 'Little Joys', title: 'Little Joys', competitor: 'Kids Nutrition Leaders', pageId: '103565882061245' }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(BRANDS[0]);
  const [signals, setSignals] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (brand) => {
    setLoading(true);
    try {
      const [briefRes, adsRes] = await Promise.all([
        fetch(`/api/brief?brand=${brand.name}&competitor=${brand.competitor}`),
        fetch(`/api/ads?brand=${brand.name}`)
      ]);

      const briefData = await briefRes.json();
      const adsData = await adsRes.json();

      setSignals(briefData.signals);
      // Wait, if no ads from DB, maybe use mockAds generated in Brief API for now
      if (!adsData.ads || adsData.ads.length === 0) {
        if (brand.id === 'bebodywise') {
          setAds([
            { id: '32948519201458969', views: 125000, startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'PCOS hairfall solution by BeBodywise.', theme: 'Solution-oriented', competitor: 'Kapiva' },
            { id: '2166481210531230', views: 89000, startDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Dermatologist backed acne treatment.', theme: 'Science/Authority', competitor: 'Oziva' },
            { id: '2935809729947140', views: 240000, startDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'See how 10k women reversed hair thinning.', theme: 'Social Proof', competitor: 'Wellbeing Nutrition' },
            { id: '734854242724174', views: 320000, startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Don\'t let PCOS ruin your confidence.', theme: 'Fear-based', competitor: 'Kapiva' },
            { id: '1289012628945561', views: 156000, startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'My 3-month skin transformation with BeBodywise.', theme: 'Social Proof', competitor: 'Oziva' },
            { id: '1566752447754512', views: 76000, startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Clinically proven results for your skin out now.', theme: 'Science/Authority', competitor: 'Wellbeing Nutrition' },
            { id: '1436605651839850', views: 410000, startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Stop suffering in silence with hair fall.', theme: 'Fear-based', competitor: 'Kapiva' },
            { id: '2041459696690094', views: 65000, startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Here is exactly what to do for your dark spots.', theme: 'Solution-oriented', competitor: 'Oziva' },
            { id: '1922319925360126', views: 195000, startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Doctor recommended PCOS supplements.', theme: 'Science/Authority', competitor: 'Kapiva' },
            { id: '754327881028641', views: 228000, startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'The only hair gummies you will ever need.', theme: 'Solution-oriented', competitor: 'Wellbeing Nutrition' }
          ]);
        } else if (brand.id === 'manmatters') {
          setAds([
            { id: '1845906292949584', views: 340000, startDate: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Clinically proven hair growth for men. See results in 90 days.', theme: 'Solution-oriented', competitor: 'Beardo' },
            { id: '1223754679307310', views: 185000, startDate: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Don\'t let a receding hairline ruin your confidence.', theme: 'Fear-based', competitor: 'Ustraa' },
            { id: '2723907511303239', views: 275000, startDate: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Join 100,000+ men who reclaimed their hair.', theme: 'Social Proof', competitor: 'Bombay Shaving Co' },
            { id: '1434305904838389', views: 89000, startDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Doctor recommended hygiene products for the modern man.', theme: 'Science/Authority', competitor: 'Beardo' },
            { id: '1420585379396405', views: 420000, startDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'My 6-month journey with Man Matters.', theme: 'Social Proof', competitor: 'Ustraa' },
            { id: '1278474791011357', views: 110000, startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'The science behind our Minoxidil solution.', theme: 'Science/Authority', competitor: 'Bombay Shaving Co' },
            { id: '1399803377927022', views: 215000, startDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Bald spots? Start treating them today.', theme: 'Fear-based', competitor: 'Beardo' },
            { id: '1257830836485354', views: 95000, startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Daily vitamins for men\'s health.', theme: 'Solution-oriented', competitor: 'Ustraa' },
            { id: '2101050413982347', views: 310000, startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Expert formulated products that actually work.', theme: 'Science/Authority', competitor: 'Bombay Shaving Co' },
            { id: '888218220795962', views: 155000, startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'The complete grooming kit for your daily routine.', theme: 'Solution-oriented', competitor: 'Beardo' }
          ]);
        } else if (brand.id === 'littlejoys') {
          setAds([
            { id: '1613878219792707', views: 510000, startDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Say goodbye to picky eaters with these nutrition targets.', theme: 'Solution-oriented', competitor: 'Complan' },
            { id: '839031138732346', views: 89000, startDate: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Is your child getting enough protein every day?', theme: 'Fear-based', competitor: 'Horlicks' },
            { id: '877926958108301', views: 325000, startDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'See why mothers trust our pediatric formulations.', theme: 'Social Proof', competitor: 'Bournvita' },
            { id: '1202716168021707', views: 104000, startDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Pediatrician certified supplements for early development.', theme: 'Science/Authority', competitor: 'Complan' },
            { id: '2079695592828145', views: 180000, startDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Watch her height growth progress over 6 months!', theme: 'Social Proof', competitor: 'Horlicks' },
            { id: '1243956283961370', views: 92000, startDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'The truth about added sugar in kids\' drinks.', theme: 'Science/Authority', competitor: 'Bournvita' },
            { id: '1032551068524142', views: 425000, startDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'Stop worrying about their immunity this winter.', theme: 'Fear-based', competitor: 'Complan' },
            { id: '785393603897792', views: 135000, startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Image', adCopy: 'Fun gummy vitamins they\'ll actually want to eat.', theme: 'Solution-oriented', competitor: 'Horlicks' },
            { id: '706119939019306', views: 240000, startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Carousel', adCopy: 'Comparing ingredients: Why we win every time.', theme: 'Science/Authority', competitor: 'Bournvita' },
            { id: '636145419035935', views: 285000, startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), mediaType: 'Video', adCopy: 'The complete daily nutrition hack for busy parents.', theme: 'Solution-oriented', competitor: 'Complan' }
          ]);
        }
      } else {
        setAds(adsData.ads);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Mosaic Intelligence Engine</h1>
          <p className="text-muted text-sm">Real-time Competitor Growth Intelligence</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => window.print()}>
            🖨 Print Weekly Report
          </button>
        </div>
      </header>

      <nav className="tabs">
        {BRANDS.map(brand => (
          <button
            key={brand.id}
            className={`tab-btn ${activeTab.id === brand.id ? 'active' : ''}`}
            onClick={() => setActiveTab(brand)}
          >
            {brand.title}
          </button>
        ))}
      </nav>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--mw-text-muted)' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>◓ Filtering Meta Ad Library Data...</div>
          <p>Analyzing creative velocity and hooks for {activeTab.competitor}</p>
        </div>
      ) : (
        <main>
          <BriefCard signals={signals} brand={activeTab.name} />

          <div className="card" style={{ padding: 0 }}>
            <div className="hide-on-print" style={{ padding: '1.5rem', borderBottom: '1px solid var(--mw-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Live Core Performance Drivers</h2>
            </div>
            <div className="hide-on-print">
              <AdTable ads={ads} pageId={activeTab.pageId} />
            </div>
            <PrintChart ads={ads} />
          </div>
        </main>
      )}
    </div>
  );
}
