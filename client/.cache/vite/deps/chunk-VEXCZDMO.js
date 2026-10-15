import {
  require_react
} from "./chunk-2MONDW76.js";
import {
  __toESM
} from "./chunk-PX6F3LHL.js";

// node_modules/react-stately/dist/private/form/useFormValidationState.mjs
var import_react = __toESM(require_react(), 1);
var $fd2148440a13ec26$export$aca958c65c314e6c = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true
};
var $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE = {
  ...$fd2148440a13ec26$export$aca958c65c314e6c,
  customError: true,
  valid: false
};
var $fd2148440a13ec26$export$dad6ae84456c676a = {
  isInvalid: false,
  validationDetails: $fd2148440a13ec26$export$aca958c65c314e6c,
  validationErrors: []
};
var $fd2148440a13ec26$export$571b5131b7e65c11 = (0, import_react.createContext)({});
var $fd2148440a13ec26$export$a763b9476acd3eb = "__reactAriaFormValidationState";
function $fd2148440a13ec26$export$fc1a364ae1f3ff10(props) {
  if (props[$fd2148440a13ec26$export$a763b9476acd3eb]) {
    let { realtimeValidation, displayValidation, updateValidation, resetValidation, commitValidation } = props[$fd2148440a13ec26$export$a763b9476acd3eb];
    return {
      realtimeValidation,
      displayValidation,
      updateValidation,
      resetValidation,
      commitValidation
    };
  }
  return $fd2148440a13ec26$var$useFormValidationStateImpl(props);
}
function $fd2148440a13ec26$var$useFormValidationStateImpl(props) {
  let { isInvalid, validationState, name, value, builtinValidation, validate, validationBehavior = "aria" } = props;
  if (validationState) isInvalid ||= validationState === "invalid";
  let controlledError = isInvalid !== void 0 ? {
    isInvalid,
    validationErrors: [],
    validationDetails: $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE
  } : null;
  let clientError = (0, import_react.useMemo)(() => {
    if (!validate || value == null) return null;
    let validateErrors = $fd2148440a13ec26$var$runValidate(validate, value);
    return $fd2148440a13ec26$var$getValidationResult(validateErrors);
  }, [
    validate,
    value
  ]);
  if (builtinValidation?.validationDetails.valid) builtinValidation = void 0;
  let serverErrors = (0, import_react.useContext)($fd2148440a13ec26$export$571b5131b7e65c11);
  let serverErrorMessages = (0, import_react.useMemo)(() => {
    if (name) return Array.isArray(name) ? name.flatMap((name2) => $fd2148440a13ec26$var$asArray(serverErrors[name2])) : $fd2148440a13ec26$var$asArray(serverErrors[name]);
    return [];
  }, [
    serverErrors,
    name
  ]);
  let [lastServerErrors, setLastServerErrors] = (0, import_react.useState)(serverErrors);
  let [isServerErrorCleared, setServerErrorCleared] = (0, import_react.useState)(false);
  if (serverErrors !== lastServerErrors) {
    setLastServerErrors(serverErrors);
    setServerErrorCleared(false);
  }
  let serverError = (0, import_react.useMemo)(() => $fd2148440a13ec26$var$getValidationResult(isServerErrorCleared ? [] : serverErrorMessages), [
    isServerErrorCleared,
    serverErrorMessages
  ]);
  let nextValidation = (0, import_react.useRef)($fd2148440a13ec26$export$dad6ae84456c676a);
  let [currentValidity, setCurrentValidity] = (0, import_react.useState)($fd2148440a13ec26$export$dad6ae84456c676a);
  let lastError = (0, import_react.useRef)($fd2148440a13ec26$export$dad6ae84456c676a);
  let commitValidation = () => {
    if (!commitQueued) return;
    setCommitQueued(false);
    let error = clientError || builtinValidation || nextValidation.current;
    if (!$fd2148440a13ec26$var$isEqualValidation(error, lastError.current)) {
      lastError.current = error;
      setCurrentValidity(error);
    }
  };
  let [commitQueued, setCommitQueued] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(commitValidation);
  let realtimeValidation = controlledError || serverError || clientError || builtinValidation || $fd2148440a13ec26$export$dad6ae84456c676a;
  let displayValidation = validationBehavior === "native" ? controlledError || serverError || currentValidity : controlledError || serverError || clientError || builtinValidation || currentValidity;
  return {
    realtimeValidation,
    displayValidation,
    updateValidation(value2) {
      if (validationBehavior === "aria" && !$fd2148440a13ec26$var$isEqualValidation(currentValidity, value2)) setCurrentValidity(value2);
      else nextValidation.current = value2;
    },
    resetValidation() {
      let error = $fd2148440a13ec26$export$dad6ae84456c676a;
      if (!$fd2148440a13ec26$var$isEqualValidation(error, lastError.current)) {
        lastError.current = error;
        setCurrentValidity(error);
      }
      if (validationBehavior === "native") setCommitQueued(false);
      setServerErrorCleared(true);
    },
    commitValidation() {
      if (validationBehavior === "native") setCommitQueued(true);
      setServerErrorCleared(true);
    }
  };
}
function $fd2148440a13ec26$var$asArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [
    v
  ];
}
function $fd2148440a13ec26$var$runValidate(validate, value) {
  if (typeof validate === "function") {
    let e = validate(value);
    if (e && typeof e !== "boolean") return $fd2148440a13ec26$var$asArray(e);
  }
  return [];
}
function $fd2148440a13ec26$var$getValidationResult(errors) {
  return errors.length ? {
    isInvalid: true,
    validationErrors: errors,
    validationDetails: $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE
  } : null;
}
function $fd2148440a13ec26$var$isEqualValidation(a, b) {
  if (a === b) return true;
  return !!a && !!b && a.isInvalid === b.isInvalid && a.validationErrors.length === b.validationErrors.length && a.validationErrors.every((a2, i) => a2 === b.validationErrors[i]) && Object.entries(a.validationDetails).every(([k, v]) => b.validationDetails[k] === v);
}
function $fd2148440a13ec26$export$75ee7c75d68f5b0e(...results) {
  let errors = /* @__PURE__ */ new Set();
  let isInvalid = false;
  let validationDetails = {
    ...$fd2148440a13ec26$export$aca958c65c314e6c
  };
  for (let v of results) {
    for (let e of v.validationErrors) errors.add(e);
    isInvalid ||= v.isInvalid;
    for (let key in validationDetails) validationDetails[key] ||= v.validationDetails[key];
  }
  validationDetails.valid = !isInvalid;
  return {
    isInvalid,
    validationErrors: [
      ...errors
    ],
    validationDetails
  };
}

// node_modules/react-stately/dist/private/utils/useControlledState.mjs
var import_react2 = __toESM(require_react(), 1);
var $3e6197669829fe11$var$useEarlyEffect = typeof document !== "undefined" ? (0, import_react2.default)["useInsertionEffect"] ?? (0, import_react2.default).useLayoutEffect : () => {
};
function $3e6197669829fe11$export$40bfa8c7b0832715(value, defaultValue, onChange) {
  let [stateValue, setStateValue] = (0, import_react2.useState)(value || defaultValue);
  let valueRef = (0, import_react2.useRef)(stateValue);
  let isControlledRef = (0, import_react2.useRef)(value !== void 0);
  let isControlled = value !== void 0;
  (0, import_react2.useEffect)(() => {
    let wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled && true) console.warn(`WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`);
    isControlledRef.current = isControlled;
  }, [
    isControlled
  ]);
  let currentValue = isControlled ? value : stateValue;
  $3e6197669829fe11$var$useEarlyEffect(() => {
    valueRef.current = currentValue;
  });
  let [, forceUpdate] = (0, import_react2.useReducer)(() => ({}), {});
  let setValue = (0, import_react2.useCallback)((value2, ...args) => {
    let newValue = typeof value2 === "function" ? value2(valueRef.current) : value2;
    if (!Object.is(valueRef.current, newValue)) {
      valueRef.current = newValue;
      setStateValue(newValue);
      forceUpdate();
      onChange?.(newValue, ...args);
    }
  }, [
    onChange
  ]);
  return [
    currentValue,
    setValue
  ];
}

// node_modules/react-stately/dist/private/toggle/useToggleState.mjs
var import_react3 = __toESM(require_react(), 1);
function $fd3c5e01e837dc20$export$8042c6c013fd5226(props = {}) {
  let { isReadOnly } = props;
  let [isSelected, setSelected] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.isSelected, props.defaultSelected || false, props.onChange);
  let [initialValue] = (0, import_react3.useState)(isSelected);
  function updateSelected(value) {
    if (!isReadOnly) setSelected(value);
  }
  function toggleState() {
    if (!isReadOnly) setSelected(!isSelected);
  }
  return {
    isSelected,
    defaultSelected: props.defaultSelected ?? initialValue,
    setSelected: updateSelected,
    toggle: toggleState
  };
}

// node_modules/react-stately/dist/private/utils/number.mjs
function $240e9101ba2842f5$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
  let newValue = Math.min(Math.max(value, min), max);
  return newValue;
}
function $240e9101ba2842f5$export$e1a7b8e69ef6c52f(value, step) {
  let roundedValue = value;
  let precision = 0;
  let stepString = step.toString();
  let eIndex = stepString.toLowerCase().indexOf("e-");
  if (eIndex > 0) precision = Math.abs(Math.floor(Math.log10(Math.abs(step)))) + eIndex;
  else {
    let pointIndex = stepString.indexOf(".");
    if (pointIndex >= 0) precision = stepString.length - pointIndex;
  }
  if (precision > 0) {
    let pow = Math.pow(10, precision);
    roundedValue = Math.round(roundedValue * pow) / pow;
  }
  return roundedValue;
}
function $240e9101ba2842f5$export$cb6e0bb50bc19463(value, min, max, step) {
  min = Number(min);
  max = Number(max);
  let remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = $240e9101ba2842f5$export$e1a7b8e69ef6c52f(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
  if (!isNaN(min)) {
    if (snappedValue < min) snappedValue = min;
    else if (!isNaN(max) && snappedValue > max) snappedValue = min + Math.floor($240e9101ba2842f5$export$e1a7b8e69ef6c52f((max - min) / step, step)) * step;
  } else if (!isNaN(max) && snappedValue > max) snappedValue = Math.floor($240e9101ba2842f5$export$e1a7b8e69ef6c52f(max / step, step)) * step;
  snappedValue = $240e9101ba2842f5$export$e1a7b8e69ef6c52f(snappedValue, step);
  return snappedValue;
}
function $240e9101ba2842f5$export$b6268554fba451f(value, digits, base = 10) {
  const pow = Math.pow(base, digits);
  return Math.round(value * pow) / pow;
}

// node_modules/react-stately/dist/private/intl/color/ar-AE.mjs
var $657b6c680454a954$exports = {};
$657b6c680454a954$exports = {
  "alpha": `ألفا`,
  "black": `أسود`,
  "blue": `أزرق`,
  "blue purple": `أرجواني مزرق`,
  "brightness": `السطوع`,
  "brown": `بني`,
  "brown yellow": `أصفر بني`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `سماوي`,
  "cyan blue": `أزرق سماوي`,
  "dark": `داكن`,
  "gray": `رمادي`,
  "grayish": `مائل للرمادي`,
  "green": `أخضر`,
  "green cyan": `سماوي مخضر`,
  "hue": `درجة اللون`,
  "light": `فاتح`,
  "lightness": `الإضاءة`,
  "magenta": `أرجواني`,
  "magenta pink": `أرجواني وردي`,
  "orange": `برتقالي`,
  "orange yellow": `أصفر برتقالي`,
  "pale": `باهت`,
  "pink": `وردي`,
  "pink red": `أحمر وردي`,
  "purple": `أرجواني`,
  "purple magenta": `بنفسجي`,
  "red": `أحمر`,
  "red orange": `برتقالي محمر`,
  "saturation": `التشبع`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} شفاف`,
  "very dark": `داكن جدًا`,
  "very light": `فاتح جدًا`,
  "vibrant": `ساطع`,
  "white": `أبيض`,
  "yellow": `أصفر`,
  "yellow green": `أخضر مصفر`
};

// node_modules/react-stately/dist/private/intl/color/bg-BG.mjs
var $889127408c531ba7$exports = {};
$889127408c531ba7$exports = {
  "alpha": `Алфа`,
  "black": `черно`,
  "blue": `Синьо`,
  "blue purple": `синьо лилаво`,
  "brightness": `Яркост`,
  "brown": `кафяво`,
  "brown yellow": `кафяво жълто`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `циан`,
  "cyan blue": `циан синьо`,
  "dark": `тъмно`,
  "gray": `сиво`,
  "grayish": `сивкав`,
  "green": `Зелено`,
  "green cyan": `зелен циан`,
  "hue": `Оттенък`,
  "light": `светло`,
  "lightness": `Лекота`,
  "magenta": `магента`,
  "magenta pink": `магента розово`,
  "orange": `оранжево`,
  "orange yellow": `оранжево жълто`,
  "pale": `бледо`,
  "pink": `розово`,
  "pink red": `розово червено`,
  "purple": `лилаво`,
  "purple magenta": `лилаво магента`,
  "red": `Червено`,
  "red orange": `червен портокал`,
  "saturation": `Наситеност`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} прозрачен`,
  "very dark": `много тъмно`,
  "very light": `много светло`,
  "vibrant": ` ярко`,
  "white": `бяло`,
  "yellow": `жълто`,
  "yellow green": `жълто зелен`
};

