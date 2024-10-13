import * as PIXI from 'pixi.js';
import QrCodeWithLogo from 'qrcode-with-logos';
import { type FormData } from './form';

let app: PIXI.Application,
  name: PIXI.Text,
  furigana: PIXI.Text,
  company: PIXI.Text,
  position: PIXI.Text,
  email: PIXI.Text,
  phone: PIXI.Text,
  address: PIXI.Text,
  website: PIXI.Text,
  twitter: PIXI.Text,
  fediverse: PIXI.Text,
  facebook: PIXI.Text,
  instagram: PIXI.Text,
  companyIcon: PIXI.Sprite,
  positionIcon: PIXI.Sprite,
  emailIcon: PIXI.Sprite,
  phoneIcon: PIXI.Sprite,
  addressIcon: PIXI.Sprite,
  websiteIcon: PIXI.Sprite,
  twitterIcon: PIXI.Sprite,
  fediverseIcon: PIXI.Sprite,
  facebookIcon: PIXI.Sprite,
  instagramIcon: PIXI.Sprite,
  qrCode: PIXI.Sprite,
  iconData: PIXI.Texture;

const detailsFontSize = 100;

const settings = {
  landscape: {
    width: 2730,
    height: 1650,
    name: { x: 100, y: 100 },
    details: { x: 200, by: 1600 },
    qrCode: { x: 1830, y: 730, width: 900 },
  },
  portrait: {
    height: 2730,
    width: 1650,
    name: { x: 50, y: 100 },
    details: { x: 150, by: 1800 },
    qrCode: { x: 750, y: 1810, width: 900 },
  },
};

const createText = (style: Partial<PIXI.TextStyle>) =>
  new PIXI.Text({
    style: {
      fontFamily: 'IBM Plex Sans JP',
      fill: '#000',
      align: 'left',
      ...style,
    },
  });
const createSprite = () =>
  new PIXI.Sprite({ width: detailsFontSize, height: detailsFontSize });

const createCard = async () => {
  app = new PIXI.Application();
  await app.init({
    width: 0,
    height: 0,
    backgroundColor: '#ffffffff',
    preserveDrawingBuffer: true,
  });
  document.querySelector('#card')?.appendChild(app.canvas);

  name = createText({ fontWeight: 'bold' });
  furigana = createText({ fontWeight: 'lighter' });
  company = createText({ fontSize: detailsFontSize });
  position = createText({ fontSize: detailsFontSize });
  email = createText({ fontSize: detailsFontSize });
  phone = createText({ fontSize: detailsFontSize });
  address = createText({ fontSize: detailsFontSize });
  website = createText({ fontSize: detailsFontSize });
  twitter = createText({ fontSize: detailsFontSize });
  fediverse = createText({ fontSize: detailsFontSize });
  facebook = createText({ fontSize: detailsFontSize });
  instagram = createText({ fontSize: detailsFontSize });

  companyIcon = createSprite();
  positionIcon = createSprite();
  emailIcon = createSprite();
  phoneIcon = createSprite();
  addressIcon = createSprite();
  websiteIcon = createSprite();
  twitterIcon = createSprite();
  fediverseIcon = createSprite();
  facebookIcon = createSprite();
  instagramIcon = createSprite();
  qrCode = new PIXI.Sprite();

  app.stage.addChild(
    name,
    furigana,
    company,
    position,
    email,
    phone,
    address,
    website,
    twitter,
    fediverse,
    facebook,
    instagram,
    companyIcon,
    positionIcon,
    emailIcon,
    phoneIcon,
    addressIcon,
    websiteIcon,
    twitterIcon,
    fediverseIcon,
    facebookIcon,
    instagramIcon,
    qrCode
  );

  const assets = [
    { alias: 'company', src: './ph/building-office.png' },
    { alias: 'position', src: './ph/briefcase.png' },
    { alias: 'email', src: './ph/envelope.png' },
    { alias: 'phone', src: './ph/phone.png' },
    { alias: 'address', src: './ph/map-pin.png' },
    { alias: 'website', src: './ph/globe.png' },
    { alias: 'twitter', src: './ph/x-logo.png' },
    { alias: 'fediverse', src: './ph/fediverse-logo.png' },
    { alias: 'facebook', src: './ph/facebook-logo.png' },
    { alias: 'instagram', src: './ph/instagram-logo.png' },
  ];

  assets.forEach((asset) => PIXI.Assets.add(asset));
};

