(() => {
'use strict';

/* ---------- edit this line: your name(s) for the credits ---------- */
const AUTHORS = 'Your Name';

const API = 'https://ummahapi.com/api/quran/surah/';
/* Optional: an EveryAyah folder name for a different reciter (for example a kids-repeat recitation).
   Leave empty to use the reciter that UmmahAPI returns. If the folder does not exist the app falls back automatically. */
const KID_VOICE_FOLDER = '';

/* ---------- surahs ---------- */
const RAW = '1|Al-Fatihah|الفاتحة|7;78|An-Naba|النبأ|40;79|An-Nazi\'at|النازعات|46;80|\'Abasa|عبس|42;81|At-Takwir|التكوير|29;82|Al-Infitar|الانفطار|19;83|Al-Mutaffifin|المطففين|36;84|Al-Inshiqaq|الانشقاق|25;85|Al-Buruj|البروج|22;86|At-Tariq|الطارق|17;87|Al-A\'la|الأعلى|19;88|Al-Ghashiyah|الغاشية|26;89|Al-Fajr|الفجر|30;90|Al-Balad|البلد|20;91|Ash-Shams|الشمس|15;92|Al-Layl|الليل|21;93|Ad-Duha|الضحى|11;94|Ash-Sharh|الشرح|8;95|At-Tin|التين|8;96|Al-\'Alaq|العلق|19;97|Al-Qadr|القدر|5;98|Al-Bayyinah|البينة|8;99|Az-Zalzalah|الزلزلة|8;100|Al-\'Adiyat|العاديات|11;101|Al-Qari\'ah|القارعة|11;102|At-Takathur|التكاثر|8;103|Al-\'Asr|العصر|3;104|Al-Humazah|الهمزة|9;105|Al-Fil|الفيل|5;106|Quraysh|قريش|4;107|Al-Ma\'un|الماعون|7;108|Al-Kawthar|الكوثر|3;109|Al-Kafirun|الكافرون|6;110|An-Nasr|النصر|3;111|Al-Masad|المسد|5;112|Al-Ikhlas|الإخلاص|4;113|Al-Falaq|الفلق|5;114|An-Nas|الناس|6';
const INFO = {};
RAW.split(';').forEach(r => { const p = r.split('|'); INFO[+p[0]] = { n: +p[0], en: p[1], ar: p[2], c: +p[3] }; });
const CURATED_ORDER = [112, 113, 114, 108, 103, 106, 1];
const MORE_ORDER = [111,110,109,107,105,104,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78];

/* Hand-written, child-safe scene for each ayah. m = motif for the built-in picture. */
const SCENES = {
  1: [
    'sunrise',
    'star',
    'rain',
    'star',
    'lantern',
    'path',
    'path'],
  112: [
    'star',
    'tree',
    'star',
    'moon'],
  113: [
    'sunrise',
    'house',
    'lantern',
    'lantern',
    'sunrise'],
  114: [
    'house',
    'star',
    'moon',
    'lantern',
    'lantern',
    'star'],
  108: [
    'river',
    'sunrise',
    'tree'],
  103: [
    'hourglass',
    'hourglass',
    'tree'],
  106: [
    'path',
    'path',
    'sunrise',
    'river']
};
const GENERIC = ['sunrise','star','moon','tree','path','lantern','river','house'];
function sceneFor(s, a) {
  const c = SCENES[s] && SCENES[s][a - 1];
  return c || GENERIC[(s + a) % GENERIC.length];
}

/* ---------- text ---------- */
const I18N = {
en:{dir:'ltr',appName:'Noor Nest',nHome:'Home',nLearn:'Learn',nReview:'Review',nParents:'Grown-ups',
  hiEgg:'An egg is waiting. Learn an ayah to warm it up!',hiGrow:'Hello! Ready for a new ayah?',hiSleepy:'Zzz… I am sleepy. Wake me with a review!',
  stageNames:['Egg','Cracking egg','Hatchling','Little Noor','Star Noor'],nextStage:'Next change in {n} stars',maxStage:'Fully grown!',
  learnNew:'Learn a new ayah',reviewNow:'Wake Noor with a review ({n})',chooseSurah:'Pick a surah',
  step1:'Look and listen',step2:'Catch the fireflies',step3:'Say it to Noor',
  listen:'🔊 Listen',listenAgain:'🔊 Listen again',newPic:'🎨 New picture',next:'Next',close:'Close',
  flyHint:'Tap the glowing firefly',round1:'Follow the light',round2:'Now from memory!',
  recite:'Tap and recite',stop:'Done',listening:'Noor is listening…',slipHint:'Slipped? Just say it again from the start.',startOver:'Start over',said:'I said it!',sayAloud:'Say it out loud, then tap the star.',
  micOn:'Grown-ups: turn on the microphone',micErr:'The microphone is not available. Tap the star after you recite.',
  resultGreat:'Wonderful!',resultGood:'Nice try!',resultAgain:'Let’s practice again',again:'Try again',cont:'Continue',starsEarned:'+{n} stars',grew:'Noor grew!',
  nextAyah:'Next ayah',toMap:'Back to the map',
  reviewTitle:'Review time',reviewAsk:'Which ayah does this picture remind you of?',reviewEmpty:'Nothing to review right now. Noor is happy!',
  hint:'Show the first word',show:'Show the ayah',rEasy:'Easy',rAlmost:'Almost',rAgain:'Again',reviewDone:'All done! Noor is wide awake.',
  gateQ:'For grown-ups: what is {a} + {b}?',gateGo:'Open',gateBad:'Not quite. Try again.',
  pSound:'Sounds',pMic:'Listen with the microphone',pMicNote:'Uses your browser’s speech recognition. In Chrome the audio is sent to Google to be turned into text. Keep it off if you prefer.',
  pAi:'AI pictures',pAiNote:'Pictures are drawn by an online AI service from a short scene description. No names or personal data are sent. Turn off for simple built-in pictures.',
  pMore:'More surahs (Juz Amma)',pMoreNote:'Extra surahs use calm abstract pictures.',pLang:'Language',pReset:'Erase progress',pResetAsk:'Erase all progress on this device?',
  pStats:'Progress',ayahsLearned:'Ayahs learned',reviewsDue:'Reviews due',streak:'Day streak',weakTitle:'Needs a little more practice',weakNone:'No weak spots yet.',
  loading:'Loading the Quran…',loadErr:'Could not reach the Quran service. Check the internet connection.',retry:'Try again',
  builtBy:'Built by',powered:'Powered by UmmahAPI',ayahWord:'Ayah',aiTag:'✨ AI picture',simpleTag:'Simple picture',audioErr:'The audio could not play.',
  modeTitle:'Who is learning today?',modeLittle:'Ages 5 to 7',modeLittleD:'Big buttons, pictures and sounds.',modeBig:'Ages 8 to 12',modeBigD:'Fill the blanks, recite from memory, more surahs.',pMode:'Learning mode',modeBigOn:'More surahs are now unlocked.',
  blanksTitle:'Fill in the missing words',blanksHint:'Tap the right word for the glowing gap.',
  practice:'Practice tricky words ({n})',practiceAsk:'Fill in the tricky words',practiceDone:'Nice practice! Those words are stronger now.',practiceNone:'No tricky words right now.',
  noHear:'Noor could not hear you well.',tryAgain:'Try again',rateSelf:'I will rate myself',missedNote:'Words to practice: {n}',
  weekTitle:'This week',wAyahs:'Ayahs learned',wReviews:'Practice done',wStars:'Stars earned',wDays:'Days active',weekAria:'Activity over the last 7 days',
  reciteToMe:'Recite to me',rtmTitle:'Recite to me',rtmNote:'Your child recites out loud. Read along below, then tap how it went.',rtmEmpty:'Learn an ayah first, then come back.',rtmNext:'Another ayah',rtmSaved:'Saved',
  trickyWordsN:'{n} tricky words',trickyWord1:'1 tricky word',starsEarned1:'+1 star',nextStage1:'Next change in 1 star',
  kidAria:'A child reading the Quran',kidTap:'Tap to hear the ayah',kidHint:'Tap the reader or Listen. The ayah is read aloud and each word lights up.',kidBoy:'Boy',kidGirl:'Girl',
  authTitle:'Welcome to Noor Nest',authSub:'Parents: make an account to keep your child’s progress safe and synced across phones.',authLogin:'Log in',authRegister:'Create parent account',authGuest:'Try without an account',authGuestNote:'Guest progress stays on this phone only.',
  email:'Email',password:'Password',pwHint:'At least 8 characters. Not a common word.',parentOk:'I am a parent or guardian (18 or older) and I accept the privacy note.',privacyLink:'Read the privacy note',privacyTitle:'Privacy note',
  privacyText:'Noor Nest keeps only your email (to log in) and your child’s learning progress: stars, ayahs learned and tricky words. It never stores names, ages, photos or voice recordings. The microphone is optional. If you switch it on, your browser (for example Chrome) may send the sound to its own speech service to recognise it; Noor Nest never receives or stores the audio. Quran text comes from UmmahAPI. You can delete the account and all its data at any time in the Parent corner.',
  authBack:'Back',authForgot:'Forgot your password? Use your recovery code',recoverTitle:'Reset your password',recCode:'Recovery code',newPassword:'New password',recoverGo:'Reset password',
  recSaveTitle:'Save your recovery code',recSaveNote:'This is the only way to reset a forgotten password. Write it down or take a screenshot. It is shown only once.',recCopy:'Copy',recCopied:'Copied',recDone:'I saved it',
  eBadEmail:'Please enter a valid email.',eWeak:'Choose a stronger password (8+ characters, not a common one).',eTaken:'This email already has an account. Try logging in.',eLogin:'Email or password is not right.',eLocked:'Too many tries. Please wait 15 minutes.',eSlow:'Slow down a little and try again.',eNet:'No connection. Try again when you are online.',eServer:'Something went wrong. Try again.',eBadCode:'That code is not right.',eConsent:'Please tick the box to continue.',
  acctTitle:'Account',acctGuest:'You are using Noor Nest without an account. Progress stays on this phone.',acctMake:'Create account or log in',acctSignedIn:'Signed in as {e}',acctSynced:'Progress is saved online.',acctSyncing:'Saving…',acctOffline:'Saved on this phone. Will sync when you are online.',acctLogout:'Log out',acctPw:'Change password',acctCur:'Current password',acctPwDone:'Password changed',acctDelete:'Delete account and data',acctDeleteAsk:'Enter your password to delete the account and all saved progress. This cannot be undone.',acctDeleteGo:'Delete everything',acctDeleted:'Account deleted',loggedOut:'Logged out',sessionEnd:'Please log in again.',cancel:'Cancel',save2:'Save',
  tourTitle:'Meet your reader',tourSub:'Pick who reads with you, and the age group.',tourStart:'Start reading!',
  coachOops:'Almost! Say it again from the start.',coachFixed:'You fixed it! Amazing!',coachGood:'Yes! Keep going!',coachCheer:'Wonderful recitation!',
  stepEcho:'Listen, then say each part',echoHear:'Hear it',echoPart:'Part {i} of {n}'},
fr:{dir:'ltr',appName:'Noor Nest',nHome:'Accueil',nLearn:'Apprendre',nReview:'Réviser',nParents:'Parents',
  hiEgg:'Un œuf attend. Apprends un ayah pour le réchauffer !',hiGrow:'Coucou ! Prêt pour un nouvel ayah ?',hiSleepy:'Zzz… J’ai sommeil. Réveille-moi avec une révision !',
  stageNames:['Œuf','Œuf qui se fend','Poussin','Petit Noor','Noor étoilé'],nextStage:'Prochain changement dans {n} étoiles',maxStage:'Complètement grandi !',
  learnNew:'Apprendre un nouvel ayah',reviewNow:'Réveiller Noor avec une révision ({n})',chooseSurah:'Choisis une sourate',
  step1:'Regarde et écoute',step2:'Attrape les lucioles',step3:'Dis-le à Noor',
  listen:'🔊 Écouter',listenAgain:'🔊 Écouter encore',newPic:'🎨 Nouvelle image',next:'Suivant',close:'Fermer',
  flyHint:'Touche la luciole qui brille',round1:'Suis la lumière',round2:'Maintenant de mémoire !',
  recite:'Touche et récite',stop:'Terminé',listening:'Noor écoute…',slipHint:'Une erreur ? Redis simplement depuis le début.',startOver:'Recommencer',said:'Je l’ai dit !',sayAloud:'Dis-le à voix haute, puis touche l’étoile.',
  micOn:'Parents : activer le micro',micErr:'Le micro n’est pas disponible. Touche l’étoile après ta récitation.',
  resultGreat:'Magnifique !',resultGood:'Bien essayé !',resultAgain:'On s’entraîne encore',again:'Réessayer',cont:'Continuer',starsEarned:'+{n} étoiles',grew:'Noor a grandi !',
  nextAyah:'Ayah suivant',toMap:'Retour à la carte',
  reviewTitle:'C’est l’heure de réviser',reviewAsk:'À quel ayah cette image te fait-elle penser ?',reviewEmpty:'Rien à réviser pour l’instant. Noor est content !',
  hint:'Montrer le premier mot',show:'Montrer l’ayah',rEasy:'Facile',rAlmost:'Presque',rAgain:'Encore',reviewDone:'Terminé ! Noor est bien réveillé.',
  gateQ:'Pour les adultes : combien font {a} + {b} ?',gateGo:'Ouvrir',gateBad:'Pas tout à fait. Réessayez.',
  pSound:'Sons',pMic:'Écoute par micro',pMicNote:'Utilise la reconnaissance vocale du navigateur. Dans Chrome, l’audio est envoyé à Google pour être converti en texte. Laissez désactivé si vous préférez.',
  pAi:'Images IA',pAiNote:'Les images sont dessinées par un service d’IA en ligne à partir d’une courte description de scène. Aucun nom ni donnée personnelle n’est envoyé. Désactivez pour des images simples intégrées.',
  pMore:'Plus de sourates (Juz Amma)',pMoreNote:'Les sourates supplémentaires utilisent des images abstraites et apaisantes.',pLang:'Langue',pReset:'Effacer la progression',pResetAsk:'Effacer toute la progression sur cet appareil ?',
  pStats:'Progression',ayahsLearned:'Ayahs appris',reviewsDue:'Révisions à faire',streak:'Jours d’affilée',weakTitle:'À retravailler un peu',weakNone:'Aucun point faible pour l’instant.',
  loading:'Chargement du Coran…',loadErr:'Impossible de joindre le service du Coran. Vérifiez la connexion internet.',retry:'Réessayer',
  builtBy:'Réalisé par',powered:'Propulsé par UmmahAPI',ayahWord:'Ayah',aiTag:'✨ Image IA',simpleTag:'Image simple',audioErr:'L’audio n’a pas pu être lu.',
  modeTitle:'Qui apprend aujourd’hui ?',modeLittle:'5 à 7 ans',modeLittleD:'Gros boutons, images et sons.',modeBig:'8 à 12 ans',modeBigD:'Mots à compléter, récitation de mémoire, plus de sourates.',pMode:'Mode d’apprentissage',modeBigOn:'D’autres sourates sont maintenant disponibles.',
  blanksTitle:'Complète les mots manquants',blanksHint:'Touche le bon mot pour la case qui brille.',
  practice:'S’entraîner sur les mots difficiles ({n})',practiceAsk:'Complète les mots difficiles',practiceDone:'Bel entraînement ! Ces mots sont plus solides.',practiceNone:'Aucun mot difficile pour l’instant.',
  noHear:'Noor ne t’a pas bien entendu.',tryAgain:'Réessayer',rateSelf:'Je m’évalue moi-même',missedNote:'Mots à travailler : {n}',
  weekTitle:'Cette semaine',wAyahs:'Ayahs appris',wReviews:'Entraînements faits',wStars:'Étoiles gagnées',wDays:'Jours actifs',weekAria:'Activité des 7 derniers jours',
  reciteToMe:'Récite-moi',rtmTitle:'Récite-moi',rtmNote:'Votre enfant récite à voix haute. Suivez le texte ci-dessous, puis touchez le résultat.',rtmEmpty:'Apprenez d’abord un ayah, puis revenez.',rtmNext:'Un autre ayah',rtmSaved:'Enregistré',
  trickyWordsN:'{n} mots difficiles',trickyWord1:'1 mot difficile',starsEarned1:'+1 étoile',nextStage1:'Prochain changement dans 1 étoile',
  kidAria:'Un enfant qui lit le Coran',kidTap:'Touche pour écouter l’ayah',kidHint:'Touche le lecteur ou Écouter. L’ayah est lu à voix haute et chaque mot s’allume.',kidBoy:'Garçon',kidGirl:'Fille',
  authTitle:'Bienvenue sur Noor Nest',authSub:'Parents : créez un compte pour garder la progression de votre enfant en sécurité et synchronisée entre téléphones.',authLogin:'Se connecter',authRegister:'Créer un compte parent',authGuest:'Essayer sans compte',authGuestNote:'La progression d’invité reste sur ce téléphone.',
  email:'E-mail',password:'Mot de passe',pwHint:'Au moins 8 caractères. Pas un mot courant.',parentOk:'Je suis un parent ou tuteur (18 ans ou plus) et j’accepte la note de confidentialité.',privacyLink:'Lire la note de confidentialité',privacyTitle:'Confidentialité',
  privacyText:'Noor Nest ne garde que votre e-mail (pour vous connecter) et la progression de votre enfant : étoiles, versets appris et mots difficiles. Aucun nom, âge, photo ni enregistrement de voix n’est conservé. Le micro est facultatif. Si vous l’activez, votre navigateur (par exemple Chrome) peut envoyer le son à son propre service de reconnaissance vocale ; Noor Nest ne reçoit ni ne stocke jamais l’audio. Le texte du Coran vient d’UmmahAPI. Vous pouvez supprimer le compte et toutes ses données à tout moment dans l’espace parents.',
  authBack:'Retour',authForgot:'Mot de passe oublié ? Utilisez votre code de récupération',recoverTitle:'Réinitialiser le mot de passe',recCode:'Code de récupération',newPassword:'Nouveau mot de passe',recoverGo:'Réinitialiser',
  recSaveTitle:'Gardez votre code de récupération',recSaveNote:'C’est le seul moyen de réinitialiser un mot de passe oublié. Notez-le ou faites une capture d’écran. Il n’est affiché qu’une fois.',recCopy:'Copier',recCopied:'Copié',recDone:'Je l’ai noté',
  eBadEmail:'Saisissez un e-mail valide.',eWeak:'Choisissez un mot de passe plus solide (8 caractères ou plus, pas courant).',eTaken:'Cet e-mail a déjà un compte. Essayez de vous connecter.',eLogin:'E-mail ou mot de passe incorrect.',eLocked:'Trop d’essais. Patientez 15 minutes.',eSlow:'Doucement, réessayez dans un instant.',eNet:'Pas de connexion. Réessayez une fois en ligne.',eServer:'Un problème est survenu. Réessayez.',eBadCode:'Ce code n’est pas bon.',eConsent:'Cochez la case pour continuer.',
  acctTitle:'Compte',acctGuest:'Vous utilisez Noor Nest sans compte. La progression reste sur ce téléphone.',acctMake:'Créer un compte ou se connecter',acctSignedIn:'Connecté : {e}',acctSynced:'La progression est enregistrée en ligne.',acctSyncing:'Enregistrement…',acctOffline:'Enregistré sur ce téléphone. Synchronisation une fois en ligne.',acctLogout:'Se déconnecter',acctPw:'Changer le mot de passe',acctCur:'Mot de passe actuel',acctPwDone:'Mot de passe changé',acctDelete:'Supprimer le compte et les données',acctDeleteAsk:'Saisissez votre mot de passe pour supprimer le compte et toute la progression. Action irréversible.',acctDeleteGo:'Tout supprimer',acctDeleted:'Compte supprimé',loggedOut:'Déconnecté',sessionEnd:'Reconnectez-vous.',cancel:'Annuler',save2:'Enregistrer',
  tourTitle:'Rencontre ton lecteur',tourSub:'Choisis qui lit avec toi, et la tranche d’âge.',tourStart:'Commencer à lire !',
  coachOops:'Presque ! Redis-le depuis le début.',coachFixed:'Tu l’as corrigé ! Bravo !',coachGood:'Oui ! Continue !',coachCheer:'Magnifique récitation !',
  stepEcho:'Écoute, puis dis chaque partie',echoHear:'L’écouter',echoPart:'Partie {i} sur {n}'},
ar:{dir:'rtl',appName:'عُشّ نور',nHome:'الرئيسية',nLearn:'تعلّم',nReview:'مراجعة',nParents:'للكبار',
  hiEgg:'بيضة تنتظر. تعلّم آية لتدفئتها!',hiGrow:'مرحبًا! هل أنت جاهز لآية جديدة؟',hiSleepy:'زززز… أنا نعسان. أيقظني بمراجعة!',
  stageNames:['بيضة','بيضة تتشقق','فرخ صغير','نور الصغير','نور النجمة'],nextStage:'التغيّر التالي بعد {n} نجوم',maxStage:'اكتمل نموّه!',
  learnNew:'تعلّم آية جديدة',reviewNow:'أيقظ نور بمراجعة ({n})',chooseSurah:'اختر سورة',
  step1:'انظر واستمع',step2:'اصطد اليراعات',step3:'قلها لنور',
  listen:'🔊 استمع',listenAgain:'🔊 استمع مرة أخرى',newPic:'🎨 صورة جديدة',next:'التالي',close:'إغلاق',
  flyHint:'المس اليراعة المضيئة',round1:'اتبع الضوء',round2:'الآن من الذاكرة!',
  recite:'المس ثم اقرأ',stop:'انتهيت',listening:'نور يستمع…',slipHint:'أخطأت؟ أعد القراءة من البداية.',startOver:'ابدأ من جديد',said:'قلتها!',sayAloud:'قلها بصوت عالٍ ثم المس النجمة.',
  micOn:'للكبار: تفعيل الميكروفون',micErr:'الميكروفون غير متاح. المس النجمة بعد أن تقرأ.',
  resultGreat:'ممتاز!',resultGood:'محاولة جميلة!',resultAgain:'لنتدرّب مرة أخرى',again:'أعد المحاولة',cont:'متابعة',starsEarned:'+{n} نجوم',grew:'كبر نور!',
  nextAyah:'الآية التالية',toMap:'العودة إلى الخريطة',
  reviewTitle:'وقت المراجعة',reviewAsk:'أي آية تذكّرك بها هذه الصورة؟',reviewEmpty:'لا شيء للمراجعة الآن. نور سعيد!',
  hint:'أظهر الكلمة الأولى',show:'أظهر الآية',rEasy:'سهل',rAlmost:'تقريبًا',rAgain:'مرة أخرى',reviewDone:'انتهينا! نور مستيقظ تمامًا.',
  gateQ:'للكبار: كم يساوي {a} + {b}؟',gateGo:'فتح',gateBad:'ليس تمامًا. حاول مرة أخرى.',
  pSound:'الأصوات',pMic:'الاستماع بالميكروفون',pMicNote:'يستخدم ميزة التعرف على الكلام في المتصفح. في كروم يُرسل الصوت إلى جوجل لتحويله إلى نص. اتركه مغلقًا إن شئت.',
  pAi:'صور الذكاء الاصطناعي',pAiNote:'تُرسم الصور بواسطة خدمة ذكاء اصطناعي عبر الإنترنت من وصف قصير للمشهد. لا تُرسل أي أسماء أو بيانات شخصية. أوقفها لاستخدام صور بسيطة مدمجة.',
  pMore:'سور أخرى (جزء عمّ)',pMoreNote:'السور الإضافية تستخدم صورًا مجرّدة هادئة.',pLang:'اللغة',pReset:'مسح التقدّم',pResetAsk:'هل تريد مسح كل التقدّم على هذا الجهاز؟',
  pStats:'التقدّم',ayahsLearned:'آيات محفوظة',reviewsDue:'مراجعات مستحقة',streak:'أيام متتالية',weakTitle:'تحتاج مزيدًا من التدريب',weakNone:'لا توجد نقاط ضعف بعد.',
  loading:'جارٍ تحميل القرآن…',loadErr:'تعذّر الاتصال بخدمة القرآن. تحقق من الإنترنت.',retry:'أعد المحاولة',
  builtBy:'من إعداد',powered:'بدعم من UmmahAPI',ayahWord:'الآية',aiTag:'✨ صورة بالذكاء الاصطناعي',simpleTag:'صورة بسيطة',audioErr:'تعذّر تشغيل الصوت.',
  modeTitle:'من يتعلّم اليوم؟',modeLittle:'من 5 إلى 7 سنوات',modeLittleD:'أزرار كبيرة وصور وأصوات.',modeBig:'من 8 إلى 12 سنة',modeBigD:'إكمال الكلمات، التسميع من الذاكرة، سور أكثر.',pMode:'نمط التعلّم',modeBigOn:'تم فتح سور إضافية.',
  blanksTitle:'أكمل الكلمات الناقصة',blanksHint:'المس الكلمة الصحيحة للفراغ المضيء.',
  practice:'تدرّب على الكلمات الصعبة ({n})',practiceAsk:'أكمل الكلمات الصعبة',practiceDone:'تدريب رائع! صارت هذه الكلمات أقوى.',practiceNone:'لا توجد كلمات صعبة الآن.',
  noHear:'لم يسمعك نور جيدًا.',tryAgain:'أعد المحاولة',rateSelf:'سأقيّم نفسي',missedNote:'كلمات تحتاج تدريبًا: {n}',
  weekTitle:'هذا الأسبوع',wAyahs:'آيات محفوظة',wReviews:'تدريبات مكتملة',wStars:'نجوم مكتسبة',wDays:'أيام نشطة',weekAria:'النشاط خلال آخر 7 أيام',
  reciteToMe:'سمّع لي',rtmTitle:'سمّع لي',rtmNote:'يقرأ طفلك بصوت عالٍ. تابع النص أدناه ثم المس النتيجة.',rtmEmpty:'تعلّم آية أولًا ثم عد.',rtmNext:'آية أخرى',rtmSaved:'تم الحفظ',
  trickyWordsN:'{n} كلمات صعبة',trickyWord1:'كلمة صعبة واحدة',starsEarned1:'+نجمة واحدة',nextStage1:'التغيّر التالي بعد نجمة واحدة',
  kidAria:'طفل يقرأ القرآن',kidTap:'المس لسماع الآية',kidHint:'المس القارئ أو زر الاستماع. تُقرأ الآية بصوت عالٍ ويُضيء كل كلمة.',kidBoy:'ولد',kidGirl:'بنت',
  authTitle:'أهلًا بك في عش النور',authSub:'للآباء: أنشئوا حسابًا لحفظ تقدّم طفلكم بأمان ومزامنته بين الهواتف.',authLogin:'تسجيل الدخول',authRegister:'إنشاء حساب ولي أمر',authGuest:'جرّب بدون حساب',authGuestNote:'تقدّم الضيف يبقى على هذا الهاتف فقط.',
  email:'البريد الإلكتروني',password:'كلمة المرور',pwHint:'٨ أحرف على الأقل، وليست كلمة شائعة.',parentOk:'أنا ولي أمر (١٨ سنة فأكثر) وأوافق على ملاحظة الخصوصية.',privacyLink:'اقرأ ملاحظة الخصوصية',privacyTitle:'ملاحظة الخصوصية',
  privacyText:'يحتفظ عش النور ببريدك الإلكتروني فقط (لتسجيل الدخول) وبتقدّم طفلك في التعلّم: النجوم والآيات المحفوظة والكلمات الصعبة. لا يحفظ أسماء ولا أعمارًا ولا صورًا ولا تسجيلات صوتية. الميكروفون اختياري. إذا فعّلته فقد يرسل المتصفح (مثل Chrome) الصوت إلى خدمة التعرّف على الكلام الخاصة به، ولا يستلم عش النور الصوت ولا يخزّنه. نص القرآن من UmmahAPI. يمكنك حذف الحساب وكل بياناته في أي وقت من ركن الوالدين.',
  authBack:'رجوع',authForgot:'نسيت كلمة المرور؟ استخدم رمز الاسترداد',recoverTitle:'إعادة تعيين كلمة المرور',recCode:'رمز الاسترداد',newPassword:'كلمة مرور جديدة',recoverGo:'إعادة التعيين',
  recSaveTitle:'احفظ رمز الاسترداد',recSaveNote:'هذه هي الطريقة الوحيدة لاستعادة كلمة مرور منسية. اكتبه أو التقط صورة للشاشة. يظهر مرة واحدة فقط.',recCopy:'نسخ',recCopied:'تم النسخ',recDone:'حفظته',
  eBadEmail:'أدخل بريدًا إلكترونيًا صحيحًا.',eWeak:'اختر كلمة مرور أقوى (٨ أحرف فأكثر وغير شائعة).',eTaken:'لهذا البريد حساب بالفعل. جرّب تسجيل الدخول.',eLogin:'البريد أو كلمة المرور غير صحيحة.',eLocked:'محاولات كثيرة. انتظر ١٥ دقيقة.',eSlow:'مهلًا، أعد المحاولة بعد لحظة.',eNet:'لا يوجد اتصال. أعد المحاولة عند الاتصال.',eServer:'حدث خطأ. أعد المحاولة.',eBadCode:'الرمز غير صحيح.',eConsent:'ضع علامة في المربع للمتابعة.',
  acctTitle:'الحساب',acctGuest:'تستخدم عش النور بدون حساب. يبقى التقدّم على هذا الهاتف.',acctMake:'إنشاء حساب أو تسجيل الدخول',acctSignedIn:'مسجّل الدخول: {e}',acctSynced:'تقدّمك محفوظ على الإنترنت.',acctSyncing:'جارٍ الحفظ…',acctOffline:'محفوظ على هذا الهاتف. ستتم المزامنة عند الاتصال.',acctLogout:'تسجيل الخروج',acctPw:'تغيير كلمة المرور',acctCur:'كلمة المرور الحالية',acctPwDone:'تم تغيير كلمة المرور',acctDelete:'حذف الحساب والبيانات',acctDeleteAsk:'أدخل كلمة المرور لحذف الحساب وكل التقدّم المحفوظ. لا يمكن التراجع.',acctDeleteGo:'احذف كل شيء',acctDeleted:'تم حذف الحساب',loggedOut:'تم تسجيل الخروج',sessionEnd:'سجّل الدخول مرة أخرى.',cancel:'إلغاء',save2:'حفظ',
  tourTitle:'تعرّف على قارئك',tourSub:'اختر من يقرأ معك والفئة العمرية.',tourStart:'ابدأ القراءة!',
  coachOops:'تقريبًا! أعدها من البداية.',coachFixed:'صحّحتها! رائع!',coachGood:'نعم! أكمل!',coachCheer:'تلاوة رائعة!',
  stepEcho:'استمع ثم قل كل جزء',echoHear:'استمع',echoPart:'الجزء {i} من {n}'}
};

/* ---------- helpers ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(3, '0');
const rnd = (a, b) => a + Math.random() * (b - a);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const dayStr = d => d.toLocaleDateString('en-CA');
const DAY = 86400000;

const GUEST_KEY = 'noornest.v1', ACCT_KEY = 'noornest.acct';
let KEY = GUEST_KEY;
const fresh = () => ({ lang: '', sound: true, mic: false, more: false, tour: false, kid: 'boy', mode: '', stars: 0, cards: {}, done: {}, weak: {}, seed: {}, log: {}, deen: {}, narr: true, streak: { last: '', count: 0 } });
const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k) || ''; if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} return ''; };
function normalize(st) {
  st.streak = Object.assign({ last: '', count: 0 }, st.streak);
  ['cards', 'done', 'weak', 'seed', 'log', 'deen'].forEach(k => { if (!st[k] || typeof st[k] !== 'object') st[k] = {}; });
  if (!I18N[st.lang]) { const nl = (navigator.language || 'en').slice(0, 2); st.lang = I18N[nl] ? nl : 'en'; }
  return st;
}
function loadState(key) { let st; try { st = Object.assign(fresh(), JSON.parse(localStorage.getItem(key) || '{}')); } catch (e) { st = fresh(); } return normalize(st); }
let S = loadState(GUEST_KEY);
const Auth = { user: null, gate: false, view: 'choose', msg: '', email: '', code: '', rev: 0, busy: false, sync: 'ok', timer: 0, panel: '', pmsg: '', privacy: false, tourKid: 'boy', tourMode: 'little' };

/* ---------- server calls and progress sync ---------- */
const WEB = /^https?:$/.test(location.protocol);
function api(method, p, body) {
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, to = setTimeout(() => ctl && ctl.abort(), 12000);
  return fetch(p, { method, credentials: 'same-origin', signal: ctl ? ctl.signal : undefined, headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'noornest' }, body: body === undefined ? undefined : JSON.stringify(body) })
    .then(async r => { let j = null; try { j = await r.json(); } catch (e) {} return { status: r.status, json: j || {} }; }).finally(() => clearTimeout(to));
}
const maxN = (a, b) => Math.max(+a || 0, +b || 0);
/* combine two copies of the progress without losing anything either side earned */
function mergeState(local, remote) {
  const o = normalize(Object.assign(fresh(), remote));
  /* a brand-new phone (tour not done yet) adopts the account's settings; otherwise this phone's choices win */
  const adopt = !!(remote.tour && !local.tour);
  ['lang', 'sound', 'kid', 'mode', 'narr'].forEach(k => { if (!adopt && local[k] !== undefined && local[k] !== '') o[k] = local[k]; });
  o.mic = !!local.mic;
  o.tour = !!(local.tour || remote.tour); o.more = !!(local.more || remote.more);
  o.stars = maxN(local.stars, remote.stars);
  o.done = Object.assign({}, remote.done, local.done);
  o.cards = Object.assign({}, remote.cards);
  Object.keys(local.cards || {}).forEach(k => { const x = local.cards[k], y = o.cards[k]; if (!y || x.box > y.box || (x.box === y.box && x.due > y.due)) o.cards[k] = x; });
  o.weak = {};
  [remote.weak || {}, local.weak || {}].forEach(src => Object.keys(src).forEach(k => { const w = o.weak[k] = o.weak[k] || {}; Object.keys(src[k] || {}).forEach(i => { w[i] = maxN(w[i], src[k][i]); }); }));
  o.log = {};
  [remote.log || {}, local.log || {}].forEach(src => Object.keys(src).forEach(d => { const e = o.log[d] = o.log[d] || {}; Object.keys(src[d] || {}).forEach(f => { e[f] = maxN(e[f], src[d][f]); }); }));
  const a = local.streak || {}, b = remote.streak || {};
  o.streak = (a.last || '') > (b.last || '') ? { last: a.last, count: a.count } : (a.last === b.last ? { last: a.last || '', count: maxN(a.count, b.count) } : { last: b.last || '', count: b.count || 0 });
  o.seed = {};
  o.deen = {};
  [remote.deen || {}, local.deen || {}].forEach(src => Object.keys(src).forEach(k => { const e = o.deen[k] = o.deen[k] || {}; e.l = maxN(e.l, (src[k] || {}).l); e.b = maxN(e.b, (src[k] || {}).b); }));
  return normalize(o);
}
function persistLocal() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const save = () => { persistLocal(); if (Auth.user) syncSoon(); };
function syncSoon() { Auth.sync = 'saving'; clearTimeout(Auth.timer); Auth.timer = setTimeout(pushState, 1500); }
function setRev(r) { Auth.rev = r; ls('nn_rev', String(r)); }
async function pushState(again) {
  if (!Auth.user || !WEB) return;
  if (Auth.busy) { syncSoon(); return; }
  Auth.busy = true;
  try {
    const r = await api('PUT', '/api/state', { rev: Auth.rev, state: S });
    if (r.status === 200) { setRev(r.json.rev); Auth.sync = 'ok'; }
    else if (r.status === 409 && r.json.state) { S = mergeState(S, r.json.state); setRev(r.json.rev); persistLocal(); Auth.busy = false; if (!again) return pushState(true); }
    else if (r.status === 401) { sessionEnded(); }
    else Auth.sync = 'offline';
  } catch (e) { Auth.sync = 'offline'; }
  Auth.busy = false;
}
async function pullState() {
  if (!Auth.user || !WEB) return false;
  try {
    const r = await api('GET', '/api/state');
    if (r.status === 401) { sessionEnded(); return false; }
    if (r.status !== 200) return false;
    setRev(r.json.rev);
    if (r.json.state) { S = mergeState(S, r.json.state); persistLocal(); }
    Auth.sync = 'saving'; await pushState();
    return true;
  } catch (e) { Auth.sync = 'offline'; return false; }
}
function sessionEnded() {
  if (!Auth.user) return;
  Auth.user = null; Auth.gate = true; Auth.view = 'login'; Auth.msg = ''; toast(t('sessionEnd')); render();
}
function enterGuest() { KEY = GUEST_KEY; S = loadState(GUEST_KEY); Auth.user = null; Auth.gate = false; ls('nn_choice', 'guest'); }
function enterAccount(email, adopt) {
  const same = ls('nn_user') === email; KEY = ACCT_KEY;
  S = same ? loadState(ACCT_KEY) : (adopt ? loadState(GUEST_KEY) : normalize(fresh()));
  Auth.user = { email }; Auth.gate = false; Auth.rev = same ? +ls('nn_rev') || 0 : 0;
  ls('nn_user', email); ls('nn_choice', 'acct'); ls('nn_rev', String(Auth.rev)); persistLocal();
}
function leaveAccount() {
  clearTimeout(Auth.timer); ls(ACCT_KEY, null); ls('nn_user', null); ls('nn_rev', null); ls('nn_choice', null);
  Auth.user = null; KEY = GUEST_KEY; S = loadState(GUEST_KEY); Auth.gate = true; Auth.view = 'choose'; Auth.panel = ''; gateOK = false;
}
const t = (k, v) => {
  const val = (I18N[S.lang] && I18N[S.lang][k] != null) ? I18N[S.lang][k] : I18N.en[k];
  if (typeof val !== 'string') return val;
  return v ? val.replace(/\{(\w+)\}/g, (m, x) => v[x]) : val;
};

/* ---------- data ---------- */
const cache = {};
async function getSurah(n) {
  if (cache[n]) return cache[n];
  const res = await fetch(API + n);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const j = await res.json();
  if (!j || !j.success || !j.data) throw new Error('API error');
  const d = j.data;
  cache[n] = {
    number: n, nameAr: d.surah.name_arabic,
    verses: (d.verses || []).map(v => ({
      n: v.ayah, key: v.verse_key || (n + ':' + v.ayah), ar: String(v.arabic || '').trim(),
      tl: v.transliteration || '', tr: (v.translations && (v.translations[S.lang === 'fr' ? 'french' : 'sahih_international'] || v.translations.sahih_international)) || '',
      audio: (v.audio && v.audio.ayah_audio) || ('https://everyayah.com/data/Alafasy_128kbps/' + pad(n) + pad(v.ayah) + '.mp3')
    }))
  };
  return cache[n];
}
const verseOf = (s, a) => cache[s] && cache[s].verses[a - 1];
const wordsOf = v => v.ar.split(/\s+/).filter(w => /[ء-يٱ]/.test(w));
const surahList = () => CURATED_ORDER.concat(S.more ? MORE_ORDER : []).map(n => INFO[n]);
const countDone = s => { let k = 0; for (let a = 1; a <= INFO[s].c; a++) if (S.done[s + ':' + a]) k++; return k; };
const totalDone = () => Object.keys(S.done).length;

/* ---------- sound ---------- */
let ac;
function tone(f, d, type, vol) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(vol || .09, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + (d || .2));
    o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + (d || .2));
  } catch (e) {}
}
const NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
const chime = i => tone(NOTES[i % NOTES.length], .28, 'triangle', .1);
const fanfare = () => [0, 2, 4, 5].forEach((n, i) => setTimeout(() => chime(n), i * 130));
const audio = new Audio();
function playAyah(url, onEnd) {
  try {
    audio.onended = onEnd || null;
    audio.onerror = () => toast(t('audioErr'));
    audio.src = url;
    const p = audio.play(); if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}
const stopAudio = () => { hush(); kidStop(); try { audio.onended = null; audio.onerror = null; audio.pause(); } catch (e) {} };

let toastTimer;
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- cards (spaced review) ---------- */
const INTERVALS = [0, 1, 2, 4, 8, 16];
const cardKey = (s, a) => s + ':' + a;
function ensureCard(s, a) {
  const k = cardKey(s, a);
  if (!S.cards[k]) S.cards[k] = { s, a, box: 1, due: Date.now() + DAY };
}
const dueKeys = () => { const now = Date.now(); return Object.keys(S.cards).filter(k => S.cards[k].due <= now).sort((x, y) => S.cards[x].due - S.cards[y].due); };
function rateCard(k, r) {
  const c = S.cards[k]; if (!c) return;
  if (r === 'easy') { c.box = Math.min(5, c.box + 1); c.due = Date.now() + INTERVALS[c.box] * DAY; }
  else if (r === 'shaky') { c.due = Date.now() + Math.max(1, INTERVALS[c.box] / 2) * DAY; }
  else { c.box = 1; c.due = Date.now() + 10 * 60 * 1000; }
}
function bumpStreak() {
  const st = S.streak, today = dayStr(new Date());
  if (st.last === today) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  st.count = st.last === dayStr(y) ? st.count + 1 : 1; st.last = today;
}
const streakNow = () => { const y = new Date(); y.setDate(y.getDate() - 1); return (S.streak.last === dayStr(new Date()) || S.streak.last === dayStr(y)) ? S.streak.count : 0; };

const MODE = () => (S.mode === 'big' ? 'big' : 'little');
const starsTxt = n => (n === 1 ? t('starsEarned1') : t('starsEarned', { n }));
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function addLog(field, n) {
  const d = dayStr(new Date()), e = S.log[d] || (S.log[d] = {});
  e[field] = (e[field] || 0) + (n === undefined ? 1 : n);
  const keys = Object.keys(S.log);
  if (keys.length > 120) keys.sort().slice(0, keys.length - 90).forEach(k => { delete S.log[k]; });
}
/* words the child has missed at least twice in an ayah, worst first */
const trickyWords = k => { const w = S.weak[k] || {}; return Object.keys(w).filter(i => w[i] >= 2).sort((x, y) => w[y] - w[x]).map(Number); };
const trickyAyahs = () => Object.keys(S.weak).filter(k => trickyWords(k).length);
function weekData() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const e = S.log[dayStr(d)] || {};
    days.push({ d, ayahs: e.ayahs || 0, reviews: (e.reviews || 0) + (e.drills || 0) + (e.recites || 0), stars: e.stars || 0 });
  }
  return days;
}

