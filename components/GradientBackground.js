import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

const GradientBackground = () => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <RadialGradient id="grad" cx="50%" cy="50%" r="60%" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#354CE6" />
          <Stop offset="100%" stopColor="#172cb8" />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
