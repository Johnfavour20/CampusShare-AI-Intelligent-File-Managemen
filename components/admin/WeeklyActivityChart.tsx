import React from 'react';
import { Upload, Download, Share2 } from 'lucide-react';

const WeeklyActivityChart: React.FC = () => {
    const data = [
        { day: 'Mon', uploads: 25, downloads: 45, shares: 15 },
        { day: 'Tue', uploads: 30, downloads: 55, shares: 20 },
        { day: 'Wed', uploads: 40, downloads: 70, shares: 25 },
        { day: 'Thu', uploads: 35, downloads: 60, shares: 18 },
        { day: 'Fri', uploads: 50, downloads: 80, shares: 30 },
        { day: 'Sat', uploads: 20, downloads: 35, shares: 10 },
        { day: 'Sun', uploads: 15, downloads: 25, shares: 5 },
    ];

    const maxValue = 100;
    const chartHeight = 250;
    const barWidth = 40;
    const barGroupGap = 30;

    const LegendItem = ({ color, label, icon: Icon }: { color: string, label: string, icon: React.ElementType }) => (
        <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-sm ${color}`}></div>
            <Icon className="w-4 h-4 text-slate-500 dark:text-gray-400" />
            <span className="text-sm text-slate-600 dark:text-gray-300">{label}</span>
        </div>
    );

    return (
        <div className="mt-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-blue-500/20 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Weekly Activity</h3>
                <div className="flex items-center space-x-4">
                    <LegendItem color="bg-blue-500" label="Uploads" icon={Upload} />
                    <LegendItem color="bg-purple-500" label="Downloads" icon={Download} />
                    <LegendItem color="bg-cyan-500" label="Shares" icon={Share2} />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <svg
                    width="100%"
                    height={chartHeight + 40}
                    aria-labelledby="chartTitle"
                    className="min-w-[600px]"
                >
                    <title id="chartTitle">Weekly platform activity chart</title>
                    <g className="grid">
                        {[0, 25, 50, 75, 100].map(val => (
                            <g key={val} transform={`translate(0, ${chartHeight - (val / maxValue) * chartHeight})`}>
                                <line
                                    x1="40"
                                    x2="100%"
                                    stroke="currentColor"
                                    className="text-slate-200 dark:text-blue-500/20"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                />
                                <text
                                    x="30"
                                    y="5"
                                    textAnchor="end"
                                    className="text-xs fill-current text-slate-500 dark:text-gray-400"
                                >
                                    {val}
                                </text>
                            </g>
                        ))}
                    </g>
                    {data.map((item, index) => {
                        const x = index * (barWidth + barGroupGap) + 60;
                        const uploadHeight = (item.uploads / maxValue) * chartHeight;
                        const downloadHeight = (item.downloads / maxValue) * chartHeight;
                        const shareHeight = (item.shares / maxValue) * chartHeight;
                        
                        return (
                            <g key={item.day} transform={`translate(${x}, 0)`}>
                                <title>{`${item.day}: ${item.uploads} Uploads, ${item.downloads} Downloads, ${item.shares} Shares`}</title>
                                <rect
                                    x={0}
                                    y={chartHeight - uploadHeight}
                                    width={barWidth / 3}
                                    height={uploadHeight}
                                    className="fill-current text-blue-500 transition-all duration-300 hover:text-blue-400"
                                />
                                <rect
                                    x={barWidth / 3}
                                    y={chartHeight - downloadHeight}
                                    width={barWidth / 3}
                                    height={downloadHeight}
                                    className="fill-current text-purple-500 transition-all duration-300 hover:text-purple-400"
                                />
                                 <rect
                                    x={(barWidth / 3) * 2}
                                    y={chartHeight - shareHeight}
                                    width={barWidth / 3}
                                    height={shareHeight}
                                    className="fill-current text-cyan-500 transition-all duration-300 hover:text-cyan-400"
                                />
                                <text
                                    x={barWidth / 2}
                                    y={chartHeight + 20}
                                    textAnchor="middle"
                                    className="text-sm fill-current text-slate-600 dark:text-gray-300 font-medium"
                                >
                                    {item.day}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export default WeeklyActivityChart;