/* ---------- pet ---------- */
const STAGE_AT = [0, 1, 6, 18, 40];
const stageOf = () => { let s = 0; STAGE_AT.forEach((n, i) => { if (S.stars >= n) s = i; }); return s; };
function petSVG(stage, mood) {
  const eyes = (lx, rx, y, big) => {
    const r = big ? 10 : 7;
    return '<g class="eyes-open"><circle cx="' + lx + '" cy="' + y + '" r="' + r + '" fill="#fff"/><circle cx="' + rx + '" cy="' + y + '" r="' + r + '" fill="#fff"/>' +
      '<circle cx="' + (lx + 1) + '" cy="' + (y + 1) + '" r="' + (r / 2) + '" fill="#2a1f4a"/><circle cx="' + (rx - 1) + '" cy="' + (y + 1) + '" r="' + (r / 2) + '" fill="#2a1f4a"/>' +
      '<circle cx="' + (lx + 3) + '" cy="' + (y - 2) + '" r="1.8" fill="#fff"/><circle cx="' + (rx + 1) + '" cy="' + (y - 2) + '" r="1.8" fill="#fff"/></g>' +
      '<g class="eyes-happy" fill="none" stroke="#2a1f4a" stroke-width="3.5" stroke-linecap="round"><path d="M' + (lx - r) + ' ' + (y + 2) + ' Q' + lx + ' ' + (y - r - 2) + ' ' + (lx + r) + ' ' + (y + 2) + '"/><path d="M' + (rx - r) + ' ' + (y + 2) + ' Q' + rx + ' ' + (y - r - 2) + ' ' + (rx + r) + ' ' + (y + 2) + '"/></g>' +
      '<g class="eyes-sleep" fill="none" stroke="#2a1f4a" stroke-width="3.5" stroke-linecap="round"><path d="M' + (lx - r) + ' ' + y + ' Q' + lx + ' ' + (y + r - 1) + ' ' + (lx + r) + ' ' + y + '"/><path d="M' + (rx - r) + ' ' + y + ' Q' + rx + ' ' + (y + r - 1) + ' ' + (rx + r) + ' ' + y + '"/></g>';
  };
  const nest = '<ellipse cx="100" cy="206" rx="76" ry="15" fill="#6b4328"/><path d="M32 201 Q100 226 168 201" fill="none" stroke="#9b6a3f" stroke-width="5" stroke-linecap="round"/><path d="M42 209 Q100 232 158 209" fill="none" stroke="#b98250" stroke-width="4" stroke-linecap="round"/>';
  const ring = '<g class="ring" fill="none" stroke="#ffc857" stroke-width="4"><circle cx="100" cy="130" r="78"/></g>';
  const zzz = '<g class="zzz"><text x="138" y="84" font-size="22">z</text><text x="152" y="62" font-size="28">Z</text></g>';
  let body;
  if (stage === 0) {
    body = '<g class="breath"><ellipse cx="100" cy="148" rx="42" ry="54" fill="#fff3d6"/><circle cx="84" cy="132" r="6" fill="#ffd9a0"/><circle cx="117" cy="160" r="7" fill="#ffd9a0"/><circle cx="106" cy="120" r="4" fill="#ffd9a0"/><circle cx="82" cy="170" r="4" fill="#ffd9a0"/></g>';
  } else if (stage === 1) {
    body = '<g class="breath"><ellipse cx="100" cy="148" rx="42" ry="54" fill="#fff3d6"/><path d="M60 136 L75 124 L86 138 L99 121 L111 138 L124 124 L140 136" fill="none" stroke="#b9915a" stroke-width="3" stroke-linejoin="round"/>' + eyes(88, 112, 156, false) + '</g>';
  } else {
    const sc = [0, 0, .82, .96, 1.08][stage];
    const scarf = stage >= 3 ? '<path d="M64 152 Q100 172 136 152 L136 164 Q100 184 64 164Z" fill="#7be0ad"/><path d="M122 162 L134 190 L120 188Z" fill="#5cc794"/>' : '';
    const crown = stage >= 4 ? '<g><circle cx="100" cy="66" r="26" fill="#ffd96b" opacity=".25"/><path d="M100 46 L107 63 L125 64 L111 75 L116 93 L100 82 L84 93 L89 75 L75 64 L93 63Z" fill="#ffe27a" stroke="#e8b74a" stroke-width="2" stroke-linejoin="round"/></g>' : '';
    body = '<g transform="translate(100 200) scale(' + sc + ') translate(-100 -200)"><g class="breath">' +
      '<ellipse cx="58" cy="140" rx="14" ry="26" fill="#f3b23a" transform="rotate(14 58 140)"/><ellipse cx="142" cy="140" rx="14" ry="26" fill="#f3b23a" transform="rotate(-14 142 140)"/>' +
      '<ellipse cx="100" cy="132" rx="46" ry="52" fill="#ffc857"/><ellipse cx="100" cy="150" rx="29" ry="30" fill="#ffe9a8"/>' +
      '<path d="M88 82 Q92 66 100 80 Q108 64 112 82" fill="none" stroke="#f3b23a" stroke-width="5" stroke-linecap="round"/>' +
      eyes(82, 118, 116, true) +
      '<circle cx="68" cy="132" r="7" fill="#ff8fa3" opacity=".7"/><circle cx="132" cy="132" r="7" fill="#ff8fa3" opacity=".7"/>' +
      '<path d="M92 128 L108 128 L100 142Z" fill="#ff9a3c"/>' + scarf +
      '<ellipse cx="84" cy="188" rx="12" ry="6" fill="#ff9a3c"/><ellipse cx="116" cy="188" rx="12" ry="6" fill="#ff9a3c"/>' +
      '</g>' + crown + '</g>';
  }
  return '<svg class="pet m-' + mood + ' s' + stage + '" viewBox="0 0 200 230" role="img" aria-label="Noor">' + ring + nest + body + zzz + '</svg>';
}
function setPetMood(root, mood) {
  const p = root && root.querySelector('.pet'); if (!p) return;
  p.setAttribute('class', p.getAttribute('class').replace(/m-\w+/, 'm-' + mood));
}

