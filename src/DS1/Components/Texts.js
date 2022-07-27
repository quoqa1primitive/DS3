import React from 'react'
import { TextBox } from '../../BasicElements/BasicElements.js';
import { title, text1, text2, text3, text4, text5, text6 } from '../BaseStructure/Constants_DS1.js';
import { xyzProps, TextComponentHeight } from '../BaseStructure/Constants_DS1.js';

function TextGroup({texts, position, type}){
  return (
    <group>{
      texts.map((text, idx) =>
        <TextBox
          key={"textBox_"+type+idx}
          text={text}
          textType={type}
          position={position[idx]}
          lookAt={false}
          anchorX={"center"}
          anchorY={"top"}
        />
      )}
    </group>
  )
}

const TextComponent = React.forwardRef((props, ref) =>{
  const textPos = [-xyzProps.xLength / 2, -xyzProps.yLength / 2, -xyzProps.zLength / 2];
  const xWidth = -2*textPos[0]
  const titles = [title];
  const texts = [text1, text2, text3, text4, text5, text6];

  return(
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.100 * TextComponentHeight, 0],
          [xWidth*0.75, -0.320 * TextComponentHeight, 0],
          [0, -0.480 * TextComponentHeight, 0],
          [0, -0.640 * TextComponentHeight, 0],
          [0, -0.830 * TextComponentHeight, 0],
          [0, -1.000 * TextComponentHeight, 0],
        ]} />
    </group>
  );
});

export { TextComponent };
