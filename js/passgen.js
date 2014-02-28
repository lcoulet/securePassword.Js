
// Make easy to remember
//  # short sequence of number
//  # one punctuation
//  # two sequences of alpha starting with uppercase and mixing voyels and consons
// In any order

// Make based on dictionnary

// Or make rough and complex

var availableCharsets={};
availableCharsets["alphaLower"]				='abcdefghijklmnopqrstuvwxyz';
availableCharsets["alphaUpper"]				='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
availableCharsets["numeric"]				='0123456789';
availableCharsets["punctuation"]			='.,/;\':?"!#@~<>=+-_)(*&%';
availableCharsets["special"]				=' `|^$£€[]{}';
availableCharsets["accented"]				='àáâãäçèéêëìíîïðñòóôõöùúûüýÿ';
availableCharsets["accentedUppercase"]		='ÂÃÄÀÁÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ';
availableCharsets["accentedSpecial"]		='ÅÆÐÑØÞßåæøþ¬¦';

var classifiedCharsets={};
classifiedCharsets["vowel"]				= 'aeiouyAEIOUYàáâãäèéêëìíîïðòóôõöùúûüýÿÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝÅÆØåæø';
classifiedCharsets["consonant"]			= 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZçñÇÐÑÞßþ';
classifiedCharsets["numeric"]			='0123456789';
classifiedCharsets["separate"]			='.,/;:?!¬¦| #@~=+-_&^%$£€*\`"';
classifiedCharsets["open"]				='\'"<([{`*/';
classifiedCharsets["close"]				='\'">)]}`*/';
classifiedCharsets["uppercase"]			= 'BCDFGHJKLMNPQRSTVWXZÇÐÑAEIOUYÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝÅÆØß';
classifiedCharsets["lowercase"]			= 'aeiouybcdfghjklmnpqrstvwxzÞþçñàáâãäèéêëìíîïðòóôõöùúûüýÿåæø';

var easyPasswordRequested=false;
var easyPasswordUsingDictionary=false;

var defaultEnabledCharsets=["alphaLower","alphaUpper","numeric","punctuation"];

var enabledCharsets={};
enableDefaultCharsets();

var allowCharacterRepetition=true;
var passwordSize=10;

var enableAlpha=true, enableNumeric=true, enableSpecial=true, enableAccented=true, enableAccentedSpecial=true;
var customChars="";
var ratings={};

ratings["passwordSize"]=0;
ratings["charsets"]=0;
ratings["characterVariety"]=0;
ratings["sequences"]=0;
ratings["keyboard"]=0;
ratings["dictionary"]=0;

var coefficients={};
coefficients["passwordSize"]=4;
coefficients["charsets"]=1;
coefficients["characterVariety"]=1;
coefficients["sequences"]=1;
coefficients["keyboard"]=1;
coefficients["dictionary"]=1;


// The dictionary lookup object
var dict = {};

