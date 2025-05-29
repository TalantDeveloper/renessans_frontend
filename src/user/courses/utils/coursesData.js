import ibrat from '../assets/ibrat.jpg';
import mohir from '../assets/mohir.jpg';
import khanAcademy from '../assets/khanAcademy.png';
import dreamSat from '../assets/dreamSAT.jpg';
import maktabUz from '../assets/maktabUz.png';
import freshman from '../assets/freshman.jpg';
import edx from '../assets/edx.png';
import udemy from '../assets/udemy.png';
import skillShare from '../assets/skillShare.webp';

// courses
import { ibratCoursesParamsData } from '../../coursesParams/utils/ibratCoursesParamsData';
import { mohirdevCoursesParamsData } from '../../coursesParams/utils/mohirdevCoursesParamsData';
import { khanAcademyCourseParamsData } from '../../coursesParams/utils/khanAcademyCourseParamsData';
import { maktabUzCoursesParamsData } from '../../coursesParams/utils/maktabUzCoursesParamsData';
import { courseraCourseParamsData } from '../../coursesParams/utils/courseraCourseParamsData';

export const coursesData = [
  {
    id: 1,
    img: ibrat,
    title: 'Tillar',
    source: 'Ibrat Farzandlari',
    lang: "O'zbek",
    courses: ibratCoursesParamsData,
    color: 'rgb(238, 140, 52)',
  },
  {
    id: 2,
    img: mohir,
    title: 'Dasturlash',
    source: 'Mohirdev',
    lang: "O'zbek",
    courses: mohirdevCoursesParamsData,
    color: 'rgb(89, 154, 244)',
  },
  {
    id: 3,
    img: khanAcademy,
    title: 'Matematika',
    source: 'KhanAcademy',
    lang: "O'zbek",
    courses: khanAcademyCourseParamsData,
    color: 'rgb(88, 188, 151)',
  },
  {
    id: 4,
    img: dreamSat,
    title: 'Kiber Xavsizlik',
    source: 'Coursera',
    lang: 'English',
    courses: courseraCourseParamsData,
    color: 'rgb(20, 25, 36)',
  },
  {
    id: 5,
    img: maktabUz,
    title: 'Science',
    source: 'Maktab.uz',
    lang: "O'zbek",
    courses: maktabUzCoursesParamsData,
    color: 'rgb(238, 126, 209)',
  },
  {
    id: 6,
    img: freshman,
    title: 'Chet Elga Hujjat topshirish',
    source: 'Freshman Academy',
    lang: "O'zbek",
    courses: [],
    color: 'rgb(22,57,132)',
  },
  {
    id: 7,
    img: edx,
    title: 'Rocket Science',
    source: 'Edx',
    lang: 'Ingliz',
    courses: [],
    color: 'black',
  },
  {
    id: 8,
    img: udemy,
    title: 'Digital Marketing',
    source: 'Udemy',
    lang: 'Ingliz',
    courses: [],
    color: 'purple',
  },
  {
    id: 9,
    img: skillShare,
    title: "Kerakli Ko'nikmalar",
    source: 'SkillsShare',
    lang: 'Ingliz',
    courses: [],
    color: 'rgb(0, 255, 132)',
  },
];
