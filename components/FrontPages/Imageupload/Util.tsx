import { ApolloError } from '@apollo/client'
import { format, formatDuration } from 'date-fns'
import { SyntheticEvent } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
//@ts-ignore
import TinyURL from 'tinyurl'
import { MdFavoriteBorder } from "react-icons/md";

export const formatValidationErrors = (errors: any) => {
    let newErrors: any = []
    if (errors[0].message !== 'Argument Validation Error') {
        return errors[0]
    }
    const validationErrors = errors[0].extensions.exception?.validationErrors

    validationErrors.forEach((error: any) => {
        const field = error.property
        const constraints = error.constraints
        newErrors.push({
            field,
            message: Object.values(constraints)[0],
        })
    })

    return newErrors
}

// export const handleErrors = (e: any) => {
//     let errors = []
//     if (e instanceof ApolloError) {
//         if (
//             e.graphQLErrors &&
//             e.graphQLErrors[0] &&
//             e.graphQLErrors[0].message === 'Argument Validation Error'
//         ) {
//             errors.push(formatValidationErrors(e.graphQLErrors))
//         } else {
//             errors.push(e)
//         }
//     } else {
//         errors.push(e)
//     }
//     return errors
// }


export const dynamicPage = async () => {

    const TOKEN_STORAGE_KEY = 'token';
    const token = Cookies.get(TOKEN_STORAGE_KEY);
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.get('/dynamic-post')
    return res
}


export const commentPost = async (post_id, comment, user_id) => {

    const data = { post_id, comment, user_id }

    const TOKEN_STORAGE_KEY = 'token';
    const token = Cookies.get(TOKEN_STORAGE_KEY);
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post('/comment', data);
    return res
}

export const likePost = async (entity_id, entity, islike) => {

    const data = { entity_id, entity }
    const TOKEN_STORAGE_KEY = 'token';
    const token = Cookies.get(TOKEN_STORAGE_KEY);
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post('/like', data);
    if (res.status === 201) islike = res.data.data;
    console.log(entity_id, entity, islike)

}

export const bookaPost = async (entity_id, entity) => {

    const data = { entity_id, entity }
    console.log(data)
    const TOKEN_STORAGE_KEY = 'token';
    const token = Cookies.get(TOKEN_STORAGE_KEY);
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    const res = await axios.post('/bookmark', data);
}



export const avatarInitials = (display_name: string) => {
    const split = display_name.split(' ')
    if (split.length === 1) {
        return display_name.slice(0, 2).toUpperCase()
    } else {
        return `${split[0].slice(0, 1)}${split[1].slice(0, 1)}`.toUpperCase()
    }
}

export const formattedDate = (date: string): string => {

    return format(new Date(date), "d MMMM 'at' HH:mm")
}

export const pluralize = (
    count: number,
    str: string,
    noCount: boolean = false
): string => {
    if (count > 1) {
        str += 's'
    }
    if (noCount) {
        return str
    }
    return `${count} ${str}`
}
// Parse the tweet to extract hashtags and the first url ( for the link's preview )
export const extractMetadata = async (body: string) => {
    let hashtags = body.match(/(#[\w]+)/g)

    const urls = body.match(/https?:\/\/\S+/g)

    // Remove duplicates
    if (hashtags && hashtags?.length > 0) {
        hashtags = Array.from(new Set(hashtags))
    }
    return {
        hashtags,
        urls,
    }
}

export const shortenURLS = async (
    urls: string[]
): Promise<{ original: string; shorten: string }[]> => {
    const tinyURLS = []
    for (let url of urls) {
        const res = await TinyURL.shorten(url)
        tinyURLS.push({
            original: url,
            shorten: res,
        })
    }
    return tinyURLS
}

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

export const validateFiles = (
    file: File,
    maxSize: number,
    fileFormat = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'audio/mpeg']
) => {
    if (Math.round(file.size / 10024 / 10024) > maxSize) {
        throw new Error(`You cannot upload file larger than ${maxSize} mb`)
    }
    if (!fileFormat.includes(file.type)) {
        throw new Error(`Only those file are accepted: ${fileFormat}`)
    }
}
