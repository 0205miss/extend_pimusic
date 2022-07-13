
import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from "next/router";
import axios from 'axios'
import Cookies from 'js-cookie';
import Media2 from '@/components/FrontPages/Imageupload/Media2'

function uploader() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchuserData()
    }, []);

    const fetchuserData = async () => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.get('/userdata');
        setUser(res.data.data[0])

    }



    return (
        <div>
            <Media2 userdata={user} />
        </div>
    )
}

export default uploader
