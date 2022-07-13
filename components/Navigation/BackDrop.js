import React from 'react'

function BackDrop(props) {
    return (
        <div>
            <div onClick={props.clickBack} className="backdrop fixed h-[100%] w-[100%]"/>
        </div>
    )
}

export default BackDrop
