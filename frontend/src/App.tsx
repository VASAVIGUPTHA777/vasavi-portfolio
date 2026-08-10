import { useEffect, useState } from 'react';
import type { PortfolioData } from './types';
import { fetchPortfolio } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import './styles/variables.css';

export function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio()
      .then((res) => setData(res))
      .catch((err) => {
        console.error('API Error:', err);
        setError(err.message || 'Failed to load portfolio data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ color: '#10B981', textAlign: 'center', paddingTop: '20vh', fontFamily: 'sans-serif' }}>
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar resumeUrl={data?.profile?.resumeUrl} />
      <Hero profile={data?.profile || null} />
      <Skills skills={data?.skills || []} />
      <Projects projects={data?.projects || []} />
      <Experience experiences={data?.experience || []} />
      <Contact />
      {error && (
        <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', background: '#ef4444', color: '#fff', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
          Backend Notice: {error} (Displaying fallback UI)
        </div>
      )}
    </div>
  );
}

export default App;