// node_modules/react-stately/dist/private/intl/color/cs-CZ.mjs
var $70544d82283dffb4$exports = {};
$70544d82283dffb4$exports = {
  "alpha": `Alfa`,
  "black": `černá`,
  "blue": `Modrá`,
  "blue purple": `modrofialová`,
  "brightness": `Jas`,
  "brown": `hnědá`,
  "brown yellow": `hnědožlutá`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `tyrkysová`,
  "cyan blue": `tyrkysovomodrá`,
  "dark": `tmavá`,
  "gray": `šedá`,
  "grayish": `našedlá`,
  "green": `Zelená`,
  "green cyan": `zelenotyrkysová`,
  "hue": `Odstín`,
  "light": `světlá`,
  "lightness": `Světlost`,
  "magenta": `purpurová`,
  "magenta pink": `purpurově růžová`,
  "orange": `oranžová`,
  "orange yellow": `oranžovožlutá`,
  "pale": `bledá`,
  "pink": `růžová`,
  "pink red": `růžovočervená`,
  "purple": `fialová`,
  "purple magenta": `fialově purpurová`,
  "red": `Červená`,
  "red orange": `červenooranžová`,
  "saturation": `Sytost`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} průhledné`,
  "very dark": `velmi tmavá`,
  "very light": `velmi světlá`,
  "vibrant": `zářivá`,
  "white": `bílá`,
  "yellow": `žlutá`,
  "yellow green": `žlutozelená`
};

// node_modules/react-stately/dist/private/intl/color/da-DK.mjs
var $dec70d8d5f3cf55e$exports = {};
$dec70d8d5f3cf55e$exports = {
  "alpha": `Alfa`,
  "black": `sort`,
  "blue": `Blå`,
  "blue purple": `blålilla`,
  "brightness": `Lysstyrke`,
  "brown": `brun`,
  "brown yellow": `brungul`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cyan`,
  "cyan blue": `cyan blå`,
  "dark": `mørk`,
  "gray": `grå`,
  "grayish": `grålig`,
  "green": `Grøn`,
  "green cyan": `grøn cyan`,
  "hue": `Tone`,
  "light": `lys`,
  "lightness": `Lyshed`,
  "magenta": `magenta`,
  "magenta pink": `magenta pink`,
  "orange": `orange`,
  "orange yellow": `orangegul`,
  "pale": `bleg`,
  "pink": `lyserød`,
  "pink red": `lyserødlig rød`,
  "purple": `lilla`,
  "purple magenta": `lilla magenta`,
  "red": `Rød`,
  "red orange": `rødorange`,
  "saturation": `Farvemætning`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} gennemsigtig`,
  "very dark": `meget mørk`,
  "very light": `meget lys`,
  "vibrant": `klar`,
  "white": `hvid`,
  "yellow": `gul`,
  "yellow green": `gulgrøn`
};

// node_modules/react-stately/dist/private/intl/color/de-DE.mjs
var $9522ab9745257c99$exports = {};
$9522ab9745257c99$exports = {
  "alpha": `Alpha`,
  "black": `Schwarz`,
  "blue": `Blau`,
  "blue purple": `Blaulila`,
  "brightness": `Helligkeit`,
  "brown": `Braun`,
  "brown yellow": `Braungelb`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `Cyan`,
  "cyan blue": `Cyanblau`,
  "dark": `dunkles`,
  "gray": `Grau`,
  "grayish": `gräuliches`,
  "green": `Grün`,
  "green cyan": `Grüncyan`,
  "hue": `Farbton`,
  "light": `helles`,
  "lightness": `Leuchtkraft`,
  "magenta": `Magenta`,
  "magenta pink": `Magentarosa`,
  "orange": `Orange`,
  "orange yellow": `Orangegelb`,
  "pale": `blasses`,
  "pink": `Rosa`,
  "pink red": `Rosarot`,
  "purple": `Lila`,
  "purple magenta": `Lilamagenta`,
  "red": `Rot`,
  "red orange": `Rotorange`,
  "saturation": `Sättigung`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, zu ${args.percentTransparent} transparent`,
  "very dark": `sehr dunkles`,
  "very light": `sehr helles`,
  "vibrant": `lebhaftes`,
  "white": `Weiß`,
  "yellow": `Gelb`,
  "yellow green": `Gelbgrün`
};

// node_modules/react-stately/dist/private/intl/color/el-GR.mjs
var $26b460c7fbf5c73a$exports = {};
$26b460c7fbf5c73a$exports = {
  "alpha": `Άλφα`,
  "black": `μαύρο`,
  "blue": `Μπλε`,
  "blue purple": `μπλε μωβ`,
  "brightness": `Φωτεινότητα`,
  "brown": `καφέ`,
  "brown yellow": `καφέ κίτρινο`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `κυανό`,
  "cyan blue": `κυανό μπλε`,
  "dark": `σκούρο`,
  "gray": `γκρι`,
  "grayish": `γκριζωπό`,
  "green": `Πράσινο`,
  "green cyan": `πράσινο κυανό`,
  "hue": `Τόνος`,
  "light": `ανοιχτό`,
  "lightness": `Φωτεινότητα`,
  "magenta": `ματζέντα`,
  "magenta pink": `ματζέντα ροζ`,
  "orange": `πορτοκαλί`,
  "orange yellow": `πορτοκαλί κίτρινο`,
  "pale": `ανοιχτό`,
  "pink": `ροζ`,
  "pink red": `ροζ κόκκινο`,
  "purple": `μωβ`,
  "purple magenta": `μωβ ματζέντα`,
  "red": `Κόκκινο`,
  "red orange": `κόκκινο πορτοκαλί`,
  "saturation": `Κορεσμός`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} διαφανές`,
  "very dark": `πολύ σκούρο`,
  "very light": `πολύ ανοιχτό`,
  "vibrant": `έντονο`,
  "white": `λευκό`,
  "yellow": `κίτρινο`,
  "yellow green": `κίτρινο πράσινο`
};

// node_modules/react-stately/dist/private/intl/color/en-US.mjs
var $91b08ff3e640b4d4$exports = {};
$91b08ff3e640b4d4$exports = {
  "hue": `Hue`,
  "saturation": `Saturation`,
  "lightness": `Lightness`,
  "brightness": `Brightness`,
  "red": `Red`,
  "green": `Green`,
  "blue": `Blue`,
  "alpha": `Alpha`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparent`,
  "very dark": `very dark`,
  "dark": `dark`,
  "light": `light`,
  "very light": `very light`,
  "pale": `pale`,
  "grayish": `grayish`,
  "vibrant": `vibrant`,
  "black": `black`,
  "white": `white`,
  "gray": `gray`,
  "pink": `pink`,
  "pink red": `pink red`,
  "red orange": `red orange`,
  "brown": `brown`,
  "orange": `orange`,
  "orange yellow": `orange yellow`,
  "brown yellow": `brown yellow`,
  "yellow": `yellow`,
  "yellow green": `yellow green`,
  "green cyan": `green cyan`,
  "cyan": `cyan`,
  "cyan blue": `cyan blue`,
  "blue purple": `blue purple`,
  "purple": `purple`,
  "purple magenta": `purple magenta`,
  "magenta": `magenta`,
  "magenta pink": `magenta pink`
};

// node_modules/react-stately/dist/private/intl/color/es-ES.mjs
var $fd77e3dc91499169$exports = {};
$fd77e3dc91499169$exports = {
  "alpha": `Alpha`,
  "black": `negro`,
  "blue": `Azul`,
  "blue purple": `púrpura azulado`,
  "brightness": `Brillo`,
  "brown": `marrón`,
  "brown yellow": `amarillo amarronado`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cian`,
  "cyan blue": `azul cian`,
  "dark": `oscuro`,
  "gray": `gris`,
  "grayish": `grisáceo`,
  "green": `Verde`,
  "green cyan": `cian verdoso`,
  "hue": `Tono`,
  "light": `claro`,
  "lightness": `Luminosidad`,
  "magenta": `magenta`,
  "magenta pink": `rosa magenta`,
  "orange": `naranja`,
  "orange yellow": `amarillo anaranjado`,
  "pale": `pálido`,
  "pink": `rosa`,
  "pink red": `rojo rosado`,
  "purple": `morado`,
  "purple magenta": `magenta violáceo`,
  "red": `Rojo`,
  "red orange": `naranja rojizo`,
  "saturation": `Saturación`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparente`,
  "very dark": `muy oscuro`,
  "very light": `muy claro`,
  "vibrant": `intenso`,
  "white": `blanco`,
  "yellow": `amarillo`,
  "yellow green": `verde amarillento`
};

// node_modules/react-stately/dist/private/intl/color/et-EE.mjs
var $1fa550aa4006d82d$exports = {};
$1fa550aa4006d82d$exports = {
  "alpha": `Alfa`,
  "black": `must`,
  "blue": `Sinine`,
  "blue purple": `sinakaslilla`,
  "brightness": `Heledus`,
  "brown": `pruun`,
  "brown yellow": `pruunikaskollane`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `tsüaan`,
  "cyan blue": `tsüaansinine`,
  "dark": `tume`,
  "gray": `hall`,
  "grayish": `hallikas`,
  "green": `Roheline`,
  "green cyan": `tsüaanroheline`,
  "hue": `Värv`,
  "light": `valgus`,
  "lightness": `Valgus`,
  "magenta": `magentapunane`,
  "magenta pink": `magentaroosa`,
  "orange": `oranž`,
  "orange yellow": `oranžikaskollane`,
  "pale": `kahvatu`,
  "pink": `roosa`,
  "pink red": `vaarikapunane`,
  "purple": `lilla`,
  "purple magenta": `purpurne magenta`,
  "red": `Punane`,
  "red orange": `punakasoranž`,
  "saturation": `Küllastus`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} läbipaistev`,
  "very dark": `väga tume`,
  "very light": `väga hele`,
  "vibrant": `ere`,
  "white": `valge`,
  "yellow": `kollane`,
  "yellow green": `kollakasroheline`
};

// node_modules/react-stately/dist/private/intl/color/fi-FI.mjs
var $21314fa26efef1a7$exports = {};
$21314fa26efef1a7$exports = {
  "alpha": `Alpha`,
  "black": `musta`,
  "blue": `Sininen`,
  "blue purple": `sinivioletti`,
  "brightness": `Kirkkaus`,
  "brown": `ruskea`,
  "brown yellow": `ruskeankeltainen`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `syaani`,
  "cyan blue": `syaaninsininen`,
  "dark": `tumma`,
  "gray": `harmaa`,
  "grayish": `harmahtava`,
  "green": `Vihreä`,
  "green cyan": `vihreänsyaani`,
  "hue": `Sävy`,
  "light": `vaalea`,
  "lightness": `Valomäärä`,
  "magenta": `magenta`,
  "magenta pink": `magentapinkki`,
  "orange": `oranssi`,
  "orange yellow": `oranssinkeltainen`,
  "pale": `vaalea`,
  "pink": `pinkki`,
  "pink red": `vaaleanpunainen`,
  "purple": `violetti`,
  "purple magenta": `violettimagenta`,
  "red": `Punainen`,
  "red orange": `punaoranssi`,
  "saturation": `Värikylläisyys`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} läpinäkyvä`,
  "very dark": `hyvin tumma`,
  "very light": `erittäin vaalea`,
  "vibrant": `eloisa`,
  "white": `valkea`,
  "yellow": `keltainen`,
  "yellow green": `keltavihreä`
};

// node_modules/react-stately/dist/private/intl/color/fr-FR.mjs
var $e89aa016b78237dc$exports = {};
$e89aa016b78237dc$exports = {
  "alpha": `Alpha`,
  "black": `Noir`,
  "blue": `Bleu`,
  "blue purple": `Violet bleu`,
  "brightness": `Luminosité`,
  "brown": `Brun`,
  "brown yellow": `Jaune brun`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `Cyan`,
  "cyan blue": `Bleu cyan`,
  "dark": `Sombre`,
  "gray": `Gris`,
  "grayish": `Grisâtre`,
  "green": `Vert`,
  "green cyan": `Cyan vert`,
  "hue": `Teinte`,
  "light": `Clair`,
  "lightness": `Luminosité`,
  "magenta": `Magenta`,
  "magenta pink": `Rose magenta`,
  "orange": `Orange`,
  "orange yellow": `Jaune orangé`,
  "pale": `Pâle`,
  "pink": `Rose`,
  "pink red": `Rouge rosé`,
  "purple": `Violet`,
  "purple magenta": `Magenta violet`,
  "red": `Rouge`,
  "red orange": `Orange rouge`,
  "saturation": `Saturation`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparent`,
  "very dark": `Très sombre`,
  "very light": `Très clair`,
  "vibrant": `Vif`,
  "white": `Blanc`,
  "yellow": `Jaune`,
  "yellow green": `Vert jaune`
};

// node_modules/react-stately/dist/private/intl/color/he-IL.mjs
var $a1a6ebcfb4e36dca$exports = {};
$a1a6ebcfb4e36dca$exports = {
  "alpha": `אלפא`,
  "black": `שחור`,
  "blue": `כחול`,
  "blue purple": `כחול סגול`,
  "brightness": `בהירות`,
  "brown": `חום`,
  "brown yellow": `חום צהוב`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `טורקיז`,
  "cyan blue": `כחול ציאן`,
  "dark": `כהה`,
  "gray": `אפור`,
  "grayish": `אפרפר`,
  "green": `ירוק`,
  "green cyan": `ציאן ירוק`,
  "hue": `גוון`,
  "light": `אור`,
  "lightness": `כמות אור`,
  "magenta": `מג'נטה`,
  "magenta pink": `ורוד מג'נטה`,
  "orange": `כתום`,
  "orange yellow": `כתום צהוב`,
  "pale": `חיוור`,
  "pink": `ורוד`,
  "pink red": `ורוד אדום`,
  "purple": `סגול`,
  "purple magenta": `מג'נטה סגול`,
  "red": `אדום`,
  "red orange": `כתום אדום`,
  "saturation": `רוויה`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} שקוף`,
  "very dark": `כהה מאוד`,
  "very light": `בהיר מאוד`,
  "vibrant": `תוסס`,
  "white": `לבן`,
  "yellow": `צהוב`,
  "yellow green": `צהוב ירוק`
};

// node_modules/react-stately/dist/private/intl/color/hr-HR.mjs
var $539c3833a6c2e20b$exports = {};
$539c3833a6c2e20b$exports = {
  "alpha": `Alfa`,
  "black": `crno`,
  "blue": `Plava`,
  "blue purple": `plavo ljubičasta`,
  "brightness": `Svjetlina`,
  "brown": `smeđa`,
  "brown yellow": `smeđe žuta`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cijan`,
  "cyan blue": `cijan plava`,
  "dark": `tamno`,
  "gray": `siva`,
  "grayish": `sivkasto`,
  "green": `Zelena`,
  "green cyan": `zelena cijan`,
  "hue": `Nijansa`,
  "light": `svjetlo`,
  "lightness": `Osvijetljenost`,
  "magenta": `magenta`,
  "magenta pink": `magentno ružičasta`,
  "orange": `narančasta`,
  "orange yellow": `narančasto žuta`,
  "pale": `blijeda`,
  "pink": `ružičasta`,
  "pink red": `ružičasto crvena`,
  "purple": `ljubičasta`,
  "purple magenta": `ljubičasta magenta`,
  "red": `Crvena`,
  "red orange": `crveno narančasta`,
  "saturation": `Zasićenost`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} prozirnosti`,
  "very dark": `jako tamna`,
  "very light": `vrlo svijetlo`,
  "vibrant": `vibrantna`,
  "white": `bijela`,
  "yellow": `žuto`,
  "yellow green": `žuto zelena`
};

// node_modules/react-stately/dist/private/intl/color/hu-HU.mjs
var $7f6a753aa3e72c6d$exports = {};
$7f6a753aa3e72c6d$exports = {
  "alpha": `Alfa`,
  "black": `fekete`,
  "blue": `Kék`,
  "blue purple": `kék lila`,
  "brightness": `Fényesség`,
  "brown": `barna`,
  "brown yellow": `barna sárga`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `ciánkék`,
  "cyan blue": `ciánkék`,
  "dark": `sötét`,
  "gray": `szürke`,
  "grayish": `szürkés`,
  "green": `Zöld`,
  "green cyan": `zöld ciánkék`,
  "hue": `Színárnyalat`,
  "light": `világos`,
  "lightness": `Világosság`,
  "magenta": `bíbor`,
  "magenta pink": `bíbor rózsaszín`,
  "orange": `narancs`,
  "orange yellow": `narancssárga`,
  "pale": `halvány`,
  "pink": `rózsaszín`,
  "pink red": `rózsaszín piros`,
  "purple": `lila`,
  "purple magenta": `lila bíbor`,
  "red": `Piros`,
  "red orange": `piros narancs`,
  "saturation": `Telítettség`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} átlátszó`,
  "very dark": `nagyon sötét`,
  "very light": `nagyon világos`,
  "vibrant": `élénk`,
  "white": `fehér`,
  "yellow": `sárga`,
  "yellow green": `sárga zöld`
};

