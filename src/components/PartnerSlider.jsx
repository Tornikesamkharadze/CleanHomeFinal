import React from "react";
import styled, { keyframes, css } from "styled-components";

function PartnerSlider() {
  const row1 = [
    "https://uglubricants.com/wp-content/uploads/2023/02/png_mn.png",
    /* "https://uglubricants.com/wp-content/uploads/2023/02/png-rustavi.png", */
    /* "https://uglubricants.com/wp-content/uploads/2023/02/png_azot.png", */
    "https://uglubricants.com/wp-content/uploads/2023/02/png-m.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCQcc5RarkB22jlpVSmjmYZ39grOapXL0AMRf0JHChELsfELFfyzEHkyZLew22-YSQvk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRM_fa7-xpeNSitSTX-v5zpkDJKSBFH8GC8foJ5cG&s",
    "https://oilproducts.s3.amazonaws.com/download.png",
    "https://oilproducts.s3.amazonaws.com/download.jpeg",
  ];

  return (
    <>
      <HeadingText>პარტნიორი კომპანიები </HeadingText>
      <AppContainer>
        <Wrapper>
          <Marquee>
            <MarqueeGroup>
              {row1.map((el, index) => (
                <ImageGroup key={index}>
                  <Image>
                    <img
                      style={{ width: "100%", objectFit: "contain" }}
                      src={el}
                    />
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup>
            <MarqueeGroup>
              {row1.map((el, index) => (
                <ImageGroup key={index}>
                  <Image src={el}>
                    <img
                      style={{ width: "100%", objectFit: "contain" }}
                      src={el}
                    />
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup>
          </Marquee>
        </Wrapper>
      </AppContainer>
    </>
  );
}

const HeadingText = styled.h1`
  text-align: center;
  padding: 40px;
  color: #24355a;
  font-size: 27px;
`;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 1320px;
  width: 100%;
  height: auto;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Marquee = styled.div`
  display: flex;
  width: 2100px;
  overflow-x: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 5%,
    hsl(0 0% 0% / 1) 95%,
    hsl(0 0% 0% / 0)
  );
`;
const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 2100px; // increased the width
  margin-left: 90px; // increased the margin
  margin-right: 90px; // increased the margin

  padding: 5px;
  width: 180px;
  margin-left: 30px;
  margin-right: 30px;

  @media (max-width: 600px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;
const Image = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 200px;
  height: auto;
  border-radius: 0.5rem;

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: 100%;
  }
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
  animation: ${scrollX} 30s linear infinite; // increased the animation duration

  @media (max-width: 600px) {
    animation: ${scrollX} 22s linear infinite;
  }
`;

export default PartnerSlider;