// Dictonaries
// English
var englishdict="the and that was his with for had you not her which have from this him but all she they were are one their said them who would been will when there more out into any your what has man could other than our some very time upon about may its only now like little then can should made did such great before must two these see know over much down after first good men own never most old shall day where those came come himself way work life without make well through being long say might how too even def again many back here think every people went same last thought away under take found hand eyes still place while just also young yet though against things get ever give god years off face nothing right once another left part saw house world head three took new love always mrs put night each king between tell mind heart few because thing whom far seemed looked called whole set both got find done heard look name days told let lord country asked going seen better having home knew side something moment father among course hands woman enough words mother soon full end gave room almost small thou cannot water want however light quite brought nor word whose given door best turned taken does use morning myself Gutenberg felt until since power themselves used rather began present voice others white works less money next poor death stood form within together till thy large matter kind often certain herself year friend half order round true anything keep sent wife means believe passed feet near public state son hundred children thus hope alone above case dear thee says person high read city already received fact gone girl known hear times least perhaps sure indeed english open body itself along land return leave air nature answered either law help lay point child letter four wish fire cried women speak number therefore hour friends held free war during several business whether manner second reason replied united call general why behind became john become dead earth boy lost forth thousand looking I'll family soul feel coming England spirit question care truth ground really rest mean different making possible fell towards human kept short town following need cause met evening returned five strong able french live lady subject answer sea fear understand hard terms doubt around ask arms turn sense seems black bring followed beautiful close dark hold character sort sight ten show party fine ready story common book electronic talk account mark interest written can't bed necessary age else force idea longer art spoke across brother early ought sometimes line saying table appeared river continued eye ety sun information later everything reached suddenly past hours strange deep change miles feeling act meet paid further purpose happy added seem taking blood rose south beyond cold neither forward view I've position sound none entered clear road late stand suppose daughter real nearly mine laws knowledge comes toward bad cut copy husband six France living peace didn't low north remember effect natural pretty fall fair service below except American hair London laid pass led copyright doing army run horse future opened pleasure history west pay red an' hath note although wanted gold makes desire play master office tried front big lived certainly wind receive attention government unto church strength length company placed paper letters probably glad important especially greater yourself fellow bear opinion window ran faith ago agreement charge beauty lips remained arm latter duty send distance silence foot wild object die save gentleman trees green trouble smile books wrong various sleep persons blockquote happened particular drew minutes hardly walked chief chance according beginning action deal loved visit thinking follow standing knows try presence heavy sweet plain donations immediately wrote mouth rich thoughts months won't afraid Paris single joy enemy broken unless states ship condition carry exclaimed including filled seeing influence write boys appear outside secret parts please appearance evil march george whatever slowly tears horses places caught stay instead struck blue York impossible period sister battle school Mary raised occasion married man's former food youth learned merely reach system twenty dinner quiet easily moved afterwards giving walk stopped laughed language expression week hall danger property wonder usual figure born court generally grew showed getting ancient respect third worth simple tree leaving remain society fight wall result heaven William started command tone regard expected mere month beside silent perfect experience street writing goes circumstances entirely fresh duke covered bound east wood stone quickly notice bright Christ boat noble meant somewhat sudden value c. direction chair due support tom date waiting Christian village lives reading agree lines considered field observed scarcely wished wait greatest permission success piece british Charles formed speaking trying conversation proper hill music opportunity that's German afternoon cry cost allowed girls considerable broke honour seven private sit news top scene discovered marriage step garden race begin per individual sitting learn political difficult bit speech Henry lie cast eat authority etc. floor ill ways officers offered original happiness flowers produced summer provide study religion picture walls personal America watch pleased leaves declared hot understood effort prepared escape attempt supposed killed fast author Indian brown determined pain spring takes drawn soldiers houses beneath talking turning century steps intended soft straight matters likely corner trademark justice simply produce trust appears Rome laugh forget Europe passage eight closed ourselves gives dress passing terrible required medium efforts sake breath wise ladies possession pleasant perfectly o' memory usually grave fixed modern spot troops rise break fifty island meeting camp nation existence reply I'd copies sky touch equal fortune v. shore domain named situation looks promise orders degree middle winter plan spent allow pale conduct running religious surprise minute roman cases shot lead move names Word stop higher father's threw worse built spoken glass board vain affairs instance safe loss doctor offer class complete access lower wouldn't repeated forms darkness military warm drink passion ones physical example ears questions start lying smiled keeping spite shown directly james hart serious hat dog silver sufficient main mentioned servant pride crowd train wonderful moral instant associated path greek meaning fit ordered lot he's proved obliged enter rule sword attack seat game health paragraph statement social refund sorry courage members grace official dream worthy rock jack provided special shook request mighty glance heads movement fee share expect couldn't dollars spread opposite glory twelve space engaged peter wine ordinary mountains taste iron isn't distribute trade consider greatly accepted forced advantage ideas decided using officer rate clothes sign feelings native promised judge difference working anxious marry captain finished extent watched curious foreign besides method excellent confidence marked 'em jesus exactly importance finally bill vast prove fancy quick yes sought prevent neck hearts liberty interesting sides legal gentlemen dry serve aside pure concerning forgotten lose powers possessed thrown evidence distant michael progress similar narrow altogether building page particularly knowing weeks settled holding mountain search sad sin lies proud pieces clearly price ships thirty sick honest shut talked bank fate dropped judgment conditions king's accept hills removed forest measure species seek highest otherwise stream honor carefully obtained ear bread bottom additional presented aid fingers remembered choose agreed animal events there's fully delight rights amount obtain tax servants sons cross shoulders thick points stranger woods facts dare grow creature hung rain false tall gate nations created refused quietly surface freely holy streets blow july regarded fashion report coast daily file shoulder surprised faces succeeded birds distribution royal song wealth comfort failed freedom peculiar anyone advance gentle surely animals waited secure desired grass touched occupied draw stage portion expressed opening june spirits fish tongue capital angry growing served carriage weather breast presently snow david papers necessity practice claim hast education sharp prince permitted group enemies robert played throughout pity expense yours million add pray taught explained tired leading kill shadow companion weight mass established suffered gray brave thin satisfied check virtue golden numerous frequently famous telling powerful alive waters national weak divine material principal gathered suggested frank valley guess finding yellow heat remains bent seized guard equally naturally box remarkable gods moon slight style pointed saved windows crossed louis pounds ain't evidently principle immediate willing consequence richard principles characters paul season remarked science tender worked grown whispered interested quarter midst liked advanced apparently bore pwh active noticed aware thomas uncle list dangerous august calm genius sacred kingdom entire popular unknown nice habit spanish familiar reader published direct handsome you'll joined actually kings posted approach washington hearing needed increased walking twice throw intellectual appointed wisdom ceased truly numbers demanded priest wounded sorrow drive fault listened palace affair contact distinguished station beat distributed listen italy fool becomes watching hurt wants express occurred favour height size edge subjects task follows interests nine sympathy burst putting dressed lifted hopes suffer noise smiling rode tells minds farther literature vessel affection suffering proceeded flesh advice grand carrying legs spain post collection empty rank storm god's imagine wore duties admitted countries pocket arrival imagination driven loud sentence lovely extraordinary november december happen absence breakfast population thank rules inhabitants series laughing address relief bird owner impression satisfaction coat prepare relations shape birth rapidly smoke January mother+'s machine content consideration accompanied regular moving stands wholly teeth busy treated burning shame quality bay discover inside brain soil completely message ring resolved calling phrase acts mention square pair won title understanding Sunday fruit mad forces included tea rocks nearer slaves falling absolutely slow bearing mercy larger explain contain grief soldier wasn't countenance previous explanation welcome proposed prayer stars germany belief informed moments poetry constant buy final faithful ride policy supper drawing excitement dying demand fighting fields drove upper sum philip motion assistance forty april stones edward fees kindly dignity catch october seated knees amongst current sending parties objects gained bitter possibly slave separate loose text receiving worst sold don credit chosen hoped printed terror features fond control capable fifteen doesn't firm superior cruel spiritual harry splendid proof pressed sooner join process crime dust instantly lands relation doors concerned deeply practical colour sing destroy anger distributing results increase reasons nose friendly entrance rooms admit supply clean useful yesterday delicate fail continue remove addressed choice huge needs wear blind unable cover double victory dozen constantly level india release rough ended shows fly praise devil ahead smith connected degrees gain addition committed chamber notes italian gradually acquaintance bought souls mission sacrifice cities mistake exercise conscience based car buried theory commanded nobody minister closely energy dick bare fought partly mistress hate arose playing color lake safety provisions description asleep centre faint thinks parents escaped careful enjoy drop brilliant brief bringing worship goods tale skin roof grey highly crown castle excited throne stated despair ease attached total kindness mile citizens circle dull extreme clouds figures intention prison term assured hidden thoroughly cup member civil apply labor everywhere intelligence strike fairly comply fellows haven't event gently connection protection conscious edition directed pulled flight evident surrounded wishes yards voices weary couple variety whilst volume details older requirements custom apart bow awful everybody labour asking lover showing introduced suit becoming composed plans rendered pictures lest volunteers singing eager precious paused require meat whenever milk dogs successful plants vision rare granted raise egypt manners cousin you've development arthur obs cool trial learning approached bridge abroad devoted paying literary writer israel disappeared interrupted stock readers dreadful female protect accustomed virginia type recognized salt destroyed signs innocent temper plenty pope avoid hurried represented favor mental attitude returning admiration brothers anxiety queen teach count curiosity solemn causes vessels compelled dance hotel wicked fled kissed guns fill visible younger guide earnest actual companions prisoner miserable lad harm views irish utterly ends shop stairs pardon gay beg seldom kinds record fat sand violent branches inquired september worn ireland flat departure delivered gift ruin skill cattle Word equipment temple calls earlier license visited consent sufficiently natives wound laughter contained perceived scattered whence rushed chiefly bold anywhere witness foolish helped kitchen sell anybody self extremely treatment throat dreams patient speed growth quantity latin immense conclusion computer affected severe excuse triumph origin joseph slept eternal thine audience pages sounds swift limited wings stepped services library remaining containing base confusion win maid charming editions attended softly reality performed glorious likewise site sail frightened acquainted unhappy feared article prisoners store adopted shalt remark cook thousands pause inclined convinced band valuable hence desert effects kiss plant ice ball stick absolute readily behold fierce argument observe blessed bosom rage striking discovery creatures shouted guilty related setting forgot punishment gun slightly articles police mysterious extended confess shade murder emotion destruction wondered increasing hide expedition horror local expenses ignorant doctrine generous range host wet cloud mystery waste changes possess consciousness february trembling disease formerly spend production source mankind universal deck sees habits estate aunt reign humble compliance delay shining reported hers unfortunate midnight listening flower hero accomplished doth classes thanks banks philosophy belong finger comfortable market cap waves woman's glanced troubled difficulties picked european purposes somewhere delighted pushed press household fleet baby region lately uttered exact image ages murmured melancholy suspicion bowed refuse elizabeth staff liability we'll enjoyed stretched gaze belonged ashamed reward meal blame nodded status opinions indicate poem savage arise voyage misery guests painted attend afford donate job proceed loves forehead regret plainly risk lighted angel rapid distinct doubtless properly wit fame singular error utmost methods reputation appeal she's strongly margaret lack breaking dawn violence fatal render career design displayed gets commercial forgive lights agreeable suggestion utter sheep resolution spare patience domestic concluded 'tis farm reference chinese exist corn approaching alike mounted jane issue key providing majority measures towns flame boston dared ignorance reduced occasionally weakness furnished china priests flying cloth gazed profit fourth bell hitherto benefit movements eagerly acted urged ascii disposed electronically atmosphere chapter begged helen hole invited borne departed catholic files reasonable sugar replacement sigh humanity thrust frame opposition disk haste lonely artist knight quarters charm substance rolled email flung celebrated division slavery verse decision probable painful governor forever turns branch ocean rear leader delightful stared boats keen disposition senses occasions readable beloved inches bones enthusiasm materials luck derived managed community apparent preserved magnificent hurry scheme oil thence reaching dim wretched hanging pipe useless nevertheless print smooth solid pursued necessarily build attempted centuries eggs equivalent hastily burned you'd recent travel cries noon crying generations located cabin announcement britain compared handed cease smaller circumstance tent frequent alarm nervous beast what's aloud independent gates distinction essential observation stronger recovered belonging loving masters writers cf. permanent mortal stern gratitude preserve burden aspect millions merry knife dread clever applicable district shadows jim silk failure links cent sentiment amid profits agent finds russia bade russian desperate union imagined contempt raising lords hell separated grant seriously tribes hit enormous defective conviction secured mixed insisted wooden prefer prayers fever selected daughters treat warning flew speaks developed impulse slipped ours johnson mistaken damages ambition resumed christmas yield ideal schools confirmed descended rush falls deny calculated correct perform hadn't somehow accordingly stayed acquired counsel distress sins notion discussion constitution anne hundreds instrument firmly actions steady remarks empire elements idle pen entering online africa permit th' tide vol leaned college maintain sovereign tail generation crowded fears nights limitation tied horrible cat displaying port male experienced opposed treaty contents rested mode poured les occur seeking practically abandoned reports eleven sank begins founded brings trace instinct collected scotland characteristic chose cheerful tribe costs threatened arrangement western sang beings sam pressure politics sorts shelter rude scientific revealed winds riding scenes shake industry claims pp. merit profession lamp interview territory sleeping sex coffee devotion thereof creation trail romans supported requires fathers prospect obey alexander shone operation northern nurse profound hungry scott sisters assure exceedingly match wrath continually rest. gifts folly chain uniform debt teaching venture execution shoes mood crew perceive accounts eating multitude declare yard o'er astonishment version vague odd grateful nearest infinite elsewhere copying apartment activity wives parted security cared sensible owing martin saturday cottage jews leaning capacity joe settle referred francis holder involved sunshine dutch council princes ate examination steel strangers beheld test noted slightest widow charity realized element shed errors communication reflection attacked organization maintained restored folks concealed accordance heavens star examined deeds wordforms somebody incident oath guest bar row poverty bottle prevented bless stir intense completed quarrel touching inner available fix resistance unusual deed derive hollow suspected contains sighed province deserted establishment vote muttered thither oxford cavalry lofty endure succeed leg bid alice hated civilization u.s. acting landed christians passions interior scarce lightly disturbed rev supreme hang notwithstanding shock exception offering display strain drank confined exhausted poets sounded aim critical jerusalem directions negro fearful standard studied bag buildings consequences commenced deeper repeat driving beasts track rid holds residence steadily intimate drinking swear treasure fun throwing apt enterprise queer seed tower runs defend favourite desires heavily assembled existed depends poems hesitated stuff section settlement staring sole roads plate mexico overcome pains performing dwell grounds taxes marble recently tones ability awake walter wave shaking folk possibility butter fury marched moses writes issued sailed instructions hatred pursuit pull furniture additions hid rope adventure royalty vanished arts elder signal wanting supplied feast safely burn describe references lesson annual card passes application intelligent county beaten presents format flow sixty scale damage marks obtaining moreover commerce startled southern consequently outer belongs ben wrought average naked conducted rivers songs obvious foundation concern ceremony magic campaign hunting carolina liberal whisper largely commonly torn exists contributions hunt teacher christianity lawyer operations detail shortly caesar wondering leaders blessing princess he'd altar tenderness tiny web cardinal sharply regiment chest distinctly purple creating gather depth indignation performance election prosperity gloomy conception clerk decide drunk victim reflected pour preceding individuals gazing absurd lift gesture armies limbs manage brethren hugh plays hastened dragged motive whatsoever pointing verses pronounced exchange definite emperor tendency remote finish flag Word boots enabled administration denied churches rarely earnestly considering previously ugly bears signed genuine harmless mingled obedience walks training badly feed central contrast relieved romance mississippi structure payment pace passages succession persuaded sources inquiry inspired angels roll wilt inch troubles perfection lee wherever owe handle advantages trip shoot fortunate newspaper employment fitted refuge misfortune providence owns cutting beard stirred tear dan resist bob depths maiden determine commission merchant whereas crossing independence lively breeze provinces jean virtues conceived relative solitary smell wandering thereby eighteen locked provision courts eaten historical regarding Florence preferred pick ruined wherein vanity condemned deliver unexpected desk gross lane happens represent billy root holland mud respectable cleared feels fruits testimony milton existing bride rang ranks responsibility beating disappointed suitable depend judges giant grasp arrive simplicity autumn absent legally veil gloom doubtful suspect weapons limits determination feeble prophet shak gathering basis examine corrupt payments returns laying prize instances greeks they're theatre purchase comparison composition rival someone realize defeat demands foe shared consists studies balance intercourse forming slender coach criminal knocked silly humour masses indifferent recall occupation discourse keeps regions intervals assist novel intellect leads hither tales sale revenge lucy yonder resources jealous we're wheel invitation narrative risen burnt sentiments inferior amusement marie flash recognize swiftly portrait create summoned suggest induced conflict fed curse disappointment helpless preparing construction lincoln zeal responsible indicated groups positive germans attracted vengeance fort club cure stout missed gracious include flood satisfy agony respects ventured implied maria stupid seas spaniards grain enjoyment wearing indifference conceal horizon pleasures therein precisely canada day's assume registered estimate steep route gardens visitor closer harmony non thunder wire graceful crept greece childhood knee saddle supplies weeping mostly paragraphs unconscious mutual scorn grows external agents software institutions losing universe clock attempts instruction injury roots receipt jumped dearest sore earliest finest enable discipline motives fastened introduction converted wilderness confused fancied offices slip revolution wedding girl's farmer silently fires wept behalf reckon responded uncertain neglected stroke exquisite engagement dirty rolling platform messenger privilege admirable offers mischief physician imposed organized covering student daring cave wars convey he'll sincere tradition gravely combined gallant sensation travelling charges submit tragedy specific commander inn stiff accompany score virgin farewell paradise villages hunger trembled favorite criticism proprietary customs cotton ruth hospital restrictions outward impressed blows plains flashed rent prey owed longing musical satisfactory ridiculous sheet disgrace colored shouldn't originally samuel wages papa gas inevitable extensive leisure deadly chin claimed glow husband's emotions adam jealousy leaf publication englishman allah jones hostile wandered railway translation procession betrayed pound admired elected pierre sunk ruins eastern roses citizen reminded deceived tables beach starting funeral arrested flour feature correspondence consisted counted reserve proceedings roar romantic twenty-five hut strangely absorbed propose seats bark reception pleasing attained wake research prayed monarch clothing dollar illness calmly obeyed heartily pressing daylight warriors jest abruptly washed comment metal preparations nerves solution pretended sixteen assembly tobacco entity dwelling depart swung bitterly alteration colony disclaimers wing peaceful lion opportunities alarmed furnish resting accused culture writings dwelt conquered trick trusted column financial cunning preparation drama joke entertained mist hypertext shell medicine proofread nest reverence situated yielded conceive appointment lessons fetch tomb candle offence coarse heap mixture homes model men's defect destined occasional fourteen hint knights solicit dreamed objection craft acid namely asia neglect data weapon confessed arrangements repose complying copied pink user heels grandfather other's income i.e. regards streams vigorous accepting bishop lightning authors flames observations compressed sport powder beds orange painting shout austria bath careless chap derivative roused primitive doorway climbed volumes vulgar arguments 1st sunset convenient mail recalled wrapped abode planted paint surrender establish mild promptly appearing department parish stephen nay lit handkerchief basket easier deserve quit assurance mirror plot yer upward sadly secretary adding modest dish cares straw net advised heavenly largest proceeding impatient wounds warmth certainty restless meantime rays salvation lovers experiment shores today tremendous afforded moonlight intend california cultivated flushed shakespeare newspapers rocky pious wont steam improvement garments ned treasury merchants perpetual trained products affectionate dispute visitors poison proposition maybe rifle warned parting shield erected employ prevailed talent rises climate chairs searched unlike recover mate arrange fortunes puzzled committee aged ohio ashes ghost promises bushes effective distinguish manifest comparatively esteem blew revelation wash recognition confession clay nonsense trunk management undoubtedly dried dorothy chiefs coal stolen earthly restore indirectly lasted selfish renewed canoe protest vice races deemed temporary pile frederick chapel moderate spell massachusetts upright quoted area bone solitude instruments formal students greatness struggling monday reproach altered grim leaped venice federal questioned editor desirable acknowledge motionless remedy bestowed pursue representative pole gladly linen vital sink pacific hopeless dangers gratefully president travelled ward nephew cheer bloody siege commands justified atlantic stomach improved admire openly sailors abide advancing forests records polly recorded modification dramatic statements upstairs varied letting wilson comrades sets descent whither envy load pretend folded brass internal furious curtain healthy obscure summit alas fifth center faced cheap saints colonel egyptian contest owned adventures exclusion seize chances springs alter landing fence leagues glimpse statue contract luxury artillery doubts saving fro string combination awakened faded arrest protected temperature strict contented professional intent brother's injured neighborhood andrew abundance smoking yourselves medical garrison likes corps heroic inform wife's retained agitation nobles prominent institution judged embrace wheels closing damaged pack affections eldest anguish surrounding obviously strictly capture drops inquire ample remainder justly recollection deer answers bedroom purely bush plunged thyself joint refer expecting madam railroad spake respecting jan columns weep identify discharge bench ralph heir oak rescue limit unpleasant anxiously innocence awoke expectation incomplete program reserved secretly we've invention faults disagreeable piano defeated charms purse persuade deprived electric endless interval chase heroes invisible well-known occupy jacob gown cruelty lock lowest hesitation withdrew proposal destiny recognised commons foul loaded amidst titles ancestors types commanding madness happily assigned declined temptation lady's subsequent jewels breathed willingly youthful bells spectacle uneasy shine formidable stately machinery fragments rushing attractive product economic sickness uses dashed engine ashore dates theirs adv clasped international leather spared crushed interfere subtle waved slope floating worry effected passengers violently donation steamer witnesses Word specified learnt stores designed guessed roger timber talents heed jackson murdered vivid woe calculate killing laura savages wasted trifle funny pockets philosopher insult den representation incapable eloquence dine temples ann sensitive robin appetite wishing picturesque douglas courtesy flowing remembrance lawyers sphere murmur elegant honourable stopping guilt welfare avoided fishing perish sober steal delicious infant lip norman offended dost memories wheat japanese humor exhibited encounter footsteps marquis smiles amiable twilight arrows consisting park retire economy sufferings secrets halted govern favourable colors translated stretch formation immortal gallery parallel lean tempted frontier continent knock impatience unity dealing prohibition decent fiery images tie punished submitted julia albert rejoined speedily consented major preliminary cell void placing prudence egg amazement border artificial hereafter fanny crimes breathe exempt anchor chicago sits purchased eminent neighbors glowing sunlight examples exercised wealthy seeming bonaparte shouting thanked illustrious curiously inspiration seeds naval foes everyone longed abundant doubted painter greeted erect glasses meanwhile shooting athens wagon lend lent crisis undertake particulars veins polite anna experiences seal header clergy mount array corners magazine loudly bitterness texas guardian searching rejected harsh includes boldly maurice kate lunch pine shells seconds despite hoping injustice expressions flies push tight problems landscape sue protested scarlet abandon artistic mainly measured loyal boiling desirous suited alliance advise waist sinking apprehension stable gregory maximum commit hideous hamilton sweetness dismissed tore affect shaken evils unworthy significance modified miracle lieu peasant considerably observing conveyed resemblance extend riches personally morality rebellion thread dumb inclination forbidden copper differences sailor requested alfred response promoting imperial blank purity victor bending solemnly twenty-four minor del crimson republic teachers ma'am danced bargain dealt fatigue telephone cents whip adams dislike witnessed infantry acres checked countrymen enemy's companies normal shirt addresses introduce sofa mothers sweep conversion sketch african deserved answering virtuous persian anyway thief driver retain constructed daniel philadelphia conspicuous channel nobility edith berlin editing cambridge declaration guards personality smallest excess separation disgust accomplish speeches herbert convent rightly suspended reform mob thirst unnecessary treasures asks viewed designs gleam threatening palm missouri filling quoth fur fortnight holes addressing frightful encourage speaker tribute procure frankly recommended relieve intentions unjust legislation project threshold merits morrow traces induce spear inward pupils corresponding fairy conclude clung neat lucky lap session torture damp ridge spoil liable swords hearty abraham thoughtful traveller chains favorable tin imp. strongest horace dependent couch bills warrant complaint endeavour sails dined convention guarded angle widely illinois charlotte endeavoured ardent cow mill victims prejudice foremost map probability porch lieutenant surprising fountain sustained appropriate ford clara assisted lewis rejoice extending marvellous clothed jew collar bands confident hasty nigh organ prose privileges selection inquiries codes replace saint districts deliberately awe beforehand strife released compare beer retorted relate cheerfully pistol presume velvet wretch susan pennsylvania stirring righteousness missing fain facing fashionable producing peoples positively reasoning gravity disturb sermon exchanged partner brains lowered association estates abuse flock niece languages asserted bodily notions oliver faculty cannon thirteen sailing rings smart possessions disciples petty widest divisions prudent caution justify awhile boxes manuscript cigar warrior impressions aught lifting inaccurate tidings friday liquid staying concept creek brush download specially cream meetings jump unwilling adapted practised combat subdued jewish innumerable blowing extra civilized invented japan pitch cliff crowned portions awkward horrid pulling appreciate communicated kentucky jury encountered attacks monster simon maintaining sites frozen invariably dies survive literally consolation phenomena pot ellen briefly rice planned barbara respected sublime dropping guy behaviour desolate penny adopt replaced revenue formats hired regularly infringement curtains eagerness helping investigation constitutional insist occurs fools inheritance latest leap games apple visiting travellers experiments hasn't pupil enjoying totally twisted discuss firing background subscribe tenderly transcribe descend differ majesty's avail disaster bet periodic bull entertainment computers cursed raw fulfilled georgia virus log skies scotch embraced hospitality faintly solomon robbed cart influences ascended incidents childish robe aboard resembling reflect dominion dreary serving complexion engage tents herd attain collect disclaims pan relatives borrowed convert outline blown comprehend peasants opera assault deceive doctrines representatives dedicated struggled officials hiding paths backs prominently prices procured mourning compliment heights approval gasped breadth withdraw tune compassion polished latitude dishes parent contrived delicacy projected akin betray traced resentment indemnify pseud sacrifices disguise transcription document neighbour squire punish bars glittering tossed block lots worldly muscles elbow obligation trifling decline attachment ambitious filename artists bloom holiday brute repair fist recollect eagle honorable significant barren functions guided dense fiction viz. adds rows recommend suspicious resulting seventy shillings educational duly governed scripture upwards sworn nicholas horn brook fund vienna lodge infinitely clergyman marshal ruled fiercely portuguese costume pit disorder sheer exalted fare applause chaucer remind binary packed pillow jersey abbey nowhere anyhow agitated marching catching grasped arrow tend carved fitting bonds instructed elaborate corpse bewildered essence positions emily edited continues harold elevation realm debts glancing shops complained loyalty coin clad staircase documents interpreted 4th extremity accord sally lace tremble exile gospel mechanical successfully scholar wonders arab temperament expressing fred trap spots awaiting potatoes likeness harbour proofs jolly contributed wits generosity ruler lawrence cake lamps crazy sincerity entertain madame sir faculties hesitate deepest seventeen lordship greeting feminine monstrous tongues barely mansion facility praised warranties sarah happier indicating rob gigantic honey ladder ending wales swallowed sunny knelt tyranny decree stake divide dreaming proclaimed dignified tread mines viewing defense oldest incredible bidding brick arch everlasting elect sprung harder winding deductible magistrate respective liquor imitation shy perished prime studying eighty hebrew unfortunately licensed fog coloured bits consult moves warn taylor vile depended phil legend locations shallow doom dreaded encouragement impatiently scent varieties irregular battles compass neighbouring bliss harvest promotion stove faithfully anthony excellence transfer awaited heathen poetic consulted illustrated gilbert fundamental bundle rebel cultivation joys rigid tragic review representing flowed brows whereupon terribly melted venerable towers cooking mustn't suspicions old-fashioned oppressed australia friend's revolt swell improve williams describes goddess wreck tennessee convince sentences bowl radiant prussia westward indignant refined unseen illustration pertaining swamp austrian saxon congregation nerve undertaking disclaimer characteristics stare specimens ascertain pledge earn warfare supposing subsequently attending angrily select animated industrial hurriedly manhood quantities interpretation Word dressing rejoiced edinburgh catherine challenge produces forbid gang boiled shouts so-called theme thankful admission enters elevated frenchman pool terrified lads persisted conference equality genus didst newly generals surroundings sorrows occasioned invasion workmen monks sends turkish discretion pattern reveal endured resolve columbia preach exceeding ringing triumphant defiance errand woke grandmother weighed wool orleans communicate strikes promising scenery righteous essentially oppose joyous specimen doctors eloquent manager organs sticks drag haunted chorus rational crop processing accurate wolf adorned sheets resort refusal bond vicinity preacher sympathetic casting opens prophets horns warmly salary continuous satan continual defended breaks workers lantern balls rod blaze examining naples peculiarly vegetables ingenious excite howard horseback re-use louisiana farmers wildly mouths carpet sadness customary circles aren't wonderfully max juan successor allied ceiling confirmation glances diamonds goal representations cash vacant antiquity despise lawn they'll appealed turkey texts neighbor spreading discharged phrases ultimate tastes submission entry rachel blush monument hardy thorough ein ecclesiastical fertile exciting captive severity considerations shew faster louise grandeur winning solely globe malice echoed lodging conservative throng prosperous whistle floated transferred declaring reckoned cheese bite thoughtfully breach enthusiastic cars downstairs allowing invite adjoining dusk cathedral truths plague sandy boil caroline beautifully inhabited tomorrow exclamation finishing shocked escort forgetting hanged hats mirth uncomfortable connecticut bows pierced harbor tricks rubbed apparatus mysteries honesty negroes concerns wander assert ceremonies sacrificed utterance dismay fright rail reflections crops pushing proves jimmy pathetic imperfect haughty navy fortress hurrying blessings attempting insects selling appreciation suppressed acquire offensive ripe dresses reigned coldly candles sixth blazing youngest mask florida lecture parlor decidedly whereby gordon reverend successive perception buffalo sire quitted keys develop function morals damned vexed pouring bullet excessive bind identical cliffs tools byron mexican piety superstition git substantial bulk prevail wiser preaching prolonged annoyed westminster splendour remembering richmond upset cab bunch pencil subjected vegetable exhibit emerged cooked hay kansas gale preached arnold trousers debate dated tumult corruption summons comrade eternity hears lingered propriety stillness partial welcomed cabinet proceeds vow quaint soup beef rests slay surgeon irresistible sealed repeating needn't allowance undertaken treachery posts borders attendant unite murderer owners sweeping unconsciously blade saviour theories graham behaved pleaded spy possesses lawful tommy seasons withdrawn reckless factory shades gossip seventh attendance robes journal systems dryden maine token intimacy abstract machines bestow chanced locks honestly legitimate accent symptoms votes ragged thursday manifested fidelity swinging descending sincerely bred whereof indies novels league failing succeeding santa approve cautiously miller afflicted lodgings petition traffic sparkling limb architecture disposal carriages crack kindred naught ornament slew steward fantastic evolution patiently reverse survey dug amuse stretching isaac forthwith contemporary foliage receives scandal donors deliberate influenced intolerable hearth symbol governments repaired pleasantly homage victorious columbus recovery defined attendants modesty diana washing pavement unnatural decisive wisely precise negative occurrence snatched shaft linked festival exclusively jove wickedness visions maggie rosy carelessly stem corporation dec feeding allen cows schemes preference urge husbands labours shrill exercises sovereignty reduce distressed clearing removal dean scottish assertion accessible comedy flush code philosophers adequate vaguely treason hunter chambers split yielding newsletter snake pub. historian ass intensity democracy battery draws netherlands creed liking luke tyrant strove attraction slaughter dismal deposited assent cups concert downward canal evenings wax detective fancies spoiled revolver murray earned analysis finer paces roaring prompt paperwork wherefore emphasis sharing delayed inherited bronze waking garment redistributing wholesome remorse plato morris stooped dew monk thrill hue exclusive funds porter uncommon dash strained confounded swim strip middle-aged ultimately team missionary esteemed tracks envelope whoever expensive headquarters cherished brandy startling homer talks acute cigarette motor embarrassed janet volunteer offspring network reaches indispensable plane reaction regiments sums partially prejudices proudly baggage terrace deaf allusion grip juice isabel resigned humility benjamin blast ministry sexual nile diameter troop onward crowds marrying tightly sullen brutal axe holmes penalty tops diamond boards corridor endowed strengthened cells proportions alternate echo restraint trials reads identity headed softened quivering stages sway poetical objected screen professed dirt ascertained era wider ambassador constituted breed interference eyebrows shapes afar consist acceptance displays flashing hunted beauties lazy shrewd extravagant momentary cordial engineer rapidity nov halt alternative devils stamp compact whites breathless encoding drift disappear roared revived counter venus imaginary diminished honoured 5th despatched objections ray climbing attract astonishing competition suggestions ink oft crystal shower diseases ferdinand obedient draught wondrous await armour massive bottles kin cellar falsehood pillars edgar philosophical martha worlds memorable jacques detected stealing noisy henceforth cicero laden frost device glare touches senate lasting communion transport constantinople coffin eventually johnny enclosed forgiveness awfully clinging darkened contemplation termed manufacture swallow commonplace nancy resembled she'd labors contracted inscription comfortably indulge indulgence bravely kneeling yea keenly exhibition agricultural enlightened quest compliments crest extension uneasiness constitute inflicted lakes swing meadow noblest downloading complex controversy freed resignation tempest guidance prospects humbly lined serene shrugged honours roughly checks remarkably dainty overhead commencement singularly brightness oppression repeatedly conspiracy restrain splendor preservation pub pepper basin creeping matthew publicly percy continuing grove calamity pony vigour melody profitable descendants hire speculation discoveries accepts drunken candidate principally worried obstinate hasten foreigners elderly overwhelmed instincts telegraph russell university ghastly patron varying barbarous celestial t' patriotism modify earnestness exertion fox refusing horsemen inspection stations grieved louder bursting regretted mournful pursuing traitor associations cautious foundations stamped prior undertook telegram beggar chimney complicated davis striving magistrates converse graces wiped oars apology scared imprisonment eastward substitute yahweh handful usage lodged of. villain banished restoration serpent hedge jurisdiction captains settlers gaining valiant primary storms beam victoria tour prophecy spectacles obsolete buying shepherd wells harriet exaggerated heated penetrated travels earl hereditary ali supernatural competent piled hostess agriculture boughs urgent gratified suffice ports drifted accuracy deceased circular securing possibilities rhine alert neighboring democratic quebec bud accounted aided augustus blanket hail pretence beams andy pig shaped oven rounded ivory northward isolated policeman aug conventional babylon dusty bishops complaints stripped plead hinder 8vo cord flows personage classical alongside wrongs extract rewarded lungs lighter kisses serves pint forgiven sternly proclamation realised pipes arising pitched tube observer smote avenue elephant burke footing statesman rebels nails wears doomed edges esther indiana affecting stormy bee bury efficient mix Word supporting actor disturbance sweat executive seemingly tenth blossoms ethel folds painfully polish shudder oe. roofs comparative begging imposing notable invested imprisoned mute amy cage esq cured cargo prof. negotiations assented jail skilful ideals conferred resulted illusion torment troublesome crowns feb repentance blankets proprietor uncertainty concentrated mediterranean covers scream compromise respectful chariot ammunition bonnet secondary persia persecution lesser assistant saluted fits indulged springing cane fold boundary valued she'll rugged aloft thieves hello";
// sources: 
// http://www.encyclopedie-incomplete.com/?Les-600-Mots-Francais-Les-Plus#outil_sommaire_2
// http://en.wikipedia.org/wiki/Dolch_Word_List
// French
var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette d'une ont ses mais comme tout nous Mais fait été aussi leur bien peut ces deux ans encore n'est marché Pour donc cours qu'il moins sans C'est entre faire elle c'est peu vous Une prix dont lui également Dans effet pays cas millions Belgique BEF mois leurs taux années temps groupe ainsi toujours société depuis tous soit faut Bruxelles fois quelques sera entreprises contre francs n'a Nous Cette dernier était s'est chez monde alors sous actions autres ils reste trois non notre doit nouveau milliards avant exemple compte belge premier nouvelle Elle l'on terme avait produits cela d'autres fin niveau bénéfice toute travail partie trop hausse secteur part beaucoup valeur croissance rapport USD aujourd'hui année base Bourse lors vers souvent vie l'entreprise autre peuvent bon surtout toutes nombre fonds point grande jour avoir nos quelque place grand personnes plusieurs certains d'affaires permet politique cet chaque chiffre pourrait devrait produit l'année Par rien mieux celui qualité France Ils Ces s'agit vente jamais production action baisse Avec résultats Des votre risque début banque voir avons qu'un elles moment qu'on question pouvoir titre doute long petit d'ailleurs notamment droit qu'elle heures cependant service Etats-Unis qu'ils l'action jours celle demande belges ceux services bonne seront économique raison car situation Depuis entreprise nouvelles n'y possible toutefois tant nouveaux selon parce dit seul qu'une sociétés vient jusqu quatre marchés mise seulement Van semble clients Tout Cela serait fort frais lieu gestion font quand capital gouvernement projet grands réseau l'autre données prendre plan points outre pourtant Ainsi type Europe pendant Comme mesure actuellement public dire important mis partir parfois nom n'ont veut présent passé forme autant développement mettre grandes vue investisseurs trouve maison mal l'an moyen choix doivent NLG direction Sur simple période enfants dollars personnel assez programme général banques eux semaine président personne européenne moyenne tard loi petite certaines savoir loin explique plupart jeunes cinq contrat Banque valeurs seule rendement nombreux fonction offre client activités environ ministre cadre sens étaient sécurité recherche Paris sorte décembre Son suite davantage ensuite janvier donne vrai cause d'abord conditions suis juin peine certain septembre sommes famille l'indice pris laquelle directeur qu'en propose gens derniers étant fut chose portefeuille obligations afin différents technique Aujourd'hui ailleurs l'ensemble américain ventes Selon rue livre octobre vraiment sein dollar Enfin haut Plus petits porte tel durée domaine aurait jeune présente passe lorsque choses puis Vous aucun l'un n'en tandis coup existe propre carte crise importante atteint revenus montant forte ici s'il Quant rapidement j'ai ville etc mars s'en mon premiers bas marque véritable ligne longtemps propres devant passer départ total série quoi particulier concurrence élevé position connu principe tendance court pages évidemment résultat aura parmi Sans américaine face trouver durant femmes construction désormais distribution telle difficile autour européen pratique centre vendre juillet mai région sociale filiale film besoin mode Pas représente réalité femme vaut Tél aucune hommes donner titres l'Europe nombreuses différentes moyens formation chiffres Générale dix prochain l'Etat genre bureau communication participation gros pourquoi estime devient réalisé création novembre l'évolution pourra semaines consommation faible terrain site droits moitié puisque reprise compris projets avril vont call donné simplement six firme perte Bien Philippe sait prend vite via stratégie vos jeu petites marketing presque Michel manque réaliser financiers Car Comment voiture chef constitue Internet J'ai enfin net charge nature second payer actuel Elles investissements dispose financier d'achat membres date avaient gamme revanche comment décision l'avenir tour actionnaires s'y solution créer l'économie concerne l'époque belle lequel tél seconde version Pays-Bas cher chacun lire techniques décidé mouvement conseil nécessaire meilleur double sujet généralement restent celles politiques malgré confiance homme d'actions Certains ayant papier commerce Région Wallonie Windows termes met contraire informations l'industrie trimestre différence certaine formule jusqu'au voit programmes actuelle permis dossier Quand l'heure guerre acheter rendre février l'emploi main voire bons technologie européens éléments unique l'eau venir générale courant suffit l'ordre conserver maximum force fax Que largement milliard soient Pierre devenir l'Union franc minimum mort responsable possibilité presse affaires longue travers BBL relativement moi Deux présence européennes devraient groupes ensemble santé New pense bénéfices but compagnie publique coeur revenu mesures table nettement questions d'avoir permettre l'homme Chez retour qu'elles majorité potentiel moindre récemment secteurs réduction large traitement perdu étrangers parents l'une fond capacité vitesse activité l'exercice l'objet quel tient taille éviter risques Jean Pourtant Allemagne parler propos quant signifie voie jouer prévoit blanc noir parti logiciel continue Notre bois meilleure l'argent perspectives développer celui-ci oeuvre structure suivre tiers prise professionnels raisons néanmoins preuve social bénéficiaire couleurs mondial Cet maintenant essentiellement prévu Japon prévisions centrale Alors international yeux PME l'a ait bonnes opérations pied l'art pourraient Londres juge devra uniquement corps divers Parmi numéro réduire Tous texte tenu budget l'étranger pression mes n'était style économiques Jacques montre population analystes processus placement classique dividende rester publics fortement plein wallonne DEM Express faudra travailler Crédit directement prime Flandre crédit monnaie précise appel Autre travaux l'occasion juste Chaque put tableau terre permettent devenu rouge mémoire partenaires rapide travailleurs joue objectif salle parle musique milieu d'entreprise autorités chute régime d'autant liste opération bout performances électronique haute responsables lancé voitures patron Malgré affiche situe l'image études Microsoft condition retrouve Aux revient Belgacom route Ensuite Luxembourg campagne comptes hors culture Commission d'entre possibilités semestre actifs finalement internationale l'achat monétaire passage justice page tels poids celle-ci commercial entendu l'investisseur mondiale accord diverses totalement fil clair vin biens euro York parfaitement viennent division réseaux principal lancer supérieur atteindre référence téléphone management vins proche collection fiscale Ceci informatique investissement volume matériel publicité train coupon progression tenir protection l'aide couleur nouvel Lorsque change changement garantie somme Belge plaisir fils laisse importants privé Ses besoins oeuvres américains relations peau moteur augmentation suivi volonté beau bancaire laisser bureaux principalement intéressant logiciels sommet l'activité d'en vivre élevés Robert contrats oublier performance réponse d'exploitation concept obtenir poste attendre lignes consiste augmenté vert figure mot développé l'histoire magasins collaboration répondre TVA holding livres convient fonctions fera pouvait million Paul britannique d'entreprises voix Grande-Bretagne disque affaire minutes quelle contexte limite mains commun réduit Pourquoi particuliers verre wallon d'Etat allemand effets Chine meilleurs rend applications d'ici procédure l'opération devait profit méthode pose commence idée l'Internet d'eau créé nuit Nord capitaux options consommateur cartes soi métier probablement aller d'investissement facile International importantes Marc capitale devise prochaine transport Street demander utilisateurs l'affaire image l'idée propriétaire facilement publiques croire disponible Louis d'or veulent Charleroi consommateurs devises difficultés sort national machines annoncé choisi découvrir soutien avez perdre cuisine telles D'autres travaille ouvert phase certainement télévision pratiquement annuel bord paiement Bank institutions seuls arrive constate marques nationale regard représentent Belges état Qui libre rachat Toutefois portes sortir commandes permettant manager fiscal cinéma histoire zone sauf avantages l'information voici dur effectivement puisse réel The puissance fixe Belgium contact époque rythme principaux vendu utilisé étude Leur sensible Bref rencontre L'entreprise spécialistes brut mauvais néerlandais supplémentaire mots reprises nécessaires Non soir Prix machine penser parts comprend fusion acquis totale voyage logique l'échéance concurrents idées trouvé dette Sud réellement financement disponibles vieux lance marge dirigeants avis changer conséquence sociales supérieure Certes faisant ordinateur partenaire warrant fabrication redressement suffisamment délégué pourront poursuit chemin emplois l'environnement réalise FRF évolution Cour automobile Premier ancien note parties pension professionnel assure garder Rien Actuellement S'il l'administration Guy est-il IBM climat d'acheter SICAV département sept partout immobilier lancement rating réussi patrimoine feu expérience Anvers anciens graphique Fortis faveur retrouver droite responsabilité commande Kredietbank d'argent direct l'inflation n'avait utiliser tonnes l'origine connaissance acheté Ici américaines clairement semblent biais futur neuf chance faillite équipe musée compagnies documents pertes sortie m'a seraient d'autre choisir l'instant tellement industriel précompte d'Europe immédiatement avantage qu'au constituent déchets sport van demeure garde maisons Solvay conséquences l'offre active dépenses donnent employés sites élections détient n'importe obligation fruits véhicule l'égard Conseil investi mission profiter visite comprendre professionnelle affirme l'intérieur Wall charges privée rares succession liberté rentabilité suivant efficace assurer images agences impossible John enfant fournisseurs photo salaires Avant compter l'Est disposition formes bénéficiaires lesquels maintenir précisément couple enregistré recul offrir peur hauteur centres voulu industrielle positif Luc administrateur intéressante commerciale interne pleine passant vision GSM faits retard certes l'air lundi Outre porter écrit cesse locaux délai trouvent classiques commencé réalisée Alain vigueur gagner Celui-ci Philips ceux-ci favorable pouvoirs participations annonce génération élément devenue touche conseils devoir mer souligne respectivement rapports vacances lieux naturellement d'y lorsqu'il statut USA ceci destiné défaut objectifs récente saison d'art industriels Suisse catégorie complexe huit l'obligation fisc obtenu repris occupe sérieux émis Quelques comportement limité vingt conjoncture gauche marche d'origine l'utilisateur ordre mobilier parcours perspective normes recours l'esprit Communauté annuelle lecteur objets fabricant niveaux Entre réalisation amateurs conséquent présenter Celle-ci vise types détail mauvaise professeur progressé signe passée approche Reste return jardin l'espace flamand Namur bilan Vif sensiblement Trois utilise commune dimanche option partis analyse films surface warrants GBP prises secret historique journée l'ancien Pendant allemande d'assurance André fille l'importance proposer avions augmenter parc Delhaize the Lors limitée appareils villes au-dessus diminution prochaines servir Bernard commission faiblesse plus-value souhaite internationales producteur producteurs code belles cabinet fonctionnement gérer mouvements pratiques régions dossiers meilleures Parce entrée vendredi actif sociaux supplémentaires café message physique Société communes dizaine faute sélection source facteurs milliers soleil tirer concernant Bourses fallait sentiment bénéficier débat l'Allemagne élevée ouvrage police pouvez attention a-t-il bel constructeurs contribuable moderne passion primes suit auquel dépasse spécialisée bruxellois déclaration multiples quartier vidéo dépend l'école liquidités correction comité Web cherche filiales Sous signé leader calcul gaz D'abord Rens artistes déficit cadres fédéral probable remboursement and efforts restaurant Toutes couverture domicile soins devront luxe complet danger indispensable syndicats comporte faite juridique langue rendez-vous d'informations demandé respect continuer l'organisation lesquelles local l'impression n'existe rare restructuration automatiquement plat boursier sol c'était cotées décide L'action Cependant Certaines matériaux ordinateurs tradition progressivement capable classe familiale réserve fonctionne solutions fabricants paie Finances l'été réelle changé masse unités considéré fer auront noms riche Patrick proposé salon territoire fixé magasin candidats marges asiatique inférieur réaction fleurs l'effet record tribunal recettes poursuivre dessous portant Aussi Sabena acteurs dehors constructeur l'auteur relation offrent spectaculaire LUF produire confort familles investir reprend sert montrer mérite places Soit judiciaire textes quasi SNCB jeux permettra étudiants membre photos positions sud Cockerill lendemain cent gagné japonais l'absence mark pointe solide Voici anglais n'ai présentent décisions législation médias victimes écran nécessairement découverte l'assuré club environnement noter crée exportations négociations Jan répond BEL entier business peinture s'était voisins faibles location nord promotion technologies auraient caisse entend simples maladie menu chances commerciaux printemps Benelux poser Asie l'utilisation usage PIB actionnaire prennent résistance Dow surprise Etats mariage nécessité Puis cote Plusieurs beauté exclusivement lettre payé rendu s'ils software utile gestionnaires bénéficie procédé vaste crois normal Centre construire démarche emprunts naissance D'autant d'information distance tourner Club attendant quantité roi l'assureur tourne ajoute bancaires ajouter géant automatique faux attend litres présenté argent confirme indépendants l'ordinateur énorme destinés l'avantage véhicules ressources standard auparavant construit Quelle principales quelqu'un disposer global écoles Quel réputation fameux rappelle conseille heure veille difficulté l'état limites commerciales samedi palais vend vit Tractebel connaissent reprendre village emploi amis budgétaire croit mises souci contient habitants Weekend bras beaux bruxelloise faisait introduit intérieur outils précis chercheurs taxe salaire transactions Christian chambre portée réflexion C'était d'emploi hasard matin assureurs réforme Beaucoup fournir recherches liés tenue proposent aide ferme l'enfant l'or secondes CGER contenu quotidien flamande centaines course billet critique l'arrivée naturel principale support week-end Dehaene Gand chargé économies Nos augmente guide proposition laissé spécialiste francophones importance vent conception préférence spectacle avenir d'entrée grave commencer d'années diminuer chercher bonheur dizaines d'environ exactement outil scénario Jones coups émissions éventuellement Royale l'agence soumis d'exercice lecture monter Grand central exigences assuré contacts consacré l'attention d'administration due faut-il réussite échéance recevoir tableaux arriver évident art Italie amélioration auteurs estimé quinze Russie demain précédent vendeur événements autrement experts fortes furent possibles circonstances placer publication l'écran réserves sauce venu Charles collaborateurs implique l'assurance obligataire établi CD-Rom forcément l'essentiel l'enseignement remarquable vol Claude tourisme internationaux directe compétences conseiller facteur l'est plastique rarement Royal affiché lutte relative actuels envie l'équipe ministres secrétaire capitalisation langage positive circulation convaincre notion visage vouloir ajoutée caractéristiques Eric Union paix puisqu'il courrier disposent développe présentation barre comparaison déterminer firmes fournisseur informatiques luxembourgeois achats solde Serge globale propriété stratégique Renault partage porté sources Kong cour destinée absolument branche l'objectif ouvre plans productivité Résultat améliorer d'obtenir joué Parlement dépit fichiers personnalité constitué gestionnaire profession qualités conscience médecin celles-ci design décor faudrait participer appelle forces suisse appareil conduite D'une longueur tarifs vérité lien locales francophone clubs correspond coupons d'émission estiment défi protéger réalisés d'emplois d'éviter l'ouverture méthodes revenir superbe volontiers document nommé tente financer scientifique Georges travaillent l'investissement lié zones aime lettres ouverte Hong L'année murs philosophie rappeler utilisés suivante d'année représentant traduit remettre situé différente longs économie discours distributeur domaines l'introduction régional faites italien restera usine Group l'informatique personnage portent attendu l'option Jean-Pierre articles changements fallu léger mener propriétaires spécifique récupérer voyages procéder locale médecins privés transmission concurrent courte quart baisser pieds publié Ford menace réunion transfert composé dimension personnages ralentissement conclusion l'usage agents parfum rémunération difficiles l'entrée mettent pierre proches réglementation salles grimpé prochains prévue électrique dynamique exposition installé plancher distributeurs déclare connue n'avons préparation réalisées beurre opérateurs achat province spécifiques Albert l'usine l'existence renforcer téléphonique comptable effectuer trafic degré l'ont définitivement humain optique remarque talent appelé modifier définition peintre respecter stade statistiques certificats s'attend limiter livraison placements raconte volumes immobiliers Fax anciennes chevaux médicaments Peter feuilles football identique pouvons remise structures tenter accords cotisations indice neutre Mon constituer d'accord montrent placé loyer proximité voient épouse Canada entrer postes précision cité concours patrons populaire pétrole négatif allemands d'activité roman victime italienne ménages repas PetroFina langues tendances D'autre pire prudence savent Néanmoins conduit mille rénovation égard Américains exercice l'étude s'impose avance effectué fortune fournit lecteurs Morgan découvert l'inverse différent emploie bleu royal technologique télécommunications Amsterdam fiscales indique information lourd signal Mieux aider ancienne apporte nette prestations publicitaires sensibles communauté l'émission lit volatilité étape assurance jusqu'en lancée résoudre garanti modification revue spéciale www chacune l'analyse différences messages priorité recommandation récent charme dividendes Olivier passent finale immeubles logement pourcentage rire stabilité difficilement défense l'ancienne magazine D'un eaux jeunesse l'intention continuent révolution étonnant organisation constater dos emprunt oui éditions Daniel sel utilisée compartiment publicitaire article bande capacités centrales considérée milieux occasion quasiment pouvant Vermeulen-Raemdonck visiteurs chambres considérablement demi découvre essentiel broker dettes mardi reconnaissance salariés formules grosse heureux perd radio allait multimédia partiellement seules Gérard Oui Securities toucher jugement l'oeuvre considérer remplacer couvrir précieux segment dessins espace indices refuse chefs exemples rejoint spécialisé l'amour l'exportation objet précédente rose versions d'études destination Encore deviennent l'Italie personnelle plats vingtaine l'expérience virus Faut-il chasse longues Toute bases cotée final monnaies travaillé apporter aspects disparu David Management port racheter relever Celui ING catalogue centaine chaleur profil représentants conclu réside scientifiques Chambre secondaire Fin serveur XIXe exige grimper immeuble l'Université montants paysage vendus ton assurances catégories dure décote soutenir édition dangereux agréable voulait combien d'application disparition optimiste plus-values tomber erreur l'augmentation situations spécialisés subi suivent Jusqu'au classement l'exemple norme rentable sang socialiste tombe Justice attitude mines qu'aux liée plantes vague General l'immobilier légumes Ceux-ci conflit excellent licence travailleur appris est-elle gagne mari préparer purement située vérifier Jean-Luc gain métal surfaces L'objectif d'épargne douze expliquer lorsqu'on meubles yen chaussures créée institution l'accent solidarité Maastricht basée journal soin sourire Guerre bouteilles flexibilité maintient appartient moments rouges L'an basé devons installations Bacob association d'obligations format City Page disques modem mélange ordinaire vide chimique disent pharmaceutique d'assurances numérique porteur répartition blanche composants future parvient évoque Durant calme cru Electrabel culturel grosses baissé lois moteurs principes trente éventuelle Peu prévoir tours Pentium acheteur dimensions fonctionnaires organisé rencontré russe savoir-faire établissements Fédération Toujours créativité top application dépasser importe jaune l'application marqué mécanique socialistes tranche Quelles envisage traiter Surtout acheteurs chinois claire l'Institut vécu Objectif bail demandes diversification montré renseignements souscription Tokyo entendre tests Siemens filles unité Bekaert UCB composition resté sinon agence fini modifications Cash industrielles obtient permanence restaurants réels échange florins l'accord terrains émergents atouts offrant LES bouche champ chaud l'annonce monte preneur présents quitte tarif facture fiscaux modeste processeur Fund avenue compétition relevé tenté Est-ce Musée bijoux différentiel déclaré institutionnels l'employeur traité Intel traditionnels victoire connus correctement pub Dominique Tant accessible rencontrer stocks Art espérer jouent menée nécessite provenant utilisent affichent délais inférieure sent spécial Amérique acquérir album idéal l'écart véritables associé candidat connaissances l'énergie signes cheveux conserve stress d'Anvers d'action directeurs donnée endroit l'emprunt l'impact der traditionnelle Martin ciel convention obligataires prouver Espagne Petit Source dessin humaine l'huile lait Seule Thierry boursiers continent destinées flamands néerlandaise pensions commencent considérable nationales nul s'adresse conjoint crédits militaire morceaux privatisation repose sommeil traditionnel PSC Seul capables combat finances puissant s'agissait Bill Renseignements physiques Richard allant créations toile évidence convaincu excellente retraite théorie transformer Tour transaction visant Deutsche Mons attentes cycle détails Votre héros l'artiste l'université sérieusement uns Ceux considération impose propositions Autrement cap forts l'Afrique usines Afin Quels aisément ressemble risquent totalité imaginer originale intégré intéressantes l'extérieur loyers auxquels circuit indépendant intérieure jus maintien cotisation l'Asie moyennes quitter stable CVP Compaq galerie liens souffle GIB apprendre concert l'exception l'échelle liquide nez noire température transparence école champion diminué désir ressort voulons équipé alimentaire den organisations présidence raisonnable ratio recommande utilisant accepter accepté cache chocolat chuté comparer courts figurent passagers prison viande associés esprit froid jeudi liées revu satisfaction satisfaire test tiennent vraie contrairement dépassé extérieur qu'avec ami American Etat complémentaire déclarations réactions Fonds artiste conclure déduction remis L'indice déterminée fiscalité grand-chose humaines réponses équipes ITL Michael Systems aspect commercialisation manger RTBF engagé obligé proportion signature étranger imposé s'applique silence vote Afrique Mobistar cible contemporain fondateur Jean-Claude communiquer d'investir existent majeure ouvrir électroniques JPY TGV compétitivité erreurs notation rang Apple accident certificat exceptionnel http proprement riches Barco Quoi violence adapté bénéficient récession sentir armes arrivé crainte garanties l'automne ménage officiellement ouvriers Autant discussion rejoindre époux citoyens concernés d'inflation définir L'idée Paribas Telecom d'aller fabrique feront née oblige patients pensent responsabilités doublé fraude l'article organise Henri conclut désire l'appareil l'association l'installation législateur écrans choc gratuit mobile naturelle dialogue révision familial lourde poche décider négociation tort Maison Trésor constante cotation déterminé l'instar managers opté transformation Life anniversaire compétence géographique mandat réservé établir Business fins richesse CAD commente intermédiaire l'univers retrouvé sciences Sun banquier former monté parfait veux René investit l'oeil n'aurait parvenir vieille collections dirige fonctionner mauvaises tapis venus Contrairement Suez piste pistes tensions campagnes investis proposés sac tabac bataille britanniques fine liégeois partenariat privées remplir supérieurs Beaux-Arts Christie's laser restauration Dutroux chimie rendent textile Brabant Colruyt James National Quatre préalable souvenir venue Communal avocat comparable consolidé critiques interdit l'initiative mine quotidienne rigueur réduite tissu Invest pain participants procédures profondeur retrouvent rues taxation Mexique asiatiques conducteur demandent environs fermeture gris rumeurs accueille amoureux d'augmenter défendre l'immeuble pure souffre créneau d'énergie journaux s'explique seuil Jeux Office auteur cash-flow fichier foi instruments quelles séance véritablement Yves attirer civil civile d'aujourd'hui eau l'épargne station courbe hectares influence ingénieurs tables vivent Exemple L'un blancs couche cuir devenus extraordinaire patient peux aient animaux associations d'utiliser foie initiative l'Amérique poursuite survie Face apparemment consultant expansion l'exposition séjour champagne commentaires complexes cylindres décennie rendements retenu sais sujets cuivre offert réagir sec varie Fondation artistique communications monétaires métaux permanente positifs électriques basse concentration investisseur provoqué doux stations coin modifié avocats estimations original souplesse Attention Frank Hainaut Suite annuels cellule clause exemplaires malheureusement minute normale Frédéric Sud-Est atout latine logements pilotes susceptibles Roger XVIIIe ordres remarquer actuelles bouteille constat opportunités prépare vendeurs accrue fruit jugé l'amélioration loisirs pur trentaine bus gendarmerie air alimentaires coté modernes préciser réussir laissent parfaite spécialement évoluer Dewaay Désormais Groupe maladies négligeable tension Lion chansons dite festival négative préféré restant Cera adopté coopération distingue douceur retirer technologiques Editions Parfois bruit comptant démocratie exception mercredi offres sucre vedette évolue British Leurs compromis hauts élevées émission Faire attendue d'appel jusqu'ici lourds quels soirée événement alternative chimiques conférence quitté serveurs Brésil CD-ROM correspondant l'avis locataire matériau périodes utilisées d'emblée l'aspect morale équilibre Sony fixer gratuitement trait Trop adultes consacrer d'importance normalement parole prochainement suscite verra clé mesurer notes potentiels relatives Flamands Francfort L'homme Palais Plan République l'armée transports Portugal couvert joueurs Malheureusement coupe dispositions effort endroits aides contribution insiste s'inscrit souhaitent communal impact progresser Sambre administrateurs d'ordre deviendra dégager formations l'ouvrage souscrire cellules facilité gras militaires passés quinzaine souvient automobiles bref confortable essentielle officiel vive vols Marcel Top combinaison distinction définitive japonaise liaison tissus cadeau canadien distribué existants ordinaires servi surveillance l'architecture l'aéroport médecine n'aura n'étaient revoir récentes voies L'obligation Rappelons comptabilité fabriquer fasse intéressants peintures quartiers valable étapes bénéficié couvre diminue envers introduire missions s'attendre Petrofina apparition coffre digne fibres initiatives littérature rembourser retrait Bundesbank D'ailleurs Pascal Pologne consacre employeur favorables l'approche manquent assurée battre chantier conclusions consulter craindre d'utilisation vivant Chacun internes apprend liégeoise observe provenance sortes Marie cessé céder estimée marchandises Poste balance copie cuisson négocier spéciaux traite Bruges hollandais peut-on porteurs régler soutenue suivie Stanley accueillir médical notoriété provoquer sensibilité vocation L'investisseur for impression l'ampleur séduit conflits imposable journalistes manifeste provoque wallons éditeurs EUR canal fondamentale futurs graves mené mur pommes racheté remonte solides suffisante chargée chers discussions garantit indicateurs provient soutenu sportif systématiquement zéro comptent recette récit subir évolué Johan accorde faciliter hausses Macintosh Services d'imposition débuts garantir portefeuilles susceptible universités Glaverbel Sotheby's actes brasserie caractéristique cherchent favoriser justement prudent stock échelle énormément Standard compose couronne exceptionnelle flux j'étais justifier réfugiés téléphoniques Monsieur Ville accepte inspiré l'ombre pollution situent allemandes boissons douce gouvernements intervention motifs primaire World entrepreneurs l'efficacité représentation Thomas apparaissent complémentaires cycliques franchement instrument rayon Food Roi conversion partager retenue simplicité Comité confirmé devaient expériences front jeter logistique reconnu Affaires Heureusement comédie historiques imposer l'actionnaire obligatoire recourir références traces témoigne GBL Java acte appliquer catastrophe conduire contribué fais intervenir mettant pilote plafond remplacement tire Berlin Vincent portable profonde refusé repos béton fermé juges parlementaires prévention Donc d'électricité dispositif forment neige suffisant Louvain diffusion fédération lentement prenant souris contenter douleur intervient j'avais look manoeuvre parquet poussé arguments billets consacrée dirigeant décoration holdings justifie levier majeur midi recyclage robe Entre-temps appels directive initial intéressés pousser pouvaient secrets surpris univers d'avis poisson spécialisées séduire verser d'investissements générations nettoyage ouverts réductions vélo Anne Compagnie Souvent d'Amsterdam explique-t-il l'abri l'intégration officielle résolution Service courses l'exploitation pari pousse revendre trace abonnés craint croissant juger régionale symbole touristes Rome actives communautaire contraintes journaliste traditionnelles variable amour atelier budgets budgétaires clef d'ores détriment nationaux paquet relatif Francis Rupo d'enfants diesel gare l'acquisition parlent rapporte regarder éventuel Clabecq carrés psychologique rupture téléphonie Air Danemark Sauf citoyen four permettrait puissent rapides Marketing Tendances dit-il développements enregistre envoyé intermédiaires l'issue liquidité réagi Allemands L'autre Louise connues consolidation créateur idéale l'espoir profité prévus résulte similaire Boeing Didier Dieu Willy agir coins constaté d'eux danse occidentale optimistes pensée professionnelles Computer San Tournai appliquée chanson déroule franchir liquidation morts nouveauté prestigieux suppression Laurent Mercedes existantes pleinement simultanément établissement cercle corruption discipline familiales l'avant laboratoire livrer montée participe Personne adresse finance génie leasing versement bits concernées dents inclus maximale précédemment routes variations équipements Declerck chemins constituée d'effectuer globalement libres proposant souligner Bon ambitions croissante décennies fou l'influence littéralement motivation rubrique souvenirs surprises vendue Celles-ci bébé plainte stockage écrire énergie Spector annonceurs d'olive débats ferait grain sont-ils séparation tournant vendues Compte Cools Volvo accessoires constitution consultants dommages occupé s'appelle échanges Seconde adresses efficacité fixée frappe l'apparition monopole panneaux restée sentiments terminé utiles Bruno Seuls appliqué donnant fondamentaux fréquemment l'aventure métiers planche royale suppose Inc Moins fourni japonaises payés profond programmation résolument L'Europe d'amour d'ouvrir golf poudre proposées étoiles PRL attaché concevoir dommage l'opinion main-d'oeuvre récents stratégiques vitesses Peugeot Philip apprécié connexion hommage jardins remonter supplément Canal Tessenderlo cheval entretien inutile l'Espagne laissant mécanisme nouveautés placés repli régionales régionaux souple symbolique troubles évaluer Aucun Mac Régions cession confie moyennant numéros portrait établie cinquantaine d'assurer peuple promis retenir réception sexe utilisation visiblement acteur créateurs dites déposer expositions handicap lourdes plastiques procure proviennent sous-jacente Quick Virgin auxquelles banquiers baptisé finit venait volant Fiat Joseph Lyonnais enseignants geste l'UCL sérieuse Mignon Royaume-Uni Vers classes doigts encadré froide niche prévision servent Baudouin Nicolas Smeets arrivée domestique envisager espaces filet inflation posé promouvoir roues Assurances Capital immense incontestablement lot pharmacie restructurations sportive L'ensemble ci-dessus d'activités engagements humains introduction organisée Delvaux assiste couverts franchise L'histoire annuellement arrivent causes pierres valent volet Hanart Karel Lotus intention l'acheteur manifestement prendra profondément relance suivantes suspension commissions divisions développée employé fourchette qu'est s'occupe vendent Clinton Jean-Marie Maurice Nationale compenser d'octobre essayer fondé formidable graphiques professeurs tester George Histoire boutique caméra d'avance fondée heureusement label montagne pensons plate-forme temporaire tombé tribunaux évite BMW Monde condamné culturelle d'air entre-temps entrées installer perception sauver thé Fermé Peut-on Unilever accompagné externe franchi jadis manifestation miracle moral refus réunit révéler s'installe Etienne Evidemment bateau conseillé d'écart décrit fréquence l'occurrence s'adresser taxes Company concentrer consultation dorénavant dynamisme installée profite réunions amateur avoirs calculé d'atteindre estimation exerce bloc circuits couper courante d'améliorer d'instruction effectués fameuse intéressé montage prévues subsides séduction traités trouvera équipés Aucune ingénieur réclame rémunérations tentent tournent égale émetteurs Prenons agent attentif d'aide d'oeil existant fluctuations gré l'administrateur médicament partiel permanent s'installer situés sportifs vertu Intranet L'évolution Quelque allons appartements duquel kilos sicav toit versées chaussée d'huile futures individuelle manifestations raisonnement sports Christophe DES absolue appelée contente d'idées d'investisseurs intense money répondent tranches Waterloo assurent calculer choisit citer doté fixes inférieurs mensuel promoteurs relais sorti télé voisin Corée Lynch dit-on hiver l'Association l'ULB naturelles preuves présentés souffert Qu'est-ce attendent camions camp contenant curieux détente effectue géants l'endroit l'intermédiaire légale n'étant prestation publiés rente réalisent ski soigneusement vif Cie conviction doubler morceau racines tenant universitaires visiter Center Global démarrage entamé fondamental l'intervention magique procurer records universitaire vrais L'une ateliers avion confronté contribuables doigt drame féminin habitudes l'immédiat lutter pétrolier supérieures vois AEX Bell afficher confirmer conservé d'offrir détour fusions l'avons l'équilibre lever malades ouvrages paradis prouve prévoient remplacé spéculation Rwanda concernent départements dérivés identiques marquée n'avaient prince produisent résidence voulez L'opération Turquie allocations démontrer enregistrée individuelles oublié parking proposée Commerce Guide Tom comprenant débuté engagement fit légal participé passées présentant présentes quantités échapper Maystadt Software acquisitions affirment alentours assureur autonomie canaux inverse l'adresse l'automobile modes signaler signée Goldman Notons cancer carnet convergence foule indispensables intégrée nucléaire opérateur paiements palette pence priori promesses tentative Belgian Corporation Dutch Tel aérienne boutiques craignent débiteur entités ouverture procureur puisqu'elle sommets supporter traitements voyageurs Bureau anglaise argument d'établir imaginé l'appui mécanismes personnelles privilégié satisfait science terrasse tiré trésorerie télécoms D'ici chaude coupé esthétique inscrit poissons refuser s'effectue tennis Moi Unix appartement clavier démontre organismes pressions regroupe secours sous-traitance théorique accessibles courants d'été judiciaires l'innovation l'opérateur précédentes réaliste aventure d'Internet effectifs gains l'opposition l'unité musées rock Coupe Netscape bain déposé espoirs majoritaire semblait Digital accorder attire d'échange feuille initiale installation krach malade opérationnel pauvres pont préserver publier rechercher recrutement représenter révélé sanctions traditionnellement vapeur Cobepa Salon confier considérés cultures hypothécaire illustre introduite l'échec menus multinationales paient pareil problématique quarantaine rentrée soutient terminée voudrait carré exemplaire lorsqu'ils nulle posent pratiquer sida versements visites étions étrange CBR berline cash distinguer durs défend efficaces essence exclu jolie photographe propriétés veau Journal Nobel Vieux atteinte chapitre concertation dégage extérieurs médicale pareille patience recueillis substance transforme voile échec Léopold enthousiasme fédérale gloire préparations transmettre visiteur Ajouter Brederode Européens Jean-Louis Tony apporté d'importantes l'acier libéralisation observateurs panique présentée réserver signer tendre touristique Récemment brillant conventions décret généreux industries joie stars égal Sachs continué dessert espagnol est-ce légende passera rapprochement salariale scolaire Monétaire assurément contraint coton curiosité entité entré l'architecte libéraux logo parlementaire parviennent portables provisoirement routier réservée tourné veiller Hoogovens XVIIe arbres communs employeurs exercices faisons l'alimentation magazines maintenu roses répondu spécialité Citibank Moscou Times accidents adapter amené avoue collectif d'évaluation dessus indépendante l'institution l'établissement peintres rappel réalisations s'avérer architectes comprise essentielles examen fidélité héritiers l'actualité préférable relancer s'adapter s'engage sable semestriels significative suisses Grande Nouveau cadeaux comportements constamment contribuer d'images offerts périphérie varient Michelin caisses conscient cédé effectuées faisaient personnalités s'engager syndicat Arbed OPA abandonné cents destin drogue fines identité invités l'événement modalités négatifs paru répertoire s'intéresse Disney Isabelle Japonais Roland William annoncée champignons défis générer russes situer supprimer élu Jean-Paul Spa accordé acquise courtier d'attente foulée noirs résister section signaux sombre susciter compartiments correspondance créances discret dépassent florin formé frappé papiers représentait saurait versé absence d'Or d'acquérir d'avenir degrés envoyer joli occupent on-line percée priorités processeurs restés résume soie travaillant économistes Etant affirmer ambitieux cerveau consensus coordination d'options l'appel magistrats qualifié rangs tournée Alcatel Toyota anonyme cassation cf (usually cf.) confusion discrétion fondamentalement initialement installés l'assemblée l'entretien l'émetteur maman nuances paraissent parfums saine vedettes Nikkei dirigée duo enseigne indiqué lourdement module prononcer réalisateur réformes star équivalent Danone Site adopter commis couches explication joint-venture malaise pantalon pomme reine sacs saumon soeur toiles échéant Agusta bond courir expert glace l'enseigne multiplier pluie salons teint European Finalement Maintenant adaptée diriger gérant répartis saveurs souscrit substances vieilles vraisemblablement élaboré émettre certitude champions cotés cyclique détenteurs explications fonctionnent générales invite l'expression pauvre successeur zinc Big Claes Six brochure cave codes configuration d'enregistrement fragile féminine issus magnifique maintenance manuel qu'a recommandé spectaculaires subit traduction évidente Conséquence Fabrimétal KBC adaptés chronique d'IBM enregistrés fibre jazz jusque louer médiatique peser rentables réussit s'élevait saisir semble-t-il visible Financial Singapour absolu blanches boulevard commissaire comprennent créent faculté histoires individus issue multiplient prétexte quotidiens réfléchir satellites souffrent standards Washington commercialise directs diversité gratuite l'Office logiquement ouvertes renoncer calculs compléter couples d'entrer d'esprit d'importants l'acte organiser payant paysages récupération slogan Electric PVC administratives arts avancé carrément changes crédibilité déplacement l'avance parvenu relatifs revues veste Celle FGTB Moody's assurés créés d'éléments immédiat jambes litre mousse prestige sentent souhait touché élus Belle Telinfo abrite considérables d'urgence disait faillites oeil religieux rédaction séries terres vice-président MHz System XXe cure dirigé don enregistrer juridiques pouce précises prétend réunis salade trouvait évaluation Cinq Fort confié cuire indicateur l'avait origines parlé remet spéciales terrible témoignent étonnante Buffett Catherine Research SAP Véronique achetée généraux imposée l'organisme l'édition mention merveille opposition réorganisation satellite scanner Milan Notamment a-t-elle acier conteste créanciers d'acier intégrés l'habitude multiplication panier pharmaceutiques quelconque rayons spectateurs transformé troupes Madame Tandis effectuée fromage géré interlocuteur législatives motif métalliques placée réclamation schéma surplus transition trio Coca-Cola Motors Proximus Wallons atteignent bleus chair conforme costume d'accueil intentions l'horizon l'électricité manqué sortent subsiste supermarchés D'Ieteren Européenne Lorsqu'on amélioré avantageux d'applications engagée espoir exceptions fausse l'expansion l'équivalent plage plaide poivre CHF Livres cadastral chips comptait craintes d'ordinateurs durable démocratique exceptionnels factures fonctionnaire fondation indépendance inventé issu maturité mobilité musiciens organisme recommandations spéculatif suscité titulaire traverse évolutions Fed calendrier collective disposant dévaluation l'honneur pauvreté poursuivi qualifier savait suédois termine traduire valait CSC Forges Hugo Max VVPR appartiennent confrontés demeurent divorce dramatique déductibles efficacement existence fermeté imagine intégrer larges locataires orienté pensé variété administrations aériennes complexité entrent exercer photographie sauvage terminer venant Corp amortissements champs déplacer désigné déterminant opportunité piano remontée s'agisse étroite Difficile Dix Recticel bar concerné constructions l'identité merveilleux min moindres réunir survivre ultime étudié Lambert caractérise choisie distribuer décidément limités livré luxembourgeoise modules progresse promet redresser tombée bains d'hommes dessine enfance finition jury mythe optimale pair plateau poussée resteront Zaventem assurance-vie composée d'entretien décident hélas instant jet laine mobiles parcs préoccupations ramener représenté soudain éditeur José L'auteur Morris Nasdaq administrative autorise banking humour jouit l'actuel market n'ait organisateurs peint s'annonce s'assurer sculptures superbes équipée ASBL CMB Gates bronze catholique citron contributions couture disquette démarrer excellence fatigue imprimantes industrie l'aménagement l'effort l'encontre laboratoires menées meuble mondiaux réduits sont-elles sous-traitants talents Christine Henry administratif administration ailes aérien carrosserie d'économie découvertes exclure hautes hiérarchie impressionnant massivement métro possession remporté strictement suédoise utilisateur vais émises étage d'arbitrage devez expliquent file hebdomadaire intéresse l'hiver l'élaboration marbre performant personnels prévenir suivants verte viendra Angleterre Association Hongrie L'affaire Louvain-la-Neuve apportent automne bourgmestre branches carton contraste courage d'analyse datant dépendra feux importations plantations sidérurgie signale FMI Jean-Michel Léon Super Venise adaptation allure attachés exploite folie instance naturels olympique populaires reprenant valorisation villa villages Est-il Renaissance Shell Vienne architecture authentique autonome complicité d'au d'ouverture dépendance dépense fiable invention lancés partagent rencontres renouvellement évoluent Akzo Combien Marché Xavier ampleur analyses bandes canard collectionneurs compliqué culturelles d'avril donnera déplacements fermer jugée l'aise médaille notaire peut-il privilégier prototype regain regarde wallonnes Emile Volkswagen accru caoutchouc cinquante communautaires conjoncturel créant durer délicat exigent précédents renforce s'ouvre évalué Lille débute définitif engagés exploiter fur positives réparation soupe transferts Ostende Propos Victor limitées nourriture offertes ramené reculé remédier similaires triste écarts Data Industries abaissé boire break chien consacrés cours-bénéfice fuite gigantesque imprimante l'Ouest l'emballage l'église remplace salariaux spectacles vache velours étudie ABN Auparavant Cité Continent Guido Meuse Question d'exemple dotée défini définit délicate démission extérieure interventions jouant l'engagement n'ayant noires obligés Bruxellois Mark Motorola accéder affichait chemise espagnole fleur gardé habitation huile l'accueil légales multiplié revers architecte assister axes concerts contemporains discuter dose détiennent folle l'éditeur magie pompe provisions rapidité témoignages Cap Festival Finlande NDLR contribue demandeurs démonstration exact numériques participent poignée puissants spécialités G-Banque III Livre Peeters SICAFI Technology applique copies flacon lunettes mixte nullement plante provisoire publie puissante regrette s'ajoute stratégies typique vocale Anhyp Brothers brokers concentre diagnostic faciles gestes guise hardware opérer orientée passionné refusent scénarios suffisent vagues écart Chrysler Sénat Via ambiance appartenant assisté attrayant bagages blocs d'essai d'histoire d'étude déduire forfait manquer restait surprenant sérénité vertus écouter DKK Dirk Gevaert Santé Wim accueilli affichés affronter appeler coloris composent contiennent contrepartie fondamentales impressionnante largeur peaux proportions reconversion revente significatif écrite énormes J'aime Network aiment cherché chinoise décharge député essais indiquent infrastructures jouets musicale mutation obstacle partant perdent étudiant J'avais Sinon accordée adjoint débarrasser débit dégustation déjeuner glisse individu l'éducation l'électronique organisées produite prétendre quotidiennement s'étend secondaires soucieux sous-évaluation verts écologique émet Hollywood Legrand Lorsqu'il Pro améliorée bat e-mail excessive favorise joueur l'OCDE marks office phrase promenade prometteur stimuler séances tiendra valoir Martine Québec acquisition augmentent baisses distribue dus massif médiocre obtenus rentrer sales semblable transmis Julie Place ZAR bouquet ceinture coalition comptables corporate d'actifs d'attendre différemment dits italiens journées l'assurance-vie linguistique marchands n'avoir opinion originales registre requis synergies tunnel vogue Malaisie charbon emballages esprits examiner fléchi l'outil librement mentalité miroir occidentaux parité progressive sensation sonore supports synonyme vinaigre Début Euro Hollandais alliance barres chargés d'habitants dois fier gouverneur l'atelier l'humour n'avez origine payée pétroliers signalé variation Point XVIe aliments caméras comportant consultance contemporaine déclin effectif invité j'en l'actif licenciement match millénaire salarié studio tenus triple équipement étoile Bob Californie Devant Smet abonnement baptisée commerces creux facilite flamandes jurisprudence l'ai l'attitude noyau portraits prononcé publications puce qu'aujourd'hui sinistre terminal Dexia Mes augmentations batterie cinéaste compare guides inconvénients instances l'avion retourner sympathique évaluée L'Etat achetant bailleur bonus colonne compensation conseillers continu courbes déclarer enregistrées généré innovations ira jusqu'aux lente occuper pesé pot quarts épreuve Bois Congo Courtrai Powerfin admet attribuer championnat cités comble conquérir d'encre d'oeuvres d'office devenues excessif incertitudes intitulé l'évaluation périphériques réclamer réelles s'étaient Ecolo Nivelles Qu'il Travail allures camps dues exclus grandeur homard illustré inévitable inévitablement l'équipement mariés modération ont-ils positivement profits quarante sculpture spots stage universelle vainqueur édité étendue Arts Communications Media Novell Poor's Stéphane Word changent communiqué conversation d'artistes effective interlocuteurs l'Administration l'ambiance n'aime patronales permettront pneus qualifiés religion souffrir évoqué Chirac Chris Forest Herman Hubert Opel Parti SEK Terre Vie alternatives anversoise bateaux battu brillante d'introduire désert entrepreneur essayé interface intégralement j'aime modifie personnellement systématique Arthur Park admis blocage calls développent individuel l'ONU l'appréciation modestes multinationale out parlant porcelaine pénétrer respecte soupapes spéculateurs étudier Nestlé abus combler conservation donation fiabilité l'exclusion m'ont parcourir parisien remarquables retournement returns EASDAQ Kodak PDG collecte d'alcool déception détérioration l'avoir l'échange lorsqu'elle palme phases privatisations répéter s'imposer valu voulais Almanij Infos Procter Smith Tubize actuariel australien croient d'intervention d'objets encourager fiscalement hautement l'assiette marchand néerlandaises plaintes reproche retient sillage soldats témoins urbain FEB L'économie adopte boutons chuter conjoints convaincus coopérative correspondent director n'hésite niches savez stables tend vain Gamble L'art Quinze Servais Seules apport chauffage commercialiser d'attirer d'existence d'organisation dangers foyer ingrédients négocie révolutionnaire score sidérurgique techniciens voyageur Brown Corluy Herstal Horta L'avenir attiré com conférences constatation d'Amérique douzaine duration détenir indemnités lion nuits plomb soumise sportives verres attribué corriger d'hiver domestiques faille foot home indemnité romantique simulation Brussels L'avantage Swissair autrefois choisis communales d'Angleterre dessinée disponibilité détenu engager exceptionnelles figurer habitant hollandaise immédiate intégration média électeurs Amro DOS Moniteur Parc acceptable apprécier centre-ville d'elle envisagé fantaisie habituellement posséder pourrez tentatives touches visibilité Creyf's Heineken Régie Sterk Tchéquie analyser autorisé complets contrainte costumes d'agir doucement";