// node_modules/react-stately/dist/private/intl/color/it-IT.mjs
var $b5c3de7f83e64721$exports = {};
$b5c3de7f83e64721$exports = {
  "alpha": `Alfa`,
  "black": `nero`,
  "blue": `Blu`,
  "blue purple": `blu viola`,
  "brightness": `Luminosità`,
  "brown": `marrone`,
  "brown yellow": `giallo bruno`,
  "colorName": (args) => `${args.hue} ${args.chroma} ${args.lightness}`,
  "cyan": `ciano`,
  "cyan blue": `blu ciano`,
  "dark": `scuro`,
  "gray": `grigio`,
  "grayish": `grigiastro`,
  "green": `Verde`,
  "green cyan": `verde ciano`,
  "hue": `Tonalità`,
  "light": `chiaro`,
  "lightness": `Luminosità`,
  "magenta": `magenta`,
  "magenta pink": `rosa magenta`,
  "orange": `arancio`,
  "orange yellow": `giallo arancio`,
  "pale": `tenue`,
  "pink": `rosa`,
  "pink red": `rosa rosso`,
  "purple": `viola`,
  "purple magenta": `viola magenta`,
  "red": `Rosso`,
  "red orange": `rosso arancio`,
  "saturation": `Saturazione`,
  "transparentColorName": (args) => `${args.hue} ${args.chroma} ${args.lightness}, trasparenza ${args.percentTransparent}`,
  "very dark": `molto scuro`,
  "very light": `molto chiaro`,
  "vibrant": `vivace`,
  "white": `bianco`,
  "yellow": `giallo`,
  "yellow green": `giallo verde`
};

// node_modules/react-stately/dist/private/intl/color/ja-JP.mjs
var $30e30b94393be6f6$exports = {};
$30e30b94393be6f6$exports = {
  "alpha": `アルファ`,
  "black": `ブラック`,
  "blue": `青`,
  "blue purple": `ブルーパープル`,
  "brightness": `明るさ`,
  "brown": `ブラウン`,
  "brown yellow": `ブラウンイエロー`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `シアン`,
  "cyan blue": `シアンブルー`,
  "dark": `ダーク`,
  "gray": `グレー`,
  "grayish": `グレイッシュ`,
  "green": `緑`,
  "green cyan": `グリーンシアン`,
  "hue": `色相`,
  "light": `ライト`,
  "lightness": `明度`,
  "magenta": `マゼンタ`,
  "magenta pink": `マゼンタピンク`,
  "orange": `オレンジ`,
  "orange yellow": `オレンジイエロー`,
  "pale": `ペール`,
  "pink": `ピンク`,
  "pink red": `ピンクレッド`,
  "purple": `パープル`,
  "purple magenta": `パープルマゼンタ`,
  "red": `赤`,
  "red orange": `レッドオレンジ`,
  "saturation": `彩度`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} 透明`,
  "very dark": `最も暗い`,
  "very light": `ベリーライト`,
  "vibrant": `鮮やか`,
  "white": `ホワイト`,
  "yellow": `イエロー`,
  "yellow green": `イエローグリーン`
};

// node_modules/react-stately/dist/private/intl/color/ko-KR.mjs
var $df8867b82a73bdb3$exports = {};
$df8867b82a73bdb3$exports = {
  "alpha": `알파`,
  "black": `검은색`,
  "blue": `파랑`,
  "blue purple": `청자색`,
  "brightness": `명도`,
  "brown": `갈색`,
  "brown yellow": `황갈색`,
  "colorName": (args) => `${args.lightness}, ${args.chroma}, ${args.hue}`,
  "cyan": `청록색`,
  "cyan blue": `청록색`,
  "dark": `다크`,
  "gray": `회색`,
  "grayish": `회갈색`,
  "green": `초록`,
  "green cyan": `청록색`,
  "hue": `색조`,
  "light": `라이트`,
  "lightness": `밝기`,
  "magenta": `자홍색`,
  "magenta pink": `마젠타 핑크`,
  "orange": `주황색`,
  "orange yellow": `불그스름한 노랑`,
  "pale": `흙색`,
  "pink": `분홍색`,
  "pink red": `핑크 레드`,
  "purple": `자주색`,
  "purple magenta": `보라빛 자홍색`,
  "red": `빨강`,
  "red orange": `붉은 주황색`,
  "saturation": `채도`,
  "transparentColorName": (args) => `${args.lightness}, ${args.chroma}, ${args.hue}, ${args.percentTransparent} 투명도`,
  "very dark": `매우 어두운`,
  "very light": `매우 연함`,
  "vibrant": `강렬한`,
  "white": `흰색`,
  "yellow": `노란색`,
  "yellow green": `연두색`
};

// node_modules/react-stately/dist/private/intl/color/lt-LT.mjs
var $390173bd3451fe74$exports = {};
$390173bd3451fe74$exports = {
  "alpha": `Alfa`,
  "black": `juoda`,
  "blue": `Mėlyna`,
  "blue purple": `melsvai violetinė`,
  "brightness": `Ryškumas`,
  "brown": `ruda`,
  "brown yellow": `rusvai geltona`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `žalsvai mėlyna`,
  "cyan blue": `žalsvai mėlyna`,
  "dark": `tamsi`,
  "gray": `pilka`,
  "grayish": `pilkšva`,
  "green": `Žalia`,
  "green cyan": `žalsvai mėlyna`,
  "hue": `Atspalvis`,
  "light": `šviesi`,
  "lightness": `Šviesumas`,
  "magenta": `rausvai raudona`,
  "magenta pink": `purpurinė`,
  "orange": `oranžinė`,
  "orange yellow": `oranžinio atspalvio geltona`,
  "pale": `blyški`,
  "pink": `rožinė`,
  "pink red": `rožinė raudona`,
  "purple": `violetinė`,
  "purple magenta": `purpurinė rausvai raudona`,
  "red": `Raudona`,
  "red orange": `rausvai oranžinė`,
  "saturation": `Įsotinimas`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} skaidri`,
  "very dark": `labai tamsi`,
  "very light": `labai šviesi`,
  "vibrant": `ryški`,
  "white": `balta`,
  "yellow": `geltona`,
  "yellow green": `gelsvai žalia`
};

// node_modules/react-stately/dist/private/intl/color/lv-LV.mjs
var $8874424bc229db3e$exports = {};
$8874424bc229db3e$exports = {
  "alpha": `Alfa`,
  "black": `melns`,
  "blue": `Zila`,
  "blue purple": `zili violets`,
  "brightness": `Spilgtums`,
  "brown": `brūns`,
  "brown yellow": `brūni dzeltens`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `ciāns`,
  "cyan blue": `ciāna zils`,
  "dark": `tumšs`,
  "gray": `pelēks`,
  "grayish": `pelēcīgs`,
  "green": `Zaļa`,
  "green cyan": `zaļš ciāns`,
  "hue": `Nokrāsa`,
  "light": `gaišs`,
  "lightness": `Gaišums`,
  "magenta": `fuksiju`,
  "magenta pink": `fuksiju rozā`,
  "orange": `oranžs`,
  "orange yellow": `oranži dzeltens`,
  "pale": `bāls`,
  "pink": `rozā`,
  "pink red": `rozīgi sarkans`,
  "purple": `violets`,
  "purple magenta": `violets fuksiju`,
  "red": `Sarkana`,
  "red orange": `sarkanīgi oranžs`,
  "saturation": `Piesātinājums`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} caurspīdīgs`,
  "very dark": `ļoti tumšs`,
  "very light": `ļoti gaišs`,
  "vibrant": `košs`,
  "white": `balts`,
  "yellow": `dzeltens`,
  "yellow green": `dzelteni zaļš`
};

// node_modules/react-stately/dist/private/intl/color/nb-NO.mjs
var $f7492ce78db8051b$exports = {};
$f7492ce78db8051b$exports = {
  "alpha": `Alfa`,
  "black": `svart`,
  "blue": `Blå`,
  "blue purple": `blålilla`,
  "brightness": `Lysstyrke`,
  "brown": `brun`,
  "brown yellow": `brungul`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cyan`,
  "cyan blue": `cyanblå`,
  "dark": `mørk`,
  "gray": `grå`,
  "grayish": `gråaktig`,
  "green": `Grønn`,
  "green cyan": `grønncyan`,
  "hue": `Fargetone`,
  "light": `lys`,
  "lightness": `Lyshet`,
  "magenta": `magenta`,
  "magenta pink": `magentarosa`,
  "orange": `oransje`,
  "orange yellow": `oransjegul`,
  "pale": `blek`,
  "pink": `rosa`,
  "pink red": `rosarød`,
  "purple": `lilla`,
  "purple magenta": `lillamagenta`,
  "red": `Rød`,
  "red orange": `rødoransje`,
  "saturation": `Metning`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} gjennomsiktig`,
  "very dark": `svært mørk`,
  "very light": `svært lys`,
  "vibrant": `levende`,
  "white": `hvit`,
  "yellow": `gul`,
  "yellow green": `gulgrønn`
};

// node_modules/react-stately/dist/private/intl/color/nl-NL.mjs
var $df6c7957db097c77$exports = {};
$df6c7957db097c77$exports = {
  "alpha": `Alfa`,
  "black": `zwart`,
  "blue": `Blauw`,
  "blue purple": `paarsblauw`,
  "brightness": `Helderheid`,
  "brown": `bruin`,
  "brown yellow": `bruingeel`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cyaan`,
  "cyan blue": `cyaanblauw`,
  "dark": `donker`,
  "gray": `grijs`,
  "grayish": `grijsachtig`,
  "green": `Groen`,
  "green cyan": `cyaangroen`,
  "hue": `Kleurtoon`,
  "light": `licht`,
  "lightness": `Lichtsterkte`,
  "magenta": `magenta`,
  "magenta pink": `magentaroze`,
  "orange": `oranje`,
  "orange yellow": `oranjegeel`,
  "pale": `bleek`,
  "pink": `roze`,
  "pink red": `rozerood`,
  "purple": `paars`,
  "purple magenta": `magentapaars`,
  "red": `Rood`,
  "red orange": `roodoranje`,
  "saturation": `Verzadiging`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparant`,
  "very dark": `heel donker`,
  "very light": `heel licht`,
  "vibrant": `levendig`,
  "white": `wit`,
  "yellow": `geel`,
  "yellow green": `geelgroen`
};

// node_modules/react-stately/dist/private/intl/color/pl-PL.mjs
var $44f0438f6ac7145a$exports = {};
$44f0438f6ac7145a$exports = {
  "alpha": `Alfa`,
  "black": `czarny`,
  "blue": `Niebieski`,
  "blue purple": `niebiesko-fioletowy`,
  "brightness": `Jasność`,
  "brown": `brązowy`,
  "brown yellow": `brązowo-żółty`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cyjanowy`,
  "cyan blue": `cyjanowo-niebieski`,
  "dark": `ciemny`,
  "gray": `szary`,
  "grayish": `szarawy`,
  "green": `Zielony`,
  "green cyan": `zielono-cyjanowy`,
  "hue": `Odcień`,
  "light": `jasny`,
  "lightness": `Jaskrawość`,
  "magenta": `purpurowy`,
  "magenta pink": `purpurowo-różowy`,
  "orange": `pomarańczowy`,
  "orange yellow": `pomarańczowo-żółty`,
  "pale": `blady`,
  "pink": `różowy`,
  "pink red": `różowo-czerwony`,
  "purple": `fioletowy`,
  "purple magenta": `fioletowo-purpurowy`,
  "red": `Czerwony`,
  "red orange": `czerwono-pomarańczowy`,
  "saturation": `Nasycenie`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} przezroczystości`,
  "very dark": `bardzo ciemny`,
  "very light": `bardzo jasny`,
  "vibrant": `intensywny`,
  "white": `biały`,
  "yellow": `żółty`,
  "yellow green": `żółto-zielony`
};

// node_modules/react-stately/dist/private/intl/color/pt-BR.mjs
var $8a75ab7961de49d7$exports = {};
$8a75ab7961de49d7$exports = {
  "alpha": `Alfa`,
  "black": `preto`,
  "blue": `Azul`,
  "blue purple": `roxo azulado`,
  "brightness": `Brilho`,
  "brown": `marrom`,
  "brown yellow": `marrom amarelado`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `ciano`,
  "cyan blue": `azul-ciano`,
  "dark": `escuro`,
  "gray": `cinza`,
  "grayish": `acinzentado`,
  "green": `Verde`,
  "green cyan": `verde-ciano`,
  "hue": `Matiz`,
  "light": `claro`,
  "lightness": `Luminosidade`,
  "magenta": `magenta`,
  "magenta pink": `rosa-magenta`,
  "orange": `laranja`,
  "orange yellow": `amarelo alaranjado`,
  "pale": `pálido`,
  "pink": `rosa`,
  "pink red": `rosa avermelhado`,
  "purple": `roxo`,
  "purple magenta": `roxo-magenta`,
  "red": `Vermelho`,
  "red orange": `laranja avermelhado`,
  "saturation": `Saturação`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparente`,
  "very dark": `muito escuro`,
  "very light": `muito claro`,
  "vibrant": `vibrante`,
  "white": `branco`,
  "yellow": `amarelo`,
  "yellow green": `verde amarelado`
};

