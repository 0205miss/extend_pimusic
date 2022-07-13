import { useRouter } from 'next/router'
import {useEffect } from "react"
import { Settings, Sale, Product, Supply } from '../../components/Dashboard'



 const SideBarPages = ()=> {

       const route = [
           {
               slug: 'product',
               label: "Product",
               component: <Product/>
           },
           {
            slug: 'sale',
            label: "Sales",
            component: <Sale/>
        },

        {
            slug: 'supply',
            label: "Supply",
            component: <Supply/>
        }
       ]

       const router  = useRouter()
       let currentPath = router.query.pages

       const FindSlugMatchingComp = ()=> route.find((cmp => {
           return cmp.slug === currentPath
       }))

       useEffect(() => {
         const foundComponent = FindSlugMatchingComp()
         if(currentPath && !foundComponent){
            router.push("/404")
        } 

       }, [router])

       const component = FindSlugMatchingComp().component

       
    return (
        <div>
            {component}
        </div>
    )
}

export default SideBarPages
