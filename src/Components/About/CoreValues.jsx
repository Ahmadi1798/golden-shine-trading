import { Lightbulb, Layout, Zap, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const CoreValues = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };
  const copy = {
    en: {
      heading: 'What We Stand For',
      description: 'At KarFamSoft Agency, we\'re guided by values that shape our work and relationships.',
      sectionLabel: 'Core Values',
      eyebrow: 'Our Values',
      values: [
        { icon: Lightbulb, title: 'Craftsmanship', description: 'We obsess over the details that elevate good work to great experiences.' },
        { icon: Layout, title: 'Clarity', description: 'We value honest, simple communication - no fluff, no jargon.' },
        { icon: Zap, title: 'Agility', description: 'We adapt fast and build lean - because that\'s what real impact requires.' },
        { icon: HeartHandshake, title: 'Long-Term Vision', description: 'We care about growth that lasts - in your brand, and our relationship.' },
      ],
    },
    fa: {
      heading: 'آنچه به آن پایبندیم',
      description: 'در کارفم سافت ارزش هایی داریم که کیفیت کار و نوع همکاری ما را شکل می دهند.',
      sectionLabel: 'ارزش های اصلی',
      eyebrow: 'ارزش های ما',
      values: [
        { icon: Lightbulb, title: 'استادی در اجرا', description: 'به جزئیاتی توجه می کنیم که کار خوب را به تجربه ای عالی تبدیل می کند.' },
        { icon: Layout, title: 'شفافیت', description: 'به ارتباط ساده و صادقانه باور داریم؛ بدون حاشیه و اصطلاحات پیچیده.' },
        { icon: Zap, title: 'چابکی', description: 'سریع تطبیق می دهیم و سبک اجرا می کنیم؛ چون تاثیر واقعی همین را می طلبد.' },
        { icon: HeartHandshake, title: 'نگاه بلندمدت', description: 'به رشدی فکر می کنیم که ماندگار باشد؛ هم برای برند شما و هم همکاری ما.' },
      ],
    },
    ps: {
      heading: 'موږ د څه لپاره درېږو',
      description: 'په KarFamSoft Agency کې زموږ کار او اړیکې د روښانه ارزښتونو له مخې پرمخ ځي.',
      sectionLabel: 'اصلي ارزښتونه',
      eyebrow: 'زموږ ارزښتونه',
      values: [
        { icon: Lightbulb, title: 'مسلکي مهارت', description: 'موږ هغو جزئیاتو ته پاملرنه کوو چې ښه کار په غوره تجربه بدلوي.' },
        { icon: Layout, title: 'روڼتیا', description: 'موږ ساده او رښتینې اړیکه ارزښتمنه بولو - بې ځایه خبرو پرته.' },
        { icon: Zap, title: 'چټکتیا', description: 'ژر بدلېږو او هوښیار کار کوو، ځکه رښتینی اغېز همدې ته اړتیا لري.' },
        { icon: HeartHandshake, title: 'اوږدمهاله لید', description: 'موږ هغه ودې ته ژمن یو چې دوام ولري - ستاسې د برانډ او زموږ د اړیکې لپاره.' },
      ],
    },
  }[language] || {};

  const values = copy.values || [];
  const heading = pickText(content.heading, copy.heading || 'What We Stand For');
  const description =
    pickText(content.description, copy.description || 'At KarFamSoft Agency, we\'re guided by values that shape our work and relationships.');
  const sectionValues = Array.isArray(content.values) && content.values.length
    ? content.values.map((item, index) => ({
        title: pickText(typeof item === 'string' ? item : item.title, values[index % values.length]?.title || ''),
        description: pickText(typeof item === 'string' ? '' : item.description, values[index % values.length]?.description || ''),
        icon: values[index % values.length].icon,
      }))
    : values;

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Core Values'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% 30%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 80% 70%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {copy.eyebrow || 'Our Values'}
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sectionValues.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-950 shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))', transformOrigin: 'center' }}
              />
              <div className="flex flex-col items-center text-center">
                <div
                  className="p-3.5 rounded-xl mb-5 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
                  }}
                >
                  <Icon className="text-white" size={26} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2.5">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
