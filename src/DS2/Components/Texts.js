import React from 'react'
import { TextBox } from '../../BasicElements/BasicElements.js';
import { xyzProps, TextComponentHeight, title, text1, text2, text3, text4, text5, text6 } from '../BaseStructure/Constants_DS2.js';

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

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5];

  return(
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.160 * TextComponentHeight, 0],
          [0, -0.330 * TextComponentHeight, 0],
          [0, -0.500 * TextComponentHeight, 0],
          [0, -0.700 * TextComponentHeight, 0],
          [0, -0.985 * TextComponentHeight, 0],
        ]} />
    </group>
  );
});

export { TextComponent };
