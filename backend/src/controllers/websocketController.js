// backend/src/controllers/websocketController.js
import WebSocket from 'ws';
import si from 'systeminformation'; // Import thư viện systeminformation

export const setupWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Một client đã kết nối');

        // Gửi thông tin hệ thống mỗi giây
        const sendSystemInfo = async () => {
            try {
                const cpuData = await si.cpu();
                const memData = await si.mem();
                const systemInfo = {
                    cpu: {
                        brand: cpuData.brand,
                        manufacturer: cpuData.manufacturer,
                        speed: cpuData.speed,
                        cores: cpuData.cores,
                    },
                    memory: {
                        total: memData.total,
                        used: memData.used,
                        free: memData.free,
                    },
                    timestamp: new Date().toISOString(),
                };
                ws.send(JSON.stringify(systemInfo));
            } catch (error) {
                console.error('Lỗi khi lấy thông tin hệ thống:', error);
            }
        };

        const interval = setInterval(sendSystemInfo, 1000); // Gửi thông tin mỗi giây

        ws.on('close', () => {
            clearInterval(interval);
            console.log('Client đã ngắt kết nối');
        });
    });
};