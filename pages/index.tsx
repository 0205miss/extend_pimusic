/*
|--------------------------------------------------------------------------
| The home page.
|--------------------------------------------------------------------------
|
| The home page of your application.
|
*/
import Link from "next/link";
import { H1 } from "./../components/Typography/Headers";
import FrontPage from '../components/Layout/FrontPage'
import { connect } from "http2";
export default function Home({ prod }) {
    process.env.NODE_ENV !== 'production'
    return (
        <>

            <FrontPage />
        </>
    )
}




// export async function getStaticProps({ params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale }) {
//     console.log('Logging : ' + res);
//     const data = await fetch('https://moxieus.co/api/public/products');
//     const prod = await data.json();
//     return {
//         props: { prod },
//         revalidate: 1,
//     }

// }