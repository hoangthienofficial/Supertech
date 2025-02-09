import React, { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import './css/customCss.css';
import { CiFilter } from 'react-icons/ci';

import { ObjFilterTypeinterface } from './DataFilter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getProductsThunk, setDatafilterSlice } from '../../../redux/product/product.slice';
import { getCatelogryDadByIdThunk } from '../../../redux/catelogry/catelogry.slice';
import Selected from './Selected';
import OptionSelected from './OptionSelected';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Filter(data: any) {



    const Navigate = useNavigate();
    const [ObjFilter, setObjFilter] = useState<ObjFilterTypeinterface>({
        company: '',
        price: [],
        size: [],
        refreshRate: [],
        ram: [],
        rom: [],
        frontCamera: [],
        rearCamera: [],
        system: [],
        cpu: [],
        chip_battery: [],
        
    });
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Company: string = data.data.catelogries.find((item: any) => item.category_id == data.data.dataCate.category);
        if (Company != undefined) {
            setObjFilter(prevState => ({ ...prevState, company: Company.category_name }));
        }
    }, [data.data.catelogries, data.data.dataCate.category])



    const handleChangeProduct = (company: string, id: number) => {
        console.log('id', id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const category = data.data.catelogries.find((item: any) =>
            item.category_name.toLowerCase() === company.toLowerCase() &&
            item.category_dad == id
        );
        console.log('CategoryId', category);
        if (category) {
            setObjFilter(prevState => ({ ...prevState, company: category.category_name }));
            Navigate(`/list-san-pham?category_dad=${category.category_dad}&category=${category.category_id}`);
        }
    };

    const handleSelectSize = (size: string) => {
        setObjFilter(prevState => ({ ...prevState, size: prevState?.size.includes(size) ? prevState.size : [...prevState.size, size] }));
    };

    const handlePrice = (price: string) => {
        setObjFilter(prevState => ({ ...prevState, price: prevState?.price.includes(price) ? prevState.price : [...prevState.price, price] }));

    };

    const handleSelectRate = (rate: string) => {
        setObjFilter(prevState => ({ ...prevState, refreshRate: prevState?.refreshRate.includes(rate) ? prevState.refreshRate : [...prevState.refreshRate, rate] }));

    };

    const handleSelectRam = (ram: string) => {
        setObjFilter(prevState => ({ ...prevState, ram: prevState?.ram.includes(ram) ? prevState.ram : [...prevState.ram, ram] }));

    };

    const handleSelectRom = (rom: string) => {
        setObjFilter(prevState => ({ ...prevState, rom: prevState?.rom.includes(rom) ? prevState.rom : [...prevState.rom, rom] }));

    };

    const handleFrontCameras = (front: string) => {
        setObjFilter(prevState => ({ ...prevState, frontCamera: prevState?.frontCamera.includes(front) ? prevState.frontCamera : [...prevState.frontCamera, front] }));

    };


    const handleRearCameras = (rear: string) => {
        setObjFilter(prevState => ({ ...prevState, rearCamera: prevState?.rearCamera.includes(rear) ? prevState.rearCamera : [...prevState.rearCamera, rear] }));
    };
    const handlesystem = (systemChose: string) => {
        setObjFilter(prevState => ({ ...prevState, system: prevState?.system.includes(systemChose) ? prevState.system : [...prevState.system, systemChose] }));
    };
    const handlecpu = (cpuChose: string) => {
        setObjFilter(prevState => ({ ...prevState, cpu: prevState?.cpu.includes(cpuChose) ? prevState.cpu : [...prevState.cpu, cpuChose] }));
    };
    const handlechip_battery = (chip_batteryChose: string) => {
        setObjFilter(prevState => ({ ...prevState, chip_battery: prevState?.chip_battery.includes(chip_batteryChose) ? prevState.chip_battery : [...prevState.chip_battery, chip_batteryChose] }));
    };
   






    const Deletefilter = (index: number, filter: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setObjFilter((prev: any) => {
            const newFilter = { ...prev };
            const filterKeys = [
                'price',
                'size',
                'ram',
                'rom',
                'frontCamera',
                'rearCamera',
                'cpu',
                'refreshRate',
                'system',
                'cpu',
                'chip_battery',
            ];

            filterKeys.forEach(key => {
                if (newFilter[key]) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newFilter[key] = newFilter[key].filter((item: any) => item !== filter);
                }
            });

            return newFilter;
        });
    };

    const [Datafilter, setDatafilter] = useState([]);

    const AppDispatch = useAppDispatch();
    useEffect(() => {
        AppDispatch(getCatelogryDadByIdThunk(data.data.dataCate.category_dad));
    }, [AppDispatch, data.data.dataCate.category_dad])

    useEffect(() => {
        AppDispatch(getProductsThunk())

    }, [AppDispatch, ObjFilter.company])




    const HandClick = (boolean: boolean) => {
        if (boolean == true) {

            AppDispatch(setDatafilterSlice(Datafilter))
            handleVisibleChange(false);
        }
    }
    const RemoveClick = (boolean: boolean) => {
        handleVisibleChange(false);
    }



    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Data = data.data.listProduct.filter((item: any) => {
            const PriceFilter = item.product_price;
            const screenSize = item.infor_product_infor_product.infor_screen?.toLowerCase();
            const ramFilter = item.infor_product_infor_product.infor_ram?.toUpperCase();
            const rateFilter = item.infor_product_infor_product.infor_scanning_frequency?.toUpperCase();
            const frontCameraFilter = item.infor_product_infor_product.infor_frontCamera?.toUpperCase();
            const rearCameraFilter = item.infor_product_infor_product.infor_rearCamera?.toUpperCase();
            const romFilter = item.infor_product_infor_product.infor_rom?.toUpperCase();
            const systemFilter = item.infor_product_infor_product.infor_system?.toUpperCase();
            const cpuFilter = item.infor_product_infor_product.infor_cpu?.toUpperCase();
            const chip_batteryFilter = item.infor_product_infor_product.infor_chip_battery?.toUpperCase();



            const conditions = [
                ObjFilter.price.length === 0 || ObjFilter.price.some(priceRange => {
                    switch (priceRange) {
                        case 'Dưới 5 triệu':
                            return PriceFilter < 5000000;
                        case 'Dưới 10 triệu':
                            return PriceFilter < 10000000;
                        case 'Dưới 20 triệu':
                            return PriceFilter < 20000000;
                        case 'Dưới 30 triệu':
                            return PriceFilter < 30000000;
                        case 'Trên 30 triệu':
                            return PriceFilter > 30000000;
                        default:
                            return true;
                    }
                }),
                ObjFilter.size.length === 0 || ObjFilter.size.some(size => screenSize === size.toLowerCase()),
                ObjFilter.ram.length === 0 || ObjFilter.ram.some(ram => ramFilter === ram.toUpperCase()),
                ObjFilter.rom.length === 0 || ObjFilter.rom.some(rom => romFilter === rom.toUpperCase()),
                ObjFilter.refreshRate.length === 0 || ObjFilter.refreshRate.some(refreshRate => rateFilter === refreshRate.toUpperCase()),
                ObjFilter.frontCamera.length === 0 || ObjFilter.frontCamera.some(frontCamera => frontCameraFilter === frontCamera.toUpperCase()),
                ObjFilter.rearCamera.length === 0 || ObjFilter.rearCamera.some(rearCamera => rearCameraFilter === rearCamera.toUpperCase()),
                ObjFilter.system.length === 0 || ObjFilter.system.some(system => systemFilter === system.toUpperCase()),
                ObjFilter.cpu.length === 0 || ObjFilter.cpu.some(cpu => cpuFilter === cpu.toUpperCase()),
                ObjFilter.chip_battery.length === 0 || ObjFilter.chip_battery.some(chip_battery => chip_batteryFilter === chip_battery.toUpperCase()),


            ];

            return conditions.every(condition => condition);
        });

        setDatafilter(Data);



    }, [data, ObjFilter]);

    const [open, setopen] = useState(false);
    const handleVisibleChange = (event: boolean) => {
        setopen(event);
    };


    return (
        <Popover open={open} placement="bottomLeft" trigger={'click'}
            title={<Selected

                Deletefilter={Deletefilter}
                ObjFilter={ObjFilter}
            />}
            content={<OptionSelected
                Datafilter={Datafilter}
                handleChangeProduct={handleChangeProduct}
                handleSelectSize={handleSelectSize}
                handlePrice={handlePrice}
                handleSelectRate={handleSelectRate}
                handleSelectRam={handleSelectRam}
                handleSelectRom={handleSelectRom}
                handleFrontCameras={handleFrontCameras}
                handleRearCameras={handleRearCameras}
                HandClick={HandClick}
                RemoveClick={RemoveClick}
                ObjFilter={ObjFilter}
                dataId={data.data.dataCate.category_dad}
                handlesystem={handlesystem}
                handlecpu={handlecpu}
                handlechip_battery={handlechip_battery}



            />

            }>
            <Button onClick={() => handleVisibleChange(!open)} className='text-[17px] font-bold'>
                <CiFilter />
                <span>Lọc</span>
            </Button>
        </Popover >



    )
}

export default Filter