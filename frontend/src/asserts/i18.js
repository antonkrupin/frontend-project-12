import i18next from 'i18next';
import resources from '../locales/index';

const i18Instance = i18next.createInstance();

i18Instance.init({
  lng: 'ru',
  resources,
});

export default i18Instance;
