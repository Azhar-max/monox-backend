import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function About() {
  const { language, t } = useContext(LanguageContext);
  
  const getText = (key) => {
    const texts = {
      // Hero section
      ourStory: { en: 'Our Story', it: 'La Nostra Storia' },
      heroSubtitle: { en: 'Crafting memorable gifts since 2023', it: 'Creando regali memorabili dal 2023' },
      
      // Who we are
      whoWeAre: { en: 'Who We Are', it: 'Chi Siamo' },
      whoWeAreText1: { 
        en: 'MANOX was born in 2023 from a passion for creativity and the art of giving. We are a team of designers and artisans dedicated to creating unique gifts that go beyond the ordinary.', 
        it: 'MANOX è nata nel 2023 dalla passione per la creatività e l\'arte del dono. Siamo un team di designer e artigiani dedicati alla creazione di regali unici che vanno oltre l\'ordinario.'
      },
      whoWeAreText2: { 
        en: 'Our workshop in Reggio Emilia is where ideas take shape. Every product is carefully designed and assembled by hand, ensuring the highest quality and attention to detail.', 
        it: 'Il nostro laboratorio a Reggio Emilia è il luogo dove le idee prendono forma. Ogni prodotto è progettato e assemblato con cura a mano, garantendo la massima qualità e attenzione ai dettagli.'
      },
      whoWeAreText3: { 
        en: 'We believe that a gift is more than an object: it\'s an emotion, a memory, a story to be shared.', 
        it: 'Crediamo che un regalo sia più di un oggetto: è un\'emozione, un ricordo, una storia da condividere.'
      },
      
      // Our mission
      ourMission: { en: 'Our Mission', it: 'La Nostra Missione' },
      missionText: { 
        en: '"To transform every gesture of giving into an unforgettable experience through creativity, quality and personalization."', 
        it: '"Trasformare ogni gesto di dono in un\'esperienza indimenticabile attraverso creatività, qualità e personalizzazione."'
      },
      
      // Our values
      ourValues: { en: 'Our Values', it: 'I Nostri Valori' },
      ourValuesText: { 
        en: 'Our work is guided by principles that define who we are and what we offer.', 
        it: 'Il nostro lavoro è guidato da principi che definiscono chi siamo e cosa offriamo.'
      },
      
      // Value items
      originality: { en: 'Originality and Design', it: 'Originalità e Design' },
      originalityText: { 
        en: 'Each creation is unique: studied in colors, materials and composition to express emotion and style.', 
        it: 'Ogni creazione è unica: studiata nei colori, materiali e composizione per esprimere emozione e stile.'
      },
      quality: { en: 'Quality of Materials', it: 'Qualità dei Materiali' },
      qualityText: { 
        en: 'We carefully select jewelry, accessories and decorations, choosing only reliable suppliers and excellent products.', 
        it: 'Selezioniamo attentamente gioielli, accessori e decorazioni, scegliendo solo fornitori affidabili e prodotti eccellenti.'
      },
      personalization: { en: 'Personalization', it: 'Personalizzazione' },
      personalizationText: { 
        en: 'We believe every gift should tell a story. For this reason we offer tailor-made solutions that reflect the wishes and personality of the giver.', 
        it: 'Crediamo che ogni regalo dovrebbe raccontare una storia. Per questo motivo offriamo soluzioni su misura che riflettono i desideri e la personalità del donatore.'
      },
      attention: { en: 'Attention to Detail', it: 'Attenzione ai Dettagli' },
      attentionText: { 
        en: 'From elegant packaging to the arrangement of each element, every creation is designed to amaze and make the unboxing special.', 
        it: 'Dall\'elegante confezione alla disposizione di ogni elemento, ogni creazione è progettata per stupire e rendere speciale lo sblocco.'
      },
      
      // Why choose us
      whyChoose: { en: 'Why Choose MANOX', it: 'Perché Scegliere MANOX' },
      originalityTitle: { en: 'Originality', it: 'Originalità' },
      originalityDesc: { 
        en: 'Gifts out of the ordinary, designed to surprise.', 
        it: 'Regali fuori dall\'ordinario, progettati per sorprendere.'
      },
      careTitle: { en: 'Care and Quality', it: 'Cura e Qualità' },
      careDesc: { 
        en: 'Carefully selected materials and refined design.', 
        it: 'Materiali selezionati con cura e design raffinato.'
      },
      personalizationTitle: { en: 'Personalization', it: 'Personalizzazione' },
      personalizationDesc: { 
        en: 'Every gift tells a unique story.', 
        it: 'Ogni regalo racconta una storia unica.'
      },
      versatilityTitle: { en: 'Versatility', it: 'Versatilità' },
      versatilityDesc: { 
        en: 'Gift ideas for birthdays, anniversaries, weddings, corporate events and all occasions that deserve to be celebrated.', 
        it: 'Idee regalo per compleanni, anniversari, matrimoni, eventi aziendali e tutte le occasioni che meritano di essere celebrate.'
      },
      
      // Commitment
      ourCommitment: { en: 'Our Commitment', it: 'Il Nostro Impegno' },
      reliability: { en: 'Reliability', it: 'Affidabilità' },
      reliabilityText: { 
        en: 'We are committed to ensuring punctual deliveries and integrity for all our products. Your satisfaction is our highest priority, and we go the extra mile to ensure every gift arrives in perfect condition.', 
        it: 'Ci impegniamo a garantire consegne puntuali e integrità per tutti i nostri prodotti. La tua soddisfazione è la nostra massima priorità, e ci sforziamo al massimo per garantire che ogni regalo arrivi in condizioni perfette.'
      }
    };
    return texts[key][language];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-manox-fuchsia to-manox-blue text-white p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{getText('ourStory')}</h1>
          <p className="text-xl md:text-2xl">{getText('heroSubtitle')}</p>
        </div>
      </div>
      
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia">{getText('whoWeAre')}</h2>
          <div className="prose prose-lg">
            <p className="mb-4 text-gray-700">
              {getText('whoWeAreText1')}
            </p>
            <p className="mb-4 text-gray-700">
              {getText('whoWeAreText2')}
            </p>
            <p className="text-gray-700">
              {getText('whoWeAreText3')}
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia">{getText('ourMission')}</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-xl text-center italic text-gray-700">
              {getText('missionText')}
            </p>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia">{getText('ourValues')}</h2>
          <p className="mb-6 text-gray-700">
            {getText('ourValuesText')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-2xl mr-4 text-manox-fuchsia">🎁</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{getText('originality')}</h3>
                <p className="text-gray-600">
                  {getText('originalityText')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-2xl mr-4 text-manox-fuchsia">🌿</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{getText('quality')}</h3>
                <p className="text-gray-600">
                  {getText('qualityText')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-2xl mr-4 text-manox-fuchsia">✨</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{getText('personalization')}</h3>
                <p className="text-gray-600">
                  {getText('personalizationText')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-2xl mr-4 text-manox-fuchsia">🍫</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{getText('attention')}</h3>
                <p className="text-gray-600">
                  {getText('attentionText')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia">{getText('whyChoose')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-manox-blue">{getText('originalityTitle')}</h3>
              <p className="text-gray-600">{getText('originalityDesc')}</p>
            </div>
            
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-manox-blue">{getText('careTitle')}</h3>
              <p className="text-gray-600">{getText('careDesc')}</p>
            </div>
            
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-manox-blue">{getText('personalizationTitle')}</h3>
              <p className="text-gray-600">{getText('personalizationDesc')}</p>
            </div>
            
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-manox-blue">{getText('versatilityTitle')}</h3>
              <p className="text-gray-600">{getText('versatilityDesc')}</p>
            </div>
          </div>
        </section>
        
        {/* Commitment */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-manox-fuchsia">{getText('ourCommitment')}</h2>
          <div className="flex items-start p-6 bg-manox-fuchsia text-white rounded-lg">
            <div className="text-3xl mr-4">📦</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{getText('reliability')}</h3>
              <p className="text-lg">
                {getText('reliabilityText')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}