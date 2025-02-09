export const trademark = [
    { id: 1, label: 'iphone', url: 'https://logo.clearbit.com/apple.com' },
    { id: 2, label: 'samsung', url: 'https://i.pinimg.com/originals/49/55/f5/4955f570b6a593717a23b1bb20e38d98.jpg' },
    { id: 3, label: 'oppo', url: 'https://logo.clearbit.com/oppo.com' },
    { id: 4, label: 'xiaomi', url: 'https://logos-world.net/wp-content/uploads/2020/05/Xiaomi-Logo.png' },
    { id: 5, label: 'vivo', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vivo_New_Logo_2019.png/1200px-Vivo_New_Logo_2019.png' },
    { id: 6, label: 'realme', url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.png' },
    { id: 7, label: 'honor', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/LOGO_Honor.svg/1200px-LOGO_Honor.svg.png' },
    { id: 8, label: 'nokia', url: 'https://www.vanillaplus.com/wp-content/uploads/2023/02/Nokia-new-logo-transparent-background.png' },
    { id: 9, label: 'tecno', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tecno_Mobile_logo.svg/1024px-Tecno_Mobile_logo.svg.png' },
    { id: 10, label: 'masstel', url: 'https://masscom.vn/wp-content/uploads/2019/05/logo-masstel-2-1.png' },
    { id: 11, label: 'mobell', url: 'https://interbra.vn/public/DATA/2017/4-2017-26107.jpg' },
    { id: 12, label: 'itel', url: 'https://image.pngaaa.com/482/2017482-middle.png' },

]



export const priceList = [
    { id: 1, price: 'Dưới 5 triệu' },
    { id: 2, price: 'Dưới 10 triệu' },
    { id: 3, price: 'Dưới 20 triệu' },
    { id: 4, price: 'Dưới 30 triệu' },
    { id: 5, price: 'Trên 30 triệu' },
]

export const ramOptions = [
    { id: 1, capacity: '2GB' },
    { id: 2, capacity: '4GB' },
    { id: 3, capacity: '6GB' },
    { id: 4, capacity: '8GB' },
    { id: 5, capacity: '12GB' },
    { id: 6, capacity: '16GB' },
    { id: 7, capacity: '18GB' },
    { id: 8, capacity: '32GB' },
];

export const romOptions = [
    { id: 1, capacity: '16GB' },
    { id: 2, capacity: '32GB' },
    { id: 3, capacity: '64GB' },
    { id: 4, capacity: '128GB' },
    { id: 5, capacity: '256GB' },
    { id: 6, capacity: '512GB' },
    { id: 7, capacity: '1TB' },
];

export const refreshRates = [
    { id: 1, rate: '60Hz' },
    { id: 2, rate: '90Hz' },
    { id: 3, rate: '120Hz' },
    { id: 4, rate: '144Hz' },
    { id: 5, rate: '240Hz' },
];

export const screenSizes = [
    { id: 1, size: '5.0 inches' },
    { id: 2, size: '5.5 inches' },
    { id: 3, size: '6.0 inches' },
    { id: 4, size: '6.1 inches' },
    { id: 5, size: '6.5 inches' },
    { id: 6, size: '6.7 inches' },
    { id: 7, size: '7.0 inches+' },
    { id: 8, size: '6.8 inches' },
    { id: 9, size: '6.5 inches' },
    { id: 10, size: '6.2 inches' },



];
export const rearCameras = [
    { id: 1, resolution: '12 MP' },
    { id: 2, resolution: '48 MP' },
    { id: 3, resolution: '64 MP' },
    { id: 4, resolution: '108 MP' },
    { id: 5, resolution: '50 MP' },
    { id: 6, resolution: '200 MP' },
];

export const frontCameras = [
    { id: 1, resolution: '5 MP' },
    { id: 2, resolution: '8 MP' },
    { id: 3, resolution: '12 MP' },
    { id: 4, resolution: '13 MP' },
    { id: 5, resolution: '20 MP' },
    { id: 6, resolution: '32 MP' },
    { id: 7, resolution: '48 MP' },
    { id: 8, resolution: '50 MP' },
    { id: 9, resolution: '200 MP' },

];




export interface ObjFilterTypeinterface {
    company: string,
    system: string[],
    price: string[];
    size: string[];
    refreshRate: string[];
    ram: string[];
    rom: string[];
    frontCamera: string[];
    rearCamera: string[];
    cpu: string[];
    chip_battery: string[];
};