loadDictionary(frenchdict,"french");
loadDictionary(englishdict,"english");

function unloadDictionary( name ){
	delete dict[name];
}

function unloadAllDictionaries(  ){
	dict = {};
}



function loadDictionary( dictionary, name ){
	dict[ name ]={};
	// Get an array of all the words
    var words = dictionary.split( " " );
 
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ name ][ words[i] ] = true;
		
    }
    return dict;
}

// Takes in an array of letters and finds the longest
// possible word at the front of the letters
// from http://ejohn.org/blog/dictionary-lookups-in-javascript/
function findWord( letters, dict ) {
	
	// Clone the array for manipulation
    var curLetters = letters.slice( 0 ), word = "";
    
	
		
	// Make sure the word is at least 3 letters long	
	while ( curLetters.length > 2 ) {
		// Get a word out of the existing letters
		curLetters=Array.prototype.slice.call(curLetters);
		word = curLetters.join("");
		
		for(var dictName in dict){			
			// And see if it's in the dictionary
			if ( dict[ dictName ][ word ] ) {
				// If it is, return that word
				return {word: word,dictionary: dictName};
			}
		}
 
		// Otherwise remove another letter from the end
		curLetters.pop();
	}
	    	
	return {word:"",dictionary:""};
}

function easierToRememberPassword( allowedCharset, length, password, previous ){	
	// if we're done return the generated password
	if( password.length >= length) return password;
	
	// make a word or a number of an arbitrary length (or remaining characters number)
	// alphabetic words may be longer than numbers
	var passwordAddon="";
	var lastItem;
	var remainingSize = length-password.length;
	
	var addonMaxSize=remainingSize ;
	var addonLength;
	if ( previous === "word" ){
		if( addonMaxSize > 6 ) addonMaxSize = 6;
		// improve chances for a year
		if( addonMaxSize > 3 ) addonLength=4;
		if( Math.random() > .6 ) addonLength = Math.ceil( Math.random() * addonMaxSize);
		
		
		//  check if allowed charset contains numbers before adding any
		if( allowedCharset.indexOf(classifiedCharsets["numeric"]) != -1 )
			passwordAddon=easierToRememberPasswordNumber(allowedCharset, addonLength );
		lastItem="number";
	} else{
		if( addonMaxSize > 8 ) addonMaxSize = 8;
		var addonLength = Math.ceil( Math.random() * addonMaxSize);
		// word
		passwordAddon=easierToRememberPasswordWord( allowedCharset, addonLength );
		lastItem="word";
	}
		
	
	// Maybe pick a separator, or an open-close group
	passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
		
	// append or prepend to previous password
	var newPassword=appendOrPrepend(password,passwordAddon );
	
	// recursive call, do this amn arbitrary number of times until length is Ok		
	return easierToRememberPassword(allowedCharset, length, newPassword, lastItem )
}

