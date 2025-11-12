import { SlideData, SlideType } from '../types';

export const slidesData: SlideData[] = [
  {
    id: 1,
    type: SlideType.Title,
    title: 'SCM Visibility at Apollo Tyres: The Power BI Dashboard Solution',
    subtitle: 'Data-Driven Transformation for Operational Excellence',
    presenter: {
      name: 'Rakesh M R & Sagar Pradeep',
      institution: 'LEAD College of Management',
    },
    logos: ['Apollo', 'PowerBI'],
  },
  {
    id: 2,
    type: SlideType.Intro,
    title: 'Introduction to the Industry',
    mainPoints: [
      'Global Tyre Market: USD 300+ Billion industry (Statista 2024)',
      'India’s Tyre Market: $9.2B (7% CAGR)',
      'Key Players: MRF, CEAT, JK Tyres, Michelin, Bridgestone',
      'Growth Drivers: Electric vehicles, logistics expansion, and smart manufacturing',
    ],
    chartData: [
      { name: 'Asia', value: 150 },
      { name: 'Europe', value: 75 },
      { name: 'N. America', value: 60 },
      { name: 'Others', value: 15 },
    ],
    visual: 'https://picsum.photos/seed/tyre/600/300',
    footnote: 'Visual: Global tyre market distribution (illustrative)'
  },
  {
    id: 3,
    type: SlideType.About,
    title: 'About Apollo Tyres Ltd',
    mainPoints: [
      { title: 'Founded', points: ['1972, HQ: Gurgaon, India'] },
      { title: 'Operations', points: ['100+ countries, 5 plants in India, 2 in Europe'] },
      { title: 'Workforce', points: ['20,000+ employees'] },
      { title: 'Revenue', points: ['USD 2.3 Billion'] },
      { title: 'Brands', points: ['Apollo & Vredestein'] },
      { title: 'Core Values', points: ['Integrity | Innovation | Sustainability'] },
    ],
    visual: 'https://github.com/Rakeshrvi/SCM-Asset/blob/main/Apollo-Logo.png?raw=true',
  },
  {
    id: 4,
    type: SlideType.Architecture,
    title: 'Supply Chain Architecture',
    architecture: [
        { name: 'Manufacturing Plants' },
        { name: 'RDCs' },
        { name: 'NDC' },
        { name: 'ABU Warehouses' },
        { name: 'Dealers' }
    ],
    mainPoints: [
        '5 Indian Plants: Chennai, Limda, Perambra, etc.',
        'Distribution Network: 5 RDCs + 1 NDC (Chennai)',
        'Warehouse Example: Kochi ABU – 20,000 sq.ft, ₹18–19 Cr stock flow/month',
        'Partner Portal: Sampark – Used for dealer demand input and order tracking',
    ]
  },
  {
    id: 5,
    type: SlideType.Importance,
    title: 'Importance of Data-Driven Decision-Making',
    mainPoints: [
      'Data is the foundation for SCM efficiency.',
      'Helps with Accurate demand forecasting',
      'Helps with Real-time inventory visibility',
      'Helps with Faster logistics coordination',
      'Helps with Improved budget adherence',
    ],
    quote: {
      text: 'Without data, you’re just another person with an opinion.',
      author: 'W. Edwards Deming',
    },
    visual: 'https://github.com/Rakeshrvi/SCM-Asset/blob/main/data%20driven%20Decision%20Making.jpeg?raw=true',
    footnote: 'Visual: BI Benefits Infographic'
  },
  {
    id: 6,
    type: SlideType.Problem,
    title: 'The Problem: Data Fragmentation',
    mainPoints: [
      'Key Challenge: Each Distribution Centre maintained MIS data in different Excel formats.'
    ],
    table: {
      headers: ['Issue', 'Effect'],
      rows: [
        { Issue: 'Non-standardized formats', Effect: 'Inconsistent reporting' },
        { Issue: 'Manual consolidation', Effect: 'Delayed insights' },
        { Issue: 'Lack of real-time data', Effect: 'Poor forecasting' },
        { Issue: 'No cross-location visibility', Effect: 'Inefficient decisions' },
      ],
    },
  },
  {
    id: 7,
    type: SlideType.Example,
    title: 'Real Example: Coimbatore RDC MIS Data (Before BI)',
    subtitle: 'Sample (September 2024)',
    table: {
      headers: ['Date', 'Planned Vehicles', 'Actual Vehicles', 'Adherence'],
      rows: [
        { Date: '02-09-24', 'Planned Vehicles': 17, 'Actual Vehicles': 11, Adherence: '63%' },
        { Date: '03-09-24', 'Planned Vehicles': 13, 'Actual Vehicles': 10, Adherence: '74%' },
        { Date: '04-09-24', 'Planned Vehicles': 16, 'Actual Vehicles': 12, Adherence: '76%' },
      ],
    },
    chartData: [
        { name: '02-09', Adherence: 63, Planned: 17, Actual: 11},
        { name: '03-09', Adherence: 74, Planned: 13, Actual: 10 },
        { name: '04-09', Adherence: 76, Planned: 16, Actual: 12 },
    ],
    mainPoints: ['Average adherence: 78% (Below target of 80%)', 'Manual reporting delayed root cause analysis (RCA)'],
  },
  {
    id: 8,
    type: SlideType.Solution,
    title: 'The Turning Point: Data-Driven ERP + Power BI',
    subtitle: 'Objective: To create a unified Power BI Dashboard integrating all MIS data for SCM (South & West Zones).',
    mainPoints: [
      'Standardize MIS inputs (Excel Template)',
      'Automate visualization (Power BI)',
      'Enable daily/MTD/YTD analysis',
      'Empower top management with real-time insights',
    ],
    visual: 'https://github.com/Rakeshrvi/SCM-Asset/blob/main/power-bi-dashboard2.png?raw=true',
    footnote: 'Visual: Representative Power BI dashboard'
  },
  {
    id: 9,
    type: SlideType.Features,
    title: 'Dashboard Features',
    subtitle: 'Data Layers Integrated:',
    kpis: [
      { label: 'Vehicle Data', value: 'Daily Logs' },
      { label: 'Inventory Data', value: 'Stock-out %' },
      { label: 'Financial Data', value: 'Expenses vs Budget' },
      { label: 'Performance', value: 'ABU Adherence' },
    ],
    mainPoints: [
      'Vehicle Data – Daily inward/outward logs, detention reports',
      'Inventory Data – Category-wise utilization, stock-out %',
      'Financial Data – Expenses vs budget tracking',
      'Performance Metrics – ABU-wise adherence, trend forecasting'
    ]
  },
  {
    id: 10,
    type: SlideType.Workflow,
    title: 'Technical Workflow',
    architecture: [
        { name: 'Data Collection', description: 'Unified Excel Template from each DC' },
        { name: 'Verification', description: 'Standardization Checks' },
        { name: 'Data Loading', description: 'Loaded into Power BI model' },
        { name: 'Visualization', description: 'Dashboards for SCM HQ' }
    ],
    mainPoints: [
      'Tools Used: Microsoft Power BI, Python (for automation/dummy data), Excel (Macros & DAX)',
    ],
  },
  {
    id: 11,
    type: SlideType.Outcomes,
    title: 'Data Insights & Outcomes',
    subtitle: 'Post-Implementation Results:',
    table: {
      headers: ['Parameter', 'Before BI', 'After BI'],
      rows: [
        { Parameter: 'Report Generation Time', 'Before BI': '3 Days', 'After BI': 'Real-Time' },
        { Parameter: 'Data Accuracy', 'Before BI': '70%', 'After BI': '98%' },
        { Parameter: 'Adherence Tracking', 'Before BI': 'Manual', 'After BI': 'Automated' },
        { Parameter: 'Cross-location Comparison', 'Before BI': 'Not Possible', 'After BI': 'Seamless' },
      ],
    },
    mainPoints: ['Strategic Insight: Enabled predictive logistics planning and performance benchmarking.'],
  },
  {
    id: 12,
    type: SlideType.Optimization,
    title: 'Warehouse & Material Flow Optimization',
    subtitle: 'Key Improvements:',
    mainPoints: [
        'FIFO & Vertical Stacking SOPs',
        'Space Utilization Analysis via Power BI',
        'Real-time Stock Alerts',
        'Detention Cost Monitoring',
    ],
    stackingInfo: [
        { tyreType: 'Passenger', stackHeight: '6–8', category: 'Runner', color: 'bg-[#456882]' },
        { tyreType: 'Commercial', stackHeight: '4–5', category: 'Walker', color: 'bg-[#A9B9C6]' },
        { tyreType: 'Industrial', stackHeight: '3–4', category: 'Stranger', color: 'bg-transparent border border-[#A9B9C6]' },
    ],
  },
  {
    id: 13,
    type: SlideType.Impact,
    title: 'Long-Term Strategic Impact',
    mainPoints: [
      'Data standardization → Organizational agility',
      'Enhanced forecasting accuracy (↑ by 20%)',
      'Reduction in data processing time by 70%',
      'Expansion of dashboard to West & South Zones',
      'Power BI adopted as strategic SCM monitoring tool',
    ],
    visual: 'https://github.com/Rakeshrvi/SCM-Asset/blob/main/Strategic-Management-course-1024x698.jpg?raw=true',
  },
  {
    id: 14,
    type: SlideType.Learnings,
    title: 'Learnings & Managerial Insights',
    mainPoints: [
      'Data Visibility → Informed Decisions',
      'ERP + BI → Strategic Synergy',
      'Importance of Stakeholder Communication',
      'Data templates reduce human error',
      'Fosters data culture & analytical mindset in operations',
    ],
  },
  {
    id: 15,
    type: SlideType.Conclusion,
    title: 'Conclusion',
    subtitle: 'Key Takeaways:',
    mainPoints: [
      'Data centralization = Business transformation',
      'BI dashboards convert information into intelligence',
      'Apollo Tyres’ Power BI model = Scalable benchmark for Indian manufacturing',
    ],
    quote: {
      text: 'The future of SCM lies in real-time, data-backed decision ecosystems.',
      author: '',
    },
    visual: 'https://picsum.photos/seed/future/600/300',
  },
];