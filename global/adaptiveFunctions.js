import {
    Dimensions, PixelRatio
} from 'react-native';

const {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
} = Dimensions.get('window');

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get('screen');

const widthBaseScale = WINDOW_WIDTH / 360;
const heightBaseScale = WINDOW_HEIGHT / 800;

const widthBaseScaleS = SCREEN_WIDTH / 360;
const heightBaseScaleS = SCREEN_HEIGHT / 800;

function normalize(size, based = 'width') {
    const newSize = (based === 'height') ?
        size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

function normalizeS(size, based = 'width') {
    const newSize = (based === 'height') ?
        size * heightBaseScaleS : size * widthBaseScaleS;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const heightPixel = (size) => {
    return normalize(size, 'height');
};

const heightPixelS = (size) => {
    return normalizeS(size, 'height');
};

const fontPixel = (size) => {
    return heightPixel(size);
};

const fontPixelS = (size) => {
    return widthPixel(size);
};

const widthPixel = (size) => {
    return normalize(size, 'width');
};

const widthPixelS = (size) => {
    return normalizeS(size, 'width');
};

const pixelSizeVertical = (size) => {
    return heightPixel(size);
};

const pixelSizeVerticalS = (size) => {
    return heightPixelS(size);
};

const pixelSizeHorizontal = (size) => {
    return widthPixel(size);
};

const pixelSizeHorizontalS = (size) => {
    return widthPixelS(size);
};


export {
    widthPixel,
    widthPixelS,
    heightPixel,
    heightPixelS,
    fontPixel,
    fontPixelS,
    pixelSizeVertical,
    pixelSizeVerticalS,
    pixelSizeHorizontal,
    pixelSizeHorizontalS,
};