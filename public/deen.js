/* Prayer corner texts (wudu, salah, prayer times) in English, French and Arabic. Plain data, no code. */
window.DEEN_TXT = {
  en: {
    ui: { nPray: 'Pray', title: 'Prayer corner', sub: 'Learn wudu and salah with games.', note: 'Ask a parent or teacher to show you. Families may do small things a little differently.',
      learnWudu: 'Learn wudu', gameWudu: 'Wudu game', learnSalah: 'Learn salah', gameSalah: 'Salah game', gameRakat: 'How many rakats?', gameTimes: 'Five prayers in order',
      descWudu: 'The 8 steps of washing for prayer', descSalah: 'One rakat, step by step', descRakat: 'Match each prayer to its rakats', descTimes: 'From dawn to night',
      next: 'Next', prev: 'Back', done: 'Done', again: 'Play again', playGame: 'Play the game', stepOf: 'Step {i} of {n}', rakats: 'rakats', rakat1: 'rakat',
      order: 'Tap the steps in the right order', orderTimes: 'Tap the prayers from dawn to night', rakatQ: 'How many rakats is {p}?', round: 'Question {i} of {n}', wellDone: 'Well done!', tryAgain: 'Try again!', gained: '+{n} new stars!', noNew: 'You already have the best score here.',
      wuduEnd: 'After wudu, we say:', wuduEndEn: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger.', learnedAll: 'You know it! Now try the game.', pose: 'Drawing of a person praying', saySo: 'Say it with a parent:' },
    wudu: [
      { ic: '💧', t: 'Start with Bismillah', d: 'Make the intention in your heart and say Bismillah.', ar: 'بِسْمِ ٱللَّهِ' },
      { ic: '🤲', t: 'Wash your hands', d: 'Wash both hands up to the wrists, 3 times. Rub between your fingers.' },
      { ic: '👄', t: 'Rinse your mouth', d: 'Take water into your mouth, swish it around and spit it out. Do it 3 times.' },
      { ic: '👃', t: 'Clean your nose', d: 'Sniff a little water into your nose and blow it out gently. 3 times.' },
      { ic: '🙂', t: 'Wash your face', d: 'Wash your whole face, ear to ear and forehead to chin. 3 times.' },
      { ic: '💪', t: 'Wash your arms', d: 'Wash your right arm up to the elbow, then your left arm. 3 times each.' },
      { ic: '💆', t: 'Wipe your head', d: 'Wet your hands and wipe over your head once. Then wipe your ears.' },
      { ic: '🦶', t: 'Wash your feet', d: 'Wash your right foot up to the ankle, then your left. Rub between your toes. 3 times each.' }
    ],
    salah: [
      { pose: 'takbir', t: 'Takbir', d: 'Stand facing the Qibla. Raise your hands and say Allahu Akbar.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'qiyam', t: 'Stand', d: 'Stand with your hands folded. Say Al-Fatiha and another surah.', ar: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ' },
      { pose: 'ruku', t: 'Bow (ruku)', d: 'Say Allahu Akbar and bow. Hands on your knees, back straight. Say Subhana Rabbiyal Azeem.', ar: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ' },
      { pose: 'qiyam', t: 'Stand up', d: 'Rise saying Sami’a Allahu liman hamidah, then Rabbana wa lakal hamd.', ar: 'سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ' },
      { pose: 'sujud', t: 'Prostrate (sujud)', d: 'Say Allahu Akbar and go down. Forehead, nose, hands, knees and toes touch the floor. Say Subhana Rabbiyal A’la.', ar: 'سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ' },
      { pose: 'sit', t: 'Sit up', d: 'Sit up calmly and say Rabbighfir li: My Lord, forgive me.', ar: 'رَبِّ ٱغْفِرْ لِي' },
      { pose: 'sujud', t: 'Prostrate again', d: 'Say Allahu Akbar and prostrate once more. Then stand for the next rakat, or sit for the Tashahhud if it is the last.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'sit', t: 'The end', d: 'After the last rakat, sit and say the Tashahhud. Then turn right and left saying Assalamu alaykum wa rahmatullah.', ar: 'ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ' }
    ],
    times: [
      { ic: '🌅', n: 'Fajr', ar: 'الفجر', d: 'Before sunrise', r: 2 },
      { ic: '☀️', n: 'Dhuhr', ar: 'الظهر', d: 'After the sun passes the middle of the sky', r: 4 },
      { ic: '🌤️', n: 'Asr', ar: 'العصر', d: 'In the afternoon', r: 4 },
      { ic: '🌇', n: 'Maghrib', ar: 'المغرب', d: 'Just after sunset', r: 3 },
      { ic: '🌙', n: 'Isha', ar: 'العشاء', d: 'When the night is dark', r: 4 }
    ]
  },
  fr: {
    ui: { nPray: 'Prière', title: 'Coin de la prière', sub: 'Apprends le woudou et la salat avec des jeux.', note: 'Demande à un parent ou à un enseignant de te montrer. Les familles peuvent faire de petites choses un peu différemment.',
      learnWudu: 'Apprendre le woudou', gameWudu: 'Jeu du woudou', learnSalah: 'Apprendre la salat', gameSalah: 'Jeu de la salat', gameRakat: 'Combien de rak’a ?', gameTimes: 'Les cinq prières dans l’ordre',
      descWudu: 'Les 8 étapes de l’ablution', descSalah: 'Une rak’a, pas à pas', descRakat: 'Associe chaque prière à ses rak’a', descTimes: 'De l’aube à la nuit',
      next: 'Suivant', prev: 'Retour', done: 'Terminé', again: 'Rejouer', playGame: 'Jouer', stepOf: 'Étape {i} sur {n}', rakats: 'rak’a', rakat1: 'rak’a',
      order: 'Touche les étapes dans le bon ordre', orderTimes: 'Touche les prières de l’aube à la nuit', rakatQ: 'Combien de rak’a pour {p} ?', round: 'Question {i} sur {n}', wellDone: 'Bravo !', tryAgain: 'Essaie encore !', gained: '+{n} nouvelles étoiles !', noNew: 'Tu as déjà le meilleur score ici.',
      wuduEnd: 'Après le woudou, on dit :', wuduEndEn: 'J’atteste qu’il n’y a de dieu qu’Allah, seul, sans associé, et j’atteste que Muhammad est Son serviteur et Son messager.', learnedAll: 'Tu sais ! Essaie maintenant le jeu.', pose: 'Dessin d’une personne en prière', saySo: 'Dis-le avec un parent :' },
    wudu: [
      { ic: '💧', t: 'Commence par Bismillah', d: 'Fais l’intention dans ton cœur et dis Bismillah.', ar: 'بِسْمِ ٱللَّهِ' },
      { ic: '🤲', t: 'Lave tes mains', d: 'Lave les deux mains jusqu’aux poignets, 3 fois. Frotte entre les doigts.' },
      { ic: '👄', t: 'Rince ta bouche', d: 'Prends de l’eau dans la bouche, fais-la tourner puis crache. 3 fois.' },
      { ic: '👃', t: 'Nettoie ton nez', d: 'Aspire un peu d’eau par le nez et souffle-la doucement. 3 fois.' },
      { ic: '🙂', t: 'Lave ton visage', d: 'Lave tout le visage, d’une oreille à l’autre et du front au menton. 3 fois.' },
      { ic: '💪', t: 'Lave tes bras', d: 'Lave le bras droit jusqu’au coude, puis le gauche. 3 fois chacun.' },
      { ic: '💆', t: 'Passe la main sur ta tête', d: 'Mouille tes mains et passe-les une fois sur la tête. Puis essuie tes oreilles.' },
      { ic: '🦶', t: 'Lave tes pieds', d: 'Lave le pied droit jusqu’à la cheville, puis le gauche. Frotte entre les orteils. 3 fois chacun.' }
    ],
    salah: [
      { pose: 'takbir', t: 'Takbir', d: 'Tiens-toi face à la Qibla. Lève les mains et dis Allahou akbar.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'qiyam', t: 'Debout', d: 'Reste debout, les mains croisées. Récite Al-Fatiha et une autre sourate.', ar: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ' },
      { pose: 'ruku', t: 'Inclinaison (rouku’)', d: 'Dis Allahou akbar et incline-toi, mains sur les genoux, dos droit. Dis Soubhana Rabbiyal ‘Azim.', ar: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ' },
      { pose: 'qiyam', t: 'Redresse-toi', d: 'Relève-toi en disant Sami’a Allahou liman hamidah, puis Rabbana wa lakal hamd.', ar: 'سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ' },
      { pose: 'sujud', t: 'Prosternation (soujoud)', d: 'Dis Allahou akbar et descends. Front, nez, mains, genoux et orteils touchent le sol. Dis Soubhana Rabbiyal A’la.', ar: 'سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ' },
      { pose: 'sit', t: 'Assieds-toi', d: 'Assieds-toi calmement et dis Rabbighfir li : Seigneur, pardonne-moi.', ar: 'رَبِّ ٱغْفِرْ لِي' },
      { pose: 'sujud', t: 'Deuxième prosternation', d: 'Dis Allahou akbar et prosterne-toi encore. Puis lève-toi pour la rak’a suivante, ou assieds-toi pour le Tachahhoud si c’est la dernière.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'sit', t: 'La fin', d: 'À la dernière rak’a, assieds-toi et dis le Tachahhoud. Puis tourne la tête à droite et à gauche en disant Assalamou ‘alaykoum wa rahmatoullah.', ar: 'ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ' }
    ],
    times: [
      { ic: '🌅', n: 'Fajr', ar: 'الفجر', d: 'Avant le lever du soleil', r: 2 },
      { ic: '☀️', n: 'Dhouhr', ar: 'الظهر', d: 'Quand le soleil a dépassé le milieu du ciel', r: 4 },
      { ic: '🌤️', n: 'Asr', ar: 'العصر', d: 'L’après-midi', r: 4 },
      { ic: '🌇', n: 'Maghrib', ar: 'المغرب', d: 'Juste après le coucher du soleil', r: 3 },
      { ic: '🌙', n: 'Icha', ar: 'العشاء', d: 'Quand la nuit est tombée', r: 4 }
    ]
  },
  ar: {
    ui: { nPray: 'الصلاة', title: 'ركن الصلاة', sub: 'تعلّم الوضوء والصلاة بالألعاب.', note: 'اطلب من أحد والديك أو معلّمك أن يريك. قد تختلف العائلات في أمور صغيرة.',
      learnWudu: 'تعلّم الوضوء', gameWudu: 'لعبة الوضوء', learnSalah: 'تعلّم الصلاة', gameSalah: 'لعبة الصلاة', gameRakat: 'كم ركعة؟', gameTimes: 'الصلوات الخمس بالترتيب',
      descWudu: 'خطوات الوضوء الثماني', descSalah: 'ركعة واحدة خطوة خطوة', descRakat: 'اربط كل صلاة بعدد ركعاتها', descTimes: 'من الفجر إلى الليل',
      next: 'التالي', prev: 'رجوع', done: 'انتهيت', again: 'العب مرة أخرى', playGame: 'العب اللعبة', stepOf: 'الخطوة {i} من {n}', rakats: 'ركعات', rakat1: 'ركعة',
      order: 'المس الخطوات بالترتيب الصحيح', orderTimes: 'المس الصلوات من الفجر إلى الليل', rakatQ: 'كم ركعة في صلاة {p}؟', round: 'السؤال {i} من {n}', wellDone: 'أحسنت!', tryAgain: 'حاول مرة أخرى!', gained: '+{n} نجوم جديدة!', noNew: 'لديك أفضل نتيجة هنا.',
      wuduEnd: 'بعد الوضوء نقول:', wuduEndEn: 'أشهد ألا إله إلا الله وحده لا شريك له، وأشهد أن محمدًا عبده ورسوله.', learnedAll: 'أنت تعرفها! جرّب اللعبة الآن.', pose: 'رسم لشخص يصلي', saySo: 'قلها مع أحد والديك:' },
    wudu: [
      { ic: '💧', t: 'ابدأ بالبسملة', d: 'انوِ بقلبك وقل: بسم الله.', ar: 'بِسْمِ ٱللَّهِ' },
      { ic: '🤲', t: 'اغسل يديك', d: 'اغسل كفّيك إلى الرسغين ثلاث مرات، وخلّل بين الأصابع.' },
      { ic: '👄', t: 'تمضمض', d: 'ضع الماء في فمك وحرّكه ثم أخرجه. ثلاث مرات.' },
      { ic: '👃', t: 'استنشق', d: 'اجذب قليلًا من الماء بأنفك ثم انثره برفق. ثلاث مرات.' },
      { ic: '🙂', t: 'اغسل وجهك', d: 'اغسل وجهك كله، من الأذن إلى الأذن ومن الجبهة إلى الذقن. ثلاث مرات.' },
      { ic: '💪', t: 'اغسل ذراعيك', d: 'اغسل ذراعك اليمنى إلى المرفق ثم اليسرى. ثلاث مرات لكل واحدة.' },
      { ic: '💆', t: 'امسح رأسك', d: 'بلّل يديك وامسح رأسك مرة واحدة. ثم امسح أذنيك.' },
      { ic: '🦶', t: 'اغسل قدميك', d: 'اغسل قدمك اليمنى إلى الكعب ثم اليسرى، وخلّل بين الأصابع. ثلاث مرات لكل واحدة.' }
    ],
    salah: [
      { pose: 'takbir', t: 'التكبير', d: 'قف متجهًا إلى القبلة، وارفع يديك وقل: الله أكبر.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'qiyam', t: 'القيام', d: 'قف وضع يديك على صدرك، واقرأ الفاتحة وسورة.', ar: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ' },
      { pose: 'ruku', t: 'الركوع', d: 'قل الله أكبر وانحنِ، ويداك على ركبتيك وظهرك مستقيم. وقل: سبحان ربي العظيم.', ar: 'سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ' },
      { pose: 'qiyam', t: 'الرفع من الركوع', d: 'ارفع قائلًا: سمع الله لمن حمده، ثم: ربنا ولك الحمد.', ar: 'سَمِعَ ٱللَّهُ لِمَنْ حَمِدَهُ' },
      { pose: 'sujud', t: 'السجود', d: 'قل الله أكبر واسجد. تلمس جبهتك وأنفك ويداك وركبتاك وأصابع قدميك الأرض. وقل: سبحان ربي الأعلى.', ar: 'سُبْحَانَ رَبِّيَ ٱلْأَعْلَىٰ' },
      { pose: 'sit', t: 'الجلوس', d: 'اجلس بهدوء وقل: رب اغفر لي.', ar: 'رَبِّ ٱغْفِرْ لِي' },
      { pose: 'sujud', t: 'السجدة الثانية', d: 'قل الله أكبر واسجد مرة أخرى. ثم قم للركعة التالية، أو اجلس للتشهد إن كانت الأخيرة.', ar: 'ٱللَّهُ أَكْبَرُ' },
      { pose: 'sit', t: 'النهاية', d: 'في الركعة الأخيرة اجلس واقرأ التشهد. ثم سلّم عن يمينك ويسارك: السلام عليكم ورحمة الله.', ar: 'ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ' }
    ],
    times: [
      { ic: '🌅', n: 'الفجر', ar: 'الفجر', d: 'قبل شروق الشمس', r: 2 },
      { ic: '☀️', n: 'الظهر', ar: 'الظهر', d: 'بعد زوال الشمس عن وسط السماء', r: 4 },
      { ic: '🌤️', n: 'العصر', ar: 'العصر', d: 'بعد الظهر', r: 4 },
      { ic: '🌇', n: 'المغرب', ar: 'المغرب', d: 'بعد غروب الشمس', r: 3 },
      { ic: '🌙', n: 'العشاء', ar: 'العشاء', d: 'عند حلول الظلام', r: 4 }
    ]
  }
};
