/*
|--------------------------------------------------------------------------
| The home page.
|--------------------------------------------------------------------------
|
| The home page of your application.
|
*/
import Link from "next/link";
import FrontPage from '../../components/Layout/FrontPage'
import { connect } from "http2";
export default function Home({ prod }) {
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