const commands = module.exports = {
    'trad': `
!trad <langue résultat> "<phrase a traduire>"
   Une traduction de la phrase entre parenthèses.
  Langues disponibles :
Afrikaans 	af
Albanian 	sq
Amharic 	am
Arabic 	ar
Armenian 	hy
Azeerbaijani 	az
Basque 	eu
Belarusian 	be
Bengali 	bn
Bosnian 	bs
Bulgarian 	bg
Catalan 	ca
Cebuano 	ceb
Chinese (Simplified) 	zh-CN
Chinese (Traditional) 	zh-TW
Corsican 	co
Croatian 	hr
Czech 	cs
Danish 	da
Dutch 	nl
English 	en
Esperanto 	eo
Estonian 	et
Finnish 	fi
French 	fr
Frisian 	fy
Galician 	gl
Georgian 	ka
German 	de
Greek 	el
Gujarati 	gu
Haitian Creole 	ht
Hausa 	ha
Hawaiian 	haw
Hebrew 	iw
Hindi 	hi
Hmong 	hmn
Hungarian 	hu
Icelandic 	is
Igbo 	ig
Indonesian 	id
Irish 	ga
Italian 	it
Japanese 	ja
Javanese 	jw
Kannada 	kn
Kazakh 	kk
Khmer 	km
Korean 	ko
Kurdish 	ku
Kyrgyz 	ky
Lao 	lo
Latin 	la
Latvian 	lv
Lithuanian 	lt
Luxembourgish 	lb
Macedonian 	mk
Malagasy 	mg
Malay 	ms
Malayalam 	ml
Maltese 	mt
Maori 	mi
Marathi 	mr
Mongolian 	mn
Myanmar (Burmese) 	my
Nepali 	ne
Norwegian 	no
Nyanja (Chichewa) 	ny
Pashto 	ps
Persian 	fa
Polish 	pl
Portuguese (Portugal, Brazil) 	pt
Punjabi 	pa
Romanian 	ro
Russian 	ru
Samoan 	sm
Scots Gaelic 	gd
Serbian 	sr
Sesotho 	st
Shona 	sn
Sindhi 	sd
Sinhala (Sinhalese) 	si
Slovak 	sk
Slovenian 	sl
Somali 	so
Spanish 	es
Sundanese 	su
Swahili 	sw
Swedish 	sv
Tagalog (Filipino) 	tl
Tajik 	tg
Tamil 	ta
Telugu 	te
Thai 	th
Turkish 	tr
Ukrainian 	uk
Urdu 	ur
Uzbek 	uz
Vietnamese 	vi
Welsh 	cy
Xhosa 	xh
Yiddish 	yi
Yoruba 	yo
Zulu 	zu`,
    'chifumi': `
!chifumi
   Le jeu du chi fu mi (ou pierre feuille ciseaux) un peu remixé.`,

    'morpion': `
!morpion
   Le jeu du morpion classique contre l'Intelligence Artificielle.`,

    'meteo': `
!meteo
   Affiche la météo a valence. (le temps donné est le plus mauvais temps de la journée)`,

    'help': `
!help [command]
   Affiche l'aide de la commande choisie.`,

   'kiss': `
!kiss <mention>
  Tu veux embrasser quelqu'un c'est le moment.`,

    'hug': `
!hug
  Les calins c'est bien vous savez.`,

    'choose': `
!choose <arg1> | [arg2] ...
   Choisis au hasard entre les choix proposés.`,

    'prune': `
!prune <nombre> [options]
    Supprime les <nombre> derniers messages.
   Options:
      [--bots]            : Supprime uniquement les messages des bots
      [--user <nom>]     : Supprime uniquement les messages de l'utilisateur
      [--filter <caractères>] : Supprime uniquement les messages contenant les caractères choisis
      [--pinned | -p]     : Supprime aussi les messages épinglés
      [--silent | -s]     : supprime la commande et ne réponds rien`,

    'music': `
    [Music Help]
    !music | m <fonction>
      play <url> | <recherche> : Ajoute la chanson/playlist a la queue
      skip                  : Passe la chanson actuelle
      pause                 : Pause la chanson
      resume                : Enlève la pause de la chanson
      queue                 : Affiche la queue
      purge                 : Nettoie la queue
      np                    : Affiche la chanson jouée actuellement
      vol | v <0-100>       : Change le volume
      join                  : Rejoint votre channel vocal
      leave                 : Quitte le channel vocal
`,

    'ban': `
!ban <mention> [options]
   Ban l'utilisateur mentionné
   Vous ne pouvez pas bannir un membre plus haut gradé que vous
   Options:
      [--days <nombre>]   : Supprime les message du membre banni
      [--reason <raison>] : Ajoute une raison pour bannir le membre`,

    'kick': `
!kick <mention> [options]
   Kick l'utilisateur mentionné.
   Vous ne pouvez pas bannir un membre plus haut gradé que vous
   Options:
      [--reason <raison>] : Ajoute une raison pour kick le membre`
}