function addSeparatorOrOpenCloseOrNothing( allowedCharset, maxLength, currentPassword){
	var remainingLength=maxLength-currentPassword.length;
	
	if (  remainingLength  >= 2){		
		if ( Math.random() > .6) {
			var index=Math.floor(Math.random() * classifiedCharsets["open"].length);
			if( allowedCharset.indexOf(classifiedCharsets["open"].charAt(index)) >=0 &&  allowedCharset.indexOf(classifiedCharsets["close"].charAt(index))> 0)
				return classifiedCharsets["open"].charAt(index) + currentPassword + classifiedCharsets["close"].charAt(index);
		}		
	}
	if (  remainingLength >= 1){
		if ( Math.random() > .5){ 			
			var charToAdd = pickOneFromCharsetWithPreference(allowedCharset, classifiedCharsets["separate"]);
			var strToAdd= charToAdd;
			// repeat chances			
			while( remainingLength > strToAdd.length &&  Math.random() > .7) {
				strToAdd+=""+charToAdd;
			}
			return appendOrPrepend(currentPassword, strToAdd);
		}
	}
	return currentPassword;
}	

function commonCharset( charset1, charset2){
	var returnCharset="";
	for ( var i = 0; i < charset1.length; i++ )
	{
		var curChar=charset1.charAt(i);
		if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
	}
	return returnCharset;
}