/* ---------- built-in scenes (backdrop behind the reader) ---------- */
function sceneSVG(m, seed) {
  const id = 'g' + Math.floor(Math.random() * 1e7);
  const sky = (a, b) => '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs><rect width="320" height="320" fill="url(#' + id + ')"/>';
  const stars = n => { let s = '', r = (seed * 9301 + 49297) % 233280; for (let i = 0; i < n; i++) { r = (r * 9301 + 49297) % 233280; const x = r / 233280 * 320; r = (r * 9301 + 49297) % 233280; const y = r / 233280 * 180; r = (r * 9301 + 49297) % 233280; const z = 1 + r / 233280 * 2; s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + z.toFixed(1) + '" fill="#fff6d6" opacity=".85"/>'; } return s; };
  const hills = (a, b) => '<path d="M0 250 Q80 204 160 240 T320 222 V320 H0Z" fill="' + a + '"/><path d="M0 286 Q100 248 200 282 T320 270 V320 H0Z" fill="' + b + '"/>';
  const rays = (x, y) => { let s = ''; for (let i = 0; i < 12; i++) { const a = Math.PI + i * Math.PI / 11; s += '<line x1="' + x + '" y1="' + y + '" x2="' + (x + Math.cos(a) * 150).toFixed(1) + '" y2="' + (y + Math.sin(a) * 150).toFixed(1) + '" stroke="#fff3b0" stroke-width="5" opacity=".28" stroke-linecap="round"/>'; } return s; };
  let b = '';
  switch (m) {
    case 'sunrise': b = sky('#4b3fb5', '#ffb27a') + rays(160, 238) + '<circle cx="160" cy="238" r="54" fill="#ffe28a"/>' + hills('#2f8f6a', '#1f6b52'); break;
    case 'star': b = sky('#12124a', '#2d2a86') + stars(28) + '<circle cx="160" cy="124" r="62" fill="#ffd96b" opacity=".14"/><circle cx="160" cy="124" r="38" fill="#ffd96b" opacity=".26"/><path d="M160 84 L170 112 L199 113 L176 131 L184 159 L160 143 L136 159 L144 131 L121 113 L150 112Z" fill="#ffe27a"/>' + hills('#1d3b6b', '#14305a'); break;
    case 'moon': b = sky('#10103f', '#33308f') + stars(30) + '<circle cx="160" cy="118" r="58" fill="#fff2c4"/><circle cx="140" cy="104" r="9" fill="#f1dc9d"/><circle cx="176" cy="132" r="13" fill="#f1dc9d"/><circle cx="168" cy="92" r="6" fill="#f1dc9d"/>' + hills('#1d3b6b', '#14305a'); break;
    case 'rain': { let d = ''; for (let i = 0; i < 26; i++) { const x = 30 + (i * 37) % 270, y = 120 + (i * 53) % 110; d += '<line x1="' + x + '" y1="' + y + '" x2="' + (x - 6) + '" y2="' + (y + 16) + '" stroke="#6fb4ff" stroke-width="4" stroke-linecap="round"/>'; }
      b = sky('#6f86d6', '#c2d6f7') + '<g fill="#f4f7ff"><circle cx="110" cy="84" r="34"/><circle cx="160" cy="68" r="42"/><circle cx="212" cy="86" r="34"/><rect x="100" y="84" width="124" height="36" rx="18"/></g>' + d + hills('#4fae78', '#2f8f6a') + '<g><circle cx="70" cy="270" r="9" fill="#ff8fa3"/><circle cx="130" cy="284" r="9" fill="#ffd96b"/><circle cx="220" cy="272" r="9" fill="#ff8fa3"/><circle cx="270" cy="288" r="9" fill="#fff"/></g>'; break; }
    case 'tree': b = sky('#8fd0f0', '#e4f6e0') + hills('#6fc58a', '#4fae78') + '<rect x="146" y="170" width="28" height="96" rx="10" fill="#7a4e2c"/><g fill="#2f9a62"><circle cx="160" cy="130" r="56"/><circle cx="116" cy="154" r="38"/><circle cx="206" cy="154" r="38"/></g><g fill="#ffd96b"><ellipse cx="124" cy="262" rx="11" ry="8"/><ellipse cx="160" cy="276" rx="11" ry="8"/><ellipse cx="196" cy="264" rx="11" ry="8"/></g>'; break;
    case 'path': b = sky('#6a5bd0', '#ffcf8a') + '<circle cx="160" cy="214" r="38" fill="#ffe28a"/>' + hills('#3f9f73', '#2f8f6a') + '<path d="M104 320 L150 232 L170 232 L226 320Z" fill="#f4c76a"/><path d="M140 320 L156 240 L164 240 L190 320Z" fill="#ffdf8f"/>'; break;
    case 'lantern': b = sky('#0f1244', '#2b2f7a') + stars(24) + '<circle cx="160" cy="170" r="84" fill="#ffd96b" opacity=".16"/><circle cx="160" cy="170" r="52" fill="#ffd96b" opacity=".26"/><path d="M160 70 Q160 90 160 102" stroke="#c8942a" stroke-width="5" fill="none"/><rect x="130" y="100" width="60" height="14" rx="5" fill="#c8942a"/><rect x="136" y="114" width="48" height="84" rx="12" fill="#ffd96b"/><rect x="130" y="196" width="60" height="14" rx="5" fill="#c8942a"/><g fill="#fff6a8"><circle cx="70" cy="230" r="4"/><circle cx="250" cy="210" r="4"/><circle cx="100" cy="270" r="3"/><circle cx="230" cy="260" r="3"/><circle cx="60" cy="150" r="3"/></g>' + hills('#1b2a66', '#13204f'); break;
    case 'river': b = sky('#9fe0f0', '#f6f7c8') + hills('#6fc58a', '#4fae78') + '<path d="M140 320 Q120 270 170 250 Q230 230 200 200 Q180 182 214 170" fill="none" stroke="#5bb8f0" stroke-width="30" stroke-linecap="round"/><g><rect x="46" y="178" width="14" height="50" fill="#7a4e2c"/><circle cx="53" cy="170" r="30" fill="#2f9a62"/><circle cx="44" cy="164" r="6" fill="#ff8fa3"/><circle cx="64" cy="176" r="6" fill="#ff8fa3"/><rect x="262" y="168" width="14" height="52" fill="#7a4e2c"/><circle cx="269" cy="160" r="32" fill="#2f9a62"/><circle cx="260" cy="154" r="6" fill="#ffd96b"/><circle cx="280" cy="168" r="6" fill="#ffd96b"/></g>'; break;
    case 'hourglass': b = sky('#3b2a7a', '#ff9a6a') + '<rect x="96" y="60" width="128" height="14" rx="6" fill="#c8942a"/><rect x="96" y="246" width="128" height="14" rx="6" fill="#c8942a"/><path d="M108 74 H212 Q212 140 170 160 Q212 180 212 246 H108 Q108 180 150 160 Q108 140 108 74Z" fill="#fff6e0" opacity=".28" stroke="#fff6e0" stroke-width="4"/><path d="M122 84 H198 Q196 128 160 150Z" fill="#ffd96b"/><path d="M130 246 Q160 204 190 246Z" fill="#ffd96b"/><line x1="160" y1="156" x2="160" y2="210" stroke="#ffd96b" stroke-width="3"/>'; break;
    case 'house': b = sky('#14164f', '#3a3896') + stars(26) + '<circle cx="250" cy="70" r="26" fill="#fff2c4"/>' + hills('#1b2a66', '#13204f') + '<rect x="110" y="190" width="100" height="72" fill="#7a4e7a"/><path d="M98 192 L160 140 L222 192Z" fill="#c8586e"/><rect x="128" y="208" width="24" height="26" rx="4" fill="#ffd96b"/><rect x="170" y="208" width="24" height="26" rx="4" fill="#ffd96b"/><rect x="148" y="236" width="24" height="26" rx="4" fill="#3a2860"/>'; break;
    default: b = sky('#12124a', '#2d2a86') + stars(26) + hills('#1d3b6b', '#14305a');
  }
  return '<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Picture">' + b + '</svg>';
}

