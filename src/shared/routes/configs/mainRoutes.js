import About from "../../../user/about/About";
import {Contact} from "../../../user/contact";
import CoursesPage from "../../../user/courses";
import CoursesParams from "../../../user/coursesParams/CoursesParams";
// import ExamResults from "../../../user/examResults/ExamResults";
import {Home} from "../../../user/home";
import {Home2} from "../../../user/home/index2";
// import Table from "../../../user/table/ClassTable";
import LibraryPage from "../../../user/library/LibraryPage";
import LibraryPage2 from "../../../user/home/library/LibraryPage";
import {NewsPage} from "../../../user/news";
import {OneCourseRoadmap} from "../../../user/oneCourseRoadmap/OneCourseRoadmap";
// import SchoolParams from "../../../user/schoolParams/SchoolsParams";
// import AnnounceParams from "../../../user/announceParams/AnnounceParams";
import Error404Page from "../../pages/Error404Page";
import ClassTable from "../../../user/table/ClassTable";
import Counsil from "../../../user/counsil/Counsil";
import Management from "../../../user/management/Management";
import Tuzilma from "../../../user/tuzilma/Tuzilma";
import International from "../../../user/international/International";
import InternationalParent from "../../../user/international/InternationalParent";
import Faculty from "../../../user/faculty/Faculty";
// import Statistics from "../../../user/statistics/Statistics";
import {Statistic} from "../../../user/home/statistic/Statistic";
import FakultetCourse from "../../../user/fakultet/FakultetCourse";
import Department from "../../../user/departments/Departments";
import DepartmentDetails from "../../../user/departments/DepartmentDetail";
import AboutUni from "../../../user/AboutUni/AboutUni";
import Timeline from "../../../user/home/avloniy/Avloniy";
import Syllabus from "../../../user/syllabus/Syllabus";
import { NewsPage2 } from "../../../user/home/news-v2/News";
import ChampionsBoard from "../../../user/champions/Champions";
import ExcellentBoard from "../../../user/preference/Preference";
import UniversityUnion from "../../../user/union/UniversityUnion";
import Events from "../../../user/conference/Events";
import Laboratory from "../../../user/laboratory/Laboratory";
import Scholarship from "../../../user/scholarship/Scholarship";
import Journal from "../../../user/journal/Journal";
import EventsAnnounce from "../../../user/home/events/Events";
import Events2 from "../../../user/home/events/Events2";
import DropdownDetails from "../../../user/home/dropdowns/DropdownDetails";
import FakultetKafedra from "../../../user/home/fakultetKafedra/FakultetKafedra";
import FakultetKafedraSlug from "../../../user/home/fakultetKafedraSlug/FakultetKafedraSlug";
import Etirof from "../../../user/etirof/Etirof";
import Kafedra from "../../../user/home/kafedralar/Kafedra";
import KafedraSlug from "../../../user/home/kafedralar/kafedraSlug";
import DirectionDetails from "../../../user/home/directions/directionDetails";
import Direction from "../../../user/home/directions/Directions";
import News from "../../../user/home/new/News";
import NewsCategories from "../../../user/home/new/newsCategories";
import NewsDetails from "../../../user/home/new/Batafsil";
import Partners from "../../../user/home/partners/Partners";
import CategoryActivities from "../../../user/home/categoryActivities/CategoryActivities";
import Documents from "../../../user/home/documents/Documents";
import Activities from "../../../user/home/activities/Activities";
import ActivityDetail from "../../../user/home/activities/ActivityDetails";
import CertificateVerification from "../../../user/home/schools/Schools";
import BaseActivities from "../../../user/home/activities/baseActivities";

