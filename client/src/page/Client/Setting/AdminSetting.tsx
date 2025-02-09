import React, { useEffect, useState } from 'react';
import { Input, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { getsettingIdThunk } from '../../../redux/admin/component/Setting';

function AdminSetting() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [color, setColor] = useState('#fff'); // Default color
    const [visible, setVisible] = useState(false); // State to control visibility of the color picker popover
    const dispatch = useDispatch();
    const setting = useSelector(state => state.setting.getsettingId);

    useEffect(() => {
        dispatch(getsettingIdThunk(1)); // Fetch title
        dispatch(getsettingIdThunk(2)); // Fetch description
        dispatch(getsettingIdThunk(3)); // Fetch author
        dispatch(getsettingIdThunk(4)); // Fetch color
    }, [dispatch]);

    useEffect(() => {
        if (setting) {
            if (setting.id === 1) {
                setTitle(setting.value);
            }
            if (setting.id === 2) {
                setDescription(setting.value);
            }
            if (setting.id === 3) {
                setColor(setting.value);
            }
            if (setting.id === 4) {
                setAuthor(setting.value); // Set color from the fetched setting
            }
        }
    }, [setting]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleColorChange = (color) => {
        setColor(color.hex); 
        setVisible(false); 
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    const colorPicker = (
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
    );

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="row container">
                <h2 className="text-[2.2rem] pb-[20px]">Cài Đặt Website {title}</h2>
            </div>
            <div className="flex">
                <div className="container max-w-screen-lg flex-auto">
                    <h4 className='text-[1.6rem]'>Title Website:</h4>
                    <Input
                        className="w-[300px]"
                        value={title}
                        placeholder="Title Website..."
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="container max-w-screen-lg flex-auto">
                    <h4 className='text-[1.6rem]'>Description Website:</h4>
                    <Input
                        className="w-[300px]"
                        value={description}
                        placeholder="Description Website..."
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="container max-w-screen-lg flex-auto">
                    <h4 className='text-[1.6rem]'>Color Website:</h4>
                    <div className="flex items-center">
                        <Popover
                            content={colorPicker}
                            trigger="click"
                            open={visible}
                            onOpenChange={handleVisibleChange}
                        >
                            <Input
                                className="w-[265px]"
                                value={color}
                                placeholder="Click to select color..."
                                readOnly
                            />
                        </Popover>
                        <div className="rounded-[9px]" style={{ width: 35, height: 35, backgroundColor: color, marginLeft: 10 }} />
                    </div>
                </div>
                <div className="container max-w-screen-lg flex-auto">
                    <h4 className='text-[1.6rem]'>Author Website:</h4>
                    <Input
                        className="w-[300px]"
                        value={author}
                        placeholder="Author Website..."
                        onChange={handleAuthorChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminSetting;