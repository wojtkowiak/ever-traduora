import { Exporter, IntermediateTranslationFormat, Parser } from '../domain/formatters';

export const jsonI18nParser: Parser = async (data: string) => {
  const parsed = JSON.parse(data);

  console.log(parsed);

  const translations = [];
  if (Array.isArray(parsed) || typeof parsed !== 'object') {
    throw new Error('JSON contents are not of key:value format');
  }
  for (const term of Object.keys(parsed)) {
    const translation: { defaultMessage: string, description?: string } = parsed[term];
    if (typeof translation !== 'object' || typeof term !== 'string') {
      throw new Error('JSON contents are not of key:value format');
    }
    translations.push({
      term,
      translation: translation.defaultMessage,
      context: translation.description || ''
    });
  }
  return {
    translations,
  };
};

export const jsonFlatExporter: Exporter = async (data: IntermediateTranslationFormat) =>
  JSON.stringify(
    data.translations.reduce((acc, x) => ({ ...acc, [x.term]: x.translation }), {}),
    null,
    4,
  );
