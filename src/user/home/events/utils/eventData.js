const eventData = [
  {
    id: 1,
    main: true,
    uz: {
      title: "Zakovat 2024",
      date: "16.11.2024",
      description:
        "Zakovat intellektual tanlovi 2-3 kurs talabalarini qamrab oladi va ularni IQ darajasini tekshirish maqsadida 30 ta savol tuziladi. Ushbu tanlov 3 turdan iborat va har bir turda 10 tadan savol va har bir savolga 1 daqiqadan vaqt beriladi ",
      requirements: "2-3 kurs, Ingliz tilini bilishi",
    },
    ru: {
      title: "Заковат 2024",
      date: "16.11.2023",
      description:
        "Интеллектуальный конкурс «Заковат» охватывает 9-11 классы и состоит из 30 вопросов для проверки их IQ. Этот экзамен состоит из 3 раундов, в каждом раунде будет 10 вопросов, на каждый вопрос будет отведено 1 минута.",

      requirements: "9-11 классы, знание английского языка",
    },
    en: {
      title: "Zakovat 2024",
      date: "16.11.2023",
      description: `The Zakovat intellectual contest covers grades 9-11 and consists of 30 questions to test their IQ. This exam consists of 3 rounds and each round will have 10 questions and each question will be given 1 minute`,
      requirements: "2-3 course and english language skills",
    },
  },

  {
    id: 2,
    main: true,
    uz: {
      title: "Futbol Chempionati",
      date: "06.12.2024",
      description: `Ushbu futbol chempionati barcha o'g'il bolalari o'rtasida bo'lib o'tadi va har bir jamoa o'zlarining chaaqqonliklarini tekshiradilar va bu musobaqa sog'lom turmush tarzi tomon qadam qo'yishlariga imkoniyat yaratib beradi`,
      requirements: "Butsada o'ynash",
    },
    ru: {
      title: "Чемпионат по футболу",
      date: "06.12.2024",
      description: `Этот чемпионат по футболу предназначен для мальчиков 8-11 классов, и каждая команда проверит свою ловкость, и это соревнование даст им возможность сделать шаги к здоровому образу жизни.`,
      requirements: "знание английского языка",
    },
    en: {
      title: "Football Championship",
      date: "06.12.2024",
      description: `This football championship is for boys in grades 8-11 and each team will test their agility and this competition will give them an opportunity to take steps towards a healthy lifestyle.`,
      requirements: "With boots",
    },
  },
  {
    id: 3,
    main: true,
    uz: {
      title: "Balli qizlar",
      date: "26.10.2024",
      description: `Balli qizlar ko'rik tanlovi barcha talaba qiz bolalarini qamrab oladi va ushbu tanlovda ular tezkorlik, donolik, uy ishlari va san'at sohalari bo'yicha tekshirib, o'zlariga mos ravishda baholanadilar va ularga esdalik so'vg'alari taqdim etiladi`,
      requirements: "Qiz bola bo'lish",
    },
    ru: {
      title: "Бальные девушки",
      date: "26.10.2024",
      description: `В конкурсе «Балли-девочки» могут принять участие девочки 9–11 классов. В этом соревновании их проверяют и оценивают по скорости, интеллекту, ведению домашнего хозяйства и искусству, а также награждают памятными подарками.`,
      requirements: "Vsem ",
    },
    en: {
      title: "Well done girls",
      date: "26.10.2024",
      description: `The Balli Girls Pageant is open to girls from grades and in this competition they are tested and judged on their speed, intelligence, housekeeping and arts and are awarded with mementos.`,
      requirements: "All girls",
    },
  },
  {
    id: 4,
    main: false,
    uz: {
      title: "Yosh kitobxon",
      date: "19.11.2024",
      description: `Yosh kitobxon ko'rik tanlovi 4-kurs talabalari o'rtasida bo'lib o'tadi va ular o'zlari o'qigan kitoblar bo'yicha savol javob qilinadilar, tanlovning 1-bosqichida ular o'zlari o'qigan kitoblarini prezintatsiyasini qilib beradilar va 2-bosqichida hakamlar tomonidan berilgan savollarga javob beradilar`,
      requirements: `4-kurs, 20+ kitob o'qiganligi`,
    },
    ru: {
      title: "Юный читатель",
      date: "19.11.2024",
      description: `Конкурс юных читателей проводится между 11-классниками и им задаются вопросы о прочитанных книгах, на 1 этапе конкурса они делают презентацию прочитанных книг и на 2 этапе - отвечают на вопросы, заданные судьи на сцене`,
      requirements: `11 класс, прочитать +20 книг`,
    },
    en: {
      title: "A young reader",
      date: "19.11.2024",
      description: `The young reader competition is held between 11th graders and they are asked questions about the books they have read, in the 1st stage of the competition they make a presentation of the books they have read and in the 2nd stage - they answer the questions asked by the judges at the stage`,
      requirements: `4 course, read +20 books`,
    },
  },
  {
    id: 5,
    main: true,
    uz: {
      title: "Zakovat 2024",
      date: "16.11.2024",
      description:
        "Zakovat intellektual tanlovi 2-3 kurs talabalarini qamrab oladi va ularni IQ darajasini tekshirish maqsadida 30 ta savol tuziladi. Ushbu tanlov 3 turdan iborat va har bir turda 10 tadan savol va har bir savolga 1 daqiqadan vaqt beriladi ",
      requirements: "2-3 kurs, Ingliz tilini bilishi",
    },
    ru: {
      title: "Заковат 2024",
      date: "16.11.2023",
      description:
        "Интеллектуальный конкурс «Заковат» охватывает 9-11 классы и состоит из 30 вопросов для проверки их IQ. Этот экзамен состоит из 3 раундов, в каждом раунде будет 10 вопросов, на каждый вопрос будет отведено 1 минута.",

      requirements: "9-11 классы, знание английского языка",
    },
    en: {
      title: "Zakovat 2024",
      date: "16.11.2023",
      description: `The Zakovat intellectual contest covers grades 9-11 and consists of 30 questions to test their IQ. This exam consists of 3 rounds and each round will have 10 questions and each question will be given 1 minute`,
      requirements: "2-3 course and english language skills",
    },
  },
  {
    uz: {
      id: 6,
      title: "Yosh kitobxon",
      date: "19.11.2024",
      description: `Yosh kitobxon ko'rik tanlovi 4-kurs talabalri o'rtasida bo'lib o'tadi va ular o'zlari o'qigan kitoblar bo'yicha savol javob qilinadilar, tanlovning 1-bosqichida ular o'zlari o'qigan kitoblarini prezintatsiyasini qilib beradilar va 2-bosqichida hakamlar tomonidan berilgan savollarga javob beradilar`,
      requirements: `4-kurs, +20 kitob o'qigani`,
      main: false,
    },
    ru: {
      id: 6,
      title: "Юный читатель",
      date: "19.11.2024",
      description: `Конкурс юных читателей проводится между  и им задаются вопросы о прочитанных книгах, на 1 этапе конкурса они делают презентацию прочитанных книг и на 2 этапе - отвечают на вопросы, заданные судьи на сцене`,
      requirements: `прочитать +20 книг`,
      main: false,
    },
    en: {
      id: 6,
      title: "A young reader",
      date: "19.11.2024",
      description: `The young reader competition is held between 4th course and they are asked questions about the books they have read, in the 1st stage of the competition they make a presentation of the books they have read and in the 2nd stage - they answer the questions asked by the judges at the stage`,
      requirements: `4th course, read +20 books`,
      main: false,
    },
  },
  {
    main: false,
    id: 7,
    uz: {
      title: "Balli qizlar",
      date: "26.12.2024",
      description: `Balli qizlar ko'rik tanlovi barcha qiz bola talabalarni qamrab oladi va ushbu tanlovda ular tezkorlik, donolik, uy ishlari va san'at sohalari bo'yicha tekshirib, o'zlariga mos ravishda baholanadilar va ularga esdalik so'vg'alari taqdim etiladi`,
      requirements: "Qiz bola bo'lishi",
    },
    ru: {
      title: "Бальные девушки",
      date: "26.12.2024",
      description: `В конкурсе «Балли-девочки» могут принять участие девочки 9–11 классов. В этом соревновании их проверяют и оценивают по скорости, интеллекту, ведению домашнего хозяйства и искусству, а также награждают памятными подарками.`,
      requirements: "No ",
    },
    en: {
      title: "Well done girls",
      date: "26.12.2024",
      description: `The Balli Girls Pageant is open to girls from grades 9-11 and in this competition they are tested and judged on their speed, intelligence, housekeeping and arts and are awarded with mementos.`,
      requirements: "Must be girls",
    },
  },
  {
    id: 8,
    main: false,
    uz: {
      title: "Yosh kitobxon",
      date: "19.10.2024",
      description: `Yosh kitobxon ko'rik tanlovi 4-kurs talabalari o'rtasida bo'lib o'tadi va ular o'zlari o'qigan kitoblar bo'yicha savol javob qilinadilar, tanlovning 1-bosqichida ular o'zlari o'qigan kitoblarini prezintatsiyasini qilib beradilar va 2-bosqichida hakamlar tomonidan berilgan savollarga javob beradilar`,
      requirements: `4-kurs, 20+ kitob o'qiganligi`,
    },
    ru: {
      title: "Юный читатель",
      date: "19.10.2024",
      description: `Конкурс юных читателей проводится между 11-классниками и им задаются вопросы о прочитанных книгах, на 1 этапе конкурса они делают презентацию прочитанных книг и на 2 этапе - отвечают на вопросы, заданные судьи на сцене`,
      requirements: `11 класс, прочитать +20 книг`,
    },
    en: {
      title: "A young reader",
      date: "19.10.2024",
      description: `The young reader competition is held between 11th graders and they are asked questions about the books they have read, in the 1st stage of the competition they make a presentation of the books they have read and in the 2nd stage - they answer the questions asked by the judges at the stage`,
      requirements: `4 course, read +20 books`,
    },
  },
  {
    uz: {
      id: 10,
      title: "Yosh kitobxon",
      date: "19.10.2024",
      description: `Yosh kitobxon ko'rik tanlovi 4-kurs talabalri o'rtasida bo'lib o'tadi va ular o'zlari o'qigan kitoblar bo'yicha savol javob qilinadilar, tanlovning 1-bosqichida ular o'zlari o'qigan kitoblarini prezintatsiyasini qilib beradilar va 2-bosqichida hakamlar tomonidan berilgan savollarga javob beradilar`,
      requirements: `4-kurs, +20 kitob o'qigani`,
      main: false,
    },
    ru: {
      id: 10,
      title: "Юный читатель",
      date: "19.10.2024",
      description: `Конкурс юных читателей проводится между  и им задаются вопросы о прочитанных книгах, на 1 этапе конкурса они делают презентацию прочитанных книг и на 2 этапе - отвечают на вопросы, заданные судьи на сцене`,
      requirements: `прочитать +20 книг`,
      main: false,
    },
    en: {
      id: 10,
      title: "A young reader",
      date: "19.10.2024",
      description: `The young reader competition is held between 4th course and they are asked questions about the books they have read, in the 1st stage of the competition they make a presentation of the books they have read and in the 2nd stage - they answer the questions asked by the judges at the stage`,
      requirements: `4th course, read +20 books`,
      main: false,
    },
  },
];

export default eventData;
