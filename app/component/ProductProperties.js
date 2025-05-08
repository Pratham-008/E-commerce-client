import styled from "styled-components";
const Title=styled.div`
font-size:1.2rem;
font-weight:bold;
`
const Styleddiv=styled.div`
font-size:.8rem;
`

export default function ProductProperties({ product }) {

  return (
    <>
      <Title>Properties</Title>
      <Styleddiv>
        {Object.entries(product?.properties||{}).map(([key, value]) => (
          <p key={key}>
           {key}: {value}
          </p>
        ))}
      </Styleddiv>
    </>
  );
}
