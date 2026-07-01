import { LOCATION_ADDRESS, LOCATION_PHONE } from "@/data/locationTransport";

export const INQUIRY_PHONE = LOCATION_PHONE;
export const INQUIRY_PHONE_HREF = `tel:${LOCATION_PHONE.replace(/-/g, "")}`;
export const INQUIRY_ADDRESS = LOCATION_ADDRESS;
export const INQUIRY_CONSULT_HOURS = "09:00 - 18:00";
export const INQUIRY_OPERATION_HOURS = "10:30 - 22:00 (연중무휴)";
