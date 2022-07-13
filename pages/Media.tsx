import React from 'react'
import { Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import "antd/dist/antd.css";

class Media extends React.Component {



    render() {

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
                fileList: [

                ],
            };

            handleCancel = () => this.setState({ previewVisible: false });


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

            handleChange = ({ fileList }) => this.setState({ fileList });

            handleSubmit = event => {
                event.preventDefault();

                let formData = new FormData();
                // add one or more of your files in FormData
                // again, the original file is located at the `originFileObj` key

                //Files Storage Looping
                for (var a = 0; a < this.state.fileList.length; a++) {
                    formData.append("file[]", this.state.fileList[a].originFileObj);

                }

                //File saving API call
                axios
                    .post("http://localhost:8000/addpost", formData)
                    .then(res => {
                        alert("Files uploaded.");

                    })
                    .catch(err => {
                        console.log("err", err);
                    });
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
                        <Button type="primary" onClick={this.handleSubmit} // this button click will trigger the manual upload
                        >
                            Submit
        </Button>
                    </>
                );
            }
        }


        return (
            <div className="MainDiv">
                <div className="jumbotron text-center pt-5">
                    <h3 className="mt-5 mb-5">Therichpost.com</h3>

                </div>

                <div className="container">

                    <PicturesWall />
                </div>
            </div>
        );
    }
}

export default Media;