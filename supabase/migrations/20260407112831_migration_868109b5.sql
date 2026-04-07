-- Make author_id nullable for demo articles
ALTER TABLE articles ALTER COLUMN author_id DROP NOT NULL;

-- Now insert sample articles
INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, published) VALUES
(
  'Jak vybrat správný odvlhčovač do bytu',
  'jak-vybrat-spravny-odvlhcovac-do-bytu',
  'Průvodce výběrem vhodného odvlhčovače pro váš domov. Seznamte se s typy a parametry.',
  '<p>Výběr správného odvlhčovače je klíčový pro efektivní odstranění vlhkosti z vašeho bytu. V tomto článku se podíváme na jednotlivé typy odvlhčovačů a jejich využití.</p><h2>Typy odvlhčovačů</h2><p><strong>Kondenzační odvlhčovače</strong> - nejvhodnější pro byty a menší prostory. Fungují na principu kondenzace vlhkosti ze vzduchu.</p><p><strong>Absorpční odvlhčovače</strong> - ideální pro garáže a sklepy, kde je nižší teplota.</p><h2>Na co se zaměřit při výběru</h2><ul><li>Velikost místnosti a výkon odvlhčovače</li><li>Energetická náročnost</li><li>Hlučnost provozu</li><li>Objem nádoby na vodu</li></ul>',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=675&fit=crop',
  (SELECT id FROM categories WHERE slug = 'odvlhcovani' LIMIT 1),
  true
),
(
  'Prevence plísní v bytě - kompletní průvodce',
  'prevence-plisni-v-byte',
  'Jak předcházet vzniku plísní a udržet si zdravé bydlení. Praktické tipy pro každý domov.',
  '<p>Plísně v bytě nejsou jen estetický problém, ale hlavně zdravotní riziko. Prevence je vždy lepší než následné odstraňování.</p><h2>Hlavní příčiny vzniku plísní</h2><p>Plísně vznikají při kombinaci vysoké vlhkosti a nedostatečného větrání. Typické místa jsou:</p><ul><li>Koupelny a WC</li><li>Kuchyně</li><li>Rohy místností</li><li>Prostory za nábytkem</li></ul><h2>Efektivní prevence</h2><p><strong>Pravidelné větrání</strong> - minimálně 2x denně po dobu 10-15 minut.</p><p><strong>Kontrola vlhkosti</strong> - ideální vlhkost je mezi 40-60%.</p><p><strong>Odvlhčování</strong> - v problematických prostorech použijte odvlhčovač.</p>',
  'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=1200&h=675&fit=crop',
  (SELECT id FROM categories WHERE slug = 'prevence-plisni' LIMIT 1),
  true
),
(
  '5 nejčastějších chyb při odvlhčování',
  '5-nejcastejsich-chyb-pri-odvlhcovani',
  'Vyhněte se těmto chybám a zefektivněte boj s vlhkostí ve vašem domově.',
  '<p>Mnoho lidí při odvlhčování dělá běžné chyby, které snižují efektivitu celého procesu. Pojďme si je projít.</p><h2>Chyba #1: Nedostatečná velikost odvlhčovače</h2><p>Malý odvlhčovač v velké místnosti jednoduše nestíhá. Vždy kontrolujte doporučenou velikost prostoru.</p><h2>Chyba #2: Špatné umístění</h2><p>Odvlhčovač potřebuje prostor kolem sebe pro správnou cirkulaci vzduchu. Nenechávejte ho v rohu nebo za nábytkem.</p><h2>Chyba #3: Zanedbání údržby</h2><p>Pravidelně čistěte filtry a vyprazdňujte nádobu na vodu. Zanedbaná údržba snižuje výkon až o 50%.</p><h2>Chyba #4: Neuzavřené dveře a okna</h2><p>Při provozu odvlhčovače zavřete okna a dveře, jinak odvlhčujete celou ulici.</p><h2>Chyba #5: Ignorování příčiny vlhkosti</h2><p>Odvlhčovač řeší symptom, ne příčinu. Najděte zdroj vlhkosti a odstraňte ho.</p>',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=675&fit=crop',
  (SELECT id FROM categories WHERE slug = 'tipy-a-rady' LIMIT 1),
  true
)
ON CONFLICT DO NOTHING;