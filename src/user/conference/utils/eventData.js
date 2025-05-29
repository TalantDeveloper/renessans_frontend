const eventData = [
  {
    id: 1,
    main: true,
    uz: {
      title: "Ilmiy Tadqiqotlar Konferensiyasi",
      date: "12.12.2024",
      description:
        "Ilmiy Tadqiqotlar Konferensiyasi talabalarga ilmiy izlanishlar bo'yicha o'zlarining ishlarini taqdim etish imkoniyatini yaratadi. Har bir ishtirokchi o'zining ilmiy mavzusi bo'yicha taqdimot o'tkazadi, keyin esa izlanishlari haqidagi savollarga javob beradi.",
      requirements: "Ilmiy ish tayyorlash, 3 kurs va undan yuqori",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
    },
    ru: {
      title: "Научная конференция",
      date: "12.12.2024",
      description:
        "Научная конференция предоставляет студентам возможность представить свои научные исследования. Каждый участник будет делать презентацию по своей теме, после чего ответит на вопросы о проведенном исследовании.",
      requirements: "Научная работа, 3 курс и выше",
    },
    en: {
      title: "Scientific Research Conference",
      date: "12.12.2024",
      description: `The Scientific Research Conference provides students with the opportunity to present their scientific research. Each participant will make a presentation on their topic and then answer questions about their research.`,
      requirements: "Research paper, 3rd year and above",
    },
  },

  {
    id: 2,
    main: true,
    uz: {
      title: "Innovatsiyalar va Texnologiyalar Konferensiyasi",
      date: "20.12.2024",
      description:
        "Innovatsiyalar va Texnologiyalar Konferensiyasi yangi texnologiyalar va innovatsiyalar sohasidagi so'nggi yangiliklarni muhokama qilish uchun tashkil etiladi. Ishtirokchilar texnologik yangiliklarni taqdim etib, ularning amaliy dasturlarini muhokama qilishadi.",
      requirements: "Texnologiyalar va innovatsiyalar sohasidagi bilimlar",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
    },
    ru: {
      title: "Конференция по инновациям и технологиям",
      date: "20.12.2024",
      description:
        "Конференция по инновациям и технологиям организована для обсуждения последних достижений в области технологий и инноваций. Участники представят новые технологические решения и обсудят их практическое применение.",
      requirements: "Знания в области технологий и инноваций",
    },
    en: {
      title: "Innovation and Technology Conference",
      date: "20.12.2024",
      description: `The Innovation and Technology Conference is organized to discuss the latest advancements in the field of technology and innovation. Participants will present new technological solutions and discuss their practical applications.`,
      requirements: "Knowledge in the field of technology and innovation",
    },
  },
  {
    id: 3,
    main: true,
    uz: {
      title: "Yoshlar Innovatsiyasi Forumi",
      date: "25.12.2024",
      description:
        "Yoshlar Innovatsiyasi Forumi yoshlarni yangi fikr va g'oyalar bilan tanishtirish va ularni innovatsion loyiha yaratishga undash maqsadida o'tkaziladi. Forumda ishtirokchilar o'z g'oyalarini taqdim etishadi va amaliy seminarlar o'tkaziladi.",
      requirements: "Innovatsion loyiha yaratish",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
    },
    ru: {
      title: "Форум молодежных инноваций",
      date: "25.12.2024",
      description:
        "Форум молодежных инноваций организован для того, чтобы познакомить молодежь с новыми идеями и проектами. Участники будут презентовать свои проекты и участвовать в практических семинарах.",
      requirements: "Создание инновационных проектов",
    },
    en: {
      title: "Youth Innovation Forum",
      date: "25.12.2024",
      description: `The Youth Innovation Forum is organized to introduce young people to new ideas and inspire them to create innovative projects. Participants will present their projects and engage in practical workshops.`,
      requirements: "Creation of innovative projects",
    },
  },
  {
    id: 4,
    main: false,
    uz: {
      title: "Madaniyat va San'at Konferensiyasi",
      date: "30.12.2024",
      description:
        "Madaniyat va San'at Konferensiyasi san'at va madaniyat sohasidagi so'nggi yutuqlar va tendentsiyalarni muhokama qilishga qaratilgan. Konferensiyada san'atkorlar o'z asarlarini taqdim etishadi va san'atning ijtimoiy ahamiyati haqida ma'ruzalar bo'ladi.",
      requirements: "San'at va madaniyat bo'yicha taqdimot",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
    },
    ru: {
      title: "Конференция по культуре и искусству",
      date: "30.12.2024",
      description:
        "Конференция по культуре и искусству направлена на обсуждение последних достижений в области искусства и культуры. Художники будут представлять свои работы, а также будут проведены лекции о социальной значимости искусства.",
      requirements: "Презентация в области искусства и культуры",
    },
    en: {
      title: "Culture and Arts Conference",
      date: "30.12.2024",
      description: `The Culture and Arts Conference focuses on discussing the latest achievements and trends in the fields of culture and art. Artists will present their works, and lectures will be held on the social importance of art.`,
      requirements: "Presentation in arts and culture",
    },
  },
  {
    id: 5,
    main: true,
    uz: {
      title: "Ilmiy Innovatsiyalar va Tadqiqotlar Forumi",
      date: "05.01.2025",
      description:
        "Ilmiy Innovatsiyalar va Tadqiqotlar Forumi o'ziga xos ilmiy tadqiqotlarni, yangiliklarni va innovatsiyalarni taqdim etishga qaratilgan. Forumbda ilmiy ishlarni qo'llab-quvvatlash, amaliy tadqiqotlar va yangi texnologiyalarni muhokama qilish maqsadida bir qator taqdimotlar bo'lib o'tadi.",
      requirements: "Ilmiy tadqiqotlar",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
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
      title: "Global Hamkorlik va Yangi Tashabbuslar Konferensiyasi",
      date: "15.01.2025",
      description:
        "Global Hamkorlik va Yangi Tashabbuslar Konferensiyasi dunyo bo'ylab turli mamlakatlar o'rtasidagi hamkorlikni rivojlantirish va yangi tashabbuslarni yaratishga qaratilgan. Konferensiyada xalqaro ekspertlar va yetakchi tashkilotlar o'z fikrlarini taqdim etadilar.",
      requirements: "Xalqaro hamkorlik sohasidagi bilimlar",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
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
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
      main: false,
    },
  },
  {
    main: false,
    id: 7,
    uz: {
      title: "Ijtimoiy Tadbirkorlik va Barqaror Rivojlanish Forum",
      date: "20.01.2025",
      description:
        "Ijtimoiy Tadbirkorlik va Barqaror Rivojlanish Forumida ijtimoiy muammolarni hal qilish uchun yangi tadbirkorlik yechimlari muhokama qilinadi. Forumda ishtirokchilar o'z ijtimoiy tashabbuslarini taqdim etishadi va barqaror rivojlanishga doir amaliy tavsiyalarni o'rtoqlashadilar.",
      requirements: "Ijtimoiy tadbirkorlik va rivojlanish",
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
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
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
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
      goal: "Ilmiy maqola yozishdagi to'siqlarni yo'q qilish",
      place: "Abdulla Avloniy ko'chasi, 3-uy",
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
