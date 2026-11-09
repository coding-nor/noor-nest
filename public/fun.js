/* Noor Nest: fun content (stickers, pet shop, prophet stories) in English, French and Arabic.
   Stories are short and child-friendly, based on the Quran. Prophets are never drawn: pictures show only places and things. */
window.FUN_CAT = {
  stickers: [
    { id: 'first', e: '🌱' }, { id: 'ay5', e: '📖' }, { id: 'ay15', e: '🏅' }, { id: 'st10', e: '⭐' }, { id: 'st50', e: '🌟' }, { id: 'st100', e: '💫' },
    { id: 'str3', e: '🔥' }, { id: 'str7', e: '🚀' }, { id: 'wudu', e: '💧' }, { id: 'salah', e: '🕌' }, { id: 'pg', e: '🏆' },
    { id: 's1', e: '📚' }, { id: 's3', e: '🎓' }, { id: 'sall', e: '👑' }, { id: 'g1', e: '🎯' }, { id: 'g2', e: '🧠' }, { id: 'shop', e: '🛍️' }, { id: 'deed', e: '🤝' },
    { id: 'camel', e: '🐪', c: 1 }, { id: 'sheep', e: '🐑', c: 1 }, { id: 'whale', e: '🐋', c: 1 }, { id: 'dove', e: '🕊️', c: 1 }, { id: 'eleph', e: '🐘', c: 1 }, { id: 'bee', e: '🐝', c: 1 },
    { id: 'butt', e: '🦋', c: 1 }, { id: 'rainb', e: '🌈', c: 1 }, { id: 'turtle', e: '🐢', c: 1 }, { id: 'fish', e: '🐠', c: 1 }, { id: 'lion', e: '🦁', c: 1 }, { id: 'sunfl', e: '🌻', c: 1 },
    { id: 'palm', e: '🌴', c: 1 }, { id: 'honey', e: '🍯', c: 1 }
  ],
  items: [
    { id: 'kufi', cat: 'hat', cost: 5, e: '🧢' }, { id: 'party', cat: 'hat', cost: 8, e: '🎉' }, { id: 'flowers', cat: 'hat', cost: 10, e: '🌸' },
    { id: 'bow', cat: 'neck', cost: 6, e: '🎀' }, { id: 'starn', cat: 'neck', cost: 8, e: '⭐' },
    { id: 'sky', cat: 'bg', cost: 6, e: '☁️' }, { id: 'garden', cat: 'bg', cost: 10, e: '🌳' }, { id: 'night', cat: 'bg', cost: 12, e: '🌙' }
  ],
  stories: [
    { id: 'adam', e: '🌍', sc: ['🌍', '🌳', '🍎', '😔', '🤲'] },
    { id: 'nuh', e: '🚢', sc: ['🌳', '🔨', '🌧️', '🚢', '⛰️'] },
    { id: 'ibrahim', e: '🔥', sc: ['⭐', '🗿', '🔥', '🌹', '🕋'] },
    { id: 'yusuf', e: '🌙', sc: ['🌙', '🕳️', '🐪', '🌾', '🤗'] },
    { id: 'musa', e: '🌊', sc: ['🧺', '🏜️', '🔥', '🐍', '🌊'] },
    { id: 'yunus', e: '🐋', sc: ['🏙️', '⛈️', '🐋', '🌿', '🏘️'] }
  ],
  quotes: { yunus: { 2: 'لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ ٱلظَّالِمِينَ' } }
};

