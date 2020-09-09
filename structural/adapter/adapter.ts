interface iOS{
  useLightning();
}

interface Android{
  useUSBC();
}

class iPhoneXR implements iOS {
  useLightning() {
    console.log('Using Lightning port');
  }
}

class XiaomiMi9 implements Android {
  useUSBC() {
    console.log('Using USB-C');
  }
}

class LightningToUSBCAdapter implements Android {
  iphoneDevice: iOS;

  constructor(iphone: iOS) {
    this.iphoneDevice = iphone;
  }

  useUSBC() {
    console.log('Converting to USB-C');
    this.iphoneDevice.useLightning();
  }
}

class USBCtoLightningAdapter implements iOS {
  xiaomiDevice : Android

  constructor(xiaomi : Android) {
    this.xiaomiDevice = xiaomi
  }

  useLightning() {
    console.log('Converting to Lightning');
    this.xiaomiDevice.useUSBC();
  }
}

console.log('*** IPHONE USING ADAPTER ***');
let iphone = new iPhoneXR();
let chargeAdaptorForIphone = new LightningToUSBCAdapter(iphone);
chargeAdaptorForIphone.useUSBC();

console.log('*** XIAOMI USING ADAPTER ***');
let xiaomi = new XiaomiMi9();
let chargeAdaptorForXiaomi = new USBCtoLightningAdapter(xiaomi);
chargeAdaptorForXiaomi.useLightning();