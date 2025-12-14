import { createRouter, createWebHistory } from "vue-router";
import HostelsListViewComponent from "../views/HostelsListView.vue";
import HomeView from "../views/HomeView.vue";
import DocumentUploadView from "@/views/DocumentUploadView.vue";
import HostelFloorsViewComponent from "@/views/HostelFloorsView.vue";
import PersonalCabinetView from "@/views/PersonalCabinetView.vue";
import InternalErrorView from "@/views/InternalErrorView.vue";
import NotFoundErrorView from "@/views/NotFoundErrorView.vue";
import { logout, whoAmI } from "@/services/auth";

// No need to use Vue.use(VueRouter) in Vue 3, this is for Vue 2

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      next(`/hostels`);
    },
  },
  {
    path: "/hostels",
    name: "Hostels", 
    component: HostelsListViewComponent,
    props: true,
  },
  {
    path: "/hostel/:id",
    name: "HostelDetail",
    beforeEnter: (to, from, next) => {
      if (!to.path.includes("/floor/")) {
        next(`/hostel/${to.params.id}/floor/2`);
      } else {
        next();
      }
    },
    props: true,
  },
  {
    path: "/hostel/:id/floor/:floorNumber?",
    beforeEnter: (to, from, next) => {
      if (!to.params.floorNumber) {
        next(`/hostel/${to.params.id}/floor/2`);
      } else {
        next();
      }
    },
    name: "HostelFloorsView",
    component: HostelFloorsViewComponent,
    props: true,
  },
  {
    path: "/upload-document",
    name: "document-upload",
    component: DocumentUploadView
  },
  {
    path: "/personal-cabinet",
    name: "personalCabinet",
    component: PersonalCabinetView
  },
  {
    path: "/internal-error",
    name: "InternalServerError",
    component: InternalErrorView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundErrorView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const jwt = localStorage.getItem('jwt');
  const requiresAuth = [
    '/upload-document',
    '/hostel/',
    '/personal-cabinet',
  ].some(path => to.path.startsWith(path.replace(/:.*?\b/g, '')));

 
  if (!requiresAuth) {
    return next();
  }

  if (!jwt) {
    return next({
      path: '/',
      query: {
        ...to.query,
        auth: 'true',
        method: 'login'
      },
    });
  }

  try {
    const response = await whoAmI();

    if (!response || response.status !== 200) {
      await logout(); // якщо не авторизований або сесія закінчилась
      return next({
        path: '/',
        query: {
          ...to.query,
          auth: 'true',
          method: 'login'
        },
      });
    }

    next(); // авторизований
  } catch (error) {
    await logout(); // помилка запиту — теж обробляємо як неавторизованого
    return next({
      path: '/',
      query: {
        ...to.query,
        auth: 'true',
        method: 'login'
      },
    });
  }
});

export default router;
