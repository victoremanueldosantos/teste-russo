import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: 'Módulo 1: Alfabeto Cirílico e Primeiros Sons',
    subtitle: 'Domine a leitura das 33 letras e primeiras palavras reais',
    description: 'Aprenda a decifrar a escrita cirílica, identificar falsos amigos visuais e ler suas primeiras palavras russas com segurança.',
    iconName: 'BookOpen',
    level: 'Iniciante A1',
    lessonsCount: 3,
    estimatedMinutes: 20,
    xpReward: 60,
    lessons: [
      {
        id: 'm1-l1',
        title: 'As Letras Idênticas e Falsos Amigos',
        summary: 'Descubra quais letras têm o mesmo som do português e quais enganam os olhos.',
        contents: [
          {
            id: 'c1',
            title: 'Letras com grafia e som semelhantes ao português',
            type: 'concept',
            body: 'Algumas letras cirílicas são muito fáceis para quem fala português porque parecem e soam quase iguais: A (a), K (k), M (m), O (o), T (t). Juntando essas letras, você já consegue ler palavras inteiras!',
            russianSnippets: [
              { ru: 'Мама', translit: 'Máma', pt: 'Mamãe' },
              { ru: 'Тот', translit: 'Tot', pt: 'Aquele' },
              { ru: 'Кот', translit: 'Kot', pt: 'Gato macho' },
            ],
          },
          {
            id: 'c2',
            title: 'Cuidado com os Falsos Amigos Visuais',
            type: 'grammar',
            body: 'Estas quatro letras enganam quem lê pela primeira vez:\n• В soa como V (ex: Вода = Vadá = Água)\n• Р soa como R rolado (ex: Рок = Rok = Rock)\n• С soa sempre como S (ex: Сад = Sat = Jardim)\n• Н soa como N (ex: Нос = Nos = Nariz)',
            russianSnippets: [
              { ru: 'Ресторан', translit: 'Restarán', pt: 'Restaurante (note: Р=R, с=s, н=n)' },
              { ru: 'Метро', translit: 'Metró', pt: 'Metrô' },
            ],
          },
        ],
      },
      {
        id: 'm1-l2',
        title: 'Letras Novas e Sons Únicos',
        summary: 'Aprenda os símbolos gregos e eslavos: Д, Л, П, Ф, Ц, Ч, Ш, Щ.',
        contents: [
          {
            id: 'c3',
            title: 'Sons originados do alfabeto grego',
            type: 'concept',
            body: 'Letras como П (som de P, do grego Pi), Д (som de D, do grego Delta), Л (som de L, do grego Lambda) e Ф (som de F, do grego Phi).',
            russianSnippets: [
              { ru: 'Папа', translit: 'Pápa', pt: 'Papai' },
              { ru: 'Лампа', translit: 'Lámpa', pt: 'Lâmpada / abajur' },
              { ru: 'Дом', translit: 'Dom', pt: 'Casa' },
            ],
          },
          {
            id: 'c4',
            title: 'Os sons sibilantes e africados: Ч, Ц, Ш, Щ',
            type: 'grammar',
            body: '• Ч tem som de "tch" (como em "tchau"): Чай (chá)\n• Ц tem som de "ts" (como em "pizza"): Центр (centro)\n• Ш tem som de "ch" duro e seco: Школа (escola)\n• Щ tem som de "chtch" longo e suave: Борщ (borshch, sopa tradicional)',
            russianSnippets: [
              { ru: 'Чай', translit: 'Tchay', pt: 'Chá' },
              { ru: 'Борщ', translit: 'Bórshch', pt: 'Borsch (sopa russa)' },
            ],
          },
        ],
      },
      {
        id: 'm1-l3',
        title: 'Vogais Duras e Brandas + Os Dois Sinais',
        summary: 'Entenda os pares vocálicos e para que servem Ь e Ъ.',
        contents: [
          {
            id: 'c5',
            title: 'Os 5 Pares de Vogais (Dura vs Branda/Iotizada)',
            type: 'concept',
            body: 'O russo organiza suas 10 vogais em pares:\n• А [a] ↔ Я [ya]\n• О [o] ↔ Ё [yo]\n• У [u] ↔ Ю [yu]\n• Э [e] ↔ Е [ye]\n• Ы [y gutural] ↔ И [i]\nAs vogais da segunda coluna suavizam a consoante anterior!',
            russianSnippets: [
              { ru: 'Да', translit: 'Da', pt: 'Sim' },
              { ru: 'Нет', translit: 'Nyet', pt: 'Não' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Módulo 2: Pronúncia, Redução Vocálica e Leitura',
    subtitle: 'Segredos da fonética nativa: Ákanye, Íkanye e ensurdecimento',
    description: 'Aprenda por que o russo soa tão melódico e por que as letras mudam de som quando não são tônicas.',
    iconName: 'Volume2',
    level: 'Iniciante A1',
    lessonsCount: 2,
    estimatedMinutes: 18,
    xpReward: 50,
    lessons: [
      {
        id: 'm2-l1',
        title: 'A Redução Vocálica: O Ákanye (Аканье)',
        summary: 'Por que "Хорошо" se pronuncia "Kharashó" e não "Khoroshó".',
        contents: [
          {
            id: 'c6',
            title: 'A regra mágica do O átono',
            type: 'concept',
            body: 'Em russo, a letra "О" só soa como "ó" ou "ô" quando recebe o ACENTO TÔNICO da palavra. Quando ela NÃO é tônica, ela enfraquece e soa como um "a" breve e relaxado. Isso se chama Ákanye!',
            russianSnippets: [
              { ru: 'Хорошо́', translit: 'Kharashó', pt: 'Bom / Bem (os dois primeiros O viram som de A!)' },
              { ru: 'Молоко́', translit: 'Malakó', pt: 'Leite' },
              { ru: 'Спаси́бо', translit: 'Spasíba', pt: 'Obrigado (o O final soa A)' },
            ],
          },
        ],
      },
      {
        id: 'm2-l2',
        title: 'Ensurdecimento de Consoantes Finais',
        summary: 'B vira P, D vira T, V vira F no fim das palavras.',
        contents: [
          {
            id: 'c7',
            title: 'Consoantes sonoras no final perdem a vibração',
            type: 'grammar',
            body: 'No final das palavras russas, consoantes sonoras perdem a voz e se transformam no seu par surdo:\n• Б soa como П: Клуб → "Klup"\n• Д soa como Т: Город → "Górat"\n• В soa como Ф: Городков → "...f"\n• Г soa como К: Друг → "Druk"',
            russianSnippets: [
              { ru: 'Клуб', translit: 'Klup', pt: 'Clube' },
              { ru: 'Друг', translit: 'Druk', pt: 'Amigo' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Módulo 3: Cumprimentos e Apresentações',
    subtitle: 'Saudações formais e informais, dizer seu nome e origem',
    description: 'Comunique-se em suas primeiras interações reais em Moscou ou São Petersburgo.',
    iconName: 'MessageSquare',
    level: 'Básico A1',
    lessonsCount: 3,
    estimatedMinutes: 25,
    xpReward: 70,
    lessons: [
      {
        id: 'm3-l1',
        title: 'Saudações: Formal vs Informal',
        summary: 'Quando usar Привет e quando usar Здравствуйте.',
        contents: [
          {
            id: 'c8',
            title: 'Diferença crucial de formalidade',
            type: 'dialogue',
            body: 'O russo leva a etiqueta muito a sério:\n• Привет [Privét]: "Oi / Olá" informal, apenas para amigos próximos, jovens e familiares.\n• Здра́вствуйте [Zdrástvuytye]: "Olá / Como vai" formal, usado com estranhos, professores, superiores e pessoas mais velhas.',
            russianSnippets: [
              { ru: 'Привет!', translit: 'Privét!', pt: 'Oi! (informal)' },
              { ru: 'Здра́вствуйте!', translit: 'Zdrástvuytye!', pt: 'Olá! (formal/respeitoso)' },
              { ru: 'До свида́ния!', translit: 'Da svidániya!', pt: 'Até logo / Adeus!' },
              { ru: 'Пока́!', translit: 'Paká!', pt: 'Tchau! (informal)' },
            ],
          },
        ],
      },
      {
        id: 'm3-l2',
        title: 'Apresentando-se: "Como você se chama?"',
        summary: 'Use "Меня зовут..." e "Как вас зовут?".',
        contents: [
          {
            id: 'c9',
            title: 'Estrutura de apresentação',
            type: 'dialogue',
            body: 'Em russo não se diz "meu nome é", mas literalmente "a mim chamam":\n• Меня́ зову́т [Menyá zavút] + Seu Nome: "Eu me chamo..."\n• Как вас зову́т? [Kak vas zavút?]: "Como o(a) senhor(a) se chama?" (formal)\n• Как тебя́ зову́т? [Kak tebyá zavút?]: "Como você se chama?" (informal)',
            russianSnippets: [
              { ru: 'Меня́ зову́т Лукас.', translit: 'Menyá zavút Lukas.', pt: 'Meu nome é Lucas.' },
              { ru: 'О́чень прия́тно!', translit: 'Ótchen’ priyátna!', pt: 'Muito prazer!' },
            ],
          },
        ],
      },
      {
        id: 'm3-l3',
        title: 'De onde você é? O Brasil em russo',
        summary: 'Fale sua nacionalidade e de onde você veio.',
        contents: [
          {
            id: 'c10',
            title: 'País e Origem',
            type: 'concept',
            body: 'Para dizer de onde você é, use a preposição "из" (de) com o caso genitivo:\n• Я из Брази́лии [Ya iz Brazílii] = "Eu sou do Brasil"\n• Я брази́лец [Ya brazílyets] = "Eu sou brasileiro (homem)"\n• Я бразилья́нка [Ya brazil’yánka] = "Eu sou brasileira (mulher)"',
            russianSnippets: [
              { ru: 'Я из Брази́лии.', translit: 'Ya iz Brazílii.', pt: 'Eu sou do Brasil.' },
              { ru: 'Вы говори́те по-англи́йски?', translit: 'Vy gavarítye pa-anglíyski?', pt: 'Você fala inglês?' },
              { ru: 'Я говорю́ по-ру́сски чуть-чуть.', translit: 'Ya gavaryú pa-rússki tchut’-tchut’.', pt: 'Eu falo russo um pouquinho.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Módulo 4: Pronomes Pessoais e Possessivos',
    subtitle: 'Я, Ты, Он, Она e a concordância de Meu/Minha/Nosso',
    description: 'Domine quem faz a ação e a quem pertencem os objetos.',
    iconName: 'Users',
    level: 'Básico A1',
    lessonsCount: 2,
    estimatedMinutes: 20,
    xpReward: 60,
    lessons: [
      {
        id: 'm4-l1',
        title: 'Os Pronomes Pessoais Russos',
        summary: 'Aprenda os 8 pronomes retos fundamentais.',
        contents: [
          {
            id: 'c11',
            title: 'Tabela dos Pronomes',
            type: 'concept',
            body: '• Я [ya] = Eu\n• Ты [ty] = Você (informal, uma pessoa só)\n• Он [on] = Ele\n• Она́ [aná] = Ela\n• Оно́ [anó] = Ele/Ela (neutro para coisas/conceitos)\n• Мы [my] = Nós\n• Вы [vy] = Vocês (plural) OU Você (formal com maiúscula "Вы")\n• Они́ [aní] = Eles / Elas',
            russianSnippets: [
              { ru: 'Я студе́нт.', translit: 'Ya studént.', pt: 'Eu sou estudante.' },
              { ru: 'Она́ врач.', translit: 'Aná vratch.', pt: 'Ela é médica.' },
              { ru: 'Мы здесь.', translit: 'My zdes’.', pt: 'Nós estamos aqui.' },
            ],
          },
        ],
      },
      {
        id: 'm4-l2',
        title: 'Possessivos: Meu, Minha, Meus',
        summary: 'Como os possessivos concordam com o gênero do objeto.',
        contents: [
          {
            id: 'c12',
            title: 'Concordância do Possessivo "Meu"',
            type: 'grammar',
            body: 'Em russo, a palavra "meu" muda conforme o gênero do substantivo:\n• Masculino: Мой [moy] (ex: мой дом = minha casa/meu lar)\n• Feminino: Моя́ [mayá] (ex: моя мама = minha mãe)\n• Neutro: Моё [mayó] (ex: моё окно = minha janela)\n• Plural: Мои́ [maí] (ex: мои друзья = meus amigos)',
            russianSnippets: [
              { ru: 'Это мой друг.', translit: 'Éta moy druk.', pt: 'Este é meu amigo.' },
              { ru: 'Это моя́ кни́га.', translit: 'Éta mayá kníga.', pt: 'Este é meu livro (kníga é feminino em russo).' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Módulo 5: Substantivos e Gênero',
    subtitle: 'Masculino, Feminino e Neutro: o fim das dúvidas',
    description: 'Aprenda a reconhecer o gênero de qualquer palavra russa pela letra final em 3 segundos.',
    iconName: 'Tag',
    level: 'Básico A1+',
    lessonsCount: 2,
    estimatedMinutes: 20,
    xpReward: 60,
    lessons: [
      {
        id: 'm5-l1',
        title: 'As Regras de Terminação dos 3 Gêneros',
        summary: 'Como descobrir se a palavra é masculina, feminina ou neutra.',
        contents: [
          {
            id: 'c13',
            title: 'Regra Prática pelas Terminações',
            type: 'concept',
            body: 'Ao olhar a última letra de um substantivo no nominativo singular:\n1. Masculino: termina em CONSOANTE ou -Й (ex: стол, музей, брат).\n2. Feminino: termina em -А ou -Я (ex: мама, Россия, сестра).\n3. Neutro: termina em -О ou -Е (ex: окно, море, кафе).\nPalavras terminando em -Ь (sinal brando) podem ser masculinas ou femininas (ex: день masc., ночь fem.).',
            russianSnippets: [
              { ru: 'Стол', translit: 'Stol', pt: 'Mesa (termina em consoante = Masculino)' },
              { ru: 'Маши́на', translit: 'Mashína', pt: 'Carro (termina em -a = Feminino)' },
              { ru: 'Письмо́', translit: 'Pis’mó', pt: 'Carta (termina em -o = Neutro)' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Módulo 6: Verbos Básicos e Conjugação no Presente',
    subtitle: 'As duas grandes conjugações: 1ª (-ать/-ять) e 2ª (-ить)',
    description: 'Conjugue verbos essenciais do dia a dia no tempo presente com regras sistemáticas.',
    iconName: 'Sparkles',
    level: 'Básico A1+',
    lessonsCount: 2,
    estimatedMinutes: 25,
    xpReward: 70,
    lessons: [
      {
        id: 'm6-l1',
        title: 'A Primeira Conjugação: Verbos em -ать (ex: Читать)',
        summary: 'Conjugar "ler", "saber", "fazer" e "trabalhar".',
        contents: [
          {
            id: 'c14',
            title: 'Verbo Чита́ть (Ler) no Presente',
            type: 'grammar',
            body: 'Corta-se a terminação "-ть" do infinitivo e acrescentam-se as terminações pessoais:\n• Я чита́ю [chitáyu] = Eu leio\n• Ты чита́ешь [chitáyesh] = Você lê\n• Он/Она́ чита́ет [chitáyet] = Ele/Ela lê\n• Мы чита́ем [chitáyem] = Nós lemos\n• Вы чита́ете [chitáyetye] = Vocês leem\n• Они́ чита́ют [chitáyut] = Eles leem',
            russianSnippets: [
              { ru: 'Я чита́ю кни́гу.', translit: 'Ya chitáyu knígu.', pt: 'Eu leio um livro.' },
              { ru: 'Что ты де́лаешь?', translit: 'Shto ty délayesh?', pt: 'O que você está fazendo?' },
            ],
          },
        ],
      },
      {
        id: 'm6-l2',
        title: 'A Segunda Conjugação: Verbos em -ить (ex: Говорить)',
        summary: 'Conjugar o verbo "falar" e suas terminações em -и-.',
        contents: [
          {
            id: 'c15',
            title: 'Verbo Говори́ть (Falar)',
            type: 'grammar',
            body: '• Я говорю́ [gavaryú] = Eu falo\n• Ты говори́шь [gavarísh] = Você fala\n• Он/Она́ говори́т [gavarít] = Ele/Ela fala\n• Мы говори́м [gavarím] = Nós falamos\n• Вы говори́те [gavarítye] = Vocês falam\n• Они́ говоря́т [gavaryát] = Eles falam',
            russianSnippets: [
              { ru: 'Мы говори́м по-ру́сски.', translit: 'My gavarím pa-rússki.', pt: 'Nós falamos russo.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Módulo 7: Construção de Frases, Negação e Ter',
    subtitle: 'Ausência do verbo "ser" no presente e a estrutura "У меня есть"',
    description: 'Construa frases naturais russas sem traduzir palavra por palavra do português.',
    iconName: 'Layers',
    level: 'Básico A2',
    lessonsCount: 2,
    estimatedMinutes: 20,
    xpReward: 65,
    lessons: [
      {
        id: 'm7-l1',
        title: 'O Verbo "Ser/Estar" Não Existe no Presente!',
        summary: 'Diga "Eu sou brasileiro" ou "Isto é uma maçã" sem nenhum verbo.',
        contents: [
          {
            id: 'c16',
            title: 'Equação direta entre sujeito e predicado',
            type: 'concept',
            body: 'Em russo não existe o verbo "ser/estar" no presente. Basta colocar o pronome e o substantivo/adjetivo juntos:\n• Я бразилец = "Eu [sou] brasileiro"\n• Это стол = "Isto [é] uma mesa"\n• Он здесь = "Ele [está] aqui"',
            russianSnippets: [
              { ru: 'Это мой чай.', translit: 'Éta moy tchay.', pt: 'Este é meu chá.' },
              { ru: 'Где метро́? — Метро́ там.', translit: 'Gde metró? — Metró tam.', pt: 'Onde fica o metrô? — O metrô é ali.' },
            ],
          },
        ],
      },
      {
        id: 'm7-l2',
        title: 'Como Dizer "Eu Tenho": У меня есть',
        summary: 'A estrutura russa de posse "Junto a mim há...".',
        contents: [
          {
            id: 'c17',
            title: 'A fórmula russa de posse',
            type: 'grammar',
            body: 'Em russo não se usa um verbo "ter" comum no dia a dia. Diz-se literalmente "Junto a mim existe":\n• У меня́ есть... [U menyá yest’...] = Eu tenho...\n• У тебя́ есть... [U tebyá yest’...] = Você tem...\n• У него́ есть... [U nevó yest’...] = Ele tem...\n• У неё есть... [U neyó yest’...] = Ela tem...\n• У нас есть... [U nas yest’...] = Nós temos...',
            russianSnippets: [
              { ru: 'У меня́ есть вопро́с.', translit: 'U menyá yest’ vaprós.', pt: 'Eu tenho uma pergunta.' },
              { ru: 'У тебя́ есть биле́т?', translit: 'U tebyá yest’ bilét?', pt: 'Você tem passagem / ingresso?' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Módulo 8: Casos Gramaticais Russos',
    subtitle: 'Os 6 casos explicados com clareza: o coração da língua',
    description: 'Desmistifique as declinações: entenda a função de cada caso sem medo de errar.',
    iconName: 'Compass',
    level: 'Intermediário A2',
    lessonsCount: 3,
    estimatedMinutes: 30,
    xpReward: 80,
    lessons: [
      {
        id: 'm8-l1',
        title: 'O que são Casos e para que servem?',
        summary: 'Por que o final das palavras russas muda conforme a função na frase.',
        contents: [
          {
            id: 'c18',
            title: 'O Conceito de Declinação',
            type: 'concept',
            body: 'Em português, mostramos a função das palavras pela ordem ("O cão mordeu o homem") ou por preposições ("para Maria", "de Pedro"). Em russo, a terminação da palavra se altera para mostrar quem faz o que:\n1. Nominativo: O sujeito da frase.\n2. Acusativo: O objeto direto (quem recebe a ação).\n3. Genitivo: Posse ("de quem") e ausência ("não tem").\n4. Dativo: Objeto indireto ("para quem").\n5. Instrumental: Instrumento ("com o que / com quem").\n6. Preposicional: Localização ("em onde / sobre o que").',
            russianSnippets: [
              { ru: 'Москва́ (Nominativo)', translit: 'Maskvá', pt: 'Moscou (sujeito)' },
              { ru: 'В Москве́ (Preposicional)', translit: 'V Maskvé', pt: 'Em Moscou (lugar)' },
              { ru: 'Я е́ду в Москву́ (Acusativo)', translit: 'Ya yédu v Maskvú', pt: 'Eu vou para Moscou (direção)' },
            ],
          },
        ],
      },
      {
        id: 'm8-l2',
        title: 'O Caso Preposicional (Localização)',
        summary: 'O caso mais fácil: como dizer "na cidade", "no trabalho", "no Brasil".',
        contents: [
          {
            id: 'c19',
            title: 'Terminação básica em -е',
            type: 'grammar',
            body: 'Para dizer onde algo está com as preposições "в" (em/dentro) ou "на" (em/na superfície), a maioria dos substantivos masculinos e femininos ganha a terminação "-е":\n• Бразилия → в Брази́лии (exceção em -ия vira -ии)\n• Город → в го́роде (na cidade)\n• Парк → в па́рке (no parque)',
            russianSnippets: [
              { ru: 'Я живу́ в Брази́лии.', translit: 'Ya zhivú v Brazílii.', pt: 'Eu moro no Brasil.' },
              { ru: 'Она́ рабо́тает в банке.', translit: 'Aná rabótayet v bánke.', pt: 'Ela trabalha no banco.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: 'Módulo 9: Verbos de Movimento',
    subtitle: 'A pé vs veículo, e ida única vs ida e volta',
    description: 'Aprenda os pares lendários: Идти/Ходить e Ехать/Ездить.',
    iconName: 'Navigation',
    level: 'Intermediário A2+',
    lessonsCount: 2,
    estimatedMinutes: 25,
    xpReward: 70,
    lessons: [
      {
        id: 'm9-l1',
        title: 'A Pé vs Em Veículo',
        summary: 'Em russo não se pode dizer apenas "ir": deve-se especificar o meio.',
        contents: [
          {
            id: 'c20',
            title: 'A distinção física do movimento',
            type: 'concept',
            body: '• A pé: Идти [ittí] / Ходи́ть [khadít’]\n• Em veículo (carro, trem, ônibus, avião): Е́хать [yékhat’] / Е́здить [yézdit’]',
            russianSnippets: [
              { ru: 'Я иду́ домо́й.', translit: 'Ya idú damóy.', pt: 'Estou indo para casa (a pé agora).' },
              { ru: 'Мы е́дем на по́езде.', translit: 'My yédyem na póyezde.', pt: 'Estamos indo de trem (veículo).' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: 'Módulo 10: Conversação Cotidiana e Prática',
    subtitle: 'No restaurante, no café, pedindo conta, informações e compras',
    description: 'Diálogos vivos para sobreviver e brilhar em viagens pela Rússia.',
    iconName: 'Coffee',
    level: 'Intermediário B1',
    lessonsCount: 2,
    estimatedMinutes: 25,
    xpReward: 75,
    lessons: [
      {
        id: 'm10-l1',
        title: 'No Café e Restaurante',
        summary: 'Pedindo água, café, conta e agradecendo.',
        contents: [
          {
            id: 'c21',
            title: 'Expressões Essenciais no Restaurante',
            type: 'dialogue',
            body: 'Para pedir algo educadamente, use:\n• Пожа́луйста [Pazhálusta] = Por favor / De nada\n• Счёт, пожа́луйста [Shchot, pazhálusta] = A conta, por favor\n• Можно... [Mózhna...] = É possível / Dá para trazer...?',
            russianSnippets: [
              { ru: 'Оди́н ко́фе без са́хара, пожа́луйста.', translit: 'Adín kófe bez sákhara, pazhálusta.', pt: 'Um café sem açúcar, por favor.' },
              { ru: 'Счёт, пожа́луйста!', translit: 'Shchot, pazhálusta!', pt: 'A conta, por favor!' },
              { ru: 'Бы́ло о́чень вку́сно!', translit: 'Býla ótchen’ vkúsna!', pt: 'Estava muito gostoso!' },
            ],
          },
        ],
      },
    ],
  },
];