window.FUN_TXT = {
  en: {
    ui: {
      nStories: 'Stories', nPlay: 'Play', storiesTitle: 'Stories of the prophets', storiesSub: 'Short stories from the Quran. Tap one and Noor reads it to you.',
      read: 'Read', page: 'Page {i} of {n}', next: 'Next', back: 'Back', end: 'The end', learn: 'What we learn', finish: 'Finish', again: 'Read again', storyDone: 'Story finished! +{n} ⭐', source: 'From the Quran',
      peace: 'Prophets are never drawn, out of respect. Peace be upon them all.',
      playTitle: 'Play and collect', cCatch: 'Word catch', cCatchD: 'Tap the falling words in the right order', cMemo: 'Memory match', cMemoD: 'Match each picture with its name',
      cStick: 'Sticker book', cStickD: '{n} of {m} collected', cShop: 'Dress Noor', cShopD: 'Spend your stars on hats and more',
      chest: 'Daily chest', chestOpen: 'Tap to open!', chestWait: 'Come back tomorrow for a new surprise', chestReady: 'A surprise is waiting for you!', chestStars: 'You found {n} ⭐', chestStk: 'New sticker!', chestItem: 'A free gift for Noor:',
      stars: 'You have {n} ⭐ to spend', buy: 'Buy', wear: 'Wear', off: 'Take off', owned: 'Yours', need: 'Not enough stars yet', bought: 'New look!',
      catchPrompt: 'Tap the words in the right order', catchWin: 'Well done! You caught them all!', memoPrompt: 'Find the pairs', moves: '{n} tries', memoWin: 'You found every pair!', play: 'Play again', bonus: '+1 ⭐ for the first win today',
      locked: 'Locked', fromChest: 'Comes from the daily chest', newStk: 'New sticker!', close: 'Close',
      deedsTitle: 'Good deeds today', deedsNote: 'A grown-up taps when the child did it. Each one gives +1 ⭐ once a day.', deedDone: 'Done',
      d_wudu: 'Made wudu', d_pray: 'Prayed', d_help: 'Helped at home', d_quran: 'Read or listened to Quran', d_kind: 'Was kind to someone', deedStar: 'Mashallah! +1 ⭐',
      homeChest: '🎁 Daily chest', homeDress: '👗 Dress Noor'
    },
    stk: { first: 'First ayah', ay5: '5 ayahs', ay15: '15 ayahs', st10: '10 stars', st50: '50 stars', st100: '100 stars', str3: '3 days in a row', str7: '7 days in a row', wudu: 'Wudu learner', salah: 'Salah learner', pg: 'Prayer game star', s1: 'First story', s3: '3 stories', sall: 'All stories', g1: 'Word catcher', g2: 'Memory master', shop: 'First outfit', deed: 'Helper',
      camel: 'Camel', sheep: 'Sheep', whale: 'Whale', dove: 'Dove', eleph: 'Elephant', bee: 'Bee', butt: 'Butterfly', rainb: 'Rainbow', turtle: 'Turtle', fish: 'Fish', lion: 'Lion', sunfl: 'Sunflower', palm: 'Palm tree', honey: 'Honey' },
    hint: { first: 'Learn your first ayah', ay5: 'Learn 5 ayahs', ay15: 'Learn 15 ayahs', st10: 'Earn 10 stars', st50: 'Earn 50 stars', st100: 'Earn 100 stars', str3: 'Practise 3 days in a row', str7: 'Practise 7 days in a row', wudu: 'Finish Learn wudu', salah: 'Finish Learn salah', pg: 'Get 3 stars in a prayer game', s1: 'Read a story', s3: 'Read 3 stories', sall: 'Read every story', g1: 'Win Word catch', g2: 'Win Memory match', shop: 'Buy something for Noor', deed: 'Do 5 good deeds' },
    cat: { hat: 'Hats', neck: 'Neck', bg: 'Backgrounds' },
    item: { kufi: 'White cap', party: 'Party hat', flowers: 'Flower crown', bow: 'Bow tie', starn: 'Star necklace', sky: 'Sunny sky', garden: 'Garden', night: 'Starry night' },
    st: {
      adam: { t: 'Adam and Hawwa', ref: 'Surah Al-Baqarah and Al-A\'raf', pages: [
        'Allah made the first human, Adam (peace be upon him), from clay. Allah taught him the names of everything.',
        'Allah asked the angels to honour Adam, and they did. But Iblis was too proud and said no.',
        'Adam and his wife Hawwa lived happily in Paradise. Allah told them: enjoy everything, but do not go near one tree.',
        'Iblis whispered to them, and they forgot the rule and ate from the tree. They felt very sorry.',
        'Adam and Hawwa asked Allah to forgive them. Allah forgave them, because He is the Most Forgiving.'], moral: 'Everyone makes mistakes. When we say sorry to Allah, He forgives us.' },
      nuh: { t: 'Nuh and the big ship', ref: 'Surah Hud and Surah Nuh', pages: [
        'Nuh (peace be upon him) called his people to worship Allah alone. He kept calling for a very long time, but only a few listened.',
        'Allah told Nuh to build a big ship. His people laughed at him, but Nuh kept building.',
        'Then heavy rain came and water gushed out of the ground. Nuh took the believers and two of every animal on board.',
        'The ship sailed safely over waves as high as mountains. Allah kept everyone on board safe.',
        'When the water went down, the ship rested on a mountain. Nuh and the believers thanked Allah.'], moral: 'Be patient and trust Allah, even when others laugh at you.' },
      ibrahim: { t: 'Ibrahim and the fire', ref: 'Surah Al-Anbiya and Al-Baqarah', pages: [
        'Ibrahim (peace be upon him) looked at the stars, the moon and the sun. He understood that only Allah, who made them, is worth worshipping.',
        'His people worshipped statues. Ibrahim asked them: can these statues hear you or help you?',
        'They were angry and made a huge fire. But Allah said: "O fire, be cool and safe for Ibrahim."',
        'The fire did not burn Ibrahim at all. Allah protected him.',
        'Later, Ibrahim and his son Ismail built the Kaaba in Makkah, the house where Muslims pray towards.'], moral: 'Be brave and say what is true. Allah protects those who trust Him.' },
      yusuf: { t: 'Yusuf and his dream', ref: 'Surah Yusuf', pages: [
        'Yusuf (peace be upon him) had a dream: eleven stars, the sun and the moon bowed to him. His father Yaqub told him to keep it secret.',
        'Yusuf\'s brothers were jealous and threw him into a well. Yaqub cried, but he stayed patient and trusted Allah.',
        'A caravan of travellers found Yusuf and took him to Egypt.',
        'After many years of patience, even in prison, Yusuf became a trusted minister. He saved the people from a long hunger.',
        'His family came to him. Yusuf forgave his brothers and hugged them. His dream had come true.'], moral: 'Patience and forgiveness bring happiness in the end.' },
      musa: { t: 'Musa and the sea', ref: 'Surah Al-Qasas and Ta-Ha', pages: [
        'When Musa (peace be upon him) was a baby, his mother trusted Allah and placed him in a basket on the river. Allah kept him safe and brought him back to her.',
        'When Musa grew up he went to the land of Madyan and worked as a shepherd.',
        'One night he saw a fire near a mountain. There, Allah spoke to him and chose him as a prophet.',
        'Allah gave Musa signs, like his staff turning into a snake. Musa and his brother Harun went to the Pharaoh to call him to Allah.',
        'Allah split the sea for Musa and his people. They walked across safely.'], moral: 'Allah takes care of everyone who trusts Him.' },
      yunus: { t: 'Yunus and the whale', ref: 'Surah Al-Anbiya and As-Saffat', pages: [
        'Yunus (peace be upon him) was sent to a big city. The people did not listen to him, so he left before Allah told him to go.',
        'A big storm hit the ship he was on. Yunus went into the sea, and a great whale swallowed him.',
        'It was dark inside the whale, the sea and the night. Yunus called out to Allah and said sorry with a special dua.',
        'Allah answered him. The whale left him on the shore, and Allah made a plant grow to shade him.',
        'Yunus went back to his city and the people had believed. Allah is always near when we call Him.'], moral: 'Allah hears us, even in the darkest place. We can always say sorry and ask for help.' }
    }
  },
  fr: {
    ui: {
      nStories: 'Histoires', nPlay: 'Jouer', storiesTitle: 'Histoires des prophètes', storiesSub: 'Courtes histoires du Coran. Touche-en une et Noor te la lit.',
      read: 'Lire', page: 'Page {i} sur {n}', next: 'Suivant', back: 'Retour', end: 'Fin', learn: 'Ce que l\'on retient', finish: 'Terminer', again: 'Relire', storyDone: 'Histoire terminée ! +{n} ⭐', source: 'Tiré du Coran',
      peace: 'Par respect, les prophètes ne sont jamais dessinés. Que la paix soit sur eux tous.',
      playTitle: 'Jouer et collectionner', cCatch: 'Attrape-mots', cCatchD: 'Touche les mots qui tombent dans le bon ordre', cMemo: 'Jeu de mémoire', cMemoD: 'Associe chaque image à son nom',
      cStick: 'Livre d\'autocollants', cStickD: '{n} sur {m} collectés', cShop: 'Habiller Noor', cShopD: 'Dépense tes étoiles en chapeaux et plus',
      chest: 'Coffre du jour', chestOpen: 'Touche pour ouvrir !', chestWait: 'Reviens demain pour une nouvelle surprise', chestReady: 'Une surprise t\'attend !', chestStars: 'Tu as trouvé {n} ⭐', chestStk: 'Nouvel autocollant !', chestItem: 'Un cadeau pour Noor :',
      stars: 'Tu as {n} ⭐ à dépenser', buy: 'Acheter', wear: 'Mettre', off: 'Enlever', owned: 'À toi', need: 'Pas assez d\'étoiles', bought: 'Nouveau look !',
      catchPrompt: 'Touche les mots dans le bon ordre', catchWin: 'Bravo ! Tu les as tous attrapés !', memoPrompt: 'Trouve les paires', moves: '{n} essais', memoWin: 'Tu as trouvé toutes les paires !', play: 'Rejouer', bonus: '+1 ⭐ pour la première victoire du jour',
      locked: 'Verrouillé', fromChest: 'Vient du coffre du jour', newStk: 'Nouvel autocollant !', close: 'Fermer',
      deedsTitle: 'Bonnes actions du jour', deedsNote: 'Un adulte touche quand l\'enfant l\'a fait. Chacune donne +1 ⭐ une fois par jour.', deedDone: 'Fait',
      d_wudu: 'A fait ses ablutions', d_pray: 'A prié', d_help: 'A aidé à la maison', d_quran: 'A lu ou écouté le Coran', d_kind: 'A été gentil avec quelqu\'un', deedStar: 'Machaallah ! +1 ⭐',
      homeChest: '🎁 Coffre du jour', homeDress: '👗 Habiller Noor'
    },
    stk: { first: 'Premier verset', ay5: '5 versets', ay15: '15 versets', st10: '10 étoiles', st50: '50 étoiles', st100: '100 étoiles', str3: '3 jours de suite', str7: '7 jours de suite', wudu: 'Expert des ablutions', salah: 'Expert de la prière', pg: 'Star des jeux de prière', s1: 'Première histoire', s3: '3 histoires', sall: 'Toutes les histoires', g1: 'Attrape-mots', g2: 'Maître de la mémoire', shop: 'Première tenue', deed: 'Petit aidant',
      camel: 'Chameau', sheep: 'Mouton', whale: 'Baleine', dove: 'Colombe', eleph: 'Éléphant', bee: 'Abeille', butt: 'Papillon', rainb: 'Arc-en-ciel', turtle: 'Tortue', fish: 'Poisson', lion: 'Lion', sunfl: 'Tournesol', palm: 'Palmier', honey: 'Miel' },
    hint: { first: 'Apprends ton premier verset', ay5: 'Apprends 5 versets', ay15: 'Apprends 15 versets', st10: 'Gagne 10 étoiles', st50: 'Gagne 50 étoiles', st100: 'Gagne 100 étoiles', str3: 'Pratique 3 jours de suite', str7: 'Pratique 7 jours de suite', wudu: 'Termine Apprendre les ablutions', salah: 'Termine Apprendre la prière', pg: 'Obtiens 3 étoiles à un jeu de prière', s1: 'Lis une histoire', s3: 'Lis 3 histoires', sall: 'Lis toutes les histoires', g1: 'Gagne Attrape-mots', g2: 'Gagne le jeu de mémoire', shop: 'Achète quelque chose pour Noor', deed: 'Fais 5 bonnes actions' },
    cat: { hat: 'Chapeaux', neck: 'Cou', bg: 'Décors' },
    item: { kufi: 'Calotte blanche', party: 'Chapeau de fête', flowers: 'Couronne de fleurs', bow: 'Nœud papillon', starn: 'Collier étoile', sky: 'Ciel ensoleillé', garden: 'Jardin', night: 'Nuit étoilée' },
    st: {
      adam: { t: 'Adam et Hawwa', ref: 'Sourate Al-Baqara et Al-A\'raf', pages: [
        'Allah a créé le premier être humain, Adam (paix sur lui), à partir d\'argile. Allah lui a appris le nom de toutes choses.',
        'Allah a demandé aux anges d\'honorer Adam, et ils l\'ont fait. Mais Iblis était trop orgueilleux et a refusé.',
        'Adam et son épouse Hawwa vivaient heureux au Paradis. Allah leur a dit : profitez de tout, mais ne vous approchez pas d\'un seul arbre.',
        'Iblis leur a soufflé des idées, et ils ont oublié la règle et mangé de l\'arbre. Ils ont eu très honte.',
        'Adam et Hawwa ont demandé pardon à Allah. Allah leur a pardonné, car Il est le Très-Pardonneur.'], moral: 'Tout le monde fait des erreurs. Quand on demande pardon à Allah, Il nous pardonne.' },
      nuh: { t: 'Nouh et le grand bateau', ref: 'Sourate Houd et sourate Nouh', pages: [
        'Nouh (paix sur lui) appelait son peuple à adorer Allah seul. Il a appelé très longtemps, mais très peu l\'ont écouté.',
        'Allah a dit à Nouh de construire un grand bateau. Son peuple se moquait de lui, mais Nouh a continué.',
        'Puis une forte pluie est tombée et l\'eau a jailli de la terre. Nouh a embarqué les croyants et un couple de chaque animal.',
        'Le bateau a navigué en sécurité sur des vagues hautes comme des montagnes. Allah a protégé tous ceux qui étaient à bord.',
        'Quand l\'eau a baissé, le bateau s\'est posé sur une montagne. Nouh et les croyants ont remercié Allah.'], moral: 'Sois patient et fais confiance à Allah, même quand les autres se moquent de toi.' },
      ibrahim: { t: 'Ibrahim et le feu', ref: 'Sourate Al-Anbiya et Al-Baqara', pages: [
        'Ibrahim (paix sur lui) regardait les étoiles, la lune et le soleil. Il a compris que seul Allah, qui les a créés, mérite d\'être adoré.',
        'Son peuple adorait des statues. Ibrahim leur a demandé : ces statues peuvent-elles vous entendre ou vous aider ?',
        'Ils se sont mis en colère et ont allumé un immense feu. Mais Allah a dit : « Ô feu, sois fraîcheur et paix pour Ibrahim. »',
        'Le feu n\'a pas du tout brûlé Ibrahim. Allah l\'a protégé.',
        'Plus tard, Ibrahim et son fils Ismaïl ont construit la Kaaba à La Mecque, vers laquelle les musulmans prient.'], moral: 'Sois courageux et dis la vérité. Allah protège ceux qui lui font confiance.' },
      yusuf: { t: 'Youssouf et son rêve', ref: 'Sourate Youssouf', pages: [
        'Youssouf (paix sur lui) a fait un rêve : onze étoiles, le soleil et la lune se prosternaient devant lui. Son père Yaqoub lui a dit de garder le secret.',
        'Les frères de Youssouf étaient jaloux et l\'ont jeté dans un puits. Yaqoub a pleuré, mais il est resté patient et a fait confiance à Allah.',
        'Une caravane de voyageurs a trouvé Youssouf et l\'a emmené en Égypte.',
        'Après de longues années de patience, même en prison, Youssouf est devenu un ministre de confiance. Il a sauvé les gens d\'une longue famine.',
        'Sa famille est venue le voir. Youssouf a pardonné à ses frères et les a embrassés. Son rêve s\'était réalisé.'], moral: 'La patience et le pardon apportent le bonheur à la fin.' },
      musa: { t: 'Moussa et la mer', ref: 'Sourate Al-Qasas et Ta-Ha', pages: [
        'Quand Moussa (paix sur lui) était bébé, sa mère a fait confiance à Allah et l\'a déposé dans un panier sur le fleuve. Allah l\'a protégé et l\'a rendu à sa mère.',
        'Devenu grand, Moussa est parti au pays de Madyan et il est devenu berger.',
        'Une nuit, il a vu un feu près d\'une montagne. Là, Allah lui a parlé et l\'a choisi comme prophète.',
        'Allah a donné à Moussa des signes, comme son bâton qui se transformait en serpent. Moussa et son frère Haroun sont allés voir Pharaon pour l\'appeler à Allah.',
        'Allah a fendu la mer pour Moussa et son peuple. Ils l\'ont traversée en sécurité.'], moral: 'Allah prend soin de tous ceux qui lui font confiance.' },
      yunus: { t: 'Younes et la baleine', ref: 'Sourate Al-Anbiya et As-Saffat', pages: [
        'Younes (paix sur lui) a été envoyé dans une grande ville. Les gens ne l\'ont pas écouté, alors il est parti avant qu\'Allah ne lui dise de le faire.',
        'Une grande tempête a frappé le bateau. Younes est tombé dans la mer et une grande baleine l\'a avalé.',
        'Il faisait noir dans la baleine, dans la mer et dans la nuit. Younes a appelé Allah et lui a demandé pardon avec une invocation spéciale.',
        'Allah lui a répondu. La baleine l\'a déposé sur le rivage, et Allah a fait pousser une plante pour lui donner de l\'ombre.',
        'Younes est retourné dans sa ville et les gens avaient cru. Allah est toujours proche quand on l\'appelle.'], moral: 'Allah nous entend, même dans l\'endroit le plus sombre. On peut toujours demander pardon et de l\'aide.' }
    }
  },
  ar: {
    ui: {
      nStories: 'قصص', nPlay: 'العب', storiesTitle: 'قصص الأنبياء', storiesSub: 'قصص قصيرة من القرآن. اضغط على قصة وسيقرؤها لك نور.',
      read: 'اقرأ', page: 'صفحة {i} من {n}', next: 'التالي', back: 'رجوع', end: 'النهاية', learn: 'ماذا نتعلم', finish: 'إنهاء', again: 'اقرأ مرة أخرى', storyDone: 'انتهت القصة! +{n} ⭐', source: 'من القرآن الكريم',
      peace: 'لا نرسم الأنبياء احتراماً لهم. عليهم جميعاً السلام.',
      playTitle: 'العب واجمع', cCatch: 'صيد الكلمات', cCatchD: 'اضغط على الكلمات الساقطة بالترتيب الصحيح', cMemo: 'لعبة الذاكرة', cMemoD: 'اجمع كل صورة مع اسمها',
      cStick: 'دفتر الملصقات', cStickD: 'جمعت {n} من {m}', cShop: 'ألبس نور', cShopD: 'اصرف نجومك على القبعات وغيرها',
      chest: 'صندوق اليوم', chestOpen: 'اضغط لتفتح!', chestWait: 'عد غداً لمفاجأة جديدة', chestReady: 'مفاجأة تنتظرك!', chestStars: 'وجدت {n} ⭐', chestStk: 'ملصق جديد!', chestItem: 'هدية لنور:',
      stars: 'لديك {n} ⭐ لتصرفها', buy: 'اشتر', wear: 'البس', off: 'اخلع', owned: 'لك', need: 'نجومك لا تكفي', bought: 'مظهر جديد!',
      catchPrompt: 'اضغط على الكلمات بالترتيب الصحيح', catchWin: 'أحسنت! صدت كل الكلمات!', memoPrompt: 'جد الأزواج', moves: '{n} محاولات', memoWin: 'وجدت كل الأزواج!', play: 'العب مرة أخرى', bonus: '+1 ⭐ لأول فوز اليوم',
      locked: 'مقفل', fromChest: 'يأتي من صندوق اليوم', newStk: 'ملصق جديد!', close: 'إغلاق',
      deedsTitle: 'أعمال طيبة اليوم', deedsNote: 'يضغط الكبير عندما يفعلها الطفل. كل عمل يعطي +1 ⭐ مرة في اليوم.', deedDone: 'تم',
      d_wudu: 'توضأ', d_pray: 'صلى', d_help: 'ساعد في البيت', d_quran: 'قرأ القرآن أو استمع إليه', d_kind: 'كان لطيفاً مع أحد', deedStar: 'ما شاء الله! +1 ⭐',
      homeChest: '🎁 صندوق اليوم', homeDress: '👗 ألبس نور'
    },
    stk: { first: 'أول آية', ay5: '٥ آيات', ay15: '١٥ آية', st10: '١٠ نجوم', st50: '٥٠ نجمة', st100: '١٠٠ نجمة', str3: '٣ أيام متتالية', str7: '٧ أيام متتالية', wudu: 'خبير الوضوء', salah: 'خبير الصلاة', pg: 'نجم ألعاب الصلاة', s1: 'أول قصة', s3: '٣ قصص', sall: 'كل القصص', g1: 'صياد الكلمات', g2: 'بطل الذاكرة', shop: 'أول لباس', deed: 'مساعد',
      camel: 'جمل', sheep: 'خروف', whale: 'حوت', dove: 'حمامة', eleph: 'فيل', bee: 'نحلة', butt: 'فراشة', rainb: 'قوس قزح', turtle: 'سلحفاة', fish: 'سمكة', lion: 'أسد', sunfl: 'دوار الشمس', palm: 'نخلة', honey: 'عسل' },
    hint: { first: 'تعلم أول آية', ay5: 'تعلم ٥ آيات', ay15: 'تعلم ١٥ آية', st10: 'اكسب ١٠ نجوم', st50: 'اكسب ٥٠ نجمة', st100: 'اكسب ١٠٠ نجمة', str3: 'تدرب ٣ أيام متتالية', str7: 'تدرب ٧ أيام متتالية', wudu: 'أنهِ تعلم الوضوء', salah: 'أنهِ تعلم الصلاة', pg: 'احصل على ٣ نجوم في لعبة صلاة', s1: 'اقرأ قصة', s3: 'اقرأ ٣ قصص', sall: 'اقرأ كل القصص', g1: 'افز بلعبة صيد الكلمات', g2: 'افز بلعبة الذاكرة', shop: 'اشتر شيئاً لنور', deed: 'افعل ٥ أعمال طيبة' },
    cat: { hat: 'قبعات', neck: 'العنق', bg: 'خلفيات' },
    item: { kufi: 'طاقية بيضاء', party: 'قبعة حفلة', flowers: 'تاج زهور', bow: 'ربطة فراشة', starn: 'عقد نجمة', sky: 'سماء مشمسة', garden: 'حديقة', night: 'ليلة مرصعة بالنجوم' },
    st: {
      adam: { t: 'آدم وحواء', ref: 'سورة البقرة وسورة الأعراف', pages: [
        'خلق الله أول إنسان، آدم عليه السلام، من طين، وعلّمه أسماء كل شيء.',
        'أمر الله الملائكة أن تكرم آدم فأكرمته، لكن إبليس تكبّر ورفض.',
        'عاش آدم وزوجته حواء سعيدين في الجنة. قال الله لهما: كلا من كل شيء، لكن لا تقربا هذه الشجرة.',
        'وسوس لهما إبليس، فنسيا الأمر وأكلا من الشجرة، ثم شعرا بالندم الشديد.',
        'طلب آدم وحواء المغفرة من الله فغفر لهما، لأنه هو الغفور الرحيم.'], moral: 'كلنا نخطئ. وعندما نعتذر إلى الله فإنه يغفر لنا.' },
      nuh: { t: 'نوح والسفينة الكبيرة', ref: 'سورة هود وسورة نوح', pages: [
        'دعا نوح عليه السلام قومه إلى عبادة الله وحده. دعاهم وقتاً طويلاً جداً، لكن قليلين فقط آمنوا.',
        'أمر الله نوحاً أن يبني سفينة كبيرة. سخر منه قومه، لكن نوحاً واصل البناء.',
        'ثم نزل مطر غزير وفار الماء من الأرض. حمل نوح المؤمنين وزوجين من كل حيوان.',
        'سارت السفينة بسلام فوق أمواج كالجبال، وحفظ الله كل من فيها.',
        'وعندما نزل الماء استقرت السفينة على جبل. وشكر نوح والمؤمنون الله.'], moral: 'اصبر وتوكل على الله، حتى لو سخر منك الآخرون.' },
      ibrahim: { t: 'إبراهيم والنار', ref: 'سورة الأنبياء وسورة البقرة', pages: [
        'نظر إبراهيم عليه السلام إلى النجوم والقمر والشمس، وفهم أن الله وحده الذي خلقها هو الذي يستحق العبادة.',
        'كان قومه يعبدون الأصنام. فسألهم إبراهيم: هل تسمعكم هذه الأصنام أو تساعدكم؟',
        'غضبوا وأشعلوا ناراً عظيمة. لكن الله قال: يا نار كوني برداً وسلاماً على إبراهيم.',
        'ولم تحرق النار إبراهيم أبداً. لقد حفظه الله.',
        'وبعد ذلك بنى إبراهيم وابنه إسماعيل الكعبة في مكة، التي يتجه إليها المسلمون في صلاتهم.'], moral: 'كن شجاعاً وقل الحق. والله يحمي من يتوكل عليه.' },
      yusuf: { t: 'يوسف وحلمه', ref: 'سورة يوسف', pages: [
        'رأى يوسف عليه السلام حلماً: أحد عشر كوكباً والشمس والقمر يسجدون له. قال له أبوه يعقوب أن يحتفظ بالسر.',
        'حسده إخوته وألقوه في البئر. بكى يعقوب لكنه صبر وتوكل على الله.',
        'وجدت قافلة من المسافرين يوسف وأخذته إلى مصر.',
        'وبعد سنوات من الصبر، حتى في السجن، أصبح يوسف وزيراً أميناً، وأنقذ الناس من جوع طويل.',
        'جاءت عائلته إليه، فسامح يوسف إخوته وعانقهم. وتحقق حلمه.'], moral: 'الصبر والعفو يجلبان السعادة في النهاية.' },
      musa: { t: 'موسى والبحر', ref: 'سورة القصص وسورة طه', pages: [
        'عندما كان موسى عليه السلام رضيعاً، وثقت أمه بالله ووضعته في صندوق في النهر. حفظه الله وأعاده إلى أمه.',
        'وعندما كبر موسى ذهب إلى أرض مدين وعمل راعياً للغنم.',
        'في ليلة رأى ناراً قرب جبل. هناك كلمه الله واختاره نبياً.',
        'أعطى الله موسى آيات، مثل عصاه التي تحولت إلى حية. وذهب موسى وأخوه هارون إلى فرعون ليدعوه إلى الله.',
        'شقّ الله البحر لموسى وقومه، فعبروا بسلام.'], moral: 'الله يرعى كل من يتوكل عليه.' },
      yunus: { t: 'يونس والحوت', ref: 'سورة الأنبياء وسورة الصافات', pages: [
        'أُرسل يونس عليه السلام إلى مدينة كبيرة. لم يسمعه الناس، فغادر قبل أن يأذن له الله.',
        'هبّت عاصفة كبيرة على السفينة. سقط يونس في البحر فابتلعه حوت عظيم.',
        'كان الظلام في بطن الحوت وفي البحر وفي الليل. فنادى يونس ربه واعتذر بدعاء خاص.',
        'استجاب الله له. ألقاه الحوت على الشاطئ، وأنبت الله له شجرة تظله.',
        'رجع يونس إلى مدينته فوجد الناس قد آمنوا. والله قريب دائماً عندما ندعوه.'], moral: 'الله يسمعنا حتى في أشد الأماكن ظلمة. نستطيع دائماً أن نعتذر ونطلب العون.' }
    }
  }
};