export const mainRoutes = [
    // {
    //     text: "Universitet",
    //     path: "/version-2",
    //     exact: true,
    //     visibleInNavbar: true,
    //     element: <Home/>,
    // },                                 // Ishlatilmayabdi
    {
        text: "Universitet",
        path: "/",
        exact: true,
        visibleInNavbar: true,
        element: <Home2/>,
    },                              // Ishlatilyabdi Asosiy sahifa
    // {
    //   text: "News2",
    //   path: "/version-2/news",
    //   exact: true,
    //   visibleInNavbar: false,
    //   element: <NewsPage />,
    // },                              // Ishlatilmayabdi
    // {
    //   text: "Dars jadval",
    //   path: "/class-table",
    //   exact: true,
    //   visibleInNavbar: true,
    //   element: <ClassTable />,
    // },                           // Ishlatilmayabdi lekin yaxshi narsaga o'xshaydi
    // {
    //     text: "Ta'lim",
    //     path: "/courses",
    //     exact: true,
    //     visibleInNavbar: true,
    //     element: <CoursesPage/>,
    // },                              // Ishlatilmayabdi lekin yaxshi narsa
    // {
    //     text: "courseCategory",
    //     path: "course/:courseCategoryId",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <CoursesParams/>,
    // },                                  // Ishlatilmayabdi lekin yaxshi narsa tepadagi coursesning davomi
    // {
    //     text: "Courses",
    //     path: "course/:courseCategory/:courseName",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <OneCourseRoadmap/>,
    // },                                      // Ishlatilmayabdi lekin yaxshi narsa tepadagi coursesning davomi
    {
        text: "Announce",
        path: "/announce",
        exact: true,
        visibleInNavbar: false,
        element: <EventsAnnounce/>,
    },                                      // Ishlatilyabdi  E'lonlar
    // {
    //     text: "Announce",
    //     path: "/announce2",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Events2/>,
    // },                                      // Ishlatilmayabdi  E'lonlar
    
    {
        text: `Bog'lanish`,
        path: "/contact",
        exact: true,
        visibleInNavbar: true,
        element: <Contact/>,
    },                                         // Ishlatilyabdi Contact bog'lanish

    // {
    //   text: "Ilmiy manbalar",
    //   path: "/articles",
    //   exact: true,
    //   visibleInNavbar: true,
    //   element: <LibraryPage2 />,
    // },                                          // Ishlatilmayabdi  Ilmiy jurnallar agar    Abror aka so'rasa ishlatamiz  Ilmiy maqolalar uchun
    // {
    //     text: "Ilmiy maqolalar",
    //     path: "/library",
    //     exact: true,
    //     visibleInNavbar: true,
    //     element: <LibraryPage/>,
    // },                                              // https://lib.renessans-edu.uz/uz/library/1  o'rniga shu ishlatilyabdi  top headerda
    {
        text: "Universitet haqida",
        path: "/about",
        exact: true,
        visibleInNavbar: true,
        element: <About/>,
    },                                              // Ishlatilyabdi Universitet haqida
    // {
    //   text: "CHSB Natijalari",
    //   path: "/chsb-results",
    //   exact: true,
    //   visibleInNavbar: false,
    //   element: <ExamResults />,
    // },                                              // Ishlatilmayabdi nimaligini bilmadim ham
    // {
    //     text: "Schools",
    //     path: "/license/:schoolId",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <SchoolParams/>,
    // },                                                 // Ishlatilmayabdi Nima va nima uchun kerak bilamdim
    // {
    //     text: "Announcements",
    //     path: "/announce/:announcementId",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <AnnounceParams/>,
    // },                                                   // Ishlatilmayabdi  E'lon ichiga kirish page ekan  Yaxshi narsa ekan
    // {
    //     text: "Counsil",
    //     path: "/science-counsil",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Counsil/>,
    // },                                                      // Ishlatilmayabdi o'rniga Faoliyatdan ma'lumot kiritilyabdi
    {
        text: "Tuzilma",
        path: "/structure",
        exact: true,
        visibleInNavbar: false,
        element: <Tuzilma/>,
    },                                                         // Ishlatilyabdi Tuzilma
    // {
    //     text: "Hamkorliklar",
    //     path: "/cooperations/:short_name",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <International/>,
    // },                                                          // Ishlatilyabdi Xalqaro va Mahalliy hamkorliklar
    // {
    //     text: "Hamkorlik",
    //     path: "/cooperation/:short_name",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <InternationalParent/>,
    // },                                                          // Ishlatilyabdi Xalqaro va Mahalliy hamkorliklar
    {
        text: "Faoliyatlar",
        path: "/activity/:cat_name/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <Activities/>,
    },                                                              // Ishlatilyabdi Faoliyat kategoriya faoliyat turi bo'yicha
    {
        text: "Faoliyatlar",
        path: "/baseactivities/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <BaseActivities/>,
    },                                                              // Ishlatilyabdi Faoliyat kategoriya
    {
        text: "Faoliyatlar",
        path: "/activity/:id",
        exact: true,
        visibleInNavbar: false,
        element: <ActivityDetail/>,
    },                                                              // Ishlatilyabdi Faoliyatlar har biri bo'yicha
    // {
    //     text: "Fakultetlar",
    //     path: "/faculty",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Faculty/>,
    // },                                                              // Ishlatilmayabdi Fakultetlar ::hover aylana
    
    {
        text: "Statistika",
        path: "/statistics",
        exact: true,
        visibleInNavbar: false,
        element: <Statistic/>,
    },                                                              // Ishlatilyabdi Statistika ko'rsatgichlari
    {
        text: "Litsenziya",
        path: "/litsenziya",
        exact: true,
        visibleInNavbar: false,
        element: <CertificateVerification/>,
    },                                                              // Ishlatilyabdi Litsenziya
    // {
    //     text: "Fakultet Kurslari",
    //     path: "/all-courses",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <FakultetCourse/>,
    // },                                                              // Ishlatilmayabdi
    // {
    //     text: "Universitet hayoti",
    //     path: "/about-uni",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <AboutUni/>,
    // },                                                              // Ishlatilmayabdi Talabalar hayoti yaxshi sahifa edi
    // {
    //     text: "Anonslar",
    //     path: "/anons",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Timeline/>,
    // },                                                              // Ishlatilmayabdi  Muhim sanalar  yaxshi edi
    // {
    //     text: "Bizning chempionlar",
    //     path: "/our-campions",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <ChampionsBoard/>,
    // },                                                              // Ishlatilmayabdi  Bizning chempionlar
    // {
    //     text: "Bizning a'lochilar",
    //     path: "/good-st",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <ExcellentBoard/>,
    // },                                                              // Ishlatilmayabdi Bizning a'lochilar
    {
        text: "University Union",
        path: "/university-union",
        exact: true,
        visibleInNavbar: false,
        element: <UniversityUnion/>,
    },                                                              // Ishlatilyabdi Universitet klublari
    // {
    //     text: "Laboratoriya",
    //     path: "/laboratory",
    //     exact: true,
    //     visibleInNavbar: true,
    //     element: <Laboratory/>,
    // },                                                             // Ishlatilmayabdi Laboratoriya o'rniga Faoliyatda Ilmiy faoliyatda O‘quv va labaratoriya bazalari
    // {
    //     text: "Syllabus",
    //     path: "/syllabus",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Syllabus/>,
    // },                                                              // Ishlatilmayabdi o'rniga Faoliyat o'quv faoliyat o'quv reja va syllabus
    // {
    //     text: "Konferensiya",
    //     path: "/conference",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <Events/>,
    // },                                                              // Ishlatilmayabdi Konferensiyalar
    {
        text: "Stipendiantlar",
        path: "/scholarship",
        exact: true,
        visibleInNavbar: false,
        element: <Scholarship/>,
    },                                                              // Ishlatilyabdi Bizning stipendiantlar
    {
        text: "Ilmiy jurnallar",
        path: "/journal",
        exact: true,
        visibleInNavbar: false,
        element: <Journal/>,
    },                                                              // Ishlatilyabdi journal
    {
        text: "Rahbariyat",
        path: "/management",
        exact: true,
        visibleInNavbar: false,
        element: <Management/>,
    },                                                              // Ishlatilyabdi Rektor va proRektorlar
    {
        text: "Xalqaro e'tirof",
        path: "/confession",
        exact: true,
        visibleInNavbar: false,
        element: <Etirof/>,
    },                                                              // Ishlatilyabdi Xalqaro ekspertlarning fikrlari
    {
        text: "Kafedra va Fakultetlar",
        path: "/faculties",
        exact: true,
        visibleInNavbar: false,
        element: <FakultetKafedra/>,
    },                                                              // Ishlatilyabdi Fakultetlar
    {
        text: "Partners",
        path: "/partners",
        exact: true,
        visibleInNavbar: false,
        element: <Partners/>,
    },                                                              // Ishlatilyabdi Hamkorlar
    {
        text: "Kafedra va Fakultetlar",
        path: "/faculties/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <FakultetKafedraSlug/>,
    },                                                              // Ishlatilyabdi Fakultetga short_name orqali murojat
    {
        text: "Kafedralar",
        path: "/departments",
        exact: true,
        visibleInNavbar: false,
        element: <Kafedra/>,
    },                                                              // Ishlatilmayabdi Kafedralar lekin hozircha kerak emas
    {
        text: "KafedraSlug",
        path: "/departments/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <KafedraSlug/>,
    },                                                              // Ishlatilyabdi Kafedraga murojaat short_name orqali
    {
        text: "Yo'nalishlar",
        path: "/directions",
        exact: true,
        visibleInNavbar: false,
        element: <Direction />,
    },                                                              // Ishlatilyabdi Yo'nalishlar barchasi Universitet ichida
    {
        text: "Yo'nalish",
        path: "/directions/:short_name/",
        exact: true,
        visibleInNavbar: false,
        element: <DirectionDetails />,
    },                                                              // Ishlatilyabdi Yo'nalishga short_name orqali murojat
    {
        text: "Category Activities",
        path: "/activities/:dep_name/:short_name/",
        exact: true,
        visibleInNavbar: false,
        element: <CategoryActivities />,
    },                                                              // Ishlatilyabdi Kafedraga tegishli yo'nalish
    // {
    //     text: "Yangiliklar",
    //     path: "/news_1",
    //     exact: true,
    //     visibleInNavbar: false,
    //     element: <News />,
    // },
    {
        text: "Yangiliklar",
        path: "/news",
        exact: true,
        visibleInNavbar: true,
        element: <News/>,
    },                                                              // Ishlatilyabdi Yangiliklar asosiy
    {
        text: "Batafsil",
        path: "/news/:new_id",
        exact: true,
        visibleInNavbar: false,
        element: <NewsDetails />,
    },                                                              // Ishlatilyabdi Yangilik
    {
        text: "Yangiliklar Kategoriya",
        path: "/newscategories/:id/",
        exact: true,
        visibleInNavbar: true,
        element: <NewsCategories/>,
    },                                                              // Ishlatilyabdi Yangiliklar kategoriya bo'yicha
    
    {
        text: "Bo'lim va markazlar",
        path: "/centers",
        exact: true,
        visibleInNavbar: false,
        element: <Department/>,
    },                                                              // Ishlatilyabdi Bo'limlar va centerlar
    {
        text: "Normativ-huquqiy hujjatlar",
        path: "/documents/:short_name/",
        exact: true,
        visibleInNavbar: false,
        element: <Documents/>,
    },                                                              // Ishlatilyabdi Hujjatlar jamlanmasi
    {
        text: "Bo'lim va markazlar",
        path: "/centers/:short_id",
        exact: true,
        visibleInNavbar: false,
        element: <DepartmentDetails/>,
    },                                                              // Ishlatilyabdi Bo'limga murojaat
    {
        text: "pagelar",
        path: "/dropdown/:slug",
        exact: true,
        visibleInNavbar: false,
        element: <DropdownDetails/>,
    },                                                              // Ishlatilmayabdi Dropdown page
    {
        text: "404",
        path: "*",
        visibleInNavbar: false,
        exact: true,
        element: <Error404Page/>,
    },
];
