import styled from 'styled-components';
import { darken, lighten, rgba } from 'polished';

const diameter = '10vw';

function hexToRgb(hex, alpha = 1) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
        alpha: alpha,
    } : null;
}

// http://codepen.io/dodozhang21/pen/Ewftz
export default styled.div`
  background: ${props => props.color};
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 -2px 0 3px ${props => darken(0.1, props.color)} inset, 0 5px 5px ${props => rgba(hexToRgb(darken(0.4, props.color), 0.17))}, 0 15px ${rgba(255,255,255, 0.25)} inset;
  cursor: pointer;
  display: inline-block;
  height: ${diameter};
  width: ${diameter};

  &:hover {
    background: ${props => lighten(0.02, props.color)};
    box-shadow: 0 -2px 0 3px ${props => darken(0.1, lighten(0.02, props.color))} inset, 0 5px 5px ${props => rgba(hexToRgb(darken(0.4, lighten(0.02, props.color)), 0.17))}, 0 15px ${rgba(255,255,255, 0.32)} inset;
   }

  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
`;