// node_modules/react-stately/dist/private/intl/color/pt-PT.mjs
var $3648ea0dfef1e48a$exports = {};
$3648ea0dfef1e48a$exports = {
  "alpha": `Alfa`,
  "black": `preto`,
  "blue": `Azul`,
  "blue purple": `azul-púrpura`,
  "brightness": `Luminosidade`,
  "brown": `castanho`,
  "brown yellow": `amarelo-castanho`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `ciano`,
  "cyan blue": `azul-ciano`,
  "dark": `escuro`,
  "gray": `cinzento`,
  "grayish": `acinzentado`,
  "green": `Verde`,
  "green cyan": `verde-ciano`,
  "hue": `Tonalidade`,
  "light": `claro`,
  "lightness": `Claridade`,
  "magenta": `magenta`,
  "magenta pink": `rosa-magenta`,
  "orange": `laranja`,
  "orange yellow": `amarelo-laranja`,
  "pale": `pálido`,
  "pink": `cor-de-rosa`,
  "pink red": `vermelho-rosa`,
  "purple": `púrpura`,
  "purple magenta": `púrpura-magenta`,
  "red": `Vermelho`,
  "red orange": `laranja-vermelho`,
  "saturation": `Saturação`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparente`,
  "very dark": `muito escuro`,
  "very light": `muito claro`,
  "vibrant": `vibrante`,
  "white": `branco`,
  "yellow": `amarelo`,
  "yellow green": `verde-amarelo`
};

// node_modules/react-stately/dist/private/intl/color/ro-RO.mjs
var $14b4e95a3fa0c42c$exports = {};
$14b4e95a3fa0c42c$exports = {
  "alpha": `Alfa`,
  "black": `negru`,
  "blue": `Albastru`,
  "blue purple": `albastru-violet`,
  "brightness": `Luminozitate`,
  "brown": `maro`,
  "brown yellow": `galben maro`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `bleu`,
  "cyan blue": `albastru-bleu`,
  "dark": `închis`,
  "gray": `gri`,
  "grayish": `cenușiu`,
  "green": `Verde`,
  "green cyan": `verde bleu`,
  "hue": `Nuanță`,
  "light": `deschis`,
  "lightness": `Luminozitate`,
  "magenta": `fucsia`,
  "magenta pink": `roz-fucsia`,
  "orange": `portocaliu`,
  "orange yellow": `galben-portocaliu`,
  "pale": `pal`,
  "pink": `roz`,
  "pink red": `roz-roșu`,
  "purple": `violet`,
  "purple magenta": `violet-fucsia`,
  "red": `Roșu`,
  "red orange": `portocaliu-roșu`,
  "saturation": `Saturație`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} transparent`,
  "very dark": `foarte închis`,
  "very light": `foarte deschis`,
  "vibrant": `plin de viață`,
  "white": `alb`,
  "yellow": `galben`,
  "yellow green": `galben-verde`
};

// node_modules/react-stately/dist/private/intl/color/ru-RU.mjs
var $1a8e80058ee5c8e8$exports = {};
$1a8e80058ee5c8e8$exports = {
  "alpha": `Альфа`,
  "black": `черный`,
  "blue": `Синий`,
  "blue purple": `сине-фиолетовый`,
  "brightness": `Яркость`,
  "brown": `коричневый`,
  "brown yellow": `коричнево-желтый`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `голубой`,
  "cyan blue": `цвет морской волны`,
  "dark": `темный`,
  "gray": `серый`,
  "grayish": `сероватый`,
  "green": `Зеленый`,
  "green cyan": `сине-зеленый`,
  "hue": `Оттенок`,
  "light": `светлый`,
  "lightness": `Освещенность`,
  "magenta": `пурпурный`,
  "magenta pink": `пурпурно-розовый`,
  "orange": `оранжевый`,
  "orange yellow": `оранжево-желтый`,
  "pale": `бледный`,
  "pink": `розовый`,
  "pink red": `розово-красный`,
  "purple": `фиолетовый`,
  "purple magenta": `фиолетово-пурпурный`,
  "red": `Красный`,
  "red orange": `красно-оранжевый`,
  "saturation": `Насыщенность`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, прозрачный на ${args.percentTransparent}`,
  "very dark": `очень темный`,
  "very light": `очень светлый`,
  "vibrant": `яркий`,
  "white": `белый`,
  "yellow": `желтый`,
  "yellow green": `желто-зеленый`
};

// node_modules/react-stately/dist/private/intl/color/sk-SK.mjs
var $c2f9fb5b2855a5d6$exports = {};
$c2f9fb5b2855a5d6$exports = {
  "alpha": `Alfa`,
  "black": `čierna`,
  "blue": `Modrá`,
  "blue purple": `modrofialová`,
  "brightness": `Jas`,
  "brown": `hnedá`,
  "brown yellow": `hnedožltá`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `azúrová`,
  "cyan blue": `azúrová modrá`,
  "dark": `tmavá`,
  "gray": `sivá`,
  "grayish": `sivastá`,
  "green": `Zelená`,
  "green cyan": `zelená azúrová`,
  "hue": `Odtieň`,
  "light": `svetlá`,
  "lightness": `Svetlosť`,
  "magenta": `purpurová`,
  "magenta pink": `ružová purpurová`,
  "orange": `oranžová`,
  "orange yellow": `oranžovožltá`,
  "pale": `bledá`,
  "pink": `ružová`,
  "pink red": `ružovočervená`,
  "purple": `fialová`,
  "purple magenta": `fialová purpurová`,
  "red": `Červená`,
  "red orange": `červenooranžová`,
  "saturation": `Sýtosť`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} priehľadná`,
  "very dark": `veľmi tmavá`,
  "very light": `veľmi svetlá`,
  "vibrant": `energická`,
  "white": `biela`,
  "yellow": `žltá`,
  "yellow green": `žltozelená`
};

// node_modules/react-stately/dist/private/intl/color/sl-SI.mjs
var $c5aa45c5d5ce4d33$exports = {};
$c5aa45c5d5ce4d33$exports = {
  "alpha": `Alfa`,
  "black": `črna`,
  "blue": `Modra`,
  "blue purple": `modro vijolična`,
  "brightness": `Svetlost`,
  "brown": `rjava`,
  "brown yellow": `rjavo rumena`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cian`,
  "cyan blue": `cian modra`,
  "dark": `temna`,
  "gray": `siva`,
  "grayish": `sivkasta`,
  "green": `Zelena`,
  "green cyan": `zelena cian`,
  "hue": `Barva`,
  "light": `svetla`,
  "lightness": `Lahkost`,
  "magenta": `škrlatna`,
  "magenta pink": `škrlatno roza`,
  "orange": `oranžna`,
  "orange yellow": `oranžno rumena`,
  "pale": `bleda`,
  "pink": `roza`,
  "pink red": `roza rdeča`,
  "purple": `vijolična`,
  "purple magenta": `vijolično škrlatna`,
  "red": `Rdeča`,
  "red orange": `rdeče oranžna`,
  "saturation": `Nasičenost`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} prozorna`,
  "very dark": `zelo temna`,
  "very light": `zelo svetla`,
  "vibrant": `živahna`,
  "white": `bela`,
  "yellow": `rumena`,
  "yellow green": `rumeno zelena`
};

// node_modules/react-stately/dist/private/intl/color/sr-SP.mjs
var $5d1a53072fa5427d$exports = {};
$5d1a53072fa5427d$exports = {
  "alpha": `Alfa`,
  "black": `crno`,
  "blue": `Plava`,
  "blue purple": `plavoljubičasta`,
  "brightness": `Osvetljenost`,
  "brown": `smeđa`,
  "brown yellow": `smeđežuta`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cijan`,
  "cyan blue": `cijan plava`,
  "dark": `tamno`,
  "gray": `siva`,
  "grayish": `sivkasta`,
  "green": `Zelena`,
  "green cyan": `zeleno cijan`,
  "hue": `Nijansa`,
  "light": `svetla`,
  "lightness": `Osvetljenje`,
  "magenta": `purpurnocrvena`,
  "magenta pink": `magenta ružičasta`,
  "orange": `narandžasta`,
  "orange yellow": `narandžastožuta`,
  "pale": `bledo`,
  "pink": `ružičasta`,
  "pink red": `ružičastocrvena`,
  "purple": `ljubičasta`,
  "purple magenta": `ljubičasta magenta`,
  "red": `Crvena`,
  "red orange": `crvenonarandžasta`,
  "saturation": `Zasićenje`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} prozirna`,
  "very dark": `veoma tamno`,
  "very light": `vrlo svetlo`,
  "vibrant": `živopisna`,
  "white": `bela`,
  "yellow": `žuto`,
  "yellow green": `žutozelena`
};

// node_modules/react-stately/dist/private/intl/color/sv-SE.mjs
var $9236a6308559a6a1$exports = {};
$9236a6308559a6a1$exports = {
  "alpha": `Alfa`,
  "black": `svart`,
  "blue": `Blått`,
  "blue purple": `blålila`,
  "brightness": `Ljusstyrka`,
  "brown": `brun`,
  "brown yellow": `brungul`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `cyan`,
  "cyan blue": `cyanblå`,
  "dark": `mörk`,
  "gray": `grå`,
  "grayish": `gråaktig`,
  "green": `Grönt`,
  "green cyan": `grön cyan`,
  "hue": `Nyans`,
  "light": `ljus`,
  "lightness": `Ljushet`,
  "magenta": `magenta`,
  "magenta pink": `magentarosa`,
  "orange": `orange`,
  "orange yellow": `orangegul`,
  "pale": `blek`,
  "pink": `rosa`,
  "pink red": `rosaröd`,
  "purple": `lila`,
  "purple magenta": `lila magenta`,
  "red": `Rött`,
  "red orange": `rödorange`,
  "saturation": `Mättnad`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} genomskinlig`,
  "very dark": `mycket mörk`,
  "very light": `mycket ljus`,
  "vibrant": `livfull`,
  "white": `vit`,
  "yellow": `gul`,
  "yellow green": `gulgrön`
};

// node_modules/react-stately/dist/private/intl/color/tr-TR.mjs
var $0784d478afd2e3f3$exports = {};
$0784d478afd2e3f3$exports = {
  "alpha": `Alfa`,
  "black": `siyah`,
  "blue": `Mavi`,
  "blue purple": `mavi mor`,
  "brightness": `Parlaklık`,
  "brown": `kahverengi`,
  "brown yellow": `kahverengi sarı`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `camgöbeği`,
  "cyan blue": `camgöbeği mavi`,
  "dark": `koyu`,
  "gray": `gri`,
  "grayish": `grimsi`,
  "green": `Yeşil`,
  "green cyan": `yeşil camgöbeği`,
  "hue": `Ton`,
  "light": `açık`,
  "lightness": `Canlılık`,
  "magenta": `eflatun`,
  "magenta pink": `eflatun pembe`,
  "orange": `turuncu`,
  "orange yellow": `turuncu sarı`,
  "pale": `solgun`,
  "pink": `pembe`,
  "pink red": `pembe kırmızı`,
  "purple": `mor`,
  "purple magenta": `mor eflatun`,
  "red": `Kırmızı`,
  "red orange": `kırmızı portakal`,
  "saturation": `Doygunluk`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} saydam`,
  "very dark": `çok koyu`,
  "very light": `çok açık`,
  "vibrant": `canlı`,
  "white": `beyaz`,
  "yellow": `sarı`,
  "yellow green": `sarı yeşil`
};

// node_modules/react-stately/dist/private/intl/color/uk-UA.mjs
var $787cf8361e5d651f$exports = {};
$787cf8361e5d651f$exports = {
  "alpha": `Альфа`,
  "black": `чорний`,
  "blue": `Синій`,
  "blue purple": `синьо-фіолетовий`,
  "brightness": `Яскравість`,
  "brown": `коричневий`,
  "brown yellow": `коричнево-жовтий`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `блакитний`,
  "cyan blue": `синьо-блакитний`,
  "dark": `темний`,
  "gray": `сірий`,
  "grayish": `сіруватий`,
  "green": `Зелений`,
  "green cyan": `зелено-блакитний`,
  "hue": `Тон`,
  "light": `світлий`,
  "lightness": `Освітленість`,
  "magenta": `пурпуровий`,
  "magenta pink": `пурпурово-рожевий`,
  "orange": `помаранчевий`,
  "orange yellow": `помаранчево-жовтий`,
  "pale": `блідий`,
  "pink": `рожевий`,
  "pink red": `рожево-червоний`,
  "purple": `фіолетовий`,
  "purple magenta": `фіолетово-пурпуровий`,
  "red": `Червоний`,
  "red orange": `червоно-помаранчевий`,
  "saturation": `Насиченість`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, прозорий на ${args.percentTransparent}`,
  "very dark": `дуже темний`,
  "very light": `дуже світлий`,
  "vibrant": `яскравий`,
  "white": `білий`,
  "yellow": `жовтий`,
  "yellow green": `жовто-зелений`
};

// node_modules/react-stately/dist/private/intl/color/zh-CN.mjs
var $007919799d464b6b$exports = {};
$007919799d464b6b$exports = {
  "alpha": `Alpha`,
  "black": `黑色`,
  "blue": `蓝色`,
  "blue purple": `蓝紫色`,
  "brightness": `亮度`,
  "brown": `棕色的`,
  "brown yellow": `棕黄色`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `蓝绿色`,
  "cyan blue": `青蓝色`,
  "dark": `深色`,
  "gray": `灰色`,
  "grayish": `浅灰色的`,
  "green": `绿色`,
  "green cyan": `绿青色`,
  "hue": `色相`,
  "light": `浅色`,
  "lightness": `明亮度`,
  "magenta": `紫红色`,
  "magenta pink": `紫粉色`,
  "orange": `橙色`,
  "orange yellow": `橙黄色`,
  "pale": `苍白的`,
  "pink": `粉色`,
  "pink red": `粉红色`,
  "purple": `紫色`,
  "purple magenta": `紫洋红色`,
  "red": `红色`,
  "red orange": `红橙色`,
  "saturation": `饱和度`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} 透明`,
  "very dark": `很暗`,
  "very light": `很浅`,
  "vibrant": `生机勃勃`,
  "white": `白色`,
  "yellow": `黄色`,
  "yellow green": `黄色/绿色`
};

