import { MdFavoriteBorder } from "react-icons/md";
import { likePost } from '@/components/FrontPages/Imageupload/Util'
import axios from 'axios'
import Cookies from 'js-cookie';

interface Props {
    type: 'video' | 'comment';
    modelId: number;
    count: number;
    handleSuccess: (action: string) => void;
    isLiked: boolean;
}

const Like: React.FC<Props> = ({
    type,
    count,
    handleSuccess,
    modelId,
    isLiked,
}) => {
    const handleLikeClick = async (entity_id, entity) => {
        const data = { entity_id, entity }
        const TOKEN_STORAGE_KEY = 'token';
        const token = Cookies.get(TOKEN_STORAGE_KEY);
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        const res = await axios.post('/like', data);
        console.log(isLiked)
        if (res.status === 201) handleSuccess(res.data.data);
    };
    return (
        <div className="pointer flex space-x-2" onClick={() =>
            handleLikeClick(modelId, type)


        }>
            <MdFavoriteBorder
                className={`${isLiked ? 'text-[#f04c30] text-xl' : 'text-xl hover:text-[#f04c30] focus:text-[#f04c30]'}`}
            />
            {/* <i
                className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'
                    }`}
            ></i>{' '} */}
            <span>
                {count > 0 && count} {`${count > 1 ? 'Likes' : 'Like'}`}
            </span>
        </div>
    );
};
export default Like;
