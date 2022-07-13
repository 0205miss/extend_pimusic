import React from 'react'
import { useRecoilValue } from 'recoil'
import {
    uploadMediaFinishedState,
    uploadMediaProgressState,
} from './MediaState'

const UploadMediaProgress = () => {
    const progress = useRecoilValue(uploadMediaProgressState)
    const finished = useRecoilValue(uploadMediaFinishedState)
    console.log(progress)
    return progress > 0 ? (
        <div className="absolute inset-0 bg-red-700">
            <div className="flex items-center justify-center h-full">
                {!finished ? (
                    <div
                        style={{ width: '200px' }}
                        className="relative bg-black opacity-75 h-5 flex items-center text-sm rounded"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-white font-bold">
                            {progress} %
            </div>
                        <div
                            style={{ width: `${progress}%` }}
                            className="h-full bg-primary rounded"
                        ></div>
                    </div>
                ) : (
                    <div className="text-white bg-black opacity-70 px-3 py-1 rounded-lg text-sm">
                        Upload finished!
                    </div>
                )}
            </div>
        </div>
    ) : null
}

export default React.memo(UploadMediaProgress)
