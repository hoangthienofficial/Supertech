import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { axiosWithAuth } from '../../service/axios.config';
export const handleExport = async (data:any) => {
    try {
     
  

      
        const response=await  axios.post(
            'http://localhost:8080/export-excel',
            { data },
            { responseType: 'blob' } // Quan trọng để nhận file nhị phân
            
  
    )
        // Tạo file tải về
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'data.xlsx');
    } catch (error) {
        console.error('Error exporting Excel:', error);
    }
};
export const handleExportPdf = async (data: any) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/export-pdf',
            { data },
            { responseType: 'blob' } // Quan trọng để nhận file nhị phân
        );

        // Tạo file tải về
        const blob = new Blob([response.data], {
            type: 'application/pdf',
        });
        saveAs(blob, 'data.pdf'); // Tải file PDF về
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
};