function appendOrPrepend( existing, addon){
	if ( Math.random() > .5) return addon + existing;  
	return existing+addon;
}

/**
 * Creates a word for a password easier to remember
 * @param {string} allowedCharset The characters of the custom charset
 * @param {number} length The maximal Length of characters
 * @type {string} the generated word
 */
function easierToRememberPasswordWord( allowedCharset, length ){
	var type = Math.ceil(Math.random()*3);
	
	return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
	
}

/**
 * Creates a word for a password easier to remember, recursive internal function
 * @param {string} allowedCharset The characters of the custom charset
 * @param {string} currentWord The word being built
 * @param {number} length The maximal length remaining
 * @param {number} type The type of word being generated
 * @param {number} lastTaken The last type of character taken 
 * @type {string} the generated word
 */
function easierToRememberPasswordWordRec( allowedCharset, currentWord, length, type, lastTaken ){
	if( currentWord.length >= length) return currentWord;
	
	var maxLength=length-currentWord.length;
	
	if( type == 3 && currentWord.length > 0){
		type=1;
	}
	
	var addOn="";
	
	// take vowel or consonant depending on last type and append
	var takeFrom=classifiedCharsets["consonant"];	
	var newLastTaken=1;
	if (lastTaken == 1 ){
		takeFrom=classifiedCharsets["vowel"];
		newLastTaken=2;
	}
		
	// Upercase or lowercase ?
	// 3 choices : 3-one uppercase + lowercase / 2-all lowercase / 1-all uppercase	
	var reducedCharset;
	if ( type == 1 ){
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);			
	}else if (type == 2 ){
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["lowercase"]);	
	}else {
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);
		type = 2;
	}

	
	// take 1 to 3 characters? 
	var nbChars=Math.ceil(Math.random()*3);
	if ( nbChars > maxLength ) nbChars=maxLength;
		
	while ( addOn.length < nbChars){
		
		addOn+=""+pickOneFromCharsetWithPreference(allowedCharset,reducedCharset);
	} 	
	
	return easierToRememberPasswordWordRec( allowedCharset, currentWord+addOn, length, type, newLastTaken );
}


