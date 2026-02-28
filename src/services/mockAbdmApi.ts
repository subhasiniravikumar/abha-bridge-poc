// Mock ABDM API service - simulates sandbox responses

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let mockTxnId = "";

export async function generateOtp(aadhaar: string): Promise<{ success: boolean; txnId?: string; error?: string }> {
  await delay(1500);
  
  if (!/^\d{12}$/.test(aadhaar)) {
    return { success: false, error: "Invalid Aadhaar number. Must be 12 digits." };
  }

  mockTxnId = "txn_" + Math.random().toString(36).substring(2, 15);
  
  return {
    success: true,
    txnId: mockTxnId,
  };
}

export async function verifyOtpAndCreateAbha(
  otp: string,
  txnId: string
): Promise<{
  success: boolean;
  data?: {
    abhaNumber: string;
    abhaAddress: string;
    name: string;
    gender: string;
    dob: string;
  };
  rawResponse?: object;
  error?: string;
}> {
  await delay(2000);

  if (otp.length !== 6) {
    return { success: false, error: "Invalid OTP. Must be 6 digits." };
  }

  const abhaNumber = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const rawResponse = {
    txnId,
    ABHANumber: abhaNumber,
    ABHAAddress: "testuser@abdm",
    preferredAbhaAddress: "testuser@abdm",
    name: "Rajesh Kumar",
    gender: "M",
    yearOfBirth: "1990",
    monthOfBirth: "06",
    dayOfBirth: "15",
    mobile: "9876XXXX21",
    email: "r***@email.com",
    healthIdNumber: abhaNumber,
    token: "eyJhbG...mocktoken",
    refreshToken: "eyJhbG...mockrefresh",
    new: true,
    status: "ACTIVE",
    authMethods: ["AADHAAR_OTP", "MOBILE_OTP"],
  };

  return {
    success: true,
    data: {
      abhaNumber,
      abhaAddress: "testuser@abdm",
      name: "Rajesh Kumar",
      gender: "Male",
      dob: "15-06-1990",
    },
    rawResponse,
  };
}

export async function verifyAbha(
  abhaId: string
): Promise<{
  success: boolean;
  data?: {
    abhaNumber: string;
    name: string;
    gender: string;
    dob: string;
    mobile: string;
    state: string;
    district: string;
    photo?: string;
  };
  rawResponse?: object;
  error?: string;
}> {
  await delay(1800);

  if (!abhaId || abhaId.length < 5) {
    return { success: false, error: "Invalid ABHA Number or Address." };
  }

  const rawResponse = {
    healthIdNumber: "91-4832-7291-6543",
    healthId: "testuser@abdm",
    name: "Rajesh Kumar",
    gender: "M",
    yearOfBirth: "1990",
    monthOfBirth: "06",
    dayOfBirth: "15",
    mobile: "9876XXXX21",
    stateCode: "27",
    stateName: "Maharashtra",
    districtCode: "401",
    districtName: "Mumbai",
    status: "ACTIVE",
    profilePhoto: null,
    kycVerified: true,
    authMethods: ["AADHAAR_OTP", "MOBILE_OTP"],
  };

  return {
    success: true,
    data: {
      abhaNumber: "91-4832-7291-6543",
      name: "Rajesh Kumar",
      gender: "Male",
      dob: "15-06-1990",
      mobile: "9876XXXX21",
      state: "Maharashtra",
      district: "Mumbai",
    },
    rawResponse,
  };
}

export function loginAdmin(username: string, password: string): boolean {
  return username === "admin" && password === "password123";
}
