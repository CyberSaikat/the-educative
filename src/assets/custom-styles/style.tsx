import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`;

const Grid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  background: #222;
  border-radius: 20px;
  position: relative;
`;

const CardContent = styled.div`
  padding: 1.2rem;
  color: #fff;
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90%;
  padding: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: hsl(var(--accent));
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: hsl(var(--accent));
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.div)`
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
`;

const ExpandButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: hsl(var(--accent));
  color: #111;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

export {
  Container,
  Grid,
  Card,
  CardContent,
  HeaderWrapper,
  IconWrapper,
  Title,
  Description,
  ExpandButton,
};