/**
 * Creates a password easier to remember
 * @param {string} charset The characters of the custom charset
 * @param {number} length The Length of generated password
 * @type {string} the generated password
 */
function easierToRememberPasswordNumber( charset, length ){
	var currNumber="";
	
	// if size is 4, chances for a date 2000's, 1900's ...etc.
	if ( length == 4 ){
		if( Math.random() > .7 ) currNumber="20";
		else if( Math.random() > .7 ) currNumber="19";
		else if( Math.random() > .8 ) currNumber="18";
		else if( Math.random() > .8 ) currNumber="17";
		else if( Math.random() > .8 ) currNumber="21";
		else if( Math.random() > .8 ) currNumber="16";
		else if( Math.random() > .8 ) currNumber="15";
		else if( Math.random() > .8 ) currNumber="14";
	}
	
	while ( currNumber.length < length){
		currNumber+=""+nextChar(classifiedCharsets["numeric"]);
	} 
	return currNumber;
}



/**
 * returns a character in both allowed and preferred charsets. If no common characters preferred, return one from allowed. 
 */
function pickOneFromCharsetWithPreference(allowedCharacters, preferredCharacters){
	var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
	if( reducedCharset.length == 0 ){
		reducedCharset=allowedCharacters;
	}
	
	return nextChar(reducedCharset);
}




