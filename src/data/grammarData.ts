export interface GrammarTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'gênero' | 'casos' | 'verbos' | 'aspecto' | 'movimento' | 'sintaxe';
  explanation: string;
  tables?: {
    caption: string;
    headers: string[];
    rows: string[][];
  }[];
  examples: {
    ru: string;
    translit: string;
    pt: string;
    note?: string;
  }[];
  keyRules: string[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'genero',
    title: 'Gêneros Gramaticais (Род имён существительных)',
    subtitle: 'Masculino, Feminino e Neutro: Regras simples pelas letras finais',
    category: 'gênero',
    explanation: 'No idioma russo, todo substantivo no singular pertence a um de três gêneros: Masculino (Мужской род), Feminino (Женский род) ou Neutro (Средний род). Diferente do português, que tem apenas dois gêneros, o russo possui o gênero neutro para objetos, conceitos abstratos e seres inanimados terminados em -О ou -Е.',
    keyRules: [
      'Substantivos terminados em CONSOANTE ou -Й são quase sempre MASCULINOS (ex: Стол, Музей).',
      'Substantivos terminados em -А ou -Я são quase sempre FEMININOS (ex: Книга, Россия).',
      'Substantivos terminados em -О ou -Е são quase sempre NEUTROS (ex: Окно, Море).',
      'Palavras terminadas em -Ь (sinal brando) podem ser masculinas ou femininas e devem ser memorizadas individualmente (ex: День masc., Ночь fem.).',
      'Homens com terminações em -а (Папа = papai, Дедушка = vovô) são gramaticalmente masculinos!',
    ],
    tables: [
      {
        caption: 'Quadro Resumo das Terminações de Gênero',
        headers: ['Gênero', 'Terminação Típica', 'Exemplo Russo', 'Transliteração', 'Significado'],
        rows: [
          ['Masculino', 'Consoante dura / -й', 'Брат / Чай', 'Brat / Tchay', 'Irmão / Chá'],
          ['Feminino', '-а / -я', 'Сестра / Неделя', 'Sestrá / Nyedyélya', 'Irmã / Semana'],
          ['Neutro', '-о / -е / -мя', 'Письмо / Море / Время', 'Pis’mó / Móre / Vryémya', 'Carta / Mar / Tempo'],
          ['Especial (-ь)', 'Sinal brando (-ь)', 'Словарь (M) / Дверь (F)', 'Slavár’ / Dvyer’', 'Dicionário (M) / Porta (F)'],
        ],
      },
    ],
    examples: [
      { ru: 'Это мой новый стол.', translit: 'Éta moy nóvy stol.', pt: 'Esta é a minha nova mesa.', note: 'Стол termina em consoante = masc.' },
      { ru: 'Это твоя интересная книга.', translit: 'Éta tvayá interésnaya kníga.', pt: 'Este é o seu livro interessante.', note: 'Книга termina em -a = fem.' },
      { ru: 'Это наше большое окно.', translit: 'Éta náshe bal’shóye aknó.', pt: 'Esta é a nossa grande janela.', note: 'Окно termina em -o = neutro.' },
    ],
  },
  {
    id: 'casos-overview',
    title: 'Os 6 Casos Gramaticais Russos (Падежи)',
    subtitle: 'A bússola que conecta as palavras e determina suas terminações',
    category: 'casos',
    explanation: 'Os casos são a espinha dorsal do russo. Em vez de depender apenas da ordem das palavras ou de preposições para indicar se alguém é sujeito, objeto direto ou dono de algo, o russo muda a terminação das palavras para mostrar a função exata de cada uma na frase.',
    keyRules: [
      '1. Nominativo (Именительный): O sujeito quem pratica a ação (Quem? O quê? / Кто? Что?). Forma do dicionário.',
      '2. Acusativo (Винительный): O objeto direto que sofre a ação (Vejo quem? O quê? / Кого? Что?). Ex: Я читаю книгу (kno-gu).',
      '3. Genitivo (Родительный): Posse ("de quem?"), ausência com "нет" e após números 2, 3, 4. Ex: Дом брата (A casa do irmão).',
      '4. Dativo (Дательный): Objeto indireto ("para quem? / a quem?"). Ex: Я звоню маме (Ligo para a mamãe).',
      '5. Instrumental (Творительный): Instrumento ou companhia ("com o quê? / com quem?"). Ex: Чай с сахаром (Chá com açúcar).',
      '6. Preposicional (Предложный): Localização com preposições В/НА/О ("onde? / sobre o quê?"). Ex: В Москве (Em Moscou).',
    ],
    tables: [
      {
        caption: 'Guia Rápido dos 6 Casos',
        headers: ['Caso', 'Pergunta-chave', 'Função Principal', 'Exemplo com "Moscou" (Москва)'],
        rows: [
          ['1. Nominativo', 'Кто? Что? (Quem? O quê?)', 'Sujeito da frase', 'Москва́ краси́вая (Moscou é bela)'],
          ['2. Acusativo', 'Кого? Что? / Куда? (Para onde?)', 'Objeto direto / Destino', 'Я е́ду в Москву́ (Vou a Moscou)'],
          ['3. Genitivo', 'Кого? Чего? / Откуда? (De onde?)', 'Posse / Ausência / Origem', 'Я из Москвы́ (Sou de Moscou)'],
          ['4. Dativo', 'Кому? Чему? (A quem? Pra quem?)', 'Destinatário da ação', 'Приве́т Москве́! (Saudações a Moscou!)'],
          ['5. Instrumental', 'Кем? Чем? (Com quem? Por meio de quê?)', 'Instrumento / Companhia', 'Ря́дом с Москво́й (Perto de Moscou)'],
          ['6. Preposicional', 'О ком? О чём? / Где? (Onde?)', 'Lugar estático / Assunto', 'Я живу́ в Москве́ (Moro em Moscou)'],
        ],
      },
    ],
    examples: [
      { ru: 'Анна видит друга.', translit: 'Ánna vídit drúga.', pt: 'Ana (Nom.) vê o amigo (Acus.).' },
      { ru: 'У меня нет времени.', translit: 'U menyá nyet vryémeni.', pt: 'Eu não tenho tempo (Genitivo de ausência).' },
      { ru: 'Мы говорим о России.', translit: 'My gavarím a Rassíi.', pt: 'Nós falamos sobre a Rússia (Preposicional).' },
    ],
  },
  {
    id: 'conjugacao',
    title: 'Conjugação Verbal no Presente (Спряжение глаголов)',
    subtitle: '1ª e 2ª conjugações com padrões infalíveis',
    category: 'verbos',
    explanation: 'No presente, os verbos russos são divididos em duas grandes famílias de conjugação: a 1ª Conjugação (geralmente verbos terminados em -ать, -ять, -еть) caracterizada pela vogal temática "Е/Ё", e a 2ª Conjugação (geralmente verbos em -ить) caracterizada pela vogal temática "И".',
    keyRules: [
      '1ª Conjugação (-ать): Terminações: -ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут.',
      '2ª Conjugação (-ить): Terminações: -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат.',
      'O pronome "Они" (Eles/Elas) usa "-ют/-ут" na 1ª conj. e "-ят/-ат" na 2ª conj.',
      'O russo não usa verbos auxiliares no tempo presente simples ("eu estou lendo" = "я читаю").',
    ],
    tables: [
      {
        caption: 'Comparativo: Читать (1ª) vs Говорить (2ª)',
        headers: ['Pronome', '1ª Conjugação: Чита́ть (Ler)', '2ª Conjugação: Говори́ть (Falar)'],
        rows: [
          ['Я (Eu)', 'Чита́ю', 'Говорю́'],
          ['Ты (Você)', 'Чита́ешь', 'Говори́шь'],
          ['Он/Она (Ele/Ela)', 'Чита́ет', 'Говори́т'],
          ['Мы (Nós)', 'Чита́ем', 'Говори́м'],
          ['Вы (Vocês/O senhor)', 'Чита́ете', 'Говори́те'],
          ['Они (Eles/Elas)', 'Чита́ют', 'Говоря́т'],
        ],
      },
    ],
    examples: [
      { ru: 'Что ты читаешь?', translit: 'Shto ty chitáyesh?', pt: 'O que você está lendo?' },
      { ru: 'Они говорят по-русски.', translit: 'Aní gavaryát pa-rússki.', pt: 'Eles falam russo.' },
    ],
  },
  {
    id: 'aspecto',
    title: 'Aspectos Verbais: Imperfectivo vs Perfectivo (Виды глаголов)',
    subtitle: 'Processo contínuo vs resultado concluído',
    category: 'aspecto',
    explanation: 'Uma das características mais fascinantes do russo é que quase todo verbo existe em um PAR de aspectos:\n• Aspecto Imperfectivo (НСВ): Foca no processo, na repetição, no hábito ou na ação em andamento (ex: "estava lendo", "leio todos os dias").\n• Aspecto Perfectivo (СВ): Foca no resultado concluído, na ação pontual ou no sucesso definitivo (ex: "li até o final e terminei").',
    keyRules: [
      'Verbos no aspecto perfectivo NÃO possuem tempo presente! A conjugação deles no presente expressa futuro imediato/concluído.',
      'Imperfectivo = Processo ou hábito diário (Каждый день я читаю книгу).',
      'Perfectivo = Resultado final concluído (Я прочитал книгу за два часа).',
      'Geralmente o perfectivo é formado adicionando um prefixo ao imperfectivo (читать → прочитать, делать → сделать).',
    ],
    tables: [
      {
        caption: 'Pares de Aspectos mais Comuns',
        headers: ['Significado', 'Imperfectivo (Processo)', 'Perfectivo (Resultado)'],
        rows: [
          ['Fazer', 'Делать (Délat’)', 'Сделать (Sdélat’)'],
          ['Ler', 'Читать (Chitát’)', 'Прочитать (Prachitát’)'],
          ['Escrever', 'Писать (Pisát’)', 'Написать (Napisát’)'],
          ['Comprar', 'Покупать (Pakupát’)', 'Купить (Kupít’)'],
          ['Tomar / Beber', 'Пить (Pit’)', 'Выпить (Výpit’)'],
        ],
      },
    ],
    examples: [
      { ru: 'Я долго делал домашнее задание.', translit: 'Ya dólga délal damáshneye zadániye.', pt: 'Fiquei muito tempo fazendo a tarefa (processo durativo = imperfectivo).' },
      { ru: 'Я наконец сделал задание!', translit: 'Ya nakanéts sdélal zadániye!', pt: 'Finalmente terminei a tarefa! (resultado atingido = perfectivo).' },
    ],
  },
  {
    id: 'movimento',
    title: 'Verbos de Movimento (Глаголы движения)',
    subtitle: 'Deslocamento a pé vs em veículo e direção única vs multidirecional',
    category: 'movimento',
    explanation: 'Ao contrário do português onde dizemos simplesmente "eu vou ao shopping", o russo exige responder mentalmente a duas perguntas fundamentais:\n1. O movimento é feito A PÉ ou EM VEÍCULO (carro, ônibus, metrô, avião)?\n2. O movimento é UNIDIRECIONAL (em linha reta para um destino agora) ou MULTIDIRECIONAL (ida e volta, hábito regular, caminhar sem rumo)?',
    keyRules: [
      'A pé e em direção única agora: ИДТИ (Я иду в школу = Estou indo a pé para a escola agora).',
      'A pé e com retorno / hábito: ХОДИТЬ (Я хожу в школу каждый день = Eu frequento a escola todo dia).',
      'Em veículo e em direção única agora: ЕХАТЬ (Я еду на поезде = Estou indo de trem agora).',
      'Em veículo e com retorno / hábito: ЕЗДИТЬ (Я езжу на работу на машине = Vou ao trabalho de carro habitualmente).',
    ],
    tables: [
      {
        caption: 'Matriz dos 4 Verbos Básicos de Movimento',
        headers: ['Meio de Transporte', 'Unidirecional (Agora / Direção fixa)', 'Multidirecional (Hábito / Ida e volta)'],
        rows: [
          ['A Pé', 'Идти (Ittí)', 'Ходить (Khadít’)'],
          ['Em Veículo', 'Ехать (Yékhat’)', 'Ездить (Yézdit’)'],
        ],
      },
    ],
    examples: [
      { ru: 'Куда ты идёшь? — Я иду домой.', translit: 'Kudá ty idyósh? — Ya idú damóy.', pt: 'Para onde você está indo (a pé)? — Estou indo para casa.' },
      { ru: 'Летом мы едем на море.', translit: 'Lyétam my yédyem na móre.', pt: 'No verão nós vamos à praia (de carro/trem/avião).' },
    ],
  },
];