// node_modules/react-stately/dist/private/intl/color/zh-TW.mjs
var $e08a91dc11c13fc8$exports = {};
$e08a91dc11c13fc8$exports = {
  "alpha": `Alpha`,
  "black": `黑`,
  "blue": `藍色`,
  "blue purple": `藍紫`,
  "brightness": `亮度`,
  "brown": `棕`,
  "brown yellow": `棕黃`,
  "colorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}`,
  "cyan": `青`,
  "cyan blue": `青藍`,
  "dark": `暗`,
  "gray": `灰`,
  "grayish": `偏灰`,
  "green": `綠色`,
  "green cyan": `青綠`,
  "hue": `色相`,
  "light": `淺`,
  "lightness": `明亮`,
  "magenta": `洋紅`,
  "magenta pink": `淺洋紅`,
  "orange": `橙`,
  "orange yellow": `橙黃`,
  "pale": `淡`,
  "pink": `粉紅`,
  "pink red": `粉紅`,
  "purple": `紫`,
  "purple magenta": `紫洋紅`,
  "red": `紅色`,
  "red orange": `橙紅`,
  "saturation": `飽和度`,
  "transparentColorName": (args) => `${args.lightness} ${args.chroma} ${args.hue}, ${args.percentTransparent} 透明`,
  "very dark": `很暗`,
  "very light": `很淺`,
  "vibrant": `鮮豔`,
  "white": `白`,
  "yellow": `黃`,
  "yellow green": `黃綠`
};

// node_modules/react-stately/dist/private/color/intlStrings.mjs
var $f27aae6ac296c109$exports = {};
$f27aae6ac296c109$exports = {
  "ar-AE": $657b6c680454a954$exports,
  "bg-BG": $889127408c531ba7$exports,
  "cs-CZ": $70544d82283dffb4$exports,
  "da-DK": $dec70d8d5f3cf55e$exports,
  "de-DE": $9522ab9745257c99$exports,
  "el-GR": $26b460c7fbf5c73a$exports,
  "en-US": $91b08ff3e640b4d4$exports,
  "es-ES": $fd77e3dc91499169$exports,
  "et-EE": $1fa550aa4006d82d$exports,
  "fi-FI": $21314fa26efef1a7$exports,
  "fr-FR": $e89aa016b78237dc$exports,
  "he-IL": $a1a6ebcfb4e36dca$exports,
  "hr-HR": $539c3833a6c2e20b$exports,
  "hu-HU": $7f6a753aa3e72c6d$exports,
  "it-IT": $b5c3de7f83e64721$exports,
  "ja-JP": $30e30b94393be6f6$exports,
  "ko-KR": $df8867b82a73bdb3$exports,
  "lt-LT": $390173bd3451fe74$exports,
  "lv-LV": $8874424bc229db3e$exports,
  "nb-NO": $f7492ce78db8051b$exports,
  "nl-NL": $df6c7957db097c77$exports,
  "pl-PL": $44f0438f6ac7145a$exports,
  "pt-BR": $8a75ab7961de49d7$exports,
  "pt-PT": $3648ea0dfef1e48a$exports,
  "ro-RO": $14b4e95a3fa0c42c$exports,
  "ru-RU": $1a8e80058ee5c8e8$exports,
  "sk-SK": $c2f9fb5b2855a5d6$exports,
  "sl-SI": $c5aa45c5d5ce4d33$exports,
  "sr-SP": $5d1a53072fa5427d$exports,
  "sv-SE": $9236a6308559a6a1$exports,
  "tr-TR": $0784d478afd2e3f3$exports,
  "uk-UA": $787cf8361e5d651f$exports,
  "zh-CN": $007919799d464b6b$exports,
  "zh-TW": $e08a91dc11c13fc8$exports
};

// node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var $a747a10fe70a57da$var$localeSymbol = /* @__PURE__ */ Symbol.for("react-aria.i18n.locale");
var $a747a10fe70a57da$var$stringsSymbol = /* @__PURE__ */ Symbol.for("react-aria.i18n.strings");
var $a747a10fe70a57da$var$cachedGlobalStrings = void 0;
var $a747a10fe70a57da$export$c17fa47878dc55b6 = class _$a747a10fe70a57da$export$c17fa47878dc55b6 {
  constructor(messages, defaultLocale = "en-US") {
    this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v));
    this.defaultLocale = defaultLocale;
  }
  /** Returns a localized string for the given key and locale. */
  getStringForLocale(key, locale) {
    let strings = this.getStringsForLocale(locale);
    let string = strings[key];
    if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
    return string;
  }
  /** Returns all localized strings for the given locale. */
  getStringsForLocale(locale) {
    let strings = this.strings[locale];
    if (!strings) {
      strings = $a747a10fe70a57da$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
      this.strings[locale] = strings;
    }
    return strings;
  }
  static getGlobalDictionaryForPackage(packageName) {
    if (typeof window === "undefined") return null;
    let locale = window[$a747a10fe70a57da$var$localeSymbol];
    if ($a747a10fe70a57da$var$cachedGlobalStrings === void 0) {
      let globalStrings = window[$a747a10fe70a57da$var$stringsSymbol];
      if (!globalStrings) return null;
      $a747a10fe70a57da$var$cachedGlobalStrings = {};
      for (let pkg in globalStrings) $a747a10fe70a57da$var$cachedGlobalStrings[pkg] = new _$a747a10fe70a57da$export$c17fa47878dc55b6({
        [locale]: globalStrings[pkg]
      }, locale);
    }
    let dictionary = $a747a10fe70a57da$var$cachedGlobalStrings?.[packageName];
    if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
    return dictionary;
  }
};
function $a747a10fe70a57da$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
  if (strings[locale]) return strings[locale];
  let language = $a747a10fe70a57da$var$getLanguage(locale);
  let script = $a747a10fe70a57da$var$getScript(locale);
  if (script && strings[`${language}-${script}`]) return strings[`${language}-${script}`];
  if (strings[language]) return strings[language];
  for (let key in strings) {
    if (key.startsWith(language + "-")) return strings[key];
  }
  return strings[defaultLocale];
}
function $a747a10fe70a57da$var$getLanguage(locale) {
  if (Intl.Locale)
    return new Intl.Locale(locale).language;
  return locale.split("-")[0];
}
function $a747a10fe70a57da$var$getScript(locale) {
  if (Intl.Locale)
    return new Intl.Locale(locale).script;
  return void 0;
}

// node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var $b27c684a33948c64$var$pluralRulesCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$var$numberFormatCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$export$2f817fcdc4b89ae0 = class {
  constructor(locale, strings) {
    this.locale = locale;
    this.strings = strings;
  }
  /** Formats a localized string for the given key with the provided variables. */
  format(key, variables) {
    let message = this.strings.getStringForLocale(key, this.locale);
    return typeof message === "function" ? message(variables, this) : message;
  }
  plural(count, options, type = "cardinal") {
    let opt = options["=" + count];
    if (opt) return typeof opt === "function" ? opt() : opt;
    let key = this.locale + ":" + type;
    let pluralRules = $b27c684a33948c64$var$pluralRulesCache.get(key);
    if (!pluralRules) {
      pluralRules = new Intl.PluralRules(this.locale, {
        type
      });
      $b27c684a33948c64$var$pluralRulesCache.set(key, pluralRules);
    }
    let selected = pluralRules.select(count);
    opt = options[selected] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
  number(value) {
    let numberFormat = $b27c684a33948c64$var$numberFormatCache.get(this.locale);
    if (!numberFormat) {
      numberFormat = new Intl.NumberFormat(this.locale);
      $b27c684a33948c64$var$numberFormatCache.set(this.locale, numberFormat);
    }
    return numberFormat.format(value);
  }
  select(options, value) {
    let opt = options[value] || options.other;
    return typeof opt === "function" ? opt() : opt;
  }
};

// node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
var $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
  $1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