/**
 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
 * @param {string} The characters of the custom charset
 */
function setCustomCharset( charset ){
	if( charset.length==0 ){
		delete availableCharsets["custom"];
	}else{
		availableCharsets["custom"]=charset;
	}
}

/**
 * Enables all available charset
 */
function enableAllCharsets( ){
	for(var charsetName in availableCharsets){
		 enableCharset( charsetName );
	};
}

/**
 * Enables all default charsets
 */
function enableDefaultCharsets(){
	defaultEnabledCharsets.forEach(function(charsetName) {
		enableCharset( charsetName );
	});
}

/**
 * Enables one charset
 * @param {string} The name of the charset to enable
 */
function enableCharset( charsetName ){
	console.log("Charset " + charsetName  + " enabled");
	enabledCharsets[charsetName]=availableCharsets[charsetName];
}

/**
 * Disables one charset
 * @param {string} The name of the charset to disable
 */
function disableCharset( charsetName ){
	console.log("Charset " + charsetName  + " disabled");
	delete enabledCharsets[charsetName];
}

/**
 * Builds a bigger charset from all enabled charsets
 * @type {string} The complete charset
 */
function prepareCharset( ){
	var fullCharset="";
	var logStr="Enabled charsets:";
	for(var charset in enabledCharsets){
		logStr+=" "+charset;
		fullCharset+=enabledCharsets[charset];
	};
	console.log(logStr);
	console.log("Characters:"+fullCharset)
	return fullCharset;
}

/**
 * Provides any character (random) from the provided charset
 * @param {string} charset The set of characters to use
 * @type {string} The random character
 */
function nextChar( charset ){	
	return charset.charAt(Math.floor(Math.random() * charset.length));
}

/**
 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function checkCompliance( password ){
	var isCompliant=false;
	
	// if length is lower than number of charsets there's no way to solve it
	if (Object.keys(enabledCharsets).length > password.length) return password;
	
	while ( isCompliant == false ){
		isCompliant = true;
		for(var charsetName in enabledCharsets){
			var charset=enabledCharsets[charsetName];
			if( !hasOneFromCharset(charset, password) ){
				var logStr="password \"" + password+ "\" was missing from " + charsetName ;
				password=addOneFromCharset(charset, password);
				console.log(logStr + ", now" + password);
				isCompliant=false;
			}		
		}
	}	
	return password;
}

/**
 * Adds a character from specified charset to the provided password, by replacing another character
 * @param {string} charset the set of characters to include a char from
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function addOneFromCharset( charset, password ){	
	password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
	return password;
} 

/**
 * Replaces a character at specified index
 * @param {string} inputStr the set of characters to include a char from
 * @param {number} index index of the character to replace
 * @type {string} The  modified version of the string
 */
function replaceCharAt(inputStr, index, newChar) {
    var strArray = inputStr.split("");
    strArray[index] = newChar;
    return strArray.join("");
}
/**
 * Rate a password using the default strategy
 * @param {string} password the password being evaluated
  * @type {object} The password rating
 */