const setTextAndIcon = async (
  textObj: PIXI.Text,
  iconObj: PIXI.Sprite,
  formDataValue: string,
  iconAlias: string,
  detailsX: number,
  detailsBy: number
) => {
  if (formDataValue) {
    textObj.text = formDataValue;
    textObj.x = detailsX;
    textObj.y = detailsBy - textObj.height;
    iconData = await PIXI.Assets.load(iconAlias);
    if (iconData) {
      iconObj.texture = iconData;
      iconObj.x = detailsX - detailsFontSize * 1.2;
      iconObj.y = detailsBy - detailsFontSize;
    }
    return detailsBy - textObj.height;
  } else {
    iconObj.texture = PIXI.Texture.EMPTY;
    textObj.text = '';
    return detailsBy;
  }
};

export const drawCard = async (formData: FormData) => {
  if (!app) await createCard();

  const { width, height } = settings[formData.orientation];
  app.renderer.resize(width, height);

  name.x = settings[formData.orientation].name.x;
  name.y = settings[formData.orientation].name.y;
  name.style.fontSize = formData.name.fontSize;
  name.text = formData.name.text;

  furigana.x = settings[formData.orientation].name.x;
  furigana.y = name.y + name.height;
  furigana.style.fontSize = formData.furigana.fontSize;
  furigana.text = formData.furigana.text;

  let detailsX = settings[formData.orientation].details.x;
  let detailsBy = settings[formData.orientation].details.by;

  detailsBy = await setTextAndIcon(
    instagram,
    instagramIcon,
    formData.instagram,
    'instagram',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    facebook,
    facebookIcon,
    formData.facebook,
    'facebook',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    fediverse,
    fediverseIcon,
    formData.fediverse,
    'fediverse',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    twitter,
    twitterIcon,
    formData.twitter,
    'twitter',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    website,
    websiteIcon,
    formData.website,
    'website',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    address,
    addressIcon,
    formData.address,
    'address',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    phone,
    phoneIcon,
    formData.phone,
    'phone',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    email,
    emailIcon,
    formData.email,
    'email',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    position,
    positionIcon,
    formData.position,
    'position',
    detailsX,
    detailsBy
  );
  detailsBy = await setTextAndIcon(
    company,
    companyIcon,
    formData.company,
    'company',
    detailsX,
    detailsBy
  );

  if (formData.website) {
    const file = formData.avatar[0];
    let base64Image = '';
    if (file) {
      base64Image = await file
        .arrayBuffer()
        .then(
          (buffer) =>
            `data:${file.type};base64,${btoa(
              String.fromCharCode(...new Uint8Array(buffer))
            )}`
        );
    }
    const qrGenerator = new QrCodeWithLogo({
      content: formData.website,
      width: settings[formData.orientation].qrCode.width,
      logo: base64Image ? { src: base64Image } : undefined,
      nodeQrCodeOptions: { margin: 50, errorCorrectionLevel: 'H' },
      dotsOptions: { type: 'fluid', color: formData.yourcolor },
      cornersOptions: { type: 'circle', color: formData.yourcolor },
    });
    const qrCanvas = await qrGenerator.getCanvas();
    qrCode.texture = PIXI.Texture.from(qrCanvas);
    qrCode.x = settings[formData.orientation].qrCode.x;
    qrCode.y = settings[formData.orientation].qrCode.y;
    qrCode.width = settings[formData.orientation].qrCode.width;
    qrCode.height = settings[formData.orientation].qrCode.width;
  } else {
    qrCode.texture = PIXI.Texture.EMPTY;
  }
};

export const downloadCard = async () => {
  const base64 = app.canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'card.png';
  link.href = base64;
  link.click();
};
