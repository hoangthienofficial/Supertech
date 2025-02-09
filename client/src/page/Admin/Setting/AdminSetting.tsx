import React, { useEffect, useState } from 'react';
import { Input, Popover, Button, Row, Col, Modal, Tabs, Divider, Select,Upload,message } from 'antd';
import { FaMailBulk,FaExclamationTriangle, FaPlus,FaBookmark,FaUserAlt,FaBell,FaCubes,FaImage,FaRegCreditCard, FaLock  } from 'react-icons/fa';
import { SketchPicker } from 'react-color';
import {IMG_BACKEND_SETTING} from '../../../constants';
import { getsetting, updatesettingId, updatesettingallId  } from '../../../service/setting/setting.service';
import { getbank, updatebank } from '../../../service/bank/bank.service';
function AdminSetting() {
    const { TabPane } = Tabs; 
    const [isTokenVisible, setIsTokenVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchPasswordToken = async () => {
        setIsLoading(true);
        try {
            const response = await getsetting();
            const settingsMap = {};
            response.data.content.forEach(setting => {
                settingsMap[setting.id] = setting.value;
            });
            setIsLoading(false);
            return settingsMap[11].trim();
        } catch (error) {
            console.error('Failed to fetch password token:', error);
            setIsLoading(false);
            return null;
        }
    };
    
    const handlePasswordSubmit = async (inputPassword) => {
        setIsLoading(true);
        try {
            const correctPassword = await fetchPasswordToken();
            if (inputPassword === correctPassword) {
                setIsTokenVisible(true);
                Modal.destroyAll();
            } else {
                alert('Mật khẩu không chính xác!');
            }
        } catch (error) {
            console.error('Error fetching password:', error);
            alert('Lỗi khi tải dữ liệu!');
        } finally {
            setIsLoading(false);
        }
    };

    const showPasswordModal = () => {
        let tempPassword;
        Modal.confirm({
            title: 'Nhập mật khẩu để xem token',
            content: (
                <Input
                    type="password"
                    onChange={(e) => tempPassword = e.target.value} 
                    onPressEnter={() => handlePasswordSubmit(tempPassword)}
                />
            ),
            onOk: () => handlePasswordSubmit(tempPassword),
            onCancel: () => { Modal.destroyAll(); }
        });
    };
    const showPasswordSMTPModal = () => {
        let tempPassword;
        Modal.confirm({
            title: 'Nhập mật khẩu để xem',
            content: (
                <Input
                    type="password"
                    onChange={(e) => tempPassword = e.target.value} 
                    onPressEnter={() => handlePasswordSubmit(tempPassword)}
                />
            ),
            onOk: () => handlePasswordSubmit(tempPassword),
            onCancel: () => { Modal.destroyAll(); }
        });
    };
    const [settings, setSettings] = useState({
        title: '',
        description: '',
        author: '',
        SMTP_PASSWORD: '',
        SMTP_USER: '',
        SMTP_MAIL_CONTENT: '',
        color: '#fff'
    });
    const [originalSettings, setOriginalSettings] = useState({});
    const [visible, setVisible] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        
        short_name: '',
        accountName: '',
        accountNumber: '',
        contentAutobank: '',
    });
    const fetchSettings = async () => {
        try {
            const response = await getsetting();
            const settingsMap = {};
            response.data.content.forEach(setting => {
                settingsMap[setting.id] = setting.value;
            });
            setSettings({
                title: settingsMap[1],
                description: settingsMap[2],
                color: settingsMap[3],
                author: settingsMap[4],
                logo: settingsMap[5],
                favicon: settingsMap[6],
                noti_website: settingsMap[7],
                contentAutobank: settingsMap[8],
                token: settingsMap[9],
                rechargeNotice: settingsMap[10],
                tokenpass: settingsMap[11],
                SMTP_USER: settingsMap[12],
                SMTP_PASSWORD: settingsMap[13],
                SMTP_MAIL_CONTENT: settingsMap[14],
            });
           setOriginalSettings({
                ...settingsMap
            });
        } catch (error) {
            console.error('Lỗi lấy dữ liệu:', error);
        }
    };

    useEffect(() => {
        fetchSettings();
        fetchBankDetails();
    }, []);
    useEffect(() => {
        // console.log('Current bank details:', bankDetails);
    }, [bankDetails]);
    const handleValueChange = async (field, value) => {
        
        if (field in settings) {
            setSettings(prev => ({ ...prev, [field]: value }));
        }
        if (field in bankDetails) {
            const updatedBankDetails = { ...bankDetails, [field]: value };
            setBankDetails(updatedBankDetails);

            if (updatedBankDetails.id) {
                await updatebank(updatedBankDetails.id, 
                    updatedBankDetails.short_name, 
                    updatedBankDetails.accountName, 
                    updatedBankDetails.accountNumber, 
                    // updatedBankDetails.on_off  
                );
            } else {
                console.error('ID ngân hàng không tồn tại:', updatedBankDetails.id);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const updates = [];
            Object.keys(settings).forEach(key => {
                if (settings[key] !== originalSettings[key]) {
                    let id;
                    switch (key) {
                        case 'title':
                            id = 1;
                            break;
                        case 'description':
                            id = 2;
                            break;
                        case 'color':
                            id = 3;
                            break;
                        case 'author':
                            id = 4;
                            break;
                        case 'logo':
                            id = 5;
                            break;
                        
                        case 'noti_website':
                            id = 7;
                            break;
                        case 'contentAutobank':
                            id = 8;
                            break;
                        case 'token':
                            id = 9;
                            break;
                        case 'rechargeNotice':
                            id = 10;
                            break;
                        case 'passtoken':
                             id = 11;
                            break;
                         case 'SMTP_USER':
                             id = 12;
                             break;
                             case 'SMTP_PASSWORD':
                                id = 13;
                               break;
                            case 'SMTP_MAIL_CONTENT':
                                id = 14;
                                break;
                        default:
                            console.error('Unknown setting key:', key);
                            return;
                    }
                    updates.push(updatesettingallId(id, settings[key]));
                }
            });

            const bankUpdates = [];
            if (bankDetails.id) {
                await updatebank(
                    bankDetails.id,
                    bankDetails.short_name,
                    bankDetails.accountName,
                    bankDetails.accountNumber,
                    // bankDetails.on_off
                );
            }
    
            await Promise.all(updates, bankUpdates); 
            alert('Cập nhật cài đặt thành công!');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi cập nhật cài đặt:', error);
            alert('Có lỗi xảy ra trong quá trình cập nhật cài đặt. Vui lòng thử lại.');
        }
    };
   
    const fetchBankDetails = async () => {
        try {
            const response = await getbank();
            console.log('Bank details fetched:', response.data); 
            if (response.data && response.data.content.length > 0) {
                const bankInfo = response.data.content[0];
                console.log('Bank Info:', bankInfo); 
                setBankDetails({
                    id: bankInfo.id_bank,  
                    short_name: bankInfo.short_name || '',
                    accountName: bankInfo.accountName || '',
                    accountNumber: bankInfo.accountNumber || '',
                    // on_off: bankInfo.on_off || 0  
                });
            } else {
                console.error('No data returned from getbank');
            }
        } catch (error) {
            console.error('Failed to fetch bank details:', error);
        }
    };
    const [bankList, setBankList] = useState([]);

    const fetchBankList = async () => {
        try {
            const response = await fetch('https://api.vietqr.io/v2/banks');
            const data = await response.json();
            if (data.code === "00" && data.data) {
                const shortNames = data.data.map(bank => bank.short_name);
                setBankList(shortNames);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ngân hàng:', error);
        }
    };
    useEffect(() => {
        fetchBankList();
        fetchBankDetails();
    }, []);

    const colorPicker = (
        <SketchPicker color={settings.color} onChangeComplete={(color) => handleValueChange('color', color.hex)} />
    );
    

    return (
        <div className="min-h-screen flex flex-col p-12 gap-5 bg-[#f2edf3]" >
            <div className="flex-1 bg-white flex flex-col rounded-xl shadow-lg px-[24px] py-[35px]">
                <h2 className="pb-[24px] text-[30px] font-medium text-[#ffd700]">Cài Đặt Website: <b className="text-blue-500">{settings.title}</b></h2>
                <Tabs defaultActiveKey="1">
                <TabPane tab="Cài Đặt Chung" key="1">
                    <Row gutter={[16, 24]}>
                        <Divider orientation="center" className="text-3xl font-medium">Thông Tin Chung</Divider>
                        <Col xs={24} sm={12} md={6}>
                            <h4 className="text-3xl font-medium flex items-center mb-2"> <FaPlus className="mr-2" /> Title Website: </h4>
                            <span className="text-xl text-gray-500 flex items-center mb-2">
                                <FaExclamationTriangle className="text-red-500 mr-2" />
                                Đây là input nhập tên website !
                            </span>
                            <Input
                                value={settings.title}
                                placeholder="Title Website..."
                                onChange={(e) => handleValueChange('title', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <h4 className="text-3xl font-medium flex items-center mb-2"> <FaBookmark className="mr-2" /> Description Website:</h4>
                            <span className="text-xl text-gray-500 flex items-center mb-2">
                                <FaExclamationTriangle className="text-red-500 mr-2" />
                                Đây là input nhập giới thiệu ngắn ở chân website !
                            </span>
                            <Input
                                value={settings.description}
                                placeholder="Description Website..."
                                onChange={(e) => handleValueChange('description', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <h4 className="text-3xl font-medium flex items-center mb-2"> <FaUserAlt className="mr-2" /> Chủ Quản Website:</h4>
                            <span className="text-xl text-gray-500 flex items-center mb-2">
                                <FaExclamationTriangle className="text-red-500 mr-2" />
                                Đây là input nhập chủ của website !
                            </span>
                            <Input
                                value={settings.author}
                                placeholder="Author Website..."
                                onChange={(e) => handleValueChange('author', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <h4 className="text-3xl font-medium flex items-center mb-2"><FaBell className="mr-2" /> Thông Báo Website:</h4>
                            <span className="text-xl text-gray-500 flex items-center mb-2">
                                <FaExclamationTriangle className="text-red-500 mr-2" />
                                Đây là input thông báo ở đầu trang website !
                            </span>
                            <Input
                                value={settings.noti_website}
                                placeholder="SuperTech..."
                                onChange={(e) => handleValueChange('noti_website', e.target.value)}
                            />
                        </Col>
                    </Row>
                </TabPane>
                    <TabPane tab="Cài Đặt Giao Diện" key="2">
                        <Row gutter={[16, 24]}>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium flex items-center mb-2"><FaCubes className="mr-2" /> Color Website:</h4>
                                <div className="flex items-center">
                                    <Popover
                                        content={colorPicker}
                                        trigger="click"
                                        open={visible}
                                        onOpenChange={setVisible}
                                    >
                                        <Input
                                            value={settings.color}
                                            placeholder="Click to select color..."
                                            readOnly
                                        />
                                    </Popover>
                                    <div className="ml-4 w-10 h-10 rounded-full" style={{ backgroundColor: settings.color }}></div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium flex items-center mb-2">
                                    <FaImage className="mr-2" /> Favicon Website:
                                    <Popover content="Chức năng này sẽ tự động lưu ảnh favicon của bạn không cần bấm lưu !" trigger="hover">
                                        <FaExclamationTriangle className="text-red-500 ml-2" />
                                    </Popover>
                                </h4>
                                <div className="mt-2 p-4 shadow rounded-md bg-white flex justify-center">
                                    <img src={`${IMG_BACKEND_SETTING}${settings.favicon}`} alt="Favicon" className="w-20" />
                                </div>
                                <Upload
                                    accept="image/*"
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const faviconName = file.name;
                                            setSettings(prev => ({ ...prev, favicon: faviconName }));
                                        };
                                        reader.readAsDataURL(file);
                                        updatesettingId(6, file)
                                            .then(() => {
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 10);
                                            })
                                            .catch(error => {
                                                console.error('Lỗi khi upload favicon:', error);
                                            });
                                        return false;
                                    }}
                                >
                                    <Button className="mt-2 w-full">Chọn Favicon</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Ngân Hàng" key="3">
                        <Row gutter={[16, 24]}>
                            <Divider orientation="center" className="text-3xl font-medium"> <span className="flex items-center"><FaLock className="mr-2" /> Token Ngân Hàng</span></Divider>
                            <Col span={24}>
                                <h4 className="text-3xl font-medium mb-2">Token Autobank:</h4>
                                <span className="text-xl text-gray-500 flex items-center mb-2">
                                    <FaExclamationTriangle className="text-red-500 mr-2" />
                                    Đây là nơi lưu token api phía ngân hàng.
                                </span>
                                {isTokenVisible ? (
                                    <Input
                                        value={settings.token}
                                        onChange={(e) => handleValueChange('token', e.target.value)}
                                        placeholder="Enter token..."
                                    />
                                ) : (
                                    <Button onClick={showPasswordModal}>Xem Token</Button>
                                )}
                            </Col>
                            <Divider orientation="center" className="text-3xl font-medium"> <span className="flex items-center"><FaRegCreditCard className="mr-2" /> Thông Tin Ngân Hàng</span></Divider>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Ngân Hàng:</h4>
                                <div className="flex items-center">
                                    <Select
                                        value={bankDetails.short_name}
                                        placeholder="Chọn ngân hàng..."
                                        onChange={(value) => handleValueChange('short_name', value)}
                                        className="w-full"
                                    >
                                        {bankList.map((shortName, index) => (
                                            <Select.Option key={index} value={shortName}>
                                                {shortName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <Popover content="Đây là nơi chọn ngân hàng." trigger="hover">
                                        <FaExclamationTriangle className="text-red-500 ml-2" />
                                    </Popover>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Tên Tài Khoản:</h4>
                                <div className="flex items-center">
                                    <Input
                                        value={bankDetails.accountName}
                                        placeholder="Tên Tài Khoản..."
                                        onChange={(e) => handleValueChange('accountName', e.target.value)}
                                    />
                                    <Popover content="Đây là nơi nhập tên tài khoản." trigger="hover">
                                        <FaExclamationTriangle className="text-red-500 ml-2" />
                                    </Popover>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Số Tài Khoản:</h4>
                                <div className="flex items-center">
                                    <Input
                                        value={bankDetails.accountNumber}
                                        placeholder="Số Tài Khoản..."
                                        onChange={(e) => handleValueChange('accountNumber', e.target.value)}
                                    />
                                    <Popover content="Đây là nơi nhập số tài khoản." trigger="hover">
                                        <FaExclamationTriangle className="text-red-500 ml-2" />
                                    </Popover>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Nội Dung Nạp Tiền:</h4>
                                <div className="flex items-center">
                                    <Input
                                        value={settings.rechargeNotice}
                                        placeholder="Nội Dung Nạp Tiền..."
                                        onChange={(e) => handleValueChange('rechargeNotice', e.target.value)}
                                    />
                                    <Popover
                                        content={<div style={{ maxWidth: '200px' }}>
                                            Đây là nơi nhập nội dung chuyển tiền, khi khách hàng thanh toán
                                            thì nội dung này sẽ nằm ở đầu. <br /> Ví Dụ: supertech1156.
                                        </div>}
                                        trigger="hover"
                                    >
                                        <FaExclamationTriangle className="text-red-500 ml-2" />
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Cấu Hình SMTP" key="4">
                        <Row gutter={[16, 24]}>
                            <Divider orientation="center" className="text-3xl font-medium"> <span className="flex items-center"><FaMailBulk className="mr-2" /> Quản Lý Gửi MAIL SMTP</span></Divider>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Tài Khoản SMTP:</h4>
                                <span className="text-xl text-gray-500 flex items-center mb-2">
                                    <FaExclamationTriangle className="text-red-500 mr-2" />
                                    Đây là nơi lưu tài khoản MAIL Tự động.
                                </span>
                                <div className="flex items-center">
                                    <Input
                                        value={settings.SMTP_USER}
                                        placeholder="Tên Tài Khoản..."
                                        onChange={(e) => handleValueChange('SMTP_USER', e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <h4 className="text-3xl font-medium mb-2">Mật Khẩu SMTP:</h4>
                                <span className="text-xl text-gray-500 flex items-center mb-2">
                                    <FaExclamationTriangle className="text-red-500 mr-2" />
                                    Đây là nơi lưu mật khẩu SMTP MAIL.
                                </span>
                                {isTokenVisible ? (
                                    <Input
                                        value={settings.SMTP_PASSWORD}
                                        onChange={(e) => handleValueChange('SMTP_PASSWORD', e.target.value)}
                                        placeholder="Nhập Mật Khẩu..."
                                    />
                                ) : (
                                    <Button onClick={showPasswordSMTPModal}>Xem/Sửa Mật Khẩu</Button>
                                )}
                        </Col>
                        </Row>
                    </TabPane>
                    
                </Tabs>
                <Row>
                    <Col span={24} style={{ marginTop: '40px' }}>
                        <Button type="primary" onClick={handleSubmit} size="middle">
                            Lưu Cài Đặt
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default AdminSetting;