/* ---------- the reading kid ---------- */
const ar9 = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const kidKind = () => (S.kid === 'girl' ? 'girl' : 'boy');
function kidSVG() {
  const k = kidKind(), d = (window.KIDIMG || {})[k]; if (!d) return '';
  const pos = o => 'left:' + o.x + '%;top:' + o.y + '%;width:' + o.w + '%;height:' + o.h + '%';
  return '<div class="kid ' + k + '" data-kid="' + k + '" role="img" aria-label="' + esc(t('kidAria')) + '"><div class="kmove">' +
    '<img class="kimg" alt="" draggable="false" src="' + d.img + '">' +
    d.mouth.map((m, i) => '<img class="km km' + (i + 1) + '" alt="" draggable="false" src="' + m.src + '" style="' + pos(m) + '">').join('') +
    '<img class="kb" alt="" draggable="false" src="' + d.blink.src + '" style="' + pos(d.blink) + '"></div></div>';
}
function bubbleHTML(v) {
  const words = v.ar.split(/\s+/).filter(Boolean);
  return words.map((w, i) => '<span class="sw" data-i="' + i + '">' + esc(w) + '</span>').join(' ') + '<span class="ayah-no2">﴿' + ar9(v.n) + '﴾</span>';
}
/* text scales with the stage (cqw) so it fits small stages too; rem is the fallback for old browsers */
const bubbleStyle = v => { const n = v.ar.split(/\s+/).filter(Boolean).length, z = n <= 6 ? [2, 9.2] : n <= 10 ? [1.6, 7.2] : n <= 16 ? [1.3, 5.8] : [1.1, 4.7]; return 'font-size:' + z[0] + 'rem;font-size:' + z[1] + 'cqw'; };
/* o.w = max width in px, o.tap = data-act for tapping the reader, o.v + o.open = bubble already popped with this ayah */
function stageHTML(s, a, o) {
  o = o || {};
  const w = o.w || 0;
  return '<div class="stage" data-stage="' + s + ':' + a + '" style="' + (w ? 'max-width:' + w + 'px;--stage-h:' + w + 'px' : '') + '">' +
    '<div class="sbwrap' + (o.open && o.v ? ' open' : '') + '"><div class="sbtxt ar" dir="rtl" style="' + (o.v ? bubbleStyle(o.v) : 'font-size:1.6rem') + '">' + (o.v ? bubbleHTML(o.v) : '') + '</div></div>' +
    '<div class="kidwrap"' + (o.tap ? ' data-act="' + o.tap + '" role="button" tabindex="0" aria-label="' + esc(t('kidTap')) + '"' : '') + '>' + kidSVG() + '</div></div>';
}
let kidRun = null;
function kidStop() {
  if (!kidRun) return;
  cancelAnimationFrame(kidRun.raf);
  const st = kidRun.stage; kidRun = null;
  const k = st && st.querySelector('.kid'); if (k) k.classList.remove('talking');
}
/* The kid recites the ayah: audio plays, mouth moves, the bubble pops and words light up in step with the sound. */
function kidRead(stageEl, v, o) {
  o = o || {};
  if (!stageEl || !v) return;
  stopAudio();
  const wrap = stageEl.querySelector('.sbwrap'), txt = stageEl.querySelector('.sbtxt');
  txt.setAttribute('style', bubbleStyle(v)); txt.innerHTML = bubbleHTML(v);
  wrap.classList.remove('open'); void wrap.offsetWidth; wrap.classList.add('open');
  const spans = [...txt.querySelectorAll('.sw')];
  const weights = spans.map(sp => 1 + sp.textContent.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '').length);
  const total = weights.reduce((x, y) => x + y, 0), cum = []; let acc = 0;
  weights.forEach((w, i) => { acc += w; cum[i] = acc; });
  const run = { stage: stageEl, raf: 0, started: performance.now(), fallback: false, dur: 0 };
  kidRun = run;
  const kidEl = () => stageEl.querySelector('.kid');
  if (kidEl()) kidEl().classList.add('talking');
  const paint = frac => {
    let k = -1; for (let i = 0; i < cum.length; i++) if (cum[i] / total <= frac + 1e-6) k = i;
    spans.forEach((sp, i) => { sp.classList.toggle('on', i <= k); sp.classList.toggle('now', i === k + 1 && frac < 1); });
    const cur = spans[Math.min(k + 1, spans.length - 1)];
    if (cur && txt.scrollHeight > txt.clientHeight + 2) txt.scrollTop = Math.max(0, cur.offsetTop - txt.clientHeight / 2);
  };
  const finish = () => {
    if (kidRun !== run) return;
    paint(1); kidRun = null;
    const k = kidEl(); if (k) k.classList.remove('talking');
    if (o.onEnd) o.onEnd();
  };
  const fall = () => { if (kidRun !== run || run.fallback) return; run.fallback = true; run.started = performance.now(); run.dur = Math.max(2500, spans.length * 650); };
  const frame = () => {
    if (kidRun !== run) return;
    let frac = 0;
    if (run.fallback) frac = (performance.now() - run.started) / run.dur;
    else if (audio.duration > 0 && isFinite(audio.duration)) frac = audio.currentTime / audio.duration;
    paint(Math.min(1, frac));
    if (frac >= 1) { finish(); return; }
    run.raf = requestAnimationFrame(frame);
  };
  const urls = [];
  const folder = (typeof KID_VOICE_FOLDER === 'string' && KID_VOICE_FOLDER) ? KID_VOICE_FOLDER : '';
  if (folder && v.key) { const p = v.key.split(':'); urls.push('https://everyayah.com/data/' + folder + '/' + pad(p[0]) + pad(p[1]) + '.mp3'); }
  urls.push(v.audio);
  let ui = 0;
  const start = () => {
    audio.onended = () => finish();
    audio.onerror = () => { if (kidRun !== run) return; ui++; if (ui < urls.length) start(); else { toast(t('audioErr')); fall(); } };
    audio.src = urls[ui];
    try { const p = audio.play(); if (p && p.catch) p.catch(err => { if (kidRun !== run || run.fallback || audio.error || (err && err.name === 'AbortError')) return; toast(t('audioErr')); fall(); }); } catch (e) { fall(); }
  };
  start();
  run.raf = requestAnimationFrame(frame);
}

/* ---------- speech recognition (opt-in) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const normW = w => w.replace(/ٱ/g, 'ا').replace(/[ً-ٰٟـۖ-ۭ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[ؤئ]/g, 'ء').replace(/[^ء-ي]/g, '');
function lev(a, b) {
  const m = a.length, n = b.length, d = [];
  for (let i = 0; i <= m; i++) { d[i] = [i]; }
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function close(a, b) {
  if (a === b) return true;
  const L = Math.min(a.length, b.length);
  if (L >= 7) return lev(a, b) <= 2;
  if (L >= 4) return lev(a, b) <= 1;
  return false;
}
function alignFrom(words, sp, start) {
  let j = start;
  return words.map(w => {
    const nw = normW(w); if (!nw) return true;
    for (let k = j; k < Math.min(sp.length, j + 3); k++) if (close(nw, sp[k])) { j = k + 1; return true; }
    return false;
  });
}
/* Tries every starting point in what was heard and keeps the best run, so a slip followed by a fresh, correct attempt still counts. */
function alignBest(words, spoken) {
  const sp = spoken.map(normW).filter(Boolean);
  let best = alignFrom(words, sp, 0), bestN = best.filter(Boolean).length;
  for (let st = 1; st < sp.length; st++) {
    const h = alignFrom(words, sp, st), n = h.filter(Boolean).length;
    if (n >= bestN) { best = h; bestN = n; }
  }
  return best;
}
const align = alignBest;
const MIC = { silenceMs: 10000, maxMs: 90000, restartMax: 12 };


/* ---------- accounts: sign-in screens ---------- */
const AUTH_ERR = { bad_email: 'eBadEmail', weak_password: 'eWeak', email_taken: 'eTaken', bad_login: 'eLogin', bad_code: 'eBadCode', locked: 'eLocked', slow_down: 'eSlow' };
const errText = j => t(AUTH_ERR[j && j.error] || 'eServer');
function authHTML() {
  const v = Auth.view, err = Auth.msg ? '<p class="err" role="alert">' + esc(Auth.msg) + '</p>' : '';
  const dis = Auth.busy ? ' disabled' : '';
  const back = '<div class="row"><button class="link" data-act="au-view" data-v="choose">' + esc(t('authBack')) + '</button></div>';
  const emailF = '<label class="fl">' + esc(t('email')) + '<input id="au-email" type="email" inputmode="email" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="254" value="' + esc(Auth.email) + '"></label>';
  const pwF = (id, label, ac) => '<label class="fl">' + esc(label) + '<input id="' + id + '" type="password" autocomplete="' + ac + '" maxlength="128"></label>';
  let body;
  if (v === 'login') {
    body = '<h2>' + esc(t('authLogin')) + '</h2><div class="gate authbox">' + emailF + pwF('au-pw', t('password'), 'current-password') + err +
      '<button class="btn big" data-act="au-go" data-k="login"' + dis + '>' + esc(t('authLogin')) + '</button></div>' +
      '<div class="row"><button class="link" data-act="au-view" data-v="recover">' + esc(t('authForgot')) + '</button></div>' + back;
  } else if (v === 'register') {
    body = '<h2>' + esc(t('authRegister')) + '</h2><div class="gate authbox">' + emailF + pwF('au-pw', t('password'), 'new-password') + '<small class="hint">' + esc(t('pwHint')) + '</small>' +
      '<label class="chk"><input id="au-ok" type="checkbox"><span>' + esc(t('parentOk')) + '</span></label>' +
      '<button class="link" data-act="au-privacy">' + esc(t('privacyLink')) + '</button>' + '<div class="privnote" id="privnote" hidden><b>' + esc(t('privacyTitle')) + '</b><p>' + esc(t('privacyText')) + '</p></div>' + err +
      '<button class="btn big" data-act="au-go" data-k="register"' + dis + '>' + esc(t('authRegister')) + '</button></div>' + back;
  } else if (v === 'recover') {
    body = '<h2>' + esc(t('recoverTitle')) + '</h2><div class="gate authbox">' + emailF +
      '<label class="fl">' + esc(t('recCode')) + '<input id="au-code" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="20" placeholder="XXXX-XXXX-XXXX"></label>' +
      pwF('au-pw', t('newPassword'), 'new-password') + '<small class="hint">' + esc(t('pwHint')) + '</small>' + err +
      '<button class="btn big" data-act="au-go" data-k="recover"' + dis + '>' + esc(t('recoverGo')) + '</button></div>' + back;
  } else if (v === 'code') {
    body = '<h2>' + esc(t('recSaveTitle')) + '</h2><div class="gate authbox"><p>' + esc(t('recSaveNote')) + '</p><div class="reccode" dir="ltr">' + esc(Auth.code) + '</div>' +
      '<div class="row"><button class="btn small ghost" data-act="au-copy">' + esc(t('recCopy')) + '</button></div>' +
      '<button class="btn big" data-act="au-codedone">' + esc(t('recDone')) + '</button></div>';
  } else {
    body = '<p class="sub" style="text-align:center">' + esc(t('authSub')) + '</p><div class="cta">' +
      '<button class="btn big" data-act="au-view" data-v="login">' + esc(t('authLogin')) + '</button>' +
      '<button class="btn big alt" data-act="au-view" data-v="register">' + esc(t('authRegister')) + '</button>' +
      '<button class="btn big ghost" data-act="au-guest">' + esc(t('authGuest')) + '</button></div><p class="hintline">' + esc(t('authGuestNote')) + '</p>';
  }
  const langs = '<div class="row"><select id="lang-sel" aria-label="' + esc(t('pLang')) + '"><option value="en"' + (S.lang === 'en' ? ' selected' : '') + '>English</option><option value="fr"' + (S.lang === 'fr' ? ' selected' : '') + '>Français</option><option value="ar"' + (S.lang === 'ar' ? ' selected' : '') + '>العربية</option></select></div>';
  const d = (window.KIDIMG || {});
  const faces = d.boy && d.girl ? '<div class="authfaces"><img alt="" src="' + d.boy.img + '"><img alt="" src="' + d.girl.img + '"></div>' : '';
  return '<main class="authwrap">' + faces + '<h1 class="authtitle">🌙 ' + esc(t('authTitle')) + '</h1>' + body + langs + '</main>';
}
function readAuthFields() { Auth.email = ($('#au-email') || {}).value || Auth.email; }
function showAuthErr(msg) {
  Auth.msg = msg; let e = $('.authbox .err');
  if (!e) { const b = $('.authbox [data-act="au-go"]'); if (!b) { render(); return; } e = document.createElement('p'); e.className = 'err'; e.setAttribute('role', 'alert'); b.parentNode.insertBefore(e, b); }
  e.textContent = msg;
}
const setBusy = on => { Auth.busy = on; $$('.authbox [data-act="au-go"]').forEach(b => { b.disabled = on; }); };
async function authGo(kind) {
  if (Auth.busy) return;
  readAuthFields();
  const email = Auth.email.trim(), pw = ($('#au-pw') || {}).value || '', code = ($('#au-code') || {}).value || '';
  if (!email) { showAuthErr(t('eBadEmail')); return; }
  if (!pw) { showAuthErr(t(kind === 'login' ? 'eLogin' : 'eWeak')); return; }
  if (kind === 'register' && !($('#au-ok') || {}).checked) { showAuthErr(t('eConsent')); return; }
  Auth.msg = ''; setBusy(true);
  let r;
  try {
    r = kind === 'login' ? await api('POST', '/api/login', { email, password: pw })
      : kind === 'register' ? await api('POST', '/api/register', { email, password: pw })
      : await api('POST', '/api/recover', { email, code, password: pw });
  } catch (e) { setBusy(false); showAuthErr(t('eNet')); return; }
  setBusy(false);
  if (r.status >= 200 && r.status < 300 && r.json.user) {
    enterAccount(r.json.user.email, true);
    if (r.json.recoveryCode) { Auth.code = r.json.recoveryCode; Auth.view = 'code'; Auth.gate = true; render(); pullState(); return; }
    Auth.view = 'choose'; render(); await pullState(); render(); return;
  }
  showAuthErr(errText(r.json));
}
const accountHTML = () => {
  const p = Auth.panel, msg = Auth.pmsg ? '<p class="' + (Auth.pmsg.startsWith('!') ? 'err' : 'okmsg') + '" role="status">' + esc(Auth.pmsg.replace(/^!/, '')) + '</p>' : '';
  if (!Auth.user) return '<div class="set"><b>' + esc(t('acctTitle')) + '</b><small>' + esc(t('acctGuest')) + '</small><div class="row"><button class="btn small" data-act="au-open">' + esc(t('acctMake')) + '</button></div></div>';
  const st = Auth.sync === 'ok' ? t('acctSynced') : Auth.sync === 'saving' ? t('acctSyncing') : t('acctOffline');
  const f = id => '<input id="' + id + '" type="password" maxlength="128" autocomplete="' + (id === 'pw-new' ? 'new-password' : 'current-password') + '">';
  const panel = p === 'pw' ? '<div class="gate authbox"><label class="fl">' + esc(t('acctCur')) + f('pw-cur') + '</label><label class="fl">' + esc(t('newPassword')) + f('pw-new') + '</label><small class="hint">' + esc(t('pwHint')) + '</small><div class="row"><button class="btn small" data-act="acct-pwgo">' + esc(t('save2')) + '</button><button class="btn small ghost" data-act="acct-panel" data-p="">' + esc(t('cancel')) + '</button></div></div>'
    : p === 'del' ? '<div class="gate authbox"><p>' + esc(t('acctDeleteAsk')) + '</p><label class="fl">' + esc(t('password')) + f('del-pw') + '</label><div class="row"><button class="btn small danger" data-act="acct-delgo">' + esc(t('acctDeleteGo')) + '</button><button class="btn small ghost" data-act="acct-panel" data-p="">' + esc(t('cancel')) + '</button></div></div>' : '';
  return '<div class="set"><b>' + esc(t('acctTitle')) + '</b><small>' + esc(t('acctSignedIn', { e: Auth.user.email })) + '</small><small>' + esc(st) + '</small>' + msg + panel +
    (p ? '' : '<div class="row"><button class="btn small ghost" data-act="acct-logout">' + esc(t('acctLogout')) + '</button><button class="btn small ghost" data-act="acct-panel" data-p="pw">' + esc(t('acctPw')) + '</button></div><div class="row"><button class="link" data-act="acct-panel" data-p="del">' + esc(t('acctDelete')) + '</button></div>') + '</div>';
};
async function acctAction(kind) {
  Auth.pmsg = '';
  try {
    if (kind === 'logout') {
      clearTimeout(Auth.timer); Auth.busy = false; await pushState(); try { await api('POST', '/api/logout', {}); } catch (e) {}
      leaveAccount(); toast(t('loggedOut')); render(); return;
    }
    if (kind === 'pw') {
      const cur = ($('#pw-cur') || {}).value || '', nw = ($('#pw-new') || {}).value || '';
      const r = await api('POST', '/api/password', { current: cur, password: nw });
      if (r.status === 200) { Auth.panel = ''; Auth.pmsg = t('acctPwDone'); } else Auth.pmsg = '!' + errText(r.json);
    }
    if (kind === 'del') {
      const pw = ($('#del-pw') || {}).value || '';
      const r = await api('DELETE', '/api/account', { password: pw });
      if (r.status === 200) { leaveAccount(); ls(GUEST_KEY, null); S = loadState(GUEST_KEY); toast(t('acctDeleted')); render(); return; }
      Auth.pmsg = '!' + errText(r.json);
    }
  } catch (e) { Auth.pmsg = '!' + t('eNet'); }
  renderMain();
}

