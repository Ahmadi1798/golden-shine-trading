const SUPPORTED_LOCALES = ['en', 'es'];

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isLocaleObject(value) {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  if (!keys.length) return false;

  const hasLocaleKey = SUPPORTED_LOCALES.some((key) => key in value);
  if (!hasLocaleKey) return false;

  return keys.every((key) => SUPPORTED_LOCALES.includes(key));
}

function pickLocaleValue(localeObject, locale) {
  if (localeObject[locale] != null) return localeObject[locale];
  if (localeObject.en != null) return localeObject.en;

  for (const key of SUPPORTED_LOCALES) {
    if (localeObject[key] != null) return localeObject[key];
  }

  return '';
}

export function resolveLocalizedContent(value, locale = 'en') {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalizedContent(item, locale));
  }

  if (isLocaleObject(value)) {
    return resolveLocalizedContent(pickLocaleValue(value, locale), locale);
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((acc, [key, item]) => {
      acc[key] = resolveLocalizedContent(item, locale);
      return acc;
    }, {});
  }

  return value;
}
