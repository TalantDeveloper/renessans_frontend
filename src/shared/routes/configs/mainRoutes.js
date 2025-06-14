import About from "../../../user/about/About";
import {Contact} from "../../../user/contact";
import CoursesPage from "../../../user/courses";
import CoursesParams from "../../../user/coursesParams/CoursesParams";
// import ExamResults from "../../../user/examResults/ExamResults";
import {Home} from "../../../user/home";
import {Home2} from "../../../user/home/index2";
// import Table from "../../../user/table/ClassTable";
import LibraryPage from "../../../user/library/LibraryPage";
// import LibraryPage2 from "../../../user/home/library/LibraryPage";
import {NewsPage} from "../../../user/news";
import {OneCourseRoadmap} from "../../../user/oneCourseRoadmap/OneCourseRoadmap";
import SchoolParams from "../../../user/schoolParams/SchoolsParams";
import AnnounceParams from "../../../user/announceParams/AnnounceParams";
import Error404Page from "../../pages/Error404Page";
// import ClassTable from "../../../user/table/ClassTable";
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
// import { NewsPage2 } from "../../../user/home/news-v2/News";
import ChampionsBoard from "../../../user/champions/Champions";
import ExcellentBoard from "../../../user/preference/Preference";
import UniversityUnion from "../../../user/union/UniversityUnion";
import Events from "../../../user/conference/Events";
import Laboratory from "../../../user/laboratory/Laboratory";
import Scholarship from "../../../user/scholarship/Scholarship";
import Journal from "../../../user/journal/Journal";
import EventsAnnounce from "../../../user/home/events/Events";
import DropdownDetails from "../../../user/home/dropdowns/DropdownDetails";
import FakultetKafedra from "../../../user/home/fakultetKafedra/FakultetKafedra";
import FakultetKafedraSlug from "../../../user/home/fakultetKafedraSlug/FakultetKafedraSlug";
import Etirof from "../../../user/etirof/Etirof";
import Kafedra from "../../../user/home/kafedralar/Kafedra";
import KafedraSlug from "../../../user/home/kafedralar/kafedraSlug";

