import {
  $1dfb119a85e764e5$export$cc77c4ff7e8673c5,
  $240e9101ba2842f5$export$7d15b64cf5a3a4c4,
  $240e9101ba2842f5$export$cb6e0bb50bc19463,
  $3e6197669829fe11$export$40bfa8c7b0832715,
  $890783418b00a858$export$4cde5df63f53f473,
  $890783418b00a858$export$6e865ea70d7724f,
  $a747a10fe70a57da$export$c17fa47878dc55b6,
  $b27c684a33948c64$export$2f817fcdc4b89ae0,
  $cd5ea4b915021f1d$export$1005530eda016c13,
  $cd5ea4b915021f1d$export$7475b2c64539e4cf,
  $cd5ea4b915021f1d$export$8c434b3a7a4dad6,
  $cd5ea4b915021f1d$export$fbdeaa6a76694f71,
  $eb76cf4feb040f77$export$cd11ab140839f11d,
  $fd2148440a13ec26$export$75ee7c75d68f5b0e,
  $fd2148440a13ec26$export$aca958c65c314e6c,
  $fd2148440a13ec26$export$fc1a364ae1f3ff10
} from "./chunk-IHTANWTM.js";
import {
  $12a3c853105e5a70$export$ad991b66133851cf,
  $2aaf608024c21ca1$export$680ea196effce5f,
  $2aaf608024c21ca1$export$99faa760c7908e4f,
  $93635573935797de$export$80ee6245ec4f29ec,
  $ad063034c8620db8$export$2061056d06d7cdf7,
  $ad063034c8620db8$export$42c81a444fbfb5d4,
  $ad063034c8620db8$export$461939dd4422153,
  $ad063034c8620db8$export$5c333a116e949cdd,
  $ad063034c8620db8$export$a2258d9c4118825c,
  $ad063034c8620db8$export$a5a3b454ada2268e,
  $ad063034c8620db8$export$a75f2bff57811055,
  $ad063034c8620db8$export$aa8b41735afcabd2,
  $ad063034c8620db8$export$ccc1b2479e7dd654,
  $ad063034c8620db8$export$d0bdf45af03a6ea3,
  $ad063034c8620db8$export$dbc69fd56b53d5e,
  $ad063034c8620db8$export$ea39ec197993aef0,
  $ad063034c8620db8$export$ef8b6d9133084f4e,
  $ad063034c8620db8$export$f91e89d3d0406102,
  $d07e34cce18680fd$export$84c95a83c799e074,
  $d07e34cce18680fd$export$93522d1a439f3617,
  $d07e34cce18680fd$export$b21e0b124e224484,
  $d07e34cce18680fd$export$b4a036af3fc0b032,
  $d07e34cce18680fd$export$d33f79e3ffc3dc83
} from "./chunk-UNTUKSKI.js";
import {
  require_shim
} from "./chunk-LURIECZM.js";
import {
  require_react
} from "./chunk-2MONDW76.js";
import {
  __toESM
} from "./chunk-PX6F3LHL.js";

// node_modules/react-stately/dist/private/calendar/utils.mjs
function $dd602d3c757202f2$export$eac50920cf2fd59a(date, minValue, maxValue) {
  return minValue != null && date.compare(minValue) < 0 || maxValue != null && date.compare(maxValue) > 0;
}
function $dd602d3c757202f2$export$f4a51ff076cc9a09(date, duration, locale, minValue, maxValue) {
  let halfDuration = {};
  for (let key in duration) {
    halfDuration[key] = Math.floor(duration[key] / 2);
    if (halfDuration[key] > 0 && duration[key] % 2 === 0) halfDuration[key]--;
  }
  let aligned = $dd602d3c757202f2$export$144a00ba6044eb9(date, duration, locale).subtract(halfDuration);
  return $dd602d3c757202f2$export$5bb865b12696a77d(date, aligned, duration, locale, minValue, maxValue);
}
function $dd602d3c757202f2$export$144a00ba6044eb9(date, duration, locale, minValue, maxValue) {
  let aligned = date;
  if (duration.years) aligned = (0, $ad063034c8620db8$export$f91e89d3d0406102)(date);
  else if (duration.months) aligned = (0, $ad063034c8620db8$export$a5a3b454ada2268e)(date);
  else if (duration.weeks || duration.days && duration.days > 7) aligned = (0, $ad063034c8620db8$export$42c81a444fbfb5d4)(date, locale);
  return $dd602d3c757202f2$export$5bb865b12696a77d(date, aligned, duration, locale, minValue, maxValue);
}
function $dd602d3c757202f2$export$530edbfc915b2b04(date, duration, locale, minValue, maxValue) {
  let d = {
    ...duration
  };
  if (d.days) d.days--;
  else if (d.weeks) d.weeks--;
  else if (d.months) d.months--;
  else if (d.years) d.years--;
  let aligned = $dd602d3c757202f2$export$144a00ba6044eb9(date, duration, locale).subtract(d);
  return $dd602d3c757202f2$export$5bb865b12696a77d(date, aligned, duration, locale, minValue, maxValue);
}
function $dd602d3c757202f2$export$5bb865b12696a77d(date, aligned, duration, locale, minValue, maxValue) {
  if (minValue && date.compare(minValue) >= 0) {
    let newDate = (0, $ad063034c8620db8$export$a75f2bff57811055)(aligned, $dd602d3c757202f2$export$144a00ba6044eb9((0, $d07e34cce18680fd$export$93522d1a439f3617)(minValue), duration, locale));
    if (newDate) aligned = newDate;
  }
  if (maxValue && date.compare(maxValue) <= 0) {
    let newDate = (0, $ad063034c8620db8$export$5c333a116e949cdd)(aligned, $dd602d3c757202f2$export$530edbfc915b2b04((0, $d07e34cce18680fd$export$93522d1a439f3617)(maxValue), duration, locale));
    if (newDate) aligned = newDate;
  }
  return aligned;
}
function $dd602d3c757202f2$export$4f5203c0d889109e(date, minValue, maxValue) {
  if (minValue) {
    let newDate = (0, $ad063034c8620db8$export$a75f2bff57811055)(date, (0, $d07e34cce18680fd$export$93522d1a439f3617)(minValue));
    if (newDate) date = newDate;
  }
  if (maxValue) {
    let newDate = (0, $ad063034c8620db8$export$5c333a116e949cdd)(date, (0, $d07e34cce18680fd$export$93522d1a439f3617)(maxValue));
    if (newDate) date = newDate;
  }
  return date;
}
function $dd602d3c757202f2$export$a1d3911297b952d7(date, minValue, isDateUnavailable) {
  if (!isDateUnavailable) return date;
  while (date.compare(minValue) >= 0 && isDateUnavailable(date)) date = date.subtract({
    days: 1
  });
  if (date.compare(minValue) >= 0) return date;
  return null;
}
function $dd602d3c757202f2$export$6595e603c409b4b8(a, b) {
  if (a === b) return true;
  return a.days === b.days && a.weeks === b.weeks && a.months === b.months && a.years === b.years;
}

// node_modules/react-stately/dist/private/calendar/useCalendarState.mjs
var import_react = __toESM(require_react(), 1);
function $ea0ea6e62ae0d7ca$export$6d095e787d2b5e1f(props) {
  let defaultFormatter = (0, import_react.useMemo)(() => new (0, $12a3c853105e5a70$export$ad991b66133851cf)(props.locale), [
    props.locale
  ]);
  let resolvedOptions = (0, import_react.useMemo)(() => defaultFormatter.resolvedOptions(), [
    defaultFormatter
  ]);
  let { locale, createCalendar, visibleDuration = {
    months: 1
  }, minValue, maxValue, selectionAlignment, isDateUnavailable, pageBehavior = "visible", selectionMode = "single", firstDayOfWeek, weeksInMonth } = props;
  let calendar = (0, import_react.useMemo)(() => createCalendar(resolvedOptions.calendar), [
    createCalendar,
    resolvedOptions.calendar
  ]);
  let [value, setControlledValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue ?? null, props.onChange);
  let calendarDateValue = (0, import_react.useMemo)(() => {
    if (Array.isArray(value)) return value.map((value2) => (0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $d07e34cce18680fd$export$93522d1a439f3617)(value2), calendar));
    else return value ? (0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $d07e34cce18680fd$export$93522d1a439f3617)(value), calendar) : null;
  }, [
    value,
    calendar
  ]);
  let timeZone = (0, import_react.useMemo)(() => {
    let val = Array.isArray(value) ? value[0] : value;
    return val && "timeZone" in val ? val.timeZone : resolvedOptions.timeZone;
  }, [
    value,
    resolvedOptions.timeZone
  ]);
  let focusedCalendarDate = (0, import_react.useMemo)(() => props.focusedValue ? (0, $dd602d3c757202f2$export$4f5203c0d889109e)((0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $d07e34cce18680fd$export$93522d1a439f3617)(props.focusedValue), calendar), minValue, maxValue) : void 0, [
    props.focusedValue,
    calendar,
    minValue,
    maxValue
  ]);
  let defaultFocusedCalendarDate = (0, import_react.useMemo)(() => {
    if (props.defaultFocusedValue) return (0, $dd602d3c757202f2$export$4f5203c0d889109e)((0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $d07e34cce18680fd$export$93522d1a439f3617)(props.defaultFocusedValue), calendar), minValue, maxValue);
    if (calendarDateValue) return (0, $dd602d3c757202f2$export$4f5203c0d889109e)(Array.isArray(calendarDateValue) ? calendarDateValue[0] : calendarDateValue, minValue, maxValue);
    return (0, $dd602d3c757202f2$export$4f5203c0d889109e)((0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $ad063034c8620db8$export$d0bdf45af03a6ea3)(timeZone), calendar), minValue, maxValue);
  }, [
    props.defaultFocusedValue,
    calendarDateValue,
    timeZone,
    calendar,
    minValue,
    maxValue
  ]);
  let [focusedDate, setFocusedDate] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(focusedCalendarDate, defaultFocusedCalendarDate, props.onFocusChange);
  let getStartDate = () => {
    switch (selectionAlignment) {
      case "start":
        return (0, $dd602d3c757202f2$export$144a00ba6044eb9)(focusedDate, visibleDuration, locale, minValue, maxValue);
      case "end":
        return (0, $dd602d3c757202f2$export$530edbfc915b2b04)(focusedDate, visibleDuration, locale, minValue, maxValue);
      case "center":
      default:
        return (0, $dd602d3c757202f2$export$f4a51ff076cc9a09)(focusedDate, visibleDuration, locale, minValue, maxValue);
    }
  };
  let [startDate, setStartDate] = (0, import_react.useState)(getStartDate);
  let [isFocused, setFocused] = (0, import_react.useState)(props.autoFocus || false);
  let [lastVisibleDuration, setLastVisibleDuration] = (0, import_react.useState)(visibleDuration);
  if (!(0, $dd602d3c757202f2$export$6595e603c409b4b8)(visibleDuration, lastVisibleDuration)) {
    setLastVisibleDuration(visibleDuration);
    setStartDate(getStartDate());
  }
  let endDate = (0, import_react.useMemo)(() => {
    let duration = {
      ...visibleDuration
    };
    if (duration.days) duration.days--;
    else duration.days = -1;
    return startDate.add(duration);
  }, [
    startDate,
    visibleDuration
  ]);
  let [lastCalendar, setLastCalendar] = (0, import_react.useState)(calendar);
  if (!(0, $ad063034c8620db8$export$dbc69fd56b53d5e)(calendar, lastCalendar)) {
    let newFocusedDate = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(focusedDate, calendar);
    setStartDate((0, $dd602d3c757202f2$export$f4a51ff076cc9a09)(newFocusedDate, visibleDuration, locale, minValue, maxValue));
    setFocusedDate(newFocusedDate);
    setLastCalendar(calendar);
  }
  if ((0, $dd602d3c757202f2$export$eac50920cf2fd59a)(focusedDate, minValue, maxValue))
    setFocusedDate((0, $dd602d3c757202f2$export$4f5203c0d889109e)(focusedDate, minValue, maxValue));
  else if (focusedDate.compare(startDate) < 0) setStartDate((0, $dd602d3c757202f2$export$530edbfc915b2b04)(focusedDate, visibleDuration, locale, minValue, maxValue));
  else if (focusedDate.compare(endDate) > 0) setStartDate((0, $dd602d3c757202f2$export$144a00ba6044eb9)(focusedDate, visibleDuration, locale, minValue, maxValue));
  function focusCell(date) {
    date = (0, $dd602d3c757202f2$export$4f5203c0d889109e)(date, minValue, maxValue);
    setFocusedDate(date);
  }
  function normalizeValue(newValue) {
    let constrained = (0, $dd602d3c757202f2$export$4f5203c0d889109e)(newValue, minValue, maxValue);
    let lowerBound = minValue ?? (0, $ad063034c8620db8$export$5c333a116e949cdd)(constrained, startDate);
    let prev = (0, $dd602d3c757202f2$export$a1d3911297b952d7)(constrained, lowerBound, isDateUnavailable);
    if (!prev) return null;
    let baseValue = Array.isArray(value) ? value[0] : value;
    let calendarValue = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(prev, baseValue?.calendar || new (0, $93635573935797de$export$80ee6245ec4f29ec)());
    if (baseValue && "hour" in baseValue) return baseValue.set(calendarValue);
    return calendarValue;
  }
  function setValue(newValue) {
    if (!props.isDisabled && !props.isReadOnly) {
      if (newValue === null) {
        setControlledValue(selectionMode === "multiple" ? [] : null);
        return;
      }
      if (Array.isArray(newValue)) setControlledValue(newValue.map(normalizeValue).filter(Boolean));
      else {
        let localValue = normalizeValue(newValue);
        if (localValue) setControlledValue(localValue);
      }
    }
  }
  let isUnavailable = (0, import_react.useMemo)(() => {
    if (!calendarDateValue) return false;
    if (Array.isArray(calendarDateValue)) return calendarDateValue.some((date) => isDateUnavailable?.(date) || (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(date, minValue, maxValue));
    return isDateUnavailable?.(calendarDateValue) || (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(calendarDateValue, minValue, maxValue);
  }, [
    calendarDateValue,
    isDateUnavailable,
    minValue,
    maxValue
  ]);
  let isValueInvalid = props.isInvalid || props.validationState === "invalid" || isUnavailable;
  let validationState = isValueInvalid ? "invalid" : null;
  let pageDuration = (0, import_react.useMemo)(() => {
    if (pageBehavior === "visible") return visibleDuration;
    return $ea0ea6e62ae0d7ca$var$unitDuration(visibleDuration);
  }, [
    pageBehavior,
    visibleDuration
  ]);
  return {
    isDisabled: props.isDisabled ?? false,
    isReadOnly: props.isReadOnly ?? false,
    value: calendarDateValue,
    setValue,
    selectionMode,
    visibleDuration,
    visibleRange: {
      start: startDate,
      end: endDate
    },
    minValue,
    maxValue,
    focusedDate,
    timeZone,
    validationState,
    isValueInvalid,
    setFocusedDate(date) {
      focusCell(date);
    },
    focusNextDay() {
      focusCell(focusedDate.add({
        days: 1
      }));
    },
    focusPreviousDay() {
      focusCell(focusedDate.subtract({
        days: 1
      }));
    },
    focusNextRow() {
      if (visibleDuration.days) this.focusNextPage();
      else if (visibleDuration.weeks || visibleDuration.months || visibleDuration.years) focusCell(focusedDate.add({
        weeks: 1
      }));
    },
    focusPreviousRow() {
      if (visibleDuration.days) this.focusPreviousPage();
      else if (visibleDuration.weeks || visibleDuration.months || visibleDuration.years) focusCell(focusedDate.subtract({
        weeks: 1
      }));
    },
    focusNextPage() {
      let start = startDate.add(pageDuration);
      setFocusedDate((0, $dd602d3c757202f2$export$4f5203c0d889109e)(focusedDate.add(pageDuration), minValue, maxValue));
      setStartDate((0, $dd602d3c757202f2$export$144a00ba6044eb9)((0, $dd602d3c757202f2$export$5bb865b12696a77d)(focusedDate, start, pageDuration, locale, minValue, maxValue), pageDuration, locale));
    },
    focusPreviousPage() {
      let start = startDate.subtract(pageDuration);
      setFocusedDate((0, $dd602d3c757202f2$export$4f5203c0d889109e)(focusedDate.subtract(pageDuration), minValue, maxValue));
      setStartDate((0, $dd602d3c757202f2$export$144a00ba6044eb9)((0, $dd602d3c757202f2$export$5bb865b12696a77d)(focusedDate, start, pageDuration, locale, minValue, maxValue), pageDuration, locale));
    },
    focusSectionStart() {
      if (visibleDuration.days) focusCell(startDate);
      else if (visibleDuration.weeks) focusCell((0, $ad063034c8620db8$export$42c81a444fbfb5d4)(focusedDate, locale));
      else if (visibleDuration.months || visibleDuration.years) focusCell((0, $ad063034c8620db8$export$a5a3b454ada2268e)(focusedDate));
    },
    focusSectionEnd() {
      if (visibleDuration.days) focusCell(endDate);
      else if (visibleDuration.weeks) focusCell((0, $ad063034c8620db8$export$ef8b6d9133084f4e)(focusedDate, locale));
      else if (visibleDuration.months || visibleDuration.years) focusCell((0, $ad063034c8620db8$export$a2258d9c4118825c)(focusedDate));
    },
    focusNextSection(larger) {
      if (!larger && !visibleDuration.days) {
        focusCell(focusedDate.add($ea0ea6e62ae0d7ca$var$unitDuration(visibleDuration)));
        return;
      }
      if (visibleDuration.days) this.focusNextPage();
      else if (visibleDuration.weeks) focusCell(focusedDate.add({
        months: 1
      }));
      else if (visibleDuration.months || visibleDuration.years) focusCell(focusedDate.add({
        years: 1
      }));
    },
    focusPreviousSection(larger) {
      if (!larger && !visibleDuration.days) {
        focusCell(focusedDate.subtract($ea0ea6e62ae0d7ca$var$unitDuration(visibleDuration)));
        return;
      }
      if (visibleDuration.days) this.focusPreviousPage();
      else if (visibleDuration.weeks) focusCell(focusedDate.subtract({
        months: 1
      }));
      else if (visibleDuration.months || visibleDuration.years) focusCell(focusedDate.subtract({
        years: 1
      }));
    },
    selectFocusedDate() {
      if (!(isDateUnavailable && isDateUnavailable(focusedDate))) this.selectDate(focusedDate);
    },
    selectDate(date) {
      if (props.isDisabled || props.isReadOnly) return;
      if (selectionMode === "multiple" && date != null) {
        let newDate = normalizeValue(date);
        if (!newDate) return;
        let baseValue = [];
        if (Array.isArray(value)) baseValue = value;
        else if (value != null) baseValue = [
          value
        ];
        let index = baseValue.findIndex((value2) => (0, $ad063034c8620db8$export$ea39ec197993aef0)(value2, newDate));
        let newValue = index >= 0 ? baseValue.slice(0, index).concat(baseValue.slice(index + 1)) : [
          ...baseValue,
          newDate
        ];
        setControlledValue(newValue);
      } else setValue(date);
    },
    isFocused,
    setFocused,
    isInvalid(date) {
      return (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(date, minValue, maxValue);
    },
    isSelected(date) {
      if (!calendarDateValue || this.isCellDisabled(date) || this.isCellUnavailable(date)) return false;
      return Array.isArray(calendarDateValue) ? calendarDateValue.some((value2) => (0, $ad063034c8620db8$export$ea39ec197993aef0)(value2, date)) : (0, $ad063034c8620db8$export$ea39ec197993aef0)(date, calendarDateValue);
    },
    isCellFocused(date) {
      return isFocused && focusedDate && (0, $ad063034c8620db8$export$ea39ec197993aef0)(date, focusedDate);
    },
    isCellDisabled(date) {
      return props.isDisabled || date.compare(startDate) < 0 || date.compare(endDate) > 0 || this.isInvalid(date);
    },
    isCellUnavailable(date) {
      return props.isDateUnavailable ? props.isDateUnavailable(date) : false;
    },
    isPreviousVisibleRangeInvalid() {
      let prev = startDate.subtract({
        days: 1
      });
      return (0, $ad063034c8620db8$export$ea39ec197993aef0)(prev, startDate) || this.isInvalid(prev);
    },
    isNextVisibleRangeInvalid() {
      let next = endDate.add({
        days: 1
      });
      return (0, $ad063034c8620db8$export$ea39ec197993aef0)(next, endDate) || this.isInvalid(next);
    },
    getDatesInWeek(weekIndex, from = startDate) {
      let date = from.add({
        weeks: weekIndex
      });
      let dates = [];
      let days = visibleDuration.days && visibleDuration.days < 7 ? visibleDuration.days : 7;
      if (days === 7) {
        date = (0, $ad063034c8620db8$export$42c81a444fbfb5d4)(date, locale, firstDayOfWeek);
        let dayOfWeek = (0, $ad063034c8620db8$export$2061056d06d7cdf7)(date, locale, firstDayOfWeek);
        for (let i = 0; i < dayOfWeek; i++) dates.push(null);
      }
      while (dates.length < days) {
        dates.push(date);
        let nextDate = date.add({
          days: 1
        });
        if ((0, $ad063034c8620db8$export$ea39ec197993aef0)(date, nextDate)) break;
        date = nextDate;
      }
      while (dates.length < days) dates.push(null);
      return dates;
    },
    getWeeksInMonth(date = startDate) {
      let weeks = weeksInMonth || (0, $ad063034c8620db8$export$ccc1b2479e7dd654)(date, locale, firstDayOfWeek);
      if (visibleDuration.weeks || visibleDuration.days) {
        weeks = visibleDuration.weeks ?? 0;
        if (visibleDuration.days) weeks += Math.ceil(visibleDuration.days / 7);
      }
      return weeks;
    }
  };
}
function $ea0ea6e62ae0d7ca$var$unitDuration(duration) {
  let unit = {
    ...duration
  };
  for (let key in duration) unit[key] = 1;
  return unit;
}

// node_modules/react-stately/dist/private/calendar/useRangeCalendarState.mjs
var import_react2 = __toESM(require_react(), 1);
function $a0a87fb6fcfb22ec$export$9a987164d97ecc90(props) {
  let { value: valueProp, defaultValue, onChange, createCalendar, locale, visibleDuration = {
    months: 1
  }, minValue, maxValue, ...calendarProps } = props;
  let [value, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(valueProp, defaultValue || null, onChange);
  let [anchorDate, setAnchorDate] = (0, import_react2.useState)(null);
  let alignment = "center";
  if (value && value.start && value.end) {
    let start = (0, $dd602d3c757202f2$export$f4a51ff076cc9a09)((0, $d07e34cce18680fd$export$93522d1a439f3617)(value.start), visibleDuration, locale, minValue, maxValue);
    let end = start.add(visibleDuration).subtract({
      days: 1
    });
    if (value.end.compare(end) > 0) alignment = "start";
  }
  let isDateUnavailable = (0, import_react2.useMemo)(() => {
    let isDateUnavailable2 = props.isDateUnavailable;
    if (!isDateUnavailable2) return void 0;
    return (date) => isDateUnavailable2(date, anchorDate);
  }, [
    props.isDateUnavailable,
    anchorDate
  ]);
  let getAvailableRange = (0, import_react2.useCallback)((anchorDate2) => {
    if (anchorDate2 && isDateUnavailable && !props.allowsNonContiguousRanges) {
      const nextAvailableStartDate = $a0a87fb6fcfb22ec$var$nextUnavailableDate(anchorDate2, isDateUnavailable, visibleDuration, -1);
      const nextAvailableEndDate = $a0a87fb6fcfb22ec$var$nextUnavailableDate(anchorDate2, isDateUnavailable, visibleDuration, 1);
      return {
        start: nextAvailableStartDate,
        end: nextAvailableEndDate
      };
    } else return null;
  }, [
    isDateUnavailable,
    visibleDuration,
    props.allowsNonContiguousRanges
  ]);
  let availableRange = (0, import_react2.useMemo)(() => getAvailableRange(anchorDate), [
    getAvailableRange,
    anchorDate
  ]);
  let min = (0, import_react2.useMemo)(() => (0, $ad063034c8620db8$export$a75f2bff57811055)(minValue, availableRange?.start), [
    minValue,
    availableRange
  ]);
  let max = (0, import_react2.useMemo)(() => (0, $ad063034c8620db8$export$5c333a116e949cdd)(maxValue, availableRange?.end), [
    maxValue,
    availableRange
  ]);
  let calendar = (0, $ea0ea6e62ae0d7ca$export$6d095e787d2b5e1f)({
    ...calendarProps,
    value: value && value.start,
    createCalendar,
    locale,
    visibleDuration,
    minValue: min,
    maxValue: max,
    selectionAlignment: props.selectionAlignment || alignment,
    isDateUnavailable
  });
  let highlightedRange = anchorDate ? $a0a87fb6fcfb22ec$var$makeRange(anchorDate, calendar.focusedDate) : value && $a0a87fb6fcfb22ec$var$makeRange(value.start, value.end);
  let selectDate = (date) => {
    if (props.isReadOnly) return;
    const constrainedDate = (0, $dd602d3c757202f2$export$4f5203c0d889109e)(date, min, max);
    const previousAvailableConstrainedDate = (0, $dd602d3c757202f2$export$a1d3911297b952d7)(constrainedDate, calendar.visibleRange.start, isDateUnavailable);
    if (!previousAvailableConstrainedDate) return;
    if (!anchorDate) setAnchorDate(previousAvailableConstrainedDate);
    else {
      let range = $a0a87fb6fcfb22ec$var$makeRange(anchorDate, previousAvailableConstrainedDate);
      if (range) setValue({
        start: $a0a87fb6fcfb22ec$var$convertValue(range.start, value?.start),
        end: $a0a87fb6fcfb22ec$var$convertValue(range.end, value?.end)
      });
      setAnchorDate(null);
    }
  };
  let [isDragging, setDragging] = (0, import_react2.useState)(false);
  let isInvalidSelection = (0, import_react2.useMemo)(() => {
    if (!value || anchorDate) return false;
    if (isDateUnavailable && (isDateUnavailable(value.start) || isDateUnavailable(value.end))) return true;
    return (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(value.start, minValue, maxValue) || (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(value.end, minValue, maxValue);
  }, [
    isDateUnavailable,
    value,
    anchorDate,
    minValue,
    maxValue
  ]);
  let isValueInvalid = props.isInvalid || props.validationState === "invalid" || isInvalidSelection;
  let validationState = isValueInvalid ? "invalid" : null;
  return {
    ...calendar,
    value,
    setValue,
    anchorDate,
    setAnchorDate,
    highlightedRange,
    validationState,
    isValueInvalid,
    selectFocusedDate() {
      if (!calendar.isCellUnavailable(calendar.focusedDate)) selectDate(calendar.focusedDate);
    },
    commitSelection() {
      selectDate(calendar.focusedDate);
    },
    selectDate,
    highlightDate(date) {
      if (anchorDate) calendar.setFocusedDate(date);
    },
    isSelected(date) {
      return Boolean(highlightedRange && date.compare(highlightedRange.start) >= 0 && date.compare(highlightedRange.end) <= 0 && !calendar.isCellDisabled(date) && !calendar.isCellUnavailable(date));
    },
    isInvalid(date) {
      return calendar.isInvalid(date) || (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(date, availableRange?.start, availableRange?.end);
    },
    isDragging,
    setDragging,
    clearSelection() {
      setAnchorDate(null);
      setValue(null);
    },
    focusNearestAvailableDate(anchorDate2) {
      let availableRange2 = getAvailableRange(anchorDate2);
      let isDateInvalid = (date) => this.isInvalid(date) || (0, $dd602d3c757202f2$export$eac50920cf2fd59a)(date, availableRange2?.start, availableRange2?.end);
      let nextDay = anchorDate2.add({
        days: 1
      });
      if (isDateInvalid(nextDay)) nextDay = anchorDate2.subtract({
        days: 1
      });
      if (!isDateInvalid(nextDay)) {
        this.setFocusedDate(nextDay);
        this.setFocused(true);
      }
    }
  };
}
function $a0a87fb6fcfb22ec$var$makeRange(start, end) {
  if (!start || !end) return null;
  if (end.compare(start) < 0) [start, end] = [
    end,
    start
  ];
  return {
    start: (0, $d07e34cce18680fd$export$93522d1a439f3617)(start),
    end: (0, $d07e34cce18680fd$export$93522d1a439f3617)(end)
  };
}
function $a0a87fb6fcfb22ec$var$convertValue(newValue, oldValue) {
  newValue = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(newValue, oldValue?.calendar || new (0, $93635573935797de$export$80ee6245ec4f29ec)());
  if (oldValue && "hour" in oldValue) return oldValue.set(newValue);
  return newValue;
}
function $a0a87fb6fcfb22ec$var$nextUnavailableDate(anchorDate, isDateUnavailable, visibleDuration, dir) {
  let nextDate = anchorDate.add({
    days: dir
  });
  let minDate = anchorDate.subtract(visibleDuration);
  let maxDate = anchorDate.add(visibleDuration);
  while ((dir < 0 ? nextDate.compare(minDate) >= 0 : nextDate.compare(maxDate) <= 0) && !isDateUnavailable(nextDate)) nextDate = nextDate.add({
    days: dir
  });
  if (isDateUnavailable(nextDate)) return nextDate.add({
    days: -dir
  });
}

// node_modules/react-stately/dist/private/checkbox/useCheckboxGroupState.mjs
var import_react3 = __toESM(require_react(), 1);
function $8cd68577ce0207f7$export$daff6da51032a415(props = {}) {
  let [selectedValues, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue || [], props.onChange);
  let [initialValues] = (0, import_react3.useState)(selectedValues);
  let isRequired = !!props.isRequired && selectedValues.length === 0;
  let invalidValues = (0, import_react3.useRef)(/* @__PURE__ */ new Map());
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: selectedValues
  });
  let isInvalid = validation.displayValidation.isInvalid;
  const state = {
    ...validation,
    value: selectedValues,
    defaultValue: props.defaultValue ?? initialValues,
    setValue(value) {
      if (props.isReadOnly || props.isDisabled) return;
      setValue(value);
    },
    isDisabled: props.isDisabled || false,
    isReadOnly: props.isReadOnly || false,
    isSelected(value) {
      return selectedValues.includes(value);
    },
    addValue(value) {
      if (props.isReadOnly || props.isDisabled) return;
      setValue((selectedValues2) => {
        if (!selectedValues2.includes(value)) return selectedValues2.concat(value);
        return selectedValues2;
      });
    },
    removeValue(value) {
      if (props.isReadOnly || props.isDisabled) return;
      if (selectedValues.includes(value)) setValue(selectedValues.filter((existingValue) => existingValue !== value));
    },
    toggleValue(value) {
      if (props.isReadOnly || props.isDisabled) return;
      if (selectedValues.includes(value)) setValue(selectedValues.filter((existingValue) => existingValue !== value));
      else setValue(selectedValues.concat(value));
    },
    setInvalid(value, v) {
      let s = new Map(invalidValues.current);
      if (v.isInvalid) s.set(value, v);
      else s.delete(value);
      invalidValues.current = s;
      validation.updateValidation((0, $fd2148440a13ec26$export$75ee7c75d68f5b0e)(...s.values()));
    },
    validationState: props.validationState ?? (isInvalid ? "invalid" : null),
    isInvalid,
    isRequired
  };
  return state;
}

// node_modules/react-stately/dist/private/color/useColorAreaState.mjs
var import_react4 = __toESM(require_react(), 1);
var $1f22dbfd2b026cf2$var$DEFAULT_COLOR = (0, $890783418b00a858$export$6e865ea70d7724f)("#ffffff");
function $1f22dbfd2b026cf2$export$6df7f0e2cabc7eef(props) {
  let { value, defaultValue, colorSpace, xChannel, yChannel, onChange, onChangeEnd } = props;
  if (!value && !defaultValue) defaultValue = $1f22dbfd2b026cf2$var$DEFAULT_COLOR;
  if (value) value = (0, $890783418b00a858$export$4cde5df63f53f473)(value);
  if (defaultValue) defaultValue = (0, $890783418b00a858$export$4cde5df63f53f473)(defaultValue);
  let [colorValue, setColorState] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, defaultValue, onChange);
  let [initialValue] = (0, import_react4.useState)(colorValue);
  let color = (0, import_react4.useMemo)(() => colorSpace && colorValue ? colorValue.toFormat(colorSpace) : colorValue, [
    colorValue,
    colorSpace
  ]);
  let valueRef = (0, import_react4.useRef)(color);
  let setColor = (color2) => {
    valueRef.current = color2;
    setColorState(color2);
  };
  let channels = (0, import_react4.useMemo)(() => color.getColorSpaceAxes({
    xChannel,
    yChannel
  }), [
    color,
    xChannel,
    yChannel
  ]);
  let xChannelRange = color.getChannelRange(channels.xChannel);
  let yChannelRange = color.getChannelRange(channels.yChannel);
  let { minValue: minValueX, maxValue: maxValueX, step: stepX, pageSize: pageSizeX } = xChannelRange;
  let { minValue: minValueY, maxValue: maxValueY, step: stepY, pageSize: pageSizeY } = yChannelRange;
  let [isDragging, setDragging] = (0, import_react4.useState)(false);
  let isDraggingRef = (0, import_react4.useRef)(false);
  let xValue = color.getChannelValue(channels.xChannel);
  let yValue = color.getChannelValue(channels.yChannel);
  let setXValue = (v) => {
    if (v === xValue) return;
    let newColor = color.withChannelValue(channels.xChannel, v);
    setColor(newColor);
  };
  let setYValue = (v) => {
    if (v === yValue) return;
    let newColor = color.withChannelValue(channels.yChannel, v);
    setColor(newColor);
  };
  return {
    channels,
    xChannelStep: stepX,
    yChannelStep: stepY,
    xChannelPageStep: pageSizeX,
    yChannelPageStep: pageSizeY,
    value: color,
    defaultValue: value !== void 0 ? initialValue : defaultValue,
    setValue(value2) {
      setColor((0, $890783418b00a858$export$4cde5df63f53f473)(value2));
    },
    xValue,
    setXValue,
    yValue,
    setYValue,
    setColorFromPoint(x, y) {
      let newXValue = minValueX + (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(x, 0, 1) * (maxValueX - minValueX);
      let newYValue = minValueY + (1 - (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(y, 0, 1)) * (maxValueY - minValueY);
      let newColor;
      if (newXValue !== xValue) {
        newXValue = (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(newXValue, minValueX, maxValueX, stepX);
        newColor = color.withChannelValue(channels.xChannel, newXValue);
      }
      if (newYValue !== yValue) {
        newYValue = (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(newYValue, minValueY, maxValueY, stepY);
        newColor = (newColor || color).withChannelValue(channels.yChannel, newYValue);
      }
      if (newColor) setColor(newColor);
    },
    getThumbPosition() {
      let x = (xValue - minValueX) / (maxValueX - minValueX);
      let y = 1 - (yValue - minValueY) / (maxValueY - minValueY);
      return {
        x,
        y
      };
    },
    incrementX(stepSize = 1) {
      setXValue(xValue + stepSize > maxValueX ? maxValueX : (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(xValue + stepSize, minValueX, maxValueX, stepX));
    },
    incrementY(stepSize = 1) {
      setYValue(yValue + stepSize > maxValueY ? maxValueY : (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(yValue + stepSize, minValueY, maxValueY, stepY));
    },
    decrementX(stepSize = 1) {
      setXValue((0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(xValue - stepSize, minValueX, maxValueX, stepX));
    },
    decrementY(stepSize = 1) {
      setYValue((0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(yValue - stepSize, minValueY, maxValueY, stepY));
    },
    setDragging(isDragging2) {
      let wasDragging = isDraggingRef.current;
      isDraggingRef.current = isDragging2;
      if (onChangeEnd && !isDragging2 && wasDragging) onChangeEnd(valueRef.current);
      setDragging(isDragging2);
    },
    isDragging,
    getDisplayColor() {
      return color.withChannelValue("alpha", 1);
    }
  };
}

// node_modules/react-stately/dist/private/color/useColor.mjs
var import_react5 = __toESM(require_react(), 1);
function $7d5d4eb4667f32af$export$5aadd9c0606af5c2(value) {
  return (0, import_react5.useMemo)(() => {
    if (typeof value === "string") try {
      return (0, $890783418b00a858$export$6e865ea70d7724f)(value);
    } catch {
      return void 0;
    }
    return value;
  }, [
    value
  ]);
}

// node_modules/react-stately/dist/private/color/useColorFieldState.mjs
var import_react6 = __toESM(require_react(), 1);
var $83c2160a93ad557c$var$MIN_COLOR = (0, $890783418b00a858$export$6e865ea70d7724f)("#000000");
var $83c2160a93ad557c$var$MAX_COLOR = (0, $890783418b00a858$export$6e865ea70d7724f)("#FFFFFF");
var $83c2160a93ad557c$var$MIN_COLOR_INT = $83c2160a93ad557c$var$MIN_COLOR.toHexInt();
var $83c2160a93ad557c$var$MAX_COLOR_INT = $83c2160a93ad557c$var$MAX_COLOR.toHexInt();
function $83c2160a93ad557c$export$d52a01683abdfcd6(props) {
  let { value, defaultValue, onChange } = props;
  let { step } = $83c2160a93ad557c$var$MIN_COLOR.getChannelRange("red");
  let initialDefaultValue = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(defaultValue);
  let [colorValue, setColorValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)((0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(value), initialDefaultValue, onChange);
  let [initialValue] = (0, import_react6.useState)(colorValue);
  let [inputValue, setInputValue] = (0, import_react6.useState)(() => (value || defaultValue) && colorValue ? colorValue.toString("hex") : "");
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: colorValue
  });
  let safelySetColorValue = (newColor) => {
    if (!colorValue || !newColor) {
      setColorValue(newColor);
      return;
    }
    if (newColor.toHexInt() !== colorValue.toHexInt()) {
      setColorValue(newColor);
      return;
    }
  };
  let [prevValue, setPrevValue] = (0, import_react6.useState)(colorValue);
  if (prevValue !== colorValue) {
    setInputValue(colorValue ? colorValue.toString("hex") : "");
    setPrevValue(colorValue);
  }
  let parsedValue = (0, import_react6.useMemo)(() => {
    let color;
    try {
      color = (0, $890783418b00a858$export$6e865ea70d7724f)(inputValue.startsWith("#") ? inputValue : `#${inputValue}`);
    } catch {
      color = null;
    }
    return color;
  }, [
    inputValue
  ]);
  let commit = () => {
    if (!inputValue.length) {
      safelySetColorValue(null);
      if (value === void 0 || colorValue === null) setInputValue("");
      else setInputValue(colorValue.toString("hex"));
      return;
    }
    if (parsedValue == null) {
      setInputValue(colorValue ? colorValue.toString("hex") : "");
      return;
    }
    safelySetColorValue(parsedValue);
    let newColorValue = "";
    if (colorValue) newColorValue = colorValue.toString("hex");
    setInputValue(newColorValue);
    validation.commitValidation();
  };
  let increment = () => {
    let newValue = $83c2160a93ad557c$var$addColorValue(parsedValue, step);
    if (newValue === colorValue) setInputValue(newValue.toString("hex"));
    safelySetColorValue(newValue);
    validation.commitValidation();
  };
  let decrement = () => {
    let newValue = $83c2160a93ad557c$var$addColorValue(parsedValue, -step);
    if (newValue === colorValue) setInputValue(newValue.toString("hex"));
    safelySetColorValue(newValue);
    validation.commitValidation();
  };
  let incrementToMax = () => safelySetColorValue($83c2160a93ad557c$var$MAX_COLOR);
  let decrementToMin = () => safelySetColorValue($83c2160a93ad557c$var$MIN_COLOR);
  let validate = (value2) => value2 === "" || !!value2.match(/^#?[0-9a-f]{0,6}$/i)?.[0];
  return {
    ...validation,
    validate,
    colorValue,
    defaultColorValue: initialDefaultValue ?? initialValue,
    setColorValue,
    inputValue,
    setInputValue,
    commit,
    increment,
    incrementToMax,
    decrement,
    decrementToMin
  };
}
function $83c2160a93ad557c$var$addColorValue(color, step) {
  let newColor = color ? color : $83c2160a93ad557c$var$MIN_COLOR;
  let colorInt = newColor.toHexInt();
  let clampInt = Math.min(Math.max(colorInt + step, $83c2160a93ad557c$var$MIN_COLOR_INT), $83c2160a93ad557c$var$MAX_COLOR_INT);
  if (clampInt !== colorInt) {
    let newColorString = `#${clampInt.toString(16).padStart(6, "0").toUpperCase()}`;
    newColor = (0, $890783418b00a858$export$6e865ea70d7724f)(newColorString);
  }
  return newColor;
}

// node_modules/react-stately/dist/private/numberfield/useNumberFieldState.mjs
var import_react7 = __toESM(require_react(), 1);
function $3d0ee518c6f3d04f$export$7f629e9dc1ecf37c(props) {
  let { minValue, maxValue, step, formatOptions, value, defaultValue = NaN, onChange, locale, isDisabled, isReadOnly, commitBehavior = "snap" } = props;
  if (value === null) value = NaN;
  let snapValue = (0, import_react7.useCallback)((value2) => {
    return step === void 0 || isNaN(step) ? (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(value2, minValue, maxValue) : (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(value2, minValue, maxValue, step);
  }, [
    step,
    minValue,
    maxValue
  ]);
  if (value !== void 0 && !isNaN(value) && commitBehavior === "snap") value = snapValue(value);
  if (!isNaN(defaultValue) && commitBehavior === "snap") defaultValue = snapValue(defaultValue);
  let [numberValue, setNumberValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, isNaN(defaultValue) ? NaN : defaultValue, onChange);
  let [initialValue] = (0, import_react7.useState)(numberValue);
  let [inputValue, setInputValue] = (0, import_react7.useState)(() => isNaN(numberValue) ? "" : new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, formatOptions).format(numberValue));
  let numberParser = (0, import_react7.useMemo)(() => new (0, $eb76cf4feb040f77$export$cd11ab140839f11d)(locale, formatOptions), [
    locale,
    formatOptions
  ]);
  let numberingSystem = (0, import_react7.useMemo)(() => numberParser.getNumberingSystem(inputValue), [
    numberParser,
    inputValue
  ]);
  let formatter = (0, import_react7.useMemo)(() => new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, {
    ...formatOptions,
    numberingSystem
  }), [
    locale,
    formatOptions,
    numberingSystem
  ]);
  let intlOptions = (0, import_react7.useMemo)(() => formatter.resolvedOptions(), [
    formatter
  ]);
  let format = (0, import_react7.useCallback)((value2) => isNaN(value2) || value2 === null ? "" : formatter.format(value2), [
    formatter
  ]);
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: numberValue
  });
  let clampStep = step !== void 0 && !isNaN(step) ? step : 1;
  if (intlOptions.style === "percent" && (step === void 0 || isNaN(step))) clampStep = 0.01;
  let [prevValue, setPrevValue] = (0, import_react7.useState)(numberValue);
  let [prevLocale, setPrevLocale] = (0, import_react7.useState)(locale);
  let [prevFormatOptions, setPrevFormatOptions] = (0, import_react7.useState)(formatOptions);
  if (!Object.is(numberValue, prevValue) || locale !== prevLocale || !$3d0ee518c6f3d04f$var$isEqualFormatOptions(formatOptions, prevFormatOptions)) {
    setInputValue(format(numberValue));
    setPrevValue(numberValue);
    setPrevLocale(locale);
    setPrevFormatOptions(formatOptions);
  }
  let parsedValue = (0, import_react7.useMemo)(() => numberParser.parse(inputValue), [
    numberParser,
    inputValue
  ]);
  let commit = (overrideValue) => {
    let newInputValue = overrideValue === void 0 ? inputValue : overrideValue;
    let newParsedValue = parsedValue;
    if (overrideValue !== void 0) newParsedValue = numberParser.parse(newInputValue);
    if (!newInputValue.length) {
      setNumberValue(NaN);
      setInputValue(value === void 0 ? "" : format(numberValue));
      return;
    }
    if (isNaN(newParsedValue)) {
      setInputValue(format(numberValue));
      return;
    }
    let clampedValue = commitBehavior === "snap" ? snapValue(newParsedValue) : newParsedValue;
    clampedValue = numberParser.parse(format(clampedValue));
    let shouldValidate = clampedValue !== numberValue;
    setNumberValue(clampedValue);
    setInputValue(format(value === void 0 ? clampedValue : numberValue));
    if (shouldValidate) validation.commitValidation();
  };
  let safeNextStep = (operation, minMax = 0) => {
    let prev = parsedValue;
    if (isNaN(prev)) {
      let newValue = isNaN(minMax) ? 0 : minMax;
      return (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(newValue, minValue, maxValue, clampStep);
    } else {
      let newValue = (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(prev, minValue, maxValue, clampStep);
      if (operation === "+" && newValue > prev || operation === "-" && newValue < prev) return newValue;
      return (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)($3d0ee518c6f3d04f$var$handleDecimalOperation(operation, prev, clampStep), minValue, maxValue, clampStep);
    }
  };
  let increment = () => {
    let newValue = safeNextStep("+", minValue);
    if (newValue === numberValue) setInputValue(format(newValue));
    setNumberValue(newValue);
    validation.commitValidation();
  };
  let decrement = () => {
    let newValue = safeNextStep("-", maxValue);
    if (newValue === numberValue) setInputValue(format(newValue));
    setNumberValue(newValue);
    validation.commitValidation();
  };
  let incrementToMax = () => {
    if (maxValue != null) {
      setNumberValue((0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(maxValue, minValue, maxValue, clampStep));
      validation.commitValidation();
    }
  };
  let decrementToMin = () => {
    if (minValue != null) {
      setNumberValue(minValue);
      validation.commitValidation();
    }
  };
  let canIncrement = (0, import_react7.useMemo)(() => !isDisabled && !isReadOnly && (isNaN(parsedValue) || maxValue === void 0 || isNaN(maxValue) || (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(parsedValue, minValue, maxValue, clampStep) > parsedValue || $3d0ee518c6f3d04f$var$handleDecimalOperation("+", parsedValue, clampStep) <= maxValue), [
    isDisabled,
    isReadOnly,
    minValue,
    maxValue,
    clampStep,
    parsedValue
  ]);
  let canDecrement = (0, import_react7.useMemo)(() => !isDisabled && !isReadOnly && (isNaN(parsedValue) || minValue === void 0 || isNaN(minValue) || (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(parsedValue, minValue, maxValue, clampStep) < parsedValue || $3d0ee518c6f3d04f$var$handleDecimalOperation("-", parsedValue, clampStep) >= minValue), [
    isDisabled,
    isReadOnly,
    minValue,
    maxValue,
    clampStep,
    parsedValue
  ]);
  let validate = (value2) => numberParser.isValidPartialNumber(value2, minValue, maxValue);
  return {
    ...validation,
    validate,
    increment,
    incrementToMax,
    decrement,
    decrementToMin,
    canIncrement,
    canDecrement,
    minValue,
    maxValue,
    numberValue: parsedValue,
    defaultNumberValue: isNaN(defaultValue) ? initialValue : defaultValue,
    setNumberValue,
    setInputValue,
    inputValue,
    commit
  };
}
function $3d0ee518c6f3d04f$var$isEqualFormatOptions(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (b[key] !== a[key]) return false;
  }
  return true;
}
function $3d0ee518c6f3d04f$var$handleDecimalOperation(operator, value1, value2) {
  let result = operator === "+" ? value1 + value2 : value1 - value2;
  if (value1 % 1 !== 0 || value2 % 1 !== 0) {
    const value1Decimal = value1.toString().split(".");
    const value2Decimal = value2.toString().split(".");
    const value1DecimalLength = value1Decimal[1] && value1Decimal[1].length || 0;
    const value2DecimalLength = value2Decimal[1] && value2Decimal[1].length || 0;
    const multiplier = Math.pow(10, Math.max(value1DecimalLength, value2DecimalLength));
    value1 = Math.round(value1 * multiplier);
    value2 = Math.round(value2 * multiplier);
    result = operator === "+" ? value1 + value2 : value1 - value2;
    result /= multiplier;
  }
  return result;
}

// node_modules/react-stately/dist/private/color/useColorChannelFieldState.mjs
var import_react8 = __toESM(require_react(), 1);
function $378fa61546b28d38$export$b9fc0d69c9190c4a(props) {
  let { channel, colorSpace, locale } = props;
  let initialValue = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(props.value);
  let initialDefaultValue = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(props.defaultValue);
  let [colorValue, setColor] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(initialValue, initialDefaultValue ?? null, props.onChange);
  let color = $378fa61546b28d38$var$useConvertColor(colorValue, colorSpace);
  let [initialColorValue] = (0, import_react8.useState)(colorValue);
  let defaultColorValue = initialDefaultValue ?? initialColorValue;
  let defaultColor = $378fa61546b28d38$var$useConvertColor(defaultColorValue, colorSpace);
  let value = color.getChannelValue(channel);
  let range = color.getChannelRange(channel);
  let formatOptions = (0, import_react8.useMemo)(() => color.getChannelFormatOptions(channel), [
    color,
    channel
  ]);
  let multiplier = formatOptions.style === "percent" && range.maxValue === 100 ? 100 : 1;
  let numberFieldState = (0, $3d0ee518c6f3d04f$export$7f629e9dc1ecf37c)({
    locale,
    value: colorValue === null ? NaN : value / multiplier,
    defaultValue: defaultColorValue === null ? NaN : defaultColor.getChannelValue(channel) / multiplier,
    onChange: (v) => {
      if (!Number.isNaN(v)) setColor(color.withChannelValue(channel, v * multiplier));
      else setColor(null);
    },
    minValue: range.minValue / multiplier,
    maxValue: range.maxValue / multiplier,
    step: range.step / multiplier,
    formatOptions
  });
  return {
    ...numberFieldState,
    colorValue: color,
    defaultColorValue,
    setColorValue: setColor
  };
}
function $378fa61546b28d38$var$useConvertColor(colorValue, colorSpace) {
  let black = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)("#000");
  return (0, import_react8.useMemo)(() => {
    let nonNullColorValue = colorValue || black;
    return colorSpace && nonNullColorValue ? nonNullColorValue.toFormat(colorSpace) : nonNullColorValue;
  }, [
    black,
    colorValue,
    colorSpace
  ]);
}

// node_modules/react-stately/dist/private/slider/useSliderState.mjs
var import_react9 = __toESM(require_react(), 1);
var $d806310b82f07e9d$var$DEFAULT_MIN_VALUE = 0;
var $d806310b82f07e9d$var$DEFAULT_MAX_VALUE = 100;
var $d806310b82f07e9d$var$DEFAULT_STEP_VALUE = 1;
function $d806310b82f07e9d$export$e5fda3247f5d67f9(props) {
  const { isDisabled = false, minValue = $d806310b82f07e9d$var$DEFAULT_MIN_VALUE, maxValue = $d806310b82f07e9d$var$DEFAULT_MAX_VALUE, numberFormatter: formatter, step = $d806310b82f07e9d$var$DEFAULT_STEP_VALUE, orientation = "horizontal" } = props;
  let pageSize = (0, import_react9.useMemo)(() => {
    let calcPageSize = (maxValue - minValue) / 10;
    calcPageSize = (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(calcPageSize, 0, calcPageSize + step, step);
    return Math.max(calcPageSize, step);
  }, [
    step,
    maxValue,
    minValue
  ]);
  let restrictValues = (0, import_react9.useCallback)((values2) => values2?.map((val, idx) => {
    let min = idx === 0 ? minValue : values2[idx - 1];
    let max = idx === values2.length - 1 ? maxValue : values2[idx + 1];
    return (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(val, min, max, step);
  }), [
    minValue,
    maxValue,
    step
  ]);
  let value = (0, import_react9.useMemo)(() => restrictValues($d806310b82f07e9d$var$convertValue(props.value)), [
    props.value,
    restrictValues
  ]);
  let defaultValue = (0, import_react9.useMemo)(() => restrictValues($d806310b82f07e9d$var$convertValue(props.defaultValue) ?? [
    minValue
  ]), [
    props.defaultValue,
    minValue,
    restrictValues
  ]);
  let onChange = $d806310b82f07e9d$var$createOnChange(props.value, props.defaultValue, props.onChange);
  let onChangeEnd = $d806310b82f07e9d$var$createOnChange(props.value, props.defaultValue, props.onChangeEnd);
  const [values, setValuesState] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, defaultValue, onChange);
  let [initialValues] = (0, import_react9.useState)(values);
  const [isDraggings, setDraggingsState] = (0, import_react9.useState)(new Array(values.length).fill(false));
  const isEditablesRef = (0, import_react9.useRef)(new Array(values.length).fill(true));
  const [focusedIndex, setFocusedIndex] = (0, import_react9.useState)(void 0);
  const valuesRef = (0, import_react9.useRef)(values);
  const isDraggingsRef = (0, import_react9.useRef)(isDraggings);
  let setValues = (values2) => {
    valuesRef.current = values2;
    setValuesState(values2);
  };
  let setDraggings = (draggings) => {
    isDraggingsRef.current = draggings;
    setDraggingsState(draggings);
  };
  function getValuePercent(value2) {
    return (value2 - minValue) / (maxValue - minValue);
  }
  function getThumbMinValue(index) {
    return index === 0 ? minValue : values[index - 1];
  }
  function getThumbMaxValue(index) {
    return index === values.length - 1 ? maxValue : values[index + 1];
  }
  function isThumbEditable(index) {
    return isEditablesRef.current[index];
  }
  function setThumbEditable(index, editable) {
    isEditablesRef.current[index] = editable;
  }
  function updateValue(index, value2) {
    if (isDisabled || !isThumbEditable(index)) return;
    const thisMin = getThumbMinValue(index);
    const thisMax = getThumbMaxValue(index);
    value2 = (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(value2, thisMin, thisMax, step);
    let newValues = $d806310b82f07e9d$var$replaceIndex(valuesRef.current, index, value2);
    setValues(newValues);
  }
  function updateDragging(index, dragging) {
    if (isDisabled || !isThumbEditable(index)) return;
    if (dragging) valuesRef.current = values;
    const wasDragging = isDraggingsRef.current[index];
    isDraggingsRef.current = $d806310b82f07e9d$var$replaceIndex(isDraggingsRef.current, index, dragging);
    setDraggings(isDraggingsRef.current);
    if (onChangeEnd && wasDragging && !isDraggingsRef.current.some(Boolean)) onChangeEnd(valuesRef.current);
  }
  let listFormatRef = (0, import_react9.useRef)(null);
  function getFormattedValue(valueParam = values) {
    if (typeof valueParam === "number") valueParam = [
      valueParam
    ];
    switch (valueParam.length) {
      case 0:
        return "";
      case 1:
        return formatter.format(valueParam[0]);
      case 2:
        return formatter.formatRange(valueParam[0], valueParam[1]);
      default: {
        let formatted = valueParam.map((value2) => formatter.format(value2));
        let listFormat = listFormatRef.current;
        if (!listFormat || listFormat.resolvedOptions().locale !== formatter.resolvedOptions().locale) listFormat = listFormatRef.current = new Intl.ListFormat(formatter.resolvedOptions().locale, {
          type: "unit"
        });
        return listFormat.format(formatted);
      }
    }
  }
  function setThumbPercent(index, percent) {
    updateValue(index, getPercentValue(percent));
  }
  function getRoundedValue(value2) {
    return Math.round((value2 - minValue) / step) * step + minValue;
  }
  function getPercentValue(percent) {
    const val = percent * (maxValue - minValue) + minValue;
    return (0, $240e9101ba2842f5$export$7d15b64cf5a3a4c4)(getRoundedValue(val), minValue, maxValue);
  }
  function incrementThumb(index, stepSize = 1) {
    let s = Math.max(stepSize, step);
    updateValue(index, (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(values[index] + s, minValue, maxValue, step));
  }
  function decrementThumb(index, stepSize = 1) {
    let s = Math.max(stepSize, step);
    updateValue(index, (0, $240e9101ba2842f5$export$cb6e0bb50bc19463)(values[index] - s, minValue, maxValue, step));
  }
  return {
    values,
    defaultValues: props.defaultValue !== void 0 ? defaultValue : initialValues,
    getThumbValue: (index) => values[index],
    setThumbValue: updateValue,
    setThumbPercent,
    isThumbDragging: (index) => isDraggings[index],
    setThumbDragging: updateDragging,
    focusedThumb: focusedIndex,
    setFocusedThumb: setFocusedIndex,
    getThumbPercent: (index) => getValuePercent(values[index]),
    getValuePercent,
    getThumbValueLabel: (index) => getFormattedValue(values[index]),
    getFormattedValue,
    getThumbMinValue,
    getThumbMaxValue,
    getPercentValue,
    isThumbEditable,
    setThumbEditable,
    incrementThumb,
    decrementThumb,
    step,
    pageSize,
    orientation,
    isDisabled
  };
}
function $d806310b82f07e9d$var$replaceIndex(array, index, value) {
  if (array[index] === value) return array;
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1)
  ];
}
function $d806310b82f07e9d$var$convertValue(value) {
  if (value == null) return void 0;
  return Array.isArray(value) ? value : [
    value
  ];
}
function $d806310b82f07e9d$var$createOnChange(value, defaultValue, onChange) {
  return (newValue) => {
    if (typeof value === "number" || typeof defaultValue === "number") onChange?.(newValue[0]);
    else onChange?.(newValue);
  };
}

// node_modules/react-stately/dist/private/color/useColorSliderState.mjs
var import_react10 = __toESM(require_react(), 1);
function $e1eacc05b29dcc25$export$57bc203e1c9c6d44(props) {
  let { channel, colorSpace, value, defaultValue, onChange, locale, ...otherProps } = props;
  if (value == null && defaultValue == null) throw new Error("useColorSliderState requires a value or defaultValue");
  if (value) value = (0, $890783418b00a858$export$4cde5df63f53f473)(value);
  if (defaultValue) defaultValue = (0, $890783418b00a858$export$4cde5df63f53f473)(defaultValue);
  let [colorValue, setColor] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, defaultValue, onChange);
  let color = (0, import_react10.useMemo)(() => colorSpace && colorValue ? colorValue.toFormat(colorSpace) : colorValue, [
    colorValue,
    colorSpace
  ]);
  let [initialValue] = (0, import_react10.useState)(colorValue);
  let defaultColorValue = defaultValue ?? initialValue;
  let defaultColor = (0, import_react10.useMemo)(() => colorSpace && defaultColorValue ? defaultColorValue.toFormat(colorSpace) : defaultColorValue, [
    defaultColorValue,
    colorSpace
  ]);
  let numberFormatter = (0, import_react10.useMemo)(() => new Intl.NumberFormat(), []);
  let sliderState = (0, $d806310b82f07e9d$export$e5fda3247f5d67f9)({
    ...color.getChannelRange(channel),
    ...otherProps,
    numberFormatter,
    value: color.getChannelValue(channel),
    defaultValue: defaultColor.getChannelValue(channel),
    onChange(v) {
      setColor(color.withChannelValue(channel, v));
    },
    onChangeEnd(v) {
      if (props.onChangeEnd) props.onChangeEnd(color.withChannelValue(channel, v));
    }
  });
  let { step, pageSize } = color.getChannelRange(channel);
  return {
    ...sliderState,
    value: color,
    setValue(value2) {
      setColor((0, $890783418b00a858$export$4cde5df63f53f473)(value2));
    },
    getDisplayColor() {
      switch (channel) {
        case "hue":
          return (0, $890783418b00a858$export$6e865ea70d7724f)(`hsl(${color.getChannelValue("hue")}, 100%, 50%)`);
        case "lightness":
        case "brightness":
        case "saturation":
        case "red":
        case "green":
        case "blue":
          return color.withChannelValue("alpha", 1);
        case "alpha":
          return color;
        default:
          throw new Error("Unknown color channel: " + channel);
      }
    },
    getThumbValueLabel() {
      return color.formatChannelValue(channel, locale);
    },
    getFormattedValue() {
      return color.formatChannelValue(channel, locale);
    },
    step,
    pageSize,
    isDragging: sliderState.isThumbDragging(0)
  };
}

// node_modules/react-stately/dist/private/selection/Selection.mjs
var $8b2540e09867b15e$export$52baac22726c72bf = class _$8b2540e09867b15e$export$52baac22726c72bf extends Set {
  constructor(keys, anchorKey, currentKey) {
    super(keys);
    if (keys instanceof _$8b2540e09867b15e$export$52baac22726c72bf) {
      this.anchorKey = anchorKey ?? keys.anchorKey;
      this.currentKey = currentKey ?? keys.currentKey;
    } else {
      this.anchorKey = anchorKey ?? null;
      this.currentKey = currentKey ?? null;
    }
  }
};

// node_modules/react-stately/dist/private/selection/useMultipleSelectionState.mjs
var import_react11 = __toESM(require_react(), 1);
function $60f19cefd567a3e4$var$equalSets(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (let item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}
function $60f19cefd567a3e4$export$253fe78d46329472(props) {
  let { selectionMode = "none", disallowEmptySelection = false, allowDuplicateSelectionEvents, selectionBehavior: selectionBehaviorProp = "toggle", disabledBehavior = "all" } = props;
  let isFocusedRef = (0, import_react11.useRef)(false);
  let [, setFocused] = (0, import_react11.useState)(false);
  let focusedKeyRef = (0, import_react11.useRef)(null);
  let childFocusStrategyRef = (0, import_react11.useRef)(null);
  let [, setFocusedKey] = (0, import_react11.useState)(null);
  let selectedKeysProp = (0, import_react11.useMemo)(() => $60f19cefd567a3e4$var$convertSelection(props.selectedKeys), [
    props.selectedKeys
  ]);
  let defaultSelectedKeys = (0, import_react11.useMemo)(() => $60f19cefd567a3e4$var$convertSelection(props.defaultSelectedKeys, new (0, $8b2540e09867b15e$export$52baac22726c72bf)()), [
    props.defaultSelectedKeys
  ]);
  let [selectedKeys, setSelectedKeys] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(selectedKeysProp, defaultSelectedKeys, props.onSelectionChange);
  let disabledKeysProp = (0, import_react11.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let [selectionBehavior, setSelectionBehavior] = (0, import_react11.useState)(selectionBehaviorProp);
  if (selectionBehaviorProp === "replace" && selectionBehavior === "toggle" && typeof selectedKeys === "object" && selectedKeys.size === 0) setSelectionBehavior("replace");
  let lastSelectionBehavior = (0, import_react11.useRef)(selectionBehaviorProp);
  (0, import_react11.useEffect)(() => {
    if (selectionBehaviorProp !== lastSelectionBehavior.current) {
      setSelectionBehavior(selectionBehaviorProp);
      lastSelectionBehavior.current = selectionBehaviorProp;
    }
  }, [
    selectionBehaviorProp
  ]);
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    get isFocused() {
      return isFocusedRef.current;
    },
    setFocused(f) {
      isFocusedRef.current = f;
      setFocused(f);
    },
    get focusedKey() {
      return focusedKeyRef.current;
    },
    get childFocusStrategy() {
      return childFocusStrategyRef.current;
    },
    setFocusedKey(k, childFocusStrategy = "first") {
      focusedKeyRef.current = k;
      childFocusStrategyRef.current = childFocusStrategy;
      setFocusedKey(k);
    },
    selectedKeys,
    setSelectedKeys(keys) {
      if (allowDuplicateSelectionEvents || !$60f19cefd567a3e4$var$equalSets(keys, selectedKeys)) setSelectedKeys(keys);
    },
    disabledKeys: disabledKeysProp,
    disabledBehavior
  };
}
function $60f19cefd567a3e4$var$convertSelection(selection, defaultValue) {
  if (!selection) return defaultValue;
  return selection === "all" ? "all" : new (0, $8b2540e09867b15e$export$52baac22726c72bf)(selection);
}

// node_modules/react-stately/dist/private/collections/CollectionBuilder.mjs
var import_react12 = __toESM(require_react(), 1);
var $bda7a7e55e1ff206$export$bf788dd355e3a401 = class {
  build(props, context) {
    this.context = context;
    return $bda7a7e55e1ff206$var$iterable(() => this.iterateCollection(props));
  }
  *iterateCollection(props) {
    let { children, items } = props;
    if ((0, import_react12.default).isValidElement(children) && children.type === (0, import_react12.default).Fragment) yield* this.iterateCollection({
      children: children.props.children,
      items
    });
    else if (typeof children === "function") {
      if (!items) throw new Error("props.children was a function but props.items is missing");
      let index = 0;
      for (let item of items) {
        yield* this.getFullNode({
          value: item,
          index
        }, {
          renderer: children
        });
        index++;
      }
    } else {
      let items2 = [];
      (0, import_react12.default).Children.forEach(children, (child) => {
        if (child) items2.push(child);
      });
      let index = 0;
      for (let item of items2) {
        let nodes = this.getFullNode({
          element: item,
          index
        }, {});
        for (let node of nodes) {
          index++;
          yield node;
        }
      }
    }
  }
  getKey(item, partialNode, state, parentKey) {
    if (item.key != null) return item.key;
    if (partialNode.type === "cell" && partialNode.key != null) return `${parentKey}${partialNode.key}`;
    let v = partialNode.value;
    if (v != null) {
      let key = v.key ?? v.id;
      if (key == null) throw new Error("No key found for item");
      return key;
    }
    return parentKey ? `${parentKey}.${partialNode.index}` : `$.${partialNode.index}`;
  }
  getChildState(state, partialNode) {
    return {
      renderer: partialNode.renderer || state.renderer
    };
  }
  *getFullNode(partialNode, state, parentKey, parentNode) {
    if ((0, import_react12.default).isValidElement(partialNode.element) && partialNode.element.type === (0, import_react12.default).Fragment) {
      let children = [];
      (0, import_react12.default).Children.forEach(partialNode.element.props.children, (child) => {
        children.push(child);
      });
      let index = partialNode.index ?? 0;
      for (const child of children) yield* this.getFullNode({
        element: child,
        index: index++
      }, state, parentKey, parentNode);
      return;
    }
    let element = partialNode.element;
    if (!element && partialNode.value && state && state.renderer) {
      let cached = this.cache.get(partialNode.value);
      if (cached && (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))) {
        cached.index = partialNode.index;
        cached.parentKey = parentNode ? parentNode.key : null;
        yield cached;
        return;
      }
      element = state.renderer(partialNode.value);
    }
    if ((0, import_react12.default).isValidElement(element)) {
      let type = element.type;
      if (typeof type !== "function" && typeof type.getCollectionNode !== "function") {
        let name = element.type;
        throw new Error(`Unknown element <${name}> in collection.`);
      }
      let childNodes = type.getCollectionNode(element.props, this.context);
      let index = partialNode.index ?? 0;
      let result = childNodes.next();
      while (!result.done && result.value) {
        let childNode = result.value;
        partialNode.index = index;
        let nodeKey = childNode.key ?? null;
        if (nodeKey == null) nodeKey = childNode.element ? null : this.getKey(element, partialNode, state, parentKey);
        let nodes = this.getFullNode({
          ...childNode,
          key: nodeKey,
          index,
          wrapper: $bda7a7e55e1ff206$var$compose(partialNode.wrapper, childNode.wrapper)
        }, this.getChildState(state, childNode), parentKey ? `${parentKey}${element.key}` : element.key, parentNode);
        let children = [
          ...nodes
        ];
        for (let node2 of children) {
          node2.value = childNode.value ?? partialNode.value ?? null;
          if (node2.value) this.cache.set(node2.value, node2);
          if (partialNode.type && node2.type !== partialNode.type) throw new Error(`Unsupported type <${$bda7a7e55e1ff206$var$capitalize(node2.type)}> in <${$bda7a7e55e1ff206$var$capitalize(parentNode?.type ?? "unknown parent type")}>. Only <${$bda7a7e55e1ff206$var$capitalize(partialNode.type)}> is supported.`);
          index++;
          yield node2;
        }
        result = childNodes.next(children);
      }
      return;
    }
    if (partialNode.key == null || partialNode.type == null) return;
    let builder = this;
    let node = {
      type: partialNode.type,
      props: partialNode.props,
      key: partialNode.key,
      parentKey: parentNode ? parentNode.key : null,
      value: partialNode.value ?? null,
      level: (parentNode?.level ?? 0) + (parentNode?.type === "item" ? 1 : 0),
      index: partialNode.index,
      rendered: partialNode.rendered,
      textValue: partialNode.textValue ?? "",
      "aria-label": partialNode["aria-label"],
      wrapper: partialNode.wrapper,
      shouldInvalidate: partialNode.shouldInvalidate,
      hasChildNodes: partialNode.hasChildNodes || false,
      childNodes: $bda7a7e55e1ff206$var$iterable(function* () {
        if (!partialNode.hasChildNodes || !partialNode.childNodes) return;
        let index = 0;
        for (let child of partialNode.childNodes()) {
          if (child.key != null)
            child.key = `${node.key}${child.key}`;
          let nodes = builder.getFullNode({
            ...child,
            index
          }, builder.getChildState(state, child), node.key, node);
          for (let node2 of nodes) {
            index++;
            yield node2;
          }
        }
      })
    };
    yield node;
  }
  constructor() {
    this.cache = /* @__PURE__ */ new WeakMap();
  }
};
function $bda7a7e55e1ff206$var$iterable(iterator) {
  let cache = [];
  let iterable = null;
  return {
    *[Symbol.iterator]() {
      for (let item of cache) yield item;
      if (!iterable) iterable = iterator();
      for (let item of iterable) {
        cache.push(item);
        yield item;
      }
    }
  };
}
function $bda7a7e55e1ff206$var$compose(outer, inner) {
  if (outer && inner) return (element) => outer(inner(element));
  if (outer) return outer;
  if (inner) return inner;
}
function $bda7a7e55e1ff206$var$capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

// node_modules/react-stately/dist/private/collections/useCollection.mjs
var import_react13 = __toESM(require_react(), 1);
function $d03379b88399b8c5$export$6cd28814d92fa9c9(props, factory, context) {
  let builder = (0, import_react13.useMemo)(() => new (0, $bda7a7e55e1ff206$export$bf788dd355e3a401)(), []);
  let { children, items, collection } = props;
  let result = (0, import_react13.useMemo)(() => {
    if (collection) return collection;
    let nodes = builder.build({
      children,
      items
    }, context);
    return factory(nodes);
  }, [
    builder,
    children,
    items,
    collection,
    context,
    factory
  ]);
  return result;
}

// node_modules/react-stately/dist/private/list/ListCollection.mjs
var $f664a81d022446b5$export$d085fb9e920b5ca7 = class {
  constructor(nodes) {
    this.keyMap = /* @__PURE__ */ new Map();
    this.firstKey = null;
    this.lastKey = null;
    this.iterable = nodes;
    let visit = (node) => {
      this.keyMap.set(node.key, node);
      if (node.childNodes && node.type === "section") for (let child of node.childNodes) visit(child);
    };
    for (let node of nodes) visit(node);
    let last = null;
    let index = 0;
    let size = 0;
    for (let [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = void 0;
      }
      if (node.type === "item") node.index = index++;
      if (node.type === "section" || node.type === "item") size++;
      last = node;
      last.nextKey = void 0;
    }
    this._size = size;
    this.lastKey = last?.key ?? null;
  }
  *[Symbol.iterator]() {
    yield* this.iterable;
  }
  get size() {
    return this._size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey ?? null : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey ?? null : null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key) ?? null;
  }
  at(idx) {
    const keys = [
      ...this.getKeys()
    ];
    return this.getItem(keys[idx]);
  }
  getChildren(key) {
    let node = this.keyMap.get(key);
    return node?.childNodes || [];
  }
};

// node_modules/react-stately/dist/private/selection/SelectionManager.mjs
var $4a07ac835f260f78$export$6c8a5aaad13c9852 = class _$4a07ac835f260f78$export$6c8a5aaad13c9852 {
  constructor(collection, state, options) {
    this.collection = collection;
    this.state = state;
    this.allowsCellSelection = options?.allowsCellSelection ?? false;
    this._isSelectAll = null;
    this.layoutDelegate = options?.layoutDelegate || null;
    this.fullCollection = options?.fullCollection || null;
  }
  /**
  * The type of selection that is allowed in the collection.
  */
  get selectionMode() {
    return this.state.selectionMode;
  }
  /**
  * Whether the collection allows empty selection.
  */
  get disallowEmptySelection() {
    return this.state.disallowEmptySelection;
  }
  /**
  * The selection behavior for the collection.
  */
  get selectionBehavior() {
    return this.state.selectionBehavior;
  }
  /**
  * Sets the selection behavior for the collection.
  */
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  /**
  * Whether the collection is currently focused.
  */
  get isFocused() {
    return this.state.isFocused;
  }
  /**
  * Sets whether the collection is focused.
  */
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  /**
  * The current focused key in the collection.
  */
  get focusedKey() {
    return this.state.focusedKey;
  }
  /** Whether the first or last child of the focused key should receive focus. */
  get childFocusStrategy() {
    return this.state.childFocusStrategy;
  }
  /**
  * Sets the focused key.
  */
  setFocusedKey(key, childFocusStrategy) {
    if (key == null || this.collection.getItem(key)) this.state.setFocusedKey(key, childFocusStrategy);
  }
  /**
  * The currently selected keys in the collection.
  */
  get selectedKeys() {
    return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
  }
  /**
  * The raw selection value for the collection.
  * Either 'all' for select all, or a set of keys.
  */
  get rawSelection() {
    return this.state.selectedKeys;
  }
  /**
  * Returns whether a key is selected.
  */
  isSelected(key) {
    if (this.state.selectionMode === "none") return false;
    let mappedKey = this.getKey(key);
    if (mappedKey == null) return false;
    return this.state.selectedKeys === "all" ? this.canSelectItem(mappedKey) : this.state.selectedKeys.has(mappedKey);
  }
  /**
  * Whether the selection is empty.
  */
  get isEmpty() {
    return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
  }
  /**
  * Whether all items in the collection are selected.
  */
  get isSelectAll() {
    if (this.isEmpty) return false;
    if (this.state.selectedKeys === "all") return true;
    if (this._isSelectAll != null) return this._isSelectAll;
    let allKeys = this.getSelectAllKeys();
    let selectedKeys = this.state.selectedKeys;
    this._isSelectAll = allKeys.every((k) => selectedKeys.has(k));
    return this._isSelectAll;
  }
  get firstSelectedKey() {
    let first = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (!first || item && (0, $cd5ea4b915021f1d$export$8c434b3a7a4dad6)(this.collection, item, first) < 0) first = item;
    }
    return first?.key ?? null;
  }
  get lastSelectedKey() {
    let last = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (!last || item && (0, $cd5ea4b915021f1d$export$8c434b3a7a4dad6)(this.collection, item, last) > 0) last = item;
    }
    return last?.key ?? null;
  }
  get disabledKeys() {
    return this.state.disabledKeys;
  }
  get disabledBehavior() {
    return this.state.disabledBehavior;
  }
  /**
  * Extends the selection to the given key.
  */
  extendSelection(toKey) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single") {
      this.replaceSelection(toKey);
      return;
    }
    let mappedToKey = this.getKey(toKey);
    if (mappedToKey == null) return;
    let selection;
    if (this.state.selectedKeys === "all") selection = new (0, $8b2540e09867b15e$export$52baac22726c72bf)([
      mappedToKey
    ], mappedToKey, mappedToKey);
    else {
      let selectedKeys = this.state.selectedKeys;
      let anchorKey = selectedKeys.anchorKey ?? mappedToKey;
      selection = new (0, $8b2540e09867b15e$export$52baac22726c72bf)(selectedKeys, anchorKey, mappedToKey);
      for (let key of this.getKeyRange(anchorKey, selectedKeys.currentKey ?? mappedToKey)) selection.delete(key);
      for (let key of this.getKeyRange(mappedToKey, anchorKey)) if (this.canSelectItem(key)) selection.add(key);
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    let fromItem = this.collection.getItem(from);
    let toItem = this.collection.getItem(to);
    if (fromItem && toItem) {
      if ((0, $cd5ea4b915021f1d$export$8c434b3a7a4dad6)(this.collection, fromItem, toItem) <= 0) return this.getKeyRangeInternal(from, to);
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    if (this.layoutDelegate?.getKeyRange) return this.layoutDelegate.getKeyRange(from, to);
    let keys = [];
    let key = from;
    while (key != null) {
      let item = this.collection.getItem(key);
      if (item && (item.type === "item" || item.type === "cell" && this.allowsCellSelection)) keys.push(key);
      if (key === to) return keys;
      key = this.collection.getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    let item = this.collection.getItem(key);
    if (!item)
      return key;
    if (item.type === "cell" && this.allowsCellSelection) return key;
    while (item && item.type !== "item" && item.parentKey != null) item = this.collection.getItem(item.parentKey);
    if (!item || item.type !== "item") return null;
    return item.key;
  }
  /**
  * Toggles whether the given key is selected.
  */
  toggleSelection(key) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    let mappedKey = this.getKey(key);
    if (mappedKey == null) return;
    let keys = new (0, $8b2540e09867b15e$export$52baac22726c72bf)(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
    if (keys.has(mappedKey)) keys.delete(mappedKey);
    else if (this.canSelectItem(mappedKey)) {
      keys.add(mappedKey);
      keys.anchorKey = mappedKey;
      keys.currentKey = mappedKey;
    }
    if (this.disallowEmptySelection && keys.size === 0) return;
    this.state.setSelectedKeys(keys);
  }
  /**
  * Replaces the selection with only the given key.
  */
  replaceSelection(key) {
    if (this.selectionMode === "none") return;
    let mappedKey = this.getKey(key);
    if (mappedKey == null) return;
    let selection = this.canSelectItem(mappedKey) ? new (0, $8b2540e09867b15e$export$52baac22726c72bf)([
      mappedKey
    ], mappedKey, mappedKey) : new (0, $8b2540e09867b15e$export$52baac22726c72bf)();
    this.state.setSelectedKeys(selection);
  }
  /**
  * Replaces the selection with the given keys.
  */
  setSelectedKeys(keys) {
    if (this.selectionMode === "none") return;
    let selection = new (0, $8b2540e09867b15e$export$52baac22726c72bf)();
    for (let key of keys) {
      let mappedKey = this.getKey(key);
      if (mappedKey != null) {
        selection.add(mappedKey);
        if (this.selectionMode === "single") break;
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getSelectAllKeys() {
    let collection = this.fullCollection ?? this.collection;
    let keys = [];
    let addKeys = (key) => {
      while (key != null) {
        if (this.canSelectItemIn(key, collection)) {
          let item = collection.getItem(key);
          if (item?.type === "item") keys.push(key);
          if (item?.hasChildNodes && (this.allowsCellSelection || item.type !== "item")) addKeys((0, $cd5ea4b915021f1d$export$fbdeaa6a76694f71)((0, $cd5ea4b915021f1d$export$1005530eda016c13)(item, collection))?.key ?? null);
        }
        key = collection.getKeyAfter(key);
      }
    };
    addKeys(collection.getFirstKey());
    return keys;
  }
  /**
  * Selects all items in the collection.
  */
  selectAll() {
    if (!this.isSelectAll && this.selectionMode === "multiple") this.state.setSelectedKeys("all");
  }
  /**
  * Removes all keys from the selection.
  */
  clearSelection() {
    if (!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0)) this.state.setSelectedKeys(new (0, $8b2540e09867b15e$export$52baac22726c72bf)());
  }
  /**
  * Toggles between select all and an empty selection.
  */
  toggleSelectAll() {
    if (this.isSelectAll) this.clearSelection();
    else this.selectAll();
  }
  select(key, e) {
    if (this.selectionMode === "none") return;
    if (this.selectionMode === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection) this.toggleSelection(key);
      else this.replaceSelection(key);
    } else if (this.selectionBehavior === "toggle" || e && (e.pointerType === "touch" || e.pointerType === "virtual"))
      this.toggleSelection(key);
    else this.replaceSelection(key);
  }
  /**
  * Returns whether the current selection is equal to the given selection.
  */
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys) return true;
    let selectedKeys = this.selectedKeys;
    if (selection.size !== selectedKeys.size) return false;
    for (let key of selection) {
      if (!selectedKeys.has(key)) return false;
    }
    for (let key of selectedKeys) {
      if (!selection.has(key)) return false;
    }
    return true;
  }
  canSelectItem(key) {
    return this.canSelectItemIn(key, this.collection);
  }
  canSelectItemIn(key, collection) {
    if (this.state.selectionMode === "none" || this.state.disabledKeys.has(key)) return false;
    let item = collection.getItem(key);
    if (!item || item?.props?.isDisabled || item.type === "cell" && !this.allowsCellSelection) return false;
    return true;
  }
  isDisabled(key) {
    let item = this.collection.getItem(key);
    return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(key) || !!item?.props?.isDisabled) && item?.props?.disabledBehavior !== "selection";
  }
  isLink(key) {
    return !!this.collection.getItem(key)?.props?.href;
  }
  getItemProps(key) {
    return this.collection.getItem(key)?.props;
  }
  withCollection(collection) {
    return new _$4a07ac835f260f78$export$6c8a5aaad13c9852(collection, this.state, {
      allowsCellSelection: this.allowsCellSelection,
      layoutDelegate: this.layoutDelegate || void 0,
      fullCollection: this.fullCollection ?? this.collection
    });
  }
};

// node_modules/react-stately/dist/private/list/useListState.mjs
var import_react14 = __toESM(require_react(), 1);
function $b14b6f590b50af39$export$2f645645f7bca764(props) {
  let { filter, layoutDelegate } = props;
  let selectionState = (0, $60f19cefd567a3e4$export$253fe78d46329472)(props);
  let disabledKeys = (0, import_react14.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let factory = (0, import_react14.useCallback)((nodes) => filter ? new (0, $f664a81d022446b5$export$d085fb9e920b5ca7)(filter(nodes)) : new (0, $f664a81d022446b5$export$d085fb9e920b5ca7)(nodes), [
    filter
  ]);
  let context = (0, import_react14.useMemo)(() => ({
    suppressTextValueWarning: props.suppressTextValueWarning
  }), [
    props.suppressTextValueWarning
  ]);
  let collection = (0, $d03379b88399b8c5$export$6cd28814d92fa9c9)(props, factory, context);
  let selectionManager = (0, import_react14.useMemo)(() => new (0, $4a07ac835f260f78$export$6c8a5aaad13c9852)(collection, selectionState, {
    layoutDelegate
  }), [
    collection,
    selectionState,
    layoutDelegate
  ]);
  $b14b6f590b50af39$var$useFocusedKeyReset(collection, selectionManager);
  return {
    collection,
    disabledKeys,
    selectionManager
  };
}
function $b14b6f590b50af39$export$ba9d38c0f1bf2b36(state, filterFn) {
  let collection = (0, import_react14.useMemo)(() => filterFn ? state.collection.filter(filterFn) : state.collection, [
    state.collection,
    filterFn
  ]);
  let selectionManager = state.selectionManager.withCollection(collection);
  $b14b6f590b50af39$var$useFocusedKeyReset(collection, selectionManager);
  return {
    collection,
    selectionManager,
    disabledKeys: state.disabledKeys
  };
}
function $b14b6f590b50af39$var$useFocusedKeyReset(collection, selectionManager) {
  const cachedCollection = (0, import_react14.useRef)(null);
  (0, import_react14.useEffect)(() => {
    if (selectionManager.focusedKey != null && !collection.getItem(selectionManager.focusedKey) && cachedCollection.current) {
      let key = cachedCollection.current.getKeyAfter(selectionManager.focusedKey);
      let nextFocusedKey = null;
      while (key != null) {
        let node = collection.getItem(key);
        if (node && node.type === "item" && !selectionManager.isDisabled(key)) {
          nextFocusedKey = key;
          break;
        }
        key = cachedCollection.current.getKeyAfter(key);
      }
      if (nextFocusedKey == null) {
        key = cachedCollection.current.getKeyBefore(selectionManager.focusedKey);
        while (key != null) {
          let node = collection.getItem(key);
          if (node && node.type === "item" && !selectionManager.isDisabled(key)) {
            nextFocusedKey = key;
            break;
          }
          key = cachedCollection.current.getKeyBefore(key);
        }
      }
      selectionManager.setFocusedKey(nextFocusedKey);
    }
    cachedCollection.current = collection;
  }, [
    collection,
    selectionManager
  ]);
}

// node_modules/react-stately/dist/private/color/useColorPickerState.mjs
function $f229ad6ed8947519$export$dc6b73b623f8645f(props) {
  let value = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(props.value);
  let defaultValue = (0, $7d5d4eb4667f32af$export$5aadd9c0606af5c2)(props.defaultValue || "#000000");
  let [color, setColor] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value || void 0, defaultValue, props.onChange);
  return {
    color,
    setColor(color2) {
      if (color2 != null) setColor(color2 || (0, $890783418b00a858$export$6e865ea70d7724f)("#000000"));
    }
  };
}

// node_modules/react-stately/dist/private/color/useColorWheelState.mjs
var import_react15 = __toESM(require_react(), 1);
var $40ea08f45638eac2$var$DEFAULT_COLOR = (0, $890783418b00a858$export$6e865ea70d7724f)("hsl(0, 100%, 50%)");
function $40ea08f45638eac2$var$roundToStep(value, step) {
  return Math.round(value / step) * step;
}
function $40ea08f45638eac2$var$mod(n, m) {
  return (n % m + m) % m;
}
function $40ea08f45638eac2$var$roundDown(v) {
  let r = Math.floor(v);
  if (r === v) return v - 1;
  else return r;
}
function $40ea08f45638eac2$var$degToRad(deg) {
  return deg * Math.PI / 180;
}
function $40ea08f45638eac2$var$radToDeg(rad) {
  return rad * 180 / Math.PI;
}
function $40ea08f45638eac2$var$angleToCartesian(angle, radius) {
  let rad = $40ea08f45638eac2$var$degToRad(360 - angle + 90);
  let x = Math.sin(rad) * radius;
  let y = Math.cos(rad) * radius;
  return {
    x,
    y
  };
}
function $40ea08f45638eac2$var$cartesianToAngle(x, y, radius) {
  let deg = $40ea08f45638eac2$var$radToDeg(Math.atan2(y / radius, x / radius));
  return (deg + 360) % 360;
}
function $40ea08f45638eac2$export$f4301076d9336137(props) {
  let { value: propsValue, defaultValue, onChange, onChangeEnd } = props;
  if (!propsValue && !defaultValue) defaultValue = $40ea08f45638eac2$var$DEFAULT_COLOR;
  if (propsValue) propsValue = (0, $890783418b00a858$export$4cde5df63f53f473)(propsValue);
  if (defaultValue) defaultValue = (0, $890783418b00a858$export$4cde5df63f53f473)(defaultValue);
  let [stateValue, setValueState] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(propsValue, defaultValue, onChange);
  let [initialValue] = (0, import_react15.useState)(stateValue);
  let value = (0, import_react15.useMemo)(() => {
    let colorSpace = stateValue.getColorSpace();
    return colorSpace === "hsl" || colorSpace === "hsb" ? stateValue : stateValue.toFormat("hsl");
  }, [
    stateValue
  ]);
  let valueRef = (0, import_react15.useRef)(value);
  let setValue = (value2) => {
    valueRef.current = value2;
    setValueState(value2);
  };
  let channelRange = value.getChannelRange("hue");
  let { minValue: minValueX, maxValue: maxValueX, step, pageSize: pageStep } = channelRange;
  let [isDragging, setDragging] = (0, import_react15.useState)(false);
  let isDraggingRef = (0, import_react15.useRef)(false);
  let hue = value.getChannelValue("hue");
  function setHue(v) {
    if (v > 360)
      v = 0;
    v = $40ea08f45638eac2$var$roundToStep($40ea08f45638eac2$var$mod(v, 360), step);
    if (hue !== v) {
      let color = value.withChannelValue("hue", v);
      setValue(color);
    }
  }
  return {
    value,
    defaultValue: propsValue !== void 0 ? initialValue : defaultValue,
    step,
    pageStep,
    setValue(v) {
      let color = (0, $890783418b00a858$export$4cde5df63f53f473)(v);
      setValue(color);
    },
    hue,
    setHue,
    setHueFromPoint(x, y, radius) {
      setHue($40ea08f45638eac2$var$cartesianToAngle(x, y, radius));
    },
    getThumbPosition(radius) {
      return $40ea08f45638eac2$var$angleToCartesian(value.getChannelValue("hue"), radius);
    },
    increment(stepSize = 1) {
      let s = Math.max(stepSize, step);
      let newValue = hue + s;
      if (newValue >= maxValueX)
        newValue = minValueX;
      setHue($40ea08f45638eac2$var$roundToStep($40ea08f45638eac2$var$mod(newValue, 360), s));
    },
    decrement(stepSize = 1) {
      let s = Math.max(stepSize, step);
      if (hue === 0)
        setHue($40ea08f45638eac2$var$roundDown(360 / s) * s);
      else setHue($40ea08f45638eac2$var$roundToStep($40ea08f45638eac2$var$mod(hue - s, 360), s));
    },
    setDragging(isDragging2) {
      let wasDragging = isDraggingRef.current;
      isDraggingRef.current = isDragging2;
      if (onChangeEnd && !isDragging2 && wasDragging) onChangeEnd(valueRef.current);
      setDragging(isDragging2);
    },
    isDragging,
    getDisplayColor() {
      return value.toFormat("hsl").withChannelValue("saturation", 100).withChannelValue("lightness", 50).withChannelValue("alpha", 1);
    },
    isDisabled: props.isDisabled || false
  };
}

// node_modules/react-stately/dist/private/overlays/useOverlayTriggerState.mjs
var import_react16 = __toESM(require_react(), 1);
function $f11fb0bcf1b2687a$export$61c6a8c84e605fb6(props) {
  let [isOpen, setOpen] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.isOpen, props.defaultOpen || false, props.onOpenChange);
  let [point, setPoint] = (0, import_react16.useState)(null);
  const open = (0, import_react16.useCallback)(() => {
    setOpen(true);
  }, [
    setOpen
  ]);
  const close = (0, import_react16.useCallback)(() => {
    setOpen(false);
  }, [
    setOpen
  ]);
  const toggle = (0, import_react16.useCallback)(() => {
    setOpen(!isOpen);
  }, [
    setOpen,
    isOpen
  ]);
  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
    point,
    setPoint
  };
}

// node_modules/react-stately/dist/private/menu/useMenuTriggerState.mjs
var import_react17 = __toESM(require_react(), 1);
function $e3403870bfb691da$export$79fefeb1c2091ac3(props) {
  let overlayTriggerState = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)(props);
  let [focusStrategy, setFocusStrategy] = (0, import_react17.useState)(null);
  let [expandedKeysStack, setExpandedKeysStack] = (0, import_react17.useState)([]);
  let closeAll = () => {
    setExpandedKeysStack([]);
    overlayTriggerState.close();
  };
  let openSubmenu = (triggerKey, level) => {
    setExpandedKeysStack((oldStack) => {
      if (level > oldStack.length) return oldStack;
      return [
        ...oldStack.slice(0, level),
        triggerKey
      ];
    });
  };
  let closeSubmenu = (triggerKey, level) => {
    setExpandedKeysStack((oldStack) => {
      let key = oldStack[level];
      if (key === triggerKey) return oldStack.slice(0, level);
      else return oldStack;
    });
  };
  return {
    focusStrategy,
    ...overlayTriggerState,
    open(focusStrategy2 = null) {
      setFocusStrategy(focusStrategy2);
      overlayTriggerState.open();
    },
    toggle(focusStrategy2 = null) {
      setFocusStrategy(focusStrategy2);
      overlayTriggerState.toggle();
    },
    close() {
      closeAll();
    },
    expandedKeysStack,
    openSubmenu,
    closeSubmenu
  };
}

// node_modules/react-stately/dist/private/menu/useSubmenuTriggerState.mjs
var import_react18 = __toESM(require_react(), 1);
function $5b3242e27644e8f1$export$cfc51cf86138bf98(props, state) {
  let { triggerKey } = props;
  let { expandedKeysStack, openSubmenu, closeSubmenu, close: closeAll } = state;
  let [submenuLevel] = (0, import_react18.useState)(expandedKeysStack?.length);
  let isOpen = (0, import_react18.useMemo)(() => expandedKeysStack[submenuLevel] === triggerKey, [
    expandedKeysStack,
    triggerKey,
    submenuLevel
  ]);
  let [focusStrategy, setFocusStrategy] = (0, import_react18.useState)(null);
  let open = (0, import_react18.useCallback)((focusStrategy2) => {
    setFocusStrategy(focusStrategy2 ?? null);
    openSubmenu(triggerKey, submenuLevel);
  }, [
    openSubmenu,
    submenuLevel,
    triggerKey
  ]);
  let close = (0, import_react18.useCallback)(() => {
    setFocusStrategy(null);
    closeSubmenu(triggerKey, submenuLevel);
  }, [
    closeSubmenu,
    submenuLevel,
    triggerKey
  ]);
  let toggle = (0, import_react18.useCallback)((focusStrategy2) => {
    setFocusStrategy(focusStrategy2 ?? null);
    if (isOpen) close();
    else open(focusStrategy2);
  }, [
    close,
    open,
    isOpen
  ]);
  return (0, import_react18.useMemo)(() => ({
    focusStrategy,
    isOpen,
    open,
    close,
    closeAll,
    submenuLevel,
    // TODO: Placeholders that aren't used but give us parity with OverlayTriggerState so we can use this in Popover. Refactor if we update Popover via
    // https://github.com/adobe/react-spectrum/pull/4976#discussion_r1336472863
    setOpen: () => {
    },
    toggle,
    point: null,
    setPoint: () => {
    }
  }), [
    isOpen,
    open,
    close,
    closeAll,
    focusStrategy,
    toggle,
    submenuLevel
  ]);
}

// node_modules/react-stately/dist/private/tree/TreeCollection.mjs
var $df1fcc684d3b021a$export$863faf230ee2118a = class {
  constructor(nodes, { expandedKeys } = {}) {
    this.keyMap = /* @__PURE__ */ new Map();
    this.firstKey = null;
    this.lastKey = null;
    this.iterable = nodes;
    expandedKeys = expandedKeys || /* @__PURE__ */ new Set();
    let visit = (node) => {
      this.keyMap.set(node.key, node);
      if (node.childNodes && (node.type === "section" || expandedKeys.has(node.key))) for (let child of node.childNodes) visit(child);
    };
    for (let node of nodes) visit(node);
    let last = null;
    let index = 0;
    for (let [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = void 0;
      }
      if (node.type === "item") node.index = index++;
      last = node;
      last.nextKey = void 0;
    }
    this.lastKey = last?.key ?? null;
  }
  *[Symbol.iterator]() {
    yield* this.iterable;
  }
  get size() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey ?? null : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey ?? null : null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key) ?? null;
  }
  at(idx) {
    const keys = [
      ...this.getKeys()
    ];
    return this.getItem(keys[idx]);
  }
};

// node_modules/react-stately/dist/private/tree/useTreeState.mjs
var import_react19 = __toESM(require_react(), 1);
function $6b915bde6cd300dd$export$728d6ba534403756(props) {
  let { onExpandedChange } = props;
  let [expandedKeys, setExpandedKeys] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.expandedKeys ? new Set(props.expandedKeys) : void 0, props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : /* @__PURE__ */ new Set(), onExpandedChange);
  let selectionState = (0, $60f19cefd567a3e4$export$253fe78d46329472)(props);
  let disabledKeys = (0, import_react19.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let tree = (0, $d03379b88399b8c5$export$6cd28814d92fa9c9)(props, (0, import_react19.useCallback)((nodes) => new (0, $df1fcc684d3b021a$export$863faf230ee2118a)(nodes, {
    expandedKeys
  }), [
    expandedKeys
  ]), null);
  (0, import_react19.useEffect)(() => {
    if (selectionState.focusedKey != null && !tree.getItem(selectionState.focusedKey)) selectionState.setFocusedKey(null);
  }, [
    tree,
    selectionState.focusedKey
  ]);
  let onToggle = (key) => {
    setExpandedKeys($6b915bde6cd300dd$var$toggleKey(expandedKeys, key));
  };
  return {
    collection: tree,
    expandedKeys,
    disabledKeys,
    toggleKey: onToggle,
    setExpandedKeys,
    selectionManager: new (0, $4a07ac835f260f78$export$6c8a5aaad13c9852)(tree, selectionState)
  };
}
function $6b915bde6cd300dd$var$toggleKey(set, key) {
  let res = new Set(set);
  if (res.has(key)) res.delete(key);
  else res.add(key);
  return res;
}

// node_modules/react-stately/dist/private/combobox/useComboBoxState.mjs
var import_react20 = __toESM(require_react(), 1);
function $120eca7b9c40f820$export$b453a3bfd4a5fa9e(props) {
  let { defaultFilter, menuTrigger = "input", allowsEmptyCollection = false, allowsCustomValue, shouldCloseOnBlur = true, selectionMode = "single" } = props;
  let [showAllItems, setShowAllItems] = (0, import_react20.useState)(false);
  let [isFocused, setFocusedState] = (0, import_react20.useState)(false);
  let [focusStrategy, setFocusStrategy] = (0, import_react20.useState)(null);
  let defaultValue = (0, import_react20.useMemo)(() => {
    return props.defaultValue !== void 0 ? props.defaultValue : selectionMode === "single" ? props.defaultSelectedKey ?? null : [];
  }, [
    props.defaultValue,
    props.defaultSelectedKey,
    selectionMode
  ]);
  let value = (0, import_react20.useMemo)(() => {
    return props.value !== void 0 ? props.value : selectionMode === "single" ? props.selectedKey : void 0;
  }, [
    props.value,
    props.selectedKey,
    selectionMode
  ]);
  let [controlledValue, setControlledValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, defaultValue, props.onChange);
  let displayValue = selectionMode === "single" && Array.isArray(controlledValue) ? controlledValue[0] : controlledValue;
  let setValue = (value2) => {
    if (selectionMode === "single") {
      let key = Array.isArray(value2) ? value2[0] ?? null : value2;
      setControlledValue(key);
      if (key !== displayValue) props.onSelectionChange?.(key);
    } else {
      let keys = [];
      if (Array.isArray(value2)) keys = value2;
      else if (value2 != null) keys = [
        value2
      ];
      setControlledValue(keys);
    }
  };
  let { collection, selectionManager, disabledKeys } = (0, $b14b6f590b50af39$export$2f645645f7bca764)({
    ...props,
    items: props.items ?? props.defaultItems,
    selectionMode,
    disallowEmptySelection: selectionMode === "single",
    allowDuplicateSelectionEvents: true,
    selectedKeys: (0, import_react20.useMemo)(() => $120eca7b9c40f820$var$convertValue(displayValue), [
      displayValue
    ]),
    onSelectionChange: (keys) => {
      if (keys === "all") return;
      if (selectionMode === "single") {
        let key = keys.values().next().value ?? null;
        if (key === displayValue) {
          props.onSelectionChange?.(key);
          resetInputValue();
          closeMenu();
        } else setValue(key);
      } else setValue([
        ...keys
      ]);
    }
  });
  let selectedKey = selectionMode === "single" ? selectionManager.firstSelectedKey : null;
  let selectedItems = (0, import_react20.useMemo)(() => {
    return [
      ...selectionManager.selectedKeys
    ].map((key) => collection.getItem(key)).filter((item) => item != null);
  }, [
    selectionManager.selectedKeys,
    collection
  ]);
  let [inputValue, setInputValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.inputValue, $120eca7b9c40f820$var$getDefaultInputValue(props.defaultInputValue, selectedKey, collection) || "", props.onInputChange);
  let [initialValue] = (0, import_react20.useState)(displayValue);
  let [initialInputValue] = (0, import_react20.useState)(inputValue);
  let originalCollection = collection;
  let filteredCollection = (0, import_react20.useMemo)(() => (
    // No default filter if items are controlled.
    props.items != null || !defaultFilter ? collection : $120eca7b9c40f820$var$filterCollection(collection, inputValue, defaultFilter)
  ), [
    collection,
    inputValue,
    defaultFilter,
    props.items
  ]);
  let [lastCollection, setLastCollection] = (0, import_react20.useState)(filteredCollection);
  let menuOpenTrigger = (0, import_react20.useRef)("focus");
  let onOpenChange = (open2) => {
    if (props.onOpenChange) props.onOpenChange(open2, open2 ? menuOpenTrigger.current : void 0);
    selectionManager.setFocused(open2);
    if (!open2) selectionManager.setFocusedKey(null);
  };
  let triggerState = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)({
    ...props,
    onOpenChange,
    isOpen: void 0,
    defaultOpen: void 0
  });
  let open = (focusStrategy2 = null, trigger) => {
    let displayAllItems = trigger === "manual" || trigger === "focus" && menuTrigger === "focus";
    if (allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems && originalCollection.size > 0 || props.items) {
      if (displayAllItems && !triggerState.isOpen && props.items === void 0)
        setShowAllItems(true);
      menuOpenTrigger.current = trigger;
      setFocusStrategy(focusStrategy2);
      triggerState.open();
    }
  };
  let toggle = (focusStrategy2 = null, trigger) => {
    let displayAllItems = trigger === "manual" || trigger === "focus" && menuTrigger === "focus";
    if (!(allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems && originalCollection.size > 0 || props.items) && !triggerState.isOpen) return;
    if (displayAllItems && !triggerState.isOpen && props.items === void 0)
      setShowAllItems(true);
    if (!triggerState.isOpen) menuOpenTrigger.current = trigger;
    toggleMenu(focusStrategy2);
  };
  let updateLastCollection = (0, import_react20.useCallback)(() => {
    setLastCollection(showAllItems ? originalCollection : filteredCollection);
  }, [
    showAllItems,
    originalCollection,
    filteredCollection
  ]);
  let toggleMenu = (0, import_react20.useCallback)((focusStrategy2 = null) => {
    if (triggerState.isOpen) updateLastCollection();
    setFocusStrategy(focusStrategy2);
    triggerState.toggle();
  }, [
    triggerState,
    updateLastCollection
  ]);
  let closeMenu = (0, import_react20.useCallback)(() => {
    if (triggerState.isOpen) {
      updateLastCollection();
      triggerState.close();
    }
  }, [
    triggerState,
    updateLastCollection
  ]);
  let [lastValue, setLastValue] = (0, import_react20.useState)(inputValue);
  let resetInputValue = () => {
    let itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
    setLastValue(itemText);
    setInputValue(itemText);
  };
  let lastValueRef = (0, import_react20.useRef)(displayValue);
  let lastSelectedKeyText = (0, import_react20.useRef)(selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "");
  (0, import_react20.useEffect)(() => {
    if (isFocused && (filteredCollection.size > 0 || allowsEmptyCollection) && !triggerState.isOpen && inputValue !== lastValue && menuTrigger !== "manual")
      open(null, "input");
    if (!showAllItems && !allowsEmptyCollection && triggerState.isOpen && filteredCollection.size === 0) closeMenu();
    if (displayValue != null && displayValue !== lastValueRef.current && selectionMode === "single") closeMenu();
    if (inputValue !== lastValue) {
      selectionManager.setFocusedKey(null);
      setShowAllItems(false);
      if (selectionMode === "single" && inputValue === "" && (props.inputValue === void 0 || value === void 0)) setValue(null);
    }
    if (displayValue !== lastValueRef.current && (props.inputValue === void 0 || value === void 0)) resetInputValue();
    else if (lastValue !== inputValue) setLastValue(inputValue);
    let selectedItemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
    if (!isFocused && selectedKey != null && props.inputValue === void 0 && selectedKey === lastValueRef.current) {
      if (lastSelectedKeyText.current !== selectedItemText) {
        setLastValue(selectedItemText);
        setInputValue(selectedItemText);
      }
    }
    lastValueRef.current = displayValue;
    lastSelectedKeyText.current = selectedItemText;
  });
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: (0, import_react20.useMemo)(() => Array.isArray(displayValue) && displayValue.length === 0 ? null : {
      inputValue,
      value: displayValue,
      selectedKey
    }, [
      inputValue,
      selectedKey,
      displayValue
    ])
  });
  let revert = () => {
    if (allowsCustomValue && selectedKey == null) commitCustomValue();
    else commitSelection();
  };
  let commitCustomValue = () => {
    if (selectionMode === "multiple") {
      setLastValue(inputValue);
      closeMenu();
      return;
    }
    let value2 = null;
    lastValueRef.current = value2;
    setValue(value2);
    closeMenu();
  };
  let commitSelection = (shouldForceSelectionChange = false) => {
    if (value !== void 0 && props.inputValue !== void 0) {
      let itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
      if (shouldForceSelectionChange || selectionMode === "multiple" || inputValue !== itemText) {
        props.onSelectionChange?.(selectedKey);
        props.onChange?.(displayValue);
      }
      setLastValue(itemText);
      closeMenu();
    } else {
      resetInputValue();
      closeMenu();
    }
  };
  const commitValue = () => {
    if (allowsCustomValue) {
      const itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
      inputValue === itemText ? commitSelection() : commitCustomValue();
    } else
      commitSelection();
  };
  let commit = () => {
    if (triggerState.isOpen && selectionManager.focusedKey != null) {
      if (selectionManager.isSelected(selectionManager.focusedKey) && selectionMode === "single") commitSelection(true);
      else selectionManager.select(selectionManager.focusedKey);
    } else commitValue();
  };
  let valueOnFocus = (0, import_react20.useRef)([
    inputValue,
    displayValue
  ]);
  let setFocused = (isFocused2) => {
    if (isFocused2) {
      valueOnFocus.current = [
        inputValue,
        displayValue
      ];
      if (menuTrigger === "focus" && !props.isReadOnly) open(null, "focus");
    } else {
      if (shouldCloseOnBlur) commitValue();
      if (inputValue !== valueOnFocus.current[0] || displayValue !== valueOnFocus.current[1]) validation.commitValidation();
    }
    setFocusedState(isFocused2);
  };
  let displayedCollection = (0, import_react20.useMemo)(() => {
    if (triggerState.isOpen) {
      if (showAllItems) return originalCollection;
      else return filteredCollection;
    } else return lastCollection;
  }, [
    triggerState.isOpen,
    originalCollection,
    filteredCollection,
    showAllItems,
    lastCollection
  ]);
  let defaultSelectedKey = props.defaultSelectedKey ?? (selectionMode === "single" ? initialValue : null);
  return {
    ...validation,
    ...triggerState,
    focusStrategy,
    toggle,
    open,
    close: commitValue,
    selectionManager,
    value: displayValue,
    defaultValue: defaultValue ?? initialValue,
    setValue,
    selectedKey,
    selectedItems,
    defaultSelectedKey,
    setSelectedKey: setValue,
    disabledKeys,
    isFocused,
    setFocused,
    selectedItem: selectedItems[0] ?? null,
    collection: displayedCollection,
    inputValue,
    defaultInputValue: $120eca7b9c40f820$var$getDefaultInputValue(props.defaultInputValue, defaultSelectedKey, collection) ?? initialInputValue,
    setInputValue,
    commit,
    revert
  };
}
function $120eca7b9c40f820$var$filterCollection(collection, inputValue, filter) {
  return new (0, $f664a81d022446b5$export$d085fb9e920b5ca7)($120eca7b9c40f820$var$filterNodes(collection, collection, inputValue, filter));
}
function $120eca7b9c40f820$var$filterNodes(collection, nodes, inputValue, filter) {
  let filteredNode = [];
  for (let node of nodes) {
    if (node.type === "section" && node.hasChildNodes) {
      let filtered = $120eca7b9c40f820$var$filterNodes(collection, (0, $cd5ea4b915021f1d$export$1005530eda016c13)(node, collection), inputValue, filter);
      if ([
        ...filtered
      ].some((node2) => node2.type === "item")) filteredNode.push({
        ...node,
        childNodes: filtered
      });
    } else if (node.type === "item" && filter(node.textValue, inputValue)) filteredNode.push({
      ...node
    });
    else if (node.type !== "item") filteredNode.push({
      ...node
    });
  }
  return filteredNode;
}
function $120eca7b9c40f820$var$getDefaultInputValue(defaultInputValue, selectedKey, collection) {
  if (defaultInputValue == null) {
    if (selectedKey != null) return collection.getItem(selectedKey)?.textValue ?? "";
  }
  return defaultInputValue;
}
function $120eca7b9c40f820$var$convertValue(value) {
  if (value === void 0) return void 0;
  if (value === null) return [];
  return Array.isArray(value) ? value : [
    value
  ];
}

// node_modules/react-stately/dist/private/intl/datepicker/ar-AE.mjs
var $6f00cf506278c4dd$exports = {};
$6f00cf506278c4dd$exports = {
  "rangeOverflow": (args) => `يجب أن تكون القيمة ${args.maxValue} أو قبل ذلك.`,
  "rangeReversed": `تاريخ البدء يجب أن يكون قبل تاريخ الانتهاء.`,
  "rangeUnderflow": (args) => `يجب أن تكون القيمة ${args.minValue} أو بعد ذلك.`,
  "unavailableDate": `البيانات المحددة غير متاحة.`
};

// node_modules/react-stately/dist/private/intl/datepicker/bg-BG.mjs
var $d4d6a016fd5ce4f2$exports = {};
$d4d6a016fd5ce4f2$exports = {
  "rangeOverflow": (args) => `Стойността трябва да е ${args.maxValue} или по-ранна.`,
  "rangeReversed": `Началната дата трябва да е преди крайната.`,
  "rangeUnderflow": (args) => `Стойността трябва да е ${args.minValue} или по-късно.`,
  "unavailableDate": `Избраната дата не е налична.`
};

// node_modules/react-stately/dist/private/intl/datepicker/cs-CZ.mjs
var $7ecf9e4979666ea0$exports = {};
$7ecf9e4979666ea0$exports = {
  "rangeOverflow": (args) => `Hodnota musí být ${args.maxValue} nebo dřívější.`,
  "rangeReversed": `Datum zahájení musí předcházet datu ukončení.`,
  "rangeUnderflow": (args) => `Hodnota musí být ${args.minValue} nebo pozdější.`,
  "unavailableDate": `Vybrané datum není k dispozici.`
};

// node_modules/react-stately/dist/private/intl/datepicker/da-DK.mjs
var $ab075d4725312525$exports = {};
$ab075d4725312525$exports = {
  "rangeOverflow": (args) => `Værdien skal være ${args.maxValue} eller tidligere.`,
  "rangeReversed": `Startdatoen skal være før slutdatoen.`,
  "rangeUnderflow": (args) => `Værdien skal være ${args.minValue} eller nyere.`,
  "unavailableDate": `Den valgte dato er ikke tilgængelig.`
};

// node_modules/react-stately/dist/private/intl/datepicker/de-DE.mjs
var $3922685c0eb9ba8a$exports = {};
$3922685c0eb9ba8a$exports = {
  "rangeOverflow": (args) => `Der Wert muss ${args.maxValue} oder früher sein.`,
  "rangeReversed": `Das Startdatum muss vor dem Enddatum liegen.`,
  "rangeUnderflow": (args) => `Der Wert muss ${args.minValue} oder später sein.`,
  "unavailableDate": `Das ausgewählte Datum ist nicht verfügbar.`
};

// node_modules/react-stately/dist/private/intl/datepicker/el-GR.mjs
var $01c17dde3c3a9016$exports = {};
$01c17dde3c3a9016$exports = {
  "rangeOverflow": (args) => `Η τιμή πρέπει να είναι ${args.maxValue} ή παλαιότερη.`,
  "rangeReversed": `Η ημερομηνία έναρξης πρέπει να είναι πριν από την ημερομηνία λήξης.`,
  "rangeUnderflow": (args) => `Η τιμή πρέπει να είναι ${args.minValue} ή μεταγενέστερη.`,
  "unavailableDate": `Η επιλεγμένη ημερομηνία δεν είναι διαθέσιμη.`
};

// node_modules/react-stately/dist/private/intl/datepicker/en-US.mjs
var $6b7f94ed17767636$exports = {};
$6b7f94ed17767636$exports = {
  "rangeUnderflow": (args) => `Value must be ${args.minValue} or later.`,
  "rangeOverflow": (args) => `Value must be ${args.maxValue} or earlier.`,
  "rangeReversed": `Start date must be before end date.`,
  "unavailableDate": `Selected date unavailable.`
};

// node_modules/react-stately/dist/private/intl/datepicker/es-ES.mjs
var $3303b51f37a02711$exports = {};
$3303b51f37a02711$exports = {
  "rangeOverflow": (args) => `El valor debe ser ${args.maxValue} o anterior.`,
  "rangeReversed": `La fecha de inicio debe ser anterior a la fecha de finalización.`,
  "rangeUnderflow": (args) => `El valor debe ser ${args.minValue} o posterior.`,
  "unavailableDate": `Fecha seleccionada no disponible.`
};

// node_modules/react-stately/dist/private/intl/datepicker/et-EE.mjs
var $e3aea59accf42c8d$exports = {};
$e3aea59accf42c8d$exports = {
  "rangeOverflow": (args) => `Väärtus peab olema ${args.maxValue} või varasem.`,
  "rangeReversed": `Alguskuupäev peab olema enne lõppkuupäeva.`,
  "rangeUnderflow": (args) => `Väärtus peab olema ${args.minValue} või hilisem.`,
  "unavailableDate": `Valitud kuupäev pole saadaval.`
};

// node_modules/react-stately/dist/private/intl/datepicker/fi-FI.mjs
var $06dd1b694121be4e$exports = {};
$06dd1b694121be4e$exports = {
  "rangeOverflow": (args) => `Arvon on oltava ${args.maxValue} tai sitä aikaisempi.`,
  "rangeReversed": `Aloituspäivän on oltava ennen lopetuspäivää.`,
  "rangeUnderflow": (args) => `Arvon on oltava ${args.minValue} tai sitä myöhäisempi.`,
  "unavailableDate": `Valittu päivämäärä ei ole käytettävissä.`
};

// node_modules/react-stately/dist/private/intl/datepicker/fr-FR.mjs
var $cdcce4a69a404d27$exports = {};
$cdcce4a69a404d27$exports = {
  "rangeOverflow": (args) => `La valeur doit être ${args.maxValue} ou antérieure.`,
  "rangeReversed": `La date de début doit être antérieure à la date de fin.`,
  "rangeUnderflow": (args) => `La valeur doit être ${args.minValue} ou ultérieure.`,
  "unavailableDate": `La date sélectionnée n’est pas disponible.`
};

// node_modules/react-stately/dist/private/intl/datepicker/he-IL.mjs
var $40524ca22fb30eb2$exports = {};
$40524ca22fb30eb2$exports = {
  "rangeOverflow": (args) => `הערך חייב להיות ${args.maxValue} או מוקדם יותר.`,
  "rangeReversed": `תאריך ההתחלה חייב להיות לפני תאריך הסיום.`,
  "rangeUnderflow": (args) => `הערך חייב להיות ${args.minValue} או מאוחר יותר.`,
  "unavailableDate": `התאריך הנבחר אינו זמין.`
};

// node_modules/react-stately/dist/private/intl/datepicker/hr-HR.mjs
var $61a527d4db6297ee$exports = {};
$61a527d4db6297ee$exports = {
  "rangeOverflow": (args) => `Vrijednost mora biti ${args.maxValue} ili ranije.`,
  "rangeReversed": `Datum početka mora biti prije datuma završetka.`,
  "rangeUnderflow": (args) => `Vrijednost mora biti ${args.minValue} ili kasnije.`,
  "unavailableDate": `Odabrani datum nije dostupan.`
};

// node_modules/react-stately/dist/private/intl/datepicker/hu-HU.mjs
var $f8f2d8d8cb44cfed$exports = {};
$f8f2d8d8cb44cfed$exports = {
  "rangeOverflow": (args) => `Az értéknek ${args.maxValue} vagy korábbinak kell lennie.`,
  "rangeReversed": `A kezdő dátumnak a befejező dátumnál korábbinak kell lennie.`,
  "rangeUnderflow": (args) => `Az értéknek ${args.minValue} vagy későbbinek kell lennie.`,
  "unavailableDate": `A kiválasztott dátum nem érhető el.`
};

// node_modules/react-stately/dist/private/intl/datepicker/it-IT.mjs
var $75347037b84c1b18$exports = {};
$75347037b84c1b18$exports = {
  "rangeOverflow": (args) => `Il valore deve essere ${args.maxValue} o precedente.`,
  "rangeReversed": `La data di inizio deve essere antecedente alla data di fine.`,
  "rangeUnderflow": (args) => `Il valore deve essere ${args.minValue} o successivo.`,
  "unavailableDate": `Data selezionata non disponibile.`
};

// node_modules/react-stately/dist/private/intl/datepicker/ja-JP.mjs
var $4f97679990ff9091$exports = {};
$4f97679990ff9091$exports = {
  "rangeOverflow": (args) => `値は ${args.maxValue} 以下にする必要があります。`,
  "rangeReversed": `開始日は終了日より前にする必要があります。`,
  "rangeUnderflow": (args) => `値は ${args.minValue} 以上にする必要があります。`,
  "unavailableDate": `選択した日付は使用できません。`
};

// node_modules/react-stately/dist/private/intl/datepicker/ko-KR.mjs
var $c189e0bf94264522$exports = {};
$c189e0bf94264522$exports = {
  "rangeOverflow": (args) => `값은 ${args.maxValue} 이전이어야 합니다.`,
  "rangeReversed": `시작일은 종료일 이전이어야 합니다.`,
  "rangeUnderflow": (args) => `값은 ${args.minValue} 이후여야 합니다.`,
  "unavailableDate": `선택한 날짜를 사용할 수 없습니다.`
};

// node_modules/react-stately/dist/private/intl/datepicker/lt-LT.mjs
var $19cd5f3aa5a4b596$exports = {};
$19cd5f3aa5a4b596$exports = {
  "rangeOverflow": (args) => `Reikšmė turi būti ${args.maxValue} arba ankstesnė.`,
  "rangeReversed": `Pradžios data turi būti ankstesnė nei pabaigos data.`,
  "rangeUnderflow": (args) => `Reikšmė turi būti ${args.minValue} arba naujesnė.`,
  "unavailableDate": `Pasirinkta data nepasiekiama.`
};

// node_modules/react-stately/dist/private/intl/datepicker/lv-LV.mjs
var $91f5db7f94b7596e$exports = {};
$91f5db7f94b7596e$exports = {
  "rangeOverflow": (args) => `Vērtībai ir jābūt ${args.maxValue} vai agrākai.`,
  "rangeReversed": `Sākuma datumam ir jābūt pirms beigu datuma.`,
  "rangeUnderflow": (args) => `Vērtībai ir jābūt ${args.minValue} vai vēlākai.`,
  "unavailableDate": `Atlasītais datums nav pieejams.`
};

// node_modules/react-stately/dist/private/intl/datepicker/nb-NO.mjs
var $780ef1d46063f826$exports = {};
$780ef1d46063f826$exports = {
  "rangeOverflow": (args) => `Verdien må være ${args.maxValue} eller tidligere.`,
  "rangeReversed": `Startdatoen må være før sluttdatoen.`,
  "rangeUnderflow": (args) => `Verdien må være ${args.minValue} eller senere.`,
  "unavailableDate": `Valgt dato utilgjengelig.`
};

// node_modules/react-stately/dist/private/intl/datepicker/nl-NL.mjs
var $16cbb8b4d0babfdc$exports = {};
$16cbb8b4d0babfdc$exports = {
  "rangeOverflow": (args) => `Waarde moet ${args.maxValue} of eerder zijn.`,
  "rangeReversed": `De startdatum moet voor de einddatum liggen.`,
  "rangeUnderflow": (args) => `Waarde moet ${args.minValue} of later zijn.`,
  "unavailableDate": `Geselecteerde datum niet beschikbaar.`
};

// node_modules/react-stately/dist/private/intl/datepicker/pl-PL.mjs
var $0bc688cceae5eb60$exports = {};
$0bc688cceae5eb60$exports = {
  "rangeOverflow": (args) => `Wartość musi mieć wartość ${args.maxValue} lub wcześniejszą.`,
  "rangeReversed": `Data rozpoczęcia musi być wcześniejsza niż data zakończenia.`,
  "rangeUnderflow": (args) => `Wartość musi mieć wartość ${args.minValue} lub późniejszą.`,
  "unavailableDate": `Wybrana data jest niedostępna.`
};

// node_modules/react-stately/dist/private/intl/datepicker/pt-BR.mjs
var $e32534e3083f4a62$exports = {};
$e32534e3083f4a62$exports = {
  "rangeOverflow": (args) => `O valor deve ser ${args.maxValue} ou anterior.`,
  "rangeReversed": `A data inicial deve ser anterior à data final.`,
  "rangeUnderflow": (args) => `O valor deve ser ${args.minValue} ou posterior.`,
  "unavailableDate": `Data selecionada indisponível.`
};

// node_modules/react-stately/dist/private/intl/datepicker/pt-PT.mjs
var $3534c94e827784b7$exports = {};
$3534c94e827784b7$exports = {
  "rangeOverflow": (args) => `O valor tem de ser ${args.maxValue} ou anterior.`,
  "rangeReversed": `A data de início deve ser anterior à data de fim.`,
  "rangeUnderflow": (args) => `O valor tem de ser ${args.minValue} ou posterior.`,
  "unavailableDate": `Data selecionada indisponível.`
};

// node_modules/react-stately/dist/private/intl/datepicker/ro-RO.mjs
var $a2617a746c9862f6$exports = {};
$a2617a746c9862f6$exports = {
  "rangeOverflow": (args) => `Valoarea trebuie să fie ${args.maxValue} sau anterioară.`,
  "rangeReversed": `Data de început trebuie să fie anterioară datei de sfârșit.`,
  "rangeUnderflow": (args) => `Valoarea trebuie să fie ${args.minValue} sau ulterioară.`,
  "unavailableDate": `Data selectată nu este disponibilă.`
};

// node_modules/react-stately/dist/private/intl/datepicker/ru-RU.mjs
var $f1251e27305fd7a8$exports = {};
$f1251e27305fd7a8$exports = {
  "rangeOverflow": (args) => `Значение должно быть не позже ${args.maxValue}.`,
  "rangeReversed": `Дата начала должна предшествовать дате окончания.`,
  "rangeUnderflow": (args) => `Значение должно быть не раньше ${args.minValue}.`,
  "unavailableDate": `Выбранная дата недоступна.`
};

// node_modules/react-stately/dist/private/intl/datepicker/sk-SK.mjs
var $e78b7cdd5f7a9721$exports = {};
$e78b7cdd5f7a9721$exports = {
  "rangeOverflow": (args) => `Hodnota musí byť ${args.maxValue} alebo skoršia.`,
  "rangeReversed": `Dátum začiatku musí byť skorší ako dátum konca.`,
  "rangeUnderflow": (args) => `Hodnota musí byť ${args.minValue} alebo neskoršia.`,
  "unavailableDate": `Vybratý dátum je nedostupný.`
};

// node_modules/react-stately/dist/private/intl/datepicker/sl-SI.mjs
var $41a3d435540f025d$exports = {};
$41a3d435540f025d$exports = {
  "rangeOverflow": (args) => `Vrednost mora biti ${args.maxValue} ali starejša.`,
  "rangeReversed": `Začetni datum mora biti pred končnim datumom.`,
  "rangeUnderflow": (args) => `Vrednost mora biti ${args.minValue} ali novejša.`,
  "unavailableDate": `Izbrani datum ni na voljo.`
};

// node_modules/react-stately/dist/private/intl/datepicker/sr-SP.mjs
var $7e098331d6669444$exports = {};
$7e098331d6669444$exports = {
  "rangeOverflow": (args) => `Vrednost mora da bude ${args.maxValue} ili starija.`,
  "rangeReversed": `Datum početka mora biti pre datuma završetka.`,
  "rangeUnderflow": (args) => `Vrednost mora da bude ${args.minValue} ili novija.`,
  "unavailableDate": `Izabrani datum nije dostupan.`
};

// node_modules/react-stately/dist/private/intl/datepicker/sv-SE.mjs
var $51e7b068c559df60$exports = {};
$51e7b068c559df60$exports = {
  "rangeOverflow": (args) => `Värdet måste vara ${args.maxValue} eller tidigare.`,
  "rangeReversed": `Startdatumet måste vara före slutdatumet.`,
  "rangeUnderflow": (args) => `Värdet måste vara ${args.minValue} eller senare.`,
  "unavailableDate": `Det valda datumet är inte tillgängligt.`
};

// node_modules/react-stately/dist/private/intl/datepicker/tr-TR.mjs
var $10f6effd038fdb37$exports = {};
$10f6effd038fdb37$exports = {
  "rangeOverflow": (args) => `Değer, ${args.maxValue} veya öncesi olmalıdır.`,
  "rangeReversed": `Başlangıç tarihi bitiş tarihinden önce olmalıdır.`,
  "rangeUnderflow": (args) => `Değer, ${args.minValue} veya sonrası olmalıdır.`,
  "unavailableDate": `Seçilen tarih kullanılamıyor.`
};

// node_modules/react-stately/dist/private/intl/datepicker/uk-UA.mjs
var $a6f03b1a6068b7d1$exports = {};
$a6f03b1a6068b7d1$exports = {
  "rangeOverflow": (args) => `Значення має бути не пізніше ${args.maxValue}.`,
  "rangeReversed": `Дата початку має передувати даті завершення.`,
  "rangeUnderflow": (args) => `Значення має бути не раніше ${args.minValue}.`,
  "unavailableDate": `Вибрана дата недоступна.`
};

// node_modules/react-stately/dist/private/intl/datepicker/zh-CN.mjs
var $0562ba44eab3374f$exports = {};
$0562ba44eab3374f$exports = {
  "rangeOverflow": (args) => `值必须是 ${args.maxValue} 或更早日期。`,
  "rangeReversed": `开始日期必须早于结束日期。`,
  "rangeUnderflow": (args) => `值必须是 ${args.minValue} 或更晚日期。`,
  "unavailableDate": `所选日期不可用。`
};

// node_modules/react-stately/dist/private/intl/datepicker/zh-TW.mjs
var $d8a1483f864372cf$exports = {};
$d8a1483f864372cf$exports = {
  "rangeOverflow": (args) => `值必須是 ${args.maxValue} 或更早。`,
  "rangeReversed": `開始日期必須在結束日期之前。`,
  "rangeUnderflow": (args) => `值必須是 ${args.minValue} 或更晚。`,
  "unavailableDate": `所選日期無法使用。`
};

// node_modules/react-stately/dist/private/datepicker/intlStrings.mjs
var $d0d4459aa9ffd727$exports = {};
$d0d4459aa9ffd727$exports = {
  "ar-AE": $6f00cf506278c4dd$exports,
  "bg-BG": $d4d6a016fd5ce4f2$exports,
  "cs-CZ": $7ecf9e4979666ea0$exports,
  "da-DK": $ab075d4725312525$exports,
  "de-DE": $3922685c0eb9ba8a$exports,
  "el-GR": $01c17dde3c3a9016$exports,
  "en-US": $6b7f94ed17767636$exports,
  "es-ES": $3303b51f37a02711$exports,
  "et-EE": $e3aea59accf42c8d$exports,
  "fi-FI": $06dd1b694121be4e$exports,
  "fr-FR": $cdcce4a69a404d27$exports,
  "he-IL": $40524ca22fb30eb2$exports,
  "hr-HR": $61a527d4db6297ee$exports,
  "hu-HU": $f8f2d8d8cb44cfed$exports,
  "it-IT": $75347037b84c1b18$exports,
  "ja-JP": $4f97679990ff9091$exports,
  "ko-KR": $c189e0bf94264522$exports,
  "lt-LT": $19cd5f3aa5a4b596$exports,
  "lv-LV": $91f5db7f94b7596e$exports,
  "nb-NO": $780ef1d46063f826$exports,
  "nl-NL": $16cbb8b4d0babfdc$exports,
  "pl-PL": $0bc688cceae5eb60$exports,
  "pt-BR": $e32534e3083f4a62$exports,
  "pt-PT": $3534c94e827784b7$exports,
  "ro-RO": $a2617a746c9862f6$exports,
  "ru-RU": $f1251e27305fd7a8$exports,
  "sk-SK": $e78b7cdd5f7a9721$exports,
  "sl-SI": $41a3d435540f025d$exports,
  "sr-SP": $7e098331d6669444$exports,
  "sv-SE": $51e7b068c559df60$exports,
  "tr-TR": $10f6effd038fdb37$exports,
  "uk-UA": $a6f03b1a6068b7d1$exports,
  "zh-CN": $0562ba44eab3374f$exports,
  "zh-TW": $d8a1483f864372cf$exports
};

// node_modules/react-stately/dist/private/datepicker/utils.mjs
var import_react21 = __toESM(require_react(), 1);
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $8b141f2f71e88f85$var$dictionary = new (0, $a747a10fe70a57da$export$c17fa47878dc55b6)((0, $parcel$interopDefault($d0d4459aa9ffd727$exports)));
function $8b141f2f71e88f85$var$getLocale() {
  let locale = (
    // @ts-ignore
    typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US"
  );
  try {
    Intl.DateTimeFormat.supportedLocalesOf([
      locale
    ]);
  } catch {
    locale = "en-US";
  }
  return locale;
}
function $8b141f2f71e88f85$export$f18627323ab57ac0(value, minValue, maxValue, isDateUnavailable, options) {
  let rangeOverflow = value != null && maxValue != null && value.compare(maxValue) > 0;
  let rangeUnderflow = value != null && minValue != null && value.compare(minValue) < 0;
  let isUnavailable = value != null && isDateUnavailable?.(value) || false;
  let isInvalid = rangeOverflow || rangeUnderflow || isUnavailable;
  let errors = [];
  if (isInvalid) {
    let locale = $8b141f2f71e88f85$var$getLocale();
    let strings = (0, $a747a10fe70a57da$export$c17fa47878dc55b6).getGlobalDictionaryForPackage("@react-stately/datepicker") || $8b141f2f71e88f85$var$dictionary;
    let formatter = new (0, $b27c684a33948c64$export$2f817fcdc4b89ae0)(locale, strings);
    let dateFormatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, $8b141f2f71e88f85$export$7e319ea407e63bc0({}, options));
    let timeZone = dateFormatter.resolvedOptions().timeZone;
    if (rangeUnderflow && minValue != null) errors.push(formatter.format("rangeUnderflow", {
      minValue: dateFormatter.format(minValue.toDate(timeZone))
    }));
    if (rangeOverflow && maxValue != null) errors.push(formatter.format("rangeOverflow", {
      maxValue: dateFormatter.format(maxValue.toDate(timeZone))
    }));
    if (isUnavailable) errors.push(formatter.format("unavailableDate"));
  }
  return {
    isInvalid,
    validationErrors: errors,
    validationDetails: {
      badInput: isUnavailable,
      customError: false,
      patternMismatch: false,
      rangeOverflow,
      rangeUnderflow,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: false,
      valid: !isInvalid
    }
  };
}
function $8b141f2f71e88f85$export$80ff8fc0ae339c13(value, minValue, maxValue, isDateUnavailable, options) {
  let startValidation = $8b141f2f71e88f85$export$f18627323ab57ac0(value?.start ?? null, minValue, maxValue, isDateUnavailable, options);
  let endValidation = $8b141f2f71e88f85$export$f18627323ab57ac0(value?.end ?? null, minValue, maxValue, isDateUnavailable, options);
  let result = (0, $fd2148440a13ec26$export$75ee7c75d68f5b0e)(startValidation, endValidation);
  if (value?.end != null && value.start != null && value.end.compare(value.start) < 0) {
    let strings = (0, $a747a10fe70a57da$export$c17fa47878dc55b6).getGlobalDictionaryForPackage("@react-stately/datepicker") || $8b141f2f71e88f85$var$dictionary;
    result = (0, $fd2148440a13ec26$export$75ee7c75d68f5b0e)(result, {
      isInvalid: true,
      validationErrors: [
        strings.getStringForLocale("rangeReversed", $8b141f2f71e88f85$var$getLocale())
      ],
      validationDetails: {
        ...(0, $fd2148440a13ec26$export$aca958c65c314e6c),
        rangeUnderflow: true,
        rangeOverflow: true,
        valid: false
      }
    });
  }
  return result;
}
var $8b141f2f71e88f85$var$DEFAULT_FIELD_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit"
};
var $8b141f2f71e88f85$var$TWO_DIGIT_FIELD_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
};
function $8b141f2f71e88f85$export$7e319ea407e63bc0(fieldOptions, options) {
  let defaultFieldOptions = options.shouldForceLeadingZeros ? $8b141f2f71e88f85$var$TWO_DIGIT_FIELD_OPTIONS : $8b141f2f71e88f85$var$DEFAULT_FIELD_OPTIONS;
  fieldOptions = {
    ...defaultFieldOptions,
    ...fieldOptions
  };
  let granularity = options.granularity || "minute";
  let keys = Object.keys(fieldOptions);
  let startIdx = keys.indexOf(options.maxGranularity ?? "year");
  if (startIdx < 0) startIdx = 0;
  let endIdx = keys.indexOf(granularity);
  if (endIdx < 0) endIdx = 2;
  if (startIdx > endIdx) throw new Error("maxGranularity must be greater than granularity");
  let opts = keys.slice(startIdx, endIdx + 1).reduce((opts2, key) => {
    opts2[key] = fieldOptions[key];
    return opts2;
  }, {});
  if (options.hourCycle != null) opts.hour12 = options.hourCycle === 12;
  opts.timeZone = options.timeZone || "UTC";
  let hasTime = granularity === "hour" || granularity === "minute" || granularity === "second";
  if (hasTime && options.timeZone && !options.hideTimeZone) opts.timeZoneName = "short";
  if (options.showEra && startIdx === 0) opts.era = "short";
  return opts;
}
function $8b141f2f71e88f85$export$c5221a78ef73c5e9(placeholderValue) {
  if (placeholderValue && "hour" in placeholderValue) return placeholderValue;
  return new (0, $2aaf608024c21ca1$export$680ea196effce5f)();
}
function $8b141f2f71e88f85$export$61a490a80c552550(value, calendar) {
  if (value === null) return null;
  if (!value) return void 0;
  return (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(value, calendar);
}
function $8b141f2f71e88f85$export$66aa2b09de4b1ea5(placeholderValue, granularity, calendar, timeZone) {
  if (placeholderValue) return $8b141f2f71e88f85$export$61a490a80c552550(placeholderValue, calendar);
  let date = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)((0, $ad063034c8620db8$export$461939dd4422153)(timeZone ?? (0, $ad063034c8620db8$export$aa8b41735afcabd2)()).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }), calendar);
  if (granularity === "year" || granularity === "month" || granularity === "day") return (0, $d07e34cce18680fd$export$93522d1a439f3617)(date);
  if (!timeZone) return (0, $d07e34cce18680fd$export$b21e0b124e224484)(date);
  return date;
}
function $8b141f2f71e88f85$export$2440da353cedad43(v, granularity) {
  let defaultTimeZone = v && "timeZone" in v ? v.timeZone : void 0;
  let defaultGranularity = v && "minute" in v ? "minute" : "day";
  if (v && granularity && !(granularity in v)) throw new Error("Invalid granularity " + granularity + " for value " + v.toString());
  let [lastValue, setLastValue] = (0, import_react21.useState)([
    defaultGranularity,
    defaultTimeZone
  ]);
  if (v && (lastValue[0] !== defaultGranularity || lastValue[1] !== defaultTimeZone)) setLastValue([
    defaultGranularity,
    defaultTimeZone
  ]);
  if (!granularity) granularity = v ? defaultGranularity : lastValue[0];
  let timeZone = v ? defaultTimeZone : lastValue[1];
  return [
    granularity,
    timeZone
  ];
}

// node_modules/react-stately/dist/private/datepicker/placeholders.mjs
var $8e5fbb9a25791ca0$var$placeholders = new (0, $a747a10fe70a57da$export$c17fa47878dc55b6)({
  ach: {
    year: "mwaka",
    month: "dwe",
    day: "nino"
  },
  af: {
    year: "jjjj",
    month: "mm",
    day: "dd"
  },
  am: {
    year: "ዓዓዓዓ",
    month: "ሚሜ",
    day: "ቀቀ"
  },
  an: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  ar: {
    year: "سنة",
    month: "شهر",
    day: "يوم"
  },
  ast: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  az: {
    year: "iiii",
    month: "aa",
    day: "gg"
  },
  be: {
    year: "гггг",
    month: "мм",
    day: "дд"
  },
  bg: {
    year: "гггг",
    month: "мм",
    day: "дд"
  },
  bn: {
    year: "yyyy",
    month: "মিমি",
    day: "dd"
  },
  br: {
    year: "bbbb",
    month: "mm",
    day: "dd"
  },
  bs: {
    year: "gggg",
    month: "mm",
    day: "dd"
  },
  ca: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  cak: {
    year: "jjjj",
    month: "ii",
    day: "q'q'"
  },
  ckb: {
    year: "ساڵ",
    month: "مانگ",
    day: "ڕۆژ"
  },
  cs: {
    year: "rrrr",
    month: "mm",
    day: "dd"
  },
  cy: {
    year: "bbbb",
    month: "mm",
    day: "dd"
  },
  da: {
    year: "åååå",
    month: "mm",
    day: "dd"
  },
  de: {
    year: "jjjj",
    month: "mm",
    day: "tt"
  },
  dsb: {
    year: "llll",
    month: "mm",
    day: "źź"
  },
  el: {
    year: "εεεε",
    month: "μμ",
    day: "ηη"
  },
  en: {
    year: "yyyy",
    month: "mm",
    day: "dd"
  },
  eo: {
    year: "jjjj",
    month: "mm",
    day: "tt"
  },
  es: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  et: {
    year: "aaaa",
    month: "kk",
    day: "pp"
  },
  eu: {
    year: "uuuu",
    month: "hh",
    day: "ee"
  },
  fa: {
    year: "سال",
    month: "ماه",
    day: "روز"
  },
  ff: {
    year: "hhhh",
    month: "ll",
    day: "ññ"
  },
  fi: {
    year: "vvvv",
    month: "kk",
    day: "pp"
  },
  fr: {
    year: "aaaa",
    month: "mm",
    day: "jj"
  },
  fy: {
    year: "jjjj",
    month: "mm",
    day: "dd"
  },
  ga: {
    year: "bbbb",
    month: "mm",
    day: "ll"
  },
  gd: {
    year: "bbbb",
    month: "mm",
    day: "ll"
  },
  gl: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  he: {
    year: "שנה",
    month: "חודש",
    day: "יום"
  },
  hr: {
    year: "gggg",
    month: "mm",
    day: "dd"
  },
  hsb: {
    year: "llll",
    month: "mm",
    day: "dd"
  },
  hu: {
    year: "éééé",
    month: "hh",
    day: "nn"
  },
  ia: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  id: {
    year: "tttt",
    month: "bb",
    day: "hh"
  },
  is: {
    year: "áááá",
    month: "mm",
    day: "dd"
  },
  it: {
    year: "aaaa",
    month: "mm",
    day: "gg"
  },
  ja: {
    year: "年",
    month: "月",
    day: "日"
  },
  ka: {
    year: "წწწწ",
    month: "თთ",
    day: "რრ"
  },
  kk: {
    year: "жжжж",
    month: "аа",
    day: "кк"
  },
  kn: {
    year: "ವವವವ",
    month: "ಮಿಮೀ",
    day: "ದಿದಿ"
  },
  ko: {
    year: "연도",
    month: "월",
    day: "일"
  },
  lb: {
    year: "jjjj",
    month: "mm",
    day: "dd"
  },
  lo: {
    year: "ປປປປ",
    month: "ດດ",
    day: "ວວ"
  },
  lt: {
    year: "mmmm",
    month: "mm",
    day: "dd"
  },
  lv: {
    year: "gggg",
    month: "mm",
    day: "dd"
  },
  meh: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  ml: {
    year: "വർഷം",
    month: "മാസം",
    day: "തീയതി"
  },
  ms: {
    year: "tttt",
    month: "mm",
    day: "hh"
  },
  nb: {
    year: "åååå",
    month: "mm",
    day: "dd"
  },
  nl: {
    year: "jjjj",
    month: "mm",
    day: "dd"
  },
  nn: {
    year: "åååå",
    month: "mm",
    day: "dd"
  },
  no: {
    year: "åååå",
    month: "mm",
    day: "dd"
  },
  oc: {
    year: "aaaa",
    month: "mm",
    day: "jj"
  },
  pl: {
    year: "rrrr",
    month: "mm",
    day: "dd"
  },
  pt: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  rm: {
    year: "oooo",
    month: "mm",
    day: "dd"
  },
  ro: {
    year: "aaaa",
    month: "ll",
    day: "zz"
  },
  ru: {
    year: "гггг",
    month: "мм",
    day: "дд"
  },
  sc: {
    year: "aaaa",
    month: "mm",
    day: "dd"
  },
  scn: {
    year: "aaaa",
    month: "mm",
    day: "jj"
  },
  sk: {
    year: "rrrr",
    month: "mm",
    day: "dd"
  },
  sl: {
    year: "llll",
    month: "mm",
    day: "dd"
  },
  sr: {
    year: "гггг",
    month: "мм",
    day: "дд"
  },
  "sr-Latn": {
    year: "gggg",
    month: "mm",
    day: "dd"
  },
  sv: {
    year: "åååå",
    month: "mm",
    day: "dd"
  },
  szl: {
    year: "rrrr",
    month: "mm",
    day: "dd"
  },
  tg: {
    year: "сссс",
    month: "мм",
    day: "рр"
  },
  th: {
    year: "ปปปป",
    month: "ดด",
    day: "วว"
  },
  tr: {
    year: "yyyy",
    month: "aa",
    day: "gg"
  },
  uk: {
    year: "рррр",
    month: "мм",
    day: "дд"
  },
  "zh-CN": {
    year: "年",
    month: "月",
    day: "日"
  },
  "zh-TW": {
    year: "年",
    month: "月",
    day: "日"
  }
}, "en");
function $8e5fbb9a25791ca0$export$d3f5c5e0a5023fa0(field, value, locale) {
  if (field === "era" || field === "dayPeriod") return value;
  if (field === "year" || field === "month" || field === "day") return $8e5fbb9a25791ca0$var$placeholders.getStringForLocale(field, locale);
  return "––";
}

// node_modules/react-stately/dist/private/datepicker/IncompleteDate.mjs
var $0e8931c783099b4f$export$ae165b50d181e1ef = class _$0e8931c783099b4f$export$ae165b50d181e1ef {
  constructor(calendar, hourCycle, dateValue) {
    this.era = dateValue?.era ?? null;
    this.calendar = calendar;
    this.year = dateValue?.year ?? null;
    this.month = dateValue?.month ?? null;
    this.day = dateValue?.day ?? null;
    this.hour = dateValue?.hour ?? null;
    this.hourCycle = hourCycle;
    this.dayPeriod = null;
    this.minute = dateValue?.minute ?? null;
    this.second = dateValue?.second ?? null;
    this.millisecond = dateValue?.millisecond ?? null;
    this.offset = "offset" in (dateValue ?? {}) ? dateValue.offset : null;
    if (this.hour != null) {
      let [dayPeriod, hour] = $0e8931c783099b4f$var$toHourCycle(this.hour, hourCycle);
      this.dayPeriod = dayPeriod;
      this.hour = hour;
    }
  }
  copy() {
    let res = new _$0e8931c783099b4f$export$ae165b50d181e1ef(this.calendar, this.hourCycle);
    res.era = this.era;
    res.year = this.year;
    res.month = this.month;
    res.day = this.day;
    res.hour = this.hour;
    res.dayPeriod = this.dayPeriod;
    res.minute = this.minute;
    res.second = this.second;
    res.millisecond = this.millisecond;
    res.offset = this.offset;
    return res;
  }
  /** Checks whether all the specified segments have a value. */
  isComplete(segments) {
    return segments.every((segment) => this[segment] != null);
  }
  /** Checks whether the given date value matches this value for the specified segments. */
  validate(dt, segments) {
    return segments.every((segment) => {
      if ((segment === "hour" || segment === "dayPeriod") && "hour" in dt) {
        let [dayPeriod, hour] = $0e8931c783099b4f$var$toHourCycle(dt.hour, this.hourCycle);
        return this.dayPeriod === dayPeriod && this.hour === hour;
      }
      return this[segment] === dt[segment];
    });
  }
  /** Checks if the date is empty (i.e. all specified segments are null). */
  isCleared(segments) {
    return segments.every((segment) => this[segment] === null);
  }
  /** Sets the given field. */
  set(field, value, placeholder) {
    let result = this.copy();
    result[field] = value;
    if (field === "hour" && result.dayPeriod == null && "hour" in placeholder) result.dayPeriod = $0e8931c783099b4f$var$toHourCycle(placeholder.hour, this.hourCycle)[0];
    if (field === "year" && result.era == null) result.era = placeholder.era;
    if (field !== "second" && field !== "literal" && field !== "timeZoneName") result.offset = null;
    return result;
  }
  /** Sets the given field to null. */
  clear(field) {
    let result = this.copy();
    result[field] = null;
    if (field === "year") result.era = null;
    result.offset = null;
    return result;
  }
  /**
  * Increments or decrements the given field. If it is null, then it is set to the placeholder
  * value.
  */
  cycle(field, amount, placeholder, displaySegments) {
    let res = this.copy();
    if (res[field] == null && field !== "dayPeriod" && field !== "era") {
      if (field === "hour" && "hour" in placeholder) {
        let [dayPeriod, hour] = $0e8931c783099b4f$var$toHourCycle(placeholder.hour, this.hourCycle);
        res.dayPeriod = dayPeriod;
        res.hour = hour;
      } else res[field] = placeholder[field];
      if (field === "year" && res.era == null) res.era = placeholder.era;
      return res;
    }
    switch (field) {
      case "era": {
        let eras = this.calendar.getEras();
        let index = eras.indexOf(res.era);
        index = $0e8931c783099b4f$var$cycleValue(index, amount, 0, eras.length - 1);
        res.era = eras[index];
        break;
      }
      case "year": {
        let date = new (0, $2aaf608024c21ca1$export$99faa760c7908e4f)(this.calendar, this.era ?? placeholder.era, this.year ?? placeholder.year, this.month ?? 1, this.day ?? 1);
        date = date.cycle(field, amount, {
          round: field === "year"
        });
        res.era = date.era;
        res.year = date.year;
        break;
      }
      case "month":
        res.month = $0e8931c783099b4f$var$cycleValue(res.month ?? 1, amount, 1, this.calendar.getMaximumMonthsInYear());
        break;
      case "day":
        res.day = $0e8931c783099b4f$var$cycleValue(res.day ?? 1, amount, 1, this.calendar.getMaximumDaysInMonth());
        break;
      case "hour": {
        let hasDateSegements = displaySegments.some((s) => [
          "year",
          "month",
          "day"
        ].includes(s));
        if ("timeZone" in placeholder && (!hasDateSegements || res.year != null && res.month != null && res.day != null)) {
          let date = this.toValue(placeholder);
          date = date.cycle("hour", amount, {
            hourCycle: this.hourCycle === "h12" ? 12 : 24,
            round: false
          });
          let [dayPeriod, adjustedHour] = $0e8931c783099b4f$var$toHourCycle(date.hour, this.hourCycle);
          res.hour = adjustedHour;
          res.dayPeriod = dayPeriod;
          res.offset = date.offset;
        } else {
          let hours = res.hour ?? 0;
          let limits = this.getSegmentLimits("hour");
          res.hour = $0e8931c783099b4f$var$cycleValue(hours, amount, limits.minValue, limits.maxValue);
          if (res.dayPeriod == null && "hour" in placeholder) res.dayPeriod = $0e8931c783099b4f$var$toHourCycle(placeholder.hour, this.hourCycle)[0];
        }
        break;
      }
      case "dayPeriod":
        res.dayPeriod = $0e8931c783099b4f$var$cycleValue(res.dayPeriod ?? 0, amount, 0, 1);
        break;
      case "minute":
        res.minute = $0e8931c783099b4f$var$cycleValue(res.minute ?? 0, amount, 0, 59, true);
        break;
      case "second":
        res.second = $0e8931c783099b4f$var$cycleValue(res.second ?? 0, amount, 0, 59, true);
        break;
    }
    return res;
  }
  /**
  * Converts the incomplete date to a full date value, using the provided value for any unset
  * fields.
  */
  toValue(value) {
    if ("hour" in value) {
      let hour = this.hour;
      if (hour != null) hour = $0e8931c783099b4f$var$fromHourCycle(hour, this.dayPeriod ?? 0, this.hourCycle);
      else if (this.hourCycle === "h12" || this.hourCycle === "h11") hour = this.dayPeriod === 1 ? 12 : 0;
      let res = value.set({
        era: this.era ?? value.era,
        year: this.year ?? value.year,
        month: this.month ?? value.month,
        day: this.day ?? value.day,
        hour: hour ?? value.hour,
        minute: this.minute ?? value.minute,
        second: this.second ?? value.second,
        millisecond: this.millisecond ?? value.millisecond
      });
      if ("offset" in res && this.offset != null && res.offset !== this.offset) res = res.add({
        milliseconds: res.offset - this.offset
      });
      return res;
    } else return value.set({
      era: this.era ?? value.era,
      year: this.year ?? value.year,
      month: this.month ?? value.month,
      day: this.day ?? value.day
    });
  }
  getSegmentLimits(type) {
    switch (type) {
      case "era": {
        let eras = this.calendar.getEras();
        return {
          value: this.era != null ? eras.indexOf(this.era) : eras.length - 1,
          minValue: 0,
          maxValue: eras.length - 1
        };
      }
      case "year":
        return {
          value: this.year,
          minValue: 1,
          maxValue: 9999
        };
      case "month":
        return {
          value: this.month,
          minValue: 1,
          maxValue: this.calendar.getMaximumMonthsInYear()
        };
      case "day":
        return {
          value: this.day,
          minValue: 1,
          maxValue: this.calendar.getMaximumDaysInMonth()
        };
      case "dayPeriod":
        return {
          value: this.dayPeriod,
          minValue: 0,
          maxValue: 1
        };
      case "hour": {
        let minValue = 0;
        let maxValue = 23;
        if (this.hourCycle === "h12") {
          minValue = 1;
          maxValue = 12;
        } else if (this.hourCycle === "h11") {
          minValue = 0;
          maxValue = 11;
        }
        return {
          value: this.hour,
          minValue,
          maxValue
        };
      }
      case "minute":
        return {
          value: this.minute,
          minValue: 0,
          maxValue: 59
        };
      case "second":
        return {
          value: this.second,
          minValue: 0,
          maxValue: 59
        };
    }
  }
};
function $0e8931c783099b4f$var$cycleValue(value, amount, min, max, round = false) {
  if (round) {
    value += Math.sign(amount);
    if (value < min) value = max;
    let div = Math.abs(amount);
    if (amount > 0) value = Math.ceil(value / div) * div;
    else value = Math.floor(value / div) * div;
    if (value > max) value = min;
  } else {
    value += amount;
    if (value < min) value = max - (min - value - 1);
    else if (value > max) value = min + (value - max - 1);
  }
  return value;
}
function $0e8931c783099b4f$var$toHourCycle(hour, hourCycle) {
  let dayPeriod = hour >= 12 ? 1 : 0;
  switch (hourCycle) {
    case "h11":
      if (hour >= 12) hour -= 12;
      break;
    case "h12":
      if (hour === 0) hour = 12;
      else if (hour > 12) hour -= 12;
      break;
    case "h23":
      dayPeriod = null;
      break;
    case "h24":
      hour += 1;
      dayPeriod = null;
  }
  return [
    dayPeriod,
    hour
  ];
}
function $0e8931c783099b4f$var$fromHourCycle(hour, dayPeriod, hourCycle) {
  switch (hourCycle) {
    case "h11":
      if (dayPeriod === 1) hour += 12;
      break;
    case "h12":
      if (hour === 12) hour = 0;
      if (dayPeriod === 1) hour += 12;
      break;
    case "h24":
      hour -= 1;
      break;
  }
  return hour;
}

// node_modules/react-stately/dist/private/datepicker/useDateFieldState.mjs
var import_react22 = __toESM(require_react(), 1);
var $8e7461aabf74661f$var$EDITABLE_SEGMENTS = {
  year: true,
  month: true,
  day: true,
  hour: true,
  minute: true,
  second: true,
  dayPeriod: true,
  era: true
};
var $8e7461aabf74661f$var$PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15
};
var $8e7461aabf74661f$var$TYPE_MAPPING = {
  // Node seems to convert everything to lowercase...
  dayperiod: "dayPeriod",
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts#named_years
  relatedYear: "year",
  yearName: "literal",
  unknown: "literal"
};
function $8e7461aabf74661f$export$60e84778edff6d26(props) {
  let { locale, createCalendar, hideTimeZone, isDisabled = false, isReadOnly = false, isRequired = false, minValue, maxValue, isDateUnavailable } = props;
  let v = props.value || props.defaultValue || props.placeholderValue || null;
  let [granularity, defaultTimeZone] = (0, $8b141f2f71e88f85$export$2440da353cedad43)(v, props.granularity);
  let timeZone = defaultTimeZone || "UTC";
  if (v && !(granularity in v)) throw new Error("Invalid granularity " + granularity + " for value " + v.toString());
  let [calendar, hourCycle] = (0, import_react22.useMemo)(() => {
    let formatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, {
      dateStyle: "short",
      timeStyle: "short",
      hour12: props.hourCycle != null ? props.hourCycle === 12 : void 0
    });
    let opts2 = formatter.resolvedOptions();
    let calendar2 = createCalendar(opts2.calendar);
    return [
      calendar2,
      opts2.hourCycle
    ];
  }, [
    locale,
    props.hourCycle,
    createCalendar
  ]);
  let [value, setDate] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue ?? null, props.onChange);
  let [initialValue] = (0, import_react22.useState)(value);
  let calendarValue = (0, import_react22.useMemo)(() => (0, $8b141f2f71e88f85$export$61a490a80c552550)(value, calendar) ?? null, [
    value,
    calendar
  ]);
  let [displayValue, setDisplayValue] = (0, import_react22.useState)(() => new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue));
  let showEra = calendar.identifier === "gregory" && displayValue.era === "BC";
  let formatOpts = (0, import_react22.useMemo)(() => ({
    granularity,
    maxGranularity: props.maxGranularity ?? "year",
    timeZone: defaultTimeZone,
    hideTimeZone,
    hourCycle: props.hourCycle,
    showEra,
    shouldForceLeadingZeros: props.shouldForceLeadingZeros
  }), [
    props.maxGranularity,
    granularity,
    props.hourCycle,
    props.shouldForceLeadingZeros,
    defaultTimeZone,
    hideTimeZone,
    showEra
  ]);
  let opts = (0, import_react22.useMemo)(() => (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)({}, formatOpts), [
    formatOpts
  ]);
  let dateFormatter = (0, import_react22.useMemo)(() => new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, opts), [
    locale,
    opts
  ]);
  let resolvedOptions = (0, import_react22.useMemo)(() => dateFormatter.resolvedOptions(), [
    dateFormatter
  ]);
  let placeholder = (0, import_react22.useMemo)(() => (0, $8b141f2f71e88f85$export$66aa2b09de4b1ea5)(props.placeholderValue, granularity, calendar, defaultTimeZone), [
    props.placeholderValue,
    granularity,
    calendar,
    defaultTimeZone
  ]);
  let displaySegments = (0, import_react22.useMemo)(() => {
    let is12HourClock = hourCycle === "h11" || hourCycle === "h12";
    let segments2 = [
      "era",
      "year",
      "month",
      "day",
      "hour",
      ...is12HourClock ? [
        "dayPeriod"
      ] : [],
      "minute",
      "second"
    ];
    let minIndex = segments2.indexOf(props.maxGranularity || "era");
    let maxIndex = segments2.indexOf(granularity === "hour" && is12HourClock ? "dayPeriod" : granularity);
    return segments2.slice(minIndex, maxIndex + 1);
  }, [
    props.maxGranularity,
    granularity,
    hourCycle
  ]);
  let [lastValue, setLastValue] = (0, import_react22.useState)(calendarValue);
  let [lastCalendar, setLastCalendar] = (0, import_react22.useState)(calendar);
  let [lastHourCycle, setLastHourCycle] = (0, import_react22.useState)(hourCycle);
  if (calendarValue !== lastValue || hourCycle !== lastHourCycle || !(0, $ad063034c8620db8$export$dbc69fd56b53d5e)(calendar, lastCalendar)) {
    displayValue = new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue);
    setLastValue(calendarValue);
    setLastCalendar(calendar);
    setLastHourCycle(hourCycle);
    setDisplayValue(displayValue);
  }
  let setValue = (newValue) => {
    if (props.isDisabled || props.isReadOnly) return;
    if (newValue == null || newValue instanceof (0, $0e8931c783099b4f$export$ae165b50d181e1ef) && newValue.isCleared(displaySegments)) {
      setDisplayValue(new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue));
      setDate(null);
    } else if (!(newValue instanceof (0, $0e8931c783099b4f$export$ae165b50d181e1ef))) {
      newValue = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(newValue, v?.calendar || new (0, $93635573935797de$export$80ee6245ec4f29ec)());
      setDisplayValue(new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue));
      setDate(newValue);
    } else {
      if (newValue.isComplete(displaySegments)) {
        let dateValue2 = newValue.toValue(calendarValue ?? placeholder);
        if (newValue.validate(dateValue2, displaySegments)) {
          let newDateValue = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(dateValue2, v?.calendar || new (0, $93635573935797de$export$80ee6245ec4f29ec)());
          if (!value || newDateValue.compare(value) !== 0) {
            setDisplayValue(new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue));
            setDate(newDateValue);
            return;
          }
        }
      }
      setDisplayValue(newValue);
    }
  };
  let dateValue = (0, import_react22.useMemo)(() => {
    let v2 = displayValue.toValue(calendarValue ?? placeholder);
    return v2.toDate(timeZone);
  }, [
    displayValue,
    timeZone,
    calendarValue,
    placeholder
  ]);
  let segments = (0, import_react22.useMemo)(() => $8e7461aabf74661f$var$processSegments(dateValue, displayValue, dateFormatter, resolvedOptions, calendar, locale, granularity), [
    dateValue,
    dateFormatter,
    resolvedOptions,
    displayValue,
    calendar,
    locale,
    granularity
  ]);
  let adjustSegment = (type, amount) => {
    setValue(displayValue.cycle(type, amount, placeholder, displaySegments));
  };
  let builtinValidation = (0, import_react22.useMemo)(() => (0, $8b141f2f71e88f85$export$f18627323ab57ac0)(value, minValue, maxValue, isDateUnavailable, formatOpts), [
    value,
    minValue,
    maxValue,
    isDateUnavailable,
    formatOpts
  ]);
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value,
    builtinValidation
  });
  let isValueInvalid = validation.displayValidation.isInvalid;
  let validationState = props.validationState || (isValueInvalid ? "invalid" : null);
  return {
    ...validation,
    value: calendarValue,
    defaultValue: props.defaultValue ?? initialValue,
    dateValue,
    calendar,
    setValue,
    segments,
    dateFormatter,
    validationState,
    isInvalid: isValueInvalid,
    granularity,
    maxGranularity: props.maxGranularity ?? "year",
    isDisabled,
    isReadOnly,
    isRequired,
    increment(part) {
      adjustSegment(part, 1);
    },
    decrement(part) {
      adjustSegment(part, -1);
    },
    incrementPage(part) {
      adjustSegment(part, $8e7461aabf74661f$var$PAGE_STEP[part] || 1);
    },
    decrementPage(part) {
      adjustSegment(part, -($8e7461aabf74661f$var$PAGE_STEP[part] || 1));
    },
    incrementToMax(part) {
      let maxValue2 = part === "hour" && hourCycle === "h12" ? 11 : displayValue.getSegmentLimits(part).maxValue;
      setValue(displayValue.set(part, maxValue2, placeholder));
    },
    decrementToMin(part) {
      let minValue2 = part === "hour" && hourCycle === "h12" ? 12 : displayValue.getSegmentLimits(part).minValue;
      setValue(displayValue.set(part, minValue2, placeholder));
    },
    setSegment(part, v2) {
      setValue(displayValue.set(part, v2, placeholder));
    },
    confirmPlaceholder() {
      if (props.isDisabled || props.isReadOnly) return;
      if (displayValue.isComplete(displaySegments)) {
        let dateValue2 = displayValue.toValue(calendarValue ?? placeholder);
        let newDateValue = (0, $d07e34cce18680fd$export$b4a036af3fc0b032)(dateValue2, v?.calendar || new (0, $93635573935797de$export$80ee6245ec4f29ec)());
        if (!value || newDateValue.compare(value) !== 0) setDate(newDateValue);
        setDisplayValue(new (0, $0e8931c783099b4f$export$ae165b50d181e1ef)(calendar, hourCycle, calendarValue));
      }
    },
    clearSegment(part) {
      let value2 = displayValue;
      if (part !== "timeZoneName" && part !== "literal") value2 = displayValue.clear(part);
      setValue(value2);
    },
    formatValue(fieldOptions) {
      if (!calendarValue) return "";
      let formatOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)(fieldOptions, formatOpts);
      let formatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, formatOptions);
      return formatter.format(dateValue);
    },
    getDateFormatter(locale2, formatOptions) {
      let newOptions = {
        ...formatOpts,
        ...formatOptions
      };
      let newFormatOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)({}, newOptions);
      return new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale2, newFormatOptions);
    }
  };
}
function $8e7461aabf74661f$var$processSegments(dateValue, displayValue, dateFormatter, resolvedOptions, calendar, locale, granularity) {
  let timeValue = [
    "hour",
    "minute",
    "second"
  ];
  let segments = dateFormatter.formatToParts(dateValue);
  let numberFormatter = new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, {
    useGrouping: false
  });
  let twoDigitFormatter = new (0, $1dfb119a85e764e5$export$cc77c4ff7e8673c5)(locale, {
    useGrouping: false,
    minimumIntegerDigits: 2
  });
  for (let segment of segments) if (segment.type === "year" || segment.type === "month" || segment.type === "day" || segment.type === "hour") {
    let value = displayValue[segment.type] ?? 0;
    if (resolvedOptions[segment.type] === "2-digit") segment.value = twoDigitFormatter.format(value);
    else segment.value = numberFormatter.format(value);
  }
  let processedSegments = [];
  for (let segment of segments) {
    let type = $8e7461aabf74661f$var$TYPE_MAPPING[segment.type] || segment.type;
    let isEditable = $8e7461aabf74661f$var$EDITABLE_SEGMENTS[type];
    if (type === "era" && calendar.getEras().length === 1) isEditable = false;
    let isPlaceholder = $8e7461aabf74661f$var$EDITABLE_SEGMENTS[type] && displayValue[segment.type] == null;
    let placeholder = $8e7461aabf74661f$var$EDITABLE_SEGMENTS[type] ? (0, $8e5fbb9a25791ca0$export$d3f5c5e0a5023fa0)(type, segment.value, locale) : null;
    let dateSegment = {
      type,
      text: isPlaceholder ? placeholder : segment.value,
      ...displayValue.getSegmentLimits(type),
      isPlaceholder,
      placeholder,
      isEditable
    };
    if (type === "hour") {
      processedSegments.push({
        type: "literal",
        text: "⁦",
        isPlaceholder: false,
        placeholder: "",
        isEditable: false
      });
      processedSegments.push(dateSegment);
      if (type === granularity) processedSegments.push({
        type: "literal",
        text: "⁩",
        isPlaceholder: false,
        placeholder: "",
        isEditable: false
      });
    } else if (timeValue.includes(type) && type === granularity) {
      processedSegments.push(dateSegment);
      processedSegments.push({
        type: "literal",
        text: "⁩",
        isPlaceholder: false,
        placeholder: "",
        isEditable: false
      });
    } else
      processedSegments.push(dateSegment);
  }
  return processedSegments;
}

// node_modules/react-stately/dist/private/datepicker/useTimeFieldState.mjs
var import_react23 = __toESM(require_react(), 1);
function $b822555cf9fe955c$export$fd53cef0cc796101(props) {
  let { placeholderValue = new (0, $2aaf608024c21ca1$export$680ea196effce5f)(), minValue, maxValue, defaultValue, granularity, validate } = props;
  let [value, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, defaultValue ?? null, props.onChange);
  let v = value || placeholderValue;
  let day = v && "day" in v ? v : void 0;
  let defaultValueTimeZone = defaultValue && "timeZone" in defaultValue ? defaultValue.timeZone : void 0;
  let placeholderDate = (0, import_react23.useMemo)(() => {
    let valueTimeZone = v && "timeZone" in v ? v.timeZone : void 0;
    return (valueTimeZone || defaultValueTimeZone) && placeholderValue ? (0, $d07e34cce18680fd$export$84c95a83c799e074)($b822555cf9fe955c$var$convertValue(placeholderValue), valueTimeZone || defaultValueTimeZone) : $b822555cf9fe955c$var$convertValue(placeholderValue);
  }, [
    placeholderValue,
    v,
    defaultValueTimeZone
  ]);
  let minDate = (0, import_react23.useMemo)(() => $b822555cf9fe955c$var$convertValue(minValue, day), [
    minValue,
    day
  ]);
  let maxDate = (0, import_react23.useMemo)(() => $b822555cf9fe955c$var$convertValue(maxValue, day), [
    maxValue,
    day
  ]);
  let timeValue = (0, import_react23.useMemo)(() => value && "day" in value ? (0, $d07e34cce18680fd$export$d33f79e3ffc3dc83)(value) : value, [
    value
  ]);
  let dateTime = (0, import_react23.useMemo)(() => value == null ? null : $b822555cf9fe955c$var$convertValue(value), [
    value
  ]);
  let defaultDateTime = (0, import_react23.useMemo)(() => defaultValue == null ? null : $b822555cf9fe955c$var$convertValue(defaultValue), [
    defaultValue
  ]);
  let onChange = (newValue) => {
    setValue(day || defaultValueTimeZone ? newValue : newValue && (0, $d07e34cce18680fd$export$d33f79e3ffc3dc83)(newValue));
  };
  let state = (0, $8e7461aabf74661f$export$60e84778edff6d26)({
    ...props,
    value: dateTime,
    defaultValue: defaultDateTime,
    minValue: minDate,
    maxValue: maxDate,
    onChange,
    granularity: granularity || "minute",
    maxGranularity: "hour",
    placeholderValue: placeholderDate ?? void 0,
    // Calendar should not matter for time fields.
    createCalendar: () => new (0, $93635573935797de$export$80ee6245ec4f29ec)(),
    validate: (0, import_react23.useCallback)(() => validate?.(value), [
      validate,
      value
    ])
  });
  return {
    ...state,
    timeValue
  };
}
function $b822555cf9fe955c$var$convertValue(value, date = (0, $ad063034c8620db8$export$d0bdf45af03a6ea3)((0, $ad063034c8620db8$export$aa8b41735afcabd2)())) {
  if (!value) return null;
  if ("day" in value) return value;
  return (0, $d07e34cce18680fd$export$b21e0b124e224484)(date, value);
}

// node_modules/react-stately/dist/private/datepicker/useDatePickerState.mjs
var import_react24 = __toESM(require_react(), 1);
function $28aae683a942e141$export$87194bb378cc3ac2(props) {
  let overlayState = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)(props);
  let [value, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue || null, props.onChange);
  let [initialValue] = (0, import_react24.useState)(value);
  let v = value || props.placeholderValue || null;
  let [granularity, defaultTimeZone] = (0, $8b141f2f71e88f85$export$2440da353cedad43)(v, props.granularity);
  let dateValue = value != null ? value.toDate(defaultTimeZone ?? "UTC") : null;
  let hasTime = granularity === "hour" || granularity === "minute" || granularity === "second";
  let shouldCloseOnSelect = props.shouldCloseOnSelect ?? true;
  let [selectedDate, setSelectedDate] = (0, import_react24.useState)(null);
  let [selectedTime, setSelectedTime] = (0, import_react24.useState)(null);
  if (value) {
    selectedDate = value;
    if ("hour" in value) selectedTime = value;
  }
  if (v && !(granularity in v)) throw new Error("Invalid granularity " + granularity + " for value " + v.toString());
  let showEra = value?.calendar.identifier === "gregory" && value.era === "BC";
  let formatOpts = (0, import_react24.useMemo)(() => ({
    granularity,
    timeZone: defaultTimeZone,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    shouldForceLeadingZeros: props.shouldForceLeadingZeros,
    showEra
  }), [
    granularity,
    props.hourCycle,
    props.shouldForceLeadingZeros,
    defaultTimeZone,
    props.hideTimeZone,
    showEra
  ]);
  let { minValue, maxValue, isDateUnavailable } = props;
  let builtinValidation = (0, import_react24.useMemo)(() => (0, $8b141f2f71e88f85$export$f18627323ab57ac0)(value, minValue, maxValue, isDateUnavailable, formatOpts), [
    value,
    minValue,
    maxValue,
    isDateUnavailable,
    formatOpts
  ]);
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value,
    builtinValidation
  });
  let isValueInvalid = validation.displayValidation.isInvalid;
  let validationState = props.validationState || (isValueInvalid ? "invalid" : null);
  let commitValue = (date, time) => {
    setValue("timeZone" in time ? time.set((0, $d07e34cce18680fd$export$93522d1a439f3617)(date)) : (0, $d07e34cce18680fd$export$b21e0b124e224484)(date, time));
    setSelectedDate(null);
    setSelectedTime(null);
    validation.commitValidation();
  };
  let selectDate = (newValue) => {
    let shouldClose = typeof shouldCloseOnSelect === "function" ? shouldCloseOnSelect() : shouldCloseOnSelect;
    if (hasTime) {
      if (selectedTime || shouldClose) commitValue(newValue, selectedTime || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.defaultValue || props.placeholderValue));
      else setSelectedDate(newValue);
    } else {
      setValue(newValue);
      validation.commitValidation();
    }
    if (shouldClose) overlayState.setOpen(false);
  };
  let selectTime = (newValue) => {
    if (selectedDate && newValue) commitValue(selectedDate, newValue);
    else setSelectedTime(newValue);
  };
  return {
    ...validation,
    value,
    defaultValue: props.defaultValue ?? initialValue,
    setValue,
    dateValue: selectedDate,
    timeValue: selectedTime,
    setDateValue: selectDate,
    setTimeValue: selectTime,
    granularity,
    hasTime,
    ...overlayState,
    setOpen(isOpen) {
      if (!isOpen && !value && selectedDate && hasTime) commitValue(selectedDate, selectedTime || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.defaultValue || props.placeholderValue));
      overlayState.setOpen(isOpen);
    },
    validationState,
    isInvalid: isValueInvalid,
    formatValue(locale, fieldOptions) {
      if (!dateValue) return "";
      let formatOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)(fieldOptions, formatOpts);
      let formatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, formatOptions);
      return formatter.format(dateValue);
    },
    getDateFormatter(locale, formatOptions) {
      let newOptions = {
        ...formatOpts,
        ...formatOptions
      };
      let newFormatOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)({}, newOptions);
      return new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, newFormatOptions);
    }
  };
}

// node_modules/react-stately/dist/private/datepicker/useDateRangePickerState.mjs
var import_react25 = __toESM(require_react(), 1);
function $6de3e3f1a7663217$export$e50a61c1de9f574(props) {
  let overlayState = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)(props);
  let [controlledValue, setControlledValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue || null, props.onChange);
  let [initialValue] = (0, import_react25.useState)(controlledValue);
  let [placeholderValue, setPlaceholderValue] = (0, import_react25.useState)(() => controlledValue || {
    start: null,
    end: null
  });
  if (controlledValue == null && placeholderValue.start && placeholderValue.end) {
    placeholderValue = {
      start: null,
      end: null
    };
    setPlaceholderValue(placeholderValue);
  }
  let value = controlledValue || placeholderValue;
  let setValue = (newValue) => {
    value = newValue || {
      start: null,
      end: null
    };
    setPlaceholderValue(value);
    if ($6de3e3f1a7663217$var$isCompleteRange(value)) setControlledValue(value);
    else setControlledValue(null);
  };
  let v = value?.start || value?.end || props.placeholderValue || null;
  let [granularity, defaultTimeZone] = (0, $8b141f2f71e88f85$export$2440da353cedad43)(v, props.granularity);
  let hasTime = granularity === "hour" || granularity === "minute" || granularity === "second";
  let shouldCloseOnSelect = props.shouldCloseOnSelect ?? true;
  let [dateRange, setSelectedDateRange] = (0, import_react25.useState)(null);
  let [timeRange, setSelectedTimeRange] = (0, import_react25.useState)(null);
  if (value && $6de3e3f1a7663217$var$isCompleteRange(value)) {
    dateRange = value;
    if ("hour" in value.start) timeRange = value;
  }
  let commitValue = (dateRange2, timeRange2) => {
    setValue({
      start: "timeZone" in timeRange2.start ? timeRange2.start.set((0, $d07e34cce18680fd$export$93522d1a439f3617)(dateRange2.start)) : (0, $d07e34cce18680fd$export$b21e0b124e224484)(dateRange2.start, timeRange2.start),
      end: "timeZone" in timeRange2.end ? timeRange2.end.set((0, $d07e34cce18680fd$export$93522d1a439f3617)(dateRange2.end)) : (0, $d07e34cce18680fd$export$b21e0b124e224484)(dateRange2.end, timeRange2.end)
    });
    setSelectedDateRange(null);
    setSelectedTimeRange(null);
    validation.commitValidation();
  };
  let setDateRange = (range) => {
    let shouldClose = typeof shouldCloseOnSelect === "function" ? shouldCloseOnSelect() : shouldCloseOnSelect;
    if (hasTime) {
      if ($6de3e3f1a7663217$var$isCompleteRange(range) && (shouldClose || timeRange?.start && timeRange?.end)) commitValue(range, {
        start: timeRange?.start || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.placeholderValue),
        end: timeRange?.end || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.placeholderValue)
      });
      else setSelectedDateRange(range);
    } else if ($6de3e3f1a7663217$var$isCompleteRange(range)) {
      setValue(range);
      validation.commitValidation();
    } else setSelectedDateRange(range);
    if (shouldClose) overlayState.setOpen(false);
  };
  let setTimeRange = (range) => {
    if ($6de3e3f1a7663217$var$isCompleteRange(dateRange) && $6de3e3f1a7663217$var$isCompleteRange(range)) commitValue(dateRange, range);
    else setSelectedTimeRange(range);
  };
  let showEra = value?.start?.calendar.identifier === "gregory" && value.start.era === "BC" || value?.end?.calendar.identifier === "gregory" && value.end.era === "BC";
  let formatOpts = (0, import_react25.useMemo)(() => ({
    granularity,
    timeZone: defaultTimeZone,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    shouldForceLeadingZeros: props.shouldForceLeadingZeros,
    showEra
  }), [
    granularity,
    props.hourCycle,
    props.shouldForceLeadingZeros,
    defaultTimeZone,
    props.hideTimeZone,
    showEra
  ]);
  let { minValue, maxValue, isDateUnavailable } = props;
  let builtinValidation = (0, import_react25.useMemo)(() => (0, $8b141f2f71e88f85$export$80ff8fc0ae339c13)(value, minValue, maxValue, isDateUnavailable ? (date) => isDateUnavailable(date, null) : void 0, formatOpts), [
    value,
    minValue,
    maxValue,
    isDateUnavailable,
    formatOpts
  ]);
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: controlledValue,
    name: (0, import_react25.useMemo)(() => [
      props.startName,
      props.endName
    ].filter((n) => n != null), [
      props.startName,
      props.endName
    ]),
    builtinValidation
  });
  let isValueInvalid = validation.displayValidation.isInvalid;
  let validationState = props.validationState || (isValueInvalid ? "invalid" : null);
  return {
    ...validation,
    value,
    defaultValue: props.defaultValue ?? initialValue,
    setValue,
    dateRange,
    timeRange,
    granularity,
    hasTime,
    setDate(part, date) {
      if (part === "start") setDateRange({
        start: date,
        end: dateRange?.end ?? null
      });
      else setDateRange({
        start: dateRange?.start ?? null,
        end: date
      });
    },
    setTime(part, time) {
      if (part === "start") setTimeRange({
        start: time,
        end: timeRange?.end ?? null
      });
      else setTimeRange({
        start: timeRange?.start ?? null,
        end: time
      });
    },
    setDateTime(part, dateTime) {
      if (part === "start") setValue({
        start: dateTime,
        end: value?.end ?? null
      });
      else setValue({
        start: value?.start ?? null,
        end: dateTime
      });
    },
    setDateRange,
    setTimeRange,
    ...overlayState,
    setOpen(isOpen) {
      if (!isOpen && !(value?.start && value?.end) && $6de3e3f1a7663217$var$isCompleteRange(dateRange) && hasTime) commitValue(dateRange, {
        start: timeRange?.start || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.placeholderValue),
        end: timeRange?.end || (0, $8b141f2f71e88f85$export$c5221a78ef73c5e9)(props.placeholderValue)
      });
      overlayState.setOpen(isOpen);
    },
    validationState,
    isInvalid: isValueInvalid,
    formatValue(locale, fieldOptions) {
      if (!value || !value.start || !value.end) return null;
      let startTimeZone = "timeZone" in value.start ? value.start.timeZone : void 0;
      let startGranularity = props.granularity || (value.start && "minute" in value.start ? "minute" : "day");
      let endTimeZone = "timeZone" in value.end ? value.end.timeZone : void 0;
      let endGranularity = props.granularity || (value.end && "minute" in value.end ? "minute" : "day");
      let startOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)(fieldOptions, {
        granularity: startGranularity,
        timeZone: startTimeZone,
        hideTimeZone: props.hideTimeZone,
        hourCycle: props.hourCycle,
        showEra: value.start.calendar.identifier === "gregory" && value.start.era === "BC" || value.end.calendar.identifier === "gregory" && value.end.era === "BC"
      });
      let startDate = value.start.toDate(startTimeZone || "UTC");
      let endDate = value.end.toDate(endTimeZone || "UTC");
      let startFormatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, startOptions);
      let endFormatter;
      if (startTimeZone === endTimeZone && startGranularity === endGranularity && value.start.compare(value.end) !== 0) {
        try {
          let parts = startFormatter.formatRangeToParts(startDate, endDate);
          let separatorIndex = -1;
          for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (part.source === "shared" && part.type === "literal") separatorIndex = i;
            else if (part.source === "endRange") break;
          }
          let start = "";
          let end = "";
          for (let i = 0; i < parts.length; i++) {
            if (i < separatorIndex) start += parts[i].value;
            else if (i > separatorIndex) end += parts[i].value;
          }
          return {
            start,
            end
          };
        } catch {
        }
        endFormatter = startFormatter;
      } else {
        let endOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)(fieldOptions, {
          granularity: endGranularity,
          timeZone: endTimeZone,
          hideTimeZone: props.hideTimeZone,
          hourCycle: props.hourCycle
        });
        endFormatter = new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, endOptions);
      }
      return {
        start: startFormatter.format(startDate),
        end: endFormatter.format(endDate)
      };
    },
    getDateFormatter(locale, formatOptions) {
      let newOptions = {
        ...formatOpts,
        ...formatOptions
      };
      let newFormatOptions = (0, $8b141f2f71e88f85$export$7e319ea407e63bc0)({}, newOptions);
      return new (0, $12a3c853105e5a70$export$ad991b66133851cf)(locale, newFormatOptions);
    }
  };
}
function $6de3e3f1a7663217$var$isCompleteRange(value) {
  return value?.start != null && value.end != null;
}

// node_modules/react-stately/dist/private/disclosure/useDisclosureGroupState.mjs
var import_react26 = __toESM(require_react(), 1);
function $29a18fa139197b5c$export$f36461af0ef4707d(props) {
  let { allowsMultipleExpanded = false, isDisabled = false } = props;
  let [expandedKeys, setExpandedKeys] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)((0, import_react26.useMemo)(() => props.expandedKeys ? new Set(props.expandedKeys) : void 0, [
    props.expandedKeys
  ]), (0, import_react26.useMemo)(() => props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : /* @__PURE__ */ new Set(), [
    props.defaultExpandedKeys
  ]), props.onExpandedChange);
  (0, import_react26.useEffect)(() => {
    if (!allowsMultipleExpanded && expandedKeys.size > 1) {
      let firstKey = expandedKeys.values().next().value;
      if (firstKey != null) setExpandedKeys(/* @__PURE__ */ new Set([
        firstKey
      ]));
    }
  });
  return {
    allowsMultipleExpanded,
    isDisabled,
    expandedKeys,
    setExpandedKeys,
    toggleKey(key) {
      let keys;
      if (allowsMultipleExpanded) {
        keys = new Set(expandedKeys);
        if (keys.has(key)) keys.delete(key);
        else keys.add(key);
      } else keys = new Set(expandedKeys.has(key) ? [] : [
        key
      ]);
      setExpandedKeys(keys);
    }
  };
}

// node_modules/react-stately/dist/private/disclosure/useDisclosureState.mjs
var import_react27 = __toESM(require_react(), 1);
function $086b1fd51041276f$export$3fcbf6e4407997e0(props) {
  let [isExpanded, setExpanded] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.isExpanded, props.defaultExpanded || false, props.onExpandedChange);
  const expand = (0, import_react27.useCallback)(() => {
    setExpanded(true);
  }, [
    setExpanded
  ]);
  const collapse = (0, import_react27.useCallback)(() => {
    setExpanded(false);
  }, [
    setExpanded
  ]);
  const toggle = (0, import_react27.useCallback)(() => {
    setExpanded(!isExpanded);
  }, [
    setExpanded,
    isExpanded
  ]);
  return {
    isExpanded,
    setExpanded,
    expand,
    collapse,
    toggle
  };
}

// node_modules/react-stately/dist/private/tooltip/useTooltipTriggerState.mjs
var import_react28 = __toESM(require_react(), 1);
var $3834487504f4fc00$var$TOOLTIP_DELAY = 1500;
var $3834487504f4fc00$var$TOOLTIP_COOLDOWN = 500;
var $3834487504f4fc00$var$tooltips = {};
var $3834487504f4fc00$var$tooltipId = 0;
var $3834487504f4fc00$var$globalWarmedUp = false;
var $3834487504f4fc00$var$globalWarmUpTimeout = null;
var $3834487504f4fc00$var$globalCooldownTimeout = null;
function $3834487504f4fc00$export$4d40659c25ecb50b(props = {}) {
  let { delay = $3834487504f4fc00$var$TOOLTIP_DELAY, closeDelay = $3834487504f4fc00$var$TOOLTIP_COOLDOWN } = props;
  let { isOpen, open, close } = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)(props);
  let [shouldSkipAnimation, setIsInstant] = (0, import_react28.useState)(false);
  let id = (0, import_react28.useMemo)(() => `${++$3834487504f4fc00$var$tooltipId}`, []);
  let closeTimeout = (0, import_react28.useRef)(null);
  let closeCallback = (0, import_react28.useRef)(close);
  let ensureTooltipEntry = () => {
    $3834487504f4fc00$var$tooltips[id] = hideTooltip;
  };
  let closeOpenTooltips = () => {
    for (let hideTooltipId in $3834487504f4fc00$var$tooltips) if (hideTooltipId !== id) {
      $3834487504f4fc00$var$tooltips[hideTooltipId](true, true);
      delete $3834487504f4fc00$var$tooltips[hideTooltipId];
    }
  };
  let showTooltip = (instant) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = null;
    closeOpenTooltips();
    ensureTooltipEntry();
    setIsInstant(!!instant);
    $3834487504f4fc00$var$globalWarmedUp = true;
    open();
    if ($3834487504f4fc00$var$globalWarmUpTimeout) {
      clearTimeout($3834487504f4fc00$var$globalWarmUpTimeout);
      $3834487504f4fc00$var$globalWarmUpTimeout = null;
    }
    if ($3834487504f4fc00$var$globalCooldownTimeout) {
      clearTimeout($3834487504f4fc00$var$globalCooldownTimeout);
      $3834487504f4fc00$var$globalCooldownTimeout = null;
    }
  };
  let hideTooltip = (immediate, instant) => {
    setIsInstant(!!instant);
    if (immediate || closeDelay <= 0) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
      closeCallback.current();
    } else if (!closeTimeout.current) closeTimeout.current = setTimeout(() => {
      closeTimeout.current = null;
      closeCallback.current();
    }, closeDelay);
    if ($3834487504f4fc00$var$globalWarmUpTimeout) {
      clearTimeout($3834487504f4fc00$var$globalWarmUpTimeout);
      $3834487504f4fc00$var$globalWarmUpTimeout = null;
    }
    if ($3834487504f4fc00$var$globalWarmedUp) {
      if ($3834487504f4fc00$var$globalCooldownTimeout) clearTimeout($3834487504f4fc00$var$globalCooldownTimeout);
      $3834487504f4fc00$var$globalCooldownTimeout = setTimeout(() => {
        delete $3834487504f4fc00$var$tooltips[id];
        $3834487504f4fc00$var$globalCooldownTimeout = null;
        $3834487504f4fc00$var$globalWarmedUp = false;
      }, Math.max($3834487504f4fc00$var$TOOLTIP_COOLDOWN, closeDelay));
    }
  };
  let warmupTooltip = () => {
    closeOpenTooltips();
    ensureTooltipEntry();
    if (!isOpen && !$3834487504f4fc00$var$globalWarmedUp) {
      if ($3834487504f4fc00$var$globalWarmUpTimeout) clearTimeout($3834487504f4fc00$var$globalWarmUpTimeout);
      $3834487504f4fc00$var$globalWarmUpTimeout = setTimeout(() => {
        $3834487504f4fc00$var$globalWarmUpTimeout = null;
        $3834487504f4fc00$var$globalWarmedUp = true;
        showTooltip(false);
      }, delay);
    } else if (!isOpen)
      showTooltip(true);
  };
  (0, import_react28.useEffect)(() => {
    closeCallback.current = close;
  }, [
    close
  ]);
  (0, import_react28.useEffect)(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      let tooltip = $3834487504f4fc00$var$tooltips[id];
      if (tooltip) delete $3834487504f4fc00$var$tooltips[id];
    };
  }, [
    id
  ]);
  return {
    isOpen,
    shouldSkipAnimation,
    open: (immediate) => {
      if (!immediate && delay > 0 && !closeTimeout.current) warmupTooltip();
      else
        showTooltip($3834487504f4fc00$var$globalWarmedUp);
    },
    close: hideTooltip
  };
}

// node_modules/react-stately/dist/private/radio/useRadioGroupState.mjs
var import_react29 = __toESM(require_react(), 1);
var $384704861d32dbed$var$instance = Math.round(Math.random() * 1e10);
var $384704861d32dbed$var$i = 0;
function $384704861d32dbed$export$bca9d026f8e704eb(props) {
  let name = (0, import_react29.useMemo)(() => props.name || `radio-group-${$384704861d32dbed$var$instance}-${++$384704861d32dbed$var$i}`, [
    props.name
  ]);
  let [selectedValue, setSelected] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.value, props.defaultValue ?? null, props.onChange);
  let [initialValue] = (0, import_react29.useState)(selectedValue);
  let [lastFocusedValue, setLastFocusedValue] = (0, import_react29.useState)(null);
  let validation = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: selectedValue
  });
  let setSelectedValue = (value) => {
    if (!props.isReadOnly && !props.isDisabled) {
      setSelected(value);
      validation.commitValidation();
    }
  };
  let isInvalid = validation.displayValidation.isInvalid;
  return {
    ...validation,
    name,
    selectedValue,
    defaultSelectedValue: props.value !== void 0 ? initialValue : props.defaultValue ?? null,
    setSelectedValue,
    lastFocusedValue,
    setLastFocusedValue,
    isDisabled: props.isDisabled || false,
    isReadOnly: props.isReadOnly || false,
    isRequired: props.isRequired || false,
    validationState: props.validationState || (isInvalid ? "invalid" : null),
    isInvalid
  };
}

// node_modules/react-stately/dist/private/searchfield/useSearchFieldState.mjs
function $56baeede9f35e022$export$3f8be18b0f41eaf2(props) {
  let [value, setValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)($56baeede9f35e022$var$toString(props.value), $56baeede9f35e022$var$toString(props.defaultValue) || "", props.onChange);
  return {
    value,
    setValue
  };
}
function $56baeede9f35e022$var$toString(val) {
  if (val == null) return;
  return val.toString();
}

// node_modules/react-stately/dist/private/select/useSelectState.mjs
var import_react30 = __toESM(require_react(), 1);
function $29256f53a2edafe9$export$5159ec8b34d4ec12(props) {
  let { selectionMode = "single", shouldCloseOnSelect = selectionMode === "single" } = props;
  let triggerState = (0, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6)(props);
  let [focusStrategy, setFocusStrategy] = (0, import_react30.useState)(null);
  let defaultValue = (0, import_react30.useMemo)(() => {
    return props.defaultValue !== void 0 ? props.defaultValue : selectionMode === "single" ? props.defaultSelectedKey ?? null : [];
  }, [
    props.defaultValue,
    props.defaultSelectedKey,
    selectionMode
  ]);
  let value = (0, import_react30.useMemo)(() => {
    return props.value !== void 0 ? props.value : selectionMode === "single" ? props.selectedKey : void 0;
  }, [
    props.value,
    props.selectedKey,
    selectionMode
  ]);
  let [controlledValue, setControlledValue] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(value, defaultValue, props.onChange);
  let displayValue = selectionMode === "single" && Array.isArray(controlledValue) ? controlledValue[0] : controlledValue;
  let setValue = (value2) => {
    if (selectionMode === "single") {
      let key = Array.isArray(value2) ? value2[0] ?? null : value2;
      setControlledValue(key);
      if (key !== displayValue) props.onSelectionChange?.(key);
    } else {
      let keys = [];
      if (Array.isArray(value2)) keys = value2;
      else if (value2 != null) keys = [
        value2
      ];
      setControlledValue(keys);
    }
  };
  let listState = (0, $b14b6f590b50af39$export$2f645645f7bca764)({
    ...props,
    selectionMode,
    disallowEmptySelection: selectionMode === "single",
    allowDuplicateSelectionEvents: true,
    selectedKeys: (0, import_react30.useMemo)(() => $29256f53a2edafe9$var$convertValue(displayValue), [
      displayValue
    ]),
    onSelectionChange: (keys) => {
      if (keys === "all") return;
      if (selectionMode === "single") {
        let key = keys.values().next().value ?? null;
        setValue(key);
      } else setValue([
        ...keys
      ]);
      if (shouldCloseOnSelect) triggerState.close();
      validationState.commitValidation();
    }
  });
  let selectedKey = listState.selectionManager.firstSelectedKey;
  let selectedItems = (0, import_react30.useMemo)(() => {
    return [
      ...listState.selectionManager.selectedKeys
    ].map((key) => listState.collection.getItem(key)).filter((item) => item != null);
  }, [
    listState.selectionManager.selectedKeys,
    listState.collection
  ]);
  let validationState = (0, $fd2148440a13ec26$export$fc1a364ae1f3ff10)({
    ...props,
    value: Array.isArray(displayValue) && displayValue.length === 0 ? null : displayValue
  });
  let [isFocused, setFocused] = (0, import_react30.useState)(false);
  let [initialValue] = (0, import_react30.useState)(displayValue);
  return {
    ...validationState,
    ...listState,
    ...triggerState,
    value: displayValue,
    defaultValue: defaultValue ?? initialValue,
    setValue,
    selectedKey,
    setSelectedKey: setValue,
    selectedItem: selectedItems[0] ?? null,
    selectedItems,
    defaultSelectedKey: props.defaultSelectedKey ?? (props.selectionMode === "single" ? initialValue : null),
    focusStrategy,
    open(focusStrategy2 = null) {
      if (listState.collection.size !== 0 || props.allowsEmptyCollection) {
        setFocusStrategy(focusStrategy2);
        triggerState.open();
      }
    },
    toggle(focusStrategy2 = null) {
      if (listState.collection.size !== 0 || props.allowsEmptyCollection) {
        setFocusStrategy(focusStrategy2);
        triggerState.toggle();
      }
    },
    isFocused,
    setFocused
  };
}
function $29256f53a2edafe9$var$convertValue(value) {
  if (value === void 0) return void 0;
  if (value === null) return [];
  return Array.isArray(value) ? value : [
    value
  ];
}

// node_modules/react-stately/dist/private/table/TableUtils.mjs
function $56195eeda89edca1$export$1994a077b98ee0d5(width) {
  return width != null && (!isNaN(width) || String(width).match(/^(\d+)(?=%$)/) !== null);
}
function $56195eeda89edca1$export$9078bad4c3934604(width) {
  if (!width || typeof width === "number") return 1;
  let match = width.match(/^(.+)(?=fr$)/);
  if (!match) {
    if (true) console.warn(`width: ${width} is not a supported format, width should be a number (ex. 150), percentage (ex. '50%') or fr unit (ex. '2fr')`, "defaulting to '1fr'");
    return 1;
  }
  return parseFloat(match[0]);
}
function $56195eeda89edca1$export$7bbad27896f7ae9f(width, tableWidth) {
  if (typeof width === "string") {
    let match = width.match(/^(\d+)(?=%$)/);
    if (!match) throw new Error("Only percentages or numbers are supported for static column widths");
    return tableWidth * (parseFloat(match[0]) / 100);
  }
  return width;
}
function $56195eeda89edca1$export$59185c62a7544aa0(maxWidth, tableWidth) {
  return maxWidth != null ? $56195eeda89edca1$export$7bbad27896f7ae9f(maxWidth, tableWidth) : Number.MAX_SAFE_INTEGER;
}
function $56195eeda89edca1$export$f556054ce4358701(minWidth, tableWidth) {
  return minWidth != null ? $56195eeda89edca1$export$7bbad27896f7ae9f(minWidth, tableWidth) : 0;
}
function $56195eeda89edca1$export$55d50dc687385491(availableWidth, columns, changedColumns, getDefaultWidth, getDefaultMinWidth) {
  let originalWidth = availableWidth;
  let flooredWidth = Math.floor(availableWidth);
  let hasFractionalWidth = availableWidth - flooredWidth > 0;
  availableWidth = flooredWidth;
  let hasNonFrozenItems = false;
  let flexItems = columns.map((column, index) => {
    let width = changedColumns.get(column.key) != null ? changedColumns.get(column.key) ?? "1fr" : column.width ?? column.defaultWidth ?? getDefaultWidth?.(index) ?? "1fr";
    let frozen = false;
    let baseSize = 0;
    let flex = 0;
    let targetMainSize = 0;
    if ($56195eeda89edca1$export$1994a077b98ee0d5(width)) {
      baseSize = $56195eeda89edca1$export$7bbad27896f7ae9f(width, availableWidth);
      frozen = true;
    } else {
      flex = $56195eeda89edca1$export$9078bad4c3934604(width);
      if (flex <= 0) frozen = true;
    }
    let min = $56195eeda89edca1$export$f556054ce4358701(column.minWidth ?? getDefaultMinWidth?.(index) ?? 0, availableWidth);
    let max = $56195eeda89edca1$export$59185c62a7544aa0(column.maxWidth, availableWidth);
    let hypotheticalMainSize = Math.max(min, Math.min(baseSize, max));
    if (frozen) targetMainSize = hypotheticalMainSize;
    else if (baseSize > hypotheticalMainSize) {
      frozen = true;
      targetMainSize = hypotheticalMainSize;
    }
    if (!frozen) hasNonFrozenItems = true;
    return {
      frozen,
      baseSize,
      hypotheticalMainSize,
      min,
      max,
      flex,
      targetMainSize,
      violation: 0
    };
  });
  while (hasNonFrozenItems) {
    let usedWidth = 0;
    let flexFactors = 0;
    flexItems.forEach((item) => {
      if (item.frozen) usedWidth += item.targetMainSize;
      else {
        usedWidth += item.baseSize;
        flexFactors += item.flex;
      }
    });
    let remainingFreeSpace = availableWidth - usedWidth;
    if (remainingFreeSpace > 0) flexItems.forEach((item) => {
      if (!item.frozen) {
        let ratio = item.flex / flexFactors;
        item.targetMainSize = item.baseSize + ratio * remainingFreeSpace;
      }
    });
    let totalViolation = 0;
    flexItems.forEach((item) => {
      item.violation = 0;
      if (!item.frozen) {
        let { min, max, targetMainSize } = item;
        item.targetMainSize = Math.max(min, Math.min(targetMainSize, max));
        item.violation = item.targetMainSize - targetMainSize;
        totalViolation += item.violation;
      }
    });
    hasNonFrozenItems = false;
    flexItems.forEach((item) => {
      if (totalViolation === 0 || Math.sign(totalViolation) === Math.sign(item.violation)) item.frozen = true;
      else if (!item.frozen) hasNonFrozenItems = true;
    });
  }
  let columnSizes = $56195eeda89edca1$var$cascadeRounding(flexItems);
  if (hasFractionalWidth && columnSizes.length > 0) {
    let tableFractionalWidth = originalWidth.toString().split(".")[1];
    let columnWidth = columnSizes[columnSizes.length - 1].toString();
    columnSizes[columnSizes.length - 1] = Number(columnWidth + "." + tableFractionalWidth);
  }
  return columnSizes;
}
function $56195eeda89edca1$var$cascadeRounding(flexItems) {
  let fpTotal = 0;
  let intTotal = 0;
  let roundedArray = [];
  flexItems.forEach(function(item) {
    let float = item.targetMainSize;
    let integer = Math.round(float + fpTotal) - intTotal;
    fpTotal += float;
    intTotal += integer;
    roundedArray.push(integer);
  });
  return roundedArray;
}

// node_modules/react-stately/dist/private/table/TableColumnLayout.mjs
var $245263de035f5da5$export$7ff77a162970b30e = class {
  constructor(options) {
    this.columnWidths = /* @__PURE__ */ new Map();
    this.columnMinWidths = /* @__PURE__ */ new Map();
    this.columnMaxWidths = /* @__PURE__ */ new Map();
    this.getDefaultWidth = options?.getDefaultWidth ?? (() => "1fr");
    this.getDefaultMinWidth = options?.getDefaultMinWidth ?? (() => 75);
  }
  /**
  * Takes an array of columns and splits it into 2 maps of columns with controlled and columns with
  * uncontrolled widths.
  */
  splitColumnsIntoControlledAndUncontrolled(columns) {
    return columns.reduce((acc, col) => {
      if (col.props.width != null) acc[0].set(col.key, col);
      else acc[1].set(col.key, col);
      return acc;
    }, [
      /* @__PURE__ */ new Map(),
      /* @__PURE__ */ new Map()
    ]);
  }
  /** Takes uncontrolled and controlled widths and joins them into a single Map. */
  recombineColumns(columns, uncontrolledWidths, uncontrolledColumns, controlledColumns) {
    return new Map(columns.map((col) => {
      if (uncontrolledColumns.has(col.key)) return [
        col.key,
        uncontrolledWidths.get(col.key)
      ];
      else return [
        col.key,
        controlledColumns.get(col.key).props.width
      ];
    }));
  }
  /** Used to make an initial Map of the uncontrolled widths based on default widths. */
  getInitialUncontrolledWidths(uncontrolledColumns) {
    return new Map(Array.from(uncontrolledColumns).map(([key, col]) => [
      key,
      col.props.defaultWidth ?? this.getDefaultWidth?.(col) ?? "1fr"
    ]));
  }
  getColumnWidth(key) {
    return this.columnWidths.get(key) ?? 0;
  }
  getColumnMinWidth(key) {
    return this.columnMinWidths.get(key) ?? 0;
  }
  getColumnMaxWidth(key) {
    return this.columnMaxWidths.get(key) ?? 0;
  }
  resizeColumnWidth(collection, uncontrolledWidths, col, width) {
    let prevColumnWidths = this.columnWidths;
    let freeze = true;
    let newWidths = /* @__PURE__ */ new Map();
    width = Math.max(this.getColumnMinWidth(col), Math.min(this.getColumnMaxWidth(col), Math.floor(width)));
    collection.columns.forEach((column) => {
      if (column.key === col) {
        newWidths.set(column.key, width);
        freeze = false;
      } else if (freeze)
        newWidths.set(column.key, prevColumnWidths.get(column.key) ?? 0);
      else newWidths.set(column.key, column.props.width ?? uncontrolledWidths.get(column.key));
    });
    return newWidths;
  }
  buildColumnWidths(tableWidth, collection, widths) {
    this.columnWidths = /* @__PURE__ */ new Map();
    this.columnMinWidths = /* @__PURE__ */ new Map();
    this.columnMaxWidths = /* @__PURE__ */ new Map();
    let columnWidths = (0, $56195eeda89edca1$export$55d50dc687385491)(tableWidth, collection.columns.map((col) => ({
      ...col.props,
      key: col.key
    })), widths, (i) => this.getDefaultWidth(collection.columns[i]), (i) => this.getDefaultMinWidth(collection.columns[i]));
    columnWidths.forEach((width, index) => {
      let key = collection.columns[index].key;
      let column = collection.columns[index];
      this.columnWidths.set(key, width);
      this.columnMinWidths.set(key, (0, $56195eeda89edca1$export$f556054ce4358701)(column.props.minWidth ?? this.getDefaultMinWidth(column), tableWidth));
      this.columnMaxWidths.set(key, (0, $56195eeda89edca1$export$59185c62a7544aa0)(column.props.maxWidth, tableWidth));
    });
    return this.columnWidths;
  }
};

// node_modules/react-stately/dist/private/table/useTableColumnResizeState.mjs
var import_react31 = __toESM(require_react(), 1);
function $f6cebac1c03d2516$export$cb895dcf85db1319(props, state) {
  let { getDefaultWidth, getDefaultMinWidth, tableWidth = 0 } = props;
  let [resizingColumn, setResizingColumn] = (0, import_react31.useState)(null);
  let columnLayout = (0, import_react31.useMemo)(() => new (0, $245263de035f5da5$export$7ff77a162970b30e)({
    getDefaultWidth,
    getDefaultMinWidth
  }), [
    getDefaultWidth,
    getDefaultMinWidth
  ]);
  let [controlledColumns, uncontrolledColumns] = (0, import_react31.useMemo)(() => columnLayout.splitColumnsIntoControlledAndUncontrolled(state.collection.columns), [
    state.collection.columns,
    columnLayout
  ]);
  let [uncontrolledWidths, setUncontrolledWidths] = (0, import_react31.useState)(() => columnLayout.getInitialUncontrolledWidths(uncontrolledColumns));
  let [lastColumns, setLastColumns] = (0, import_react31.useState)(state.collection.columns);
  if (state.collection.columns !== lastColumns) {
    if (state.collection.columns.length !== lastColumns.length || state.collection.columns.some((c, i) => c.key !== lastColumns[i].key)) {
      let newUncontrolledWidths = columnLayout.getInitialUncontrolledWidths(uncontrolledColumns);
      setUncontrolledWidths(newUncontrolledWidths);
    }
    setLastColumns(state.collection.columns);
  }
  let colWidths = (0, import_react31.useMemo)(() => columnLayout.recombineColumns(state.collection.columns, uncontrolledWidths, uncontrolledColumns, controlledColumns), [
    state.collection.columns,
    uncontrolledWidths,
    uncontrolledColumns,
    controlledColumns,
    columnLayout
  ]);
  let startResize = (0, import_react31.useCallback)((key) => {
    setResizingColumn(key);
  }, [
    setResizingColumn
  ]);
  let updateResizedColumns = (0, import_react31.useCallback)((key, width) => {
    let newSizes = columnLayout.resizeColumnWidth(state.collection, uncontrolledWidths, key, width);
    let map = new Map(Array.from(uncontrolledColumns).map(([key2]) => [
      key2,
      newSizes.get(key2)
    ]));
    map.set(key, width);
    setUncontrolledWidths(map);
    return newSizes;
  }, [
    uncontrolledColumns,
    setUncontrolledWidths,
    columnLayout,
    state.collection,
    uncontrolledWidths
  ]);
  let endResize = (0, import_react31.useCallback)(() => {
    setResizingColumn(null);
  }, [
    setResizingColumn
  ]);
  let columnWidths = (0, import_react31.useMemo)(() => columnLayout.buildColumnWidths(tableWidth, state.collection, colWidths), [
    tableWidth,
    state.collection,
    colWidths,
    columnLayout
  ]);
  return (0, import_react31.useMemo)(() => ({
    resizingColumn,
    updateResizedColumns,
    startResize,
    endResize,
    getColumnWidth: (key) => columnLayout.getColumnWidth(key),
    getColumnMinWidth: (key) => columnLayout.getColumnMinWidth(key),
    getColumnMaxWidth: (key) => columnLayout.getColumnMaxWidth(key),
    tableState: state,
    columnWidths
  }), [
    columnLayout,
    columnWidths,
    resizingColumn,
    updateResizedColumns,
    startResize,
    endResize,
    state
  ]);
}

// node_modules/react-stately/dist/private/grid/useGridState.mjs
var import_react32 = __toESM(require_react(), 1);
function $183b79a1dd6664c1$export$4007ac09ff9c68ed(props) {
  let { collection, focusMode } = props;
  let selectionState = props.UNSAFE_selectionState || (0, $60f19cefd567a3e4$export$253fe78d46329472)(props);
  let disabledKeys = (0, import_react32.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let setFocusedKey = selectionState.setFocusedKey;
  selectionState.setFocusedKey = (key, child) => {
    if (focusMode === "cell" && key != null) {
      let item = collection.getItem(key);
      if (item?.type === "item") {
        let children = (0, $cd5ea4b915021f1d$export$1005530eda016c13)(item, collection);
        if (child === "last") key = (0, $cd5ea4b915021f1d$export$7475b2c64539e4cf)(children)?.key ?? null;
        else key = (0, $cd5ea4b915021f1d$export$fbdeaa6a76694f71)(children)?.key ?? null;
      }
    }
    setFocusedKey(key, child);
  };
  let selectionManager = (0, import_react32.useMemo)(() => new (0, $4a07ac835f260f78$export$6c8a5aaad13c9852)(collection, selectionState), [
    collection,
    selectionState
  ]);
  const cachedCollection = (0, import_react32.useRef)(null);
  (0, import_react32.useEffect)(() => {
    if (selectionState.focusedKey != null && cachedCollection.current && !collection.getItem(selectionState.focusedKey)) {
      const node = cachedCollection.current.getItem(selectionState.focusedKey);
      const parentNode = node?.parentKey != null && (node.type === "cell" || node.type === "rowheader" || node.type === "column") ? cachedCollection.current.getItem(node.parentKey) : node;
      if (!parentNode) {
        selectionState.setFocusedKey(null);
        return;
      }
      const cachedRows = cachedCollection.current.rows;
      const rows = collection.rows;
      const diff = cachedRows.length - rows.length;
      let index = Math.min(diff > 1 ? Math.max(parentNode.index - diff + 1, 0) : parentNode.index, rows.length - 1);
      let newRow = null;
      for (let i = Math.max(0, index); i < rows.length; i++) if (!selectionManager.isDisabled(rows[i].key) && rows[i].type !== "headerrow") {
        newRow = rows[i];
        break;
      }
      if (newRow === null) {
        for (let i = index - 1; i >= 0; i--) if (!selectionManager.isDisabled(rows[i].key) && rows[i].type !== "headerrow") {
          newRow = rows[i];
          break;
        }
      }
      if (newRow) {
        const childNodes = newRow.hasChildNodes ? [
          ...(0, $cd5ea4b915021f1d$export$1005530eda016c13)(newRow, collection)
        ] : [];
        const keyToFocus = newRow.hasChildNodes && parentNode !== node && node && node.index < childNodes.length ? childNodes[node.index].key : newRow.key;
        selectionState.setFocusedKey(keyToFocus);
      } else selectionState.setFocusedKey(null);
    }
    cachedCollection.current = collection;
  }, [
    collection,
    selectionManager,
    selectionState,
    selectionState.focusedKey
  ]);
  return {
    collection,
    disabledKeys,
    isKeyboardNavigationDisabled: false,
    selectionManager
  };
}

// node_modules/react-stately/dist/private/grid/GridCollection.mjs
var $22f4441660dfbf05$export$de3fdf6493c353d = class {
  constructor(opts) {
    this.keyMap = /* @__PURE__ */ new Map();
    this.keyMap = /* @__PURE__ */ new Map();
    this.columnCount = opts?.columnCount;
    this.rows = [];
    let visit = (node) => {
      let prevNode = this.keyMap.get(node.key);
      if (opts.visitNode) node = opts.visitNode(node);
      this.keyMap.set(node.key, node);
      let childKeys = /* @__PURE__ */ new Set();
      let last2 = null;
      let rowHasCellWithColSpan = false;
      if (node.type === "item") {
        for (let child of node.childNodes) if (child.props?.colSpan !== void 0) {
          rowHasCellWithColSpan = true;
          break;
        }
      }
      for (let child of node.childNodes) {
        if (child.type === "cell" && rowHasCellWithColSpan) {
          child.colspan = child.props?.colSpan;
          child.colSpan = child.props?.colSpan;
          child.colIndex = !last2 ? child.index : (last2.colIndex ?? last2.index) + (last2.colSpan ?? 1);
        }
        if (child.type === "cell" && child.parentKey == null)
          child.parentKey = node.key;
        childKeys.add(child.key);
        if (last2) {
          last2.nextKey = child.key;
          child.prevKey = last2.key;
        } else child.prevKey = null;
        visit(child);
        last2 = child;
      }
      if (last2) last2.nextKey = null;
      if (prevNode) {
        for (let child of prevNode.childNodes) if (!childKeys.has(child.key)) remove(child);
      }
    };
    let remove = (node) => {
      this.keyMap.delete(node.key);
      for (let child of node.childNodes) if (this.keyMap.get(child.key) === child) remove(child);
    };
    let last = null;
    for (let [i, node] of opts.items.entries()) {
      let rowNode = {
        ...node,
        level: node.level ?? 0,
        key: node.key ?? "row-" + i,
        type: node.type ?? "row",
        value: node.value ?? null,
        hasChildNodes: true,
        childNodes: [
          ...node.childNodes
        ],
        rendered: node.rendered,
        textValue: node.textValue ?? "",
        index: node.index ?? i
      };
      if (last) {
        last.nextKey = rowNode.key;
        rowNode.prevKey = last.key;
      } else rowNode.prevKey = null;
      this.rows.push(rowNode);
      visit(rowNode);
      last = rowNode;
    }
    if (last) last.nextKey = null;
  }
  *[Symbol.iterator]() {
    yield* [
      ...this.rows
    ];
  }
  get size() {
    return [
      ...this.rows
    ].length;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey ?? null : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey ?? null : null;
  }
  getFirstKey() {
    return [
      ...this.rows
    ][0]?.key;
  }
  getLastKey() {
    let rows = [
      ...this.rows
    ];
    return rows[rows.length - 1]?.key;
  }
  getItem(key) {
    return this.keyMap.get(key) ?? null;
  }
  at(idx) {
    const keys = [
      ...this.getKeys()
    ];
    return this.getItem(keys[idx]);
  }
  getChildren(key) {
    let node = this.keyMap.get(key);
    return node?.childNodes || [];
  }
};

// node_modules/react-stately/dist/private/table/TableCollection.mjs
var $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY = "row-header-column-" + Math.random().toString(36).slice(2);
var $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY_DRAG = "row-header-column-" + Math.random().toString(36).slice(2);
while ($3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY === $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY_DRAG) $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY_DRAG = "row-header-column-" + Math.random().toString(36).slice(2);
function $3b14a8cc70843920$export$7c127db850d4e81e(keyMap, columnNodes) {
  if (columnNodes.length === 0) return [];
  let columns = [];
  let seen = /* @__PURE__ */ new Map();
  for (let column of columnNodes) {
    let parentKey = column.parentKey;
    let col = [
      column
    ];
    while (parentKey != null) {
      let parent = keyMap.get(parentKey);
      if (!parent) break;
      if (seen.has(parent)) {
        parent.colSpan ??= 0;
        parent.colSpan++;
        parent.colspan = parent.colSpan;
        let { column: column2, index } = seen.get(parent);
        if (index > col.length) break;
        for (let i2 = index; i2 < col.length; i2++) column2.splice(i2, 0, null);
        for (let i2 = col.length; i2 < column2.length; i2++)
          if (column2[i2] && seen.has(column2[i2])) seen.get(column2[i2]).index = i2;
      } else {
        parent.colSpan = 1;
        parent.colspan = 1;
        col.push(parent);
        seen.set(parent, {
          column: col,
          index: col.length - 1
        });
      }
      parentKey = parent.parentKey;
    }
    columns.push(col);
    column.index = columns.length - 1;
  }
  let maxLength = Math.max(...columns.map((c) => c.length));
  let headerRows = Array(maxLength).fill(0).map(() => []);
  let colIndex = 0;
  for (let column of columns) {
    let i2 = maxLength - 1;
    for (let item of column) {
      if (item) {
        let row = headerRows[i2];
        let rowLength = row.reduce((p, c) => p + (c.colSpan ?? 1), 0);
        if (rowLength < colIndex) {
          let placeholder = {
            type: "placeholder",
            key: "placeholder-" + item.key,
            colspan: colIndex - rowLength,
            colSpan: colIndex - rowLength,
            index: rowLength,
            value: null,
            rendered: null,
            level: i2,
            hasChildNodes: false,
            childNodes: [],
            textValue: ""
          };
          if (row.length > 0) {
            row[row.length - 1].nextKey = placeholder.key;
            placeholder.prevKey = row[row.length - 1].key;
          }
          row.push(placeholder);
        }
        if (row.length > 0) {
          row[row.length - 1].nextKey = item.key;
          item.prevKey = row[row.length - 1].key;
        }
        item.level = i2;
        item.colIndex = colIndex;
        row.push(item);
      }
      i2--;
    }
    colIndex++;
  }
  let i = 0;
  for (let row of headerRows) {
    let rowLength = row.reduce((p, c) => p + (c.colSpan ?? 1), 0);
    if (rowLength < columnNodes.length) {
      let placeholder = {
        type: "placeholder",
        key: "placeholder-" + row[row.length - 1].key,
        colSpan: columnNodes.length - rowLength,
        colspan: columnNodes.length - rowLength,
        index: rowLength,
        value: null,
        rendered: null,
        level: i,
        hasChildNodes: false,
        childNodes: [],
        textValue: "",
        prevKey: row[row.length - 1].key
      };
      row.push(placeholder);
    }
    i++;
  }
  return headerRows.map((childNodes, index) => {
    let row = {
      type: "headerrow",
      key: "headerrow-" + index,
      index,
      value: null,
      rendered: null,
      level: 0,
      hasChildNodes: true,
      childNodes,
      textValue: ""
    };
    return row;
  });
}
var $3b14a8cc70843920$export$596e1b2e2cf93690 = class extends (0, $22f4441660dfbf05$export$de3fdf6493c353d) {
  constructor(nodes, prev, opts) {
    let rowHeaderColumnKeys = /* @__PURE__ */ new Set();
    let body = null;
    let columns = [];
    if (opts?.showSelectionCheckboxes) {
      let rowHeaderColumn = {
        type: "column",
        key: $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY,
        value: null,
        textValue: "",
        level: 0,
        index: opts?.showDragButtons ? 1 : 0,
        hasChildNodes: false,
        rendered: null,
        childNodes: [],
        props: {
          isSelectionCell: true
        }
      };
      columns.unshift(rowHeaderColumn);
    }
    if (opts?.showDragButtons) {
      let rowHeaderColumn = {
        type: "column",
        key: $3b14a8cc70843920$var$ROW_HEADER_COLUMN_KEY_DRAG,
        value: null,
        textValue: "",
        level: 0,
        index: 0,
        hasChildNodes: false,
        rendered: null,
        childNodes: [],
        props: {
          isDragButtonCell: true
        }
      };
      columns.unshift(rowHeaderColumn);
    }
    let rows = [];
    let columnKeyMap = /* @__PURE__ */ new Map();
    let visit = (node) => {
      switch (node.type) {
        case "body":
          body = node;
          break;
        case "column":
          columnKeyMap.set(node.key, node);
          if (!node.hasChildNodes) {
            columns.push(node);
            if (node.props.isRowHeader) rowHeaderColumnKeys.add(node.key);
          }
          break;
        case "item":
          rows.push(node);
          return;
      }
      for (let child of node.childNodes) visit(child);
    };
    for (let node of nodes) visit(node);
    let headerRows = $3b14a8cc70843920$export$7c127db850d4e81e(columnKeyMap, columns);
    headerRows.forEach((row, i) => rows.splice(i, 0, row));
    super({
      columnCount: columns.length,
      items: rows,
      visitNode: (node) => {
        node.column = columns[node.index];
        return node;
      }
    }), this._size = 0;
    this.columns = columns;
    this.rowHeaderColumnKeys = rowHeaderColumnKeys;
    this.body = body;
    this.headerRows = headerRows;
    this._size = [
      ...body.childNodes
    ].length;
    if (this.rowHeaderColumnKeys.size === 0) {
      let col = this.columns.find((column) => !column.props?.isDragButtonCell && !column.props?.isSelectionCell);
      if (col) this.rowHeaderColumnKeys.add(col.key);
    }
  }
  *[Symbol.iterator]() {
    yield* this.body.childNodes;
  }
  get size() {
    return this._size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node?.prevKey ?? null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node?.nextKey ?? null;
  }
  getFirstKey() {
    return (0, $cd5ea4b915021f1d$export$fbdeaa6a76694f71)(this.body.childNodes)?.key ?? null;
  }
  getLastKey() {
    return (0, $cd5ea4b915021f1d$export$7475b2c64539e4cf)(this.body.childNodes)?.key ?? null;
  }
  getItem(key) {
    if (key === this.body.key) return this.body;
    return this.keyMap.get(key) ?? null;
  }
  at(idx) {
    const keys = [
      ...this.getKeys()
    ];
    return this.getItem(keys[idx]);
  }
  getChildren(key) {
    if (key === this.body.key) return this.body.childNodes;
    let node = this.getItem(key);
    if (node?.type === "item") return [
      ...node.childNodes
    ].filter((n) => n.type === "cell");
    return super.getChildren(key);
  }
  getTextValue(key) {
    let row = this.getItem(key);
    if (!row) return "";
    if (row.textValue) return row.textValue;
    let rowHeaderColumnKeys = this.rowHeaderColumnKeys;
    if (rowHeaderColumnKeys) {
      let text = [];
      for (let cell of row.childNodes) {
        let column = this.columns[cell.index];
        if (rowHeaderColumnKeys.has(column.key) && cell.textValue) text.push(cell.textValue);
        if (text.length === rowHeaderColumnKeys.size) break;
      }
      return text.join(" ");
    }
    return "";
  }
};

// node_modules/react-stately/dist/private/table/useTableState.mjs
var import_react33 = __toESM(require_react(), 1);
var $178a7f94e1b4b497$var$OPPOSITE_SORT_DIRECTION = {
  ascending: "descending",
  descending: "ascending"
};
function $178a7f94e1b4b497$export$907bcc6c48325fd6(props) {
  let [isKeyboardNavigationDisabled, setKeyboardNavigationDisabled] = (0, import_react33.useState)(false);
  let { selectionMode = "none", showSelectionCheckboxes, showDragButtons, treeColumn = null } = props;
  let context = (0, import_react33.useMemo)(
    () => ({
      showSelectionCheckboxes: showSelectionCheckboxes && selectionMode !== "none",
      showDragButtons,
      selectionMode,
      columns: []
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // oxlint-disable-next-line react/react-compiler, react-hooks/exhaustive-deps
    [
      props.children,
      showSelectionCheckboxes,
      selectionMode,
      showDragButtons
    ]
  );
  let collection = (0, $d03379b88399b8c5$export$6cd28814d92fa9c9)(props, (0, import_react33.useCallback)((nodes) => new (0, $3b14a8cc70843920$export$596e1b2e2cf93690)(nodes, null, context), [
    context
  ]), context);
  let { disabledKeys, selectionManager } = (0, $183b79a1dd6664c1$export$4007ac09ff9c68ed)({
    ...props,
    collection,
    disabledBehavior: props.disabledBehavior || "selection"
  });
  let [expandedKeys, setExpandedKeys] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.expandedKeys ? new Set(props.expandedKeys) : void 0, props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : /* @__PURE__ */ new Set(), props.onExpandedChange);
  return {
    collection,
    disabledKeys,
    selectionManager,
    showSelectionCheckboxes: props.showSelectionCheckboxes || false,
    sortDescriptor: props.sortDescriptor ?? null,
    isKeyboardNavigationDisabled: collection.size === 0 || isKeyboardNavigationDisabled,
    setKeyboardNavigationDisabled,
    sort(columnKey, direction) {
      props.onSortChange?.({
        column: columnKey,
        direction: direction ?? (props.sortDescriptor?.column === columnKey ? $178a7f94e1b4b497$var$OPPOSITE_SORT_DIRECTION[props.sortDescriptor.direction] : "ascending")
      });
    },
    expandedKeys,
    toggleKey(key) {
      setExpandedKeys((keys) => {
        let newKeys = new Set(keys);
        if (newKeys.has(key)) newKeys.delete(key);
        else newKeys.add(key);
        return newKeys;
      });
    },
    treeColumn
  };
}
function $178a7f94e1b4b497$export$31447e17397b15c2(state, filterFn) {
  let collection = (0, import_react33.useMemo)(() => filterFn ? state.collection.filter(filterFn) : state.collection, [
    state.collection,
    filterFn
  ]);
  let selectionManager = state.selectionManager.withCollection(collection);
  return {
    ...state,
    collection,
    selectionManager
  };
}

// node_modules/react-stately/dist/private/table/Cell.mjs
function $bf42fa5f8ac488ca$var$Cell(props) {
  return null;
}
$bf42fa5f8ac488ca$var$Cell.getCollectionNode = function* getCollectionNode(props) {
  let { children } = props;
  let textValue = props.textValue || (typeof children === "string" ? children : "") || props["aria-label"] || "";
  yield {
    type: "cell",
    props,
    rendered: children,
    textValue,
    "aria-label": props["aria-label"],
    hasChildNodes: false
  };
};
var $bf42fa5f8ac488ca$export$f6f0c3fe4ec306ea = $bf42fa5f8ac488ca$var$Cell;

// node_modules/react-stately/dist/private/table/Column.mjs
var import_react34 = __toESM(require_react(), 1);
function $6f60280352002908$var$Column(props) {
  return null;
}
$6f60280352002908$var$Column.getCollectionNode = function* getCollectionNode2(props, context) {
  let { title, children, childColumns } = props;
  let rendered = title || children;
  let textValue = props.textValue || (typeof rendered === "string" ? rendered : "") || props["aria-label"];
  let fullNodes = yield {
    type: "column",
    hasChildNodes: !!childColumns || !!title && (0, import_react34.default).Children.count(children) > 0,
    rendered,
    textValue,
    props,
    *childNodes() {
      if (childColumns) for (let child of childColumns) yield {
        type: "column",
        value: child
      };
      else if (title) {
        let childColumns2 = [];
        (0, import_react34.default).Children.forEach(children, (child) => {
          childColumns2.push({
            type: "column",
            element: child
          });
        });
        yield* childColumns2;
      }
    },
    shouldInvalidate(newContext) {
      updateContext(newContext);
      return false;
    }
  };
  let updateContext = (context2) => {
    for (let node of fullNodes) if (!node.hasChildNodes) context2.columns.push(node);
  };
  updateContext(context);
};
var $6f60280352002908$export$816b5d811295e6bc = $6f60280352002908$var$Column;

// node_modules/react-stately/dist/private/table/Row.mjs
var import_react35 = __toESM(require_react(), 1);
function $6d3258838ae978da$var$Row(props) {
  return null;
}
$6d3258838ae978da$var$Row.getCollectionNode = function* getCollectionNode3(props, context) {
  let { children, textValue, UNSTABLE_childItems } = props;
  yield {
    type: "item",
    props,
    textValue,
    "aria-label": props["aria-label"],
    hasChildNodes: true,
    *childNodes() {
      if (context.showDragButtons) yield {
        type: "cell",
        key: "header-drag",
        props: {
          isDragButtonCell: true
        }
      };
      if (context.showSelectionCheckboxes && context.selectionMode !== "none") yield {
        type: "cell",
        key: "header",
        props: {
          isSelectionCell: true
        }
      };
      if (typeof children === "function") {
        for (let column of context.columns) yield {
          type: "cell",
          element: children(column.key),
          key: column.key
          // this is combined with the row key by CollectionBuilder
        };
        if (UNSTABLE_childItems) for (let child of UNSTABLE_childItems)
          yield {
            type: "item",
            value: child
          };
      } else {
        let cells = [];
        let childRows = [];
        let columnCount = 0;
        (0, import_react35.default).Children.forEach(children, (node) => {
          if (node.type === $6d3258838ae978da$var$Row) {
            if (cells.length < context.columns.length) throw new Error("All of a Row's child Cells must be positioned before any child Rows.");
            childRows.push({
              type: "item",
              element: node
            });
          } else {
            cells.push({
              type: "cell",
              element: node
            });
            columnCount += node.props.colSpan ?? 1;
          }
        });
        if (columnCount !== context.columns.length) throw new Error(`Cell count must match column count. Found ${columnCount} cells and ${context.columns.length} columns.`);
        yield* cells;
        yield* childRows;
      }
    },
    shouldInvalidate(newContext) {
      return newContext.columns.length !== context.columns.length || newContext.columns.some((c, i) => c.key !== context.columns[i].key) || newContext.showSelectionCheckboxes !== context.showSelectionCheckboxes || newContext.showDragButtons !== context.showDragButtons || newContext.selectionMode !== context.selectionMode;
    }
  };
};
var $6d3258838ae978da$export$b59bdbef9ce70de2 = $6d3258838ae978da$var$Row;

// node_modules/react-stately/dist/private/table/TableBody.mjs
var import_react36 = __toESM(require_react(), 1);
function $bf2d76ed9fa06f12$var$TableBody(props) {
  return null;
}
$bf2d76ed9fa06f12$var$TableBody.getCollectionNode = function* getCollectionNode4(props) {
  let { children, items } = props;
  yield {
    type: "body",
    hasChildNodes: true,
    props,
    *childNodes() {
      if (typeof children === "function") {
        if (!items) throw new Error("props.children was a function but props.items is missing");
        for (let item of items) yield {
          type: "item",
          value: item,
          renderer: children
        };
      } else {
        let items2 = [];
        (0, import_react36.default).Children.forEach(children, (item) => {
          items2.push({
            type: "item",
            element: item
          });
        });
        yield* items2;
      }
    }
  };
};
var $bf2d76ed9fa06f12$export$76ccd210b9029917 = $bf2d76ed9fa06f12$var$TableBody;

// node_modules/react-stately/dist/private/table/TableHeader.mjs
var import_react37 = __toESM(require_react(), 1);
function $69c35e5665163bd0$var$TableHeader(props) {
  return null;
}
$69c35e5665163bd0$var$TableHeader.getCollectionNode = function* getCollectionNode5(props, context) {
  let { children, columns } = props;
  context.columns = [];
  if (typeof children === "function") {
    if (!columns) throw new Error("props.children was a function but props.columns is missing");
    for (let column of columns) yield {
      type: "column",
      value: column,
      renderer: children
    };
  } else {
    let columns2 = [];
    (0, import_react37.default).Children.forEach(children, (column) => {
      columns2.push({
        type: "column",
        element: column
      });
    });
    yield* columns2;
  }
};
var $69c35e5665163bd0$export$f850895b287ef28e = $69c35e5665163bd0$var$TableHeader;

// node_modules/react-stately/dist/private/virtualizer/Point.mjs
var $b88f793813fc795e$export$baf26146a414f24a = class _$b88f793813fc795e$export$baf26146a414f24a {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
  * Returns a copy of this point.
  */
  copy() {
    return new _$b88f793813fc795e$export$baf26146a414f24a(this.x, this.y);
  }
  /**
  * Checks if two points are equal.
  */
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
  /**
  * Returns true if this point is the origin.
  */
  isOrigin() {
    return this.x === 0 && this.y === 0;
  }
};

// node_modules/react-stately/dist/private/virtualizer/Rect.mjs
var $af827553fd3cf456$export$c79fc6492f3af13d = class _$af827553fd3cf456$export$c79fc6492f3af13d {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
  * The maximum x-coordinate in the rectangle.
  */
  get maxX() {
    return this.x + this.width;
  }
  /**
  * The maximum y-coordinate in the rectangle.
  */
  get maxY() {
    return this.y + this.height;
  }
  /**
  * The area of the rectangle.
  */
  get area() {
    return this.width * this.height;
  }
  /**
  * The top left corner of the rectangle.
  */
  get topLeft() {
    return new (0, $b88f793813fc795e$export$baf26146a414f24a)(this.x, this.y);
  }
  /**
  * The top right corner of the rectangle.
  */
  get topRight() {
    return new (0, $b88f793813fc795e$export$baf26146a414f24a)(this.maxX, this.y);
  }
  /**
  * The bottom left corner of the rectangle.
  */
  get bottomLeft() {
    return new (0, $b88f793813fc795e$export$baf26146a414f24a)(this.x, this.maxY);
  }
  /**
  * The bottom right corner of the rectangle.
  */
  get bottomRight() {
    return new (0, $b88f793813fc795e$export$baf26146a414f24a)(this.maxX, this.maxY);
  }
  /**
  * Returns whether this rectangle intersects another rectangle.
  *
  * @param rect - The rectangle to check.
  */
  intersects(rect) {
    let isTestEnv = false;
    return (isTestEnv || this.area > 0 && rect.area > 0) && this.x <= rect.x + rect.width && rect.x <= this.x + this.width && this.y <= rect.y + rect.height && rect.y <= this.y + this.height;
  }
  /**
  * Returns whether this rectangle fully contains another rectangle.
  *
  * @param rect - The rectangle to check.
  */
  containsRect(rect) {
    return this.x <= rect.x && this.y <= rect.y && this.maxX >= rect.maxX && this.maxY >= rect.maxY;
  }
  /**
  * Returns whether the rectangle contains the given point.
  *
  * @param point - The point to check.
  */
  containsPoint(point) {
    return this.x <= point.x && this.y <= point.y && this.maxX >= point.x && this.maxY >= point.y;
  }
  /**
  * Returns the first corner of this rectangle (from top to bottom, left to right)
  * that is contained in the given rectangle, or null of the rectangles do not intersect.
  *
  * @param rect - The rectangle to check.
  */
  getCornerInRect(rect) {
    for (let key of [
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight"
    ]) {
      if (rect.containsPoint(this[key])) return key;
    }
    return null;
  }
  equals(rect) {
    return rect.x === this.x && rect.y === this.y && rect.width === this.width && rect.height === this.height;
  }
  pointEquals(point) {
    return this.x === point.x && this.y === point.y;
  }
  sizeEquals(size) {
    return this.width === size.width && this.height === size.height;
  }
  /**
  * Returns the union of this Rect and another.
  */
  union(other) {
    let x = Math.min(this.x, other.x);
    let y = Math.min(this.y, other.y);
    let width = Math.max(this.maxX, other.maxX) - x;
    let height = Math.max(this.maxY, other.maxY) - y;
    return new _$af827553fd3cf456$export$c79fc6492f3af13d(x, y, width, height);
  }
  /**
  * Returns the intersection of this Rect with another.
  * If the rectangles do not intersect, an all zero Rect is returned.
  */
  intersection(other) {
    if (!this.intersects(other)) return new _$af827553fd3cf456$export$c79fc6492f3af13d(0, 0, 0, 0);
    let x = Math.max(this.x, other.x);
    let y = Math.max(this.y, other.y);
    return new _$af827553fd3cf456$export$c79fc6492f3af13d(x, y, Math.min(this.maxX, other.maxX) - x, Math.min(this.maxY, other.maxY) - y);
  }
  /**
  * Returns a copy of this rectangle.
  */
  copy() {
    return new _$af827553fd3cf456$export$c79fc6492f3af13d(this.x, this.y, this.width, this.height);
  }
};

// node_modules/react-stately/dist/private/virtualizer/Size.mjs
var $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec = class _$cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec {
  constructor(width = 0, height = 0) {
    this.width = Math.max(width, 0);
    this.height = Math.max(height, 0);
  }
  /**
  * Returns a copy of this size.
  */
  copy() {
    return new _$cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(this.width, this.height);
  }
  /**
  * Returns whether this size is equal to another one.
  */
  equals(other) {
    return this.width === other.width && this.height === other.height;
  }
  /**
  * The total area of the Size.
  */
  get area() {
    return this.width * this.height;
  }
};

// node_modules/react-stately/dist/private/virtualizer/ReusableView.mjs
var $6bbafa22c92cc056$var$KEY = 0;
var $6bbafa22c92cc056$export$1a5223887c560441 = class {
  constructor(virtualizer, viewType) {
    this.virtualizer = virtualizer;
    this.key = ++$6bbafa22c92cc056$var$KEY;
    this.viewType = viewType;
    this.children = /* @__PURE__ */ new Set();
    this.reusableViews = /* @__PURE__ */ new Map();
    this.layoutInfo = null;
    this.content = null;
    this.rendered = null;
  }
  /**
  * Prepares the view for reuse. Called just before the view is removed from the DOM.
  */
  prepareForReuse() {
    this.content = null;
    this.rendered = null;
    this.layoutInfo = null;
  }
  getReusableView(reuseType) {
    let reusable = this.reusableViews.get(reuseType);
    let view = reusable && reusable.length > 0 ? reusable.shift() : new $6bbafa22c92cc056$export$7a41b6f219e61634(this.virtualizer, this, reuseType);
    return view;
  }
  reuseChild(child) {
    child.prepareForReuse();
    let reusable = this.reusableViews.get(child.viewType);
    if (!reusable) {
      reusable = [];
      this.reusableViews.set(child.viewType, reusable);
    }
    reusable.push(child);
  }
};
var $6bbafa22c92cc056$export$e21886a4eef6b29a = class extends $6bbafa22c92cc056$export$1a5223887c560441 {
  constructor(virtualizer) {
    super(virtualizer, "root");
  }
};
var $6bbafa22c92cc056$export$7a41b6f219e61634 = class extends $6bbafa22c92cc056$export$1a5223887c560441 {
  constructor(virtualizer, parent, viewType) {
    super(virtualizer, viewType);
    this.parent = parent;
  }
};

// node_modules/react-stately/dist/private/virtualizer/utils.mjs
function $5225cf049274675d$export$a8d0d0c8d1c5df64(a, b) {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  for (let key of a) {
    if (!b.has(key)) return false;
  }
  return true;
}

// node_modules/react-stately/dist/private/virtualizer/OverscanManager.mjs
var $f64c7bdbe8bdc6dc$export$4455ee6afb38dcbb = class {
  setVisibleRect(rect) {
    let time = performance.now() - this.startTime;
    if (time < 500) {
      if (rect.x !== this.visibleRect.x && time > 0) this.velocity.x = (rect.x - this.visibleRect.x) / time;
      if (rect.y !== this.visibleRect.y && time > 0) this.velocity.y = (rect.y - this.visibleRect.y) / time;
    }
    this.startTime = performance.now();
    this.visibleRect = rect;
  }
  getOverscannedRect() {
    let overscanned = this.visibleRect.copy();
    let overscanY = this.visibleRect.height / 3;
    overscanned.height += overscanY;
    if (this.velocity.y < 0) overscanned.y -= overscanY;
    let overscanX = this.visibleRect.width / 3;
    overscanned.width += overscanX;
    if (this.velocity.x < 0) overscanned.x -= overscanX;
    return overscanned;
  }
  constructor() {
    this.startTime = 0;
    this.velocity = new (0, $b88f793813fc795e$export$baf26146a414f24a)(0, 0);
    this.visibleRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)();
  }
};

// node_modules/react-stately/dist/private/virtualizer/ScrollAnchor.mjs
var $78014f4785404d8e$var$MIN_ANCHOR_OVERLAP = 4;
function $78014f4785404d8e$var$dimensionForAxis(axis) {
  return axis === "x" ? "width" : "height";
}
function $78014f4785404d8e$export$413719533c5919c9(anchor, axis, getLayoutInfo, visibleRect, contentSize) {
  let finalInfo = getLayoutInfo(anchor.key);
  if (!finalInfo) return null;
  let adjustment = finalInfo.rect[anchor.corner][axis] - visibleRect[axis] - anchor.offset;
  if (adjustment === 0) return null;
  let target = visibleRect[axis] + adjustment;
  let dimension = $78014f4785404d8e$var$dimensionForAxis(axis);
  let max = Math.max(0, contentSize[dimension] - visibleRect[dimension]);
  let clamped = Math.max(0, Math.min(max, target));
  return clamped !== visibleRect[axis] ? clamped : null;
}
function $78014f4785404d8e$export$69fb4c6de5f339b7(edge, axis, visibleRect, visibleLayoutInfos, isAnchorable = () => true) {
  let dimension = $78014f4785404d8e$var$dimensionForAxis(axis);
  let best = null;
  for (let [key, layoutInfo] of visibleLayoutInfos) {
    if (!layoutInfo || !isAnchorable(layoutInfo)) continue;
    let overlap = layoutInfo.rect.intersection(visibleRect)[dimension];
    if (layoutInfo.rect.area > 0 && overlap >= $78014f4785404d8e$var$MIN_ANCHOR_OVERLAP) {
      let corner = layoutInfo.rect.getCornerInRect(visibleRect) ?? "topLeft";
      let offset = layoutInfo.rect[corner][axis] - visibleRect[axis];
      let isBetter = !best || (edge === "end" ? offset < best.offset : offset > best.offset);
      if (isBetter) best = {
        key,
        corner,
        offset
      };
    }
  }
  return best;
}
function $78014f4785404d8e$export$c74597e403428eac(edge, axis, contentSize, previousVisibleRect) {
  if (edge === "start") return 0;
  let dimension = $78014f4785404d8e$var$dimensionForAxis(axis);
  return Math.max(0, contentSize[dimension] - previousVisibleRect[dimension]);
}
function $78014f4785404d8e$export$f644bffd4937530e(visibleRect, contentSize, edge, axis, threshold) {
  if (edge === "start") return visibleRect[axis] <= threshold;
  let dimension = $78014f4785404d8e$var$dimensionForAxis(axis);
  let distanceFromEnd = contentSize[dimension] - (visibleRect[axis] + visibleRect[dimension]);
  return distanceFromEnd <= threshold;
}
function $78014f4785404d8e$export$dcb80b718ca193d7(edge, axis, anchor, wasNearAnchorEdge, isScrolling, itemSizeChanged, contentSizeDelta, getLayoutInfo, previousVisibleRect, contentSize) {
  let withTarget = (target) => axis === "x" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(target, previousVisibleRect.y, previousVisibleRect.width, previousVisibleRect.height) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(previousVisibleRect.x, target, previousVisibleRect.width, previousVisibleRect.height);
  if (anchor) {
    let target = $78014f4785404d8e$export$413719533c5919c9(anchor, axis, getLayoutInfo, previousVisibleRect, contentSize);
    if (target != null) return withTarget(target);
  }
  if (wasNearAnchorEdge && !isScrolling && (!itemSizeChanged || contentSizeDelta > 0)) {
    let target = withTarget($78014f4785404d8e$export$c74597e403428eac(edge, axis, contentSize, previousVisibleRect));
    return target.equals(previousVisibleRect) ? null : target;
  }
  return null;
}
var $78014f4785404d8e$export$8ce0fdedc36cb6b = class {
  /** Resets all tracked state, e.g. when the virtualizer's layout instance changes. */
  reset() {
    this.hasSnappedToEdge = false;
    this.hadEstimatedVisibleItems = false;
    this.wasNearAnchorEdge = false;
  }
  /**
  * Captures the anchor from pre-layout view positions.
  */
  captureBeforeLayout(anchorInfo, preLayoutInfos, visibleRect) {
    if (!anchorInfo) return null;
    return $78014f4785404d8e$export$69fb4c6de5f339b7(anchorInfo.edge, anchorInfo.axis, visibleRect, preLayoutInfos, anchorInfo.isAnchorable);
  }
  /**
  * Runs the full post-layout decision: updates the tracked state for the next pass, and
  * returns the resolved scroll target, or null if nothing should change.
  */
  resolveAfterLayout(options) {
    let { anchorInfo, anchor, postLayoutInfos, previousVisibleRect, previousContentSize, contentSize, itemSizeChanged, isScrolling, getLayoutInfo } = options;
    if (!anchorInfo) return null;
    let wasSettlingLastPass = this.hadEstimatedVisibleItems;
    let wasNearAnchorEdgeLastPass = this.wasNearAnchorEdge;
    let hasEstimated = false;
    for (let layoutInfo of postLayoutInfos.values()) if (layoutInfo.estimatedSize) {
      hasEstimated = true;
      break;
    }
    this.hadEstimatedVisibleItems = hasEstimated;
    if (!wasSettlingLastPass) this.wasNearAnchorEdge = $78014f4785404d8e$export$f644bffd4937530e(previousVisibleRect, previousContentSize, anchorInfo.edge, anchorInfo.axis, anchorInfo.threshold);
    if (previousVisibleRect.area === 0) return null;
    let dimension = anchorInfo.axis === "x" ? "width" : "height";
    let contentSizeDelta = contentSize[dimension] - previousContentSize[dimension];
    let isFirstAnchoredLayout = !this.hasSnappedToEdge;
    this.hasSnappedToEdge = true;
    if (!(isFirstAnchoredLayout || contentSizeDelta !== 0 || itemSizeChanged)) return null;
    let wasNearAnchorEdge = isFirstAnchoredLayout || wasSettlingLastPass && wasNearAnchorEdgeLastPass || $78014f4785404d8e$export$f644bffd4937530e(previousVisibleRect, previousContentSize, anchorInfo.edge, anchorInfo.axis, anchorInfo.threshold);
    if (!wasSettlingLastPass) this.wasNearAnchorEdge = wasNearAnchorEdge;
    let effectiveAnchor = isFirstAnchoredLayout || wasSettlingLastPass && wasNearAnchorEdgeLastPass ? null : anchor;
    return $78014f4785404d8e$export$dcb80b718ca193d7(anchorInfo.edge, anchorInfo.axis, effectiveAnchor, wasNearAnchorEdge, isScrolling, itemSizeChanged, contentSizeDelta, getLayoutInfo, previousVisibleRect, contentSize);
  }
  constructor() {
    this.hasSnappedToEdge = false;
    this.hadEstimatedVisibleItems = false;
    this.wasNearAnchorEdge = false;
  }
};

// node_modules/react-stately/dist/private/virtualizer/Virtualizer.mjs
var $4537523c0f2a47dc$export$89be5a243e59c4b2 = class {
  constructor(options) {
    this.delegate = options.delegate;
    this.collection = options.collection;
    this.layout = options.layout;
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)();
    this.visibleRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)();
    this.size = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)();
    this.persistedKeys = /* @__PURE__ */ new Set();
    this._visibleViews = /* @__PURE__ */ new Map();
    this._renderedContent = /* @__PURE__ */ new WeakMap();
    this._rootView = new (0, $6bbafa22c92cc056$export$e21886a4eef6b29a)(this);
    this._isScrolling = false;
    this._invalidationContext = {};
    this._overscanManager = new (0, $f64c7bdbe8bdc6dc$export$4455ee6afb38dcbb)();
    this._scrollAnchor = new (0, $78014f4785404d8e$export$8ce0fdedc36cb6b)();
  }
  /** Returns whether the given key, or an ancestor, is persisted. */
  isPersistedKey(key) {
    if (this.persistedKeys.has(key)) return true;
    for (let k of this.persistedKeys) while (k != null) {
      let layoutInfo = this.layout.getLayoutInfo(k);
      if (!layoutInfo || layoutInfo.parentKey == null) break;
      k = layoutInfo.parentKey;
      if (k === key) return true;
    }
    return false;
  }
  getParentView(layoutInfo) {
    return layoutInfo.parentKey != null ? this._visibleViews.get(layoutInfo.parentKey) : this._rootView;
  }
  getReusableView(layoutInfo) {
    let parentView = this.getParentView(layoutInfo);
    let view = parentView.getReusableView(layoutInfo.type);
    view.layoutInfo = layoutInfo;
    this._renderView(view);
    return view;
  }
  _renderView(reusableView) {
    if (reusableView.layoutInfo) {
      let { type, key, content } = reusableView.layoutInfo;
      reusableView.content = content || this.collection.getItem(key);
      reusableView.rendered = this._renderContent(type, reusableView.content);
    }
  }
  _renderContent(type, content) {
    let cached = content != null ? this._renderedContent.get(content) : null;
    if (cached != null) return cached;
    let rendered = this.delegate.renderView(type, content);
    if (content) this._renderedContent.set(content, rendered);
    return rendered;
  }
  /**
  * Returns the key for the item view currently at the given point.
  */
  keyAtPoint(point) {
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(point.x, point.y, 1, 1);
    let layoutInfos = rect.area === 0 ? [] : this.layout.getVisibleLayoutInfos(rect);
    for (let layoutInfo of layoutInfos) {
      if (layoutInfo.rect.intersects(rect)) return layoutInfo.key;
    }
    return null;
  }
  relayout(context = {}) {
    let anchorInfo = this.layout.UNSTABLE_getScrollAnchorInfo?.(context.layoutOptions) ?? null;
    let anchor = null;
    if (anchorInfo) {
      let preLayoutInfos = [];
      for (let [key, view] of this._visibleViews) {
        let layoutInfo = this.layout.getLayoutInfo(key) ?? view.layoutInfo;
        if (layoutInfo) preLayoutInfos.push([
          key,
          layoutInfo
        ]);
      }
      anchor = this._scrollAnchor.captureBeforeLayout(anchorInfo, preLayoutInfos, this.visibleRect);
    }
    let previousContentSize = this.contentSize;
    let previousVisibleRect = this.visibleRect;
    this.layout.update(context);
    let rawContentSize = this.layout.getContentSize();
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(rawContentSize.width, rawContentSize.height);
    let target = this._scrollAnchor.resolveAfterLayout({
      anchorInfo,
      anchor,
      postLayoutInfos: anchorInfo ? this.getVisibleLayoutInfos() : /* @__PURE__ */ new Map(),
      previousVisibleRect,
      previousContentSize,
      contentSize: this.contentSize,
      itemSizeChanged: context.itemSizeChanged ?? false,
      isScrolling: this._isScrolling,
      getLayoutInfo: (key) => this.layout.getLayoutInfo(key)
    });
    if (target) {
      this.delegate.setVisibleRect(target);
      return;
    }
    let visibleRect = this.visibleRect;
    let contentOffsetX = context.contentChanged ? 0 : visibleRect.x;
    let contentOffsetY = context.contentChanged ? 0 : visibleRect.y;
    contentOffsetX = Math.max(0, Math.min(this.contentSize.width - visibleRect.width, contentOffsetX));
    contentOffsetY = Math.max(0, Math.min(this.contentSize.height - visibleRect.height, contentOffsetY));
    if (contentOffsetX !== visibleRect.x || contentOffsetY !== visibleRect.y) {
      let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(contentOffsetX, contentOffsetY, visibleRect.width, visibleRect.height);
      this.delegate.setVisibleRect(rect);
    } else this.updateSubviews();
  }
  getVisibleLayoutInfos() {
    let isTestEnv = false;
    let isClientWidthMocked = isTestEnv && typeof HTMLElement !== "undefined" && Object.getOwnPropertyNames(HTMLElement.prototype).includes("clientWidth");
    let isClientHeightMocked = isTestEnv && typeof HTMLElement !== "undefined" && Object.getOwnPropertyNames(HTMLElement.prototype).includes("clientHeight");
    let rect;
    if (isTestEnv && !(isClientWidthMocked && isClientHeightMocked)) rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(0, 0, this.contentSize.width, this.contentSize.height);
    else rect = this._overscanManager.getOverscannedRect();
    let layoutInfos = this.layout.getVisibleLayoutInfos(rect);
    let map = /* @__PURE__ */ new Map();
    for (let layoutInfo of layoutInfos) map.set(layoutInfo.key, layoutInfo);
    return map;
  }
  updateSubviews() {
    let visibleLayoutInfos = this.getVisibleLayoutInfos();
    let removed = /* @__PURE__ */ new Set();
    for (let [key, view] of this._visibleViews) {
      let layoutInfo = visibleLayoutInfos.get(key);
      if (!layoutInfo || view.parent !== this.getParentView(layoutInfo)) {
        this._visibleViews.delete(key);
        view.parent.reuseChild(view);
        removed.add(view);
      }
    }
    for (let [key, layoutInfo] of visibleLayoutInfos) {
      let view = this._visibleViews.get(key);
      if (!view) {
        view = this.getReusableView(layoutInfo);
        view.parent.children.add(view);
        this._visibleViews.set(key, view);
        removed.delete(view);
      } else {
        view.layoutInfo = layoutInfo;
        let item = this.collection.getItem(layoutInfo.key);
        if (view.content !== item) {
          if (view.content != null) this._renderedContent.delete(view.content);
          this._renderView(view);
        }
      }
    }
    for (let view of removed) {
      view.parent.children.delete(view);
      view.parent.reusableViews.clear();
    }
    if (!this._isScrolling)
      for (let key of visibleLayoutInfos.keys()) {
        let view = this._visibleViews.get(key);
        view.parent.children.delete(view);
        view.parent.children.add(view);
      }
  }
  /** Performs layout and updates visible views as needed. */
  render(opts) {
    let mutableThis = this;
    let needsLayout = false;
    let offsetChanged = false;
    let sizeChanged = false;
    let widthChanged = false;
    let heightChanged = false;
    let itemSizeChanged = false;
    let layoutOptionsChanged = false;
    let needsUpdate = false;
    if (opts.collection !== this.collection) {
      mutableThis.collection = opts.collection;
      needsLayout = true;
    }
    if (opts.layout !== this.layout || this.layout.virtualizer !== this) {
      if (this.layout) this.layout.virtualizer = null;
      opts.layout.virtualizer = this;
      mutableThis.layout = opts.layout;
      this._scrollAnchor.reset();
      needsLayout = true;
    }
    if (opts.persistedKeys && !(0, $5225cf049274675d$export$a8d0d0c8d1c5df64)(opts.persistedKeys, this.persistedKeys)) {
      mutableThis.persistedKeys = opts.persistedKeys;
      needsUpdate = true;
    }
    if (!this.visibleRect.equals(opts.visibleRect) || !this.size.equals(opts.size)) {
      this._overscanManager.setVisibleRect(opts.visibleRect);
      let oldRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(this.visibleRect.x, this.visibleRect.y, this.size.width, this.size.height);
      let newRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(opts.visibleRect.x, opts.visibleRect.y, opts.size.width, opts.size.height);
      let shouldInvalidate = this.layout.shouldInvalidate(newRect, oldRect);
      if (shouldInvalidate) {
        offsetChanged = !opts.visibleRect.pointEquals(this.visibleRect);
        sizeChanged = !this.size.equals(opts.size);
        widthChanged = this.size.width !== opts.size.width;
        heightChanged = this.size.height !== opts.size.height;
        needsLayout = true;
      } else needsUpdate = true;
      mutableThis.visibleRect = opts.visibleRect;
      mutableThis.size = opts.size;
    }
    if (opts.invalidationContext !== this._invalidationContext) {
      if (opts.invalidationContext) {
        sizeChanged ||= opts.invalidationContext.sizeChanged || false;
        widthChanged ||= opts.invalidationContext.widthChanged || false;
        heightChanged ||= opts.invalidationContext.heightChanged || false;
        offsetChanged ||= opts.invalidationContext.offsetChanged || false;
        itemSizeChanged ||= opts.invalidationContext.itemSizeChanged || false;
        layoutOptionsChanged ||= opts.invalidationContext.layoutOptions != null && this._invalidationContext.layoutOptions != null && opts.invalidationContext.layoutOptions !== this._invalidationContext.layoutOptions && this.layout.shouldInvalidateLayoutOptions(opts.invalidationContext.layoutOptions, this._invalidationContext.layoutOptions);
        needsLayout ||= itemSizeChanged || sizeChanged || offsetChanged || layoutOptionsChanged;
      }
      this._invalidationContext = opts.invalidationContext;
    }
    if (opts.isScrolling !== this._isScrolling) {
      this._isScrolling = opts.isScrolling;
      if (!opts.isScrolling)
        needsUpdate = true;
    }
    if (needsLayout) this.relayout({
      offsetChanged,
      sizeChanged,
      widthChanged,
      heightChanged,
      itemSizeChanged,
      layoutOptionsChanged,
      layoutOptions: this._invalidationContext.layoutOptions
    });
    else if (needsUpdate) this.updateSubviews();
    return Array.from(this._rootView.children);
  }
  getVisibleView(key) {
    return this._visibleViews.get(key);
  }
  invalidate(context) {
    this.delegate.invalidate(context);
  }
  updateItemSize(key, size) {
    if (!this.layout.updateItemSize) return;
    let changed = this.layout.updateItemSize(key, size);
    if (changed) this.invalidate({
      itemSizeChanged: true
    });
  }
};

// node_modules/react-stately/dist/private/virtualizer/useVirtualizerState.mjs
var import_react38 = __toESM(require_react(), 1);
var $51e619e0f141c3ec$export$e5c5a5f917a5871c = typeof document !== "undefined" ? (0, import_react38.default).useLayoutEffect : () => {
};
function $51e619e0f141c3ec$export$1505db82fe357e65(opts) {
  let [visibleRect, setVisibleRect] = (0, import_react38.useState)(new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(0, 0, 0, 0));
  let [size, setSize] = (0, import_react38.useState)(new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)());
  let [isScrolling, setScrolling] = (0, import_react38.useState)(false);
  let [invalidationContext, setInvalidationContext] = (0, import_react38.useState)({});
  let visibleRectChanged = (0, import_react38.useRef)(false);
  let [virtualizer] = (0, import_react38.useState)(
    // oxlint-disable-next-line react/react-compiler
    () => new (0, $4537523c0f2a47dc$export$89be5a243e59c4b2)({
      collection: opts.collection,
      layout: opts.layout,
      delegate: {
        setVisibleRect(rect) {
          setVisibleRect(rect);
          visibleRectChanged.current = true;
        },
        // TODO: should changing these invalidate the entire cache?
        renderView: opts.renderView,
        invalidate: setInvalidationContext
      }
    })
  );
  $51e619e0f141c3ec$export$e5c5a5f917a5871c(() => {
    if (visibleRectChanged.current) {
      visibleRectChanged.current = false;
      opts.onVisibleRectChange(visibleRect);
    }
  });
  let mergedInvalidationContext = (0, import_react38.useMemo)(() => {
    if (opts.layoutOptions != null) return {
      ...invalidationContext,
      layoutOptions: opts.layoutOptions
    };
    return invalidationContext;
  }, [
    invalidationContext,
    opts.layoutOptions
  ]);
  let visibleViews = virtualizer.render({
    layout: opts.layout,
    collection: opts.collection,
    persistedKeys: opts.persistedKeys,
    layoutOptions: opts.layoutOptions,
    visibleRect,
    size: opts.allowsWindowScrolling ? size : visibleRect,
    invalidationContext: mergedInvalidationContext,
    isScrolling
  });
  let contentSize = virtualizer.contentSize;
  let startScrolling = (0, import_react38.useCallback)(() => {
    setScrolling(true);
  }, []);
  let endScrolling = (0, import_react38.useCallback)(() => {
    setScrolling(false);
  }, []);
  let state = (0, import_react38.useMemo)(() => ({
    virtualizer,
    visibleViews,
    setVisibleRect,
    size,
    setSize,
    contentSize,
    isScrolling,
    startScrolling,
    endScrolling
  }), [
    virtualizer,
    visibleViews,
    setVisibleRect,
    size,
    setSize,
    contentSize,
    isScrolling,
    startScrolling,
    endScrolling
  ]);
  return state;
}

// node_modules/react-stately/dist/private/virtualizer/Layout.mjs
var $85410e0c3cc54f1d$export$c84671f46d6a1ca = class {
  /**
  * Returns whether the layout should invalidate in response to
  * visible rectangle changes. By default, it only invalidates
  * when the virtualizer's size changes. Return true always
  * to make the layout invalidate while scrolling (e.g. sticky headers).
  */
  shouldInvalidate(newRect, oldRect) {
    return newRect.width !== oldRect.width || newRect.height !== oldRect.height;
  }
  /**
  * Returns whether the layout should invalidate when the layout options change.
  * By default it invalidates when the object identity changes. Override this
  * method to optimize layout updates based on specific option changes.
  */
  shouldInvalidateLayoutOptions(newOptions, oldOptions) {
    return newOptions !== oldOptions;
  }
  /**
  * This method allows the layout to perform any pre-computation
  * it needs to in order to prepare LayoutInfos for retrieval.
  * Called by the virtualizer before `getVisibleLayoutInfos`
  * or `getLayoutInfo` are called.
  */
  update(invalidationContext) {
  }
  /** @private */
  getItemRect(key) {
    return this.getLayoutInfo(key)?.rect ?? null;
  }
  /** @private */
  getVisibleRect() {
    return this.virtualizer.visibleRect;
  }
  constructor() {
    this.virtualizer = null;
  }
};

// node_modules/react-stately/dist/private/virtualizer/LayoutInfo.mjs
var $eb6255cbf080eb7d$export$7e0eeb9da702a085 = class _$eb6255cbf080eb7d$export$7e0eeb9da702a085 {
  /**
  * @param type The type of element represented by this LayoutInfo. Should match the `type` of the
  *   corresponding collection node.
  * @param key A unique key for this LayoutInfo. Should match the `key` of the corresponding
  *   collection node.
  * @param rect The rectangle describing the size and position of this element.
  */
  constructor(type, key, rect) {
    this.type = type;
    this.key = key;
    this.parentKey = null;
    this.content = null;
    this.rect = rect;
    this.estimatedSize = false;
    this.isSticky = false;
    this.opacity = 1;
    this.transform = null;
    this.zIndex = 0;
    this.allowOverflow = false;
  }
  /**
  * Returns a copy of the LayoutInfo.
  */
  copy() {
    let res = new _$eb6255cbf080eb7d$export$7e0eeb9da702a085(this.type, this.key, this.rect.copy());
    res.estimatedSize = this.estimatedSize;
    res.opacity = this.opacity;
    res.transform = this.transform;
    res.parentKey = this.parentKey;
    res.content = this.content;
    res.isSticky = this.isSticky;
    res.zIndex = this.zIndex;
    res.allowOverflow = this.allowOverflow;
    return res;
  }
};

// node_modules/react-stately/dist/private/layout/GridLayout.mjs
var $fc34f5dff94ff74a$var$DEFAULT_OPTIONS = {
  minItemSize: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(200, 200),
  maxItemSize: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(Infinity, Infinity),
  preserveAspectRatio: false,
  minSpace: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(18, 18),
  maxSpace: Infinity,
  maxColumns: Infinity,
  dropIndicatorThickness: 2,
  loaderHeight: 48
};
var $fc34f5dff94ff74a$export$7d2b12578154a735 = class extends (0, $85410e0c3cc54f1d$export$c84671f46d6a1ca) {
  shouldInvalidateLayoutOptions(newOptions, oldOptions) {
    return newOptions.maxColumns !== oldOptions.maxColumns || newOptions.dropIndicatorThickness !== oldOptions.dropIndicatorThickness || newOptions.preserveAspectRatio !== oldOptions.preserveAspectRatio || !(newOptions.minItemSize || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minItemSize).equals(oldOptions.minItemSize || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minItemSize) || !(newOptions.maxItemSize || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.maxItemSize).equals(oldOptions.maxItemSize || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.maxItemSize) || !(newOptions.minSpace || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minSpace).equals(oldOptions.minSpace || $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minSpace) || newOptions.maxHorizontalSpace !== oldOptions.maxHorizontalSpace || newOptions.loaderHeight !== oldOptions.loaderHeight || newOptions.direction !== oldOptions.direction;
  }
  update(invalidationContext) {
    let { minItemSize = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minItemSize, maxItemSize = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.maxItemSize, preserveAspectRatio = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.preserveAspectRatio, minSpace = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minSpace, maxHorizontalSpace = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.maxSpace, maxColumns = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.maxColumns, dropIndicatorThickness = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.dropIndicatorThickness, loaderHeight = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.loaderHeight, direction = "ltr" } = invalidationContext.layoutOptions || {};
    this.dropIndicatorThickness = dropIndicatorThickness;
    this.direction = direction;
    let virtualizerWidth = this.virtualizer.size.width;
    let maxItemWidth = Math.min(maxItemSize.width, virtualizerWidth);
    let maxItemHeight = Number.isFinite(maxItemSize.height) ? maxItemSize.height : Math.floor(minItemSize.height / minItemSize.width * maxItemWidth);
    let columns = Math.floor(virtualizerWidth / (minItemSize.width + minSpace.width));
    let numColumns = Math.max(1, Math.min(maxColumns, columns));
    this.numColumns = numColumns;
    let width = virtualizerWidth - minSpace.width * Math.max(0, numColumns);
    let itemWidth = Math.floor(width / numColumns);
    itemWidth = Math.max(minItemSize.width, Math.min(maxItemWidth, itemWidth));
    let t = (itemWidth - minItemSize.width) / Math.max(1, maxItemWidth - minItemSize.width);
    let itemHeight = minItemSize.height + Math.floor((maxItemHeight - minItemSize.height) * t);
    itemHeight = Math.max(minItemSize.height, Math.min(maxItemHeight, itemHeight));
    let horizontalSpacing = Math.min(Math.max(maxHorizontalSpace, minSpace.width), Math.floor((virtualizerWidth - numColumns * itemWidth) / (numColumns + 1)));
    this.gap = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(horizontalSpacing, minSpace.height);
    this.margin = Math.floor((virtualizerWidth - numColumns * itemWidth - horizontalSpacing * (numColumns + 1)) / 2);
    let collection = this.virtualizer.collection;
    let collectionSize = collection.size;
    let lastKey = collection.getLastKey();
    for (let i = 0; i < 2 && lastKey != null; i++) {
      let item = collection.getItem(lastKey);
      if (item?.type === "skeleton") {
        collectionSize++;
        break;
      }
      lastKey = collection.getKeyBefore(lastKey);
    }
    let rows = Math.ceil(collectionSize / numColumns);
    let iterator = collection[Symbol.iterator]();
    let y = rows > 0 ? minSpace.height : 0;
    let newLayoutInfos = /* @__PURE__ */ new Map();
    let skeleton = null;
    let skeletonCount = 0;
    for (let row = 0; row < rows; row++) {
      let maxHeight = 0;
      let rowLayoutInfos = [];
      for (let col = 0; col < numColumns; col++) {
        let node = skeleton || iterator.next().value;
        if (!node) break;
        if (node.type === "loader") continue;
        if (node.type === "skeleton") skeleton = node;
        let key = skeleton ? `${skeleton.key}-${skeletonCount++}` : node.key;
        let oldLayoutInfo = this.layoutInfos.get(key);
        let content = node;
        if (skeleton) content = oldLayoutInfo && oldLayoutInfo.content.key === key ? oldLayoutInfo.content : {
          ...skeleton,
          key
        };
        let x = horizontalSpacing + col * (itemWidth + horizontalSpacing) + this.margin;
        let height = itemHeight;
        let estimatedSize = !preserveAspectRatio;
        if (oldLayoutInfo && estimatedSize) {
          height = oldLayoutInfo.rect.height;
          estimatedSize = invalidationContext.layoutOptionsChanged || invalidationContext.sizeChanged || oldLayoutInfo.estimatedSize || oldLayoutInfo.content !== content;
        }
        let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, itemWidth, height);
        let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, key, rect);
        layoutInfo.estimatedSize = estimatedSize;
        layoutInfo.allowOverflow = true;
        layoutInfo.content = content;
        newLayoutInfos.set(key, layoutInfo);
        rowLayoutInfos.push(layoutInfo);
        maxHeight = Math.max(maxHeight, layoutInfo.rect.height);
      }
      for (let layoutInfo of rowLayoutInfos) layoutInfo.rect.height = maxHeight;
      y += maxHeight + minSpace.height;
      if (skeleton && row === rows - 1 && y < this.virtualizer.size.height) rows++;
    }
    let lastNode = collection.getItem(collection.getLastKey());
    if (lastNode?.type === "loader") {
      if (skeletonCount > 0 || !lastNode.props.isLoading) loaderHeight = 0;
      const loaderWidth = virtualizerWidth - horizontalSpacing * 2;
      let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(horizontalSpacing, y, loaderWidth, loaderHeight);
      let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("loader", lastNode.key, rect);
      newLayoutInfos.set(lastNode.key, layoutInfo);
      y = layoutInfo.rect.maxY;
    }
    this.layoutInfos = newLayoutInfos;
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(this.virtualizer.size.width, y);
  }
  getLayoutInfo(key) {
    return this.layoutInfos.get(key) || null;
  }
  getContentSize() {
    return this.contentSize;
  }
  getVisibleLayoutInfos(rect) {
    let layoutInfos = [];
    for (let layoutInfo of this.layoutInfos.values()) if (layoutInfo.rect.intersects(rect) || this.virtualizer.isPersistedKey(layoutInfo.key) || layoutInfo.type === "loader") layoutInfos.push(layoutInfo);
    return layoutInfos;
  }
  updateItemSize(key, size) {
    let layoutInfo = this.layoutInfos.get(key);
    if (!size || !layoutInfo) return false;
    if (size.height !== layoutInfo.rect.height) {
      let newLayoutInfo = layoutInfo.copy();
      newLayoutInfo.rect.height = size.height;
      newLayoutInfo.estimatedSize = false;
      this.layoutInfos.set(key, newLayoutInfo);
      return true;
    }
    return false;
  }
  getDropTargetFromPoint(x, y, isValidDropTarget) {
    if (this.layoutInfos.size === 0) return {
      type: "root"
    };
    x += this.virtualizer.visibleRect.x;
    y += this.virtualizer.visibleRect.y;
    if (this.direction === "rtl" && this.numColumns > 1) x = this.contentSize.width - x;
    let key = null;
    if (this.numColumns === 1) {
      let searchRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, Math.max(0, y - this.gap.height), 1, Math.max(1, this.gap.height * 2));
      let candidates = this.getVisibleLayoutInfos(searchRect);
      let minDistance = Infinity;
      for (let candidate of candidates) {
        if (!candidate.rect.intersects(searchRect)) continue;
        let yDist = Math.abs(candidate.rect.y - y);
        let maxYDist = Math.abs(candidate.rect.maxY - y);
        let dist = Math.min(yDist, maxYDist);
        if (dist < minDistance) {
          minDistance = dist;
          key = candidate.key;
        }
      }
    } else {
      let searchRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(Math.max(0, x - this.gap.width), y, this.gap.width * 2, 1);
      let candidates = this.getVisibleLayoutInfos(searchRect);
      let minDistance = Infinity;
      for (let candidate of candidates) {
        if (!candidate.rect.intersects(searchRect)) continue;
        let xDist = Math.abs(candidate.rect.x - x);
        let maxXDist = Math.abs(candidate.rect.maxX - x);
        let dist = Math.min(xDist, maxXDist);
        if (dist < minDistance) {
          minDistance = dist;
          key = candidate.key;
        }
      }
    }
    let layoutInfo = key != null ? this.getLayoutInfo(key) : null;
    if (!layoutInfo) return {
      type: "root"
    };
    let target = {
      type: "item",
      key: layoutInfo.key,
      dropPosition: "on"
    };
    let pos = this.numColumns === 1 ? y : x;
    let layoutInfoPos = this.numColumns === 1 ? layoutInfo.rect.y : layoutInfo.rect.x;
    let size = this.numColumns === 1 ? layoutInfo.rect.height : layoutInfo.rect.width;
    if (isValidDropTarget(target)) {
      if (pos < layoutInfoPos + 5) target.dropPosition = "before";
      else if (pos > layoutInfoPos + size - 5) target.dropPosition = "after";
    } else {
      let mid = layoutInfoPos + size / 2;
      if (pos <= mid && isValidDropTarget({
        ...target,
        dropPosition: "before"
      })) target.dropPosition = "before";
      else if (pos >= mid && isValidDropTarget({
        ...target,
        dropPosition: "after"
      })) target.dropPosition = "after";
    }
    return target;
  }
  getDropTargetLayoutInfo(target) {
    let layoutInfo = this.getLayoutInfo(target.key);
    let rect;
    if (this.numColumns === 1)
      rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(layoutInfo.rect.x, target.dropPosition === "before" ? layoutInfo.rect.y - this.gap.height / 2 - this.dropIndicatorThickness / 2 : layoutInfo.rect.maxY + this.gap.height / 2 - this.dropIndicatorThickness / 2, layoutInfo.rect.width, this.dropIndicatorThickness);
    else rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(target.dropPosition === "before" ? layoutInfo.rect.x - this.gap.width / 2 - this.dropIndicatorThickness / 2 : layoutInfo.rect.maxX + this.gap.width / 2 - this.dropIndicatorThickness / 2, layoutInfo.rect.y, this.dropIndicatorThickness, layoutInfo.rect.height);
    return new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("dropIndicator", target.key + ":" + target.dropPosition, rect);
  }
  constructor(...args) {
    super(...args), this.gap = $fc34f5dff94ff74a$var$DEFAULT_OPTIONS.minSpace, this.dropIndicatorThickness = 2, this.numColumns = 0, this.direction = "ltr", this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(), this.layoutInfos = /* @__PURE__ */ new Map(), this.margin = 0;
  }
};

// node_modules/react-stately/dist/private/layout/ListLayout.mjs
var $942f06a693c162e2$var$DEFAULT_HEIGHT = 48;
var $942f06a693c162e2$export$cacbb3924155d68e = class extends (0, $85410e0c3cc54f1d$export$c84671f46d6a1ca) {
  /**
  * Creates a new ListLayout with options. See the list of properties below for a description
  * of the options that can be provided.
  */
  constructor(options = {}) {
    super();
    this.rowSize = options?.rowSize ?? options?.rowHeight ?? null;
    this.orientation = options.orientation ?? "vertical";
    this.estimatedRowSize = options?.estimatedRowSize ?? options?.estimatedRowHeight ?? null;
    this.headingSize = options?.headingSize ?? options?.headingHeight ?? null;
    this.estimatedHeadingSize = options?.estimatedHeadingSize ?? options?.estimatedHeadingHeight ?? null;
    this.loaderSize = options?.loaderSize ?? options?.loaderHeight ?? null;
    this.dropIndicatorThickness = options.dropIndicatorThickness || 2;
    this.gap = options.gap || 0;
    this.padding = options.padding || 0;
    this.layoutNodes = /* @__PURE__ */ new Map();
    this.rootNodes = [];
    this.lastCollection = null;
    this.invalidateEverything = false;
    this.validRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)();
    this.requestedRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)();
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)();
  }
  // Backward compatibility for subclassing.
  get collection() {
    return this.virtualizer.collection;
  }
  /** @deprecated Use `rowSize` instead. */
  get rowHeight() {
    return this.rowSize;
  }
  /** @deprecated Use `estimatedRowSize` instead. */
  get estimatedRowHeight() {
    return this.estimatedRowSize;
  }
  /** @deprecated Use `headingSize` instead. */
  get headingHeight() {
    return this.headingSize;
  }
  /** @deprecated Use `estimatedHeadingSize` instead. */
  get estimatedHeadingHeight() {
    return this.estimatedHeadingSize;
  }
  /** @deprecated Use `loaderSize` instead. */
  get loaderHeight() {
    return this.loaderSize;
  }
  getLayoutInfo(key) {
    this.ensureLayoutInfo(key);
    return this.layoutNodes.get(key)?.layoutInfo || null;
  }
  getVisibleLayoutInfos(rect) {
    let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
    let heightProperty = this.orientation === "horizontal" ? "width" : "height";
    if (rect[heightProperty] > 1) {
      let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
      rect = rect.copy();
      let offset = Math.floor(rect[offsetProperty] / rowHeight) * rowHeight;
      let height = rect[heightProperty] + rect[offsetProperty] - offset;
      rect[offsetProperty] = offset;
      rect[heightProperty] = Math.ceil(height / rowHeight) * rowHeight;
    }
    this.layoutIfNeeded(rect);
    let res = [];
    let addNodes = (nodes) => {
      for (let node of nodes) if (this.isVisible(node, rect)) {
        res.push(node.layoutInfo);
        if (node.children) addNodes(node.children);
      }
    };
    addNodes(this.rootNodes);
    return res;
  }
  layoutIfNeeded(rect) {
    if (!this.lastCollection) return;
    if (!this.requestedRect.containsRect(rect)) {
      this.requestedRect = this.requestedRect.union(rect);
      this.rootNodes = this.buildCollection();
    }
    for (let key of this.virtualizer.persistedKeys) {
      if (this.ensureLayoutInfo(key)) return;
    }
  }
  ensureLayoutInfo(key) {
    if (!this.layoutNodes.has(key) && this.requestedRect.area < this.contentSize.area && this.lastCollection) {
      this.requestedRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(0, 0, Infinity, Infinity);
      this.rootNodes = this.buildCollection();
      this.requestedRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(0, 0, this.contentSize.width, this.contentSize.height);
      return true;
    }
    return false;
  }
  isVisible(node, rect) {
    return node.layoutInfo.rect.intersects(rect) || node.layoutInfo.isSticky || node.layoutInfo.type === "header" || node.layoutInfo.type === "loader" || this.virtualizer.isPersistedKey(node.layoutInfo.key);
  }
  shouldInvalidateEverything(invalidationContext) {
    let options = invalidationContext.layoutOptions;
    return invalidationContext.sizeChanged || this.rowSize !== (options?.rowSize ?? options?.rowHeight ?? this.rowSize) || this.orientation !== (options?.orientation ?? this.orientation) || this.headingSize !== (options?.headingSize ?? options?.headingHeight ?? this.headingSize) || this.loaderSize !== (options?.loaderSize ?? options?.loaderHeight ?? this.loaderSize) || this.gap !== (options?.gap ?? this.gap) || this.padding !== (options?.padding ?? this.padding);
  }
  shouldInvalidateLayoutOptions(newOptions, oldOptions) {
    return (newOptions?.rowSize ?? newOptions?.rowHeight) !== (oldOptions?.rowSize ?? oldOptions?.rowHeight) || newOptions.orientation !== oldOptions.orientation || (newOptions?.estimatedRowSize ?? newOptions?.estimatedRowHeight) !== (oldOptions?.estimatedRowSize ?? oldOptions?.estimatedRowHeight) || (newOptions?.headingSize ?? newOptions?.headingHeight) !== (oldOptions?.headingSize ?? oldOptions?.headingHeight) || (newOptions?.estimatedHeadingSize ?? newOptions?.estimatedHeadingHeight) !== (oldOptions?.estimatedHeadingSize ?? oldOptions?.estimatedHeadingHeight) || (newOptions?.loaderSize ?? newOptions?.loaderHeight) !== (oldOptions?.loaderSize ?? oldOptions?.loaderHeight) || newOptions.dropIndicatorThickness !== oldOptions.dropIndicatorThickness || newOptions.gap !== oldOptions.gap || newOptions.padding !== oldOptions.padding;
  }
  update(invalidationContext) {
    let collection = this.virtualizer.collection;
    this.invalidateEverything = this.shouldInvalidateEverything(invalidationContext);
    if (this.invalidateEverything) {
      this.requestedRect = this.virtualizer.visibleRect.copy();
      this.layoutNodes.clear();
    }
    let options = invalidationContext.layoutOptions;
    this.rowSize = options?.rowSize ?? options?.rowHeight ?? this.rowSize;
    this.orientation = options?.orientation ?? this.orientation;
    this.estimatedRowSize = options?.estimatedRowSize ?? options?.estimatedRowHeight ?? this.estimatedRowSize;
    this.headingSize = options?.headingSize ?? options?.headingHeight ?? this.headingSize;
    this.estimatedHeadingSize = options?.estimatedHeadingSize ?? options?.estimatedHeadingHeight ?? this.estimatedHeadingSize;
    this.loaderSize = options?.loaderSize ?? options?.loaderHeight ?? this.loaderSize;
    this.dropIndicatorThickness = options?.dropIndicatorThickness ?? this.dropIndicatorThickness;
    this.gap = options?.gap ?? this.gap;
    this.padding = options?.padding ?? this.padding;
    this.rootNodes = this.buildCollection();
    if (this.lastCollection && collection !== this.lastCollection) {
      for (let key of this.lastCollection.getKeys()) if (!collection.getItem(key)) {
        let layoutNode = this.layoutNodes.get(key);
        if (layoutNode) this.layoutNodes.delete(key);
      }
    }
    this.lastCollection = collection;
    this.invalidateEverything = false;
    this.validRect = this.requestedRect.copy();
  }
  buildCollection(offset = this.padding) {
    let collection = this.virtualizer.collection;
    let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
    let maxOffsetProperty = this.orientation === "horizontal" ? "maxX" : "maxY";
    let collectionNodes = $942f06a693c162e2$var$toArray(collection, (node) => node.type !== "content");
    let loaderNodes = collectionNodes.filter((node) => node.type === "loader");
    let nodes = [];
    let isEmptyOrLoading = collection?.size === 0;
    if (isEmptyOrLoading) offset = 0;
    for (let node of collectionNodes) {
      let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
      if (node.type === "item" && offset + rowHeight < this.requestedRect[offsetProperty] && !this.isValid(node, offset)) {
        offset += rowHeight;
        continue;
      }
      let layoutNode = this.orientation === "horizontal" ? this.buildChild(node, offset, this.padding, null) : this.buildChild(node, this.padding, offset, null);
      offset = layoutNode.layoutInfo.rect[maxOffsetProperty] + this.gap;
      nodes.push(layoutNode);
      if (node.type === "loader") {
        let index = loaderNodes.indexOf(node);
        loaderNodes.splice(index, 1);
      }
      if ((node.type === "item" || node.type === "loader") && offset > this.requestedRect[maxOffsetProperty]) {
        let lastProcessedIndex = collectionNodes.indexOf(node);
        for (let loaderNode of loaderNodes) {
          let loaderNodeIndex = collectionNodes.indexOf(loaderNode);
          offset += (loaderNodeIndex - lastProcessedIndex - 1) * rowHeight;
          let loader = this.orientation === "horizontal" ? this.buildChild(loaderNode, offset, this.padding, null) : this.buildChild(loaderNode, this.padding, offset, null);
          nodes.push(loader);
          offset = loader.layoutInfo.rect[maxOffsetProperty];
          lastProcessedIndex = loaderNodeIndex;
        }
        offset += (collectionNodes.length - lastProcessedIndex - 1) * rowHeight;
        break;
      }
    }
    offset = Math.max(offset - this.gap, 0);
    offset += isEmptyOrLoading ? 0 : this.padding;
    this.contentSize = this.orientation === "horizontal" ? new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(offset, this.virtualizer.size.height) : new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(this.virtualizer.size.width, offset);
    return nodes;
  }
  isValid(node, offset) {
    let cached = this.layoutNodes.get(node.key);
    let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
    return !this.invalidateEverything && !!cached && cached.node === node && offset === cached.layoutInfo.rect[offsetProperty] && cached.layoutInfo.rect.intersects(this.validRect) && cached.validRect.containsRect(cached.layoutInfo.rect.intersection(this.requestedRect));
  }
  buildChild(node, x, y, parentKey) {
    if (this.isValid(node, this.orientation === "horizontal" ? x : y)) return this.layoutNodes.get(node.key);
    let layoutNode = this.buildNode(node, x, y);
    layoutNode.layoutInfo.parentKey = parentKey ?? null;
    layoutNode.layoutInfo.allowOverflow = true;
    this.layoutNodes.set(node.key, layoutNode);
    return layoutNode;
  }
  buildNode(node, x, y) {
    switch (node.type) {
      case "section":
        return this.buildSection(node, x, y);
      case "item":
        return this.buildItem(node, x, y);
      case "header":
        return this.buildSectionHeader(node, x, y);
      case "loader":
        return this.buildLoader(node, x, y);
      case "separator":
        return this.buildItem(node, x, y);
      default:
        throw new Error("Unsupported node type: " + node.type);
    }
  }
  buildLoader(node, x, y) {
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, this.padding, 0);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, node.key, rect);
    if (this.orientation === "horizontal") {
      rect.height = this.virtualizer.contentSize.height - this.padding - y;
      rect.width = node.props.isLoading ? this.loaderSize ?? this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT : 0;
    } else {
      rect.width = this.virtualizer.contentSize.width - this.padding - x;
      rect.height = node.props.isLoading ? this.loaderSize ?? this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT : 0;
    }
    return {
      layoutInfo,
      validRect: rect.intersection(this.requestedRect)
    };
  }
  buildSection(node, x, y) {
    let collection = this.virtualizer.collection;
    let width = this.virtualizer.size.width - this.padding - x;
    let height = this.virtualizer.size.height - this.padding - y;
    let rect = this.orientation === "horizontal" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, 0, height) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, width, 0);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, node.key, rect);
    let offset = this.orientation === "horizontal" ? x : y;
    let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
    let maxOffsetProperty = this.orientation === "horizontal" ? "maxX" : "maxY";
    let heightProperty = this.orientation === "horizontal" ? "width" : "height";
    let skipped = 0;
    let children = [];
    for (let child of (0, $cd5ea4b915021f1d$export$1005530eda016c13)(node, collection)) {
      if (child.type === "content") continue;
      let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
      if (offset + rowHeight < this.requestedRect[offsetProperty] && !this.isValid(node, offset)) {
        offset += rowHeight;
        skipped++;
        continue;
      }
      let layoutNode = this.orientation === "horizontal" ? this.buildChild(child, offset, y, layoutInfo.key) : this.buildChild(child, x, offset, layoutInfo.key);
      offset = layoutNode.layoutInfo.rect[maxOffsetProperty] + this.gap;
      children.push(layoutNode);
      if (offset > this.requestedRect[maxOffsetProperty]) {
        offset += ([
          ...(0, $cd5ea4b915021f1d$export$1005530eda016c13)(node, collection)
        ].length - (children.length + skipped)) * rowHeight;
        break;
      }
    }
    offset -= this.gap;
    rect[heightProperty] = offset - (this.orientation === "horizontal" ? x : y);
    return {
      layoutInfo,
      children,
      validRect: layoutInfo.rect.intersection(this.requestedRect),
      node
    };
  }
  buildSectionHeader(node, x, y) {
    let widthProperty = this.orientation === "horizontal" ? "height" : "width";
    let heightProperty = this.orientation === "horizontal" ? "width" : "height";
    let width = this.virtualizer.size[widthProperty] - this.padding - (this.orientation === "horizontal" ? y : x);
    let rectHeight = this.headingSize;
    let isEstimated = false;
    if (rectHeight == null) {
      let previousLayoutNode = this.layoutNodes.get(node.key);
      let previousLayoutInfo = previousLayoutNode?.layoutInfo;
      if (previousLayoutInfo) {
        let curNode = this.virtualizer.collection.getItem(node.key);
        let lastNode = this.lastCollection ? this.lastCollection.getItem(node.key) : null;
        rectHeight = previousLayoutNode.layoutInfo.rect[heightProperty];
        isEstimated = width !== previousLayoutInfo.rect[widthProperty] || curNode !== lastNode || previousLayoutInfo.estimatedSize;
      } else {
        rectHeight = node.rendered ? this.estimatedHeadingSize : 0;
        isEstimated = true;
      }
    }
    if (rectHeight == null) rectHeight = $942f06a693c162e2$var$DEFAULT_HEIGHT;
    let headerRect = this.orientation === "horizontal" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, rectHeight, width - y) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, width - x, rectHeight);
    let header = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("header", node.key, headerRect);
    header.estimatedSize = isEstimated;
    return {
      layoutInfo: header,
      children: [],
      validRect: header.rect.intersection(this.requestedRect),
      node
    };
  }
  buildItem(node, x, y) {
    let widthProperty = this.orientation === "horizontal" ? "height" : "width";
    let heightProperty = this.orientation === "horizontal" ? "width" : "height";
    let width = this.virtualizer.size[widthProperty] - this.padding - (this.orientation === "horizontal" ? y : x);
    let rectHeight = this.rowSize;
    let isEstimated = false;
    if (rectHeight == null) {
      let previousLayoutNode = this.layoutNodes.get(node.key);
      if (previousLayoutNode) {
        rectHeight = previousLayoutNode.layoutInfo.rect[heightProperty];
        isEstimated = width !== previousLayoutNode.layoutInfo.rect[widthProperty] || node !== previousLayoutNode.node || previousLayoutNode.layoutInfo.estimatedSize;
      } else {
        rectHeight = this.estimatedRowSize;
        isEstimated = true;
      }
    }
    if (rectHeight == null) rectHeight = $942f06a693c162e2$var$DEFAULT_HEIGHT;
    let rect = this.orientation === "horizontal" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, rectHeight, width) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, width, rectHeight);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, node.key, rect);
    layoutInfo.estimatedSize = isEstimated;
    return {
      layoutInfo,
      children: [],
      validRect: layoutInfo.rect.intersection(this.requestedRect),
      node
    };
  }
  updateItemSize(key, size) {
    let layoutNode = this.layoutNodes.get(key);
    if (!layoutNode) return false;
    let collection = this.virtualizer.collection;
    let layoutInfo = layoutNode.layoutInfo;
    let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
    let heightProperty = this.orientation === "horizontal" ? "width" : "height";
    layoutInfo.estimatedSize = false;
    if (layoutInfo.rect[heightProperty] !== size[heightProperty]) {
      let newLayoutInfo = layoutInfo.copy();
      newLayoutInfo.rect[heightProperty] = size[heightProperty];
      layoutNode.layoutInfo = newLayoutInfo;
      this.validRect[heightProperty] = Math.min(this.validRect[heightProperty], layoutInfo.rect[offsetProperty] - this.validRect[offsetProperty]);
      if (layoutNode.node?.type === "item") this.requestedRect[heightProperty] += newLayoutInfo.rect[heightProperty] - layoutInfo.rect[heightProperty];
      this.updateLayoutNode(key, layoutInfo, newLayoutInfo);
      let node = layoutInfo.parentKey != null ? collection.getItem(layoutInfo.parentKey) : null;
      while (node) {
        this.updateLayoutNode(node.key, layoutInfo, newLayoutInfo);
        node = node.parentKey != null ? collection.getItem(node.parentKey) : null;
      }
      return true;
    }
    return false;
  }
  updateLayoutNode(key, oldLayoutInfo, newLayoutInfo) {
    let n = this.layoutNodes.get(key);
    if (n) {
      n.validRect = n.validRect.intersection(this.validRect);
      if (n.layoutInfo === oldLayoutInfo) n.layoutInfo = newLayoutInfo;
    }
  }
  getContentSize() {
    return this.contentSize;
  }
  getDropTargetFromPoint(x, y, isValidDropTarget) {
    x += this.virtualizer.visibleRect.x;
    y += this.virtualizer.visibleRect.y;
    let searchRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, Math.max(0, y - this.gap), 1, Math.max(1, this.gap * 2));
    let candidates = this.getVisibleLayoutInfos(searchRect);
    let key = null;
    let minDistance = Infinity;
    for (let candidate of candidates) {
      if (!candidate.rect.intersects(searchRect)) continue;
      let yDist = Math.abs(candidate.rect.y - y);
      let maxYDist = Math.abs(candidate.rect.maxY - y);
      let dist = Math.min(yDist, maxYDist);
      if (dist < minDistance) {
        minDistance = dist;
        key = candidate.key;
      }
    }
    if (key == null || this.virtualizer.collection.size === 0) return {
      type: "root"
    };
    let layoutInfo = this.getLayoutInfo(key);
    if (!layoutInfo) return null;
    let rect = layoutInfo.rect;
    let target = {
      type: "item",
      key: layoutInfo.key,
      dropPosition: "on"
    };
    if (!isValidDropTarget(target)) {
      if (y <= rect.y + rect.height / 2 && isValidDropTarget({
        ...target,
        dropPosition: "before"
      })) target.dropPosition = "before";
      else if (isValidDropTarget({
        ...target,
        dropPosition: "after"
      })) target.dropPosition = "after";
    } else if (y <= rect.y + 10 && isValidDropTarget({
      ...target,
      dropPosition: "before"
    })) target.dropPosition = "before";
    else if (y >= rect.maxY - 10 && isValidDropTarget({
      ...target,
      dropPosition: "after"
    })) target.dropPosition = "after";
    return target;
  }
  getDropTargetLayoutInfo(target) {
    let layoutInfo = this.getLayoutInfo(target.key);
    let rect;
    if (target.dropPosition === "before") rect = this.orientation === "horizontal" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(Math.max(0, layoutInfo.rect.x - this.dropIndicatorThickness / 2), layoutInfo.rect.y, this.dropIndicatorThickness, layoutInfo.rect.height) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(layoutInfo.rect.x, Math.max(0, layoutInfo.rect.y - this.dropIndicatorThickness / 2), layoutInfo.rect.width, this.dropIndicatorThickness);
    else if (target.dropPosition === "after") {
      let targetNode = this.collection.getItem(target.key);
      if (targetNode) {
        let targetLevel = targetNode.level ?? 0;
        let currentKey = this.collection.getKeyAfter(target.key);
        while (currentKey != null) {
          let node = this.collection.getItem(currentKey);
          if (!node || node.level <= targetLevel) break;
          layoutInfo = this.getLayoutInfo(currentKey) || layoutInfo;
          currentKey = this.collection.getKeyAfter(currentKey);
        }
      }
      rect = this.orientation === "horizontal" ? new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(layoutInfo.rect.maxX - this.dropIndicatorThickness / 2, layoutInfo.rect.y, this.dropIndicatorThickness, layoutInfo.rect.height) : new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(layoutInfo.rect.x, layoutInfo.rect.maxY - this.dropIndicatorThickness / 2, layoutInfo.rect.width, this.dropIndicatorThickness);
    } else rect = layoutInfo.rect;
    return new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("dropIndicator", target.key + ":" + target.dropPosition, rect);
  }
};
function $942f06a693c162e2$var$toArray(collection, predicate) {
  const result = [];
  for (const node of collection) if (predicate(node)) result.push(node);
  return result;
}

// node_modules/react-stately/dist/private/layout/TableLayout.mjs
var $024b19c559603d56$var$DEFAULT_ROW_HEIGHT = 48;
var $024b19c559603d56$export$62444c3c724b1b20 = class extends (0, $942f06a693c162e2$export$cacbb3924155d68e) {
  constructor(options) {
    super(options), this.lastCollection = null, this.columnWidths = /* @__PURE__ */ new Map(), this.lastPersistedKeys = null, this.persistedIndices = /* @__PURE__ */ new Map();
    this.stickyColumnIndices = [];
  }
  // Backward compatibility for subclassing.
  get collection() {
    return this.virtualizer.collection;
  }
  // Preserve the old rowHeight/other "height" properties since Table doesn't support a "horizontal" orientation
  get rowHeight() {
    return super.rowHeight;
  }
  get estimatedRowHeight() {
    return super.estimatedRowHeight;
  }
  get headingHeight() {
    return super.headingHeight;
  }
  get estimatedHeadingHeight() {
    return super.estimatedHeadingHeight;
  }
  get loaderHeight() {
    return super.loaderHeight;
  }
  columnsChanged(newCollection, oldCollection) {
    return !oldCollection || newCollection.columns !== oldCollection.columns && newCollection.columns.length !== oldCollection.columns.length || newCollection.columns.some((c, i) => c.key !== oldCollection.columns[i].key || c.props.width !== oldCollection.columns[i].props.width || c.props.minWidth !== oldCollection.columns[i].props.minWidth || c.props.maxWidth !== oldCollection.columns[i].props.maxWidth);
  }
  shouldInvalidateLayoutOptions(newOptions, oldOptions) {
    return newOptions.columnWidths !== oldOptions.columnWidths || super.shouldInvalidateLayoutOptions(newOptions, oldOptions);
  }
  update(invalidationContext) {
    let newCollection = this.virtualizer.collection;
    if (invalidationContext.layoutOptions?.columnWidths) {
      for (const [key, val] of invalidationContext.layoutOptions.columnWidths) if (this.columnWidths.get(key) !== val) {
        this.columnWidths = invalidationContext.layoutOptions.columnWidths;
        invalidationContext.sizeChanged = true;
        break;
      }
    } else if (invalidationContext.sizeChanged || this.columnsChanged(newCollection, this.lastCollection)) {
      let columnLayout = new (0, $245263de035f5da5$export$7ff77a162970b30e)({});
      this.columnWidths = columnLayout.buildColumnWidths(this.virtualizer.size.width - this.padding * 2, newCollection, /* @__PURE__ */ new Map());
      invalidationContext.sizeChanged = true;
    }
    super.update(invalidationContext);
  }
  buildCollection() {
    this.stickyColumnIndices = [];
    let collection = this.virtualizer.collection;
    for (let column of collection.columns)
      if (this.isStickyColumn(column) || collection.rowHeaderColumnKeys.has(column.key)) this.stickyColumnIndices.push(column.index);
    let layoutNodes = [];
    let y = 0;
    let width = 0;
    if (!collection.head) {
      let header = this.buildTableHeader();
      this.layoutNodes.set(header.layoutInfo.key, header);
      let body = this.buildBody(header.layoutInfo.rect.maxY + this.gap);
      body.layoutInfo.rect.width = Math.max(header.layoutInfo.rect.width, body.layoutInfo.rect.width);
      y = body.layoutInfo.rect.maxY;
      width = body.layoutInfo.rect.width;
      layoutNodes = [
        header,
        body
      ];
    } else {
      for (let node of collection) switch (node.type) {
        case "tableheader": {
          let header = this.buildTableHeader();
          y = header.layoutInfo.rect.maxY + this.gap;
          width = Math.max(width, header.layoutInfo.rect.width);
          this.layoutNodes.set(header.layoutInfo.key, header);
          layoutNodes.push(header);
          break;
        }
        case "tablebody":
        case "tablefooter": {
          let body = this.buildRowGroup(y, node);
          y = body.layoutInfo.rect.maxY + this.gap;
          width = Math.max(width, body.layoutInfo.rect.width);
          this.layoutNodes.set(body.layoutInfo.key, body);
          layoutNodes.push(body);
          break;
        }
      }
      if (y > 0) y -= this.gap;
      for (let layoutNode of layoutNodes) layoutNode.layoutInfo.rect.width = width;
    }
    this.lastPersistedKeys = null;
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(width + this.padding * 2, y + this.padding);
    return layoutNodes;
  }
  buildTableHeader() {
    let collection = this.virtualizer.collection;
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(this.padding, this.padding, 0, 0);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("header", collection.head?.key ?? "header", rect);
    layoutInfo.isSticky = true;
    layoutInfo.zIndex = 1;
    let y = this.padding;
    let width = 0;
    let children = [];
    for (let headerRow of collection.headerRows) {
      let layoutNode = this.buildChild(headerRow, this.padding, y, layoutInfo.key);
      layoutNode.layoutInfo.parentKey = layoutInfo.key;
      y = layoutNode.layoutInfo.rect.maxY;
      width = Math.max(width, layoutNode.layoutInfo.rect.width);
      layoutNode.index = children.length;
      children.push(layoutNode);
    }
    rect.width = width;
    rect.height = y - this.padding;
    return {
      layoutInfo,
      children,
      validRect: layoutInfo.rect,
      node: collection.head
    };
  }
  buildHeaderRow(headerRow, x, y) {
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, 0, 0);
    let row = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("headerrow", headerRow.key, rect);
    let height = 0;
    let columns = [];
    for (let cell of (0, $cd5ea4b915021f1d$export$1005530eda016c13)(headerRow, this.virtualizer.collection)) {
      let layoutNode = this.buildChild(cell, x, y, row.key);
      layoutNode.layoutInfo.parentKey = row.key;
      x = layoutNode.layoutInfo.rect.maxX;
      height = Math.max(height, layoutNode.layoutInfo.rect.height);
      layoutNode.index = columns.length;
      columns.push(layoutNode);
    }
    for (let [i, layout] of columns.entries()) layout.layoutInfo.zIndex = columns.length - i + 1;
    this.setChildHeights(columns, height);
    rect.height = height;
    rect.width = x - rect.x;
    return {
      layoutInfo: row,
      children: columns,
      validRect: rect,
      node: headerRow
    };
  }
  setChildHeights(children, height) {
    for (let child of children) if (child.layoutInfo.rect.height !== height) {
      child.layoutInfo = child.layoutInfo.copy();
      child.layoutInfo.rect.height = height;
    }
  }
  // used to get the column widths when rendering to the DOM
  getRenderedColumnWidth(node) {
    let collection = this.virtualizer.collection;
    let colSpan = node.colSpan ?? 1;
    let colIndex = node.colIndex ?? node.index;
    let width = 0;
    for (let i = colIndex; i < colIndex + colSpan; i++) {
      let column = collection.columns[i];
      if (column?.key != null) width += this.columnWidths.get(column.key) ?? 0;
    }
    return width;
  }
  getEstimatedHeight(node, width, height, estimatedHeight) {
    let isEstimated = false;
    if (height == null) {
      let previousLayoutNode = this.layoutNodes.get(node.key);
      if (previousLayoutNode) {
        height = previousLayoutNode.layoutInfo.rect.height;
        isEstimated = node !== previousLayoutNode.node || width !== previousLayoutNode.layoutInfo.rect.width || previousLayoutNode.layoutInfo.estimatedSize;
      } else {
        height = estimatedHeight ?? $024b19c559603d56$var$DEFAULT_ROW_HEIGHT;
        isEstimated = true;
      }
    }
    return {
      height,
      isEstimated
    };
  }
  getEstimatedRowHeight() {
    return this.rowHeight ?? this.estimatedRowHeight ?? $024b19c559603d56$var$DEFAULT_ROW_HEIGHT;
  }
  buildColumn(node, x, y) {
    let width = this.getRenderedColumnWidth(node);
    let { height, isEstimated } = this.getEstimatedHeight(node, width, this.headingHeight ?? this.rowHeight, this.estimatedHeadingHeight ?? this.estimatedRowHeight);
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, width, height);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, node.key, rect);
    layoutInfo.isSticky = this.isStickyColumn(node);
    layoutInfo.zIndex = layoutInfo.isSticky ? 2 : 1;
    layoutInfo.estimatedSize = isEstimated;
    return {
      layoutInfo,
      children: [],
      validRect: layoutInfo.rect,
      node
    };
  }
  // For subclasses.
  // eslint-disable-next-line
  isStickyColumn(node) {
    return false;
  }
  buildBody(y) {
    let collection = this.virtualizer.collection;
    return this.buildRowGroup(y, collection.body);
  }
  buildRowGroup(y, node) {
    let collection = this.virtualizer.collection;
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(this.padding, y, 0, 0);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("rowgroup", node.key, rect);
    let startY = y;
    let width = 0;
    let children = [];
    let rowHeight = this.getEstimatedRowHeight() + this.gap;
    let childNodes = (0, $cd5ea4b915021f1d$export$1005530eda016c13)(node, collection);
    for (let node2 of childNodes) {
      if (y + rowHeight < this.requestedRect.y && !this.isValid(node2, y) || y > this.requestedRect.maxY && node2.type !== "loader") {
        y += rowHeight;
        continue;
      }
      let layoutNode = this.buildChild(node2, this.padding, y, layoutInfo.key);
      layoutNode.layoutInfo.parentKey = layoutInfo.key;
      layoutNode.index = children.length;
      y = layoutNode.layoutInfo.rect.maxY + this.gap;
      width = Math.max(width, layoutNode.layoutInfo.rect.width);
      children.push(layoutNode);
    }
    let isEmptyOrLoading = collection?.size === 0;
    if (isEmptyOrLoading) y = this.virtualizer.size.height;
    else y -= this.gap;
    rect.width = width;
    rect.height = y - startY;
    return {
      layoutInfo,
      children,
      validRect: layoutInfo.rect.intersection(this.requestedRect),
      node
    };
  }
  buildLoader(node, x, y) {
    let layoutNode = super.buildLoader(node, x, y);
    let collection = this.virtualizer.collection;
    layoutNode.layoutInfo.rect.width = this.layoutNodes.get(collection.head?.key ?? "header").layoutInfo.rect.width;
    layoutNode.validRect = layoutNode.layoutInfo.rect.intersection(this.requestedRect);
    return layoutNode;
  }
  buildNode(node, x, y) {
    switch (node.type) {
      case "headerrow":
        return this.buildHeaderRow(node, x, y);
      case "item":
        return this.buildRow(node, x, y);
      case "column":
      case "placeholder":
        return this.buildColumn(node, x, y);
      case "cell":
        return this.buildCell(node, x, y);
      case "loader":
        return this.buildLoader(node, x, y);
      default:
        throw new Error("Unknown node type " + node.type);
    }
  }
  buildRow(node, x, y) {
    let collection = this.virtualizer.collection;
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, 0, 0);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("row", node.key, rect);
    let children = [];
    let height = 0;
    for (let child of (0, $cd5ea4b915021f1d$export$1005530eda016c13)(node, collection)) if (child.type === "cell") {
      if (x > this.requestedRect.maxX) {
        let layoutNode = this.layoutNodes.get(child.key);
        if (layoutNode) {
          layoutNode.layoutInfo.rect.x = x;
          x += layoutNode.layoutInfo.rect.width;
        } else break;
      } else {
        let layoutNode = this.buildChild(child, x, y, layoutInfo.key);
        x = layoutNode.layoutInfo.rect.maxX;
        height = Math.max(height, layoutNode.layoutInfo.rect.height);
        layoutNode.index = children.length;
        children.push(layoutNode);
      }
    }
    this.setChildHeights(children, height);
    rect.width = this.layoutNodes.get(collection.head?.key ?? "header").layoutInfo.rect.width;
    rect.height = height;
    return {
      layoutInfo,
      children,
      validRect: rect.intersection(this.requestedRect),
      node
    };
  }
  buildCell(node, x, y) {
    let width = this.getRenderedColumnWidth(node);
    let { height, isEstimated } = this.getEstimatedHeight(node, width, this.rowHeight, this.estimatedRowHeight);
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, width, height);
    let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)(node.type, node.key, rect);
    layoutInfo.isSticky = this.isStickyColumn(node);
    layoutInfo.zIndex = layoutInfo.isSticky ? 2 : 1;
    layoutInfo.estimatedSize = isEstimated;
    return {
      layoutInfo,
      children: [],
      validRect: rect,
      node
    };
  }
  getVisibleLayoutInfos(rect) {
    if (rect.height > 1) {
      let rowHeight = this.getEstimatedRowHeight();
      rect.y = Math.floor(rect.y / rowHeight) * rowHeight;
      rect.height = Math.ceil(rect.height / rowHeight) * rowHeight;
    }
    this.layoutIfNeeded(rect);
    let res = [];
    this.buildPersistedIndices();
    for (let node of this.rootNodes) {
      res.push(node.layoutInfo);
      this.addVisibleLayoutInfos(res, node, rect);
    }
    return res;
  }
  addVisibleLayoutInfos(res, node, rect) {
    if (!node.children || node.children.length === 0) return;
    switch (node.layoutInfo.type) {
      case "header":
        for (let child of node.children) {
          res.push(child.layoutInfo);
          this.addVisibleLayoutInfos(res, child, rect);
        }
        break;
      case "rowgroup": {
        let firstVisibleRow = this.binarySearch(node.children, rect.topLeft, "y");
        let lastVisibleRow = this.binarySearch(node.children, rect.bottomRight, "y");
        let persistedRowIndices = this.persistedIndices.get(node.layoutInfo.key);
        let persistIndex = 0;
        while (persistedRowIndices && persistIndex < persistedRowIndices.length && persistedRowIndices[persistIndex] < firstVisibleRow) {
          let idx = persistedRowIndices[persistIndex];
          if (idx < node.children.length) {
            res.push(node.children[idx].layoutInfo);
            this.addVisibleLayoutInfos(res, node.children[idx], rect);
          }
          persistIndex++;
        }
        for (let i = firstVisibleRow; i <= lastVisibleRow; i++) {
          while (persistedRowIndices && persistIndex < persistedRowIndices.length && persistedRowIndices[persistIndex] < i) persistIndex++;
          res.push(node.children[i].layoutInfo);
          this.addVisibleLayoutInfos(res, node.children[i], rect);
        }
        while (persistedRowIndices && persistIndex < persistedRowIndices.length) {
          let idx = persistedRowIndices[persistIndex++];
          if (idx < node.children.length) {
            res.push(node.children[idx].layoutInfo);
            this.addVisibleLayoutInfos(res, node.children[idx], rect);
          }
        }
        let lastRow = node.children.at(-1);
        if (lastRow?.layoutInfo.type === "loader") res.push(lastRow.layoutInfo);
        break;
      }
      case "headerrow":
      case "row": {
        let firstVisibleCell = this.binarySearch(node.children, rect.topLeft, "x");
        let lastVisibleCell = this.binarySearch(node.children, rect.topRight, "x");
        let stickyIndex = 0;
        let persistedCellIndices = this.persistedIndices.get(node.layoutInfo.key) || this.stickyColumnIndices;
        while (stickyIndex < persistedCellIndices.length && persistedCellIndices[stickyIndex] < firstVisibleCell) {
          let idx = persistedCellIndices[stickyIndex];
          if (idx < node.children.length) res.push(node.children[idx].layoutInfo);
          stickyIndex++;
        }
        for (let i = firstVisibleCell; i <= lastVisibleCell; i++) {
          while (stickyIndex < persistedCellIndices.length && persistedCellIndices[stickyIndex] < i) stickyIndex++;
          res.push(node.children[i].layoutInfo);
        }
        while (stickyIndex < persistedCellIndices.length) {
          let idx = persistedCellIndices[stickyIndex++];
          if (idx < node.children.length) res.push(node.children[idx].layoutInfo);
        }
        break;
      }
      default:
        throw new Error("Unknown node type " + node.layoutInfo.type);
    }
  }
  binarySearch(items, point, axis) {
    let low = 0;
    let high = items.length - 1;
    while (low <= high) {
      let mid = low + high >> 1;
      let item = items[mid];
      if (axis === "x" && item.layoutInfo.rect.maxX <= point.x || axis === "y" && item.layoutInfo.rect.maxY <= point.y) low = mid + 1;
      else if (axis === "x" && item.layoutInfo.rect.x > point.x || axis === "y" && item.layoutInfo.rect.y > point.y) high = mid - 1;
      else return mid;
    }
    return Math.max(0, Math.min(items.length - 1, low));
  }
  buildPersistedIndices() {
    if (this.virtualizer.persistedKeys === this.lastPersistedKeys) return;
    this.lastPersistedKeys = this.virtualizer.persistedKeys;
    this.persistedIndices.clear();
    for (let key of this.virtualizer.persistedKeys) {
      let layoutInfo = this.layoutNodes.get(key)?.layoutInfo;
      while (layoutInfo && layoutInfo.parentKey) {
        let collectionNode = this.virtualizer.collection.getItem(layoutInfo.key);
        let indices = this.persistedIndices.get(layoutInfo.parentKey);
        if (!indices) {
          indices = collectionNode?.type === "cell" || collectionNode?.type === "column" ? [
            ...this.stickyColumnIndices
          ] : [];
          this.persistedIndices.set(layoutInfo.parentKey, indices);
        }
        let index = this.layoutNodes.get(layoutInfo.key)?.index;
        if (index != null && !indices.includes(index)) indices.push(index);
        layoutInfo = this.layoutNodes.get(layoutInfo.parentKey)?.layoutInfo;
      }
    }
    for (let indices of this.persistedIndices.values()) indices.sort((a, b) => a - b);
  }
  getDropTargetFromPoint(x, y, isValidDropTarget) {
    x += this.virtualizer.visibleRect.x;
    y += this.virtualizer.visibleRect.y;
    let searchRect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, Math.max(0, y - this.gap), 1, Math.max(1, this.gap * 2));
    let candidates = this.getVisibleLayoutInfos(searchRect);
    let key = null;
    let minDistance = Infinity;
    for (let candidate of candidates) {
      if (candidate.type !== "row" || !candidate.rect.intersects(searchRect)) continue;
      let yDist = Math.abs(candidate.rect.y - y);
      let maxYDist = Math.abs(candidate.rect.maxY - y);
      let dist = Math.min(yDist, maxYDist);
      if (dist < minDistance) {
        minDistance = dist;
        key = candidate.key;
      }
    }
    if (key == null || this.virtualizer.collection.size === 0) return {
      type: "root"
    };
    let layoutInfo = this.getLayoutInfo(key);
    if (!layoutInfo) return null;
    let rect = layoutInfo.rect;
    let target = {
      type: "item",
      key: layoutInfo.key,
      dropPosition: "on"
    };
    if (!isValidDropTarget(target)) {
      if (y <= rect.y + rect.height / 2 && isValidDropTarget({
        ...target,
        dropPosition: "before"
      })) target.dropPosition = "before";
      else if (isValidDropTarget({
        ...target,
        dropPosition: "after"
      })) target.dropPosition = "after";
    } else if (y <= rect.y + 10 && isValidDropTarget({
      ...target,
      dropPosition: "before"
    })) target.dropPosition = "before";
    else if (y >= rect.maxY - 10 && isValidDropTarget({
      ...target,
      dropPosition: "after"
    })) target.dropPosition = "after";
    return target;
  }
  getDropTargetLayoutInfo(target) {
    let layoutInfo = super.getDropTargetLayoutInfo(target);
    layoutInfo.parentKey = this.virtualizer.collection.getItem(target.key)?.parentKey ?? null;
    return layoutInfo;
  }
};

// node_modules/react-stately/dist/private/layout/WaterfallLayout.mjs
var $71719b7c112ce40e$var$WaterfallLayoutInfo = class extends (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085) {
  copy() {
    let res = super.copy();
    res.column = this.column;
    res.index = this.index;
    return res;
  }
  constructor(...args) {
    super(...args), this.column = 0, this.index = 0;
  }
};
var $71719b7c112ce40e$var$DEFAULT_OPTIONS = {
  minItemSize: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(200, 200),
  maxItemSize: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(Infinity, Infinity),
  minSpace: new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(18, 18),
  maxSpace: Infinity,
  maxColumns: Infinity,
  dropIndicatorThickness: 2,
  loaderHeight: 48
};
var $71719b7c112ce40e$export$e9f7cda058ba8df8 = class extends (0, $85410e0c3cc54f1d$export$c84671f46d6a1ca) {
  shouldInvalidateLayoutOptions(newOptions, oldOptions) {
    return newOptions.maxColumns !== oldOptions.maxColumns || newOptions.dropIndicatorThickness !== oldOptions.dropIndicatorThickness || !(newOptions.minItemSize || $71719b7c112ce40e$var$DEFAULT_OPTIONS.minItemSize).equals(oldOptions.minItemSize || $71719b7c112ce40e$var$DEFAULT_OPTIONS.minItemSize) || !(newOptions.maxItemSize || $71719b7c112ce40e$var$DEFAULT_OPTIONS.maxItemSize).equals(oldOptions.maxItemSize || $71719b7c112ce40e$var$DEFAULT_OPTIONS.maxItemSize) || !(newOptions.minSpace || $71719b7c112ce40e$var$DEFAULT_OPTIONS.minSpace).equals(oldOptions.minSpace || $71719b7c112ce40e$var$DEFAULT_OPTIONS.minSpace) || newOptions.maxHorizontalSpace !== oldOptions.maxHorizontalSpace || newOptions.loaderHeight !== oldOptions.loaderHeight;
  }
  update(invalidationContext) {
    let { minItemSize = $71719b7c112ce40e$var$DEFAULT_OPTIONS.minItemSize, maxItemSize = $71719b7c112ce40e$var$DEFAULT_OPTIONS.maxItemSize, minSpace = $71719b7c112ce40e$var$DEFAULT_OPTIONS.minSpace, maxHorizontalSpace = $71719b7c112ce40e$var$DEFAULT_OPTIONS.maxSpace, maxColumns = $71719b7c112ce40e$var$DEFAULT_OPTIONS.maxColumns, dropIndicatorThickness = $71719b7c112ce40e$var$DEFAULT_OPTIONS.dropIndicatorThickness, loaderHeight = $71719b7c112ce40e$var$DEFAULT_OPTIONS.loaderHeight } = invalidationContext.layoutOptions || {};
    this.dropIndicatorThickness = dropIndicatorThickness;
    let virtualizerWidth = this.virtualizer.size.width;
    let maxItemWidth = Math.min(maxItemSize.width, virtualizerWidth);
    let maxItemHeight = Number.isFinite(maxItemSize.height) ? maxItemSize.height : Math.floor(minItemSize.height / minItemSize.width * maxItemWidth);
    let columns = Math.floor(virtualizerWidth / (minItemSize.width + minSpace.width));
    let numColumns = Math.max(1, Math.min(maxColumns, columns));
    let width = virtualizerWidth - minSpace.width * Math.max(0, numColumns);
    let itemWidth = Math.floor(width / numColumns);
    itemWidth = Math.max(minItemSize.width, Math.min(maxItemWidth, itemWidth));
    let t = (itemWidth - minItemSize.width) / Math.max(1, maxItemWidth - minItemSize.width);
    let itemHeight = minItemSize.height + Math.floor((maxItemHeight - minItemSize.height) * t);
    itemHeight = Math.max(minItemSize.height, Math.min(maxItemHeight, itemHeight));
    let horizontalSpacing = Math.min(Math.max(maxHorizontalSpace, minSpace.width), Math.floor((virtualizerWidth - numColumns * itemWidth) / (numColumns + 1)));
    this.margin = Math.floor((virtualizerWidth - numColumns * itemWidth - horizontalSpacing * (numColumns + 1)) / 2);
    let columnHeights = Array(numColumns).fill(minSpace.height);
    let newLayoutInfos = /* @__PURE__ */ new Map();
    let index = 0;
    let addNode = (key, node) => {
      let oldLayoutInfo = this.layoutInfos.get(key);
      let height = itemHeight;
      let estimatedSize = true;
      if (oldLayoutInfo) {
        height = oldLayoutInfo.rect.height / oldLayoutInfo.rect.width * itemWidth;
        estimatedSize = invalidationContext.sizeChanged || oldLayoutInfo.estimatedSize || oldLayoutInfo.content !== node;
      }
      let prevColumn = numColumns === this.numColumns && oldLayoutInfo && oldLayoutInfo.index === index && oldLayoutInfo.rect.y < this.virtualizer.visibleRect.maxY ? oldLayoutInfo.column : void 0;
      let column = prevColumn ?? columnHeights.reduce((minIndex, h, i) => h < columnHeights[minIndex] ? i : minIndex, 0);
      let x = horizontalSpacing + column * (itemWidth + horizontalSpacing) + this.margin;
      let y = columnHeights[column];
      let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(x, y, itemWidth, height);
      let layoutInfo = new $71719b7c112ce40e$var$WaterfallLayoutInfo(node.type, key, rect);
      layoutInfo.estimatedSize = estimatedSize;
      layoutInfo.allowOverflow = true;
      layoutInfo.content = node;
      layoutInfo.column = column;
      layoutInfo.index = index++;
      newLayoutInfos.set(key, layoutInfo);
      columnHeights[column] += layoutInfo.rect.height + minSpace.height;
    };
    let collection = this.virtualizer.collection;
    let skeletonCount = 0;
    for (let node of collection) {
      if (node.type === "skeleton") {
        let startingHeights = [
          ...columnHeights
        ];
        while (!columnHeights.every((h, i) => h !== startingHeights[i]) || Math.min(...columnHeights) < this.virtualizer.size.height) {
          let key = `${node.key}-${skeletonCount++}`;
          let content = this.layoutInfos.get(key)?.content || {
            ...node
          };
          addNode(key, content);
        }
        break;
      } else if (node.type !== "loader") addNode(node.key, node);
    }
    let isEmptyOrLoading = collection?.size === 0 && collection.getItem(collection.getFirstKey())?.type !== "skeleton";
    let maxHeight = isEmptyOrLoading ? 0 : Math.max(...columnHeights);
    let lastNode = collection.getItem(collection.getLastKey());
    if (lastNode?.type === "loader") {
      if (skeletonCount > 0 || !lastNode.props.isLoading) loaderHeight = 0;
      const loaderWidth = virtualizerWidth - horizontalSpacing * 2;
      let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(horizontalSpacing, maxHeight, loaderWidth, loaderHeight);
      let layoutInfo = new (0, $eb6255cbf080eb7d$export$7e0eeb9da702a085)("loader", lastNode.key, rect);
      newLayoutInfos.set(lastNode.key, layoutInfo);
      maxHeight = layoutInfo.rect.maxY;
    }
    this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(this.virtualizer.size.width, maxHeight);
    this.layoutInfos = newLayoutInfos;
    this.numColumns = numColumns;
  }
  getLayoutInfo(key) {
    return this.layoutInfos.get(key);
  }
  getContentSize() {
    return this.contentSize;
  }
  getVisibleLayoutInfos(rect) {
    let layoutInfos = [];
    for (let layoutInfo of this.layoutInfos.values()) if (layoutInfo.rect.intersects(rect) || this.virtualizer.isPersistedKey(layoutInfo.key) || layoutInfo.type === "loader") layoutInfos.push(layoutInfo);
    return layoutInfos;
  }
  updateItemSize(key, size) {
    let layoutInfo = this.layoutInfos.get(key);
    if (!size || !layoutInfo) return false;
    if (size.height !== layoutInfo.rect.height) {
      let newLayoutInfo = layoutInfo.copy();
      newLayoutInfo.rect.height = size.height;
      newLayoutInfo.estimatedSize = false;
      this.layoutInfos.set(key, newLayoutInfo);
      return true;
    }
    return false;
  }
  // Override keyboard navigation to work spatially.
  getKeyRightOf(key) {
    let layoutInfo = this.getLayoutInfo(key);
    if (!layoutInfo) return null;
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(layoutInfo.rect.maxX, layoutInfo.rect.y, this.virtualizer.visibleRect.maxX - layoutInfo.rect.maxX, layoutInfo.rect.height);
    let layoutInfos = this.getVisibleLayoutInfos(rect);
    let bestKey = null;
    let bestDistance = Infinity;
    for (let candidate of layoutInfos) {
      if (candidate.key === key) continue;
      let deltaX = candidate.rect.x - rect.x;
      let overlapY = Math.min(candidate.rect.maxY, rect.maxY) - Math.max(candidate.rect.y, rect.y);
      let distance = deltaX - overlapY;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestKey = candidate.key;
      }
    }
    return bestKey;
  }
  getKeyLeftOf(key) {
    let layoutInfo = this.getLayoutInfo(key);
    if (!layoutInfo) return null;
    let rect = new (0, $af827553fd3cf456$export$c79fc6492f3af13d)(0, layoutInfo.rect.y, layoutInfo.rect.x, layoutInfo.rect.height);
    let layoutInfos = this.getVisibleLayoutInfos(rect);
    let bestKey = null;
    let bestDistance = Infinity;
    for (let candidate of layoutInfos) {
      if (candidate.key === key) continue;
      let deltaX = rect.maxX - candidate.rect.maxX;
      let overlapY = Math.min(candidate.rect.maxY, rect.maxY) - Math.max(candidate.rect.y, rect.y);
      let distance = deltaX - overlapY;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestKey = candidate.key;
      }
    }
    return bestKey;
  }
  // This overrides the default behavior of shift selection to work spatially
  // rather than following the order of the items in the collection (which may appear unpredictable).
  getKeyRange(from, to) {
    let fromLayoutInfo = this.getLayoutInfo(from);
    let toLayoutInfo = this.getLayoutInfo(to);
    if (!fromLayoutInfo || !toLayoutInfo) return [];
    let rect = fromLayoutInfo.rect.union(toLayoutInfo.rect);
    let keys = [];
    for (let layoutInfo of this.layoutInfos.values()) if (rect.intersection(layoutInfo.rect).area > layoutInfo.rect.area / 2) keys.push(layoutInfo.key);
    return keys;
  }
  getDropTargetFromPoint(x, y) {
    if (this.layoutInfos.size === 0) return {
      type: "root"
    };
    x += this.virtualizer.visibleRect.x;
    y += this.virtualizer.visibleRect.y;
    let key = this.virtualizer.keyAtPoint(new (0, $b88f793813fc795e$export$baf26146a414f24a)(x, y));
    if (key == null) return {
      type: "root"
    };
    return {
      type: "item",
      key,
      dropPosition: "on"
    };
  }
  constructor(...args) {
    super(...args), this.contentSize = new (0, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec)(), this.layoutInfos = /* @__PURE__ */ new Map(), this.numColumns = 0, this.dropIndicatorThickness = 2, this.margin = 0;
  }
};

// node_modules/react-stately/dist/private/list/useSingleSelectListState.mjs
var import_react39 = __toESM(require_react(), 1);
function $0fdb127d377ffd84$export$e7f05e985daf4b5f(props) {
  let [selectedKey, setSelectedKey] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)(props.selectedKey, props.defaultSelectedKey ?? null, props.onSelectionChange);
  let selectedKeys = (0, import_react39.useMemo)(() => selectedKey != null ? [
    selectedKey
  ] : [], [
    selectedKey
  ]);
  let { collection, disabledKeys, selectionManager } = (0, $b14b6f590b50af39$export$2f645645f7bca764)({
    ...props,
    selectionMode: "single",
    disallowEmptySelection: true,
    allowDuplicateSelectionEvents: true,
    selectedKeys,
    onSelectionChange: (keys) => {
      if (keys === "all") return;
      let key = keys.values().next().value ?? null;
      if (key === selectedKey && props.onSelectionChange) props.onSelectionChange(key);
      setSelectedKey(key);
    }
  });
  let selectedItem = selectedKey != null ? collection.getItem(selectedKey) : null;
  return {
    collection,
    disabledKeys,
    selectionManager,
    selectedKey,
    setSelectedKey,
    selectedItem
  };
}

// node_modules/react-stately/dist/private/tabs/useTabListState.mjs
var import_react40 = __toESM(require_react(), 1);
function $caeb030f09a278a1$export$4ba071daf4e486(props) {
  let state = (0, $0fdb127d377ffd84$export$e7f05e985daf4b5f)({
    ...props,
    onSelectionChange: props.onSelectionChange ? (key) => {
      if (key != null) props.onSelectionChange?.(key);
    } : void 0,
    suppressTextValueWarning: true,
    defaultSelectedKey: props.defaultSelectedKey ?? $caeb030f09a278a1$var$findDefaultSelectedKey(props.collection, props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set()) ?? void 0
  });
  let { selectionManager, collection, selectedKey: currentSelectedKey } = state;
  let lastSelectedKey = (0, import_react40.useRef)(currentSelectedKey);
  (0, import_react40.useEffect)(() => {
    let selectedKey = currentSelectedKey;
    if (props.selectedKey == null && (selectionManager.isEmpty || selectedKey == null || !collection.getItem(selectedKey))) {
      selectedKey = $caeb030f09a278a1$var$findDefaultSelectedKey(collection, state.disabledKeys);
      if (selectedKey != null)
        selectionManager.setSelectedKeys([
          selectedKey
        ]);
    }
    if (selectedKey != null && selectionManager.focusedKey == null || !selectionManager.isFocused && selectedKey !== lastSelectedKey.current) selectionManager.setFocusedKey(selectedKey);
    lastSelectedKey.current = selectedKey;
  });
  return {
    ...state,
    isDisabled: props.isDisabled || false
  };
}
function $caeb030f09a278a1$var$findDefaultSelectedKey(collection, disabledKeys) {
  let selectedKey = null;
  if (collection) {
    selectedKey = collection.getFirstKey();
    while (selectedKey != null && (disabledKeys.has(selectedKey) || collection.getItem(selectedKey)?.props?.isDisabled) && selectedKey !== collection.getLastKey()) selectedKey = collection.getKeyAfter(selectedKey);
    if (selectedKey != null && (disabledKeys.has(selectedKey) || collection.getItem(selectedKey)?.props?.isDisabled) && selectedKey === collection.getLastKey()) selectedKey = collection.getFirstKey();
  }
  return selectedKey;
}

// node_modules/react-stately/dist/private/toast/useToastState.mjs
var import_react41 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);
function $ac6ee1e83ff78022$export$c7b26b20d3ced9c5(props = {}) {
  let { maxVisibleToasts = 1, wrapUpdate } = props;
  let queue = (0, import_react41.useMemo)(() => new $ac6ee1e83ff78022$export$f1f8569633bbbec4({
    maxVisibleToasts,
    wrapUpdate
  }), [
    maxVisibleToasts,
    wrapUpdate
  ]);
  return $ac6ee1e83ff78022$export$84726ef35ca2129a(queue);
}
function $ac6ee1e83ff78022$export$84726ef35ca2129a(queue) {
  let subscribe = (0, import_react41.useCallback)((fn) => queue.subscribe(fn), [
    queue
  ]);
  let getSnapshot = (0, import_react41.useCallback)(() => queue.visibleToasts, [
    queue
  ]);
  let visibleToasts = (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
  return {
    visibleToasts,
    add: (content, options) => queue.add(content, options),
    close: (key) => queue.close(key),
    pauseAll: () => queue.pauseAll(),
    resumeAll: () => queue.resumeAll()
  };
}
var $ac6ee1e83ff78022$export$f1f8569633bbbec4 = class {
  constructor(options) {
    this.queue = [];
    this.subscriptions = /* @__PURE__ */ new Set();
    this.visibleToasts = [];
    this.maxVisibleToasts = options?.maxVisibleToasts ?? Infinity;
    this.wrapUpdate = options?.wrapUpdate;
  }
  runWithWrapUpdate(fn, action) {
    if (this.wrapUpdate) this.wrapUpdate(fn, action);
    else fn();
  }
  /** Subscribes to updates to the visible toasts. */
  subscribe(fn) {
    this.subscriptions.add(fn);
    return () => this.subscriptions.delete(fn);
  }
  /** Adds a new toast to the queue. */
  add(content, options = {}) {
    let toastKey = "_" + Math.random().toString(36).slice(2);
    let toast = {
      ...options,
      content,
      key: toastKey,
      timer: options.timeout ? new $ac6ee1e83ff78022$var$Timer(() => this.close(toastKey), options.timeout) : void 0
    };
    this.queue.unshift(toast);
    this.updateVisibleToasts("add");
    return toastKey;
  }
  /**
  * Closes a toast.
  */
  close(key) {
    let index = this.queue.findIndex((t) => t.key === key);
    if (index >= 0) {
      this.queue[index].onClose?.();
      this.queue.splice(index, 1);
    }
    this.updateVisibleToasts("remove");
  }
  updateVisibleToasts(action) {
    this.visibleToasts = this.queue.slice(0, this.maxVisibleToasts);
    this.runWithWrapUpdate(() => {
      for (let fn of this.subscriptions) fn();
    }, action);
  }
  /** Pauses the timers for all visible toasts. */
  pauseAll() {
    for (let toast of this.visibleToasts) if (toast.timer) toast.timer.pause();
  }
  /** Resumes the timers for all visible toasts. */
  resumeAll() {
    for (let toast of this.visibleToasts) if (toast.timer) toast.timer.resume();
  }
  clear() {
    this.queue = [];
    this.updateVisibleToasts("clear");
  }
};
var $ac6ee1e83ff78022$var$Timer = class {
  constructor(callback, delay) {
    this.startTime = null;
    this.remaining = delay;
    this.callback = callback;
  }
  reset(delay) {
    this.remaining = delay;
    this.resume();
  }
  pause() {
    if (this.timerId == null) return;
    clearTimeout(this.timerId);
    this.timerId = null;
    this.remaining -= Date.now() - this.startTime;
  }
  resume() {
    if (this.remaining <= 0) return;
    this.startTime = Date.now();
    this.timerId = setTimeout(() => {
      this.timerId = null;
      this.remaining = 0;
      this.callback();
    }, this.remaining);
  }
};

// node_modules/react-stately/dist/private/toggle/useToggleGroupState.mjs
var import_react42 = __toESM(require_react(), 1);
function $3d8ad31c4c1725e9$export$8deac67f4addf270(props) {
  let { selectionMode = "single", disallowEmptySelection, isDisabled = false } = props;
  let [selectedKeys, setSelectedKeys] = (0, $3e6197669829fe11$export$40bfa8c7b0832715)((0, import_react42.useMemo)(() => props.selectedKeys ? new Set(props.selectedKeys) : void 0, [
    props.selectedKeys
  ]), (0, import_react42.useMemo)(() => props.defaultSelectedKeys ? new Set(props.defaultSelectedKeys) : /* @__PURE__ */ new Set(), [
    props.defaultSelectedKeys
  ]), props.onSelectionChange);
  return {
    selectionMode,
    isDisabled,
    selectedKeys,
    setSelectedKeys,
    toggleKey(key) {
      let keys;
      if (selectionMode === "multiple") {
        keys = new Set(selectedKeys);
        if (keys.has(key) && (!disallowEmptySelection || keys.size > 1)) keys.delete(key);
        else keys.add(key);
      } else keys = new Set(selectedKeys.has(key) && !disallowEmptySelection ? [] : [
        key
      ]);
      setSelectedKeys(keys);
    },
    setSelected(key, isSelected) {
      if (isSelected !== selectedKeys.has(key)) this.toggleKey(key);
    }
  };
}

// node_modules/react-stately/dist/private/dnd/useDraggableCollectionState.mjs
var import_react43 = __toESM(require_react(), 1);
function $b2d15a2f12e80349$export$29efd034f1d79f81(props) {
  let { getItems, isDisabled, collection, selectionManager, onDragStart, onDragMove, onDragEnd, preview, getAllowedDropOperations } = props;
  let [, setDragging] = (0, import_react43.useState)(false);
  let draggingKeys = (0, import_react43.useRef)(/* @__PURE__ */ new Set());
  let draggedKey = (0, import_react43.useRef)(null);
  let getKeys = (key) => {
    let keys = /* @__PURE__ */ new Set();
    if (selectionManager.isSelected(key)) for (let currentKey of selectionManager.selectedKeys) {
      let node = collection.getItem(currentKey);
      if (node) {
        let isChild = false;
        let parentKey = node.parentKey;
        while (parentKey != null) {
          if (selectionManager.selectedKeys.has(parentKey)) {
            isChild = true;
            break;
          }
          let parentNode = collection.getItem(parentKey);
          parentKey = parentNode ? parentNode.parentKey : null;
        }
        if (!isChild) keys.add(currentKey);
      }
    }
    else keys.add(key);
    return keys;
  };
  return {
    collection,
    selectionManager,
    get draggedKey() {
      return draggedKey.current;
    },
    get draggingKeys() {
      return draggingKeys.current;
    },
    isDragging(key) {
      return draggingKeys.current.has(key);
    },
    getKeysForDrag: getKeys,
    getItems(key) {
      let keys = getKeys(key);
      let items = [];
      for (let key2 of keys) {
        let value = collection.getItem(key2)?.value;
        if (value != null) items.push(value);
      }
      return getItems(getKeys(key), items);
    },
    isDisabled,
    preview,
    getAllowedDropOperations,
    startDrag(key, event) {
      let keys = getKeys(key);
      draggingKeys.current = keys;
      draggedKey.current = key;
      selectionManager.setFocused(false);
      setDragging(true);
      if (typeof onDragStart === "function") onDragStart({
        ...event,
        keys
      });
    },
    moveDrag(event) {
      if (typeof onDragMove === "function") onDragMove({
        ...event,
        keys: draggingKeys.current
      });
    },
    endDrag(event) {
      let { isInternal } = event;
      if (typeof onDragEnd === "function") onDragEnd({
        ...event,
        keys: draggingKeys.current,
        isInternal
      });
      draggingKeys.current = /* @__PURE__ */ new Set();
      draggedKey.current = null;
      setDragging(false);
    }
  };
}

// node_modules/react-stately/dist/private/dnd/useDroppableCollectionState.mjs
var import_react44 = __toESM(require_react(), 1);
function $e279703d7ed26e75$export$926850f6ecef79d0(props) {
  let { acceptedDragTypes = "all", isDisabled, onInsert, onRootDrop, onItemDrop, onReorder, onMove, shouldAcceptItemDrop, collection, selectionManager, onDropEnter, getDropOperation, onDrop } = props;
  let [target, setTarget] = (0, import_react44.useState)(null);
  let targetRef = (0, import_react44.useRef)(null);
  let getOppositeTarget = (target2) => {
    if (target2.dropPosition === "before") {
      let node = collection.getItem(target2.key);
      return node && node.prevKey != null ? {
        type: "item",
        key: node.prevKey,
        dropPosition: "after"
      } : null;
    } else if (target2.dropPosition === "after") {
      let node = collection.getItem(target2.key);
      return node && node.nextKey != null ? {
        type: "item",
        key: node.nextKey,
        dropPosition: "before"
      } : null;
    }
    return null;
  };
  let defaultGetDropOperation = (0, import_react44.useCallback)((e) => {
    let { target: target2, types, allowedOperations, isInternal, draggingKeys } = e;
    if (isDisabled || !target2) return "cancel";
    if (acceptedDragTypes === "all" || acceptedDragTypes.some((type) => types.has(type))) {
      let isValidInsert = onInsert && target2.type === "item" && !isInternal && (target2.dropPosition === "before" || target2.dropPosition === "after");
      let isValidReorder = onReorder && target2.type === "item" && isInternal && (target2.dropPosition === "before" || target2.dropPosition === "after") && $e279703d7ed26e75$var$isDraggingWithinParent(collection, target2, draggingKeys);
      let isItemDropAllowed = target2.type !== "item" || target2.dropPosition !== "on" || !shouldAcceptItemDrop || shouldAcceptItemDrop(target2, types);
      let isValidMove = onMove && target2.type === "item" && isInternal && isItemDropAllowed;
      let isValidRootDrop = onRootDrop && target2.type === "root" && !isInternal;
      let isValidOnItemDrop = onItemDrop && target2.type === "item" && target2.dropPosition === "on" && !(isInternal && target2.key != null && draggingKeys.has(target2.key)) && isItemDropAllowed;
      if (onDrop || isValidInsert || isValidReorder || isValidMove || isValidRootDrop || isValidOnItemDrop) {
        if (getDropOperation) return getDropOperation(target2, types, allowedOperations);
        else return allowedOperations[0];
      }
    }
    return "cancel";
  }, [
    isDisabled,
    collection,
    acceptedDragTypes,
    getDropOperation,
    onInsert,
    onRootDrop,
    onItemDrop,
    shouldAcceptItemDrop,
    onReorder,
    onMove,
    onDrop
  ]);
  return {
    collection,
    selectionManager,
    isDisabled,
    target,
    setTarget(newTarget) {
      if (this.isDropTarget(newTarget)) return;
      let target2 = targetRef.current;
      if (target2 && typeof props.onDropExit === "function") props.onDropExit({
        type: "dropexit",
        x: 0,
        y: 0,
        target: target2
      });
      if (newTarget && typeof onDropEnter === "function") onDropEnter({
        type: "dropenter",
        x: 0,
        y: 0,
        target: newTarget
      });
      targetRef.current = newTarget ?? null;
      setTarget(newTarget ?? null);
    },
    isDropTarget(dropTarget) {
      let target2 = targetRef.current;
      if (!target2 || !dropTarget) return false;
      if ($e279703d7ed26e75$var$isEqualDropTarget(dropTarget, target2)) return true;
      if (dropTarget?.type === "item" && target2?.type === "item" && dropTarget.key !== target2.key && dropTarget.dropPosition !== target2.dropPosition && dropTarget.dropPosition !== "on" && target2.dropPosition !== "on") return $e279703d7ed26e75$var$isEqualDropTarget(getOppositeTarget(dropTarget), target2) || $e279703d7ed26e75$var$isEqualDropTarget(dropTarget, getOppositeTarget(target2));
      return false;
    },
    getDropOperation(e) {
      let { target: target2, isInternal, draggingKeys } = e;
      if (isInternal && target2.type === "item" && draggingKeys.size > 0) {
        if (draggingKeys.has(target2.key) && target2.dropPosition === "on") return "cancel";
        let currentKey = target2.key;
        while (currentKey != null) {
          let item = collection.getItem(currentKey);
          let parentKey = item?.parentKey;
          if (parentKey != null && draggingKeys.has(parentKey)) return "cancel";
          currentKey = parentKey ?? null;
        }
      }
      return defaultGetDropOperation(e);
    }
  };
}
function $e279703d7ed26e75$var$isEqualDropTarget(a, b) {
  if (!a) return !b;
  switch (a.type) {
    case "root":
      return b?.type === "root";
    case "item":
      return b?.type === "item" && b?.key === a.key && b?.dropPosition === a.dropPosition;
  }
}
function $e279703d7ed26e75$var$isDraggingWithinParent(collection, target, draggingKeys) {
  let targetNode = collection.getItem(target.key);
  for (let key of draggingKeys) {
    let node = collection.getItem(key);
    if (node?.parentKey !== targetNode?.parentKey) return false;
  }
  return true;
}

// node_modules/react-stately/dist/private/data/useListData.mjs
var import_react45 = __toESM(require_react(), 1);
function $232f8dea1b0a4f2f$export$762f73dccccd255d(options) {
  let { initialItems = [], initialSelectedKeys, getKey = (item) => item.id ?? item.key, filter, initialFilterText = "" } = options;
  let [state, setState] = (0, import_react45.useState)({
    items: initialItems,
    selectedKeys: initialSelectedKeys === "all" ? "all" : new Set(initialSelectedKeys || []),
    filterText: initialFilterText
  });
  let filteredItems = (0, import_react45.useMemo)(() => filter ? state.items.filter((item) => filter(item, state.filterText)) : state.items, [
    state.items,
    state.filterText,
    filter
  ]);
  return {
    ...state,
    items: filteredItems,
    ...$232f8dea1b0a4f2f$export$79c0c687a5963b0a({
      getKey
    }, setState),
    getItem(key) {
      return state.items.find((item) => getKey(item) === key);
    }
  };
}
function $232f8dea1b0a4f2f$export$79c0c687a5963b0a(opts, dispatch) {
  let { cursor, getKey } = opts;
  return {
    setSelectedKeys(selectedKeys) {
      dispatch((state) => ({
        ...state,
        selectedKeys
      }));
    },
    addKeysToSelection(selectedKeys) {
      dispatch((state) => {
        if (state.selectedKeys === "all") return state;
        if (selectedKeys === "all") return {
          ...state,
          selectedKeys: "all"
        };
        return {
          ...state,
          selectedKeys: /* @__PURE__ */ new Set([
            ...state.selectedKeys,
            ...selectedKeys
          ])
        };
      });
    },
    removeKeysFromSelection(selectedKeys) {
      dispatch((state) => {
        if (selectedKeys === "all") return {
          ...state,
          selectedKeys: /* @__PURE__ */ new Set()
        };
        let selection = state.selectedKeys === "all" ? new Set(state.items.map(getKey)) : new Set(state.selectedKeys);
        for (let key of selectedKeys) selection.delete(key);
        return {
          ...state,
          selectedKeys: selection
        };
      });
    },
    setFilterText(filterText) {
      dispatch((state) => ({
        ...state,
        filterText
      }));
    },
    insert(index, ...values) {
      dispatch((state) => $232f8dea1b0a4f2f$var$insert(state, index, ...values));
    },
    insertBefore(key, ...values) {
      dispatch((state) => {
        let index = state.items.findIndex((item) => getKey?.(item) === key);
        if (index === -1) {
          if (state.items.length === 0) index = 0;
          else return state;
        }
        return $232f8dea1b0a4f2f$var$insert(state, index, ...values);
      });
    },
    insertAfter(key, ...values) {
      dispatch((state) => {
        let index = state.items.findIndex((item) => getKey?.(item) === key);
        if (index === -1) {
          if (state.items.length === 0) index = 0;
          else return state;
        }
        return $232f8dea1b0a4f2f$var$insert(state, index + 1, ...values);
      });
    },
    prepend(...values) {
      dispatch((state) => $232f8dea1b0a4f2f$var$insert(state, 0, ...values));
    },
    append(...values) {
      dispatch((state) => $232f8dea1b0a4f2f$var$insert(state, state.items.length, ...values));
    },
    remove(...keys) {
      dispatch((state) => {
        let keySet = new Set(keys);
        let items = state.items.filter((item) => !keySet.has(getKey(item)));
        let selection = "all";
        if (state.selectedKeys !== "all") {
          selection = new Set(state.selectedKeys);
          for (let key of keys) selection.delete(key);
        }
        if (cursor == null && items.length === 0) selection = /* @__PURE__ */ new Set();
        return {
          ...state,
          items,
          selectedKeys: selection
        };
      });
    },
    removeSelectedItems() {
      dispatch((state) => {
        if (state.selectedKeys === "all") return {
          ...state,
          items: [],
          selectedKeys: /* @__PURE__ */ new Set()
        };
        let selectedKeys = state.selectedKeys;
        let items = state.items.filter((item) => !selectedKeys.has(getKey(item)));
        return {
          ...state,
          items,
          selectedKeys: /* @__PURE__ */ new Set()
        };
      });
    },
    move(key, toIndex) {
      dispatch((state) => {
        let index = state.items.findIndex((item2) => getKey(item2) === key);
        if (index === -1) return state;
        let copy = state.items.slice();
        let [item] = copy.splice(index, 1);
        copy.splice(toIndex, 0, item);
        return {
          ...state,
          items: copy
        };
      });
    },
    moveBefore(key, keys) {
      dispatch((state) => {
        let toIndex = state.items.findIndex((item) => getKey(item) === key);
        if (toIndex === -1) return state;
        let keyArray = Array.isArray(keys) ? keys : [
          ...keys
        ];
        let indices = keyArray.map((key2) => state.items.findIndex((item) => getKey(item) === key2)).sort((a, b) => a - b);
        return $232f8dea1b0a4f2f$var$move(state, indices, toIndex);
      });
    },
    moveAfter(key, keys) {
      dispatch((state) => {
        let toIndex = state.items.findIndex((item) => getKey(item) === key);
        if (toIndex === -1) return state;
        let keyArray = Array.isArray(keys) ? keys : [
          ...keys
        ];
        let indices = keyArray.map((key2) => state.items.findIndex((item) => getKey(item) === key2)).sort((a, b) => a - b);
        return $232f8dea1b0a4f2f$var$move(state, indices, toIndex + 1);
      });
    },
    update(key, newValue) {
      dispatch((state) => {
        let index = state.items.findIndex((item) => getKey(item) === key);
        if (index === -1) return state;
        let updatedValue;
        if (typeof newValue === "function") updatedValue = newValue(state.items[index]);
        else updatedValue = newValue;
        return {
          ...state,
          items: [
            ...state.items.slice(0, index),
            updatedValue,
            ...state.items.slice(index + 1)
          ]
        };
      });
    }
  };
}
function $232f8dea1b0a4f2f$var$insert(state, index, ...values) {
  return {
    ...state,
    items: [
      ...state.items.slice(0, index),
      ...values,
      ...state.items.slice(index)
    ]
  };
}
function $232f8dea1b0a4f2f$var$move(state, indices, toIndex) {
  toIndex -= indices.filter((index) => index < toIndex).length;
  let moves = indices.map((from) => ({
    from,
    to: toIndex++
  }));
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i].from;
    for (let j = i; j < moves.length; j++) {
      let b = moves[j].from;
      if (b > a) moves[j].from--;
    }
  }
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i];
    for (let j = moves.length - 1; j > i; j--) {
      let b = moves[j];
      if (b.from < a.to) a.to++;
      else b.from++;
    }
  }
  let copy = state.items.slice();
  for (let move of moves) {
    let [item] = copy.splice(move.from, 1);
    copy.splice(move.to, 0, item);
  }
  return {
    ...state,
    items: copy
  };
}

// node_modules/react-stately/dist/private/data/useTreeData.mjs
var import_react46 = __toESM(require_react(), 1);
function $48fd4b7af0dd022e$export$d14e1352e21f4a16(options) {
  let { initialItems = [], initialSelectedKeys, getKey = (item) => item.id ?? item.key, getChildren = (item) => item.children } = options;
  let [tree, setItems] = (0, import_react46.useState)(() => buildTree(initialItems, /* @__PURE__ */ new Map()));
  let { items, nodeMap } = tree;
  let [selectedKeys, setSelectedKeys] = (0, import_react46.useState)(new Set(initialSelectedKeys || []));
  function buildTree(initialItems2 = [], map, parentKey) {
    if (initialItems2 == null) initialItems2 = [];
    return {
      items: initialItems2.map((item) => {
        let node = {
          key: getKey(item),
          parentKey: parentKey ?? null,
          value: item,
          children: null
        };
        node.children = buildTree(getChildren(item), map, node.key).items;
        map.set(node.key, node);
        return node;
      }),
      nodeMap: map
    };
  }
  function updateTree(items2, key, update, originalMap) {
    let node = key == null ? null : originalMap.get(key);
    if (node == null) return {
      items: items2,
      nodeMap: originalMap
    };
    let map = new Map(originalMap);
    let newNode = update(node);
    if (newNode == null) deleteNode(node, map);
    else addNode(newNode, map);
    while (node && node.parentKey) {
      let nextParent = map.get(node.parentKey);
      let copy = {
        key: nextParent.key,
        parentKey: nextParent.parentKey,
        value: nextParent.value,
        children: null
      };
      let children = nextParent.children;
      if (newNode == null && children) children = children.filter((c) => c !== node);
      copy.children = children?.map((child) => {
        if (child === node)
          return newNode;
        return child;
      }) ?? null;
      map.set(copy.key, copy);
      newNode = copy;
      node = nextParent;
    }
    if (newNode == null) items2 = items2.filter((c) => c !== node);
    return {
      items: items2.map((item) => {
        if (item === node)
          return newNode;
        return item;
      }),
      nodeMap: map
    };
  }
  function addNode(node, map) {
    map.set(node.key, node);
    if (node.children) for (let child of node.children) addNode(child, map);
  }
  function deleteNode(node, map) {
    map.delete(node.key);
    if (node.children) for (let child of node.children) deleteNode(child, map);
  }
  return {
    items,
    selectedKeys,
    setSelectedKeys,
    getItem(key) {
      return nodeMap.get(key);
    },
    insert(parentKey, index, ...values) {
      setItems(({ items: items2, nodeMap: originalMap }) => {
        let { items: newNodes, nodeMap: newMap } = buildTree(values, new Map(originalMap), parentKey);
        if (parentKey == null) return {
          items: [
            ...items2.slice(0, index),
            ...newNodes,
            ...items2.slice(index)
          ],
          nodeMap: newMap
        };
        return updateTree(items2, parentKey, (parentNode) => ({
          key: parentNode.key,
          parentKey: parentNode.parentKey,
          value: parentNode.value,
          children: [
            ...parentNode.children.slice(0, index),
            ...newNodes,
            ...parentNode.children.slice(index)
          ]
        }), newMap);
      });
    },
    insertBefore(key, ...values) {
      let node = nodeMap.get(key);
      if (!node) return;
      let parentNode = nodeMap.get(node.parentKey);
      let nodes = parentNode ? parentNode.children : items;
      let index = nodes.indexOf(node);
      this.insert(parentNode?.key ?? null, index, ...values);
    },
    insertAfter(key, ...values) {
      let node = nodeMap.get(key);
      if (!node) return;
      let parentNode = nodeMap.get(node.parentKey);
      let nodes = parentNode ? parentNode.children : items;
      let index = nodes.indexOf(node);
      this.insert(parentNode?.key ?? null, index + 1, ...values);
    },
    prepend(parentKey, ...values) {
      this.insert(parentKey, 0, ...values);
    },
    append(parentKey, ...values) {
      if (parentKey == null) this.insert(null, items.length, ...values);
      else {
        let parentNode = nodeMap.get(parentKey);
        if (!parentNode) return;
        this.insert(parentKey, parentNode.children.length, ...values);
      }
    },
    remove(...keys) {
      if (keys.length === 0) return;
      let newItems = items;
      let prevMap = nodeMap;
      let newTree;
      for (let key of keys) {
        newTree = updateTree(newItems, key, () => null, prevMap);
        prevMap = newTree.nodeMap;
        newItems = newTree.items;
      }
      setItems(newTree);
      let selection = new Set(selectedKeys);
      for (let key of selectedKeys) if (!newTree.nodeMap.has(key)) selection.delete(key);
      setSelectedKeys(selection);
    },
    removeSelectedItems() {
      this.remove(...selectedKeys);
    },
    move(key, toParentKey, index) {
      setItems(({ items: items2, nodeMap: originalMap }) => {
        let node = originalMap.get(key);
        if (!node) return {
          items: items2,
          nodeMap: originalMap
        };
        let { items: newItems, nodeMap: newMap } = updateTree(items2, key, () => null, originalMap);
        const movedNode = {
          ...node,
          parentKey: toParentKey
        };
        if (toParentKey == null) {
          addNode(movedNode, newMap);
          return {
            items: [
              ...newItems.slice(0, index),
              movedNode,
              ...newItems.slice(index)
            ],
            nodeMap: newMap
          };
        }
        return updateTree(newItems, toParentKey, (parentNode) => ({
          key: parentNode.key,
          parentKey: parentNode.parentKey,
          value: parentNode.value,
          children: [
            ...parentNode.children.slice(0, index),
            movedNode,
            ...parentNode.children.slice(index)
          ]
        }), newMap);
      });
    },
    moveBefore(key, keys) {
      setItems((prevState) => {
        let { items: items2, nodeMap: nodeMap2 } = prevState;
        let node = nodeMap2.get(key);
        if (!node) return prevState;
        let toParentKey = node.parentKey ?? null;
        let parent = null;
        if (toParentKey != null) parent = nodeMap2.get(toParentKey) ?? null;
        let toIndex = parent?.children ? parent.children.indexOf(node) : items2.indexOf(node);
        return $48fd4b7af0dd022e$var$moveItems(prevState, keys, parent, toIndex, updateTree, addNode);
      });
    },
    moveAfter(key, keys) {
      setItems((prevState) => {
        let { items: items2, nodeMap: nodeMap2 } = prevState;
        let node = nodeMap2.get(key);
        if (!node) return prevState;
        let toParentKey = node.parentKey ?? null;
        let parent = null;
        if (toParentKey != null) parent = nodeMap2.get(toParentKey) ?? null;
        let toIndex = parent?.children ? parent.children.indexOf(node) : items2.indexOf(node);
        toIndex++;
        return $48fd4b7af0dd022e$var$moveItems(prevState, keys, parent, toIndex, updateTree, addNode);
      });
    },
    update(oldKey, newValue) {
      setItems(({ items: items2, nodeMap: originalMap }) => updateTree(items2, oldKey, (oldNode) => {
        let node = {
          key: oldNode.key,
          parentKey: oldNode.parentKey,
          value: newValue,
          children: null
        };
        let tree2 = buildTree(getChildren(newValue), originalMap, node.key);
        node.children = tree2.items;
        return node;
      }, originalMap));
    }
  };
}
function $48fd4b7af0dd022e$var$moveItems(state, keys, toParent, toIndex, updateTree, addNode) {
  let { items, nodeMap } = state;
  let parent = toParent;
  let removeKeys = new Set(keys);
  while (parent?.parentKey != null) {
    if (removeKeys.has(parent.key)) throw new Error("Cannot move an item to be a child of itself.");
    parent = nodeMap.get(parent.parentKey) ?? null;
  }
  let originalToIndex = toIndex;
  let keyArray = Array.isArray(keys) ? keys : [
    ...keys
  ];
  let inOrderKeys = /* @__PURE__ */ new Map();
  let removedItems = [];
  let newItems = items;
  let newMap = nodeMap;
  let i = 0;
  function traversal(node, { inorder: inorder2, postorder: postorder2 }) {
    inorder2?.(node);
    if (node != null) for (let child of node.children ?? []) {
      traversal(child, {
        inorder: inorder2,
        postorder: postorder2
      });
      postorder2?.(child);
    }
  }
  function inorder(child) {
    if (keyArray.includes(child.key)) inOrderKeys.set(child.key, i++);
  }
  function postorder(child) {
    if (keyArray.includes(child.key)) {
      removedItems.push({
        ...newMap.get(child.key),
        parentKey: toParent?.key ?? null
      });
      let { items: nextItems, nodeMap: nextMap } = updateTree(newItems, child.key, () => null, newMap);
      newItems = nextItems;
      newMap = nextMap;
    }
    if ((child.parentKey === toParent || child.parentKey === toParent?.key) && keyArray.includes(child.key) && (toParent?.children ? toParent.children.indexOf(child) : items.indexOf(child)) < originalToIndex) toIndex--;
  }
  traversal({
    children: items
  }, {
    inorder,
    postorder
  });
  let inOrderItems = removedItems.sort((a, b) => inOrderKeys.get(a.key) > inOrderKeys.get(b.key) ? 1 : -1);
  if (!toParent || toParent.key == null) {
    inOrderItems.forEach((movedNode) => {
      addNode(movedNode, newMap);
    });
    return {
      items: [
        ...newItems.slice(0, toIndex),
        ...inOrderItems,
        ...newItems.slice(toIndex)
      ],
      nodeMap: newMap
    };
  }
  return updateTree(newItems, toParent.key, (parentNode) => ({
    key: parentNode.key,
    parentKey: parentNode.parentKey,
    value: parentNode.value,
    children: [
      ...parentNode.children.slice(0, toIndex),
      ...inOrderItems,
      ...parentNode.children.slice(toIndex)
    ]
  }), newMap);
}

// node_modules/react-stately/dist/private/data/useAsyncList.mjs
var import_react47 = __toESM(require_react(), 1);
function $c73d3f3d5ec90946$var$reducer(data, action) {
  let selectedKeys;
  switch (data.state) {
    case "idle":
    case "error":
      switch (action.type) {
        case "loading":
        case "loadingMore":
        case "sorting":
        case "filtering":
          return {
            ...data,
            filterText: action.filterText ?? data.filterText,
            state: action.type,
            // Reset items to an empty list if loading, but not when sorting.
            items: action.type === "loading" ? [] : data.items,
            sortDescriptor: action.sortDescriptor ?? data.sortDescriptor,
            abortController: action.abortController
          };
        case "update":
          return {
            ...data,
            ...action.updater?.(data)
          };
        case "success":
        case "error":
          return data;
        default:
          throw new Error(`Invalid action "${action.type}" in state "${data.state}"`);
      }
    case "loading":
    case "sorting":
    case "filtering":
      switch (action.type) {
        case "success":
          if (action.abortController !== data.abortController) return data;
          selectedKeys = action.selectedKeys ?? data.selectedKeys;
          return {
            ...data,
            filterText: action.filterText ?? data.filterText,
            state: "idle",
            items: [
              ...action.items ?? []
            ],
            selectedKeys: selectedKeys === "all" ? "all" : new Set(selectedKeys),
            sortDescriptor: action.sortDescriptor ?? data.sortDescriptor,
            abortController: void 0,
            cursor: action.cursor
          };
        case "error":
          if (action.abortController !== data.abortController) return data;
          return {
            ...data,
            state: "error",
            error: action.error,
            abortController: void 0
          };
        case "loading":
        case "loadingMore":
        case "sorting":
        case "filtering":
          data.abortController?.abort("aborting current load and starting new one");
          return {
            ...data,
            filterText: action.filterText ?? data.filterText,
            state: action.type,
            // Reset items to an empty list if loading, but not when sorting.
            items: action.type === "loading" ? [] : data.items,
            abortController: action.abortController
          };
        case "update":
          return {
            ...data,
            ...action.updater?.(data)
          };
        default:
          throw new Error(`Invalid action "${action.type}" in state "${data.state}"`);
      }
    case "loadingMore":
      switch (action.type) {
        case "success":
          selectedKeys = data.selectedKeys === "all" || action.selectedKeys === "all" ? "all" : /* @__PURE__ */ new Set([
            ...data.selectedKeys,
            ...action.selectedKeys ?? []
          ]);
          return {
            ...data,
            state: "idle",
            items: [
              ...data.items,
              ...action.items ?? []
            ],
            selectedKeys,
            sortDescriptor: action.sortDescriptor ?? data.sortDescriptor,
            abortController: void 0,
            cursor: action.cursor
          };
        case "error":
          if (action.abortController !== data.abortController) return data;
          return {
            ...data,
            state: "error",
            error: action.error
          };
        case "loading":
        case "sorting":
        case "filtering":
          data.abortController?.abort();
          return {
            ...data,
            filterText: action.filterText ?? data.filterText,
            state: action.type,
            // Reset items to an empty list if loading, but not when sorting.
            items: action.type === "loading" ? [] : data.items,
            abortController: action.abortController
          };
        case "loadingMore":
          action.abortController?.abort();
          return data;
        case "update":
          return {
            ...data,
            ...action.updater?.(data)
          };
        default:
          throw new Error(`Invalid action "${action.type}" in state "${data.state}"`);
      }
    default:
      throw new Error(`Invalid state "${data.state}"`);
  }
}
function $c73d3f3d5ec90946$export$bc3384a35de93d66(options) {
  const { load, sort, initialSelectedKeys, initialSortDescriptor, getKey = (item) => item.id || item.key, initialFilterText = "" } = options;
  let [data, dispatch] = (0, import_react47.useReducer)($c73d3f3d5ec90946$var$reducer, {
    state: "idle",
    error: void 0,
    items: [],
    selectedKeys: initialSelectedKeys === "all" ? "all" : new Set(initialSelectedKeys),
    sortDescriptor: initialSortDescriptor,
    filterText: initialFilterText
  });
  const dispatchFetch = async (action, fn) => {
    let abortController = new AbortController();
    try {
      dispatch({
        ...action,
        abortController
      });
      let previousFilterText = action.filterText ?? data.filterText;
      let response = await fn({
        items: data.items.slice(),
        selectedKeys: data.selectedKeys,
        sortDescriptor: action.sortDescriptor ?? data.sortDescriptor,
        signal: abortController.signal,
        cursor: action.type === "loadingMore" ? data.cursor : void 0,
        filterText: previousFilterText,
        loadingState: data.state
      });
      let filterText = response.filterText ?? previousFilterText;
      dispatch({
        type: "success",
        ...response,
        abortController
      });
      if (filterText && filterText !== previousFilterText && !abortController.signal.aborted) dispatchFetch({
        type: "filtering",
        filterText
      }, load);
    } catch (e) {
      dispatch({
        type: "error",
        error: e,
        abortController
      });
    }
  };
  let didDispatchInitialFetch = (0, import_react47.useRef)(false);
  (0, import_react47.useEffect)(() => {
    if (!didDispatchInitialFetch.current) {
      dispatchFetch({
        type: "loading"
      }, load);
      didDispatchInitialFetch.current = true;
    }
  }, []);
  return {
    items: data.items,
    selectedKeys: data.selectedKeys,
    sortDescriptor: data.sortDescriptor,
    isLoading: data.state === "loading" || data.state === "loadingMore" || data.state === "sorting" || data.state === "filtering",
    loadingState: data.state,
    error: data.error,
    filterText: data.filterText,
    getItem(key) {
      return data.items.find((item) => getKey(item) === key);
    },
    reload() {
      dispatchFetch({
        type: "loading"
      }, load);
    },
    loadMore() {
      if (data.state === "loading" || data.state === "loadingMore" || data.state === "filtering" || data.cursor == null) return;
      dispatchFetch({
        type: "loadingMore"
      }, load);
    },
    sort(sortDescriptor) {
      dispatchFetch({
        type: "sorting",
        sortDescriptor
      }, sort || load);
    },
    ...(0, $232f8dea1b0a4f2f$export$79c0c687a5963b0a)({
      ...options,
      getKey,
      cursor: data.cursor
    }, (fn) => {
      dispatch({
        type: "update",
        updater: fn
      });
    }),
    setFilterText(filterText) {
      dispatchFetch({
        type: "filtering",
        filterText
      }, load);
    }
  };
}

export {
  $ea0ea6e62ae0d7ca$export$6d095e787d2b5e1f,
  $a0a87fb6fcfb22ec$export$9a987164d97ecc90,
  $8cd68577ce0207f7$export$daff6da51032a415,
  $1f22dbfd2b026cf2$export$6df7f0e2cabc7eef,
  $83c2160a93ad557c$export$d52a01683abdfcd6,
  $3d0ee518c6f3d04f$export$7f629e9dc1ecf37c,
  $378fa61546b28d38$export$b9fc0d69c9190c4a,
  $d806310b82f07e9d$export$e5fda3247f5d67f9,
  $e1eacc05b29dcc25$export$57bc203e1c9c6d44,
  $60f19cefd567a3e4$export$253fe78d46329472,
  $4a07ac835f260f78$export$6c8a5aaad13c9852,
  $d03379b88399b8c5$export$6cd28814d92fa9c9,
  $b14b6f590b50af39$export$2f645645f7bca764,
  $b14b6f590b50af39$export$ba9d38c0f1bf2b36,
  $f229ad6ed8947519$export$dc6b73b623f8645f,
  $40ea08f45638eac2$export$f4301076d9336137,
  $f11fb0bcf1b2687a$export$61c6a8c84e605fb6,
  $e3403870bfb691da$export$79fefeb1c2091ac3,
  $5b3242e27644e8f1$export$cfc51cf86138bf98,
  $6b915bde6cd300dd$export$728d6ba534403756,
  $120eca7b9c40f820$export$b453a3bfd4a5fa9e,
  $8e7461aabf74661f$export$60e84778edff6d26,
  $b822555cf9fe955c$export$fd53cef0cc796101,
  $28aae683a942e141$export$87194bb378cc3ac2,
  $6de3e3f1a7663217$export$e50a61c1de9f574,
  $29a18fa139197b5c$export$f36461af0ef4707d,
  $086b1fd51041276f$export$3fcbf6e4407997e0,
  $3834487504f4fc00$export$4d40659c25ecb50b,
  $384704861d32dbed$export$bca9d026f8e704eb,
  $56baeede9f35e022$export$3f8be18b0f41eaf2,
  $29256f53a2edafe9$export$5159ec8b34d4ec12,
  $3b14a8cc70843920$export$7c127db850d4e81e,
  $f6cebac1c03d2516$export$cb895dcf85db1319,
  $178a7f94e1b4b497$export$907bcc6c48325fd6,
  $178a7f94e1b4b497$export$31447e17397b15c2,
  $bf42fa5f8ac488ca$export$f6f0c3fe4ec306ea,
  $6f60280352002908$export$816b5d811295e6bc,
  $6d3258838ae978da$export$b59bdbef9ce70de2,
  $bf2d76ed9fa06f12$export$76ccd210b9029917,
  $69c35e5665163bd0$export$f850895b287ef28e,
  $b88f793813fc795e$export$baf26146a414f24a,
  $af827553fd3cf456$export$c79fc6492f3af13d,
  $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec,
  $6bbafa22c92cc056$export$1a5223887c560441,
  $51e619e0f141c3ec$export$1505db82fe357e65,
  $85410e0c3cc54f1d$export$c84671f46d6a1ca,
  $eb6255cbf080eb7d$export$7e0eeb9da702a085,
  $fc34f5dff94ff74a$export$7d2b12578154a735,
  $942f06a693c162e2$export$cacbb3924155d68e,
  $024b19c559603d56$export$62444c3c724b1b20,
  $71719b7c112ce40e$export$e9f7cda058ba8df8,
  $0fdb127d377ffd84$export$e7f05e985daf4b5f,
  $caeb030f09a278a1$export$4ba071daf4e486,
  $ac6ee1e83ff78022$export$c7b26b20d3ced9c5,
  $ac6ee1e83ff78022$export$84726ef35ca2129a,
  $ac6ee1e83ff78022$export$f1f8569633bbbec4,
  $3d8ad31c4c1725e9$export$8deac67f4addf270,
  $b2d15a2f12e80349$export$29efd034f1d79f81,
  $e279703d7ed26e75$export$926850f6ecef79d0,
  $232f8dea1b0a4f2f$export$762f73dccccd255d,
  $48fd4b7af0dd022e$export$d14e1352e21f4a16,
  $c73d3f3d5ec90946$export$bc3384a35de93d66
};
//# sourceMappingURL=chunk-BNLR45FO.js.map