/* ---------- views ---------- */
let view = 'home', gateOK = false, gate = null;
const stageNow = () => stageOf();

function render() {
  document.documentElement.lang = S.lang;
  document.documentElement.dir = t('dir');
  if (Auth.gate) { ov().hidden = true; $('#app').innerHTML = authHTML(); return; }
  const due = dueKeys().length;
  const PT = DT();
  const navs = [['home', '🏠', t('nHome')], ['learn', '📖', t('nLearn')], ['pray', '🕌', PT ? PT.ui.nPray : 'Pray'], ['review', '🔔', t('nReview')], ['parents', '👪', t('nParents')]];
  $('#app').innerHTML =
    '<header class="top"><div class="brand">🌙 ' + esc(t('appName')) + '</div><div class="starcount" aria-label="stars">⭐ ' + S.stars + '</div></header>' +
    '<main id="main"></main>' +
    '<footer class="credit"><span>' + esc(t('builtBy')) + ' ' + esc(AUTHORS) + '</span><span>' + esc(t('powered')) + '</span></footer>' +
    '<nav class="nav"><div class="nav-in">' + navs.map(n => '<button data-act="nav" data-v="' + n[0] + '" class="' + (view === n[0] ? 'on' : '') + '"><span class="ic">' + n[1] + '</span>' + esc(n[2]) + (n[0] === 'review' && due ? '<span class="dotbadge">' + due + '</span>' : '') + '</button>').join('') + '</div></nav>';
  renderMain();
}
function renderMain() {
  const m = $('#main'); if (!m) return;
  m.innerHTML = view === 'home' ? homeHTML() : view === 'learn' ? learnHTML() : view === 'pray' ? prayHTML() : view === 'review' ? reviewHomeHTML() : parentsHTML();
}


function tourHTML() {
  const d = window.KIDIMG || {}, k = Auth.tourKid, m = Auth.tourMode;
  const kid = (id, label) => '<button class="tourkid' + (k === id ? ' on' : '') + '" data-act="tourkid" data-k="' + id + '" aria-pressed="' + (k === id) + '">' + (d[id] ? '<img alt="" src="' + d[id].img + '">' : '') + '<span>' + (id === 'boy' ? '👦 ' : '👧 ') + esc(label) + '</span></button>';
  return '<section class="tour"><h2>' + esc(t('tourTitle')) + '</h2><p class="sub" style="text-align:center">' + esc(t('tourSub')) + '</p>' +
    '<div class="tourkids">' + kid('boy', t('kidBoy')) + kid('girl', t('kidGirl')) + '</div>' +
    '<div class="seg" role="group"><button data-act="tourage" data-m="little" class="' + (m === 'little' ? 'on' : '') + '">🐣 ' + esc(t('modeLittle')) + '</button><button data-act="tourage" data-m="big" class="' + (m === 'big' ? 'on' : '') + '">🚀 ' + esc(t('modeBig')) + '</button></div>' +
    '<div class="cta"><button class="btn big pulse" data-act="tourgo">' + esc(t('tourStart')) + '</button></div></section>';
}
function confetti() {
  try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
  const host = document.createElement('div'); host.className = 'confetti'; host.setAttribute('aria-hidden', 'true');
  const cols = ['#ffc857', '#7be0ad', '#ff8fa3', '#8fb8ff', '#fff6e0']; let h = '';
  for (let i = 0; i < 36; i++) h += '<i style="left:' + Math.round(rnd(0, 100)) + '%;background:' + cols[i % 5] + ';--dx:' + Math.round(rnd(-60, 60)) + 'px;--r:' + Math.round(rnd(200, 720)) + 'deg;animation-delay:' + rnd(0, .5).toFixed(2) + 's;animation-duration:' + rnd(1.6, 2.6).toFixed(2) + 's"></i>';
  host.innerHTML = h; document.body.appendChild(host); setTimeout(() => host.remove(), 3400);
}

function homeHTML() {
  if (!S.tour && !S.mode) return tourHTML();
  const st = stageNow(), due = dueKeys().length, tricky = trickyAyahs().length;
  const mood = (due > 0 && st >= 2) ? 'sleepy' : 'idle';
  const msg = st === 0 ? t('hiEgg') : mood === 'sleepy' ? t('hiSleepy') : t('hiGrow');
  const next = STAGE_AT[st + 1];
  const pct = next ? Math.round((S.stars - STAGE_AT[st]) / (next - STAGE_AT[st]) * 100) : 100;
  const chooser = S.mode ? '' : '<div class="modecard"><h3>' + esc(t('modeTitle')) + '</h3><div class="modes">' +
    '<button class="modebtn" data-act="setmode" data-m="little"><span class="em">🐣</span><span><b>' + esc(t('modeLittle')) + '</b><small>' + esc(t('modeLittleD')) + '</small></span></button>' +
    '<button class="modebtn" data-act="setmode" data-m="big"><span class="em">🚀</span><span><b>' + esc(t('modeBig')) + '</b><small>' + esc(t('modeBigD')) + '</small></span></button></div></div>';
  return '<section class="home"><div class="bubble">' + esc(msg) + '</div>' +
    '<div class="petwrap" id="petwrap" data-act="pet">' + petSVG(st, mood) + '</div>' +
    '<h2 class="pname">' + esc(t('stageNames')[st]) + '</h2>' +
    '<div class="meter" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div>' +
    '<p class="sub">' + esc(next ? (next - S.stars === 1 ? t('nextStage1') : t('nextStage', { n: next - S.stars })) : t('maxStage')) + '</p>' + chooser +
    '<div class="cta"><button class="btn big" data-act="learnnext">📖 ' + esc(t('learnNew')) + '</button>' +
    (due ? '<button class="btn big alt" data-act="gorev">🔔 ' + esc(t('reviewNow', { n: due })) + '</button>' : '') +
    (tricky ? '<button class="btn big ghost" data-act="gopractice">🎯 ' + esc(t('practice', { n: tricky })) + '</button>' : '') + '</div></section>';
}

function learnHTML() {
  const dueSet = new Set(dueKeys());
  return '<h2>' + esc(t('chooseSurah')) + '</h2>' + surahList().map(s =>
    '<article class="scard"><button class="shead" data-act="opensurah" data-s="' + s.n + '"><span class="sname">' + s.n + '. ' + esc(s.en) + '</span><span class="sar">' + s.ar + '</span><span class="scount">' + countDone(s.n) + '/' + s.c + '</span></button>' +
    '<div class="adots">' + Array.from({ length: s.c }, (_, i) => { const k = s.n + ':' + (i + 1); return '<button class="ad ' + (S.done[k] ? 'ok' : '') + (dueSet.has(k) ? ' due' : '') + '" data-act="openayah" data-s="' + s.n + '" data-a="' + (i + 1) + '" aria-label="' + esc(t('ayahWord')) + ' ' + (i + 1) + '">' + (i + 1) + '</button>'; }).join('') + '</div></article>').join('');
}
function reviewHomeHTML() {
  const due = dueKeys().length;
  return '<h2>' + esc(t('reviewTitle')) + '</h2>' + (due
    ? '<div class="home"><div class="petwrap" data-act="pet">' + petSVG(Math.max(2, stageNow()), 'sleepy') + '</div><p class="sub">' + esc(t('reviewNow', { n: due })) + '</p><div class="cta"><button class="btn big alt" data-act="gorev">🔔 ' + esc(t('reviewTitle')) + '</button></div></div>'
    : '<div class="home"><div class="petwrap" data-act="pet">' + petSVG(Math.max(2, stageNow()), 'idle') + '</div><p class="sub">' + esc(t('reviewEmpty')) + '</p></div>');
}
function parentsHTML() {
  if (!gateOK) {
    if (!gate) gate = { a: Math.floor(rnd(11, 30)), b: Math.floor(rnd(11, 30)), bad: false };
    return '<h2>' + esc(t('nParents')) + '</h2><div class="gate"><p>' + esc(t('gateQ', { a: gate.a, b: gate.b })) + '</p><input id="gate-in" inputmode="numeric" autocomplete="off" aria-label="answer">' + (gate.bad ? '<p class="err">' + esc(t('gateBad')) + '</p>' : '') + '<button class="btn big" data-act="gatego">' + esc(t('gateGo')) + '</button></div>';
  }
  const wk = weekData(), act = d => d.ayahs + d.reviews, maxAct = Math.max(1, ...wk.map(act));
  const tot = wk.reduce((x, d) => ({ ayahs: x.ayahs + d.ayahs, reviews: x.reviews + d.reviews, stars: x.stars + d.stars, days: x.days + (act(d) ? 1 : 0) }), { ayahs: 0, reviews: 0, stars: 0, days: 0 });
  const dn = d => d.d.toLocaleDateString(S.lang, { weekday: 'short' });
  const bars = wk.map(d => '<div class="bar"><i class="' + (act(d) ? '' : 'z') + '" style="height:' + (act(d) ? Math.max(10, Math.round(act(d) / maxAct * 100)) : 4) + '%"></i></div>').join('');
  const labs = wk.map(d => '<span>' + esc(dn(d)) + '</span>').join('');
  const aria = t('weekAria') + ': ' + wk.map(d => dn(d) + ' ' + act(d)).join(', ');
  const weak = Object.keys(S.weak).map(k => ({ k, n: trickyWords(k).length })).filter(x => x.n).sort((x, y) => y.n - x.n).slice(0, 6);
  const mode = MODE();
  return '<h2>' + esc(t('nParents')) + '</h2>' +
    '<div class="cta" style="margin-top:0"><button class="btn big alt" data-act="recite">🎙️ ' + esc(t('reciteToMe')) + '</button></div>' +
    '<div class="set" style="margin-top:14px"><b>' + esc(t('pStats')) + '</b><div class="stat"><span>' + esc(t('ayahsLearned')) + '</span><b>' + totalDone() + '</b></div><div class="stat"><span>' + esc(t('reviewsDue')) + '</span><b>' + dueKeys().length + '</b></div><div class="stat"><span>' + esc(t('streak')) + '</span><b>' + streakNow() + '</b></div></div>' +
    '<div class="set"><b>' + esc(t('weekTitle')) + '</b><div class="bars" role="img" aria-label="' + esc(aria) + '">' + bars + '</div><div class="barlab">' + labs + '</div>' +
      '<div class="stat"><span>' + esc(t('wAyahs')) + '</span><b>' + tot.ayahs + '</b></div><div class="stat"><span>' + esc(t('wReviews')) + '</span><b>' + tot.reviews + '</b></div><div class="stat"><span>' + esc(t('wStars')) + '</span><b>' + tot.stars + '</b></div><div class="stat"><span>' + esc(t('wDays')) + '</span><b>' + tot.days + '/7</b></div></div>' +
    '<div class="set"><b>' + esc(t('weakTitle')) + '</b>' + (weak.length ? weak.map(w => { const p = w.k.split(':'); return '<div class="stat"><span>' + esc(INFO[p[0]] ? INFO[p[0]].en : p[0]) + ' · ' + esc(t('ayahWord')) + ' ' + p[1] + '</span><b>' + esc(w.n === 1 ? t('trickyWord1') : t('trickyWordsN', { n: w.n })) + '</b></div>'; }).join('') : '<small>' + esc(t('weakNone')) + '</small>') + '</div>' +
    '<div class="set"><b>' + esc(t('pMode')) + '</b><div class="seg" role="group"><button data-act="setmode" data-m="little" class="' + (mode === 'little' ? 'on' : '') + '">' + esc(t('modeLittle')) + '</button><button data-act="setmode" data-m="big" class="' + (mode === 'big' ? 'on' : '') + '">' + esc(t('modeBig')) + '</button></div></div>' +
    '<div class="set"><label class="sw">' + esc(t('pSound')) + '<input type="checkbox" data-set="sound"' + (S.sound ? ' checked' : '') + '></label></div>' +
    '<div class="set"><label class="sw">' + esc(t('pMic')) + '<input type="checkbox" data-set="mic"' + (S.mic ? ' checked' : '') + (SR ? '' : ' disabled') + '></label><small>' + esc(t('pMicNote')) + '</small></div>' +
        '<div class="set"><label class="sw">' + esc(t('pMore')) + '<input type="checkbox" data-set="more"' + (S.more ? ' checked' : '') + '></label><small>' + esc(t('pMoreNote')) + '</small></div>' +
    '<div class="set"><label class="sw">' + esc(t('pLang')) + '<select id="lang-sel"><option value="en"' + (S.lang === 'en' ? ' selected' : '') + '>English</option><option value="fr"' + (S.lang === 'fr' ? ' selected' : '') + '>Français</option><option value="ar"' + (S.lang === 'ar' ? ' selected' : '') + '>العربية</option></select></label></div>' +
    accountHTML() +
    '<div class="set"><button class="btn ghost big" data-act="reset">' + esc(t('pReset')) + '</button></div>';
}

/* ---------- narrator: the phone's own voice reads instructions (never the Arabic phrases) ---------- */
const TTS = typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
const TTS_LANG = { en: 'en', fr: 'fr', ar: 'ar' };
function bestVoice(lang) {
  if (!TTS) return null;
  const vs = speechSynthesis.getVoices().filter(v => (v.lang || '').toLowerCase().replace('_', '-').startsWith(TTS_LANG[lang] || 'en'));
  if (!vs.length) return null;
  const score = v => { const n = v.name || ''; return (/natural|neural/i.test(n) ? 6 : 0) + (/online/i.test(n) ? 2 : 0) + (/premium|enhanced|siri/i.test(n) ? 4 : 0) + (/google/i.test(n) ? 3 : 0) + (v.localService === false ? 1 : 0) + ((v.lang || '').toLowerCase().startsWith(TTS_LANG[lang] + '-') ? 0.5 : 0); };
  return vs.sort((a, b) => score(b) - score(a))[0];
}
function speak(text) {
  if (!TTS || !text || S.narr === false || !S.sound) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text), v = bestVoice(S.lang);
    u.lang = v ? v.lang : (S.lang === 'ar' ? 'ar-SA' : S.lang === 'fr' ? 'fr-FR' : 'en-US'); if (v) u.voice = v;
    u.rate = S.lang === 'ar' ? .85 : .92; u.pitch = 1.05; u.volume = 1;
    speechSynthesis.speak(u);
  } catch (e) {}
}
const hush = () => { try { if (TTS) speechSynthesis.cancel(); } catch (e) {} };
if (TTS) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }

