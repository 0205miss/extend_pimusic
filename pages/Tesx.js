import { useEffect, useState } from 'react'

export default function Home({ users }) {
    // const [reactData, setReactData] = useState([]);
    // useEffect(() => {
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(data => {
    //       setReactData(data);
    //     }).catch((e) => { console.log(e) });
    // }, []);

    return (
        <>
            {/* <table>
        <tr>
          <th colSpan='3' className='topnav'>Rendered By React JS | Client side rendered</th>
        </tr>
        {reactData.map((user, index) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table> */}

            <br />

            {console.log(users)}
            {/* 
       <table>
        <tr>
          <th colSpan='3' className='topnav'>Rendered By Next JS | Server side rendered</th>
        </tr>
        {users.map((user, index) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table> */}
        </>
    )
}
export async function getServerSideProps({ params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale }) {
    console.log('Logging : ' + res);
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await data.json();
    return { props: { users } }
}