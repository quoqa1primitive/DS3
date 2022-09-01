import React from 'react'
import { TextBox } from '../../BasicElements/BasicElements.js';
import { xyzProps, TextComponentHeight, title, text1, text2, text3, text4, text5, text6, text7} from '../BaseStructure/Constants_DS2.js';

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
  const texts = [text1, text2, text3, text4, text5, text6, text7];

  return(
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.030 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.150 * TextComponentHeight, 0],
          [0, -0.300 * TextComponentHeight, 0],
          [0, -0.450 * TextComponentHeight, 0],
          [0, -0.600 * TextComponentHeight, 0],
          [0, -0.730 * TextComponentHeight, 0],
          [0, -0.860 * TextComponentHeight, 0],
          [0, -0.970 * TextComponentHeight, 0],
        ]} />
    </group>
  );
});

export { TextComponent };
