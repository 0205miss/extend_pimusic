import { MdFavoriteBorder } from "react-icons/md";
import { likePost } from '@/components/FrontPages/Imageupload/Util'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react'
import { number } from "prop-types";


interface Props {
    type: 'video' | 'comment';
    modelId: number;
    count: number;
    handleSuccess: (action: string) => void;
    isLiked: boolean;
}

const Like: React.FC<Props> = ({
    type,
    modelId,
    isLiked,
}) => {

    const [postlike, setPostlike] = useState<number>(0);
    const [handleSuccess, setHandleSuccess] = useState();

    useEffect(() => {
        getPostlikecount(modelId)
    }, [])


    const handleLikeClick = async (entity_id, entity) => {
        const data = { entity_id, entity }
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.post('/like', data);
        if (res.status === 201)
            setHandleSuccess(res.data.data)
        handleSuccess === 'liked' ? setPostlike(postlike + 1) : setPostlike(postlike - 1);
    };

    const getPostlikecount = async (modelId) => {
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const feedpost = await axios.get('/like-count/' + modelId)
        setPostlike(feedpost.data[0].like_count)

    }



    console.log(postlike)
    return (
        <div className="pointer flex space-x-2" onClick={() => {
            console.log(handleSuccess)

            handleLikeClick(modelId, type)

        }
        }>

            <MdFavoriteBorder
                className={`${isLiked ? 'text-[#f04c30] text-xl' : 'text-xl hover:text-[#f04c30] focus:text-[#f04c30]'}`}
            />
            {/* <i
                className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'
                    }`}
            ></i>{' '} */}
            <span>
                {postlike > 0 && postlike} {`${postlike > 1 ? 'Likes' : 'Like'}`}
            </span>
        </div>
    );
};
export default Like;
