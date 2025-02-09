/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DataSideBar } from './Data_Url_Title';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import LogoDoc from '../../../assets/LogoSuperTech.png';
import LogoNgang from '../../../assets/LogoSuperTechNgang.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setNofiReducer } from '../../../redux/admin/component/Nofi';

function AdminSideBar() {
    const [openBoxIndex, setOpenBoxIndex] = useState(1);
    const [openBoxChild, setBoxChild] = useState(null);
    const [openChildIndex, setOpenChildIndex] = useState(1);

    const socket = useAppSelector((state) => state.socket.socket);
    const dispatch = useAppDispatch();
    const nofiList = useAppSelector((state) => state.nofi.isNofi);

    useEffect(() => {
        if (socket) {
            socket.on('low_stock_warning', (post: any) => {
                const commentNofiNew = [post, ...nofiList];
                dispatch(setNofiReducer(commentNofiNew));
            });
        }

        return () => {
            if (socket) {
                socket.off('low_stock_warning');
            }
        };
    }, [socket, nofiList, dispatch]);

    // Toggle main boxes
    function toggleBox(boxId: any, box_id: any) {
        setOpenBoxIndex(openBoxIndex === boxId ? boxId : boxId);
        setBoxChild(openBoxChild === box_id ? box_id : box_id);
    }

    // Toggle child boxes
    function toggleChild(ChildId: any) {
        setOpenChildIndex(openChildIndex === ChildId ? ChildId : ChildId);
    }

    const isOpen = useSelector((state: any) => state.toggleSidebar.isOpen);

    return (
        <div
            className={`z-10 transition-width duration-300 box-border ${
                isOpen ? 'w-[310px]' : 'w-[60px]'
            } static h-full text-[#8b8b8b85] bg-[white] overflow-y-auto scrollbar-custom`}
        >
            {/* Logo */}
            <div className="text-[30px] font-extrabold h-[90px] box-border flex flex-col justify-center items-center gap-3">
                {isOpen ? (
                    <img className="object-cover h-[70px]" src={LogoNgang} alt="" />
                ) : (
                    <img className="w-[70px] object-cover h-[70px]" src={LogoDoc} alt="" />
                )}
            </div>

            {/* Sidebar Items */}
            {DataSideBar.map((item, i) => (
                <div key={i} className="px-[6px] grid grid-cols-1 box-border">
                    {Array.isArray(item.box) &&
                        item.box.map((box, j) => (
                            <Link to={box.url} key={j}>
                                <div className="grid py-[15px] grid-cols-1 box-border justify-center items-start auto-rows-auto">
                                    <div
                                        onClick={() => toggleBox(item.id, box.box_id)}
                                        className={`transition-all ${
                                            item.box.length > 1
                                                ? openBoxIndex === item.id
                                                    ? openBoxChild === box.box_id
                                                        ? 'bg-[#c345feb1] text-[white] duration-700'
                                                        : 'duration-[500ms]'
                                                    : ''
                                                : openBoxIndex === item.id
                                                ? 'bg-[#c345feb1] text-[white]'
                                                : 'duration-[500ms]'
                                        } flex items-center box-border w-full h-[46px] rounded cursor-pointer`}
                                    >
                                        <span className="ml-[12px] text-[25px]">
                                            {box.icon}
                                        </span>
                                        <span
                                            className={`ml-[12px] font-medium text-[14px] ${
                                                isOpen ? 'block' : 'hidden'
                                            } `}
                                        >
                                            {box.box_title}
                                        </span>
                                        {box.iconChevronRight && (
                                            <span
                                                className={`transition-all ${
                                                    isOpen ? 'block' : 'hidden'
                                                } text-[15px] ${
                                                    openBoxIndex === item.id
                                                        ? 'transform rotate-90 duration-500 text-white'
                                                        : 'transform rotate-0 duration-500'
                                                } ml-[104px]`}
                                            >
                                                {box.iconChevronRight}
                                            </span>
                                        )}
                                    </div>
                                    {Array.isArray(box.child) && (
                                        <div
                                            className={`transition-all overflow-hidden cursor-pointer ${
                                                openBoxIndex === item.id
                                                    ? 'max-h-screen duration-1000'
                                                    : 'max-h-0 duration-[600ms]'
                                            }`}
                                        >
                                            {box.child.map((child, k) => (
                                                <Link to={child.url_child} key={k}>
                                                    <div
                                                        onClick={() =>
                                                            toggleChild(child.id_child)
                                                        }
                                                        className={`${
                                                            openChildIndex === child.id_child
                                                                ? 'bg-[#c345feb1] text-[white]'
                                                                : 'duration-[500ms]'
                                                        } w-full h-[46px] box-border flex items-center`}
                                                    >
                                                        <span
                                                            className={`${
                                                                isOpen
                                                                    ? 'ml-[42px]'
                                                                    : 'ml-[12px]'
                                                            }  text-[24px]`}
                                                        >
                                                            {child.icon_child}
                                                        </span>
                                                        <span
                                                            className={`ml-[12px] text-[15px] font-medium ${
                                                                isOpen ? 'block' : 'hidden'
                                                            }`}
                                                        >
                                                            {child.title_child}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                </div>
            ))}

        
        </div>
    );
}

export default AdminSideBar;