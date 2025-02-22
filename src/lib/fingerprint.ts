import { UAParser } from 'ua-parser-js';

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

export async function getBrowserFingerprint(): Promise<BrowserFingerprint> {
  const parser = new UAParser();
  const ua = parser.getResult();

  // Get WebGL info with extended parameters
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const webglInfo = {
    vendor: '',
    renderer: '',
    parameters: {}
  };
  
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      webglInfo.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      webglInfo.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      
      // Get additional WebGL parameters
      const parameters = [
        'MAX_VERTEX_UNIFORM_VECTORS',
        'MAX_VARYING_VECTORS',
        'MAX_TEXTURE_IMAGE_UNITS',
        'MAX_VERTEX_ATTRIBS',
        'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
        'MAX_FRAGMENT_UNIFORM_VECTORS',
        'ALIASED_LINE_WIDTH_RANGE',
        'ALIASED_POINT_SIZE_RANGE'
      ];
      
      parameters.forEach(param => {
        try {
          webglInfo.parameters[param] = gl.getParameter(gl[param]);
        } catch (e) {
          console.warn(`Failed to get WebGL parameter: ${param}`);
        }
      });
    }
  }

  // Enhanced canvas fingerprinting
  const canvasFingerprint = {
    hash: '',
    textApi: '',
    emojiHash: ''
  };

  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Standard text rendering
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Privacy Guard', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Fingerprint', 4, 17);
    canvasFingerprint.hash = canvas.toDataURL();

    // Text rendering API test
    const text = '👨‍👩‍👧‍👦 Lorem ipsum 123 !@#$%';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Arial';
    ctx.fillText(text, 0, 0);
    canvasFingerprint.textApi = canvas.toDataURL();

    // Emoji rendering test
    const emojis = '😀🤔🌍🎨🔒💻🌈';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Arial';
    ctx.fillText(emojis, 0, 0);
    canvasFingerprint.emojiHash = canvas.toDataURL();
  }

  // Enhanced audio fingerprinting
  let audioContext: AudioContext | null = null;
  let audioInfo = {
    sampleRate: 0,
    channels: 0,
    state: 'unsupported',
    fingerprint: ''
  };

  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      oscillator.connect(analyser);
      
      const dataArray = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(dataArray);
      
      audioInfo = {
        sampleRate: audioContext.sampleRate,
        channels: audioContext.destination.channelCount,
        state: audioContext.state,
        fingerprint: dataArray.slice(0, 10).join(',') // First 10 frequency values
      };
      
      audioContext.close();
    }
  } catch (e) {
    console.error('Audio fingerprinting failed:', e);
  }

  // Get media format support
  const mediaFormats = {
    videoFormats: [],
    audioFormats: []
  };

  const videoTypes = [
    'video/mp4; codecs="avc1.42E01E"',
    'video/webm; codecs="vp8, vorbis"',
    'video/webm; codecs="vp9"',
    'video/ogg; codecs="theora"'
  ];

  const audioTypes = [
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/m4a',
    'audio/aac'
  ];

  videoTypes.forEach(type => {
    if (MediaSource && MediaSource.isTypeSupported(type)) {
      mediaFormats.videoFormats.push(type);
    }
  });

  audioTypes.forEach(type => {
    const audio = document.createElement('audio');
    if (audio.canPlayType(type)) {
      mediaFormats.audioFormats.push(type);
    }
  });

  // Get available fonts
  const fontList = await new Promise<string[]>((resolve) => {
    if ('queryLocalFonts' in window) {
      (window as any).queryLocalFonts()
        .then((fonts: any[]) => resolve(fonts.map(f => f.family)))
        .catch(() => resolve([]));
    } else {
      resolve([]);
    }
  });

  // Get battery info
  let batteryInfo = null;
  try {
    if ('getBattery' in navigator) {
      const battery: any = await (navigator as any).getBattery();
      batteryInfo = {
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    }
  } catch (e) {
    console.warn('Battery API not supported');
  }

  // Get connection info
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionInfo = {
    downlink: connection?.downlink || 0,
    effectiveType: connection?.effectiveType || 'unknown',
    rtt: connection?.rtt || 0,
    saveData: connection?.saveData || false
  };

  // Calculate uniqueness score (enhanced version)
  const uniquenessFactors = [
    ua.browser.name + ua.browser.version,
    ua.os.name + ua.os.version,
    screen.width + 'x' + screen.height,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    webglInfo.renderer,
    canvasFingerprint.hash,
    audioInfo.fingerprint,
    fontList.length,
    batteryInfo?.level,
    connectionInfo.effectiveType,
    mediaFormats.videoFormats.length,
    mediaFormats.audioFormats.length
  ];

  const uniqueness = uniquenessFactors.reduce((acc, factor) => {
    return acc + (factor ? 1 : 0);
  }, 0) / uniquenessFactors.length * 100;

  return {
    userAgent: {
      browser: ua.browser.name || 'Unknown',
      version: ua.browser.version || 'Unknown',
      os: ua.os.name || 'Unknown',
      device: ua.device.type || 'desktop'
    },
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      orientation: screen.orientation?.type || 'unknown'
    },
    languages: navigator.languages,
    timezone: {
      zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      offset: new Date().getTimezoneOffset()
    },
    webgl: webglInfo,
    canvas: canvasFingerprint,
    fonts: fontList,
    audio: audioInfo,
    plugins: Array.from(navigator.plugins).map(p => ({
      name: p.name,
      description: p.description,
      filename: p.filename
    })),
    doNotTrack: navigator.doNotTrack === '1',
    cookiesEnabled: navigator.cookieEnabled,
    uniqueness,
    connection: connectionInfo,
    media: mediaFormats,
    hardware: {
      cores: navigator.hardwareConcurrency || 0,
      memory: (navigator as any).deviceMemory || 0,
      architecture: ua.cpu.architecture || 'unknown',
      gpu: webglInfo.renderer
    },
    battery: batteryInfo,
    touchSupport: {
      maxTouchPoints: navigator.maxTouchPoints || 0,
      touchEvent: 'TouchEvent' in window,
      touchStart: 'ontouchstart' in window
    }
  };
}