/* ---------- prayer corner: wudu, salah, rakats, prayer times ---------- */
let dn = null, og = null, rk = null;
const DT = () => (window.DEEN_TXT && (window.DEEN_TXT[S.lang] || window.DEEN_TXT.en)) || null;
const dt = (k, v) => { const T = DT(); let x = (T && T.ui[k]) || ''; if (v) Object.keys(v).forEach(n => { x = x.replace('{' + n + '}', v[n]); }); return x; };
const deenOf = k => Object.assign({ l: 0, b: 0 }, S.deen && S.deen[k]);
function deenSet(k, patch) { S.deen = S.deen || {}; S.deen[k] = Object.assign(deenOf(k), patch); }
/* faceless side-view figures facing right: standing, hands up, bowing, prostrating, sitting */
function poseSVG(p) {
  const F = {
    qiyam: { legs: [[60, 97], [60, 64]], torso: [[60, 64], [60, 34]], head: [60, 19], arms: [[60, 38], [69, 50], [58, 52]] },
    takbir: { legs: [[60, 97], [60, 64]], torso: [[60, 64], [60, 34]], head: [60, 19], arms: [[60, 38], [74, 34], [75, 20]] },
    ruku: { legs: [[48, 97], [48, 62]], torso: [[48, 62], [92, 56]], head: [104, 54], arms: [[88, 59], [52, 80]] },
    sujud: { legs: [[22, 97], [56, 97], [46, 66]], torso: [[46, 66], [88, 76]], head: [100, 87], arms: [[86, 78], [102, 97]] },
    sit: { legs: [[24, 97], [66, 97], [36, 82]], torso: [[36, 82], [41, 40]], head: [43, 27], arms: [[41, 46], [62, 84]] }
  }[p] || null; if (!F) return '';
  const L = (pts, w, c) => '<polyline points="' + pts.map(a => a.join(',')).join(' ') + '" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>';
  return '<svg viewBox="0 0 140 112" aria-hidden="true"><rect x="4" y="97" width="132" height="12" rx="6" fill="#2e8f6e"/><rect x="4" y="97" width="132" height="12" rx="6" fill="none" stroke="#ffc857" stroke-width="2"/>' +
    L(F.legs, 11, '#c9c4f2') + L(F.torso, 15, '#fff6e0') + L(F.arms, 8, '#fff6e0') + '<circle cx="' + F.head[0] + '" cy="' + F.head[1] + '" r="10" fill="#f2c9a0"/></svg>';
}
function prayHTML() {
  const T = DT(); if (!T) return '';
  const st = n => '<span class="pst">' + '⭐'.repeat(n) + '<i>' + '⭐'.repeat(3 - n) + '</i></span>';
  const card = (w, ic, title, desc, extra) => '<button class="pcard" data-act="dopen" data-w="' + w + '"><span class="pic">' + ic + '</span><b>' + esc(title) + '</b><small>' + esc(desc) + '</small>' + extra + '</button>';
  const tick = k => deenOf(k).l ? '<span class="pst">✅</span>' : '<span class="pst"><i>✅</i></span>';
  return '<h2>🕌 ' + esc(dt('title')) + '</h2><p class="sub">' + esc(dt('sub')) + '</p><div class="pgrid">' +
    card('learnwudu', '💧', dt('learnWudu'), dt('descWudu'), tick('wudu')) + card('gamewudu', '🎮', dt('gameWudu'), dt('descWudu'), st(deenOf('wudu').b)) +
    card('learnsalah', '🧎', dt('learnSalah'), dt('descSalah'), tick('salah')) + card('gamesalah', '🎮', dt('gameSalah'), dt('descSalah'), st(deenOf('salah').b)) +
    card('rakat', '🔢', dt('gameRakat'), dt('descRakat'), st(deenOf('rakat').b)) + card('times', '🌅', dt('gameTimes'), dt('descTimes'), st(deenOf('times').b)) +
    '</div><p class="hintline">' + esc(dt('note')) + '</p>';
}
const dnVisual = (kind, it, small) => kind === 'salah' ? '<div class="posebox' + (small ? ' sm' : '') + '" role="img" aria-label="' + esc(dt('pose')) + '">' + poseSVG(it.pose) + '</div>' : '<div class="bigic' + (small ? ' sm' : '') + '">' + it.ic + '</div>';
const deenHead = (n, i, right) => headHTML(Array.from({ length: n }, (_, j) => '<i class="dot ' + (j < i ? 'done' : j === i ? 'on' : '') + '"></i>').join(''), right || '');
function dnLearn() {
  const arr = DT()[dn.kind], i = dn.i, n = arr.length;
  if (dn.done) {
    showOv(headHTML('', '') + '<div class="bigic">🌟</div><p class="stepcap" style="font-size:1.4rem">' + esc(dt('learnedAll')) + '</p><div class="cta"><button class="btn big alt" data-act="dgo" data-w="game' + dn.kind + '">🎮 ' + esc(dt('playGame')) + '</button><button class="btn big ghost" data-act="lclose">' + esc(dt('done')) + '</button></div>');
    return;
  }
  const it = arr[i], last = i === n - 1;
  const phrase = it.ar ? '<div class="phrasebox"><small>' + esc(dt('saySo')) + '</small><div class="phrase" dir="rtl" lang="ar">' + esc(it.ar) + '</div></div>' : '';
  const end = last && dn.kind === 'wudu' ? '<div class="phrasebox"><small>' + esc(dt('wuduEnd')) + '</small><div class="phrase" dir="rtl" lang="ar">أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</div><p class="sub" style="text-align:center">' + esc(dt('wuduEndEn')) + '</p></div>' : '';
  const narr = TTS ? '<div class="row" style="margin-top:0"><button class="btn small ghost" data-act="narrtoggle" aria-pressed="' + (S.narr !== false) + '">' + (S.narr !== false ? '🔊 ' + esc(dt('narrOn')) : '🔇 ' + esc(dt('narrOff'))) + '</button>' + (S.narr !== false ? '<button class="btn small alt" data-act="narrsay">🔁 ' + esc(dt('listen')) + '</button>' : '') + '</div>' : '';
  const rec2 = it.aud ? '<div class="row"><button class="btn small alt" data-act="reciter" data-u="' + it.aud + '">🎧 ' + esc(dt('hear')) + '</button></div>' : '';
  showOv(deenHead(n, i, dt('stepOf', { i: i + 1, n })) + narr + dnVisual(dn.kind, it) + '<h3 class="dtitle">' + (i + 1) + '. ' + esc(it.t) + '</h3><p class="ddesc">' + esc(it.d) + '</p>' + phrase + rec2 + end +
    '<div class="row">' + (i > 0 ? '<button class="btn ghost" data-act="dnprev">‹ ' + esc(dt('prev')) + '</button>' : '') + '<button class="btn big" data-act="dnnext">' + esc(last ? dt('done') : dt('next')) + ' ›</button></div>');
  speak(it.t + '. ' + it.d);
}
function ogRender() {
  const T = DT(), arr = T[og.kind], n = arr.length;
  const chosen = arr.slice(0, og.next).map((it, i) => '<span class="ochip">' + (i + 1) + ' ' + (it.ic || '🧎') + '</span>').join('');
  const cards = og.order.filter(i => i >= og.next).map(i => {
    const it = arr[i], cls = 'ocard' + (og.shake === i ? ' shake' : '') + (og.hint === i ? ' hint' : '');
    return '<button class="' + cls + '" data-act="ogpick" data-i="' + i + '">' + dnVisual(og.kind, it, true) + '<b>' + esc(it.n || it.t) + '</b>' + (og.kind === 'times' ? '<small>' + esc(it.d) + '</small>' : '') + '</button>';
  }).join('');
  showOv(deenHead(n, og.next) + '<p class="stepcap">' + esc(dt(og.kind === 'times' ? 'orderTimes' : 'order')) + '</p><div class="chosen" aria-live="polite">' + (chosen || '&nbsp;') + '</div><div class="ogrid">' + cards + '</div>');
  og.shake = -1;
}
function deenResult(key, miss, againAct) {
  const stars = miss === 0 ? 3 : miss <= 2 ? 2 : 1, prev = deenOf(key).b, gain = Math.max(0, stars - prev);
  if (gain) { S.stars += gain; addLog('stars', gain); }
  deenSet(key, { b: Math.max(prev, stars) }); bumpStreak(); save(); fanfare(); if (stars >= 2) confetti();
  showOv(headHTML('', '') + '<div class="res"><div class="big-stars" role="img" aria-label="' + esc(starsTxt(stars)) + '">' + '⭐'.repeat(stars) + '</div><p class="stepcap" style="font-size:1.4rem">' + esc(dt('wellDone')) + '</p><p class="stepcap">' + esc(gain ? dt('gained', { n: gain }) : dt('noNew')) + '</p></div>' +
    '<div class="cta"><button class="btn big alt" data-act="' + againAct + '">↻ ' + esc(dt('again')) + '</button><button class="btn big ghost" data-act="lclose">' + esc(dt('done')) + '</button></div>');
}
function rkRender() {
  const T = DT(), arr = T.times, it = arr[rk.order[rk.i]], n = arr.length;
  showOv(deenHead(n, rk.i, dt('round', { i: rk.i + 1, n })) + '<div class="bigic">' + it.ic + '</div><h3 class="dtitle">' + esc(dt('rakatQ', { p: it.n })) + '</h3>' +
    '<div class="rkopts">' + [2, 3, 4].map(k => '<button class="ropt' + (rk.shake === k ? ' shake' : '') + '" data-act="rkpick" data-n="' + k + '"><b>' + k + '</b><small>' + esc(dt('rakats')) + '</small></button>').join('') + '</div>');
  rk.shake = 0;
  speak(dt('rakatQ', { p: it.n }));
}
function deenOpen(w) {
  stopAudio();
  if (w === 'learnwudu' || w === 'learnsalah') { dn = { kind: w === 'learnwudu' ? 'wudu' : 'salah', i: 0, done: false }; og = rk = null; dnLearn(); }
  else if (w === 'gamewudu' || w === 'gamesalah' || w === 'times') { const kind = w === 'times' ? 'times' : w === 'gamewudu' ? 'wudu' : 'salah'; const n = DT()[kind].length; let ord; do { ord = shuffle(Array.from({ length: n }, (_, i) => i)); } while (ord.every((v, i) => v === i)); og = { kind, order: ord, next: 0, miss: 0, streak: 0, shake: -1, hint: -1 }; dn = rk = null; ogRender(); speak(dt(kind === 'times' ? 'orderTimes' : 'order')); }
  else if (w === 'rakat') { rk = { order: shuffle([0, 1, 2, 3, 4]), i: 0, miss: 0, shake: 0 }; dn = og = null; rkRender(); }
}

/* ---------- overlay plumbing ---------- */
const ov = () => $('#ov');
let lesson = null, review = null, rec = null, drill = null, pr = null;
function showOv(html) { const o = ov(); o.hidden = false; o.innerHTML = '<div class="ovin">' + html + '</div>'; o.scrollTop = 0; }
function closeOv() { stopAudio(); if (rec) { rec.destroy(); rec = null; } dn = og = rk = null; lesson = null; review = null; drill = null; pr = null; const o = ov(); o.hidden = true; o.innerHTML = ''; render(); }
const loadingHTML = () => '<p class="stepcap" style="margin-top:40vh">' + esc(t('loading')) + '</p>';
function errHTML(retryAct) { return '<div class="lhead"><button class="x" data-act="lclose" aria-label="' + esc(t('close')) + '">✕</button></div><p class="stepcap" style="margin-top:30vh">' + esc(t('loadErr')) + '</p><div class="row"><button class="btn" data-act="' + retryAct + '">' + esc(t('retry')) + '</button></div>'; }
const headHTML = (dots, right) => '<div class="lhead"><button class="x" data-act="lclose" aria-label="' + esc(t('close')) + '">✕</button><div class="dots">' + dots + '</div><div class="lsurah">' + esc(right) + '</div></div>';

