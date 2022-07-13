import Image from 'next/image'
import { IoGrid } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5"
import { IoSearchOutline } from "react-icons/io5";
import { CgOptions } from "react-icons/cg";




const AdminNav = (props) => {
    return (
        <nav className="flex justify-between border-b-4 items-center w-full h-[5em]  text-block fixed font-mono navbar top-0">
            <div onClick={props.drawerClicked} className="md:ml-[12px] ml-[12px] h-[2em] w-[2em] md:h-[3em] md:w-[3em] justify-center items-center flex rounded-full bg-white"  >
                <IoGrid className=" text-[#f98a8d] w-[1em] h-[1em] md:w-[1.5em] md:h-[1.5em]" />
            </div>
            <div className="absolute md:left-[10em] left-[10em]">
                <h2>Abs</h2>
            </div>




            <div className="flex md:mr-[20px] mr-[1px] mt-[8px]">
                <div className=" mt-[10px] mr-2 h-[2em] w-[2em] md:h-[2.8em] md:w-[2.8em] md:ml-6 justify-center items-center flex rounded-full bg-white"
                >
                    <span className="text-white flex justify-center text-center text-xs absolute rounded-full w-[12px] h-[12px] mt-[-3px] ml-[10px] md:w-[13px] md:h-[13px] md:top-17px md:mt-[-6px] md:ml-[8px] bg-[#ed1a52]">3</span>
                    <IoNotificationsSharp
                        className="md:w-[1.9em] md:h-[1.9em] w-[1.4em] h-[1.4em] text-[#c7c0bf]"

                    />
                </div>


                <div className="md:h-[4em] md:w-[4em] h-[4em] w-[4em]" onMouseOver={props.hover} onMouseOut={props.hoverout}>
                    <Image
                        width={50}
                        height={50}
                        src='/images/user.png'
                        className="rounded-full md:w-16 md:h-16 h-16 w-16"
                    />
                </div>

            </div>

        </nav>
    )
}


export default AdminNav