function ratePassword( password ){
	ratings["passwordSize"]=ratePasswordSize(password);
	ratings["charsets"]=rateCharsets(password);
	ratings["characterVariety"]=rateCharacterVariety(password);
	ratings["sequences"]=rateSequences(password);
	ratings["keyboard"]=rateKeyboardLayout(password);
	ratings["dictionary"]=rateDictionary(password, dict);
	
	
	coefficients["passwordSize"]=4;
	coefficients["charsets"]=1;
	coefficients["characterVariety"]=1;
	coefficients["sequences"]=1;
	coefficients["keyboard"]=1;
	coefficients["dictionary"]=1;
	
	
	var nbRatings=0;
	var sumOfRatings=0;
	var productOfRatings=1;
	for(var ratingName in ratings){
		var oneRating=ratings[ratingName].rating;
		sumOfRatings+=oneRating;
		productOfRatings*=Math.pow(oneRating,coefficients[ratingName]);
		nbRatings+=coefficients[ratingName];
	}	
	//return (sumOfRatings/nbRatings+Math.pow(productOfRatings, 1/3))/2;
	var globalRating=Math.pow(productOfRatings, 1.0/nbRatings);
	return {
			rating: globalRating,
			comment: "Aggregate from all individual ratings (size is first criteria)"
		}
		
	
	
}

/**
 * Provides a subjective rating of a given password according to dictionary lookup
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateDictionary(password, dictionary){
	
    var curLetters = password.slice( 0 ), word = "";
    var foundWords=[];
	var maxWord={word:"",dictionary:""};
	
	// Make sure the word is at least 3 letters long	
	while ( curLetters.length > 2 ) {
		curLetters=Array.prototype.slice.call(curLetters);
		baseword = curLetters.join("");
				
		foundword=findWord(baseword,dict);		
		if( foundword.word != "" ){
			foundWords.push(foundword);
			if( foundword.word.length > maxWord.word.length){
				maxWord=foundword;				
			}
		}
		curLetters.shift();
	}
	
	var ratingFactor=maxWord.word.length/password.length;
	
	var allwords=" (all words: ";
	for (var i = 0; i < foundWords.length; i++)
	{
		console .log( "Biggest word found: " + maxWord.word );
		allwords=allwords+"/"+foundWords[i].word;
	}
	var allwords=allwords+")";
	
	// compare size of biggest word found with the password size
	if( ratingFactor > .9 ) return {rating:0.01, comment: "Hazardous, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor > .8 ) return {rating:0.1, comment: "Weak, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .7 ) return {rating:0.25, comment: "Questionable, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .4 ) return {rating:0.25+.7-ratingFactor, comment: "Average, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .2 ) return {rating:0.8, comment: "Good, found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	if( ratingFactor  > .1 ) return  {rating:1.0, comment: "Excellent, even if found word in " + maxWord.dictionary + " dictionary: " + maxWord.word + allwords};	
	return {rating:1.0, comment: "Excellent, so significant word found from dictionary compared to password size"};	
	    	
}


/**
 * Provides a subjective rating of a given password according to its size
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function ratePasswordSize( password ){
	var len = password.length;
	
	// lower than 5 is far too low	
	if ( len < 5 ) return {rating:0.0, comment: "Password is far too short: "+len};		
	if ( len < 8 ) return {rating:0.03*len, comment: "Password is too short: "+len};		
	if ( len < 15 ) return {rating:.4+.05*(len-7), comment: "Password length is questionable: "+len};
	if ( len < 30 ) return {rating:.8+.01*(len-15), comment: "Password length is pretty good: "+len};	
	if ( len < 50 ) return {rating:.99+.0005*(len-30), comment: "Password length is awesome... Is is easy to remember?: "+len};
	return {rating:1.0, comment: "Password length is insane!!: "+len};	
	
	
}


/**
 * Provides a subjective rating of a given password for the amount/size of character sequences inside
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateSequences( password ){
	
	var sequences=findSequences(password);
	var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	},"").length;		
	var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + " / " + currentValue;
	},"");		
	var ratio=seqLength/password.length;
	
	if( ratio <= .1) return {rating:1.0, comment: "Perfect: No (or very few) sequences found"};
	if( ratio <= .5) return {rating:.9-ratio/2, comment: "Average amount of sequences found: " + seqStr};
	if( ratio <= .6) return {rating:.64-(ratio-.5), comment: "Impactive amount of sequences found: " + seqStr};
	if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: "Too many / long sequences found: " + seqStr};
	if ( ratio == 1.0 ) return {rating:0.0, comment: "Your password is all sequences: " + seqStr} ;
	return {rating:0.1, comment: "Too many / long sequences found: " + seqStr};
	
	
}

/**
 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateKeyboardLayout( password ){
	var keyboardSequences={};
	if( !password || password.length==0 ){
		return {rating: 0.0, comment: "no passwords"};
	}
	
	keyboardSequences["qwerty"]=("qwertyuiop[]asdfghjkl;'#zxcvbnm,./1234567890");
	keyboardSequences["qwertz"]=("qwertzuiopü+asdfghjklöä#<ycxvbnm,.-1234567890");
	keyboardSequences["azerty"]=("azertyuiop^$qsdfghjklmù*<wxcvbn?.:!1234567890");
	
	var worstsequence= {
			length: 0,
			sequence: "",
			offset: 0
		};
	
	var passwd=password.toLowerCase(); 
	var keyboardRecognized="";
	for(var keyboardseqName in keyboardSequences){
		var commonality=longestCommonSubstring(passwd, keyboardSequences[keyboardseqName]);
		if( commonality.length > worstsequence.length){
			worstsequence=commonality;
			keyboardRecognized=keyboardseqName;
		}
		//console.log( "password : " + commonality.length + " " + commonality.sequence + " keyboard: " + keyboardseqName );
	}
	
	if ( worstsequence.length == 0) return {rating:1.0, comment: "Perfect : no keyboard sequence"} ;		
	// Less than 3 characters is no problem	
	if ( worstsequence.length < 3 && password.length > 8 ) return {rating:1.0, comment: "Perfect: No (or short enough) keyboard sequences found"};			
	if ( worstsequence.length < 3  ) return {rating:1-worstsequence.length/10, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};		
	
	var indicator=worstsequence.length/password.length;
	
	// More than 70% is too much, reduce by 4
	if ( indicator > .7) 	return {rating:(password.length-worstsequence.length)/(4*password.length), comment: "Too long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
	
	// More than 45% is too much, reduce by 2
	if ( indicator > .45) 	return {rating:(password.length-worstsequence.length)/(2*password.length), comment: "Long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
		
	// 3 characters  or more depend on password size
	return {rating:(password.length-worstsequence.length)/password.length, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};
	
	
}

/**
 * This function provides the longest common substring between two strings
 * This algorithm is not optimized but good enough for one password and a 
 * small sequence of characters representing the keyboard layout.
 *
 * taken from:
 * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring
 * @param {string} string1 First string
 * @param {string} string2 Second string
 * @return {object} longest substring: length, sequence, offset
 */
function longestCommonSubstring(str1, str2){
	if (!str1 || !str2)
		return {
			length: 0,
			sequence: "",
			offset: 0
		};
 
	var sequence = "",
		str1Length = str1.length,
		str2Length = str2.length,
		num = new Array(str1Length),
		maxlen = 0,
		lastSubsBegin = 0;
 
	for (var i = 0; i < str1Length; i++) {
		var subArray = new Array(str2Length);
		for (var j = 0; j < str2Length; j++)
			subArray[j] = 0;
		num[i] = subArray;
	}
	var thisSubsBegin = null;
	for (var i = 0; i < str1Length; i++)
	{
		for (var j = 0; j < str2Length; j++)
		{
			if (str1[i] !== str2[j])
				num[i][j] = 0;
			else
			{
				if ((i === 0) || (j === 0))
					num[i][j] = 1;
				else
					num[i][j] = 1 + num[i - 1][j - 1];
 
				if (num[i][j] > maxlen)
				{
					maxlen = num[i][j];
					thisSubsBegin = i - num[i][j] + 1;
					if (lastSubsBegin === thisSubsBegin)
					{//if the current LCS is the same as the last time this block ran
						sequence += str1[i];
					}
					else //this block resets the string builder if a different LCS is found
					{
						lastSubsBegin = thisSubsBegin;
						sequence= ""; //clear it
						sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
					}
				}
			}
		}
	}
	return {
		length: maxlen,
		sequence: sequence,
		offset: thisSubsBegin
	};
}

/**
 * Provides a subjective rating of a given password according to the different sets of characters in use
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateCharsets( password ){
	var charsetCount=0;
	charsetsStr="";
	for(var charsetName in availableCharsets){
		var charset=availableCharsets[charsetName];
		console.log("check charset " + charsetName + ": " + charset);
		if( hasOneFromCharset(charset, password) ){		
			charsetCount++;
			charsetsStr+=" / " + charsetName;
		}		
	}
	// less than 2 types of characters is not enough
	if( charsetCount < 2 ) return {rating:0.05, comment: "Not enough types of characters types:" + charsetsStr};
	// 2 types of characters is weak
	if( charsetCount == 2 ) return {rating:.2, comment: "Not enough types of characters types:" + charsetsStr};
	// 3 types of characters is good enough
	if( charsetCount == 3 ) return {rating:.65, comment: "Average amount of characters types:" + charsetsStr};
	// More than 3 types of characters is pretty good
	if( charsetCount == 4 ) return {rating:.9, comment: "Good amount of characters types:" + charsetsStr};	
	// More than 4 types of characters is perfect
	return {rating:1.0, comment: "Perfect amount of characters types:" + charsetsStr};	
	
	
}

/**
 * Provides a subjective rating of a given password according to the variety of characters
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateCharacterVariety( password ){	
	var rate=rawRateCharacterVariety( password );
	if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
}

/**
 * Provides a subjective rating of a given password according to the different sets of characters in use
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rawRateCharacterVariety( password ){	
	var differentCharacters={};
	for (var i=0;i<password.length;i++) {  
		differentCharacters[password.charAt(i)]=true;
	}
	var nbDifferentCharacters=Object.keys(differentCharacters).length;	
	var variation=nbDifferentCharacters/password.length;
	
	// lower too short password ratings
	if( password.length < 5 )
		variation = variation*.25;
	if( password.length < 10 )
		variation = variation*.8;
	if( password.length < 15 )
		variation = variation*.9;
	
	
	if (variation<.1) return {rating: 0.01*nbDifferentCharacters/10.0, comment: "Less than 10% variation of characters is not enough: " + (variation*100).toFixed(2)};	
	if (variation<.5) return {rating: variation/2*nbDifferentCharacters/10.0, comment: "less than 50% variation is weak: " + (variation*100).toFixed(2)};
	if (variation<.91) return {rating: variation*nbDifferentCharacters/10.0, comment: "50-90% variation may be good enough: " + (variation*100).toFixed(2)};
	if (variation<.99) return {rating: 1.0, comment: "91-99% variation is perfect: " + (variation*100).toFixed(2)};
	return {rating: .95*nbDifferentCharacters/10.0, comment: "99-100% variation is almost perfect: " + (variation*100).toFixed(2)};
}


/**
 * Checks if the password has at least one character from provided charset
 * @param {string} charset the related charset
 * @param {string} password the password to analyze
 * @type {boolean} true if the password has at least one character from provided charset, false either
 */
function hasOneFromCharset( charset, password){
	var hasFromCharset=false;
	for (var i=0;i<password.length;i++) {    
		if( charset.indexOf(password.charAt(i)) != -1 ) {
			hasFromCharset=true;
			break;
		}
	}
	return hasFromCharset;
}

/**
 * Build a password using global settings for passwordSize and charsets to use
 * @type {string} the generated password
 */
function makePassword(){
	return makePasswordWithSize(passwordSize);
}


/**
 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
 * @param {string} password the password to analyze
 * @type {string[]}
 */
function findSequences( password ){
	var lastCode=-1;
	var lastChar="";
	var isInSequence=false;
	var currSequence="";
	var sequences= new Array();
	var lastDirection=0;
	
	for (var i=0;i<password.length;i++) {    
		var currCode=password.charCodeAt(i);
		var direction=0;
		var isSequence=false;
		
		// if this is not the first character, check for ordered sequence
		if( lastCode != -1 ) {
			// do we detect a sequence?
			isSequence=(Math.abs( currCode - lastCode) == 1);
			direction=currCode - lastCode;
			
			// check if sequential status detection status changed
			if( isSequence != isInSequence){
				if( isSequence == true ){
					currSequence+=lastChar;
					lastDirection=currCode - lastCode;
				}else{
					sequences.push(currSequence);
					currSequence="";
				}				
			}
			
			if( isSequence ){
				// check if direction changed, if yes there are 2 sequences
				if( direction != lastDirection){
					sequences.push(currSequence);
					currSequence=""+lastChar;
				}
				// keep information of current sequence
				currSequence=currSequence+password.charAt(i);
			}					
		}
		
		isInSequence=isSequence;
		
		// keep information foir checking next char
		lastCode=currCode;
		lastChar=password.charAt(i);
		lastDirection=direction;
	}
	if( currSequence.length != 0 ){
		sequences.push(currSequence);
	}
	
	return sequences;
}

/**
 * Provides a subjective description of password security
 * @param {object} the password rating
 * @type {string} The resulting description
 */
function passwordStrengthDescFromRate(rate){
	if( rate < .5) return "Unsafe";
	if( rate < .6) return "Weak";
	if( rate < .7) return "Medium";
	if( rate < .8) return "Good";
	if( rate >= .8) return "Secure";
	return "N/A";
}

/**
 * Generates a password of a given size
 * @param {number} the size of the requested password
 * @type {string} The generated password
 */
function makePasswordWithSize( passwdSize ){
	var charset=prepareCharset();
	
	if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
	else return makeAnyPasswordWithSize(charset, passwdSize);
	
}



function makeAnyPasswordWithSize( charset, passwdSize ){
	var passwd="";
	
	for (var i=0;i<passwdSize;i++) {
		var newChar=nextChar( charset )
		passwd+=newChar;
		if( !allowCharacterRepetition ) {
			charset=charset.replace(newChar,'');
		}
	}
	return checkCompliance(passwd);
}
