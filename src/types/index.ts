export type PrivacyScore = {
  category: string;
  score: number;
  icon: any;
  recommendations: string[];
};

export type DataBroker = {
  name: string;
  dataFound: boolean;
  dataTypes: string[];
  optOutUrl: string;
};

export type SocialMediaPlatform = {
  name: string;
  privacyIssues: string[];
  recommendations: string[];
};

export interface BrowserFingerprint {
  userAgent: {
    browser: string;
    version: string;
    os: string;
    device: string;
  };
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    pixelRatio: number;
    availWidth: number;
    availHeight: number;
    orientation: string;
  };
  languages: string[];
  timezone: {
    zone: string;
    offset: number;
  };
  webgl: {
    vendor: string;
    renderer: string;
    parameters: Record<string, any>;
  };
  canvas: {
    hash: string;
    textApi: string;
    emojiHash: string;
  };
  fonts: string[];
  audio: {
    sampleRate: number;
    channels: number;
    state: string;
    fingerprint: string;
  };
  plugins: {
    name: string;
    description: string;
    filename: string;
  }[];
  doNotTrack: boolean;
  cookiesEnabled: boolean;
  uniqueness: number;
  connection: {
    downlink: number;
    effectiveType: string;
    rtt: number;
    saveData: boolean;
  };
  media: {
    videoFormats: string[];
    audioFormats: string[];
  };
  hardware: {
    cores: number;
    memory: number;
    architecture: string;
    gpu: string;
  };
  battery: {
    charging: boolean;
    level: number;
    chargingTime: number;
    dischargingTime: number;
  } | null;
  touchSupport: {
    maxTouchPoints: number;
    touchEvent: boolean;
    touchStart: boolean;
  };
}