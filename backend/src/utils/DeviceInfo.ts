import { UAParser } from "ua-parser-js";

interface DeviceInfoInput {
  userAgent?: string;
  ipAddress?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface DeviceInfo {
  deviceName: string;
  ipAddress: string | null;
  os: string;
  browser: string;
  latitude: number | null;
  longitude: number | null;
}

const getDeviceInfo = ({
  userAgent,
  ipAddress,
  latitude,
  longitude,
}: DeviceInfoInput): DeviceInfo => {
  const parser = new UAParser(userAgent || "");

  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  const deviceName =
    device.model ||
    device.type ||
    "Unknown Device";

  const osName = os.name
    ? `${os.name}${os.version ? ` ${os.version}` : ""}`
    : "Unknown OS";

  const browserName = browser.name
    ? `${browser.name}${browser.version ? ` ${browser.version}` : ""}`
    : "Unknown Browser";

  return {
    deviceName,
    ipAddress: ipAddress || null,
    os: osName,
    browser: browserName,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
  };
};

export default getDeviceInfo;