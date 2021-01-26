import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getFilePreviewUrl } from "@/utils/utils"
import ImgCrop from 'antd-img-crop';

type AvatarUploaderProps = {
    value?: string,
    onChange?: (item: string) => void
}

const AvatarUploader: React.FC<AvatarUploaderProps> = (props) => {
    const [imageUrl, setImageUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (props.value) {
            setImageUrl(getFilePreviewUrl(props.value));
        }
    }, [props.value])

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (_imageUrl: string) => {
                setLoading(false);
                const fileName = info.file.response?.data?.filename?.realName || ""
                setImageUrl(getFilePreviewUrl(fileName));
                if (props.onChange) {
                    props.onChange(fileName)
                }
            });
        }
    };

    return (
        <ImgCrop rotate>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/server/uploader/upload"
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </ImgCrop>
    );
};

export default AvatarUploader;
