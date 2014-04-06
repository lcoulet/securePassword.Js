// Javascript password generator
//  and Javascript password evaluator
// Author: L.Coulet, 2014
// License: Apache 2.0

// ------------------------------------------------------------------------
// The globals... THis is not state-of-the-art nut good-enough to start with
// Javascript ninja may prefer to close their eyes.

function SecurePassword() {  
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
	ratings["commonPasswords"]=0;

	var coefficients={};
	coefficients["passwordSize"]=4;
	coefficients["charsets"]=1;
	coefficients["characterVariety"]=1;
	coefficients["sequences"]=1;
	coefficients["keyboard"]=1;
	coefficients["dictionary"]=1;


	// The dictionary lookup object
	var dict = {};
	var dictKeys = {};
	// The password dictionary lookup object
	var passwddict = {};
	var passwddictKeys = {};

	// Dictonaries
	// English
	var englishdict="the and that was his with for had you not her which have from this him but all she";
	
	// sources: 
	// http://www.encyclopedie-incomplete.com/?Les-600-Mots-Francais-Les-Plus#outil_sommaire_2
	// http://en.wikipedia.org/wiki/Dolch_Word_List
	// French
	// French dictionnary seems not supporting LZW compression very well with the library used because of accended characters... 
	var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette d'une ont ses mais comme tout nous Mais fait été aussi leur bien peut ces deux ans encore n'est marché Pour donc cours qu'il moins sans C'est entre faire elle c'est peu vous Une prix dont lui également Dans effet pays cas millions Belgique BEF mois leurs taux années temps groupe ainsi toujours société depuis tous soit faut Bruxelles fois quelques sera entreprises contre francs n'a Nous Cette dernier était s'est chez monde alors sous actions autres ils reste trois non notre doit nouveau milliards avant exemple compte belge premier nouvelle Elle l'on terme avait produits cela d'autres fin niveau bénéfice toute travail partie trop hausse secteur part beaucoup valeur croissance rapport USD aujourd'hui année base Bourse lors vers souvent vie l'entreprise autre peuvent bon surtout toutes nombre fonds point grande jour avoir nos quelque place grand personnes plusieurs certains d'affaires permet politique cet chaque chiffre pourrait devrait produit l'année Par rien mieux celui qualité France Ils Ces s'agit vente jamais production action baisse Avec résultats Des votre risque début banque voir avons qu'un elles moment qu'on question pouvoir titre doute long petit d'ailleurs notamment droit qu'elle heures cependant service Etats-Unis qu'ils l'action jours celle demande belges ceux services bonne seront économique raison car situation Depuis entreprise nouvelles n'y possible toutefois tant nouveaux selon parce dit seul qu'une sociétés vient jusqu quatre marchés mise seulement Van semble clients Tout Cela serait fort frais lieu gestion font quand capital gouvernement projet grands réseau l'autre données prendre plan points outre pourtant Ainsi type Europe pendant Comme mesure actuellement public dire important mis partir parfois nom n'ont veut présent passé forme autant développement mettre grandes vue investisseurs trouve maison mal l'an moyen choix doivent NLG direction Sur simple période enfants dollars personnel assez programme général banques eux semaine président personne européenne moyenne tard loi petite certaines savoir loin explique plupart jeunes cinq contrat Banque valeurs seule rendement nombreux fonction offre client activités environ ministre cadre sens étaient sécurité recherche Paris sorte décembre Son suite davantage ensuite janvier donne vrai cause d'abord conditions suis juin peine certain septembre sommes famille l'indice pris laquelle directeur qu'en propose gens derniers étant fut chose portefeuille obligations afin différents technique Aujourd'hui ailleurs l'ensemble américain ventes Selon rue livre octobre vraiment sein dollar Enfin haut Plus petits porte tel durée domaine aurait jeune présente passe lorsque choses puis Vous aucun l'un n'en tandis coup existe propre carte crise importante atteint revenus montant forte ici s'il Quant rapidement j'ai ville etc mars s'en mon premiers bas marque véritable ligne longtemps propres devant passer départ total série quoi particulier concurrence élevé position connu principe tendance court pages évidemment résultat aura parmi Sans américaine face trouver durant femmes construction désormais distribution telle difficile autour européen pratique centre vendre juillet mai région sociale filiale film besoin mode Pas représente réalité femme vaut Tél aucune hommes donner titres l'Europe nombreuses différentes moyens formation chiffres Générale dix prochain l'Etat genre bureau communication participation gros pourquoi estime devient réalisé création novembre l'évolution pourra semaines consommation faible terrain site droits moitié puisque reprise compris projets avril vont call donné simplement six firme perte Bien Philippe sait prend vite via stratégie vos jeu petites marketing presque Michel manque réaliser financiers Car Comment voiture chef constitue Internet J'ai enfin net charge nature second payer actuel Elles investissements dispose financier d'achat membres date avaient gamme revanche comment décision l'avenir tour actionnaires s'y solution créer l'économie concerne l'époque belle lequel tél seconde version Pays-Bas cher chacun lire techniques décidé mouvement conseil nécessaire meilleur double sujet généralement restent celles politiques malgré confiance homme d'actions Certains ayant papier commerce Région Wallonie Windows termes met contraire informations l'industrie trimestre différence certaine formule jusqu'au voit programmes actuelle permis dossier Quand l'heure guerre acheter rendre février l'emploi main voire bons technologie européens éléments unique l'eau venir générale courant suffit l'ordre conserver maximum force fax Que largement milliard soient Pierre devenir l'Union franc minimum mort responsable possibilité presse affaires longue travers BBL relativement moi Deux présence européennes devraient groupes ensemble santé New pense bénéfices but compagnie publique coeur revenu mesures table nettement questions d'avoir permettre l'homme Chez retour qu'elles majorité potentiel moindre récemment secteurs réduction large traitement perdu étrangers parents l'une fond capacité vitesse activité l'exercice l'objet quel tient taille éviter risques Jean Pourtant Allemagne parler propos quant signifie voie jouer prévoit blanc noir parti logiciel continue Notre bois meilleure l'argent perspectives développer celui-ci oeuvre structure suivre tiers prise professionnels raisons néanmoins preuve social bénéficiaire couleurs mondial Cet maintenant essentiellement prévu Japon prévisions centrale Alors international yeux PME l'a ait bonnes opérations pied l'art pourraient Londres juge devra uniquement corps divers Parmi numéro réduire Tous texte tenu budget l'étranger pression mes n'était style économiques Jacques montre population analystes processus placement classique dividende rester publics fortement plein wallonne DEM Express faudra travailler Crédit directement prime Flandre crédit monnaie précise appel Autre travaux l'occasion juste Chaque put tableau terre permettent devenu rouge mémoire partenaires rapide travailleurs joue objectif salle parle musique milieu d'entreprise autorités chute régime d'autant liste opération bout performances électronique haute responsables lancé voitures patron Malgré affiche situe l'image études Microsoft condition retrouve Aux revient Belgacom route Ensuite Luxembourg campagne comptes hors culture Commission d'entre possibilités semestre actifs finalement internationale l'achat monétaire passage justice page tels poids celle-ci commercial entendu l'investisseur mondiale accord diverses totalement fil clair vin biens euro York parfaitement viennent division réseaux principal lancer supérieur atteindre référence téléphone management vins proche collection fiscale Ceci informatique investissement volume matériel publicité train coupon progression tenir protection l'aide couleur nouvel Lorsque change changement garantie somme Belge plaisir fils laisse importants privé Ses besoins oeuvres américains relations peau moteur augmentation suivi volonté beau bancaire laisser bureaux principalement intéressant logiciels sommet l'activité d'en vivre élevés Robert contrats oublier performance réponse d'exploitation concept obtenir poste attendre lignes consiste augmenté vert figure mot développé l'histoire magasins collaboration répondre TVA holding livres convient fonctions fera pouvait million Paul britannique d'entreprises voix Grande-Bretagne disque affaire minutes quelle contexte limite mains commun réduit Pourquoi particuliers verre wallon d'Etat allemand effets Chine meilleurs rend applications d'ici procédure l'opération devait profit méthode pose commence idée l'Internet d'eau créé nuit Nord capitaux options consommateur cartes soi métier probablement aller d'investissement facile International importantes Marc capitale devise prochaine transport Street demander utilisateurs l'affaire image l'idée propriétaire facilement publiques croire disponible Louis d'or veulent Charleroi consommateurs devises difficultés sort national machines annoncé choisi découvrir soutien avez perdre cuisine telles D'autres travaille ouvert phase certainement télévision pratiquement annuel bord paiement Bank institutions seuls arrive constate marques nationale regard représentent Belges état Qui libre rachat Toutefois portes sortir commandes permettant manager fiscal cinéma histoire zone sauf avantages l'information voici dur effectivement puisse réel The puissance fixe Belgium contact époque rythme principaux vendu utilisé étude Leur sensible Bref rencontre L'entreprise spécialistes brut mauvais néerlandais supplémentaire mots reprises nécessaires Non soir Prix machine penser parts comprend fusion acquis totale voyage logique l'échéance concurrents idées trouvé dette Sud réellement financement disponibles vieux lance marge dirigeants avis changer conséquence sociales supérieure Certes faisant ordinateur partenaire warrant fabrication redressement suffisamment délégué pourront poursuit chemin emplois l'environnement réalise FRF évolution Cour automobile Premier ancien note parties pension professionnel assure garder Rien Actuellement S'il l'administration Guy est-il IBM climat d'acheter SICAV département sept partout immobilier lancement rating réussi patrimoine feu expérience Anvers anciens graphique Fortis faveur retrouver droite responsabilité commande Kredietbank d'argent direct l'inflation n'avait utiliser tonnes l'origine connaissance acheté Ici américaines clairement semblent biais futur neuf chance faillite équipe musée compagnies documents pertes sortie m'a seraient d'autre choisir l'instant tellement industriel précompte d'Europe immédiatement avantage qu'au constituent déchets sport van demeure garde maisons Solvay conséquences l'offre active dépenses donnent employés sites élections détient n'importe obligation fruits véhicule l'égard Conseil investi mission profiter visite comprendre professionnelle affirme l'intérieur Wall charges privée rares succession liberté rentabilité suivant efficace assurer images agences impossible John enfant fournisseurs photo salaires Avant compter l'Est disposition formes bénéficiaires lesquels maintenir précisément couple enregistré recul offrir peur hauteur centres voulu industrielle positif Luc administrateur intéressante commerciale interne pleine passant vision GSM faits retard certes l'air lundi Outre porter écrit cesse locaux délai trouvent classiques commencé réalisée Alain vigueur gagner Celui-ci Philips ceux-ci favorable pouvoirs participations annonce génération élément devenue touche conseils devoir mer souligne respectivement rapports vacances lieux naturellement d'y lorsqu'il statut USA ceci destiné défaut objectifs récente saison d'art industriels Suisse catégorie complexe huit l'obligation fisc obtenu repris occupe sérieux émis Quelques comportement limité vingt conjoncture gauche marche d'origine l'utilisateur ordre mobilier parcours perspective normes recours l'esprit Communauté annuelle lecteur objets fabricant niveaux Entre réalisation amateurs conséquent présenter Celle-ci vise types détail mauvaise professeur progressé signe passée approche Reste return jardin l'espace flamand Namur bilan Vif sensiblement Trois utilise commune dimanche option partis analyse films surface warrants GBP prises secret historique journée l'ancien Pendant allemande d'assurance André fille l'importance proposer avions augmenter parc Delhaize the Lors limitée appareils villes au-dessus diminution prochaines servir Bernard commission faiblesse plus-value souhaite internationales producteur producteurs code belles cabinet fonctionnement gérer mouvements pratiques régions dossiers meilleures Parce entrée vendredi actif sociaux supplémentaires café message physique Société communes dizaine faute sélection source facteurs milliers soleil tirer concernant Bourses fallait sentiment bénéficier débat l'Allemagne élevée ouvrage police pouvez attention a-t-il bel constructeurs contribuable moderne passion primes suit auquel dépasse spécialisée bruxellois déclaration multiples quartier vidéo dépend l'école liquidités correction comité Web cherche filiales Sous signé leader calcul gaz D'abord Rens artistes déficit cadres fédéral probable remboursement and efforts restaurant Toutes couverture domicile soins devront luxe complet danger indispensable syndicats comporte faite juridique langue rendez-vous d'informations demandé respect continuer l'organisation lesquelles local l'impression n'existe rare restructuration automatiquement plat boursier sol c'était cotées décide L'action Cependant Certaines matériaux ordinateurs tradition progressivement capable classe familiale réserve fonctionne solutions fabricants paie Finances l'été réelle changé masse unités considéré fer auront noms riche Patrick proposé salon territoire fixé magasin candidats marges asiatique inférieur réaction fleurs l'effet record tribunal recettes poursuivre dessous portant Aussi Sabena acteurs dehors constructeur l'auteur relation offrent spectaculaire LUF produire confort familles investir reprend sert montrer mérite places Soit judiciaire textes quasi SNCB jeux permettra étudiants membre photos positions sud Cockerill lendemain cent gagné japonais l'absence mark pointe solide Voici anglais n'ai présentent décisions législation médias victimes écran nécessairement découverte l'assuré club environnement noter crée exportations négociations Jan répond BEL entier business peinture s'était voisins faibles location nord promotion technologies auraient caisse entend simples maladie menu chances commerciaux printemps Benelux poser Asie l'utilisation usage PIB actionnaire prennent résistance Dow surprise Etats mariage nécessité Puis cote Plusieurs beauté exclusivement lettre payé rendu s'ils software utile gestionnaires bénéficie procédé vaste crois normal Centre construire démarche emprunts naissance D'autant d'information distance tourner Club attendant quantité roi l'assureur tourne ajoute bancaires ajouter géant automatique faux attend litres présenté argent confirme indépendants l'ordinateur énorme destinés l'avantage véhicules ressources standard auparavant construit Quelle principales quelqu'un disposer global écoles Quel réputation fameux rappelle conseille heure veille difficulté l'état limites commerciales samedi palais vend vit Tractebel connaissent reprendre village emploi amis budgétaire croit mises souci contient habitants Weekend bras beaux bruxelloise faisait introduit intérieur outils précis chercheurs taxe salaire transactions Christian chambre portée réflexion C'était d'emploi hasard matin assureurs réforme Beaucoup fournir recherches liés tenue proposent aide ferme l'enfant l'or secondes CGER contenu quotidien flamande centaines course billet critique l'arrivée naturel principale support week-end Dehaene Gand chargé économies Nos augmente guide proposition laissé spécialiste francophones importance vent conception préférence spectacle avenir d'entrée grave commencer d'années diminuer chercher bonheur dizaines d'environ exactement outil scénario Jones coups émissions éventuellement Royale l'agence soumis d'exercice lecture monter Grand central exigences assuré contacts consacré l'attention d'administration due faut-il réussite échéance recevoir tableaux arriver évident art Italie amélioration auteurs estimé quinze Russie demain précédent vendeur événements autrement experts fortes furent possibles circonstances placer publication l'écran réserves sauce venu Charles collaborateurs implique l'assurance obligataire établi CD-Rom forcément l'essentiel l'enseignement remarquable vol Claude tourisme internationaux directe compétences conseiller facteur l'est plastique rarement Royal affiché lutte relative actuels envie l'équipe ministres secrétaire capitalisation langage positive circulation convaincre notion visage vouloir ajoutée caractéristiques Eric Union paix puisqu'il courrier disposent développe présentation barre comparaison déterminer firmes fournisseur informatiques luxembourgeois achats solde Serge globale propriété stratégique Renault partage porté sources Kong cour destinée absolument branche l'objectif ouvre plans productivité Résultat améliorer d'obtenir joué Parlement dépit fichiers personnalité constitué gestionnaire profession qualités conscience médecin celles-ci design décor faudrait participer appelle forces suisse appareil conduite D'une longueur tarifs vérité lien locales francophone clubs correspond coupons d'émission estiment défi protéger réalisés d'emplois d'éviter l'ouverture méthodes revenir superbe volontiers document nommé tente financer scientifique Georges travaillent l'investissement lié zones aime lettres ouverte Hong L'année murs philosophie rappeler utilisés suivante d'année représentant traduit remettre situé différente longs économie discours distributeur domaines l'introduction régional faites italien restera usine Group l'informatique personnage portent attendu l'option Jean-Pierre articles changements fallu léger mener propriétaires spécifique récupérer voyages procéder locale médecins privés transmission concurrent courte quart baisser pieds publié Ford menace réunion transfert composé dimension personnages ralentissement conclusion l'usage agents parfum rémunération difficiles l'entrée mettent pierre proches réglementation salles grimpé prochains prévue électrique dynamique exposition installé plancher distributeurs déclare connue n'avons préparation réalisées beurre opérateurs achat province spécifiques Albert l'usine l'existence renforcer téléphonique comptable effectuer trafic degré l'ont définitivement humain optique remarque talent appelé modifier définition peintre respecter stade statistiques certificats s'attend limiter livraison placements raconte volumes immobiliers Fax anciennes chevaux médicaments Peter feuilles football identique pouvons remise structures tenter accords cotisations indice neutre Mon constituer d'accord montrent placé loyer proximité voient épouse Canada entrer postes précision cité concours patrons populaire pétrole négatif allemands d'activité roman victime italienne ménages repas PetroFina langues tendances D'autre pire prudence savent Néanmoins conduit mille rénovation égard Américains exercice l'étude s'impose avance effectué fortune fournit lecteurs Morgan découvert l'inverse différent emploie bleu royal technologique télécommunications Amsterdam fiscales indique information lourd signal Mieux aider ancienne apporte nette prestations publicitaires sensibles communauté l'émission lit volatilité étape assurance jusqu'en lancée résoudre garanti modification revue spéciale www chacune l'analyse différences messages priorité recommandation récent charme dividendes Olivier passent finale immeubles logement pourcentage rire stabilité difficilement défense l'ancienne magazine D'un eaux jeunesse l'intention continuent révolution étonnant organisation constater dos emprunt oui éditions Daniel sel utilisée compartiment publicitaire article bande capacités centrales considérée milieux occasion quasiment pouvant Vermeulen-Raemdonck visiteurs chambres considérablement demi découvre essentiel broker dettes mardi reconnaissance salariés formules grosse heureux perd radio allait multimédia partiellement seules Gérard Oui Securities toucher jugement l'oeuvre considérer remplacer couvrir précieux segment dessins espace indices refuse chefs exemples rejoint spécialisé l'amour l'exportation objet précédente rose versions d'études destination Encore deviennent l'Italie personnelle plats vingtaine l'expérience virus Faut-il chasse longues Toute bases cotée final monnaies travaillé apporter aspects disparu David Management port racheter relever Celui ING catalogue centaine chaleur profil représentants conclu réside scientifiques Chambre secondaire Fin serveur XIXe exige grimper immeuble l'Université montants paysage vendus ton assurances catégories dure décote soutenir édition dangereux agréable voulait combien d'application disparition optimiste plus-values tomber erreur l'augmentation situations spécialisés subi suivent Jusqu'au classement l'exemple norme rentable sang socialiste tombe Justice attitude mines qu'aux liée plantes vague General l'immobilier légumes Ceux-ci conflit excellent licence travailleur appris est-elle gagne mari préparer purement située vérifier Jean-Luc gain métal surfaces L'objectif d'épargne douze expliquer lorsqu'on meubles yen chaussures créée institution l'accent solidarité Maastricht basée journal soin sourire Guerre bouteilles flexibilité maintient appartient moments rouges L'an basé devons installations Bacob association d'obligations format City Page disques modem mélange ordinaire vide chimique disent pharmaceutique d'assurances numérique porteur répartition blanche composants future parvient évoque Durant calme cru Electrabel culturel grosses baissé lois moteurs principes trente éventuelle Peu prévoir tours Pentium acheteur dimensions fonctionnaires organisé rencontré russe savoir-faire établissements Fédération Toujours créativité top application dépasser importe jaune l'application marqué mécanique socialistes tranche Quelles envisage traiter Surtout acheteurs chinois claire l'Institut vécu Objectif bail demandes diversification montré renseignements souscription Tokyo entendre tests Siemens filles unité Bekaert UCB composition resté sinon agence fini modifications Cash industrielles obtient permanence restaurants réels échange florins l'accord terrains émergents atouts offrant LES bouche champ chaud l'annonce monte preneur présents quitte tarif facture fiscaux modeste processeur Fund avenue compétition relevé tenté Est-ce Musée bijoux différentiel déclaré institutionnels l'employeur traité Intel traditionnels victoire connus correctement pub Dominique Tant accessible rencontrer stocks Art espérer jouent menée nécessite provenant utilisent affichent délais inférieure sent spécial Amérique acquérir album idéal l'écart véritables associé candidat connaissances l'énergie signes cheveux conserve stress d'Anvers d'action directeurs donnée endroit l'emprunt l'impact der traditionnelle Martin ciel convention obligataires prouver Espagne Petit Source dessin humaine l'huile lait Seule Thierry boursiers continent destinées flamands néerlandaise pensions commencent considérable nationales nul s'adresse conjoint crédits militaire morceaux privatisation repose sommeil traditionnel PSC Seul capables combat finances puissant s'agissait Bill Renseignements physiques Richard allant créations toile évidence convaincu excellente retraite théorie transformer Tour transaction visant Deutsche Mons attentes cycle détails Votre héros l'artiste l'université sérieusement uns Ceux considération impose propositions Autrement cap forts l'Afrique usines Afin Quels aisément ressemble risquent totalité imaginer originale intégré intéressantes l'extérieur loyers auxquels circuit indépendant intérieure jus maintien cotisation l'Asie moyennes quitter stable CVP Compaq galerie liens souffle GIB apprendre concert l'exception l'échelle liquide nez noire température transparence école champion diminué désir ressort voulons équipé alimentaire den organisations présidence raisonnable ratio recommande utilisant accepter accepté cache chocolat chuté comparer courts figurent passagers prison viande associés esprit froid jeudi liées revu satisfaction satisfaire test tiennent vraie contrairement dépassé extérieur qu'avec ami American Etat complémentaire déclarations réactions Fonds artiste conclure déduction remis L'indice déterminée fiscalité grand-chose humaines réponses équipes ITL Michael Systems aspect commercialisation manger RTBF engagé obligé proportion signature étranger imposé s'applique silence vote Afrique Mobistar cible contemporain fondateur Jean-Claude communiquer d'investir existent majeure ouvrir électroniques JPY TGV compétitivité erreurs notation rang Apple accident certificat exceptionnel http proprement riches Barco Quoi violence adapté bénéficient récession sentir armes arrivé crainte garanties l'automne ménage officiellement ouvriers Autant discussion rejoindre époux citoyens concernés d'inflation définir L'idée Paribas Telecom d'aller fabrique feront née oblige patients pensent responsabilités doublé fraude l'article organise Henri conclut désire l'appareil l'association l'installation législateur écrans choc gratuit mobile naturelle dialogue révision familial lourde poche décider négociation tort Maison Trésor constante cotation déterminé l'instar managers opté transformation Life anniversaire compétence géographique mandat réservé établir Business fins richesse CAD commente intermédiaire l'univers retrouvé sciences Sun banquier former monté parfait veux René investit l'oeil n'aurait parvenir vieille collections dirige fonctionner mauvaises tapis venus Contrairement Suez piste pistes tensions campagnes investis proposés sac tabac bataille britanniques fine liégeois partenariat privées remplir supérieurs Beaux-Arts Christie's laser restauration Dutroux chimie rendent textile Brabant Colruyt James National Quatre préalable souvenir venue Communal avocat comparable consolidé critiques interdit l'initiative mine quotidienne rigueur réduite tissu Invest pain participants procédures profondeur retrouvent rues taxation Mexique asiatiques conducteur demandent environs fermeture gris rumeurs accueille amoureux d'augmenter défendre l'immeuble pure souffre créneau d'énergie journaux s'explique seuil Jeux Office auteur cash-flow fichier foi instruments quelles séance véritablement Yves attirer civil civile d'aujourd'hui eau l'épargne station courbe hectares influence ingénieurs tables vivent Exemple L'un blancs couche cuir devenus extraordinaire patient peux aient animaux associations d'utiliser foie initiative l'Amérique poursuite survie Face apparemment consultant expansion l'exposition séjour champagne commentaires complexes cylindres décennie rendements retenu sais sujets cuivre offert réagir sec varie Fondation artistique communications monétaires métaux permanente positifs électriques basse concentration investisseur provoqué doux stations coin modifié avocats estimations original souplesse Attention Frank Hainaut Suite annuels cellule clause exemplaires malheureusement minute normale Frédéric Sud-Est atout latine logements pilotes susceptibles Roger XVIIIe ordres remarquer actuelles bouteille constat opportunités prépare vendeurs accrue fruit jugé l'amélioration loisirs pur trentaine bus gendarmerie air alimentaires coté modernes préciser réussir laissent parfaite spécialement évoluer Dewaay Désormais Groupe maladies négligeable tension Lion chansons dite festival négative préféré restant Cera adopté coopération distingue douceur retirer technologiques Editions Parfois bruit comptant démocratie exception mercredi offres sucre vedette évolue British Leurs compromis hauts élevées émission Faire attendue d'appel jusqu'ici lourds quels soirée événement alternative chimiques conférence quitté serveurs Brésil CD-ROM correspondant l'avis locataire matériau périodes utilisées d'emblée l'aspect morale équilibre Sony fixer gratuitement trait Trop adultes consacrer d'importance normalement parole prochainement suscite verra clé mesurer notes potentiels relatives Flamands Francfort L'homme Palais Plan République l'armée transports Portugal couvert joueurs Malheureusement coupe dispositions effort endroits aides contribution insiste s'inscrit souhaitent communal impact progresser Sambre administrateurs d'ordre deviendra dégager formations l'ouvrage souscrire cellules facilité gras militaires passés quinzaine souvient automobiles bref confortable essentielle officiel vive vols Marcel Top combinaison distinction définitive japonaise liaison tissus cadeau canadien distribué existants ordinaires servi surveillance l'architecture l'aéroport médecine n'aura n'étaient revoir récentes voies L'obligation Rappelons comptabilité fabriquer fasse intéressants peintures quartiers valable étapes bénéficié couvre diminue envers introduire missions s'attendre Petrofina apparition coffre digne fibres initiatives littérature rembourser retrait Bundesbank D'ailleurs Pascal Pologne consacre employeur favorables l'approche manquent assurée battre chantier conclusions consulter craindre d'utilisation vivant Chacun internes apprend liégeoise observe provenance sortes Marie cessé céder estimée marchandises Poste balance copie cuisson négocier spéciaux traite Bruges hollandais peut-on porteurs régler soutenue suivie Stanley accueillir médical notoriété provoquer sensibilité vocation L'investisseur for impression l'ampleur séduit conflits imposable journalistes manifeste provoque wallons éditeurs EUR canal fondamentale futurs graves mené mur pommes racheté remonte solides suffisante chargée chers discussions garantit indicateurs provient soutenu sportif systématiquement zéro comptent recette récit subir évolué Johan accorde faciliter hausses Macintosh Services d'imposition débuts garantir portefeuilles susceptible universités Glaverbel Sotheby's actes brasserie caractéristique cherchent favoriser justement prudent stock échelle énormément Standard compose couronne exceptionnelle flux j'étais justifier réfugiés téléphoniques Monsieur Ville accepte inspiré l'ombre pollution situent allemandes boissons douce gouvernements intervention motifs primaire World entrepreneurs l'efficacité représentation Thomas apparaissent complémentaires cycliques franchement instrument rayon Food Roi conversion partager retenue simplicité Comité confirmé devaient expériences front jeter logistique reconnu Affaires Heureusement comédie historiques imposer l'actionnaire obligatoire recourir références traces témoigne GBL Java acte appliquer catastrophe conduire contribué fais intervenir mettant pilote plafond remplacement tire Berlin Vincent portable profonde refusé repos béton fermé juges parlementaires prévention Donc d'électricité dispositif forment neige suffisant Louvain diffusion fédération lentement prenant souris contenter douleur intervient j'avais look manoeuvre parquet poussé arguments billets consacrée dirigeant décoration holdings justifie levier majeur midi recyclage robe Entre-temps appels directive initial intéressés pousser pouvaient secrets surpris univers d'avis poisson spécialisées séduire verser d'investissements générations nettoyage ouverts réductions vélo Anne Compagnie Souvent d'Amsterdam explique-t-il l'abri l'intégration officielle résolution Service courses l'exploitation pari pousse revendre trace abonnés craint croissant juger régionale symbole touristes Rome actives communautaire contraintes journaliste traditionnelles variable amour atelier budgets budgétaires clef d'ores détriment nationaux paquet relatif Francis Rupo d'enfants diesel gare l'acquisition parlent rapporte regarder éventuel Clabecq carrés psychologique rupture téléphonie Air Danemark Sauf citoyen four permettrait puissent rapides Marketing Tendances dit-il développements enregistre envoyé intermédiaires l'issue liquidité réagi Allemands L'autre Louise connues consolidation créateur idéale l'espoir profité prévus résulte similaire Boeing Didier Dieu Willy agir coins constaté d'eux danse occidentale optimistes pensée professionnelles Computer San Tournai appliquée chanson déroule franchir liquidation morts nouveauté prestigieux suppression Laurent Mercedes existantes pleinement simultanément établissement cercle corruption discipline familiales l'avant laboratoire livrer montée participe Personne adresse finance génie leasing versement bits concernées dents inclus maximale précédemment routes variations équipements Declerck chemins constituée d'effectuer globalement libres proposant souligner Bon ambitions croissante décennies fou l'influence littéralement motivation rubrique souvenirs surprises vendue Celles-ci bébé plainte stockage écrire énergie Spector annonceurs d'olive débats ferait grain sont-ils séparation tournant vendues Compte Cools Volvo accessoires constitution consultants dommages occupé s'appelle échanges Seconde adresses efficacité fixée frappe l'apparition monopole panneaux restée sentiments terminé utiles Bruno Seuls appliqué donnant fondamentaux fréquemment l'aventure métiers planche royale suppose Inc Moins fourni japonaises payés profond programmation résolument L'Europe d'amour d'ouvrir golf poudre proposées étoiles PRL attaché concevoir dommage l'opinion main-d'oeuvre récents stratégiques vitesses Peugeot Philip apprécié connexion hommage jardins remonter supplément Canal Tessenderlo cheval entretien inutile l'Espagne laissant mécanisme nouveautés placés repli régionales régionaux souple symbolique troubles évaluer Aucun Mac Régions cession confie moyennant numéros portrait établie cinquantaine d'assurer peuple promis retenir réception sexe utilisation visiblement acteur créateurs dites déposer expositions handicap lourdes plastiques procure proviennent sous-jacente Quick Virgin auxquelles banquiers baptisé finit venait volant Fiat Joseph Lyonnais enseignants geste l'UCL sérieuse Mignon Royaume-Uni Vers classes doigts encadré froide niche prévision servent Baudouin Nicolas Smeets arrivée domestique envisager espaces filet inflation posé promouvoir roues Assurances Capital immense incontestablement lot pharmacie restructurations sportive L'ensemble ci-dessus d'activités engagements humains introduction organisée Delvaux assiste couverts franchise L'histoire annuellement arrivent causes pierres valent volet Hanart Karel Lotus intention l'acheteur manifestement prendra profondément relance suivantes suspension commissions divisions développée employé fourchette qu'est s'occupe vendent Clinton Jean-Marie Maurice Nationale compenser d'octobre essayer fondé formidable graphiques professeurs tester George Histoire boutique caméra d'avance fondée heureusement label montagne pensons plate-forme temporaire tombé tribunaux évite BMW Monde condamné culturelle d'air entre-temps entrées installer perception sauver thé Fermé Peut-on Unilever accompagné externe franchi jadis manifestation miracle moral refus réunit révéler s'installe Etienne Evidemment bateau conseillé d'écart décrit fréquence l'occurrence s'adresser taxes Company concentrer consultation dorénavant dynamisme installée profite réunions amateur avoirs calculé d'atteindre estimation exerce bloc circuits couper courante d'améliorer d'instruction effectués fameuse intéressé montage prévues subsides séduction traités trouvera équipés Aucune ingénieur réclame rémunérations tentent tournent égale émetteurs Prenons agent attentif d'aide d'oeil existant fluctuations gré l'administrateur médicament partiel permanent s'installer situés sportifs vertu Intranet L'évolution Quelque allons appartements duquel kilos sicav toit versées chaussée d'huile futures individuelle manifestations raisonnement sports Christophe DES absolue appelée contente d'idées d'investisseurs intense money répondent tranches Waterloo assurent calculer choisit citer doté fixes inférieurs mensuel promoteurs relais sorti télé voisin Corée Lynch dit-on hiver l'Association l'ULB naturelles preuves présentés souffert Qu'est-ce attendent camions camp contenant curieux détente effectue géants l'endroit l'intermédiaire légale n'étant prestation publiés rente réalisent ski soigneusement vif Cie conviction doubler morceau racines tenant universitaires visiter Center Global démarrage entamé fondamental l'intervention magique procurer records universitaire vrais L'une ateliers avion confronté contribuables doigt drame féminin habitudes l'immédiat lutter pétrolier supérieures vois AEX Bell afficher confirmer conservé d'offrir détour fusions l'avons l'équilibre lever malades ouvrages paradis prouve prévoient remplacé spéculation Rwanda concernent départements dérivés identiques marquée n'avaient prince produisent résidence voulez L'opération Turquie allocations démontrer enregistrée individuelles oublié parking proposée Commerce Guide Tom comprenant débuté engagement fit légal participé passées présentant présentes quantités échapper Maystadt Software acquisitions affirment alentours assureur autonomie canaux inverse l'adresse l'automobile modes signaler signée Goldman Notons cancer carnet convergence foule indispensables intégrée nucléaire opérateur paiements palette pence priori promesses tentative Belgian Corporation Dutch Tel aérienne boutiques craignent débiteur entités ouverture procureur puisqu'elle sommets supporter traitements voyageurs Bureau anglaise argument d'établir imaginé l'appui mécanismes personnelles privilégié satisfait science terrasse tiré trésorerie télécoms D'ici chaude coupé esthétique inscrit poissons refuser s'effectue tennis Moi Unix appartement clavier démontre organismes pressions regroupe secours sous-traitance théorique accessibles courants d'été judiciaires l'innovation l'opérateur précédentes réaliste aventure d'Internet effectifs gains l'opposition l'unité musées rock Coupe Netscape bain déposé espoirs majoritaire semblait Digital accorder attire d'échange feuille initiale installation krach malade opérationnel pauvres pont préserver publier rechercher recrutement représenter révélé sanctions traditionnellement vapeur Cobepa Salon confier considérés cultures hypothécaire illustre introduite l'échec menus multinationales paient pareil problématique quarantaine rentrée soutient terminée voudrait carré exemplaire lorsqu'ils nulle posent pratiquer sida versements visites étions étrange CBR berline cash distinguer durs défend efficaces essence exclu jolie photographe propriétés veau Journal Nobel Vieux atteinte chapitre concertation dégage extérieurs médicale pareille patience recueillis substance transforme voile échec Léopold enthousiasme fédérale gloire préparations transmettre visiteur Ajouter Brederode Européens Jean-Louis Tony apporté d'importantes l'acier libéralisation observateurs panique présentée réserver signer tendre touristique Récemment brillant conventions décret généreux industries joie stars égal Sachs continué dessert espagnol est-ce légende passera rapprochement salariale scolaire Monétaire assurément contraint coton curiosité entité entré l'architecte libéraux logo parlementaire parviennent portables provisoirement routier réservée tourné veiller Hoogovens XVIIe arbres communs employeurs exercices faisons l'alimentation magazines maintenu roses répondu spécialité Citibank Moscou Times accidents adapter amené avoue collectif d'évaluation dessus indépendante l'institution l'établissement peintres rappel réalisations s'avérer architectes comprise essentielles examen fidélité héritiers l'actualité préférable relancer s'adapter s'engage sable semestriels significative suisses Grande Nouveau cadeaux comportements constamment contribuer d'images offerts périphérie varient Michelin caisses conscient cédé effectuées faisaient personnalités s'engager syndicat Arbed OPA abandonné cents destin drogue fines identité invités l'événement modalités négatifs paru répertoire s'intéresse Disney Isabelle Japonais Roland William annoncée champignons défis générer russes situer supprimer élu Jean-Paul Spa accordé acquise courtier d'attente foulée noirs résister section signaux sombre susciter compartiments correspondance créances discret dépassent florin formé frappé papiers représentait saurait versé absence d'Or d'acquérir d'avenir degrés envoyer joli occupent on-line percée priorités processeurs restés résume soie travaillant économistes Etant affirmer ambitieux cerveau consensus coordination d'options l'appel magistrats qualifié rangs tournée Alcatel Toyota anonyme cassation cf (usually cf.) confusion discrétion fondamentalement initialement installés l'assemblée l'entretien l'émetteur maman nuances paraissent parfums saine vedettes Nikkei dirigée duo enseigne indiqué lourdement module prononcer réalisateur réformes star équivalent Danone Site adopter commis couches explication joint-venture malaise pantalon pomme reine sacs saumon soeur toiles échéant Agusta bond courir expert glace l'enseigne multiplier pluie salons teint European Finalement Maintenant adaptée diriger gérant répartis saveurs souscrit substances vieilles vraisemblablement élaboré émettre certitude champions cotés cyclique détenteurs explications fonctionnent générales invite l'expression pauvre successeur zinc Big Claes Six brochure cave codes configuration d'enregistrement fragile féminine issus magnifique maintenance manuel qu'a recommandé spectaculaires subit traduction évidente Conséquence Fabrimétal KBC adaptés chronique d'IBM enregistrés fibre jazz jusque louer médiatique peser rentables réussit s'élevait saisir semble-t-il visible Financial Singapour absolu blanches boulevard commissaire comprennent créent faculté histoires individus issue multiplient prétexte quotidiens réfléchir satellites souffrent standards Washington commercialise directs diversité gratuite l'Office logiquement ouvertes renoncer calculs compléter couples d'entrer d'esprit d'importants l'acte organiser payant paysages récupération slogan Electric PVC administratives arts avancé carrément changes crédibilité déplacement l'avance parvenu relatifs revues veste Celle FGTB Moody's assurés créés d'éléments immédiat jambes litre mousse prestige sentent souhait touché élus Belle Telinfo abrite considérables d'urgence disait faillites oeil religieux rédaction séries terres vice-président MHz System XXe cure dirigé don enregistrer juridiques pouce précises prétend réunis salade trouvait évaluation Cinq Fort confié cuire indicateur l'avait origines parlé remet spéciales terrible témoignent étonnante Buffett Catherine Research SAP Véronique achetée généraux imposée l'organisme l'édition mention merveille opposition réorganisation satellite scanner Milan Notamment a-t-elle acier conteste créanciers d'acier intégrés l'habitude multiplication panier pharmaceutiques quelconque rayons spectateurs transformé troupes Madame Tandis effectuée fromage géré interlocuteur législatives motif métalliques placée réclamation schéma surplus transition trio Coca-Cola Motors Proximus Wallons atteignent bleus chair conforme costume d'accueil intentions l'horizon l'électricité manqué sortent subsiste supermarchés D'Ieteren Européenne Lorsqu'on amélioré avantageux d'applications engagée espoir exceptions fausse l'expansion l'équivalent plage plaide poivre CHF Livres cadastral chips comptait craintes d'ordinateurs durable démocratique exceptionnels factures fonctionnaire fondation indépendance inventé issu maturité mobilité musiciens organisme recommandations spéculatif suscité titulaire traverse évolutions Fed calendrier collective disposant dévaluation l'honneur pauvreté poursuivi qualifier savait suédois termine traduire valait CSC Forges Hugo Max VVPR appartiennent confrontés demeurent divorce dramatique déductibles efficacement existence fermeté imagine intégrer larges locataires orienté pensé variété administrations aériennes complexité entrent exercer photographie sauvage terminer venant Corp amortissements champs déplacer désigné déterminant opportunité piano remontée s'agisse étroite Difficile Dix Recticel bar concerné constructions l'identité merveilleux min moindres réunir survivre ultime étudié Lambert caractérise choisie distribuer décidément limités livré luxembourgeoise modules progresse promet redresser tombée bains d'hommes dessine enfance finition jury mythe optimale pair plateau poussée resteront Zaventem assurance-vie composée d'entretien décident hélas instant jet laine mobiles parcs préoccupations ramener représenté soudain éditeur José L'auteur Morris Nasdaq administrative autorise banking humour jouit l'actuel market n'ait organisateurs peint s'annonce s'assurer sculptures superbes équipée ASBL CMB Gates bronze catholique citron contributions couture disquette démarrer excellence fatigue imprimantes industrie l'aménagement l'effort l'encontre laboratoires menées meuble mondiaux réduits sont-elles sous-traitants talents Christine Henry administratif administration ailes aérien carrosserie d'économie découvertes exclure hautes hiérarchie impressionnant massivement métro possession remporté strictement suédoise utilisateur vais émises étage d'arbitrage devez expliquent file hebdomadaire intéresse l'hiver l'élaboration marbre performant personnels prévenir suivants verte viendra Angleterre Association Hongrie L'affaire Louvain-la-Neuve apportent automne bourgmestre branches carton contraste courage d'analyse datant dépendra feux importations plantations sidérurgie signale FMI Jean-Michel Léon Super Venise adaptation allure attachés exploite folie instance naturels olympique populaires reprenant valorisation villa villages Est-il Renaissance Shell Vienne architecture authentique autonome complicité d'au d'ouverture dépendance dépense fiable invention lancés partagent rencontres renouvellement évoluent Akzo Combien Marché Xavier ampleur analyses bandes canard collectionneurs compliqué culturelles d'avril donnera déplacements fermer jugée l'aise médaille notaire peut-il privilégier prototype regain regarde wallonnes Emile Volkswagen accru caoutchouc cinquante communautaires conjoncturel créant durer délicat exigent précédents renforce s'ouvre évalué Lille débute définitif engagés exploiter fur positives réparation soupe transferts Ostende Propos Victor limitées nourriture offertes ramené reculé remédier similaires triste écarts Data Industries abaissé boire break chien consacrés cours-bénéfice fuite gigantesque imprimante l'Ouest l'emballage l'église remplace salariaux spectacles vache velours étudie ABN Auparavant Cité Continent Guido Meuse Question d'exemple dotée défini définit délicate démission extérieure interventions jouant l'engagement n'ayant noires obligés Bruxellois Mark Motorola accéder affichait chemise espagnole fleur gardé habitation huile l'accueil légales multiplié revers architecte assister axes concerts contemporains discuter dose détiennent folle l'éditeur magie pompe provisions rapidité témoignages Cap Festival Finlande NDLR contribue demandeurs démonstration exact numériques participent poignée puissants spécialités G-Banque III Livre Peeters SICAFI Technology applique copies flacon lunettes mixte nullement plante provisoire publie puissante regrette s'ajoute stratégies typique vocale Anhyp Brothers brokers concentre diagnostic faciles gestes guise hardware opérer orientée passionné refusent scénarios suffisent vagues écart Chrysler Sénat Via ambiance appartenant assisté attrayant bagages blocs d'essai d'histoire d'étude déduire forfait manquer restait surprenant sérénité vertus écouter DKK Dirk Gevaert Santé Wim accueilli affichés affronter appeler coloris composent contiennent contrepartie fondamentales impressionnante largeur peaux proportions reconversion revente significatif écrite énormes J'aime Network aiment cherché chinoise décharge député essais indiquent infrastructures jouets musicale mutation obstacle partant perdent étudiant J'avais Sinon accordée adjoint débarrasser débit dégustation déjeuner glisse individu l'éducation l'électronique organisées produite prétendre quotidiennement s'étend secondaires soucieux sous-évaluation verts écologique émet Hollywood Legrand Lorsqu'il Pro améliorée bat e-mail excessive favorise joueur l'OCDE marks office phrase promenade prometteur stimuler séances tiendra valoir Martine Québec acquisition augmentent baisses distribue dus massif médiocre obtenus rentrer sales semblable transmis Julie Place ZAR bouquet ceinture coalition comptables corporate d'actifs d'attendre différemment dits italiens journées l'assurance-vie linguistique marchands n'avoir opinion originales registre requis synergies tunnel vogue Malaisie charbon emballages esprits examiner fléchi l'outil librement mentalité miroir occidentaux parité progressive sensation sonore supports synonyme vinaigre Début Euro Hollandais alliance barres chargés d'habitants dois fier gouverneur l'atelier l'humour n'avez origine payée pétroliers signalé variation Point XVIe aliments caméras comportant consultance contemporaine déclin effectif invité j'en l'actif licenciement match millénaire salarié studio tenus triple équipement étoile Bob Californie Devant Smet abonnement baptisée commerces creux facilite flamandes jurisprudence l'ai l'attitude noyau portraits prononcé publications puce qu'aujourd'hui sinistre terminal Dexia Mes augmentations batterie cinéaste compare guides inconvénients instances l'avion retourner sympathique évaluée L'Etat achetant bailleur bonus colonne compensation conseillers continu courbes déclarer enregistrées généré innovations ira jusqu'aux lente occuper pesé pot quarts épreuve Bois Congo Courtrai Powerfin admet attribuer championnat cités comble conquérir d'encre d'oeuvres d'office devenues excessif incertitudes intitulé l'évaluation périphériques réclamer réelles s'étaient Ecolo Nivelles Qu'il Travail allures camps dues exclus grandeur homard illustré inévitable inévitablement l'équipement mariés modération ont-ils positivement profits quarante sculpture spots stage universelle vainqueur édité étendue Arts Communications Media Novell Poor's Stéphane Word changent communiqué conversation d'artistes effective interlocuteurs l'Administration l'ambiance n'aime patronales permettront pneus qualifiés religion souffrir évoqué Chirac Chris Forest Herman Hubert Opel Parti SEK Terre Vie alternatives anversoise bateaux battu brillante d'introduire désert entrepreneur essayé interface intégralement j'aime modifie personnellement systématique Arthur Park admis blocage calls développent individuel l'ONU l'appréciation modestes multinationale out parlant porcelaine pénétrer respecte soupapes spéculateurs étudier Nestlé abus combler conservation donation fiabilité l'exclusion m'ont parcourir parisien remarquables retournement returns EASDAQ Kodak PDG collecte d'alcool déception détérioration l'avoir l'échange lorsqu'elle palme phases privatisations répéter s'imposer valu voulais Almanij Infos Procter Smith Tubize actuariel australien croient d'intervention d'objets encourager fiscalement hautement l'assiette marchand néerlandaises plaintes reproche retient sillage soldats témoins urbain FEB L'économie adopte boutons chuter conjoints convaincus coopérative correspondent director n'hésite niches savez stables tend vain Gamble L'art Quinze Servais Seules apport chauffage commercialiser d'attirer d'existence d'organisation dangers foyer ingrédients négocie révolutionnaire score sidérurgique techniciens voyageur Brown Corluy Herstal Horta L'avenir attiré com conférences constatation d'Amérique douzaine duration détenir indemnités lion nuits plomb soumise sportives verres attribué corriger d'hiver domestiques faille foot home indemnité romantique simulation Brussels L'avantage Swissair autrefois choisis communales d'Angleterre dessinée disponibilité détenu engager exceptionnelles figurer habitant hollandaise immédiate intégration média électeurs Amro DOS Moniteur Parc acceptable apprécier centre-ville d'elle envisagé fantaisie habituellement posséder pourrez tentatives touches visibilité Creyf's Heineken Régie Sterk Tchéquie analyser autorisé complets contrainte costumes d'agir doucement";

	// 10K worst passwors list
	// source: https://xato.net/passwords/more-top-worst-passwords/
	var worstPassswordsdict="password 123456 12345678 1234 qwerty 12345 dragon pussy baseball football letmein monkey 696969";
	


	var translations = {
	  en:  { test_str: "test(en)"
				, passwordSize: "password size"
				, charsets: "character types"
				, alphaLower: "alphabet lowercase"
				, alphaUpper: "alphabet uppercase"
				, numeric: "numeric"
				, punctuation: "punctuation"
				, special: "special"
				, accented: "accented"
				, accentedUppercase: "accentedUppercase"
				, accentedSpecial: "accentedSpecial"			
				, characterVariety: "character variety"
				, sequences: "character sequences"
				, keyboard: "character keyboard sequences"
				, dictionary: "dictionary"
				, globalRatingComment: "Aggregate from all individual ratings (size is first criteria)"
				, rd_allwords_l: " (all words: "
				, rd_allwords_r: ")"
				, rd_allwords_hazard: "Hazardous, found word in "
				, rd_allwords_weak: "Weak, found word in "
				, rd_allwords_dic: " dictionary: "
				, rd_allwords_q: "Questionable, found word in "
				, rd_allwords_a: "Average, found word in "
				, rd_allwords_g: "Good, found word in "
				, rd_allwords_e1: "Excellent, even if found word in "
				, rd_allwords_e2: "Excellent, no significant word found from dictionary compared to password size"
				, rateUnsafe: "Unsafe"
				, rateWeak: "Weak"
				, rateMedium: "Medium"
				, rateGood: "Good"
				, rateSecure: "Secure"
				, rateHazardous: "Hazardous"
				, rs_wts: "Password is far too short: "
				, rs_ts: "Password is too short: "
				, rs_q: "Password length is questionable: "
				, rs_g: "Password length is pretty good: "
				, rs_a: "Password length is awesome... Is is easy to remember?: "
				, rs_i: "Password length is insane!!: "
				, rseq_perfect: "Perfect: No (or very few) sequences found"
				, rseq_average: "Average amount of sequences found: "
				, rseq_impactive: "Impactive amount of sequences found: "
				, rseq_toomany: "Too many / long sequences found: "
				, rseq_allsequences: "Your password is all sequences: "
		   }
	, fr:  { test_str: "test(fr)"
				, passwordSize:   "Longueur de mot de passe"
				, charsets:   "Types de caractères"
				, alphaLower:   "alphabet minuscule"
				, alphaUpper:   "alphabet majuscule"
				, numeric:   "numérique"
				, punctuation:   "ponctuation"
				, special:   "caractères spéciaux"
				, accented:   "caractères accentués"
				, accentedUppercase:   "caractères accentués majuscule"
				, accentedSpecial:   "caractères accentués/spéciaux"			
				, characterVariety:   "variété"
				, sequences:   "séquences"
				, keyboard:   "séquences clavier"
				, dictionary:   "dictionnaire"
				, globalRatingComment:   "Aggrégation des critères individuels (la taille compte plus)"
				, rd_allwords_l:   " (tous les mots: "
				, rd_allwords_r:    ")"
				, rd_allwords_hazard:    "Dangereux, mot trouvé "
				, rd_allwords_weak:    "Faible, mot trouvé "
				, rd_allwords_dic:    " dictionnaire: "
				, rd_allwords_q:    "Médiocre, mot trouvé "
				, rd_allwords_a:    "Moyen, mot trouvé "
				, rd_allwords_g:    "Bon, mot trouvé "
				, rd_allwords_e1:    "Excellent, malgré mot trouvé "
				, rd_allwords_e2:    "Excellent, pas ou peu de mots du dictionnaire comparé à la taille du mot de passe "
		   }
	};

	var defaultText=translations.en;
	var selectedLanguage=defaultText;

	this.setCharacterRepetitionAllowed=function( allowRepetition ){
		allowCharacterRepetition=allowRepetition;
	}
	
    	this._gettext = function ( key )
		{
		  return gettext(key);
		}
		
		/**
		 * Translation function
		 * @param {key} the localized string key
		 * @type {string} the localized string
		 */
		gettext = function ( key )
		{
		  return selectedLanguage[ key ] || defaultText[ key ] || "{translation key not found: " + key + "}";
		}

		/**
		 * Set language to the selected key (e.g. fr, en), or to default
		 * @param {lang} the Language key
		 */
		this.setLanguage = function ( lang )
		{
		  if ( typeof translations[lang] !== 'undefined') {
			selectedLanguage=translations[lang];
		  }else{
			selectedLanguage=defaultText;
		  }
		  return this;
		}


		/**
		 * Retrieve all details from latest password rating
		 * @type {object} The password rating details object
		 */
		this.getLastRatingDetails = function (){
			return ratings;
		}
		/**
		 * Unloads a dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadDictionary = function ( name ){
			delete dict[name];
			delete dictKeys[name];
			return this;
		}


		/**
		 * Selects the type of  password generator
		 * @type {boolean} Enables generator for password easier to remember if true, or all random is false
		 */
		this.setEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordRequested=trueOrFalse;
			return this;
		}
		/**
		 * Selects the type of easy password generator for
		 * @type {boolean} Enables dictionaries if true, or disables them
		 */
		this.useDictionaryForEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordUsingDictionary=trueOrFalse;
			return this;
		}

		/**
		 * Unloads any dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllDictionaries = function (  ){
			dict = {};
			dictKeys={};
			return dict;
		}


		/**
		 * Loads a dictionary in the dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadDictionary = function ( dictionary, name ){
			dict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				dict[ name ][ words[i] ] = true;		
			}
			
			dictKeys[ name ] = Object.keys(dict[ name ]);
			return dict;
		}


		/**
		 * Loads a password dictionary in the relevant dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadPasswdDictionary = function ( dictionary, name ){
			passwddict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				passwddict[ name ][ words[i] ] = true;		
			}
			
			passwddictKeys[ name ] = Object.keys(passwddict[ name ]);
			return passwddict;
		}
		
		/**
		 * Unloads a password dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadPasswdDictionary = function ( name ){
			delete passwddict[name];
			delete passwddictKeys[name];
			return this;
		}
		
		/**
		 * Unloads any password dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllPasswdDictionaries = function (  ){
			passwddict = {};
			passwddictKeys={};
			return passwddict;
		}


		this._findWord = function ( letters, dict ) {
			return findWord( letters, dict );
		}
		/**
		 * Takes in an array of letters and finds the longest possible word at the front of the letters
		 * Courtesy from John Resig @ http://ejohn.org/blog/dictionary-lookups-in-javascript/
		 * @param {string} letters The string to look into
		 * @param {object} dict The dictionary set to use for lookup
		 * @type {object} object containing the longest word and the name of matching dictionary
		 */
		findWord = function ( letters, dict ) {
			
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

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPassword = function ( allowedCharset, length, password, previous ){	
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

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPasswordUsingDictionaries = function ( allowedCharset, length, password, previous ){	
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
				if( addonMaxSize > length/2 ) addonMaxSize = length/2;
				// word
				passwordAddon=easierToRememberPasswordWordFromDictionary( allowedCharset, addonMaxSize );
				lastItem="word";
			}
				
			
			// Maybe pick a separator, or an open-close group
			passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
				
			// append or prepend to previous password
			var newPassword=appendOrPrepend(password,passwordAddon );
			
			// recursive call, do this amn arbitrary number of times until length is Ok		
			return easierToRememberPasswordUsingDictionaries(allowedCharset, length, newPassword, lastItem )
		}


		/**
		 * Adds a separator character to a string
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} maxLength maximal allowed length
		 * @param {string} currentPassword the string that may be modified
		 * @type {string} the modified string
		 */
		addSeparatorOrOpenCloseOrNothing = function ( allowedCharset, maxLength, currentPassword){
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

		/**
		 * Gets the common part of two distinct strings
		 * @param {string} charset1 One string
		 * @param {string} charset2 Another string
		 * @type {string} the common set of characters as a string
		 */
		commonCharset = function ( charset1, charset2){
			var returnCharset="";
			for ( var i = 0; i < charset1.length; i++ )
			{
				var curChar=charset1.charAt(i);
				if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
			}
			return returnCharset;
		}

		/**
		 * Concatenate two strings, by adding something before or after (randomized) the existing.
		 * @param {string} existing the base string
		 * @param {string} addon The part to append to the existing string
		 * @type {string} the generated word
		 */
		appendOrPrepend = function ( existing, addon){
			if ( Math.random() > .5) return addon + existing;  
			return existing+addon;
		}

		/**
		 * Creates a word for a password easier to remember
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of characters
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWord = function ( allowedCharset, length ){
			var type = Math.ceil(Math.random()*3);
			
			return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
			
		}


		/**
		 * Gets a word from dictionary 
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of the word
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWordFromDictionary = function ( allowedCharset, length ){		
			var dictWord="";
			if( length > 3) {
				var i=0;
				dictWord=pickAWordFromDictionary(pickADictionary());
				// try 300 times max, if it doesn't work let's assume the dictionary is weak or words 
				//   shorter than x chars
				while ( i<300 ){
					dictWord=pickAWordFromDictionary(pickADictionary());			
					if( dictWord.length <= length  ){
						// randomly create uppercase or first letter capitalized word
						if( Math.random() > (2/3) ){
							dictWord=capitaliseFirstLetter(dictWord);
						}
						if( Math.random() > (7/9) ){
							dictWord=dictWord.toUpperCase();
						}
						return dictWord;
					}
				}
			}
			// by default build a random word
			return easierToRememberPasswordWord(allowedCharset, length);
		}

		/**
		 * Returns the same word with the first character in uppercase
		 * @type {string} string the string to modify
		 * @type {string} the modified string
		 */
		capitaliseFirstLetter = function (string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		/**
		 * Returns a name of a loaded  dictionnary (randomly)
		 * @type {string} the dictionary name
		 */
		pickADictionary = function (  ){	
			var dictNames = Object.keys(dict);
			return dictNames[ dictNames.length * Math.random() << 0 ];
			
		}
		
		/**
		 * Returns a word from a loaded  dictionnary (randomly chosen)
		 * @param {string} dictionaryName the dictionary name
		 * @type {string} the selected word
		 */
		pickAWordFromDictionary = function ( dictionaryName ){	
			return dictKeys[dictionaryName][ dictKeys[dictionaryName].length * Math.random() << 0 ];
			
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
		easierToRememberPasswordWordRec = function ( allowedCharset, currentWord, length, type, lastTaken ){
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
		easierToRememberPasswordNumber = function ( charset, length ){
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
		pickOneFromCharsetWithPreference = function (allowedCharacters, preferredCharacters){
			var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
			if( reducedCharset.length == 0 ){
				reducedCharset=allowedCharacters;
			}
			
			return nextChar(reducedCharset);
		}


		/**
		 * @type {map} returns the available charsets
		 */
		this.getAvailableCharsets= function (){
			return availableCharsets;
		}
		

		/**
		 * @type {number} returns the default password size
		 */
		this.getDefaultPasswordSize= function (){
			return passwordSize;
		}
		
		/**
		 * @type {map} returns the enabled charsets
		 */
		this.getEnabledCharsets= function (){
			return enabledCharsets;
		}
		

		/**
		 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
		 * @param {string} The characters of the custom charset
		 */
		this.setCustomCharset = function ( charset ){
			if( charset.length==0 ){
				delete availableCharsets["custom"];
			}else{
				availableCharsets["custom"]=charset;
			}
		}
		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		enableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " enabled");
			enabledCharsets[charsetName]=availableCharsets[charsetName];
			return this;
		}

		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		this.enableCharsetByName = function ( charsetName ){
			return enableCharset(charsetName);
		}
		
		/**
		 * Enables all available charset
		 */
		this.enableAllCharsets = function ( ){
			for(var charsetName in availableCharsets){
				 enableCharset( charsetName );
			};
		}

		/**
		 * Enables all default charsets
		 */
		this.enableDefaultCharsets = function (){
			defaultEnabledCharsets.forEach(function(charsetName) {
				enableCharset( charsetName );
			});
			return this;
		}

		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		this.disableCharsetByName = function ( charsetName ){
			return disableCharset(charsetName);
		}
		
		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		disableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " disabled");
			delete enabledCharsets[charsetName];
			return this;
		}

		/**
		 * Builds a bigger charset from all enabled charsets
		 * @type {string} The complete charset
		 */
		prepareCharset = function ( ){
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
		nextChar = function ( charset ){	
			return charset.charAt(Math.floor(Math.random() * charset.length));
		}

		/**
		 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
		 * @param {string} password the password to analyze
		 * @type {string} The eventually modified (or not) version of the password
		 */
		checkCompliance = function ( password ){
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
		addOneFromCharset = function ( charset, password ){	
			password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
			return password;
		} 

		/**
		 * Replaces a character at specified index
		 * @param {string} inputStr the set of characters to include a char from
		 * @param {number} index index of the character to replace
		 * @type {string} The  modified version of the string
		 */
		replaceCharAt = function (inputStr, index, newChar) {
			var strArray = inputStr.split("");
			strArray[index] = newChar;
			return strArray.join("");
		}
		/**
		 * Rate a password using the default strategy
		 * @param {string} password the password being evaluated
		  * @type {object} The password rating
		 */
		this.ratePassword = function ( password ){
			ratings["passwordSize"]=ratePasswordSize(password);
			ratings["charsets"]=rateCharsets(password);
			ratings["characterVariety"]=rateCharacterVariety(password);
			ratings["sequences"]=rateSequences(password);
			ratings["keyboard"]=rateKeyboardLayout(password);
			ratings["dictionary"]=rateDictionary(password, dict);
			ratings["commonPasswords"]=rateDictionary(password, passwddict);
			
			coefficients["passwordSize"]=4;
			coefficients["charsets"]=1;
			coefficients["characterVariety"]=1;
			coefficients["sequences"]=1;
			coefficients["keyboard"]=1;
			coefficients["dictionary"]=1;
			coefficients["commonPasswords"]=1;
			
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
					comment: gettext("globalRatingComment")
				}
		}

		
		this._rateDictionary = function (password, dictionary){
			return rateDictionary(password, dictionary);
		}
		
		/**
		 * Provides a subjective rating of a given password according to dictionary lookup
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateDictionary = function (password, dictionary){
			password=password.toLowerCase();
			var curLetters = password.slice( 0 ), word = "";
			var foundWords=[];
			var maxWord={word:"",dictionary:""};
			
			// Make sure the word is at least 3 letters long	
			while ( curLetters.length > 2 ) {
				curLetters=Array.prototype.slice.call(curLetters);
				baseword = curLetters.join("");
						
				foundword=findWord(baseword,dictionary);		
				if( foundword.word != "" ){
					foundWords.push(foundword);
					if( foundword.word.length > maxWord.word.length){
						maxWord=foundword;				
					}
				}
				curLetters.shift();
			}
			
			var ratingFactor=maxWord.word.length/password.length;
			
			var allwords=gettext("rd_allwords_l");
			for (var i = 0; i < foundWords.length; i++)
			{
				allwords=allwords+"/"+foundWords[i].word;
			}
			var allwords=allwords+gettext("rd_allwords_r");
			
			// compare size of biggest word found with the password size
			if( ratingFactor > .9 ) return {rating:0.0, comment: gettext("rd_allwords_hazard") + maxWord.dictionary + gettext("rd_allwords_dic") + maxWord.word + allwords};	
			if( ratingFactor > .8 ) return {rating:0.01, comment: gettext("rd_allwords_weak") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .7 ) return {rating:0.15+.3*(.8-ratingFactor), comment: gettext("rd_allwords_q") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .4 ) return {rating:0.15+2*(.7-ratingFactor), comment: gettext("rd_allwords_a") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .2 ) return {rating:0.8, comment: gettext("rd_allwords_g") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .1 ) return  {rating:1.0, comment: gettext("rd_allwords_e1") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			return {rating:1.0, comment: gettext("rd_allwords_e2")};	
					
		}
		/**
		 * Provides a subjective rating of a given password according to its size
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		ratePasswordSize = function ( password ){
			var len = password.length;
			
			// lower than 5 is far too low	
			if ( len < 6 ) return {rating:0.0, comment: gettext("rs_wts")+len};		
			if ( len < 10 ) return {rating:0.04*len, comment: gettext("rs_ts")+len};		
			if ( len < 15 ) return {rating:.44+.04*(len-10), comment: gettext("rs_q")+len};
			if ( len < 30 ) return {rating:.65+.01*(len-15), comment: gettext("rs_g")+len};	
			if ( len < 50 ) return {rating:.80+.01*(len-30), comment: gettext("rs_a")+len};
			return {rating:1.0, comment: gettext("rs_i")+len};	
			
			
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		this._rateSequences = function ( password ){
			return rateSequences(password);
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateSequences = function ( password ){
			
			var sequences=findSequences(password);
			var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + currentValue;
			},"").length;		
			var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + " / " + currentValue;
			},"");		
			var ratio=seqLength/password.length;
			
			if( ratio <= .1) return {rating:1.0, comment: gettext("rseq_perfect")};
			if( ratio <= .5) return {rating:.9-ratio/2, comment: gettext("rseq_average") + seqStr};
			if( ratio <= .6) return {rating:.64-(ratio-.5), comment: gettext("rseq_impactive") + seqStr};
			if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: gettext("rseq_toomany") + seqStr};
			if ( ratio == 1.0 ) return {rating:0.0, comment: gettext("rseq_allsequences") + seqStr} ;
			return {rating:0.1, comment: gettext("rseq_toomany") + seqStr};
			
		}
		
		this._rateKeyboardLayout = function ( password ){
			return rateKeyboardLayout(password);
		}
		
		/**
		 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateKeyboardLayout = function ( password ){
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
		this._longestCommonSubstring = function (str1, str2){
			return longestCommonSubstring(str1, str2);
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
		longestCommonSubstring = function (str1, str2){
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
		rateCharsets = function ( password ){
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
		rateCharacterVariety = function ( password ){	
			var rate=rawRateCharacterVariety( password );
			if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
		}
		/**
		 * Provides a subjective rating of a given password according to the different sets of characters in use
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rawRateCharacterVariety = function ( password ){	
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
		this._hasOneFromCharset = function ( charset, password){
			return hasOneFromCharset( charset, password);
		}
		
		/**
		 * Checks if the password has at least one character from provided charset
		 * @param {string} charset the related charset
		 * @param {string} password the password to analyze
		 * @type {boolean} true if the password has at least one character from provided charset, false either
		 */
		hasOneFromCharset = function ( charset, password){
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
		this.makePassword = function (){
			return makePasswordWithSize(passwordSize);
		}
		
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		this._findSequences=function ( password ){
			return findSequences(password);
		}
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		findSequences = function ( password ){
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
		 * @param {object} rate the password rating
		 * @type {string} The resulting description
		 */
		this.passwordStrengthDescFromRate = function (rate){
			if( rate < .2) return gettext("rateHazardous");
			if( rate < .5) return gettext("rateUnsafe");
			if( rate < .6) return gettext("rateWeak");
			if( rate < .7) return gettext("rateMedium");
			if( rate < .8) return gettext("rateGood");
			if( rate >= .8) return gettext("rateSecure");
			return "N/A";
		}
		/**
		 * Generates a password of a given size
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		this.makePasswordWithSize = function ( passwdSize ){
			var charset=prepareCharset();
			
			if ( easyPasswordRequested && easyPasswordUsingDictionary) return easierToRememberPasswordUsingDictionaries( charset, passwdSize,"","");
			if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
			else return makeAnyPasswordWithSize(charset, passwdSize);
			
		}
		/**
		 * Generates a password of a given size using a given charset
		 * @param {string} charset the allowed set of characters
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		makeAnyPasswordWithSize = function ( charset, passwdSize ){
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
		
		/**
		 * Initialization 
		 * @type {object} This object
		 */
		
		this.initialize = function(){
			this.enableDefaultCharsets();
			this.loadDictionary(frenchdict,"french");
			this.loadDictionary(englishdict,"english");
			this.loadPasswdDictionary(worstPassswordsdict,"10k worst passwords");
			return this;
		}
		
		return this.initialize();
};

