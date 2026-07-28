import teamImage from '../../assets/Images/team-working.jpg';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const WhoWeAre = ({ content = {} }) => {
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
      heading: 'Who We Are',
      paragraphOne: 'KarFamSoft Agency is a team of strategists, designers, and developers who believe in the power of purposeful creativity. We blend aesthetics with functionality to deliver digital solutions that are both visually compelling and strategically sound.',
      paragraphTwo: 'Whether we\'re building a product from scratch or refining a platform, we bring full ownership, deep collaboration, and real curiosity to every project.',
      imageAlt: 'KarFamSoft team collaborating in a creative workspace',
      sectionAria: 'About KarFamSoft Team',
      aboutUs: 'About Us',
    },
    fa: {
      heading: 'ما چه کسانی هستیم',
      paragraphOne: 'کرفم سافت تیمی از استراتژیست ها، طراحان و توسعه دهندگان است که به قدرت خلاقیت هدفمند باور دارند. ما زیبایی و کارکرد را ترکیب می کنیم تا راهکارهای دیجیتال موثر و چشم نواز ارائه دهیم.',
      paragraphTwo: 'چه محصولی را از صفر بسازیم و چه پلتفرمی را بازطراحی کنیم، در هر پروژه با مالکیت کامل، همکاری عمیق و کنجکاوی واقعی حضور داریم.',
      imageAlt: 'همکاری تیم کارفم سافت در فضای کاری خلاق',
      sectionAria: 'درباره تیم کارفم سافت',
      aboutUs: 'درباره ما',
    },
    ps: {
      heading: 'موږ څوک یو',
      paragraphOne: 'KarFamSoft Agency د ستراتیژستانو، ډیزاینرانو او پراختیاکوونکو ټیم دی چې د هدفمندې خلاقیت په ځواک باور لري. موږ ښکلا او فعالیت یوځای کوو څو اغېزمن ډیجیټل حلونه وړاندې کړو.',
      paragraphTwo: 'که محصول له صفره جوړوو او که موجوده پلاتفورم ښه کوو، هره پروژه په بشپړ مالکیت، ژورې همکارۍ او رښتینې لیوالتیا سره مخ ته وړو.',
      imageAlt: 'په تخلیقي کاري چاپېریال کې د KarFamSoft ټیم همکاري',
      sectionAria: 'د KarFamSoft ټیم په اړه',
      aboutUs: 'زموږ په اړه',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Who We Are');
  const paragraphOne =
    pickText(
      content.paragraphOne,
      copy.paragraphOne ||
        'KarFamSoft Agency is a team of strategists, designers, and developers who believe in the power of purposeful creativity. We blend aesthetics with functionality to deliver digital solutions that are both visually compelling and strategically sound.',
    );
  const paragraphTwo =
    pickText(
      content.paragraphTwo,
      copy.paragraphTwo ||
        'Whether we\'re building a product from scratch or refining a platform, we bring full ownership, deep collaboration, and real curiosity to every project.',
    );
  const imageUrl = content.imageUrl || teamImage;
  const imageAlt = pickText(content.imageAlt, copy.imageAlt || 'KarFamSoft team collaborating in a creative workspace');

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionAria || 'About KarFamSoft Team'}>
      {/* Subtle radial glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 15% 40%, color-mix(in srgb, var(--theme-primary) 6%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 85% 60%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {copy.aboutUs || 'About Us'}
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {paragraphOne}
          </motion.p>
          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {paragraphTwo}
          </motion.p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl opacity-25 blur-2xl"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full opacity-10"
              style={{ background: 'linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))' }}
            />
            <img
              src={imageUrl}
              alt={imageAlt}
              className="rounded-2xl shadow-xl w-full object-cover max-h-[480px]"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