var $1dfb119a85e764e5$var$supportsUnit = false;
try {
  $1dfb119a85e764e5$var$supportsUnit = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "degree"
  }).resolvedOptions().style === "unit";
} catch {
}
var $1dfb119a85e764e5$var$UNITS = {
  degree: {
    narrow: {
      default: "°",
      "ja-JP": " 度",
      "zh-TW": "度",
      "sl-SI": " °"
    }
  }
};
var $1dfb119a85e764e5$export$cc77c4ff7e8673c5 = class {
  constructor(locale, options = {}) {
    this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
    this.options = options;
  }
  /**
  * Formats a number value as a string, according to the locale and options provided to the
  * constructor.
  */
  format(value) {
    let res = "";
    if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
    else res = this.numberFormatter.format(value);
    if (this.options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
      let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
      if (!unit) return res;
      let values = $1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay];
      res += values[locale] || values.default;
    }
    return res;
  }
  /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  /** Formats a number range as a string. */
  formatRange(start, end) {
    if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    return `${this.format(start)} – ${this.format(end)}`;
  }
  /** Formats a number range as an array of parts. */
  formatRangeToParts(start, end) {
    if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    let startParts = this.numberFormatter.formatToParts(start);
    let endParts = this.numberFormatter.formatToParts(end);
    return [
      ...startParts.map((p) => ({
        ...p,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...endParts.map((p) => ({
        ...p,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let options = this.numberFormatter.resolvedOptions();
    if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
      ...options,
      signDisplay: this.options.signDisplay
    };
    if (!$1dfb119a85e764e5$var$supportsUnit && this.options.style === "unit") options = {
      ...options,
      style: "unit",
      unit: this.options.unit,
      unitDisplay: this.options.unitDisplay
    };
    return options;
  }
};
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
  let { numberingSystem } = options;
  if (numberingSystem && locale.includes("-nu-")) {
    if (!locale.includes("-u-")) locale += "-u-";
    locale += `-nu-${numberingSystem}`;
  }
  if (options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
    let { unit, unitDisplay = "short" } = options;
    if (!unit) throw new Error('unit option must be provided with style: "unit"');
    if (!$1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay]) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
    options = {
      ...options,
      style: "decimal"
    };
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.NumberFormat(locale, options);
  $1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
  if (signDisplay === "auto") return numberFormat.format(num);
  else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
  else {
    let needsPositiveSign = false;
    if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
    else if (signDisplay === "exceptZero") {
      if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
      else needsPositiveSign = num > 0;
    }
    if (needsPositiveSign) {
      let negative = numberFormat.format(-num);
      let noSign = numberFormat.format(num);
      let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
      if ([
        ...minus
      ].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
      let positive = negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
      return positive;
    } else return numberFormat.format(num);
  }
}

// node_modules/@internationalized/number/dist/private/NumberParser.mjs
var $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX = new RegExp("^.*\\(.*\\).*$");
var $eb76cf4feb040f77$var$NUMBERING_SYSTEMS = [
  "latn",
  "arab",
  "hanidec",
  "deva",
  "beng",
  "fullwide"
];
var $eb76cf4feb040f77$export$cd11ab140839f11d = class {
  constructor(locale, options = {}) {
    this.locale = locale;
    this.options = options;
  }
  /**
  * Parses the given string to a number. Returns NaN if a valid number could not be parsed.
  */
  parse(value) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
  }
  /**
  * Returns whether the given string could potentially be a valid number. This should be used to
  * validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
  * of the minus/plus sign characters can be checked.
  */
  isValidPartialNumber(value, minValue, maxValue) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
  }
  /**
  * Returns a numbering system for which the given string is valid in the current locale.
  * If no numbering system could be detected, the default numbering system for the current
  * locale is returned.
  */
  getNumberingSystem(value) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
  }
};
var $eb76cf4feb040f77$var$numberParserCache = /* @__PURE__ */ new Map();
function $eb76cf4feb040f77$var$getNumberParserImpl(locale, options, value) {
  let defaultParser = $eb76cf4feb040f77$var$getCachedNumberParser(locale, options);
  if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
    for (let numberingSystem of $eb76cf4feb040f77$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
      let parser = $eb76cf4feb040f77$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
      if (parser.isValidPartialNumber(value)) return parser;
    }
  }
  return defaultParser;
}
function $eb76cf4feb040f77$var$getCachedNumberParser(locale, options) {
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  let parser = $eb76cf4feb040f77$var$numberParserCache.get(cacheKey);
  if (!parser) {
    parser = new $eb76cf4feb040f77$var$NumberParserImpl(locale, options);
    $eb76cf4feb040f77$var$numberParserCache.set(cacheKey, parser);
  }
  return parser;
}
var $eb76cf4feb040f77$var$NumberParserImpl = class {
  constructor(locale, options = {}) {
    this.locale = locale;
    if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
      if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
        options.maximumFractionDigits = 0;
        options.minimumFractionDigits = 0;
      } else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
      else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
    }
    this.formatter = new Intl.NumberFormat(locale, options);
    this.options = this.formatter.resolvedOptions();
    this.symbols = $eb76cf4feb040f77$var$getSymbols(locale, this.formatter, this.options, options);
    if (this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
  }
  parse(value) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    let fullySanitizedValue = this.sanitize(value);
    if (!isGroupSymbolAllowed && this.symbols.group && fullySanitizedValue.includes(this.symbols.group)) return NaN;
    else if (this.symbols.group) fullySanitizedValue = fullySanitizedValue.replaceAll(this.symbols.group, "");
    if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
    if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
    fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
    if (this.options.style === "percent") {
      let isNegative = fullySanitizedValue.indexOf("-");
      fullySanitizedValue = fullySanitizedValue.replace("-", "");
      fullySanitizedValue = fullySanitizedValue.replace("+", "");
      let index = fullySanitizedValue.indexOf(".");
      if (index === -1) index = fullySanitizedValue.length;
      fullySanitizedValue = fullySanitizedValue.replace(".", "");
      if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
      else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
      else if (index - 2 === -2) fullySanitizedValue = "0.00";
      else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
      if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
    }
    let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
    if (isNaN(newValue)) return NaN;
    if (this.options.style === "percent") {
      let options = {
        ...this.options,
        style: "decimal",
        minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
        maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
      };
      return new $eb76cf4feb040f77$export$cd11ab140839f11d(this.locale, options).parse(new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(this.locale, options).format(newValue));
    }
    if (this.options.currencySign === "accounting" && $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
    return newValue;
  }
  sanitize(value) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    if (this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((obj) => obj.unit === value)) return this.symbols.noNumeralUnits.find((obj) => obj.unit === value).value.toString();
    value = value.replace(this.symbols.literals, "");
    if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
    if (this.options.numberingSystem === "arab") {
      if (this.symbols.decimal) {
        value = $eb76cf4feb040f77$var$replaceAll(value, ",", this.symbols.decimal);
        value = $eb76cf4feb040f77$var$replaceAll(value, String.fromCharCode(1548), this.symbols.decimal);
      }
      if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, ".", this.symbols.group);
    }
    if (this.symbols.group === "’" && value.includes("'") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "'", this.symbols.group);
    if (this.symbols.group === "'" && value.includes("’") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "’", this.symbols.group);
    if (this.options.locale === "fr-FR" && this.symbols.group && isGroupSymbolAllowed) {
      value = $eb76cf4feb040f77$var$replaceAll(value, " ", this.symbols.group);
      value = $eb76cf4feb040f77$var$replaceAll(value, /\u00A0/g, this.symbols.group);
    }
    return value;
  }
  isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    value = this.sanitize(value);
    if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
    else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
    if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
    if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, this.symbols.group, "");
    value = value.replace(this.symbols.numeral, "");
    if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
    return value.length === 0;
  }
};
var $eb76cf4feb040f77$var$nonLiteralParts = /* @__PURE__ */ new Set([
  "decimal",
  "fraction",
  "integer",
  "minusSign",
  "plusSign",
  "group"
]);
var $eb76cf4feb040f77$var$pluralNumbers = [
  0,
  4,
  2,
  1,
  11,
  20,
  3,
  7,
  100,
  21,
  0.1,
  1.1
];
function $eb76cf4feb040f77$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
  let symbolFormatter = new Intl.NumberFormat(locale, {
    ...intlOptions,
    // Resets so we get the full range of symbols
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 21,
    roundingIncrement: 1,
    roundingPriority: "auto",
    roundingMode: "halfExpand",
    useGrouping: true
  });
  let allParts = symbolFormatter.formatToParts(-10000.111);
  let posAllParts = symbolFormatter.formatToParts(10000.111);
  let pluralParts = $eb76cf4feb040f77$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
  let noNumeralUnits = pluralParts.map((p, i) => {
    let unit = p.find((p2) => p2.type === "unit");
    if (unit && !p.some((p2) => p2.type === "integer" || p2.type === "fraction")) return {
      unit: unit.value,
      value: $eb76cf4feb040f77$var$pluralNumbers[i]
    };
    return null;
  }).filter((p) => !!p);
  let minusSign = allParts.find((p) => p.type === "minusSign")?.value ?? "-";
  let plusSign = posAllParts.find((p) => p.type === "plusSign")?.value;
  if (!plusSign && (originalOptions?.signDisplay === "exceptZero" || originalOptions?.signDisplay === "always")) plusSign = "+";
  let decimalParts = new Intl.NumberFormat(locale, {
    ...intlOptions,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).formatToParts(1e-3);
  let decimal = decimalParts.find((p) => p.type === "decimal")?.value;
  let group = allParts.find((p) => p.type === "group")?.value;
  let allPartsLiterals = allParts.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value));
  let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p2) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p2.type)).map((p2) => $eb76cf4feb040f77$var$escapeRegex(p2.value)));
  let sortedLiterals = [
    .../* @__PURE__ */ new Set([
      ...allPartsLiterals,
      ...pluralPartsLiterals
    ])
  ].sort((a, b) => b.length - a.length);
  let literals = sortedLiterals.length === 0 ? new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${sortedLiterals.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu");
  let numerals = [
    ...new Intl.NumberFormat(intlOptions.locale, {
      useGrouping: false
    }).format(9876543210)
  ].reverse();
  let indexes = new Map(numerals.map((d, i) => [
    d,
    i
  ]));
  let numeral = new RegExp(`[${numerals.join("")}]`, "g");
  let index = (d) => String(indexes.get(d));
  return {
    minusSign,
    plusSign,
    decimal,
    group,
    literals,
    numeral,
    numerals,
    index,
    noNumeralUnits
  };
}
function $eb76cf4feb040f77$var$replaceAll(str, find, replace) {
  if (str.replaceAll) return str.replaceAll(find, replace);
  return str.split(find).join(replace);
}
function $eb76cf4feb040f77$var$escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// node_modules/react-stately/dist/private/color/Color.mjs
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $890783418b00a858$var$dictionary = new (0, $a747a10fe70a57da$export$c17fa47878dc55b6)((0, $parcel$interopDefault($f27aae6ac296c109$exports)));
function $890783418b00a858$export$6e865ea70d7724f(value) {
  let res = $890783418b00a858$var$RGBColor.parse(value) || $890783418b00a858$var$HSBColor.parse(value) || $890783418b00a858$var$HSLColor.parse(value);
  if (res) return res;
  throw new Error("Invalid color value: " + value);
}
function $890783418b00a858$export$4cde5df63f53f473(v) {
  if (typeof v === "string") return $890783418b00a858$export$6e865ea70d7724f(v);
  else return v;
}
function $890783418b00a858$export$1c0c08912582810c(colorSpace) {
  switch (colorSpace) {
    case "rgb":
      return $890783418b00a858$var$RGBColor.colorChannels;
    case "hsl":
      return $890783418b00a858$var$HSLColor.colorChannels;
    case "hsb":
      return $890783418b00a858$var$HSBColor.colorChannels;
  }
}
function $890783418b00a858$export$87f5012e10bb20b2(hue) {
  if (hue === 360) return hue;
  return (hue % 360 + 360) % 360;
}
var $890783418b00a858$var$ORANGE_LIGHTNESS_THRESHOLD = 0.68;
var $890783418b00a858$var$YELLOW_GREEN_LIGHTNESS_THRESHOLD = 0.85;
var $890783418b00a858$var$MAX_DARK_LIGHTNESS = 0.55;
var $890783418b00a858$var$GRAY_THRESHOLD = 1e-3;
var $890783418b00a858$var$OKLCH_HUES = [
  [
    0,
    "pink"
  ],
  [
    15,
    "red"
  ],
  [
    48,
    "orange"
  ],
  [
    94,
    "yellow"
  ],
  [
    135,
    "green"
  ],
  [
    175,
    "cyan"
  ],
  [
    264,
    "blue"
  ],
  [
    284,
    "purple"
  ],
  [
    320,
    "magenta"
  ],
  [
    349,
    "pink"
  ]
];
var $890783418b00a858$var$Color = class {
  toHexInt() {
    return this.toFormat("rgb").toHexInt();
  }
  getChannelValue(channel) {
    if (channel in this) return this[channel];
    throw new Error("Unsupported color channel: " + channel);
  }
  withChannelValue(channel, value) {
    if (channel in this) {
      let x = this.clone();
      x[channel] = value;
      return x;
    }
    throw new Error("Unsupported color channel: " + channel);
  }
  getChannelName(channel, locale) {
    let strings = (0, $a747a10fe70a57da$export$c17fa47878dc55b6).getGlobalDictionaryForPackage("@react-stately/color") || $890783418b00a858$var$dictionary;
    return strings.getStringForLocale(channel, locale);
  }
  getColorSpaceAxes(xyChannels) {
    let { xChannel, yChannel } = xyChannels;
    let xCh = xChannel || this.getColorChannels().find((c) => c !== yChannel);
    let yCh = yChannel || this.getColorChannels().find((c) => c !== xCh);
    let zCh = this.getColorChannels().find((c) => c !== xCh && c !== yCh);
    return {
      xChannel: xCh,
      yChannel: yCh,
      zChannel: zCh
    };
  }
  getColorName(locale) {
    let [l, c, h] = $890783418b00a858$var$toOKLCH(this);
    let strings = (0, $a747a10fe70a57da$export$c17fa47878dc55b6).getGlobalDictionaryForPackage("@react-stately/color") || $890783418b00a858$var$dictionary;
    if (l > 0.999) return strings.getStringForLocale("white", locale);
    if (l < 1e-3) return strings.getStringForLocale("black", locale);
    let hue;
    [hue, l] = this.getOklchHue(l, c, h, locale);
    let lightness = "";
    let chroma = "";
    if (c <= 0.1 && c >= $890783418b00a858$var$GRAY_THRESHOLD) {
      if (l >= 0.7) chroma = "pale";
      else chroma = "grayish";
    } else if (c >= 0.15) chroma = "vibrant";
    if (l < 0.3) lightness = "very dark";
    else if (l < $890783418b00a858$var$MAX_DARK_LIGHTNESS) lightness = "dark";
    else if (l < 0.7) ;
    else if (l < 0.85) lightness = "light";
    else lightness = "very light";
    if (chroma) chroma = strings.getStringForLocale(chroma, locale);
    if (lightness) lightness = strings.getStringForLocale(lightness, locale);
    let alpha = this.getChannelValue("alpha");
    let formatter = new (0, $b27c684a33948c64$export$2f817fcdc4b89ae0)(locale, strings);
    if (alpha < 1) {
      let percentTransparent = new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, {
        style: "percent"
      }).format(1 - alpha);
      return formatter.format("transparentColorName", {
        lightness,
        chroma,
        hue,
        percentTransparent
      }).replace(/\s+/g, " ").trim();
    } else return formatter.format("colorName", {
      lightness,
      chroma,
      hue
    }).replace(/\s+/g, " ").trim();
  }
  getOklchHue(l, c, h, locale) {
    let strings = (0, $a747a10fe70a57da$export$c17fa47878dc55b6).getGlobalDictionaryForPackage("@react-stately/color") || $890783418b00a858$var$dictionary;
    if (c < $890783418b00a858$var$GRAY_THRESHOLD) return [
      strings.getStringForLocale("gray", locale),
      l
    ];
    for (let i = 0; i < $890783418b00a858$var$OKLCH_HUES.length; i++) {
      let [hue, hueName] = $890783418b00a858$var$OKLCH_HUES[i];
      let [nextHue, nextHueName] = $890783418b00a858$var$OKLCH_HUES[i + 1] || [
        360,
        "pink"
      ];
      if (h >= hue && h < nextHue) {
        if (hueName === "orange") {
          if (l < $890783418b00a858$var$ORANGE_LIGHTNESS_THRESHOLD) hueName = "brown";
          else
            l = l - $890783418b00a858$var$ORANGE_LIGHTNESS_THRESHOLD + $890783418b00a858$var$MAX_DARK_LIGHTNESS;
        }
        if (h > hue + (nextHue - hue) / 2 && hueName !== nextHueName) hueName = `${hueName} ${nextHueName}`;
        else if (hueName === "yellow" && l < $890783418b00a858$var$YELLOW_GREEN_LIGHTNESS_THRESHOLD)
          hueName = "yellow green";
        let name = strings.getStringForLocale(hueName, locale).toLocaleLowerCase(locale);
        return [
          name,
          l
        ];
      }
    }
    throw new Error("Unexpected hue");
  }
  getHueName(locale) {
    let [l, c, h] = $890783418b00a858$var$toOKLCH(this);
    let [name] = this.getOklchHue(l, c, h, locale);
    return name;
  }
};
var _$890783418b00a858$var$RGBColor = class _$890783418b00a858$var$RGBColor extends $890783418b00a858$var$Color {
  constructor(red, green, blue, alpha) {
    super(), this.red = red, this.green = green, this.blue = blue, this.alpha = alpha;
  }
  static parse(value) {
    let colors = [];
    if (/^#[\da-f]+$/i.test(value) && [
      4,
      5,
      7,
      9
    ].includes(value.length)) {
      const values = (value.length < 6 ? value.replace(/[^#]/gi, "$&$&") : value).slice(1).split("");
      while (values.length > 0) colors.push(parseInt(values.splice(0, 2).join(""), 16));
      colors[3] = colors[3] !== void 0 ? colors[3] / 255 : void 0;
    }
    const match = value.match(/^rgba?\((.*)\)$/);
    if (match?.[1]) {
      colors = match[1].split(",").map((value2) => Number(value2.trim()));
      colors = colors.map((num, i) => {
        return (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(num ?? 0, 0, i < 3 ? 255 : 1);
      });
    }
    if (colors[0] === void 0 || colors[1] === void 0 || colors[2] === void 0) return void 0;
    return colors.length < 3 ? void 0 : new _$890783418b00a858$var$RGBColor(colors[0], colors[1], colors[2], colors[3] ?? 1);
  }
  toString(format = "css") {
    switch (format) {
      case "hex":
        return "#" + (this.red.toString(16).padStart(2, "0") + this.green.toString(16).padStart(2, "0") + this.blue.toString(16).padStart(2, "0")).toUpperCase();
      case "hexa":
        return "#" + (this.red.toString(16).padStart(2, "0") + this.green.toString(16).padStart(2, "0") + this.blue.toString(16).padStart(2, "0") + Math.round(this.alpha * 255).toString(16).padStart(2, "0")).toUpperCase();
      case "rgb":
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
      case "css":
      case "rgba":
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
      default:
        return this.toFormat(format).toString(format);
    }
  }
  toFormat(format) {
    switch (format) {
      case "hex":
      case "hexa":
      case "rgb":
      case "rgba":
        return this;
      case "hsb":
      case "hsba":
        return this.toHSB();
      case "hsl":
      case "hsla":
        return this.toHSL();
      default:
        throw new Error("Unsupported color conversion: rgb -> " + format);
    }
  }
  toHexInt() {
    return this.red << 16 | this.green << 8 | this.blue;
  }
  /**
  * Converts an RGB color value to HSB.
  * Conversion formula adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
  *
  * @returns An HSBColor object.
  */
  toHSB() {
    const red = this.red / 255;
    const green = this.green / 255;
    const blue = this.blue / 255;
    const min = Math.min(red, green, blue);
    const brightness = Math.max(red, green, blue);
    const chroma = brightness - min;
    const saturation = brightness === 0 ? 0 : chroma / brightness;
    let hue = 0;
    if (chroma !== 0) {
      switch (brightness) {
        case red:
          hue = (green - blue) / chroma + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / chroma + 2;
          break;
        case blue:
          hue = (red - green) / chroma + 4;
          break;
      }
      hue /= 6;
    }
    return new $890783418b00a858$var$HSBColor((0, $240e9101ba2842f5$export$b6268554fba451f)(hue * 360, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(saturation * 100, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(brightness * 100, 2), this.alpha);
  }
  /**
  * Converts an RGB color value to HSL.
  * Conversion formula adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB.
  *
  * @returns An HSLColor object.
  */
  toHSL() {
    const red = this.red / 255;
    const green = this.green / 255;
    const blue = this.blue / 255;
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const lightness = (max + min) / 2;
    const chroma = max - min;
    let hue;
    let saturation;
    if (chroma === 0) hue = saturation = 0;
    else {
      saturation = chroma / (lightness < 0.5 ? max + min : 2 - max - min);
      switch (max) {
        case red:
          hue = (green - blue) / chroma + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / chroma + 2;
          break;
        case blue:
        default:
          hue = (red - green) / chroma + 4;
          break;
      }
      hue /= 6;
    }
    return new $890783418b00a858$var$HSLColor((0, $240e9101ba2842f5$export$b6268554fba451f)(hue * 360, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(saturation * 100, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(lightness * 100, 2), this.alpha);
  }
  clone() {
    return new _$890783418b00a858$var$RGBColor(this.red, this.green, this.blue, this.alpha);
  }
  getChannelRange(channel) {
    switch (channel) {
      case "red":
      case "green":
      case "blue":
        return {
          minValue: 0,
          maxValue: 255,
          step: 1,
          pageSize: 17
        };
      case "alpha":
        return {
          minValue: 0,
          maxValue: 1,
          step: 0.01,
          pageSize: 0.1
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  getChannelFormatOptions(channel) {
    switch (channel) {
      case "red":
      case "green":
      case "blue":
        return {
          style: "decimal"
        };
      case "alpha":
        return {
          style: "percent"
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  formatChannelValue(channel, locale) {
    let options = this.getChannelFormatOptions(channel);
    let value = this.getChannelValue(channel);
    return new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, options).format(value);
  }
  getColorSpace() {
    return "rgb";
  }
  getColorChannels() {
    return _$890783418b00a858$var$RGBColor.colorChannels;
  }
};
_$890783418b00a858$var$RGBColor.colorChannels = [
  "red",
  "green",
  "blue"
];
var $890783418b00a858$var$RGBColor = _$890783418b00a858$var$RGBColor;
var $890783418b00a858$var$HSB_REGEX = /hsb\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%)\)|hsba\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d(.\d+)?)\)/;
var _$890783418b00a858$var$HSBColor = class _$890783418b00a858$var$HSBColor extends $890783418b00a858$var$Color {
  constructor(hue, saturation, brightness, alpha) {
    super(), this.hue = hue, this.saturation = saturation, this.brightness = brightness, this.alpha = alpha;
  }
  static parse(value) {
    let m;
    if (m = value.match($890783418b00a858$var$HSB_REGEX)) {
      const [h, s, b, a] = (m[1] ?? m[2]).split(",").map((n) => Number(n.trim().replace("%", "")));
      return new _$890783418b00a858$var$HSBColor($890783418b00a858$export$87f5012e10bb20b2(h), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(s, 0, 100), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(b, 0, 100), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(a ?? 1, 0, 1));
    }
  }
  toString(format = "css") {
    switch (format) {
      case "css":
        return this.toHSL().toString("css");
      case "hex":
        return this.toRGB().toString("hex");
      case "hexa":
        return this.toRGB().toString("hexa");
      case "hsb":
        return `hsb(${this.hue}, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.saturation, 2)}%, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.brightness, 2)}%)`;
      case "hsba":
        return `hsba(${this.hue}, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.saturation, 2)}%, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.brightness, 2)}%, ${this.alpha})`;
      default:
        return this.toFormat(format).toString(format);
    }
  }
  toFormat(format) {
    switch (format) {
      case "hsb":
      case "hsba":
        return this;
      case "hsl":
      case "hsla":
        return this.toHSL();
      case "rgb":
      case "rgba":
        return this.toRGB();
      default:
        throw new Error("Unsupported color conversion: hsb -> " + format);
    }
  }
  /**
  * Converts a HSB color to HSL.
  * Conversion formula adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL.
  *
  * @returns An HSLColor object.
  */
  toHSL() {
    let saturation = this.saturation / 100;
    let brightness = this.brightness / 100;
    let lightness = brightness * (1 - saturation / 2);
    saturation = lightness === 0 || lightness === 1 ? 0 : (brightness - lightness) / Math.min(lightness, 1 - lightness);
    return new $890783418b00a858$var$HSLColor((0, $240e9101ba2842f5$export$b6268554fba451f)(this.hue, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(saturation * 100, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(lightness * 100, 2), this.alpha);
  }
  /**
  * Converts a HSV color value to RGB. Conversion formula adapted from
  * https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative.
  *
  * @returns An RGBColor object.
  */
  toRGB() {
    let hue = this.hue;
    let saturation = this.saturation / 100;
    let brightness = this.brightness / 100;
    let fn = (n, k = (n + hue / 60) % 6) => brightness - saturation * brightness * Math.max(Math.min(k, 4 - k, 1), 0);
    return new $890783418b00a858$var$RGBColor(Math.round(fn(5) * 255), Math.round(fn(3) * 255), Math.round(fn(1) * 255), this.alpha);
  }
  clone() {
    return new _$890783418b00a858$var$HSBColor(this.hue, this.saturation, this.brightness, this.alpha);
  }
  getChannelRange(channel) {
    switch (channel) {
      case "hue":
        return {
          minValue: 0,
          maxValue: 360,
          step: 1,
          pageSize: 15
        };
      case "saturation":
      case "brightness":
        return {
          minValue: 0,
          maxValue: 100,
          step: 1,
          pageSize: 10
        };
      case "alpha":
        return {
          minValue: 0,
          maxValue: 1,
          step: 0.01,
          pageSize: 0.1
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  getChannelFormatOptions(channel) {
    switch (channel) {
      case "hue":
        return {
          style: "unit",
          unit: "degree",
          unitDisplay: "narrow"
        };
      case "saturation":
      case "brightness":
      case "alpha":
        return {
          style: "percent"
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  formatChannelValue(channel, locale) {
    let options = this.getChannelFormatOptions(channel);
    let value = this.getChannelValue(channel);
    if (channel === "saturation" || channel === "brightness") value /= 100;
    return new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, options).format(value);
  }
  getColorSpace() {
    return "hsb";
  }
  getColorChannels() {
    return _$890783418b00a858$var$HSBColor.colorChannels;
  }
};
_$890783418b00a858$var$HSBColor.colorChannels = [
  "hue",
  "saturation",
  "brightness"
];
var $890783418b00a858$var$HSBColor = _$890783418b00a858$var$HSBColor;
var $890783418b00a858$var$HSL_REGEX = /hsl\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%)\)|hsla\(([-+]?\d+(?:.\d+)?\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d+(?:.\d+)?%\s*,\s*[-+]?\d(.\d+)?)\)/;
var _$890783418b00a858$var$HSLColor = class _$890783418b00a858$var$HSLColor extends $890783418b00a858$var$Color {
  constructor(hue, saturation, lightness, alpha) {
    super(), this.hue = hue, this.saturation = saturation, this.lightness = lightness, this.alpha = alpha;
  }
  static parse(value) {
    let m;
    if (m = value.match($890783418b00a858$var$HSL_REGEX)) {
      const [h, s, l, a] = (m[1] ?? m[2]).split(",").map((n) => Number(n.trim().replace("%", "")));
      return new _$890783418b00a858$var$HSLColor($890783418b00a858$export$87f5012e10bb20b2(h), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(s, 0, 100), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(l, 0, 100), (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(a ?? 1, 0, 1));
    }
  }
  toString(format = "css") {
    switch (format) {
      case "hex":
        return this.toRGB().toString("hex");
      case "hexa":
        return this.toRGB().toString("hexa");
      case "hsl":
        return `hsl(${this.hue}, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.saturation, 2)}%, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.lightness, 2)}%)`;
      case "css":
      case "hsla":
        return `hsla(${this.hue}, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.saturation, 2)}%, ${(0, $240e9101ba2842f5$export$b6268554fba451f)(this.lightness, 2)}%, ${this.alpha})`;
      default:
        return this.toFormat(format).toString(format);
    }
  }
  toFormat(format) {
    switch (format) {
      case "hsl":
      case "hsla":
        return this;
      case "hsb":
      case "hsba":
        return this.toHSB();
      case "rgb":
      case "rgba":
        return this.toRGB();
      default:
        throw new Error("Unsupported color conversion: hsl -> " + format);
    }
  }
  /**
  * Converts a HSL color to HSB.
  * Conversion formula adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV.
  *
  * @returns An HSBColor object.
  */
  toHSB() {
    let saturation = this.saturation / 100;
    let lightness = this.lightness / 100;
    let brightness = lightness + saturation * Math.min(lightness, 1 - lightness);
    saturation = brightness === 0 ? 0 : 2 * (1 - lightness / brightness);
    return new $890783418b00a858$var$HSBColor((0, $240e9101ba2842f5$export$b6268554fba451f)(this.hue, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(saturation * 100, 2), (0, $240e9101ba2842f5$export$b6268554fba451f)(brightness * 100, 2), this.alpha);
  }
  /**
  * Converts a HSL color to RGB. Conversion formula adapted from
  * https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative.
  *
  * @returns An RGBColor object.
  */
  toRGB() {
    let hue = this.hue;
    let saturation = this.saturation / 100;
    let lightness = this.lightness / 100;
    let a = saturation * Math.min(lightness, 1 - lightness);
    let fn = (n, k = (n + hue / 30) % 12) => lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return new $890783418b00a858$var$RGBColor(Math.round(fn(0) * 255), Math.round(fn(8) * 255), Math.round(fn(4) * 255), this.alpha);
  }
  clone() {
    return new _$890783418b00a858$var$HSLColor(this.hue, this.saturation, this.lightness, this.alpha);
  }
  getChannelRange(channel) {
    switch (channel) {
      case "hue":
        return {
          minValue: 0,
          maxValue: 360,
          step: 1,
          pageSize: 15
        };
      case "saturation":
      case "lightness":
        return {
          minValue: 0,
          maxValue: 100,
          step: 1,
          pageSize: 10
        };
      case "alpha":
        return {
          minValue: 0,
          maxValue: 1,
          step: 0.01,
          pageSize: 0.1
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  getChannelFormatOptions(channel) {
    switch (channel) {
      case "hue":
        return {
          style: "unit",
          unit: "degree",
          unitDisplay: "narrow"
        };
      case "saturation":
      case "lightness":
      case "alpha":
        return {
          style: "percent"
        };
      default:
        throw new Error("Unknown color channel: " + channel);
    }
  }
  formatChannelValue(channel, locale) {
    let options = this.getChannelFormatOptions(channel);
    let value = this.getChannelValue(channel);
    if (channel === "saturation" || channel === "lightness") value /= 100;
    return new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, options).format(value);
  }
  getColorSpace() {
    return "hsl";
  }
  getColorChannels() {
    return _$890783418b00a858$var$HSLColor.colorChannels;
  }
};
_$890783418b00a858$var$HSLColor.colorChannels = [
  "hue",
  "saturation",
  "lightness"
];
var $890783418b00a858$var$HSLColor = _$890783418b00a858$var$HSLColor;
function $890783418b00a858$var$toOKLCH(color) {
  let rgb = color.toFormat("rgb");
  let red = rgb.getChannelValue("red") / 255;
  let green = rgb.getChannelValue("green") / 255;
  let blue = rgb.getChannelValue("blue") / 255;
  [red, green, blue] = $890783418b00a858$var$lin_sRGB(red, green, blue);
  let [x, y, z] = $890783418b00a858$var$lin_sRGB_to_XYZ(red, green, blue);
  let [l, a, b] = $890783418b00a858$var$XYZ_to_OKLab(x, y, z);
  return $890783418b00a858$var$OKLab_to_OKLCH(l, a, b);
}
function $890783418b00a858$var$OKLab_to_OKLCH(l, a, b) {
  var hue = Math.atan2(b, a) * 180 / Math.PI;
  return [
    l,
    Math.sqrt(a ** 2 + b ** 2),
    hue >= 0 ? hue : hue + 360
    // Hue, in degrees [0 to 360)
  ];
}
function $890783418b00a858$var$lin_sRGB(r, g, b) {
  return [
    $890783418b00a858$var$lin_sRGB_component(r),
    $890783418b00a858$var$lin_sRGB_component(g),
    $890783418b00a858$var$lin_sRGB_component(b)
  ];
}
function $890783418b00a858$var$lin_sRGB_component(val) {
  let sign = val < 0 ? -1 : 1;
  let abs = Math.abs(val);
  if (abs <= 0.04045) return val / 12.92;
  return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
}
function $890783418b00a858$var$lin_sRGB_to_XYZ(r, g, b) {
  const M = [
    506752 / 1228815,
    87881 / 245763,
    12673 / 70218,
    87098 / 409605,
    175762 / 245763,
    12673 / 175545,
    7918 / 409605,
    87881 / 737289,
    1001167 / 1053270
  ];
  return $890783418b00a858$var$multiplyMatrix(M, r, g, b);
}
function $890783418b00a858$var$XYZ_to_OKLab(x, y, z) {
  const XYZtoLMS = [
    0.819022437996703,
    0.3619062600528904,
    -0.1288737815209879,
    0.0329836539323885,
    0.9292868615863434,
    0.0361446663506424,
    0.0481771893596242,
    0.2642395317527308,
    0.6335478284694309
  ];
  const LMStoOKLab = [
    0.210454268309314,
    0.7936177747023054,
    -0.0040720430116193,
    1.9779985324311684,
    -2.42859224204858,
    0.450593709617411,
    0.0259040424655478,
    0.7827717124575296,
    -0.8086757549230774
  ];
  let [a, b, c] = $890783418b00a858$var$multiplyMatrix(XYZtoLMS, x, y, z);
  return $890783418b00a858$var$multiplyMatrix(LMStoOKLab, Math.cbrt(a), Math.cbrt(b), Math.cbrt(c));
}
function $890783418b00a858$var$multiplyMatrix(m, x, y, z) {
  let a = m[0] * x + m[1] * y + m[2] * z;
  let b = m[3] * x + m[4] * y + m[5] * z;
  let c = m[6] * x + m[7] * y + m[8] * z;
  return [
    a,
    b,
    c
  ];
}

// node_modules/react-stately/dist/private/tokenfield/TokenFieldValue.mjs
var $4a46f1c4231e5dde$export$939a711fc6327372 = class {
  /**
  * Creates a new selection range. If only a single position is provided, the selection is
  * collapsed.
  */
  constructor(anchor, current = anchor) {
    this.anchor = anchor;
    this.current = current;
  }
  /** Whether the selection is collapsed to a single caret position. */
  get isCollapsed() {
    return this.anchor.index === this.current.index && this.anchor.offset === this.current.offset;
  }
  /** The side of the selection closest to the start of the value. */
  get start() {
    return $4a46f1c4231e5dde$var$compare(this.anchor, this.current) < 0 ? this.anchor : this.current;
  }
  /** The side of the selection closest to the end of the value. */
  get end() {
    return $4a46f1c4231e5dde$var$compare(this.anchor, this.current) < 0 ? this.current : this.anchor;
  }
  /** Returns whether this selection is equal to another. */
  isEqual(other) {
    if (this === other) return true;
    return this.anchor.index === other.anchor.index && this.anchor.offset === other.anchor.offset && this.current.index === other.current.index && this.current.offset === other.current.offset;
  }
};
function $4a46f1c4231e5dde$var$compare(a, b) {
  if (a.index === b.index) return a.offset - b.offset;
  return a.index - b.index;
}
var $4a46f1c4231e5dde$var$Direction = (function(Direction) {
  Direction[Direction["Forward"] = 1] = "Forward";
  Direction[Direction["Backward"] = -1] = "Backward";
  return Direction;
})($4a46f1c4231e5dde$var$Direction || {});
var _$4a46f1c4231e5dde$export$f3decd0c2cd2fe2e = class _$4a46f1c4231e5dde$export$f3decd0c2cd2fe2e {
  /** Create a new list with the given segments. */
  constructor(tokens, options) {
    this.previous = null;
    this.next = null;
    this.isCoalescing = true;
    this.segments = tokens;
    this.selectedRange = options?.selectedRange ?? new $4a46f1c4231e5dde$export$939a711fc6327372({
      index: 0,
      offset: 0
    });
  }
  createFieldValue(segments) {
    const Constructor = this.constructor;
    return new Constructor(segments);
  }
  get caretPosition() {
    return this.selectedRange.current;
  }
  /** Create a new list with the caret position set to the given position. */
  withSelectedRange(selectedRange) {
    if (this.selectedRange.isEqual(selectedRange)) return this;
    let result = this.createFieldValue(this.segments);
    result.selectedRange = selectedRange;
    result.previous = this.previous;
    result.next = this.next;
    result.isCoalescing = this.isCoalescing;
    return result;
  }
  withCaretPosition(position) {
    return this.withSelectedRange(new $4a46f1c4231e5dde$export$939a711fc6327372(position));
  }
  splitSegment(segment, offset) {
    if (!segment) {
      let empty = this.createTextSegment("");
      return [
        offset > 0 ? empty : null,
        offset > 0 ? null : empty
      ];
    }
    if (segment.type === "token") return [
      offset > 0 ? {
        ...segment
      } : null,
      offset > 0 ? null : {
        ...segment
      }
    ];
    return [
      offset > 0 ? {
        type: "text",
        text: segment.text.slice(0, offset)
      } : null,
      offset < segment.text.length ? this.createTextSegment(segment.text.slice(offset)) : null
    ];
  }
  createTextSegment(text) {
    return {
      type: "text",
      text
    };
  }
  tokenize(text) {
    return [
      this.createTextSegment(text)
    ];
  }
  clampPosition(position) {
    if (this.segments.length > 0 && position.index >= this.segments.length) return {
      index: this.segments.length - 1,
      offset: this.segments[this.segments.length - 1].text.length
    };
    if (position.index < 0) return {
      index: 0,
      offset: 0
    };
    return position;
  }
  /** Replace the text between two positions with new text. */
  replaceRange(start, end, text, coalesce = true) {
    return this.replaceRangeWithSegments(start, end, text.length > 0 ? [
      this.createTextSegment(text)
    ] : [], coalesce);
  }
  /** Replace the text between two positions with new segments. */
  replaceRangeWithSegments(start, end, insert, coalesce = true) {
    start = this.clampPosition(start);
    end = this.clampPosition(end);
    let startSegment = this.segments[start.index];
    let endSegment = this.segments[end.index];
    let [startSplit] = this.splitSegment(startSegment, start.offset);
    let [, endSplit] = this.splitSegment(endSegment, end.offset);
    let newSegments = this.segments.slice(0, start.index);
    if (startSplit) $4a46f1c4231e5dde$var$appendSegments(newSegments, [
      startSplit
    ]);
    if (insert.length) $4a46f1c4231e5dde$var$appendSegments(newSegments, insert, (text) => this.tokenize(text));
    let lastSegment = newSegments[newSegments.length - 1];
    let lastIsText = lastSegment && lastSegment.type === "text";
    let caret = {
      index: lastIsText ? newSegments.length - 1 : newSegments.length,
      offset: lastIsText ? lastSegment.text.length : 0
    };
    if (endSplit) $4a46f1c4231e5dde$var$appendSegments(newSegments, [
      endSplit
    ]);
    $4a46f1c4231e5dde$var$appendSegments(newSegments, this.segments.slice(end.index + 1));
    let segments = this.createFieldValue(newSegments);
    segments.selectedRange = new $4a46f1c4231e5dde$export$939a711fc6327372(caret);
    segments.isCoalescing = coalesce;
    if (this.isCoalescing && coalesce && this.previous) {
      segments.previous = this.previous;
      segments.previous.next = segments;
    } else {
      segments.previous = this;
      this.selectedRange = new $4a46f1c4231e5dde$export$939a711fc6327372(start, end);
      this.next = segments;
    }
    return segments;
  }
  /** Find the boundary before or after a position using an Intl.Segmenter. */
  findBoundaryWithSegmenter(position, segmenter, direction) {
    position = this.clampPosition(position);
    for (let i = position.index; i >= 0 && i < this.segments.length; i += direction) {
      let segment = this.segments[i];
      switch (segment.type) {
        case "token":
          if (i !== position.index || (direction === -1 ? position.offset > 0 : position.offset === 0)) {
            let index = i + direction;
            return {
              index: index >= 0 ? index : 0,
              offset: direction === -1 && index >= 0 ? this.segments[index].text.length : 0
            };
          }
          continue;
        case "text": {
          let offset = direction === -1 ? segment.text.length : 0;
          if (i === position.index) offset = position.offset;
          if (direction === -1) offset--;
          if (offset < 0 || offset >= segment.text.length) continue;
          let part = segmenter.segment(segment.text).containing(offset);
          while (part && part.isWordLike === false) {
            offset += direction;
            part = segmenter.segment(segment.text).containing(offset);
          }
          if (part) return {
            index: i,
            offset: direction === -1 ? part.index : part.index + part.segment.length
          };
          continue;
        }
      }
    }
    return null;
  }
  /** Find a line boundary before or after a position. */
  findLineBoundary(position, direction) {
    let res = this.findText(position, direction, "\n");
    if (res) return res;
    return direction === -1 ? {
      index: 0,
      offset: 0
    } : {
      index: this.segments.length - 1,
      offset: this.segments[this.segments.length - 1].text.length
    };
  }
  /** Find a string or regular expression match before or after a position. */
  findText(position, direction, search) {
    if (this.segments.length === 0) return null;
    for (let i = position.index; i >= 0 && i < this.segments.length; i += direction) {
      let segment = this.segments[i];
      if (segment.type !== "text") continue;
      let offset = $4a46f1c4231e5dde$var$findInText(segment.text, search, direction, i === position.index ? position.offset : void 0);
      if (offset >= 0) return {
        index: i,
        offset
      };
    }
    return null;
  }
  /** Delete text at a position using a segmenter. */
  delete(position, segmenter, direction, coalesce = true) {
    let boundary = this.findBoundaryWithSegmenter(position, segmenter, direction);
    if (boundary) return this.replaceRange(direction === -1 ? boundary : position, direction === -1 ? position : boundary, "", coalesce);
    return this.withSelectedRange(new $4a46f1c4231e5dde$export$939a711fc6327372(position));
  }
  /** Delete text to the next or previous line break. */
  deleteLine(position, direction, coalesce = true) {
    if (this.segments.length === 0) return this;
    let boundary = this.findLineBoundary(position, direction);
    if (boundary) return this.replaceRange(direction === -1 ? boundary : position, direction === -1 ? position : boundary, "", coalesce);
    return this.withSelectedRange(new $4a46f1c4231e5dde$export$939a711fc6327372(position));
  }
  /** Create a new list containing a subset of the segments. */
  slice(start, end) {
    start = this.clampPosition(start);
    end = this.clampPosition(end);
    if (start.index === end.index && start.offset === end.offset) return this.createFieldValue([]);
    if (start.index === end.index) {
      let segment = this.segments[start.index];
      if (segment.type === "text") return this.createFieldValue([
        {
          type: "text",
          text: segment.text.slice(start.offset, end.offset)
        }
      ]);
      return this.createFieldValue([
        segment
      ]);
    }
    let startSegment = this.segments[start.index];
    let endSegment = this.segments[end.index];
    let [, startSplit] = this.splitSegment(startSegment, start.offset);
    let [endSplit] = this.splitSegment(endSegment, end.offset);
    let result = [];
    if (startSplit) result.push(startSplit);
    result.push(...this.segments.slice(start.index + 1, end.index));
    if (endSplit) result.push(endSplit);
    return this.createFieldValue(result);
  }
  /** Convert the list to a string. */
  toString() {
    return this.segments.map((seg) => seg.text).join("");
  }
  /** Returns the previous list in the undo history. */
  undo() {
    return this.previous ?? this;
  }
  /** Returns the next list in the redo history. */
  redo() {
    return this.next ?? this;
  }
  /** End coalescing undo/redo history. */
  endCoalescing() {
    this.isCoalescing = false;
  }
};
_$4a46f1c4231e5dde$export$f3decd0c2cd2fe2e.Direction = $4a46f1c4231e5dde$var$Direction;
_$4a46f1c4231e5dde$export$f3decd0c2cd2fe2e.SelectedRange = $4a46f1c4231e5dde$export$939a711fc6327372;
var $4a46f1c4231e5dde$export$f3decd0c2cd2fe2e = _$4a46f1c4231e5dde$export$f3decd0c2cd2fe2e;
function $4a46f1c4231e5dde$var$findInText(text, search, direction, fromOffset) {
  if (typeof search === "string") {
    if (direction === -1) return text.lastIndexOf(search, fromOffset !== void 0 ? fromOffset - 1 : text.length - 1);
    return text.indexOf(search, fromOffset ?? 0);
  }
  if (direction === 1) {
    let start = fromOffset ?? 0;
    let index = text.slice(start).search(search);
    return index >= 0 ? start + index : -1;
  }
  let limit = fromOffset !== void 0 ? fromOffset : text.length;
  if (limit < 0) return -1;
  let re = search.flags.includes("g") ? search : new RegExp(search.source, search.flags + "g");
  let matches = Array.from(text.slice(0, limit).matchAll(re));
  return matches.at(-1)?.index ?? -1;
}
function $4a46f1c4231e5dde$var$appendSegments(segments, insert, tokenize) {
  for (let segment of insert) {
    if (segment.type === "text" && segment.text.length === 0) continue;
    let last = segments[segments.length - 1];
    if (last && last.type === "text" && segment.type === "text") {
      if (tokenize) {
        let tokenized = tokenize(last.text + segment.text);
        segments.splice(segments.length - 1, 1, ...tokenized);
      } else segments[segments.length - 1] = {
        type: "text",
        text: last.text + segment.text
      };
    } else if (tokenize && segment.type === "text") {
      let tokenized = tokenize(segment.text);
      segments.push(...tokenized);
    } else segments.push(segment);
  }
  return segments;
}

// node_modules/react-stately/dist/private/tokenfield/useTokenFieldState.mjs
var import_react4 = __toESM(require_react(), 1);
function $df69ee4de894ef40$export$f2f6e9a6aa7f62e7(props) {
  let { value: valueProp, defaultValue: defaultValueProp = new (0, $4a46f1c4231e5dde$export$f3decd0c2cd2fe2e)([]), onChange } = props;
  let [value, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(valueProp, defaultValueProp, onChange);
  let [isComposing, setComposing] = (0, import_react4.useState)(false);
  return {
    value,
    setValue,
    isComposing,
    setComposing
  };
}

// node_modules/react-stately/dist/private/collections/getChildNodes.mjs
function $cd5ea4b915021f1d$export$1005530eda016c13(node, collection) {
  if (typeof collection.getChildren === "function") return collection.getChildren(node.key);
  return node.childNodes;
}
function $cd5ea4b915021f1d$export$fbdeaa6a76694f71(iterable) {
  return $cd5ea4b915021f1d$export$5f3398f8733f90e2(iterable, 0);
}
function $cd5ea4b915021f1d$export$5f3398f8733f90e2(iterable, index) {
  if (index < 0) return void 0;
  let i = 0;
  for (let item of iterable) {
    if (i === index) return item;
    i++;
  }
}
function $cd5ea4b915021f1d$export$7475b2c64539e4cf(iterable) {
  let lastItem = void 0;
  for (let value of iterable) lastItem = value;
  return lastItem;
}
function $cd5ea4b915021f1d$export$8c434b3a7a4dad6(collection, a, b) {
  if (a.parentKey === b.parentKey) return a.index - b.index;
  let aAncestors = [
    ...$cd5ea4b915021f1d$var$getAncestors(collection, a),
    a
  ];
  let bAncestors = [
    ...$cd5ea4b915021f1d$var$getAncestors(collection, b),
    b
  ];
  let firstNonMatchingAncestor = aAncestors.slice(0, bAncestors.length).findIndex((a2, i) => a2 !== bAncestors[i]);
  if (firstNonMatchingAncestor !== -1) {
    a = aAncestors[firstNonMatchingAncestor];
    b = bAncestors[firstNonMatchingAncestor];
    return a.index - b.index;
  }
  if (aAncestors.findIndex((node) => node === b) >= 0) return 1;
  else if (bAncestors.findIndex((node) => node === a) >= 0) return -1;
  return -1;
}
function $cd5ea4b915021f1d$var$getAncestors(collection, node) {
  let parents = [];
  let currNode = node;
  while (currNode?.parentKey != null) {
    currNode = collection.getItem(currNode.parentKey);
    if (currNode) parents.unshift(currNode);
  }
  return parents;
}

export {
  $a747a10fe70a57da$export$c17fa47878dc55b6,
  $b27c684a33948c64$export$2f817fcdc4b89ae0,
  $3e6197669829fe11$export$40bfa8c7b0832715,
  $1dfb119a85e764e5$export$cc77c4ff7e8673c5,
  $eb76cf4feb040f77$export$cd11ab140839f11d,
  $240e9101ba2842f5$export$7d15b64cf5a3a4c4,
  $240e9101ba2842f5$export$cb6e0bb50bc19463,
  $fd2148440a13ec26$export$aca958c65c314e6c,
  $fd2148440a13ec26$export$dad6ae84456c676a,
  $fd2148440a13ec26$export$571b5131b7e65c11,
  $fd2148440a13ec26$export$a763b9476acd3eb,
  $fd2148440a13ec26$export$fc1a364ae1f3ff10,
  $fd2148440a13ec26$export$75ee7c75d68f5b0e,
  $fd3c5e01e837dc20$export$8042c6c013fd5226,
  $890783418b00a858$export$6e865ea70d7724f,
  $890783418b00a858$export$4cde5df63f53f473,
  $890783418b00a858$export$1c0c08912582810c,
  $cd5ea4b915021f1d$export$1005530eda016c13,
  $cd5ea4b915021f1d$export$fbdeaa6a76694f71,
  $cd5ea4b915021f1d$export$5f3398f8733f90e2,
  $cd5ea4b915021f1d$export$7475b2c64539e4cf,
  $cd5ea4b915021f1d$export$8c434b3a7a4dad6,
  $4a46f1c4231e5dde$export$f3decd0c2cd2fe2e,
  $df69ee4de894ef40$export$f2f6e9a6aa7f62e7
};
//# sourceMappingURL=chunk-VEXCZDMO.js.map
