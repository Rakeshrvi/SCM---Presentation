

import React, { useEffect, useRef, useState } from 'react';
// FIX: Add PieProps to the import to allow for type patching.
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector, ReferenceLine, PieProps } from 'recharts';
import { SlideData, SlideType, ArchitectureNode } from '../types';
import { ApolloLogo, PowerBILogo, ArrowIcon } from './icons';

interface SlideProps {
  slide: SlideData;
}

const HEADING_COLOR = '#1B3C53';
const SUBTITLE_COLOR = '#1B3C53';
const ACCENT_COLOR = '#456882';
const BORDER_COLOR = '#D1D5DB';
const BG_ACCENT_COLOR = '#F0F2F5';
const BG_MAIN_COLOR = '#F9F8F6';

const PIE_COLORS = ['#6B8DA7', '#F0AD4E', '#A9B9C6', '#456882'];

const AnimatedBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const getPath = (x: number, y: number, width: number, height: number, radius: number) => {
    const r = Math.min(radius, width / 2, height);
    return `M ${x},${y + height} 
            L ${x},${y + r} 
            A ${r},${r} 0 0 1 ${x + r},${y} 
            L ${x + width - r},${y} 
            A ${r},${r} 0 0 1 ${x + width},${y + r} 
            L ${x + width},${y + height} 
            Z`;
  };

  const RoundedBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    if (height <= 0) return null;
    return <path d={getPath(x, y, width, height, 8)} stroke="none" fill={fill} />;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-lg border border-gray-200/50">
          <p className="font-bold text-base text-[#1B3C53] mb-2">{`Date: ${label}`}</p>
          {payload.map((pld: any) => (
            <div key={pld.dataKey} className="flex items-center text-sm my-1">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: pld.fill }}></div>
              <span className="font-semibold w-24" style={{ color: HEADING_COLOR }}>{`${pld.dataKey}: `}</span>
              <span className="ml-1 font-bold text-[#1B3C53]">{`${pld.value}${pld.unit || ''}`}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };


  return (
    <div ref={chartRef} className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" stroke={BORDER_COLOR} tick={{ fill: SUBTITLE_COLOR, fontSize: 14 }} />
          <YAxis stroke={BORDER_COLOR} tick={{ fill: SUBTITLE_COLOR, fontSize: 14 }}/>
          <Tooltip 
            cursor={{ fill: 'rgba(69, 104, 130, 0.1)' }}
            content={<CustomTooltip />}
          />
          <Legend wrapperStyle={{ color: SUBTITLE_COLOR, fontSize: '14px', paddingTop: '20px' }} />
          <ReferenceLine y={80} label={{ value: "Target Adherence", position: 'insideTopRight', fill: '#C0504D', fontSize: 12, fontWeight: 'bold' }} stroke="#C0504D" strokeDasharray="5 5" />
          <Bar dataKey="Planned" fill="#A9B9C6" stackId="a" animationBegin={startAnimation ? 0 : undefined} animationDuration={1000} />
          <Bar dataKey="Actual" fill="#6B8DA7" stackId="a" shape={<RoundedBar />} animationBegin={startAnimation ? 0 : undefined} animationDuration={1000} />
          <Bar dataKey="Adherence" fill="#F0AD4E" unit="%" shape={<RoundedBar />} animationBegin={startAnimation ? 0 : undefined} animationDuration={1000}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnimatedPieChart: React.FC<{ slide: SlideData }> = ({ slide }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={HEADING_COLOR} className="text-3xl font-bold">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={SUBTITLE_COLOR} className="text-lg">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: `drop-shadow(0px 4px 10px ${fill}99)` }}
        />
      </g>
    );
  };

  // FIX: The installed @types/recharts version has incorrect typings for the Pie component,
  // missing the `activeIndex` property. This cast adds the missing property
  // to allow the component to be used as intended by the library.
  const PatchedPie = Pie as React.ComponentType<PieProps & { activeIndex?: number }>;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <PatchedPie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={slide.chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={150}
            fill="#A9B9C6"
            paddingAngle={3}
            onMouseEnter={onPieEnter}
            isAnimationActive={true} // Use recharts' built-in animation
            animationDuration={1500}
          >
            {slide.chartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} style={{transition: 'opacity 0.2s', opacity: activeIndex === index ? 1 : 0.5 }} />
            ))}
          </PatchedPie>
          <Tooltip contentStyle={{ display: 'none' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


// --- Individual Slide Components ---

const TitleSlide: React.FC<SlideProps> = ({ slide }) => (
  <div className="relative flex flex-col items-center justify-center h-full text-center min-h-screen">
    <img 
      src="https://github.com/Rakeshrvi/SCM-Asset/blob/main/LEAD_CHRIST-removebg-preview.png?raw=true" 
      alt="LEAD Christ University Logo" 
      className="absolute top-4 left-1/2 -ml-28 md:-ml-60 h-32 w-auto anim-child" 
    />
    <div className="flex flex-col md:flex-row gap-8 mb-12 anim-child">
      <ApolloLogo />
      <PowerBILogo />
    </div>
    <h1 className="text-6xl md:text-7xl font-extrabold text-[#1B3C53] leading-tight anim-child">{slide.title}</h1>
    <p className="mt-4 text-2xl md:text-3xl text-[#1B3C53] anim-child font-semibold">{slide.subtitle}</p>
    <div className="mt-16 border-t-2 border-[#D1D5DB] pt-8 anim-child">
      <p className="text-2xl text-[#1B3C53] font-bold">{slide.presenter?.name}</p>
      <p className="text-xl text-[#1B3C53]">{slide.presenter?.institution}</p>
    </div>
  </div>
);

const IntroSlide: React.FC<SlideProps> = ({ slide }) => (
  <div className="grid md:grid-cols-2 gap-24 items-center">
    <div className="anim-child">
      <h2 className="text-5xl font-extrabold mb-8 text-[#1B3C53]">{slide.title}</h2>
      <ul className="space-y-4 text-xl list-disc list-inside text-[#1B3C53]">
        {slide.mainPoints?.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
      </ul>
    </div>
    <div className="flex flex-col items-center justify-center anim-child">
      <AnimatedPieChart slide={slide} />
      <p className="text-sm text-[#1B3C53] mt-2">{slide.footnote}</p>
    </div>
  </div>
);

const FlowSlide: React.FC<SlideProps> = ({ slide }) => (
    <div className="flex flex-col justify-center h-full items-center">
        <h2 className="text-5xl font-extrabold mb-20 text-center anim-child text-[#1B3C53]">{slide.title}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full">
            {slide.architecture?.map((node: ArchitectureNode, i: number) => (
                <React.Fragment key={i}>
                    <div className="anim-child bg-white p-6 rounded-lg text-center w-60 border border-[#D1D5DB] z-10 shadow-lg shrink-0">
                        <h3 className="font-bold text-xl text-[#1B3C53]">{node.name}</h3>
                        {node.description && <p className="text-base mt-2 text-[#1B3C53]">{node.description}</p>}
                    </div>
                    {i < slide.architecture!.length - 1 && (
                      <div className="anim-child flex-grow justify-center items-center hidden md:flex">
                        <ArrowIcon />
                      </div>
                    )}
                </React.Fragment>
            ))}
        </div>
        {slide.mainPoints && (
             <ul className="mt-16 space-y-3 text-lg list-disc list-inside max-w-4xl anim-child text-[#1B3C53]">
                {slide.mainPoints.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
            </ul>
        )}
    </div>
);

const TableSlide: React.FC<SlideProps> = ({ slide }) => (
  <div className="flex flex-col justify-center h-full items-center">
     <h2 className="text-5xl font-extrabold mb-4 text-center anim-child text-[#1B3C53]">{slide.title}</h2>
     {slide.subtitle && <p className="text-xl text-[#1B3C53] mb-8 text-center anim-child font-semibold">{slide.subtitle}</p>}
     {slide.mainPoints && (
      <p className="mb-8 max-w-3xl text-center anim-child text-xl text-[#1B3C53]">
        {(() => {
          const pointText = typeof slide.mainPoints[0] === 'string' ? slide.mainPoints[0] : slide.mainPoints[0].title;
          if (slide.id === 6 && pointText.startsWith('Key Challenge:')) {
            const parts = pointText.split(':');
            return (
              <>
                <span className="font-bold underline">{parts[0]}:</span>
                <span>{parts.slice(1).join(':')}</span>
              </>
            );
          }
          return pointText;
        })()}
      </p>
    )}
    <div className="w-full max-w-5xl border border-[#D1D5DB] rounded-lg overflow-hidden bg-white shadow-md anim-child">
        <table className="w-full text-base text-[#1B3C53]">
            <thead className="bg-[#F0F2F5] text-[#1B3C53]">
                <tr>{slide.table?.headers.map(h => <th key={h} className="p-4 text-left font-semibold tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody>
                {slide.table?.rows.map((row, i) => (
                    <tr key={i} className="border-t border-[#F0F2F5] hover:bg-slate-50">
                        {slide.table?.headers.map(h => <td key={h} className="p-4">{row[h]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
     {slide.mainPoints && slide.mainPoints.length > 1 && <p className="mt-8 max-w-3xl text-center font-bold text-xl text-[#1B3C53] anim-child">{typeof slide.mainPoints[1] === 'string' ? slide.mainPoints[1] : slide.mainPoints[1].title}</p>}
  </div>
);

const ExampleSlide: React.FC<SlideProps> = ({ slide }) => (
     <div className="flex flex-col items-center">
        <h2 className="text-5xl font-extrabold mb-2 text-center anim-child text-[#1B3C53]">{slide.title}</h2>
        <p className="text-xl text-[#1B3C53] mb-12 text-center anim-child font-semibold">{slide.subtitle}</p>
         <div className="grid md:grid-cols-2 gap-16 w-full items-center">
             <div className="anim-child">
                 <div className="border border-[#D1D5DB] rounded-lg overflow-hidden bg-white shadow-md">
                    <table className="w-full text-base text-[#1B3C53]">
                        <thead className="bg-[#F0F2F5] text-[#1B3C53]">
                            <tr>{slide.table?.headers.map(h => <th key={h} className="p-3 text-left font-semibold">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {slide.table?.rows.map((row, i) => (
                                <tr key={i} className="border-t border-[#F0F2F5]">
                                    {slide.table?.headers.map(h => <td key={h} className="p-3">{row[h]}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ul className="mt-6 space-y-2 text-lg list-disc list-inside text-[#1B3C53]">
                    {slide.mainPoints?.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
                </ul>
             </div>
             <div className="anim-child h-full flex flex-col justify-center">
                <AnimatedBarChart data={slide.chartData!} />
             </div>
         </div>
     </div>
);

const FeaturesSlide: React.FC<SlideProps> = ({ slide }) => (
    <div className="flex flex-col justify-center h-full items-center">
        <h2 className="text-5xl font-extrabold mb-2 text-center anim-child text-[#1B3C53]">{slide.title}</h2>
        <p className="text-xl text-[#1B3C53] mb-16 text-center anim-child font-semibold">{slide.subtitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-6xl">
            {slide.kpis?.map((kpi, i) => (
                <div key={i} className="anim-child bg-white p-6 rounded-lg border border-[#D1D5DB] shadow-lg flex flex-col justify-center items-center h-full">
                    <h3 className="text-lg font-bold text-[#1B3C53]">{kpi.label}</h3>
                    <p className="text-3xl mt-2 font-semibold text-[#1B3C53]">{kpi.value}</p>
                </div>
            ))}
        </div>
         <ul className="mt-16 space-y-3 text-lg list-disc list-inside max-w-3xl anim-child text-[#1B3C53]">
            {slide.mainPoints?.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
        </ul>
    </div>
);

const OptimizationSlide: React.FC<SlideProps> = ({ slide }) => (
     <div className="grid md:grid-cols-2 gap-24 h-full items-center">
         <div className="anim-child">
             <h2 className="text-5xl font-extrabold mb-4 text-[#1B3C53]">{slide.title}</h2>
             <h3 className="text-2xl font-semibold mb-8 text-[#1B3C53]">{slide.subtitle}</h3>
             <ul className="space-y-4 text-xl list-disc list-inside text-[#1B3C53]">
                 {slide.mainPoints?.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
             </ul>
         </div>
         <div className="flex flex-col items-center justify-center space-y-6 anim-child">
             {slide.stackingInfo?.map((info, i) => (
                 <div key={i} className="flex items-center gap-6 w-full max-w-md bg-white p-4 rounded-lg border border-[#D1D5DB]">
                     <div className={`w-24 h-24 rounded-md ${info.color} flex items-center justify-center font-bold text-2xl ${info.color.includes('transparent') ? 'text-[#1B3C53]' : 'text-white'}`}>
                         {info.stackHeight}
                     </div>
                     <div>
                         <p className="font-bold text-2xl text-[#1B3C53]">{info.tyreType}</p>
                         <p className="text-lg text-[#1B3C53]">{info.category}</p>
                     </div>
                 </div>
             ))}
         </div>
     </div>
);

const AboutSlide: React.FC<SlideProps> = ({ slide }) => (
     <div className="grid md:grid-cols-2 gap-24 h-full items-center">
        <div className="anim-child">
            <h2 className="text-5xl font-extrabold mb-8 text-[#1B3C53]">{slide.title}</h2>
          {slide.mainPoints?.map((point, i) => {
              if (typeof point === 'string') {
                  return <p key={i} className="mb-4 text-lg text-[#1B3C53]">{point}</p>;
              }
              return (
                  <div key={i} className="mb-6">
                      <h3 className="text-xl font-bold text-[#1B3C53]">{point.title}</h3>
                      <p className="text-lg text-[#1B3C53]">{point.points.join(', ')}</p>
                  </div>
              )
          })}
        </div>
        <div className="flex items-center justify-center anim-child">
            <img src={slide.visual} alt="Apollo Tyres" className="rounded-lg shadow-2xl object-cover w-full h-auto border-4 border-[#F0F2F5]" />
        </div>
    </div>
);

const ThankYouSlide: React.FC<SlideProps> = ({ slide }) => (
  <div className="flex flex-col items-center justify-center h-full text-center min-h-screen">
    {slide.visual && (
      <img src={slide.visual} alt="Thank You" className="rounded-lg object-contain h-64 w-auto mb-12 anim-child" />
    )}
    <h1 className="text-7xl md:text-8xl font-extrabold text-[#1B3C53] leading-tight anim-child">{slide.title}</h1>
    {slide.subtitle && <p className="mt-6 text-3xl md:text-4xl text-[#1B3C53] anim-child font-semibold">{slide.subtitle}</p>}
    {slide.presenter && (
        <div className="mt-16 border-t-2 border-[#D1D5DB] pt-8 anim-child">
          <p className="text-2xl text-[#1B3C53] font-bold">{slide.presenter.name}</p>
          <p className="text-xl text-[#1B3C53]">{slide.presenter.institution}</p>
        </div>
    )}
  </div>
);

const DefaultSlide: React.FC<SlideProps> = ({ slide }) => (
  <div className="grid md:grid-cols-2 gap-24 h-full items-center">
    <div className="anim-child">
      <h2 className="text-5xl font-extrabold mb-8 text-[#1B3C53]">{slide.title}</h2>
      <ul className="space-y-4 text-2xl list-disc list-inside text-[#1B3C53]">
        {slide.mainPoints?.map((point, i) => <li key={i}>{typeof point === 'string' ? point : point.title}</li>)}
      </ul>
      {slide.quote && (
        <blockquote className="mt-12 border-l-4 border-[#D1D5DB] pl-8">
          <p className="text-3xl italic text-[#1B3C53]">"{slide.quote.text}"</p>
          {slide.quote.author && <cite className="block text-right mt-4 not-italic text-[#1B3C53] font-semibold">— {slide.quote.author}</cite>}
        </blockquote>
      )}
    </div>
    {slide.visual && (
      <div className="flex flex-col items-center justify-center anim-child">
        <img src={slide.visual} alt={slide.title} className="rounded-lg shadow-2xl object-cover w-full h-auto border-4 border-[#F0F2F5]" />
         {slide.footnote && <p className="text-sm text-[#1B3C53] mt-4">{slide.footnote}</p>}
      </div>
    )}
  </div>
);

// --- Component Map ---

const slideComponents: Record<SlideType, React.FC<SlideProps>> = {
  [SlideType.Title]: TitleSlide,
  [SlideType.Intro]: IntroSlide,
  [SlideType.About]: AboutSlide,
  [SlideType.Architecture]: FlowSlide,
  [SlideType.Importance]: DefaultSlide,
  [SlideType.Problem]: TableSlide,
  [SlideType.Example]: ExampleSlide,
  [SlideType.Solution]: DefaultSlide,
  [SlideType.Features]: FeaturesSlide,
  [SlideType.Workflow]: FlowSlide,
  [SlideType.Outcomes]: TableSlide,
  [SlideType.Optimization]: OptimizationSlide,
  [SlideType.Impact]: DefaultSlide,
  [SlideType.Learnings]: DefaultSlide,
  [SlideType.Conclusion]: DefaultSlide,
  [SlideType.ThankYou]: ThankYouSlide,
};

// --- Main Section Component ---

const SlideSection: React.FC<SlideProps> = ({ slide }) => {
    
  const SlideComponent = slideComponents[slide.type] || DefaultSlide;

  return (
    <section className="slide-section container mx-auto px-8 md:px-20 py-32 min-h-screen flex flex-col justify-center">
        <SlideComponent slide={slide} />
    </section>
  );
};

export default SlideSection;