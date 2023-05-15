function hex2hsv(hex) {
  return rgb2hsv(hex2rgb(hex))
}
function rgb2hsv(rgb) {
  var
    r = rgb[0],
    g = rgb[1],
    b = rgb[2],
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    delta = max - min,
    h, s, v = max;

  v = Math.floor(max / 255 * 100);
  if (max !== 0) {
    s = Math.floor(delta / max * 100);
  } else {
    return [0, 0, 0];
  }
  if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else {
    h = 4 + (r - g) / delta;
  }
  h = Math.floor(h * 60);
  if (h < 0) {
    h += 360;
  }
  return [h, s, v];
}
function hex2rgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    result, r, g, b;
  hex = hex.replace(shorthandRegex, function (r, g, b) {
    return r + r + g + g + b + b;
  });
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  r = 97;
  g = 179;
  b = 255;
  if (result) {
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
  }
  return [r, g, b];
}
function degrees(degrees, offset) {
  degrees += offset;
  if (degrees > 360) {
    degrees -= 360;
  } else if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}
function hsv2hex(hsv) {
  return rgb2hex(hsv2rgb(hsv));
}
function rgb2hex(rgb) {
  var hex = '',
    h, i, c;
  for (i = 0; i < rgb.length; i += 1) {
    c = rgb[i];
    h = c.toString(16);
    h = (h.length === 1) ? "0" + h : h;
    hex += h;
  }
  return '#' + hex;
}
function hsv2rgb(hsv) {
  var
    r, g, b, i, f, p, q, t, h = hsv[0],
    s = hsv[1],
    v = hsv[2];
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
  s /= 100;
  v /= 100;
  if (s === 0) {
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return [r, g, b];

}

module.exports = {
  hex2hsv: hex2hsv,
  rgb2hsv: rgb2hsv,
  hex2rgb: hex2rgb,
  degrees: degrees,
  hsv2hex: hsv2hex,
  rgb2hex: rgb2hex,
  hsv2rgb: hsv2rgb
}