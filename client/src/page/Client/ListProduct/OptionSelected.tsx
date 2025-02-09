import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ObjFilterTypeinterface, priceList } from './DataFilter';
import { useAppSelector } from '../../../redux/hooks';

interface OptionSelectedProps {
    handleChangeProduct: (company: string, id: number) => void;
    handleSelectSize: (size: string) => void;
    handlePrice: (price: string) => void;
    handleSelectRate: (rate: string) => void;
    handleSelectRam: (ram: string) => void;
    handleSelectRom: (rom: string) => void;
    handleFrontCameras: (front: string) => void;
    handleRearCameras: (rear: string) => void;
    HandClick: (boolean: boolean) => void;
    RemoveClick: (boolean: boolean) => void;
    Datafilter: any[];
    ObjFilter: ObjFilterTypeinterface;
    dataId: number;
    handlesystem: (systemchose: string) => void;
    handlecpu: (cpuChose: string) => void;
    handlechip_battery: (chip_batteryChose: string) => void;

}


const OptionSelected: React.FC<OptionSelectedProps> = ({
    handleChangeProduct,
    handleSelectSize,
    handlePrice,
    handleSelectRate,
    handleSelectRam,
    handleSelectRom,
    handleFrontCameras,
    handleRearCameras,
    Datafilter,
    HandClick,
    RemoveClick,
    ObjFilter,
    dataId,
    handlesystem,
    handlecpu,
    handlechip_battery,


}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ListCatelogry_dad = useAppSelector((state: any) => state.category.catelogryDad);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inforProduct = useAppSelector((state: any) => state.product.inforProduct);
    const ListProduct = useAppSelector((state: any) => state.product.listProduct);



    const isSelected = (array: string[], value: string) => array.includes(value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        if (Array.isArray(inforProduct) && inforProduct.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ArrayFilter = ListProduct.filter((item: any) =>
                inforProduct.some(inforItem => inforItem.infor_product === item.infor_product)
            );
            setFilteredProducts(ArrayFilter);
        }
    }, [inforProduct, ListProduct]);











    const categoryDadNames: { [key: number]: string } = {
        1: "Điện thoại",
        2: "Laptop",
        3: "Sạc dự phòng",
        4: "Sạc/Cáp sạc",
        5: "Ốp Lưng",
        6: "Tai Nghe",
        7: "Cáp Chuyển Đổi",


    };



    return (
        <>
            <div className="grid border-t-[1px] grid-cols-2 box-border gap-[15px] text-[14px] p-6 bg-white rounded-lg">
                <div className="flex flex-col col-span-3">
                    <div className="font-bold">Các hãng {
                        categoryDadNames[dataId]

                    } </div>
                    <div className="flex flex-wrap gap-3">
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ListCatelogry_dad?.map((item: any, index: number) => (
                                <Button
                                    key={index}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={item.category_name.toLowerCase() === ObjFilter.company.toLowerCase() ? 'primary' : 'default'}
                                    onClick={() => handleChangeProduct(item.category_name.toLowerCase(), item.category_dad)}
                                >
                                    <span>{item.category_name}</span>
                                </Button>
                            ))}
                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Hệ điều hành</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_system, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) => typeof item.infor_product_infor_product.infor_system === 'string' && item.infor_product_infor_product.infor_system.trim() !== '')
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_system}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.system, item.infor_product_infor_product.infor_system) ? 'primary' : 'default'}
                                    onClick={() => handlesystem(item.infor_product_infor_product.infor_system)}
                                >
                                    <span>{item.infor_product_infor_product.infor_system}</span>
                                </Button>
                            ))
                        }
                    </div>




                </div>

                <div className="flex flex-col">
                    <span className="font-bold mb-1">Giá</span>
                    <div className="grid grid-cols-3 gap-3">
                        {priceList.map((item, index) => (
                            <Button
                                key={index}
                                className="min-w-[60px] h-[35px] flex justify-center items-center"
                                type={isSelected(ObjFilter.price, item.price) ? 'primary' : 'default'}
                                onClick={() => handlePrice(item.price)}
                            >
                                <span>{item.price}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Kích thước màn hình</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_screen, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_screen &&
                                typeof item.infor_product_infor_product.infor_screen === 'string' &&
                                item.infor_product_infor_product.infor_screen.trim() !== ''
                            )
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_screen}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.size, item.infor_product_infor_product.infor_screen) ? 'primary' : 'default'}
                                    onClick={() => handleSelectSize(item.infor_product_infor_product.infor_screen)}
                                >
                                    <span>{item.infor_product_infor_product.infor_screen}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Tần số quét</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_scanning_frequency, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_scanning_frequency &&
                                typeof item.infor_product_infor_product.infor_scanning_frequency === 'string' &&
                                item.infor_product_infor_product.infor_scanning_frequency.trim() !== ''
                            )
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_scanning_frequency}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.refreshRate, item.infor_product_infor_product.infor_scanning_frequency) ? 'primary' : 'default'}
                                    onClick={() => handleSelectRate(item.infor_product_infor_product.infor_scanning_frequency)}
                                >
                                    <span>{item.infor_product_infor_product.infor_scanning_frequency}</span>
                                </Button>
                            ))
                        }

                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">RAM</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_ram, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_ram &&
                                typeof item.infor_product_infor_product.infor_ram === 'string' &&
                                item.infor_product_infor_product.infor_ram.trim() !== ''
                            )
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_ram}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.ram, item.infor_product_infor_product.infor_ram) ? 'primary' : 'default'}
                                    onClick={() => handleSelectRam(item.infor_product_infor_product.infor_ram)}
                                >
                                    <span>{item.infor_product_infor_product.infor_ram}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Bộ nhớ trong</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_rom, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_rom &&
                                typeof item.infor_product_infor_product.infor_rom === 'string' &&
                                item.infor_product_infor_product.infor_rom.trim() !== ''
                            )
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_rom}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.rom, item.infor_product_infor_product.infor_rom) ? 'primary' : 'default'}
                                    onClick={() => handleSelectRom(item.infor_product_infor_product.infor_rom)}
                                >
                                    <span>{item.infor_product_infor_product.infor_rom}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Chíp xử lý</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_cpu, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_cpu &&
                                typeof item.infor_product_infor_product.infor_cpu === 'string' &&
                                item.infor_product_infor_product.infor_cpu.trim() !== ''
                            )                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_cpu}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.cpu, item.infor_product_infor_product.infor_cpu) ? 'primary' : 'default'}
                                    onClick={() => handlecpu(item.infor_product_infor_product.infor_cpu)}
                                >
                                    <span>{item.infor_product_infor_product.infor_cpu}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className={`${dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`} >
                    <span className="font-bold mb-1">Dung lượng Pin</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_chip_battery, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_chip_battery &&
                                typeof item.infor_product_infor_product.infor_chip_battery === 'string' &&
                                item.infor_product_infor_product.infor_chip_battery.trim() !== ''
                            )                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_chip_battery}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.chip_battery, item.infor_product_infor_product.infor_chip_battery) ? 'primary' : 'default'}
                                    onClick={() => handlechip_battery(item.infor_product_infor_product.infor_chip_battery)}
                                >
                                    <span>{item.infor_product_infor_product.infor_chip_battery}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>


                <div className={`${dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Camera trước</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_frontCamera, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_frontCamera &&
                                typeof item.infor_product_infor_product.infor_frontCamera === 'string' &&
                                item.infor_product_infor_product.infor_frontCamera.trim() !== ''
                            )                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_frontCamera}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.frontCamera, item.infor_product_infor_product.infor_frontCamera) ? 'primary' : 'default'}
                                    onClick={() => handleFrontCameras(item.infor_product_infor_product.infor_frontCamera)}
                                >
                                    <span>{item.infor_product_infor_product.infor_frontCamera}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className={`${dataId != 2 && dataId != 3 && dataId != 4 && dataId != 5 && dataId != 6 && dataId != 7 ? 'visible' : 'hidden'} flex flex-col`}>
                    <span className="font-bold mb-1">Camera sau</span>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ...new Map(filteredProducts.map((item: any) => [item.infor_product_infor_product.infor_rearCamera, item])).values()
                        ]
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .filter((item: any) =>
                                item.infor_product_infor_product.infor_rearCamera &&
                                typeof item.infor_product_infor_product.infor_rearCamera === 'string' &&
                                item.infor_product_infor_product.infor_rearCamera.trim() !== ''
                            )                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((item: any) => (
                                <Button
                                    key={item.infor_product_infor_product.infor_rearCamera}
                                    className="min-w-[60px] h-[35px] flex justify-center items-center"
                                    type={isSelected(ObjFilter.rearCamera, item.infor_product_infor_product.infor_rearCamera) ? 'primary' : 'default'}
                                    onClick={() => handleRearCameras(item.infor_product_infor_product.infor_rearCamera)}
                                >
                                    <span>{item.infor_product_infor_product.infor_rearCamera}</span>
                                </Button>
                            ))
                        }
                    </div>
                </div>

                <div className="flex border-t-[1px] pt-6 flex-row justify-center items-center gap-[5px] col-span-3 mt-4">
                    <Button color='danger' onClick={() => RemoveClick(false)} className="min-w-[200px] h-[50px] flex justify-center items-center" variant="outlined">
                        <span>Bỏ chọn</span>
                    </Button>
                    <Button onClick={() => HandClick(true)} color='primary' className="min-w-[200px] h-[50px] flex justify-center items-center" variant="solid">
                        {Datafilter.length !== 0 ? <span>Hiện có {Datafilter.length} kết quả</span> : <span>Không có kết quả</span>}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default OptionSelected;