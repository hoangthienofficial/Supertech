
import React from 'react';
import { ObjFilterTypeinterface } from './DataFilter';
import { Button } from 'antd';
import { IoAddOutline } from 'react-icons/io5';

interface SelectedProps {
    Deletefilter: (index: number, filter: string) => void;
    ObjFilter: ObjFilterTypeinterface;
}

const Selected: React.FC<SelectedProps> = ({ Deletefilter, ObjFilter }) => {
    console.log(ObjFilter)

    const ArrayFilter = (item: string[]) => {
        return item.map((filter, index) => (
            <Button
                key={index}  // sử dụng index làm key, nếu `filter` không có giá trị unique
                className='min-w-[70px] h-[40px] flex justify-center items-center'
                variant="outlined"
            >
                <span>{filter.replace(/<p>|<\/p>/g, '')}</span>
                <IoAddOutline
                    onClick={() => Deletefilter(index, filter)} // Đảm bảo `Deletefilter` xử lý đúng
                    className='transform transition-all duration-500 hover:text-[red] text-[25px] rotate-[45deg]'
                />
            </Button>
        ));
    }

    const NotaArray = (key: number, item: string) => {
        return (
            <Button
                key={key}
                className='min-w-[70px] h-[40px] flex justify-center items-center'
                variant="outlined"
            >

                <span>{item}</span>

            </Button>
        )
    }

    return (
        <div className='flex flex-wrap gap-[10px] text-[17px] justify-start items-center'>
            <span>Đã Chọn :</span>
            {Object.entries(ObjFilter).map(([key, item]) => (
                (key === 'more' && typeof item === 'string')
                    ? item.replace(/<p>|<\/p>/g, '')
                    : (Array.isArray(item) ? ArrayFilter(item) : NotaArray(Number(key), item))
            ))}
        </div>
    );
};

export default Selected;
