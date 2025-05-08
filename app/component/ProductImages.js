import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
const Styledimage = styled.img`
  max-width: 100%;
  object-fit: contain;
  diplay: flex;
  align-items: center;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-grow: 0;
`;

const ImageButton = styled.div`
  border: 2px solid #aaa;
  height: 60px;
  width: 100%;
  justify-content: center;
  display: flex;
  background-color: #ccc;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  ${(props) =>
    props.$active
      ? `border-color:#aaa;`
      : `
      border-color:Transparent;
      opacity:.8;
    
    `}
`;
const Styleddiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;

export default function ProductImages({ images }) {
  const [activeimage, setactiveimage] = useState(images?.[0]);
  return (
    <>
      <Styleddiv>
        <Styledimage src={activeimage} />
      </Styleddiv>
      <ImageButtons>
        {images.map((e, index) => (
          <ImageButton
            key={index}
            $active={e === activeimage}
            onClick={() => setactiveimage(e)}
          >
            <Styledimage src={e} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
