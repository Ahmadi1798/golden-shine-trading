'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

function CountUp({ end, suffix = '', decimals = 0, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end * 10 ** decimals) / 10 ** decimals);
      if (progress < 1) requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const TeamStats = ({ content = {} }) => {
  const { t, isRTL } = useLanguage();
  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);

  const stats = [
    {
      label: t('team.projectsDelivered', 'Projects Delivered'),
      end: hasField('projectsDelivered') ? Number(content.projectsDelivered) || 120 : 120,
      suffix: '+',
    },
    {
      label: t('team.avgClientRating', 'Avg Client Rating'),
      end: hasField('clientRating') ? Number(content.clientRating) || 4.9 : 4.9,
      suffix: '/5',
      decimals: 1,
    },
    {
      label: t('team.yearsBuilding', 'Years Building'),
      end: hasField('yearsBuilding') ? Number(content.yearsBuilding) || 8 : 8,
      suffix: '+',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 rounded-xl shadow-lg dark:shadow-black/30 overflow-hidden border border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {stats.map((item, i) => (
            <div
              key={item.label}
              className="relative px-4 py-5 text-center"
              style={
                i < 2
                  ? {
                      [isRTL ? 'borderLeft' : 'borderRight']: '1px solid',
                      borderColor: 'color-mix(in srgb, var(--text-base) 6%, transparent)',
                    }
                  : {}
              }
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-0.5 leading-none">
                <CountUp end={item.end} suffix={item.suffix} decimals={item.decimals || 0} />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamStats;