/* ---------- recite component ---------- */
function mountRecite(box, o) {
  const words = o.words, useMic = !!(S.mic && SR);
  let hits = words.map(() => false), r = null, listening = false, finished = false, lastHits = hits;
  let slipN = 0, lastTotal = 0, lastHitN = 0, bestN = 0, slipped = false, hadSlip = false, coachT = 0;
  const kidNode = () => $('.stage .kid');
  function coach(kind) {
    const el = $('.coach', box), k = kidNode(), txt = kind === 'oops' ? 'coachOops' : kind === 'fixed' ? 'coachFixed' : kind === 'cheer' ? 'coachCheer' : 'coachGood';
    if (el) el.textContent = t(txt);
    if (k) { k.classList.remove('oops', 'cheer'); void k.offsetWidth; k.classList.add(kind === 'oops' ? 'oops' : 'cheer'); clearTimeout(coachT); coachT = setTimeout(() => k.classList.remove('oops', 'cheer'), 1900); }
    if (kind === 'oops') tone(196, .25, 'sine', .08); else chime(kind === 'good' ? 2 : 4);
  }
  let committed = '', sessionText = '', stopping = false, skipCommit = false, restarts = 0, t0 = 0, lastSound = 0, timer = 0;
  const petRoot = o.petRoot;
  const destroy = () => { clearInterval(timer); timer = 0; try { if (r) { r.onend = null; r.onerror = null; r.onresult = null; r.abort(); } } catch (e) {} r = null; };
  const wordsHTML = vis => '<div class="rwords ar' + (vis === 'cover' ? ' cover' : '') + '" dir="rtl"' + (vis === 'hidden' ? ' hidden' : '') + '>' + words.map((w, i) => '<span class="rw" data-i="' + i + '">' + esc(w) + '</span>').join(' ') + '</div>';
  const base = () => (o.showWords ? 'show' : 'hidden');
  function paint() { $$('.rw', box).forEach((el, i) => el.classList.toggle('hit', !!hits[i])); }
  function idle() {
    setPetMood(petRoot, 'idle');
    let ctl;
    if (useMic) ctl = '<button class="micbtn" data-r="start" aria-label="' + esc(t('recite')) + '">🎤</button><p class="hintline">' + esc(t('recite')) + '</p>';
    else if (o.manual === 'faces') ctl = '<div class="row"><button class="btn" data-r="show">' + esc(t('show')) + '</button></div>';
    else ctl = '<div class="row"><button class="btn" data-r="said">⭐ ' + esc(t('said')) + '</button></div><p class="hintline">' + esc(t('sayAloud')) + '</p>';
    if (!S.mic && SR) ctl += '<div class="row"><button class="link" data-r="gate">' + esc(t('micOn')) + '</button></div>';
    box.innerHTML = wordsHTML(base()) + ctl; paint(); bind();
  }
  function refresh() {
    const sp = (committed + ' ' + sessionText).trim().split(/\s+/).filter(Boolean);
    hits = alignBest(words, sp); lastHits = hits; paint();
    const n = hits.filter(Boolean).length;
    if (sp.length > lastTotal) { if (n <= lastHitN) slipN++; else slipN = 0; }
    lastTotal = sp.length; lastHitN = n;
    if (n > bestN) { bestN = n; if (slipped && n < words.length) { slipped = false; coach('good'); } }
    if (!slipped && slipN >= 3 && n < words.length) { slipped = true; hadSlip = true; slipN = 0; coach('oops'); }
    if (hits.every(Boolean)) { coach(hadSlip ? 'fixed' : 'cheer'); stopListen(); }
  }
  function startSession() {
    sessionText = '';
    const me = r = new SR(); me.lang = 'ar-SA'; me.continuous = true; me.interimResults = true; me.maxAlternatives = 1;
    me.onresult = ev => {
      if (r !== me) return;
      let all = ''; for (let i = 0; i < ev.results.length; i++) all += ' ' + ev.results[i][0].transcript;
      sessionText = all; lastSound = Date.now(); refresh();
    };
    me.onerror = ev => { if (ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed' || ev.error === 'audio-capture')) { toast(t('micErr')); listening = false; destroy(); S.mic = false; save(); idle(); } };
    /* the browser ends a session by itself after a pause: keep what was heard and start a new one, so a corrected try is still heard */
    me.onend = () => {
      if (r !== me || !listening || stopping) return;
      if (skipCommit) { skipCommit = false; } else committed += ' ' + sessionText;
      sessionText = '';
      if (++restarts > MIC.restartMax) { done(); return; }
      setTimeout(() => { if (r === me && listening && !stopping) { try { startSession(); } catch (e) { done(); } } }, 250);
    };
    me.start();
  }
  function listen() {
    hits = words.map(() => false); lastHits = hits; listening = true; finished = false;
    committed = ''; sessionText = ''; stopping = false; skipCommit = false; restarts = 0; t0 = lastSound = Date.now();
    slipN = 0; lastTotal = 0; lastHitN = 0; bestN = 0; slipped = false; hadSlip = false;
    setPetMood(petRoot, 'listen');
    box.innerHTML = wordsHTML(o.showWords ? 'show' : o.cover ? 'cover' : 'hidden') + '<button class="micbtn on" data-r="stop" aria-label="' + esc(t('stop')) + '">⏹</button><p class="hintline">' + esc(t('listening')) + '</p><p class="coach" id="coach" aria-live="polite"></p><p class="hintline small">' + esc(t('slipHint')) + '</p><div class="row"><button class="btn ghost" data-r="over">↻ ' + esc(t('startOver')) + '</button></div>'; paint(); bind();
    try {
      startSession();
      timer = setInterval(() => {
        const now = Date.now();
        if (now - t0 > MIC.maxMs || now - lastSound > MIC.silenceMs) stopListen();
      }, 400);
    } catch (e) { toast(t('micErr')); listening = false; destroy(); S.mic = false; save(); idle(); }
  }
  function startOver() {
    committed = ''; sessionText = ''; hits = words.map(() => false); lastHits = hits; paint(); lastSound = Date.now();
    slipN = 0; lastTotal = 0; lastHitN = 0; bestN = 0; slipped = false;
    { const c = $('.coach', box); if (c) c.textContent = ''; }
    skipCommit = true; try { if (r) r.abort(); } catch (e) {}
  }
  function stopListen() { stopping = true; clearInterval(timer); timer = 0; try { if (r) r.stop(); } catch (e) {} setTimeout(() => { if (listening) done(); }, 400); }
  function noHear() {
    setPetMood(petRoot, 'idle');
    box.innerHTML = wordsHTML(base()) + '<p class="stepcap">' + esc(t('noHear')) + '</p><div class="row"><button class="btn" data-r="start">🎤 ' + esc(t('tryAgain')) + '</button><button class="btn ghost" data-r="self">' + esc(t('rateSelf')) + '</button></div>';
    bind();
  }
  function done() {
    if (finished) return; finished = true; listening = false; destroy();
    const cov = lastHits.filter(Boolean).length / words.length;
    if (cov < .15) { finished = false; noHear(); return; }
    const missed = [];
    lastHits.forEach((h, i) => { if (!h) missed.push(i); });
    const blame = cov < .9 ? missed : [];
    if (o.key && blame.length) { const w = S.weak[o.key] = S.weak[o.key] || {}; blame.forEach(i => { const j = i + (o.offset || 0); w[j] = (w[j] || 0) + 1; }); save(); }
    const stars = cov >= .9 ? 3 : cov >= .7 ? 2 : 1;
    result({ cov, stars, rating: cov >= .85 ? 'easy' : cov >= .5 ? 'shaky' : 'forgot', mic: true, missed: blame });
  }
  function result(res) {
    setPetMood(petRoot, res.stars >= 2 ? 'happy' : 'idle');
    if (o.onResult) o.onResult(res);
    if (res.stars >= 2) { fanfare(); confetti(); const k = kidNode(); if (k) { k.classList.add('cheer'); setTimeout(() => k.classList.remove('cheer'), 1800); } } else chime(1);
    const msg = res.stars === 3 ? t('resultGreat') : res.stars === 2 ? t('resultGood') : t('resultAgain');
    const missed = new Set(res.missed || []);
    box.innerHTML = wordsHTML('show') +
      '<div class="res"><div class="big-stars" aria-label="' + res.stars + ' stars">' + '⭐'.repeat(res.stars) + '<span style="opacity:.25">' + '⭐'.repeat(3 - res.stars) + '</span></div><p class="stepcap">' + esc(msg) + '</p>' +
      (missed.size ? '<p class="sub" style="text-align:center">' + esc(t('missedNote', { n: missed.size })) + '</p>' : '') + '</div>' +
      '<div class="row">' + (res.stars < 2 && o.mode === 'learn' ? '<button class="btn ghost" data-r="again">' + esc(t('again')) + '</button>' : '') + '<button class="btn" data-r="finish">' + esc(t('cont')) + '</button></div>';
    $$('.rw', box).forEach((el, i) => el.classList.add(missed.has(i) ? 'miss' : 'hit'));
    bind(); box._res = res;
  }
  function faces() {
    setPetMood(petRoot, 'idle');
    box.innerHTML = wordsHTML('show') + '<div class="faces">' +
      '<button class="face easy" data-r="rate" data-v="easy"><span>😄</span>' + esc(t('rEasy')) + '</button>' +
      '<button class="face shaky" data-r="rate" data-v="shaky"><span>🙂</span>' + esc(t('rAlmost')) + '</button>' +
      '<button class="face again" data-r="rate" data-v="forgot"><span>😕</span>' + esc(t('rAgain')) + '</button></div>';
    $$('.rw', box).forEach(el => el.classList.add('hit')); bind();
  }
  function bind() {
    $$('[data-r]', box).forEach(b => b.onclick = () => {
      const a = b.dataset.r;
      if (a === 'start') listen();
      else if (a === 'stop') stopListen();
      else if (a === 'over') startOver();
      else if (a === 'said') { if (o.quick) { chime(3); o.onFinish({ cov: null, stars: 2, rating: 'shaky', mic: false }); } else result({ cov: null, stars: 2, rating: 'shaky', mic: false }); }
      else if (a === 'show') { if (o.onReveal) o.onReveal(); faces(); }
      else if (a === 'self') { if (o.onReveal) o.onReveal(); faces(); }
      else if (a === 'rate') { const v = b.dataset.v; const res = { cov: null, stars: v === 'easy' ? 3 : v === 'shaky' ? 2 : 1, rating: v, mic: false }; setPetMood(petRoot, v === 'forgot' ? 'idle' : 'happy'); if (v !== 'forgot') chime(3); o.onFinish(res); }
      else if (a === 'again') idle();
      else if (a === 'finish') o.onFinish(box._res);
      else if (a === 'gate') { view = 'parents'; gateOK = false; gate = null; closeOv(); }
    });
  }
  idle();
  return { destroy: () => { listening = false; destroy(); } };
}

/* ---------- lesson ---------- */
function noteWeak(s, a, idxs) { const k = s + ':' + a, w = S.weak[k] = S.weak[k] || {}; idxs.forEach(i => { w[i] = (w[i] || 0) + 1; }); save(); }

/* which words to hide: the child's tricky ones first, then a steady spread */
function pickBlanks(L) {
  const n = L.words.length; if (n <= 1) return [0];
  const want = Math.max(1, Math.min(n - 1, Math.round(n * 0.4)));
  const weak = trickyWords(L.s + ':' + L.a).filter(i => i < n);
  const rest = L.words.map((w, i) => i).filter(i => !weak.includes(i)).map(i => [hash(L.s + ':' + L.a + ':' + i), i]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  return weak.concat(rest).slice(0, want).sort((x, y) => x - y);
}

/* fill-the-blanks game, used by the 8-12 lesson and by the tricky-word drills */
function mountBlanks(box, o) {
  const words = o.words, order = o.hidden.slice().sort((x, y) => x - y), hiddenSet = new Set(order);
  let p = 0, wrongRun = 0;
  const sv = cache[o.s], pool = [];
  const nset = new Set(words.map(normW));
  if (sv) sv.verses.forEach(v => { if (v.n !== o.a) wordsOf(v).forEach(w => { const nw = normW(w); if (!nset.has(nw)) { nset.add(nw); pool.push(w); } }); });
  const distract = shuffle(pool).slice(0, order.length > 1 ? 2 : 1);
  const opts = shuffle(order.map(i => ({ w: words[i] })).concat(distract.map(w => ({ w, d: 1 }))));
  function draw() {
    box.innerHTML = '<div class="bverse">' + words.map((w, i) => hiddenSet.has(i) ? '<span class="bl' + (order.indexOf(i) < p ? ' fill' : order[p] === i ? ' cur' : '') + '" data-i="' + i + '">' + esc(w) + '</span>' : '<span class="bw">' + esc(w) + '</span>').join(' ') + '</div>' +
      '<div class="tray">' + opts.map((x, j) => '<button class="topt' + (x.used ? ' gone' : '') + '" data-j="' + j + '">' + esc(x.w) + '</button>').join('') + '</div>';
    $$('.topt', box).forEach(b => { b.onclick = () => tap(+b.dataset.j, b); });
  }
  function tap(j, btn) {
    const x = opts[j], target = words[order[p]];
    if (x.used) return;
    if (x.w === target) {
      x.used = true; chime(p); p++; wrongRun = 0;
      draw();
      if (p >= order.length) setTimeout(() => { if (o.onDone) o.onDone(); }, 700);
    } else {
      tone(196, .25, 'sine', .08);
      btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
      if (o.onWrong) o.onWrong(order[p]);
      wrongRun++;
      if (wrongRun >= 2) $$('.topt', box).forEach((b, jj) => { if (opts[jj].w === target && !opts[jj].used) b.classList.add('help'); });
    }
  }
  draw();
  return { destroy: () => {} };
}

function echoParts(words) {
  const n = words.length, k = Math.min(3, Math.max(1, Math.ceil(n / 4))), out = []; let i = 0;
  for (let p = 0; p < k; p++) { const size = Math.ceil((n - i) / (k - p)); out.push({ i, n: size, words: words.slice(i, i + size) }); i += size; }
  return out;
}
async function openLesson(s, a, opts) {
  showOv(loadingHTML());
  try { await getSurah(s); } catch (e) { showOv(errHTML('retrylesson')); lesson = { s, a, failed: true }; return; }
  const v = verseOf(s, a); if (!v) { closeOv(); return; }
  const big = MODE() === 'big', words = wordsOf(v), n = words.length;
  const size = big ? Math.max(1, Math.min(3, Math.ceil(n / 8))) : Math.max(1, Math.min(4, Math.ceil(n / 6))), chunks = [];
  for (let i = 0; i < n; i += size) chunks.push({ i, n: Math.min(size, n - i), text: words.slice(i, i + size).join(' ') });
  lesson = { s, a, big, steps: big ? ['look', 'fly', 'blanks', 'echo', 'recite'] : ['look', 'fly', 'echo', 'recite'], echoParts: echoParts(words), echoI: 0, step: 0, round: 1, next: 0, wrong: 0, wrongRun: 0, help: null, words, chunks, pos: null, stageBefore: stageNow() };
  if (opts && opts.auto) lesson.auto = true;
  renderLesson();
}
const stepOf = L => L.steps[L.step] || 'done';
const dotsFor = L => L.steps.map((_, i) => '<i class="dot ' + (i < L.step ? 'done' : i === L.step ? 'on' : '') + '"></i>').join('');
function renderLesson() {
  const L = lesson, v = L && verseOf(L.s, L.a); if (!L || !v) return;
  if (rec) { rec.destroy(); rec = null; }
  stopAudio();
  const sn = stepOf(L), head = headHTML(dotsFor(L), INFO[L.s].en + ' · ' + L.a);
  if (sn === 'look') {
    showOv(head + '<p class="stepcap">' + esc(t('step1')) + '</p>' + stageHTML(L.s, L.a, { w: L.big ? 320 : 340, tap: 'llisten', v, open: true }) +
      (v.tl ? '<p class="tl">' + esc(v.tl) + '</p>' : '') + (L.big && v.tr ? '<p class="tr">' + esc(v.tr) + '</p>' : '') +
      '<p class="hintline">' + esc(t('kidHint')) + '</p>' +
      '<div class="row"><button class="btn alt pulse" data-act="llisten" id="lis">' + esc(t('listen')) + '</button></div>' +
      '<div class="row"><div class="seg kidpick" role="group" aria-label="' + esc(t('kidAria')) + '"><button data-act="setkid" data-k="boy" class="' + (kidKind() === 'boy' ? 'on' : '') + '">👦 ' + esc(t('kidBoy')) + '</button><button data-act="setkid" data-k="girl" class="' + (kidKind() === 'girl' ? 'on' : '') + '">👧 ' + esc(t('kidGirl')) + '</button></div></div>' +
      '<div class="row"><button class="btn big" data-act="lnext" id="lnext">' + esc(t('next')) + '</button></div>');
    if (L.auto) { L.auto = false; try { kidRead($('.stage'), v, { onEnd: () => { const n = $('#lnext'); if (n) n.classList.add('pulse'); } }); } catch (e) {} }
  } else if (sn === 'fly') {
    const n = L.chunks.length, cols = 2, rows = Math.ceil(n / cols);
    if (!L.pos) {
      const cells = shuffle(Array.from({ length: rows * cols }, (_, i) => i)).slice(0, n);
      L.pos = L.chunks.map((c, idx) => { const cell = cells[idx], cx = cell % cols, cy = Math.floor(cell / cols); return { x: (cx + .5) / cols * 100 + rnd(-8, 8), y: (cy + .5) / rows * 100 + rnd(-6, 6), d: rnd(3.5, 6.5).toFixed(1), dx: Math.round(rnd(-14, 14)) + 'px', dy: Math.round(rnd(-16, 16)) + 'px' }; });
    }
    showOv(head + '<p class="stepcap">' + esc(t(L.round === 1 ? 'round1' : 'round2')) + '</p>' +
      '<div class="slots" dir="rtl">' + L.chunks.map((c, i) => '<span class="slot' + (i < L.next ? ' filled' : '') + '" data-i="' + i + '">' + (i < L.next ? esc(c.text) : (L.round === 1 ? '<em>' + esc(c.text) + '</em>' : '···')) + '</span>').join('') + '</div>' +
      '<div class="field" id="field" style="height:' + Math.max(300, rows * 96) + 'px">' + L.chunks.map((c, i) => i < L.next ? '' : '<button class="fly" data-act="fly" data-i="' + i + '" style="left:' + L.pos[i].x.toFixed(1) + '%;top:' + L.pos[i].y.toFixed(1) + '%;--d:' + L.pos[i].d + 's;--dx:' + L.pos[i].dx + ';--dy:' + L.pos[i].dy + '">' + esc(c.text) + '</button>').join('') + '</div>' +
      '<p class="hintline">' + esc(t('flyHint')) + '</p>');
    updateGlow();
  } else if (sn === 'blanks') {
    const hidden = pickBlanks(L);
    showOv(head + '<p class="stepcap">' + esc(t('blanksTitle')) + '</p><div id="bbox"></div><p class="hintline">' + esc(t('blanksHint')) + '</p>' +
      '<div class="row"><button class="btn ghost small" data-act="llisten">' + esc(t('listen')) + '</button></div>');
    rec = mountBlanks($('#bbox'), { s: L.s, a: L.a, words: L.words, hidden, onWrong: idx => noteWeak(L.s, L.a, [idx]), onDone: () => { if (lesson === L) { L.step++; renderLesson(); } } });
  } else if (sn === 'echo') {
    if (window.__noorSkipEcho) { L.step++; renderLesson(); return; } // test hook only
    const parts = L.echoParts, i = Math.min(L.echoI || 0, parts.length - 1), p = parts[i];
    showOv(head + '<p class="stepcap">' + esc(t('stepEcho')) + '</p>' + stageHTML(L.s, L.a, { w: 250, tap: 'llisten' }) +
      '<p class="hintline">' + esc(t('echoPart', { i: i + 1, n: parts.length })) + '</p>' +
      '<div class="row"><button class="btn alt small" data-act="llisten">' + esc(t('echoHear')) + '</button></div><div id="recbox"></div>');
    rec = mountRecite($('#recbox'), { words: p.words, showWords: true, manual: 'said', quick: true, mode: 'echo', onFinish: () => { if (lesson !== L) return; L.echoI = i + 1; if (L.echoI >= parts.length) { L.echoI = 0; L.step++; } renderLesson(); } });
  } else if (sn === 'recite') {
    const big = L.big;
    showOv(head + '<div class="petmini" id="pm">' + petSVG(stageNow(), 'idle') + '</div><p class="stepcap">' + esc(t('step3')) + '</p>' + stageHTML(L.s, L.a, { w: 200 }) + '<div id="recbox"></div>');
    rec = mountRecite($('#recbox'), { words: L.words, key: L.s + ':' + L.a, showWords: !big, cover: big, manual: big ? 'faces' : 'said', mode: 'learn', petRoot: $('#pm'), onFinish: res => finishLesson(res.stars) });
  } else {
    const grew = stageNow() > L.stageBefore, hasNext = L.a < INFO[L.s].c, tricky = trickyWords(L.s + ':' + L.a).length;
    let burst = ''; for (let i = 0; i < 14; i++) burst += '<i style="--x:' + Math.round(rnd(-150, 150)) + 'px;--y:' + Math.round(rnd(-120, 160)) + 'px;--r:' + Math.round(rnd(-200, 200)) + 'deg">⭐</i>';
    showOv(headHTML(dotsFor(L), INFO[L.s].en + ' · ' + L.a) + '<div class="burst">' + burst + '</div><div class="petmini" style="width:220px;margin-top:30px">' + petSVG(stageNow(), 'happy') + '</div>' +
      '<p class="stepcap" style="font-size:1.6rem">' + esc(starsTxt(L.earned)) + '</p>' + (grew ? '<p class="stepcap" style="color:var(--saffron)">' + esc(t('grew')) + ' ✨</p>' : '') +
      '<div class="cta">' + (hasNext ? '<button class="btn big" data-act="lnextayah">' + esc(t('nextAyah')) + '</button>' : '') +
      (tricky ? '<button class="btn big alt" data-act="gopractice">🎯 ' + esc(t('practice', { n: 1 })) + '</button>' : '') +
      '<button class="btn big ghost" data-act="lclose">' + esc(t('toMap')) + '</button></div>');
    fanfare(); confetti();
  }
}
const chunkWeak = (L, i) => { const w = S.weak[L.s + ':' + L.a] || {}, c = L.chunks[i]; let m = 0; for (let j = c.i; j < c.i + c.n; j++) m = Math.max(m, w[j] || 0); return m; };
function updateGlow() {
  const L = lesson; if (!L || stepOf(L) !== 'fly') return;
  $$('.fly').forEach(f => {
    const i = +f.dataset.i, isNext = i === L.next;
    f.classList.toggle('glow', isNext && (L.round === 1 || L.help === i));
    f.classList.toggle('soft', isNext && L.round === 2 && chunkWeak(L, i) >= 2 && L.help !== i);
  });
}
function flyTap(btn) {
  const L = lesson; if (!L || stepOf(L) !== 'fly') return;
  const i = +btn.dataset.i;
  if (i === L.next) {
    chime(L.next);
    btn.classList.add('gone');
    const slot = $('.slot[data-i="' + i + '"]');
    if (slot) { slot.classList.add('filled'); slot.innerHTML = esc(L.chunks[i].text); }
    L.next++; L.wrongRun = 0; L.help = null;
    setTimeout(() => { if (btn.parentNode) btn.remove(); }, 350);
    if (L.next >= L.chunks.length) {
      setTimeout(() => {
        if (!lesson || lesson !== L) return;
        if (L.round === 1) { L.round = 2; L.next = 0; L.pos = null; } else { L.step++; }
        renderLesson();
      }, 700);
    } else updateGlow();
  } else {
    tone(196, .25, 'sine', .08);
    btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
    L.wrong++; L.wrongRun = (L.wrongRun || 0) + 1;
    const c = L.chunks[L.next], idxs = []; for (let j = c.i; j < c.i + c.n; j++) idxs.push(j);
    noteWeak(L.s, L.a, idxs);
    if (L.wrongRun >= 2) { L.help = L.next; updateGlow(); }
  }
}
function finishLesson(stars) {
  const L = lesson; if (!L) return;
  const key = L.s + ':' + L.a;
  if (!S.done[key]) addLog('ayahs');
  L.earned = stars; S.stars += stars; S.done[key] = true; ensureCard(L.s, L.a); addLog('stars', stars); bumpStreak(); save();
  L.step = L.steps.length; renderLesson();
}

/* ---------- review ---------- */
async function startReview() {
  const queue = dueKeys().slice(0, 12);
  if (!queue.length) { view = 'review'; render(); return; }
  review = { queue, i: 0, got: 0 };
  showOv(loadingHTML());
  await reviewCard();
}
async function reviewCard() {
  const R = review; if (!R) return;
  if (R.i >= R.queue.length) {
    showOv(headHTML('', '') + '<div class="petmini" style="width:220px;margin-top:30px">' + petSVG(Math.max(2, stageNow()), 'happy') + '</div><p class="stepcap" style="font-size:1.4rem">' + esc(t('reviewDone')) + '</p><p class="stepcap">' + esc(starsTxt(R.got)) + '</p><div class="cta"><button class="btn big" data-act="lclose">' + esc(t('close')) + '</button></div>');
    fanfare(); return;
  }
  const c = S.cards[R.queue[R.i]];
  try { await getSurah(c.s); } catch (e) { showOv(errHTML('retryreview')); return; }
  const v = verseOf(c.s, c.a); if (!v) { R.i++; return reviewCard(); }
  if (rec) { rec.destroy(); rec = null; }
  stopAudio();
  const words = wordsOf(v);
  const dots = R.queue.map((k, i) => '<i class="dot ' + (i < R.i ? 'done' : i === R.i ? 'on' : '') + '" style="width:' + Math.max(8, Math.floor(200 / R.queue.length)) + 'px"></i>').join('');
  showOv(headHTML(dots, INFO[c.s].en + ' · ' + c.a) + '<div class="petmini" id="pm">' + petSVG(Math.max(2, stageNow()), 'idle') + '</div><p class="stepcap">' + esc(t('reviewAsk')) + '</p>' + stageHTML(c.s, c.a, { w: 280 }) +
    '<div class="hintword ar" id="hw"></div>' +
    '<div class="row"><button class="btn ghost small" data-act="rhint">' + esc(t('hint')) + '</button></div>' +
    '<div id="recbox"></div><div id="rinfo"></div>');
  review.words = words; review.v = v;
  rec = mountRecite($('#recbox'), {
    words, key: c.s + ':' + c.a, showWords: false, cover: false, manual: 'faces', mode: 'review', petRoot: $('#pm'),
    onReveal: () => { revealAnswer(v); },
    onResult: () => { revealAnswer(v); },
    onFinish: res => { rateCard(R.queue[R.i], res.rating); const g = res.stars >= 2 ? 1 : 0; R.got += g; S.stars += g; addLog('reviews'); addLog('stars', g); bumpStreak(); save(); R.i++; reviewCard(); }
  });
}
function revealAnswer(v) {
  const info = $('#rinfo'); if (!info || info.dataset.on) return; info.dataset.on = '1';
  info.innerHTML = (v.tl ? '<p class="tl">' + esc(v.tl) + '</p>' : '') + (v.tr ? '<p class="tr">' + esc(v.tr) + '</p>' : '');
  kidRead($('.stage'), v);
}

/* ---------- tricky-word drills ---------- */
async function startDrill(first) {
  let list = trickyAyahs().map(k => ({ k, tot: trickyWords(k).reduce((x, i) => x + S.weak[k][i], 0) })).sort((x, y) => y.tot - x.tot).map(x => x.k);
  if (first && list.includes(first)) list = [first].concat(list.filter(k => k !== first));
  list = list.slice(0, 5);
  if (!list.length) { toast(t('practiceNone')); return; }
  stopAudio(); if (rec) { rec.destroy(); rec = null; } lesson = null; review = null;
  drill = { queue: list, i: 0, stars: 0 };
  showOv(loadingHTML());
  await drillCard();
}
async function drillCard() {
  const Dr = drill; if (!Dr) return;
  if (Dr.i >= Dr.queue.length) {
    showOv(headHTML('', '') + '<div class="petmini" style="width:220px;margin-top:30px">' + petSVG(Math.max(2, stageNow()), 'happy') + '</div><p class="stepcap" style="font-size:1.3rem">' + esc(t('practiceDone')) + '</p><p class="stepcap">' + esc(starsTxt(Dr.stars)) + '</p><div class="cta"><button class="btn big" data-act="lclose">' + esc(t('close')) + '</button></div>');
    fanfare(); return;
  }
  const parts = Dr.queue[Dr.i].split(':').map(Number), s = parts[0], a = parts[1], key = Dr.queue[Dr.i];
  try { await getSurah(s); } catch (e) { showOv(errHTML('retrydrill')); return; }
  const v = verseOf(s, a); if (!v) { Dr.i++; return drillCard(); }
  const words = wordsOf(v);
  const hidden = trickyWords(key).filter(i => i < words.length).slice(0, 4);
  if (!hidden.length) { delete S.weak[key]; save(); Dr.i++; return drillCard(); }
  if (rec) { rec.destroy(); rec = null; }
  stopAudio();
  const dots = Dr.queue.map((k, i) => '<i class="dot ' + (i < Dr.i ? 'done' : i === Dr.i ? 'on' : '') + '" style="width:' + Math.max(8, Math.floor(200 / Dr.queue.length)) + 'px"></i>').join('');
  showOv(headHTML(dots, INFO[s].en + ' · ' + a) + '<p class="stepcap">' + esc(t('practiceAsk')) + '</p>' + stageHTML(s, a, { w: 200, tap: 'dlisten' }) + '<div id="bbox"></div>' +
    '<div class="row"><button class="btn ghost small" data-act="dlisten">' + esc(t('listen')) + '</button></div>');
  Dr.cur = { s, a, v };
  rec = mountBlanks($('#bbox'), {
    s, a, words, hidden,
    onWrong: idx => noteWeak(s, a, [idx]),
    onDone: () => {
      if (drill !== Dr) return;
      const w = S.weak[key] || {};
      hidden.forEach(i => { w[i] = Math.max(0, (w[i] || 0) - 2); if (!w[i]) delete w[i]; });
      if (Object.keys(w).length) S.weak[key] = w; else delete S.weak[key];
      Dr.stars++; S.stars++; addLog('drills'); addLog('stars', 1); bumpStreak(); save();
      Dr.i++; drillCard();
    }
  });
}

/* ---------- parent corner: recite to me ---------- */
async function openRecite(key) {
  const learned = Object.keys(S.done);
  if (!learned.length) { toast(t('rtmEmpty')); return; }
  let k = key;
  if (!k) {
    const due = dueKeys().filter(x => S.done[x]);
    let pool = due.length ? due : learned;
    if (pool.length > 1 && pr) pool = pool.filter(x => x !== pr.key);
    k = pool[Math.floor(Math.random() * pool.length)];
  }
  stopAudio(); if (rec) { rec.destroy(); rec = null; } lesson = null; review = null; drill = null;
  showOv(loadingHTML());
  const parts = k.split(':').map(Number), s = parts[0], a = parts[1];
  try { await getSurah(s); } catch (e) { pr = { key: k }; showOv(errHTML('retryrecite')); return; }
  const v = verseOf(s, a); if (!v) { closeOv(); return; }
  pr = { key: k, s, a, v };
  showOv('<div class="lhead"><button class="x" data-act="lclose" aria-label="' + esc(t('close')) + '">✕</button><div class="dots"></div><div class="lsurah">' + esc(INFO[s].en + ' · ' + a) + '</div></div>' +
    '<h2>' + esc(t('rtmTitle')) + '</h2><p class="sub">' + esc(t('rtmNote')) + '</p>' +
    '<div class="prcard"><div class="ar verse">' + esc(v.ar) + '</div>' + (v.tl ? '<p class="tl">' + esc(v.tl) + '</p>' : '') + (v.tr ? '<p class="tr">' + esc(v.tr) + '</p>' : '') + '</div>' +
    '<div class="row"><button class="btn alt small" data-act="prlisten">' + esc(t('listen')) + '</button></div>' +
    '<div class="faces"><button class="face easy" data-act="prrate" data-v="easy"><span>😄</span>' + esc(t('rEasy')) + '</button><button class="face shaky" data-act="prrate" data-v="shaky"><span>🙂</span>' + esc(t('rAlmost')) + '</button><button class="face again" data-act="prrate" data-v="forgot"><span>😕</span>' + esc(t('rAgain')) + '</button></div>' +
    '<div class="row"><button class="link" data-act="prnext">' + esc(t('rtmNext')) + '</button></div>');
}

/* ---------- events ---------- */
function nextUndone() {
  for (const s of surahList()) for (let a = 1; a <= s.c; a++) if (!S.done[s.n + ':' + a]) return [s.n, a];
  return [112, 1];
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case 'nav': view = el.dataset.v; if (view === 'parents') { gateOK = false; gate = null; } render(); break;
    case 'pet': {
      const p = el.querySelector('.pet'); if (!p) break;
      const old = (p.getAttribute('class').match(/m-(\w+)/) || [])[1] || 'idle';
      setPetMood(el, 'happy'); chime(2); setTimeout(() => setPetMood(el, old), 1300); break;
    }
    case 'setmode': S.mode = el.dataset.m; if (S.mode === 'big' && !S.more) { S.more = true; toast(t('modeBigOn')); } save(); render(); break;
    case 'learnnext': { const n = nextUndone(); openLesson(n[0], n[1]); break; }
    case 'opensurah': { const s = +el.dataset.s; let a = 1; for (let i = 1; i <= INFO[s].c; i++) if (!S.done[s + ':' + i]) { a = i; break; } openLesson(s, a); break; }
    case 'openayah': openLesson(+el.dataset.s, +el.dataset.a); break;
    case 'gorev': startReview(); break;
    case 'gopractice': { const first = lesson && lesson.s && trickyWords(lesson.s + ':' + lesson.a).length ? lesson.s + ':' + lesson.a : undefined; startDrill(first); break; }
    case 'recite': openRecite(); break;
    case 'retrylesson': if (lesson) openLesson(lesson.s, lesson.a); break;
    case 'retryreview': reviewCard(); break;
    case 'retrydrill': drillCard(); break;
    case 'retryrecite': openRecite(pr && pr.key); break;
    case 'lclose': closeOv(); break;
    case 'llisten': { const v = lesson && verseOf(lesson.s, lesson.a), st = $('.stage'); if (!v) break; if (st) { const b = $('#lis'); if (b) b.classList.remove('pulse'); kidRead(st, v, { onEnd: () => { const n = $('#lnext'); if (n) n.classList.add('pulse'); } }); } else playAyah(v.audio); break; }
    case 'dlisten': if (drill && drill.cur) { const st = $('.stage'); if (st) kidRead(st, drill.cur.v); else playAyah(drill.cur.v.audio); } break;
    case 'setkid': {
      S.kid = el.dataset.k === 'girl' ? 'girl' : 'boy'; save();
      $$('.kidwrap').forEach(w => { w.innerHTML = kidSVG(); });
      $$('[data-act="setkid"]').forEach(b => b.classList.toggle('on', b.dataset.k === S.kid));
      if (kidRun) { const k = kidRun.stage.querySelector('.kid'); if (k) k.classList.add('talking'); }
      break;
    }
    case 'prlisten': if (pr && pr.v) playAyah(pr.v.audio); break;
    case 'prrate': {
      if (!pr || !pr.s) break;
      const v = el.dataset.v; ensureCard(pr.s, pr.a); rateCard(pr.key, v);
      const g = v === 'easy' ? 2 : v === 'shaky' ? 1 : 0; S.stars += g;
      addLog('recites'); addLog('stars', g); bumpStreak(); save(); toast(t('rtmSaved')); chime(3);
      openRecite(); break;
    }
    case 'prnext': openRecite(); break;
    case 'lnext': lesson.step++; renderLesson(); break;
    case 'fly': flyTap(el); break;
    case 'lnextayah': openLesson(lesson.s, lesson.a + 1); break;
    case 'rhint': { const hw = $('#hw'); if (hw && review && review.words) hw.textContent = review.words[0]; break; }
    case 'gatego': {
      const val = parseInt(($('#gate-in') || {}).value, 10);
      if (gate && val === gate.a + gate.b) { gateOK = true; gate = null; } else if (gate) { gate.bad = true; gate.a = Math.floor(rnd(11, 30)); gate.b = Math.floor(rnd(11, 30)); }
      renderMain(); break;
    }
    case 'narrtoggle': S.narr = S.narr === false; save(); if (S.narr === false) hush(); if (dn) dnLearn(); break;
    case 'narrsay': { const it = dn && DT()[dn.kind][dn.i]; if (it) speak(it.t + '. ' + it.d); break; }
    case 'reciter': { hush(); playAyah('https://everyayah.com/data/Alafasy_128kbps/' + String(el.dataset.u).replace(/[^0-9]/g, '') + '.mp3'); break; }
    case 'dopen': case 'dgo': deenOpen(el.dataset.w); break;
    case 'dnprev': if (dn && dn.i > 0) { dn.i--; dnLearn(); } break;
    case 'dnnext': if (dn) { if (dn.i < DT()[dn.kind].length - 1) { dn.i++; chime(dn.i); } else { dn.done = true; deenSet(dn.kind, { l: 1 }); save(); fanfare(); } dnLearn(); } break;
    case 'ogpick': if (og) { const i = +el.dataset.i; { const w = DT()[og.kind][i]; speak(w.n || w.t); } if (i === og.next) { chime(og.next); og.next++; og.streak = 0; og.hint = -1; if (og.next >= DT()[og.kind].length) { deenResult(og.kind, og.miss, 'dopen" data-w="' + (og.kind === 'times' ? 'times' : 'game' + og.kind)); break; } } else { og.miss++; og.streak++; og.shake = i; if (og.streak >= 2) og.hint = og.next; tone(150, .2, 'sawtooth', .06); } ogRender(); } break;
    case 'rkpick': if (rk) { const n = +el.dataset.n, ok2 = n === DT().times[rk.order[rk.i]].r; if (ok2) { chime(rk.i + 1); rk.i++; if (rk.i >= 5) { deenResult('rakat', rk.miss, 'dopen" data-w="rakat'); break; } } else { rk.miss++; rk.shake = n; tone(150, .2, 'sawtooth', .06); } rkRender(); } break;
    case 'au-view': readAuthFields(); Auth.view = el.dataset.v; Auth.msg = ''; Auth.privacy = false; render(); break;
    case 'au-privacy': { const n = $('#privnote'); if (n) n.hidden = !n.hidden; break; }
    case 'au-guest': enterGuest(); render(); break;
    case 'au-go': authGo(el.dataset.k); break;
    case 'au-copy': try { navigator.clipboard.writeText(Auth.code).then(() => toast(t('recCopied'))); } catch (e) {} break;
    case 'au-codedone': Auth.code = ''; Auth.gate = false; Auth.view = 'choose'; render(); break;
    case 'au-open': Auth.gate = true; Auth.view = 'choose'; render(); break;
    case 'acct-logout': acctAction('logout'); break;
    case 'acct-panel': Auth.panel = el.dataset.p; Auth.pmsg = ''; renderMain(); break;
    case 'acct-pwgo': acctAction('pw'); break;
    case 'acct-delgo': acctAction('del'); break;
    case 'tourkid': Auth.tourKid = el.dataset.k; renderMain(); break;
    case 'tourage': Auth.tourMode = el.dataset.m; renderMain(); break;
    case 'tourgo': S.kid = Auth.tourKid; S.mode = Auth.tourMode; S.tour = true; if (S.mode === 'big') S.more = true; save(); render(); openLesson(112, 1, { auto: true }); break;
    case 'reset': if (confirm(t('pResetAsk'))) { const lang = S.lang; S = normalize(Object.assign(fresh(), { lang })); save(); gateOK = false; render(); } break;
  }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset && el.dataset.set) { S[el.dataset.set] = el.checked; save(); if (el.dataset.set === 'more') toast(el.checked ? '✓' : ''); }
  if (el.id === 'lang-sel') { readAuthFields(); S.lang = el.value; save(); render(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'gate-in') { const b = $('[data-act="gatego"]'); if (b) b.click(); }
  if (e.key === 'Enter' && e.target.closest && e.target.closest('.authbox') && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') { const b = $('.authbox [data-act^="au-go"],.authbox [data-act="acct-pwgo"],.authbox [data-act="acct-delgo"]'); if (b) b.click(); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute && e.target.getAttribute('role') === 'button' && e.target.dataset.act) { e.preventDefault(); e.target.click(); }
});


async function boot() {
  if (!WEB) { render(); return; }
  $('#app').innerHTML = '<p class="stepcap" style="margin-top:38vh">…</p>';
  let me = null, net = true;
  try { const r = await api('GET', '/api/me'); me = r.json && r.json.user; } catch (e) { net = false; }
  const choice = ls('nn_choice'), cached = ls('nn_user');
  if (me) { enterAccount(me.email, false); render(); await pullState(); if (ov().hidden) render(); return; }
  if (!net && choice === 'acct' && cached) { enterAccount(cached, false); Auth.sync = 'offline'; render(); return; }
  if (choice === 'acct' && cached) { Auth.email = cached; Auth.gate = true; Auth.view = 'login'; render(); return; }
  if (choice === 'guest') { enterGuest(); render(); return; }
  Auth.gate = true; Auth.view = 'choose'; render();
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && Auth.user && ov().hidden && !Auth.gate) pullState().then(() => { if (ov().hidden && !Auth.gate) render(); }); });
window.addEventListener('online', () => { if (Auth.user) pushState(); });
if (WEB && 'serviceWorker' in navigator && (location.protocol === 'https:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname))) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
boot();
window.__noor = { get S() { return S; }, Auth, align, alignBest, normW, wordsOf, MIC, mergeState };
})();
