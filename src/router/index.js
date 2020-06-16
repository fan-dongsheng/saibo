import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
            children: [{
                path: 'projectManagement',
                name: 'projectManagement',
                component: () =>
                    import ('@/components/home-main/projectManagement.vue')
                   
            },
            {
                path: 'dataManagement',
                name: 'dataManagement',
                component: () =>
                    import ('@/components/home-main/dataManagement.vue')       
            }
            ,
            {
                path: 'dataManagement/:name',
                name: 'dataManagement',
                component: () =>
                    import ('@/components/home-main/dataManagement.vue')       
            }
            ,
            {
                path: 'dataManagement/:name/:extract',
                name: 'dataManagement',
                component: () =>
                    import ('@/components/home-main/extract.vue')       
            }
            ,
            {
                path: 'dataImport',
                name: 'dataImport',
                component: () =>
                    import ('@/components/home-main/dataImport.vue')
                   
            }
            ,
            {
                path: 'modelManagement',
                name: 'modelManagement',
                component: () =>
                    import ('@/components/home-main/modelManagement.vue')
                   
            },
            // {
            //     path: 'mapQuiz',
            //     name: 'mapQuiz',
            //     component: () =>
            //         import ('@/components/home-main/mapQuiz.vue')
                   
            // }
            
        ]
    }

]

const router = new Router({
    routes
})

export default router