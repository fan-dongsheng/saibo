import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import prview from '../components/home-main/prview.vue'

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
                meta: {
                    keepAlive: true 
                },
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
            {
                path: 'preprocess',
                name: 'preprocess',
                component: () =>
                    import ('@/components/home-main/preprocess.vue')
                   
            },
            {
                path: 'question',
                name: 'question',
                component: () =>
                    import ('@/components/home-main/question')
                   
            },
            {
                path: 'prview',
                name: 'prview',
                component:  prview    
            }
            
        ]
    },
    {
        path: '/prview',
        name: 'prview',
        component:  prview    
    }

]

const router = new Router({
    routes
})

export default router