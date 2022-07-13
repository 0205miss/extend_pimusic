     
    
     
     
     
     export default function img(){ 


        const [{ alt, src }, setImg] = useState({
            src: '../images/product/1.png',
            alt: "Upload Image"
        })
        // concordion 
        const [clicked, setClicked] = useState(false)
    
        const toggle = index => {
            if (clicked === index) {
                setClicked(null)
            }
            setClicked(index)
        }
    
        // end of concordion
    
        // trigger file upload
        let fileRef = React.createRef()
    
        const handleImg = (e) => {
            console.log(e.target)
            
            if (e.target.files[0]) {
                setImg({
                    src: URL.createObjectURL(e.target.files[0]),
                    alt: e.target.files[0].name
                })
            }
    
        }
        const tiggerClick = () => {
            fileRef.current.click()
        }

        return(
                    <div className="ml-[40px]">

                    {
                        img.map((item, index) => {
                            return (
                                <>
                                    <div className="space-y-2">
                                        <div className="p-1">
                                            <div className="border-b-4 h-[30px] bg-red-300 w-[250px] flex" onClick={() => toggle(index)} key={index}>
                                                <span>{item.title}</span>
                                                <span>
                                                    {
                                                        clicked === index ?

                                                            <AiFillDownCircle className="text-[#FFF] ml-[9.5rem] mt-[2px] w-[1.5em] h-[1.5em]" />

                                                            :

                                                            <IoIosAddCircle className="text-[#FFF] ml-[9.5rem] mt-[2px] w-[1.5em] h-[1.5em]" />
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {
                                            clicked === index ? (
                                                <>
                                                    <label className="">{item.imgfor}</label>
                                                    <div className="h-[250px] w-[250px] mt-[-100em] border-4 border-[#f98a8d]" style={{
                                                        borderTopRightRadius: '10px',
                                                        borderBottomRightRadius: '10px',
                                                        borderTopLeftRadius: '10px',
                                                        borderBottomLeftRadius: '10px',
                                                        outline: 'none',
                                                    }}>
                                                        <input
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            id="photo"
                                                            ref={fileRef}
                                                            className=""
                                                            onChange={handleImg}
                                                            hidden
                                                        />

                                                        <img
                                                            src={src}
                                                            alt={alt}
                                                            onClick={tiggerClick}
                                                            className="h-[242px] w-[242px]"

                                                        />

                                                    </div>

                                                </>

                                            ) : null}

                                    </div>
                                </>
                            )

                        }
                        )}

                </div>

        )

                }

