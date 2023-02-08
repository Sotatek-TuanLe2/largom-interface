import { Box } from '@chakra-ui/layout';
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import 'src/styles/components/AppInputRange.scss';
import { useState } from 'react';
import _ from 'lodash';

interface IAppInputRange {
  countDistance?: number;
}

const AppInputRange: React.FC<IAppInputRange> = ({ countDistance = 4 }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showPercentLabel, setShowPercentLabel] = useState(false);
  const labelStyles = {
    fontSize: 'sm',
    zIndex: 100,
    transform: 'auto',
    translateX: '-50%',
    translateY: '-50%',
  };

  const _renderSliderMark = (defaultValue: number, currentValue: number) => {
    if (defaultValue > currentValue) {
      return (
        <div className="slider-mark">
          <div className="decor-slider"></div>
        </div>
      );
    } else
      return (
        <div className="slider-mark-active">
          <div className="decor-slider-active"></div>
        </div>
      );
  };
  return (
    <Box pb={2} px={2}>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => {
          setSliderValue(val);
        }}
        height="4px"
        onMouseEnter={() => setShowPercentLabel(true)}
        onMouseLeave={() => setShowPercentLabel(false)}
      >
        {_.range(countDistance).map((count, index) => {
          return (
            <SliderMark
              value={(100 / countDistance) * count}
              {...labelStyles}
              key={`${index}_mark`}
            >
              {_renderSliderMark((100 / countDistance) * count, sliderValue)}
            </SliderMark>
          );
        })}
        <SliderMark value={100} {...labelStyles}>
          {_renderSliderMark(100, sliderValue)}
        </SliderMark>
        {showPercentLabel && (
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="main.100"
            color="white"
            className="percent-slider"
          >
            {sliderValue}%
          </SliderMark>
        )}
        <SliderTrack background={'border.300'} overflow="visible"></SliderTrack>
        <SliderFilledTrack background={'main.100'} />
        <div
          style={{
            left: `${sliderValue}%`,
            position: 'absolute',
          }}
          className="slider-thumb"
        ></div>
      </Slider>
    </Box>
  );
};

export default AppInputRange;
