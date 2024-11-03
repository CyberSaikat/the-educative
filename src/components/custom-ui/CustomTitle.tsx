import React from 'react';
import "@/assets/css/titleDesign.css";
import { HeadingProps } from "@/abstract/interface";

export const StyleOne: React.FC<HeadingProps> = ({ title }) => (
    <div className="one title">
        <h1>{title}</h1>
    </div>
);

export const StyleTwo: React.FC<HeadingProps> = ({ title, tagline }) => (
    <div className="two title">
        <h1>{title} <span>{tagline}</span></h1>
    </div>
);

export const StyleTwoAlt: React.FC<HeadingProps> = ({ title, tagline }) => (
    <div className="two alt-two title">
        <h1>{title} <span>{tagline}</span></h1>
    </div>
);

export const StyleThree: React.FC<HeadingProps> = ({ title }) => (
    <div className="three title">
        <h1>{title}</h1>
    </div>
);

export const StyleFour: React.FC<HeadingProps> = ({ title, tagline }) => (
    <div className="four title">
        <h1><span>{tagline}</span> {title} <em>Style</em> Four</h1>
    </div>
);

export const StyleFive: React.FC<HeadingProps> = ({ title, tagline }) => (
    <div className="five title">
        <h1>{title} <span>{tagline}</span></h1>
    </div>
);

export const StyleSix: React.FC<HeadingProps> = ({ title, tagline, className }) => (
    <div className={`six title`}>
        <h1 className={className}>{title} <span>{tagline}</span></h1>
    </div>
);

export const StyleSeven: React.FC<HeadingProps> = ({ title }) => (
    <div className="seven title">
        <h1>{title}</h1>
    </div>
);

export const StyleEight: React.FC<HeadingProps> = ({ title }) => (
    <div className="eight title">
        <h1>{title}</h1>
    </div>
);

export const StyleNine: React.FC<HeadingProps> = ({ title, tagline }) => (
    <div className="nine title">
        <h1>{title}<span>{tagline}</span></h1>
    </div>
);

export const StyleTen: React.FC<HeadingProps> = ({ title }) => (
    <div className="ten title">
        <h1>{title}</h1>
    </div>
);

export const StyleEleven: React.FC<HeadingProps> = ({ title }) => (
    <div className="eleven title">
        <h1>{title}</h1>
    </div>
);

export const StyleTwelve: React.FC<HeadingProps> = ({ title }) => (
    <div className="twelve title">
        <h1>{title}</h1>
    </div>
);

export const StyleThirteen: React.FC<HeadingProps> = ({ title, className }) => (
  <div className="thirteen title text-center">
    <h1 className={className}>{title}</h1>
  </div>
);