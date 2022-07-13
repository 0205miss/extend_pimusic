import React from 'react'
import { Upload, Modal, Button, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import { HiDotsHorizontal } from 'react-icons/hi'
import { BiPhotoAlbum } from 'react-icons/bi'



class Media extends React.Component {




    render() {
        const userId = this.props.isAuthenticated.id;
        //Uploaded url
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                //reader.onerror = error => reject(error);
            });
        }


        class PicturesWall extends React.Component {
            state = {
                previewVisible: false,
                previewImage: '',
                previewTitle: '',
                fileList: [],
                description: '',
                price: 'No price    ',
                msg: '',
                showPrice: false
            };

            handleCancel = () => this.setState({ previewVisible: false });


            togglePrice = () => {

                if (this.state.showPrice == true) {

                    this.setState({ showPrice: false });
                } else {
                    this.setState({ showPrice: true });
                }


            }




            //Image Preview
            handlePreview = async file => {

                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }

                this.setState({
                    previewImage: file.url || file.preview,
                    previewVisible: true,
                    previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
                });
            };

            handleChange = ({ fileList }) => {
                this.setState({ fileList })
                { console.log("image type", this.state['description']) }
                { console.log("image preview", this.state['previewImage']) }

            }



            handleSubmit = async (event) => {

                event.preventDefault();
                let formData = new FormData();
                // add one or more of your files in FormData
                // again, the original file is located at the `originFileObj` key

                //Files Storage Looping
                for (var a = 0; a < this.state.fileList.length; a++) {
                    formData.append("file", this.state.fileList[a].originFileObj);

                }

                formData.append('description', this.state.description)
                formData.append('user_id', userId)
                formData.append('price', this.state.price)


                const TOKEN_STORAGE_KEY = 'token';

                const token = Cookies.get(TOKEN_STORAGE_KEY);
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

                const result = await axios.post('/video', formData);
                console.log(result)
                if (result.status === 201) {
                    this.setState({ msg: 'Post uploaded Successfully' });
                    location.reload()
                }
                else {
                    this.setState({ msg: 'fail to upload' });
                }
            }

            render() {


                const { previewVisible, previewImage, fileList, previewTitle } = this.state;
                const uploadButton = (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                );
                return (
                    <>

                        <div className="w-full mb-10">
                            <div className="w-full mb-2">
                                <textarea
                                    className="w-full placeholder-gray4 p-2 "
                                    placeholder="Your's on your mind"
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    value={this.state.description}
                                ></textarea>

                            </div>
                            <Upload

                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={() => false}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={this.handleCancel}
                            >

                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>

                            <hr className="my-2" />
                            <div className="flex justify-between ">
                                <div className="flex items-center space-x-6 ml-4">
                                    <label className="" htmlFor="file">
                                        <BiPhotoAlbum
                                            className="text-2xl text-primary mr-1"

                                        />




                                    </label>
                                    <div className="text-primary inline-flex items-center">
                                        <HiDotsHorizontal className="mr-1 text-xl" onClick={this.togglePrice} />


                                        {
                                            this.state.showPrice
                                                ?

                                                <>
                                                    <select onChange={(e) => this.setState({ price: e.target.value })}>
                                                        <option value="0.02331">0.02331𝝅</option>
                                                        <option value="0.02431">0.024331𝝅</option>
                                                        <option value="0.04331">0.04331𝝅</option>
                                                        <option value="0.05331">0.05331𝝅</option>
                                                    </select>
                                                </>
                                                :
                                                <>
                                                    <span> Price : {this.state.price} </span>
                                                </>
                                        }

                                        {
                                            this.state.msg ?
                                                <>
                                                    <div className="text-green-700 ml-4"> {this.state.msg}</div>
                                                </>
                                                :
                                                <>

                                                </>
                                        }


                                    </div>




                                    <Button className="bg-[#f04c30] text-white rounded-lg absolute right-8" onClick={this.handleSubmit} // this button click will trigger the manual upload
                                    >
                                        Post
        </Button>


                                </div>
                            </div>

                            <hr className="my-2" />

                        </div>

                    </>
                );
            }
        }


        return (
            <div className="MainDiv">
                <div className="container">

                    <PicturesWall />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.user,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});


export default connect(mapStateToProps)(Media);
