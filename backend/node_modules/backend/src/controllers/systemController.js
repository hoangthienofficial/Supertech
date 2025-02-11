import si from 'systeminformation';
import { io } from '../socker/socker.js';

export const getSystemInfo = async (req, res) => {
  try {
    const cpuData = await si.cpu();
    const memData = await si.mem();
    const cpuInfo = {
      manufacturer: cpuData.manufacturer,
      brand: cpuData.brand,
      speed: cpuData.speed,
      cores: cpuData.cores,
    };
    res.json({
      cpu: cpuInfo,
      memory: {
        total: memData.total,
        used: memData.used,
        free: memData.free,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching system information' });
  }
};