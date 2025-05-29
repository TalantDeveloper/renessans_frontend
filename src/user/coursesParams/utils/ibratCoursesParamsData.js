import { ChineseCourseRoadmapData } from "../../oneCourseRoadmap/utils/ChineseCourseRoadmapData";
import { EnglishCourseRoadmapData } from "../../oneCourseRoadmap/utils/EnglishCourseRoadmapData";
import { KoreanCourseRoadmapData } from "../../oneCourseRoadmap/utils/KoreanCourseRoadmapData";
import { SpanishCourseRoadmapData } from "../../oneCourseRoadmap/utils/SpanishCourseRoadmapData";

export const ibratCoursesParamsData = [
  {
    id: 1,
    child: EnglishCourseRoadmapData,
    level:
    "Beginner, Elementary, Pre-Intermediate, Intermediate, Upper- Intermediate, IELTS",
   
      courseName: "Ingliz tili",
      descr: `Online kurslarimiz yordamida dunyoga yetakchilik qilayotgan ingliz tilida erkin so’zlasha olish darajasiga erishasiz va kursimiz so’ngida o’quvchilarimiz IELTS dan yuqori natijalarga erishishingiz kafolatlanadi`,
      duration: "100soat",
   
  },
  {
    id: 2,
    level: "Beginner, Elementary, Pre- Intermediate, Intermediate ",
    child: SpanishCourseRoadmapData,

      courseName: "Ispan tili",
      descr: `Ispan tilini o’rganish 21 ta davlatda erkin so’zlashish eshiklarini ochadi. Bizning online kursimizda malakali ustozlardan ta’lim oling va qisqa vaqt ichida erkin so’zlashishga erishing!!!`,
      duration: "200soat",
   
  },
  {
    id: 3,
    level: "Beginner, Elementary, Pre- Intermediate, Intermediate CEFR",
    child: KoreanCourseRoadmapData,
    
      courseName: "Koreys tili",
      descr: `Online kurslarimiz yordamida siz koreys tilini qiziqrli usulda o’rganasiz va Koreyaning top universitetlariga kirish uchun CEFR sertifikatiga biz bilan tayyorlanishingiz mumkin`,
      duration: "53soat",
   
  },
  {
    id: 4,
    level: "Beginner, Elementary, ",
    child: ChineseCourseRoadmapData,
   
      courseName: "Xitoy tili",
      descr: `Bining kurslarimizda size eng pas natija bilan ham xitoy ieroglifini va boshlang’ich speaking ko’nikmalariga ega bo’lasiz!!!!`,
      duration: "312soat",
   
  },
];