export const mainRoutes = [
    {
        text: "Universitet",
        path: "/version-2",
        exact: true,
        visibleInNavbar: true,
        element: <Home/>,
    },
    {
        text: "Universitet",
        path: "/",
        exact: true,
        visibleInNavbar: true,
        element: <Home2/>,
    },
    // {
    //   text: "News2",
    //   path: "/version-2/news",
    //   exact: true,
    //   visibleInNavbar: false,
    //   element: <NewsPage2 />,
    // },
    // {
    //   text: "Dars jadval",
    //   path: "/class-table",
    //   exact: true,
    //   visibleInNavbar: true,
    //   element: <ClassTable />,
    // },
    {
        text: "Ta'lim",
        path: "/courses",
        exact: true,
        visibleInNavbar: true,
        element: <CoursesPage/>,
    },
    {
        text: "courseCategory",
        path: "course/:courseCategoryId",
        exact: true,
        visibleInNavbar: false,
        element: <CoursesParams/>,
    },
    {
        text: "Courses",
        path: "course/:courseCategory/:courseName",
        exact: true,
        visibleInNavbar: false,
        element: <OneCourseRoadmap/>,
    },
    {
        text: "Announce",
        path: "/announce",
        exact: true,
        visibleInNavbar: false,
        element: <EventsAnnounce/>,
    },
    {
        text: "Yangiliklar",
        path: "/news",
        exact: true,
        visibleInNavbar: true,
        element: <NewsPage/>,
    },
    {
        text: `Bog'lanish`,
        path: "/contact",
        exact: true,
        visibleInNavbar: true,
        element: <Contact/>,
    },

    // {
    //   text: "Ilmiy manbalar",
    //   path: "/articles",
    //   exact: true,
    //   visibleInNavbar: true,
    //   element: <LibraryPage2 />,
    // },
    {
        text: "Ilmiy maqolalar",
        path: "/library",
        exact: true,
        visibleInNavbar: true,
        element: <LibraryPage/>,
    },
    {
        text: "Bizning jamoa",
        path: "/about",
        exact: true,
        visibleInNavbar: true,
        element: <About/>,
    },
    // {
    //   text: "CHSB Natijalari",
    //   path: "/chsb-results",
    //   exact: true,
    //   visibleInNavbar: false,
    //   element: <ExamResults />,
    // },
    {
        text: "Schools",
        path: "/license/:schoolId",
        exact: true,
        visibleInNavbar: false,
        element: <SchoolParams/>,
    },
    {
        text: "Announcements",
        path: "/announce/:announcementId",
        exact: true,
        visibleInNavbar: false,
        element: <AnnounceParams/>,
    },
    {
        text: "Counsil",
        path: "/science-counsil",
        exact: true,
        visibleInNavbar: false,
        element: <Counsil/>,
    },
    {
        text: "Rahbariyat",
        path: "/management",
        exact: true,
        visibleInNavbar: false,
        element: <Management/>,
    },
    {
        text: "Tuzilma",
        path: "/structure",
        exact: true,
        visibleInNavbar: false,
        element: <Tuzilma/>,
    },
    {
        text: "Hamkorlik",
        path: "/international-cooperation",
        exact: true,
        visibleInNavbar: false,
        element: <International/>,
    },
    {
        text: "Hamkorlik",
        path: "/international-cooperation/:id",
        exact: true,
        visibleInNavbar: false,
        element: <InternationalParent/>,
    },
    {
        text: "Fakultetlar",
        path: "/faculty",
        exact: true,
        visibleInNavbar: false,
        element: <Faculty/>,
    },
    
    {
        text: "Statistika",
        path: "/statistics",
        exact: true,
        visibleInNavbar: false,
        element: <Statistic/>,
    },
    {
        text: "Fakultet Kurslari",
        path: "/all-courses",
        exact: true,
        visibleInNavbar: false,
        element: <FakultetCourse/>,
    },
    {
        text: "Universitet hayoti",
        path: "/about-uni",
        exact: true,
        visibleInNavbar: false,
        element: <AboutUni/>,
    },
    {
        text: "Anonslar",
        path: "/anons",
        exact: true,
        visibleInNavbar: false,
        element: <Timeline/>,
    },
    {
        text: "Bizning chempionlar",
        path: "/our-campions",
        exact: true,
        visibleInNavbar: false,
        element: <ChampionsBoard/>,
    },
    {
        text: "Bizning a'lochilar",
        path: "/good-st",
        exact: true,
        visibleInNavbar: false,
        element: <ExcellentBoard/>,
    },
    {
        text: "University Union",
        path: "/university-union",
        exact: true,
        visibleInNavbar: false,
        element: <UniversityUnion/>,
    },
    {
        text: "Laboratoriya",
        path: "/laboratory",
        exact: true,
        visibleInNavbar: true,
        element: <Laboratory/>,
    },
    {
        text: "Syllabus",
        path: "/syllabus",
        exact: true,
        visibleInNavbar: false,
        element: <Syllabus/>,
    },
    {
        text: "Konferensiya",
        path: "/conference",
        exact: true,
        visibleInNavbar: false,
        element: <Events/>,
    },
    {
        text: "Stipendiantlar",
        path: "/scholarship",
        exact: true,
        visibleInNavbar: false,
        element: <Scholarship/>,
    },
    {
        text: "Ilmiy jurnallar",
        path: "/journal",
        exact: true,
        visibleInNavbar: false,
        element: <Journal/>,
    },
    {
        text: "Xalqaro e'tirof",
        path: "/confession",
        exact: true,
        visibleInNavbar: false,
        element: <Etirof/>,
    },
    {
        text: "Kafedra va Fakultetlar",
        path: "/faculty-kafedra",
        exact: true,
        visibleInNavbar: false,
        element: <FakultetKafedra/>,
    },
    {
        text: "Kafedra va Fakultetlar",
        path: "/faculty-kafedra/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <FakultetKafedraSlug/>,
    },
    {
        text: "Kafedralar",
        path: "/kafedra",
        exact: true,
        visibleInNavbar: false,
        element: <Kafedra/>,
    },
    {
        text: "KafedraSlug",
        path: "/kafedra/:short_name",
        exact: true,
        visibleInNavbar: false,
        element: <KafedraSlug/>,
    },
    {
        text: "Bo'lim va markazlar",
        path: "/departments",
        exact: true,
        visibleInNavbar: false,
        element: <Department/>,
    },
    {
        text: "Bo'lim va markazlar",
        path: "/departments/:short_id",
        exact: true,
        visibleInNavbar: false,
        element: <DepartmentDetails/>,
    },
    {
        text: "pagelar",
        path: "/dropdown/:slug",
        exact: true,
        visibleInNavbar: false,
        element: <DropdownDetails/>,
    },
    {
        text: "404",
        path: "*",
        visibleInNavbar: false,
        exact: true,
        element: <Error404Page/>,
    },
];
